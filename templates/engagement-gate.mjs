#!/usr/bin/env node
// /superlearning gate -- the executable, no-self-approval exit check. SKILL.md promises that the coach
// (builder) never grades its own work and never awards its own rewards; only the independent
// engagement-critic runs THIS, and it either passes deterministically or it does not. Fun-first, but
// honest: a lesson can be playful and still has to make the learner PRODUCE and the reward has to be
// EARNED. Adapted from supertutor's lesson-gate.mjs (six ordered sub-gates + HTML structure check),
// re-scoped to multi-sensory, bite-size, reward-tracked learning.
//
// Two inputs, dispatched automatically:
//   * a VAULT directory (.superlearning/<topic>/ holding session-claims.json [+ facts.json,
//     progress-state.json, world/world.html]) -> runs the five ordered sub-gates on the control files,
//     then the world-artifact structural check on any world/world.html.
//   * an HTML file or a directory of them -> runs the world / card structural check only.
//
// Sub-gates run IN ORDER; any FAIL => overall FAIL. Each violation prints as `file:locator - message`.
// NEVER weaken this script to make a failing lesson pass -- fix the lesson. Judgment a script cannot see
// (is the joke actually about the concept? does the drawing encode the mechanism?) is the
// engagement-critic's job on top of this.
//
// Usage: engagement-gate.mjs <vault-dir | file.html | html-dir> [more...]
//   Exit 0 = everything clears.   Exit 1 = at least one FAIL.   Exit 2 = usage error / nothing to check.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

// The five sensory channels -- every activity declares exactly one. NOT a learner "style" (no evidence
// for style-matching); a channel is how THIS concept is encoded so the learner has to make something.
const CHANNELS = ["visual", "auditory", "narrative", "kinesthetic", "humor"];
const GAP_TYPES = ["causal", "circular", "jargon", "boundary", "example", "analogy", "none"];
const WORLD_TIERS = ["plot", "room", "house", "village", "city"];
// Learning-"style" meshing language is still forbidden: multi-sensory means multi-channel encoding, not
// "you're a visual learner so here's only pictures." Kept as a light backstop, not the headline.
const STYLE_RE =
  /\b(?:visual|auditory|verbal|kinesthetic|read[- ]?write)\s+learners?\b|\byour\s+learning\s+style\b|\bbecause\s+you(?:'re| are)\s+a\s+(?:visual|auditory|verbal|kinesthetic)\b/i;

function usage(message) {
  if (message) process.stderr.write(`engagement-gate: ${message}\n`);
  process.stderr.write("usage: engagement-gate.mjs <vault-dir | file.html | html-dir> [more...]\n");
  process.exit(2);
}

const args = process.argv.slice(2);
if (args.length === 0) usage("missing path");

// ---- collectors -------------------------------------------------------------
const failures = []; // {file, locator, message}
function fail(file, locator, message) { failures.push({ file, locator, message }); }

function loadJson(file) {
  try { return { ok: true, data: JSON.parse(readFileSync(file, "utf8")) }; }
  catch (e) { return { ok: false, error: e.message }; }
}
const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

// ---- world artifact check (the reward world is a live, growing, accessible HTML page) ----------------
function checkWorld(file) {
  const html = readFileSync(file, "utf8");
  if (!/<html[\s>]/i.test(html) || !/<\/html>/i.test(html)) fail(file, "doc", "not a complete HTML document");
  if (!/<html[^>]*\blang\s*=/i.test(html)) fail(file, "doc", "missing <html lang=...> (a11y / i18n)");
  if (!/<link\b[^>]*\bworld\.css\b[^>]*>/i.test(html))
    fail(file, "scaffold", "does not link world.css -- build from templates/world");
  if (!/<script\b[^>]*\bworld\.js\b[^>]*>/i.test(html)) fail(file, "scaffold", "does not load world.js");
  if (!/\bworld-stage\b/.test(html)) fail(file, "shell", "no .world-stage / #world-stage render target");
  // a11y: the world must say its progress in words too, never a pure-visual reward
  if (!/\bworld-summary\b/.test(html) && !/\bdata-world-summary\b/.test(html))
    fail(file, "a11y", "no .world-summary text region -- progress must be readable, not only drawn");
  if (STYLE_RE.test(html)) fail(file, "modality", "uses learning-style language (no evidence for style-matching)");
}

// ---- vault sub-gates --------------------------------------------------------
function checkVault(dir) {
  const claimsFile = join(dir, "session-claims.json");
  const factsFile = join(dir, "facts.json");
  const stateFile = join(dir, "progress-state.json");

  const claimsRes = loadJson(claimsFile);
  if (!claimsRes.ok) { fail(claimsFile, "load", `unreadable session-claims.json (${claimsRes.error})`); return; }
  const claims = claimsRes.data || {};
  const concepts = Array.isArray(claims.concepts) ? claims.concepts : [];
  const conceptIds = new Set(concepts.map((c) => c && c.id).filter(Boolean));
  if (concepts.length === 0) fail(claimsFile, "concepts", "no concepts[] -- every teaching bite appends a concept");

  // facts (may be []), index by id/claim
  let facts = [];
  if (existsSync(factsFile)) {
    const fr = loadJson(factsFile);
    if (!fr.ok) fail(factsFile, "load", `unreadable facts.json (${fr.error})`);
    else facts = Array.isArray(fr.data) ? fr.data : (fr.data.facts || []);
  }
  const factById = new Map();
  facts.forEach((f, i) => { if (f && (f.id || f.claim)) factById.set(String(f.id || f.claim), f); factById.set(`#${i}`, f); });

  // 1. NEVER-VAGUE (inherited substance) --------------------------------------
  // The fun never replaces the core: a bite still defines plainly, shows one real worked example,
  // and makes the learner say it back. Miss any one and the "lesson" is decoration, not learning.
  for (const c of concepts) {
    const id = c.id || "(unnamed concept)";
    if (!isStr(c.definition)) { fail(claimsFile, id, "never-vague: empty definition"); }
    else {
      const defWords = norm(c.definition).split(" ").filter(Boolean);
      if (norm(c.definition) === norm(id) || defWords.length < 4)
        fail(claimsFile, id, "never-vague: definition is circular/too thin (restates the name, < 4 plain words)");
      const unpacked = c.unpacked && typeof c.unpacked === "object" ? c.unpacked : {};
      for (const t of c.jargonTerms || []) {
        const inDef = norm(c.definition).includes(norm(t));
        const inMap = isStr(unpacked[t]);
        if (!inMap && !inDef) fail(claimsFile, id, `never-vague: jargon term "${t}" used but never unpacked`);
      }
    }
    const ex = c.workedExample;
    if (!ex || !isStr(ex.content)) fail(claimsFile, id, "never-vague: missing workedExample.content (a concrete real instance)");
    else {
      if (ex.type === "analogy") fail(claimsFile, id, `never-vague: workedExample.type="analogy" -- an analogy is not a worked example, give a concrete solved instance`);
      if (norm(ex.content) === norm(c.definition)) fail(claimsFile, id, "never-vague: worked example just restates the definition");
    }
    if (!isStr(c.restatementPrompt)) fail(claimsFile, id, "never-vague: missing restatementPrompt (learner must say it back in their own words)");
    if (typeof c.factual !== "boolean") fail(claimsFile, id, "never-vague: missing factual:boolean flag");
    if (STYLE_RE.test(JSON.stringify(c))) fail(claimsFile, id, "active-engagement: learning-style language present (forbidden)");
  }

  // 2. ACTIVE-ENGAGEMENT (the flagship) ---------------------------------------
  // Every activity must make the LEARNER produce something through a real channel. Watching a video,
  // hearing a song someone else wrote, looking at a finished diagram -- all passive, all FAIL. The
  // generation effect is the whole point: you remember what you make.
  const activities = Array.isArray(claims.activities) ? claims.activities : [];
  if (activities.length === 0) fail(claimsFile, "activities", "no activities[] -- a bite must engage at least one sensory channel (draw/compose/roleplay/move/joke)");
  activities.forEach((a, i) => {
    const loc = a && a.conceptId ? a.conceptId : `activities[${i}]`;
    if (!a || !CHANNELS.includes(a.channel))
      fail(claimsFile, loc, `active-engagement: channel "${a && a.channel}" not in ${CHANNELS.join("|")}`);
    if (!a || a.produced !== true)
      fail(claimsFile, loc, "active-engagement: produced!=true -- the learner must MAKE the artifact, not passively consume it");
    if (!a || !isStr(a.retrievalRole))
      fail(claimsFile, loc, "active-engagement: missing retrievalRole -- say what generation/recall this activity forces");
    if (a && a.conceptId && !conceptIds.has(a.conceptId))
      fail(claimsFile, loc, `active-engagement: conceptId "${a.conceptId}" has no matching concept`);
  });

  // 3. BITESIZE -- one concept per bite; working memory (~4 items) respected; clean explain-back grade --
  for (const c of concepts) {
    const terms = Array.isArray(c.jargonTerms) ? c.jargonTerms : [];
    if (terms.length > 4)
      fail(claimsFile, c.id || "(concept)", `bitesize: ${terms.length} new jargon terms in one bite (>4 overflows working memory) -- split it`);
  }
  for (const g of claims.gradings || []) {
    const loc = g.conceptId || "(grading)";
    if (!GAP_TYPES.includes(g.gapType)) fail(claimsFile, loc, `bitesize: gapType "${g.gapType}" not in ${GAP_TYPES.join("|")}`);
    if (g.gapType && g.gapType !== "none") {
      if (!isStr(g.followUpQuestion)) fail(claimsFile, loc, "bitesize: a gap was named but no follow-up question");
      else {
        const qs = (g.followUpQuestion.match(/\?/g) || []).length;
        if (qs > 1 || /\n\s*[-*\d]/.test(g.followUpQuestion)) fail(claimsFile, loc, "bitesize: return exactly ONE follow-up question, not a dump");
      }
    }
  }

  // 4. REWARD-INTEGRITY -- the world only grows for concepts actually learned -------------------------
  let state = {};
  if (existsSync(stateFile)) {
    const sr = loadJson(stateFile);
    if (!sr.ok) fail(stateFile, "load", `unreadable progress-state.json (${sr.error})`);
    else state = sr.data || {};

    const mastered = Array.isArray(state.masteredConcepts) ? state.masteredConcepts : [];
    const earnedConceptIds = new Set();
    for (const m of mastered) {
      if (m.mastered !== true) continue;
      if (m.retrievalPassed !== true)
        fail(stateFile, m.id || "(mastered)", "reward-integrity: mastered:true with no passed retrieval check -- reward must be earned, not stamped");
      else earnedConceptIds.add(m.id);
      if (Array.isArray(m.reteachHistory) && m.reteachHistory.length >= 2) {
        const chans = m.reteachHistory.map((r) => r.channel).filter(Boolean);
        if (new Set(chans).size < chans.length)
          fail(stateFile, m.id || "(mastered)", "reward-integrity: a re-teach reused the same channel -- re-teach through a DIFFERENT sense");
      }
    }
    const world = state.world && typeof state.world === "object" ? state.world : null;
    if (world) {
      if (world.tier && !WORLD_TIERS.includes(world.tier))
        fail(stateFile, "world.tier", `reward-integrity: tier "${world.tier}" not in ${WORLD_TIERS.join("|")}`);
      const blocks = Array.isArray(world.blocks) ? world.blocks : [];
      blocks.forEach((b, i) => {
        const loc = `world.blocks[${i}]`;
        if (b.earned !== true) return; // unearned/placeholder block: ignored, never rendered as progress
        if (!isStr(b.conceptId)) { fail(stateFile, loc, "reward-integrity: earned block has no conceptId -- no fabricated progress"); return; }
        if (!conceptIds.has(b.conceptId)) fail(stateFile, loc, `reward-integrity: block earned for "${b.conceptId}" but no such concept was taught`);
        else if (!earnedConceptIds.has(b.conceptId)) fail(stateFile, loc, `reward-integrity: block earned for "${b.conceptId}" but that concept is not mastered with a passed retrieval`);
      });
    }
  }

  // 5. INTEGRITY -- never fabricate a fact (universal backstop, light) --------------------------------
  for (const c of concepts) {
    if (c.factual !== true) continue;
    const refs = c.factRefs || [];
    if (refs.length === 0) { fail(claimsFile, c.id || "(concept)", "integrity: factual:true but no factRefs -- source it in facts.json or set factual:false"); continue; }
    for (const r of refs) {
      const f = factById.get(String(r));
      if (!f) fail(factsFile, c.id || "(concept)", `integrity: factRef "${r}" not found in facts.json`);
      else if (!isStr(f.url)) fail(factsFile, String(r), "integrity: sourced fact has no url");
    }
  }
  if (/\b(TODO|FIXME|FABRICATE|MADE[- ]?UP)\b/i.test(JSON.stringify(claims)))
    fail(claimsFile, "integrity", "unmarked placeholder/TODO in claims -- a documented placeholder must say so, never an invented stand-in");

  // world artifact inside the vault
  const worldFile = join(dir, "world", "world.html");
  if (existsSync(worldFile)) checkWorld(worldFile);
}

// ---- dispatch ---------------------------------------------------------------
let checked = 0;
for (const arg of args) {
  if (!existsSync(arg)) usage(`path not found: ${arg}`);
  const st = statSync(arg);
  if (st.isDirectory()) {
    if (existsSync(join(arg, "session-claims.json"))) { checkVault(arg); checked++; }
    else {
      const htmls = readdirSync(arg).filter((n) => n.toLowerCase().endsWith(".html"));
      if (htmls.length === 0) usage(`directory has no session-claims.json and no *.html: ${arg}`);
      for (const n of htmls) { checkWorld(join(arg, n)); checked++; }
    }
  } else if (arg.toLowerCase().endsWith(".html")) { checkWorld(arg); checked++; }
  else usage(`not a vault dir or .html file: ${arg}`);
}
if (checked === 0) usage("nothing to check");

console.log("== /superlearning gate ==");
console.log(`checked: ${checked} target(s)`);
if (failures.length === 0) { console.log("== GATE PASS =="); process.exit(0); }

const byFile = new Map();
for (const f of failures) { if (!byFile.has(f.file)) byFile.set(f.file, []); byFile.get(f.file).push(f); }
for (const [file, fs2] of byFile) { console.log(`  FAIL  ${file}`); for (const f of fs2) console.log(`        - [${f.locator}] ${f.message}`); }
console.error(`\nGATE FAIL: ${failures.length} violation(s) across ${byFile.size} file(s) -- fix the lesson/vault; never weaken this gate.`);
process.exit(1);
