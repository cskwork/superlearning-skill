# Changelog 2026-06-28 - superlearning v0.1.0

Initial build of `/superlearning`: a standalone agent skill that teaches anyone anything so it *sticks* -
through the five senses, in bite-size pieces, with a reward "town" that grows as the learner learns. It is
a fun-first sibling of `supertutor-skill`, reusing that project's proven architecture (a deterministic gate
the builder cannot self-approve, the vault/control-file contract, HTML-card delivery, the bilingual
README + landing) and re-scoping it from rigorous mastery tutoring to multi-sensory, gamified engagement.

## What was built

- `SKILL.md` - thin router: the multi-sensory bite-size law, 5 sensory channel modes (DRAW, COMPOSE,
  ROLEPLAY, MOVE, JOKE) + 2 control modes (BITESIZE-LEARN, WORLD/REWARD-CHECK), the role-separated loop,
  the deterministic gate, the reference map.
- `templates/engagement-gate.mjs` - the executable, no-self-approval / no-fake-reward gate: five ordered
  sub-gates (never-vague, active-engagement, bitesize, reward-integrity, integrity) plus a structural
  check of the reward world. Adapted from supertutor's `lesson-gate.mjs`.
- `templates/world/` - the headline feature: a dependency-free isometric reward town (`world.html` +
  `world.css` + `world.js`) that renders `progress-state.json` as a settlement growing through tiers
  plot -> room -> house -> village -> city, and doubles as a memory palace (click a building to recall its
  concept). Plus `world-state.example.json`.
- `templates/teach/assets/` - the activity-card scaffold: `activity-card.html` (one bite = definition +
  worked example + ONE sensory activity the learner makes), `lesson.css` (extended with `.activity` /
  `.channel-chip` / `.reps`), `quiz.js`, `lesson-book.js`. `templates/skill-frontmatter-gate.mjs` and
  `templates/workspace/*.example.json` seed the vault.
- `reference/` - `learning-core.md` (always-on authority), the 5 channel docs (`draw`, `compose`,
  `roleplay`, `move`, `joke`), `bitesize-reward.md`, `world-progress.md`, `workspace.md`, `sources.md`.
- `agents/` - 3 personas: `learning-coach` (builder), `engagement-critic` (independent gate + the only role
  that awards a block or marks mastery), `researcher` (facts).
- `tests/` - contract suite (`run-all.sh`): frontmatter+size gate, gate pass/fail scenarios (the fail-vault
  trips all five sub-gates), mode-routing contract, reference-links contract. Bilingual `README.md` /
  `README.ko.md` and a self-contained `docs/index.html` GitHub Pages landing.

## Decisions and the reasoning behind them

- **Fun-first, but the substance is welded on.** The user asked for engagement-first (five senses, reward,
  bite-size variety) over a citation-heavy, rigor-first framing. So the voice is playful and the science
  sits in light footnotes - but one rule from rigorous tutoring never bends: every bite still ships a
  jargon-free definition, a concrete worked example, and an own-words say-back (the `never-vague` sub-gate).
  Rationale: fun that teaches nothing is just play; the never-vague core is what turns the fun into
  retention, and it is the bridge back to the parent skill. Rejected alternative: drop the substance checks
  entirely for pure engagement - rejected because it would ship a skill that feels good and teaches nothing.
- **"Make, don't watch" is the flagship.** Every activity must be `produced:true` - the learner draws the
  diagram, writes the lyrics, acts the scene, does the reps, lands the joke. Passive consumption fails the
  `active-engagement` sub-gate. Rationale: the generation effect - you remember what you make, not what you
  receive.
- **The reward must be earned (no fake progress).** A reward system dies the moment progress can be faked,
  so the `reward-integrity` sub-gate ties every earned world block to a concept actually mastered with a
  passed retrieval, and only the independent `engagement-critic` may mark a block `earned` or a concept
  `mastered`. The coach (builder) never awards its own reward - the same no-self-approval principle the
  parent applies to mastery.
- **The town is a memory palace, not just a trophy.** Each building is tagged with the concept it stands
  for, so the place the learner built becomes a spatial recall cue (method of loci). Growth is the reward
  AND the review map - one mechanic, two jobs.
- **Multi-sensory, not learning-styles.** Framed as multi-channel *encoding* (more retrieval hooks) and
  *variety* (a desirable difficulty), explicitly NOT matching a learner's self-reported "style" (no
  empirical support; Pashler 2008, Willingham 2005). The gate still fails style-matching language. Kept to
  one honest line, not a lecture - consistent with fun-first.
- **The 3D world is isometric and dependency-free, by user choice.** The user picked a self-contained
  CSS/Canvas isometric town over a Three.js voxel world - it matches the parent's no-build discipline,
  works opened straight from disk (inline `#world-data`, with a fetch upgrade when served), is accessible
  (a readable `.world-summary` mirrors the canvas), and is fast. Rejected: Three.js (truer 3D, but a CDN
  dependency and heavier).
- **Google Lyria is prompt-out, not synthesized.** With no Lyria tool available, COMPOSE has the learner
  co-write lyrics (the generation win) and hands them a ready-to-paste Google Lyria prompt to run
  themselves - the skill produces the spec, the learner produces the track.
- **Reused proven infrastructure.** The gate/orchestrator pattern, the vault contract, the HTML scaffold
  (`lesson.css`/`quiz.js`/`lesson-book.js`), and the landing/README templates are adapted from
  `supertutor-skill`, re-scoped to channels, activities, and a reward economy.

## Build process

Contract-first to avoid the schema-drift class of bug: the gate (the single source of truth for every
enum and schema), the vault example files, `workspace.md`, the world artifact, the scaffold, `SKILL.md`,
`learning-core.md`, the three agent personas, and the test suite were authored directly and verified
(`engagement-gate.mjs` green on the seed/pass vault, red on the fail-vault with all five sub-gates firing).
The independent prose - the five channel references, `bitesize-reward.md`, `world-progress.md`,
`sources.md`, the bilingual README, and the landing page - was then authored by parallel fresh-context
subagents, each handed the locked contract and the finished core files to match.

## Verification

`bash tests/run-all.sh` green (frontmatter+size gate; gate pass/fail scenarios with every sub-gate firing;
mode-routing contract; reference-links contract). `node templates/engagement-gate.mjs` PASSes the seed
vault and the world artifact, and FAILs the fail-vault with all five sub-gate tokens. No emoji; control
files parse clean; SKILL.md within portable frontmatter/size limits.

## Amendment - "Start easy; ease in from the familiar" (same day)

Trigger: a live learner hit the very first Kafka bite, said "어렵다" (this is hard), and asked the coach to
do the drawing for them. The bite opened straight on the formal term ("append-only log / offset") with a
full say-back as the first ask - technically gate-clean, but a coaching defect: a hard first step makes a
learner quit before the mechanism lands. The user then asked to bake "always start easy" into the skill.

Change (prose only, no gate/schema touched):

- `reference/learning-core.md` - new always-on subsection **"Start from the familiar (ease in)"**: open on
  an everyday anchor the learner cannot get wrong, name the term second, make the first question a
  near-certain win (a success spiral, not a wall), and on a "this is hard" shrink the anchor rather than
  repeat the framing louder. Stated explicitly as a teaching default the gate cannot measure.
- `reference/bitesize-reward.md` - new bite-sizing rule of thumb **"Start on familiar ground"**, cross-
  linking the ease-in law.
- `SKILL.md` - new core principle **"Start easy; ease in from the familiar."**

Reasoning: this is "show, then name" turned all the way up, plus an affective rule (confidence first). It
is deliberately a coaching default, not a sixth sub-gate - "easy" is judgment, not a deterministic line, and
the welded-on never-vague core already guarantees substance. Rejected alternative: a gate check on opening
difficulty - rejected as unmeasurable and prone to false fails. The deterministic gate is unchanged, so the
existing test suite still governs; the edits are additive prose within the body-size budget.

## Fix - SKILL.md frontmatter YAML parse error (same day)

A strict YAML parser rejected the frontmatter ("mapping values are not allowed in this context", line 2
col 356): the unquoted `description` plain scalar contained a `colon + space` in `... the learner MAKES
(not consumes): DRAW it ...`, which YAML reads as an illegal inline mapping. `skill-frontmatter-gate.mjs`
missed it because its minimal reader is not a full YAML parser. Fix: reword to `... the learner MAKES, not
consumes - DRAW it ...`, reusing the ` - ` separator the description already uses, so no colon-space
remains. Verified with a strict PyYAML `safe_load` (parses clean, two keys) and the frontmatter gate
(combined 964/1536). The README/landing copies of the description are prose, not YAML, so they need no
change.

## Amendment - card paced in four beats: ease-in anchor + restatement-on-card (same day)

Trigger: a live learner hit the first bite of `move-zeroes` and said the card was "too hard" - it opened on
the formal definition (`<dfn>쓰는 손가락 기법</dfn> ...`) before any familiar ground, and the say-back
question lived only in the terminal, so the card was not a self-contained study unit. The skill already had
"start easy; ease in from the familiar" as a coaching principle, but the card TEMPLATE led with `.sg-def`,
giving the ease-in rule nowhere to land structurally - the structure defeated the principle. The user asked
to bake "difficulty always starts easy" into the skill.

Change A - ease-in is now structural, not just prose:

- `templates/teach/assets/activity-card.html` - re-laid into FOUR beats: (1) a familiar anchor the learner
  cannot get wrong (everyday, zero jargon, the FIRST thing read) -> (2) the jargon-free definition +
  concrete worked example -> (3) ONE sensory activity the learner makes -> (4) the own-words restatement
  prompt. New `.sg-anchor` opener and `.sg-ask` closer blocks; the definition now arrives AFTER the anchor.
- `templates/teach/assets/lesson.css` - two small token-reusing rules for `.sg-anchor` (warm `--ok` styling,
  "you already know this") and `.sg-ask` (accent styling for the action item). No new dependencies.
- `reference/learning-core.md` - new bullet under ease-in: "the card opens on the anchor, not the
  definition"; a card that leads with `<dfn>` fights the rule even if the prose says "start easy."

Change B - the static restatement prompt moves onto the card (the terminal keeps only the reactive grading):

- `SKILL.md` (Output & delivery, step 4, Done=), `reference/workspace.md` (Live activity cards),
  `agents/learning-coach.md` (step 4), and all five channel references (`draw/compose/roleplay/move/joke`)
  + both READMEs + the landing `docs/index.html` - the static `restatementPrompt` now rides on the card; the
  terminal keeps only the learner's typed answer and the REACTIVE one-gap follow-up. Rationale: the
  restatement prompt is teaching material, and material lives on the card; the reactive follow-up must stay
  terminal because it depends on the learner's answer.

Reasoning: the card is the study artifact, so it should be paced like one - open on ground the learner
stands on, reach the formal term only after the mechanism is felt, and close on the say-back that drives the
generation effect. Splitting static (card) from reactive (terminal) keeps each surface doing one job. This
is delivery-only: cards remain live-turn artifacts that are NOT gated, the `session-claims.json` schema and
the five sub-gates are unchanged, and ease-in stays a coaching default, not a gate line ("easy" is judgment,
not a deterministic check). Rejected alternative: gate-check that the card leads with an anchor - rejected
as unmeasurable and prone to false fails, exactly as the earlier ease-in amendment decided.

Verification: `bash tests/run-all.sh` - frontmatter+size gate PASS, gate pass/fail scenarios PASS (clean
vault green, broken vault red with all five sub-gates firing), mode-routing PASS, reference-links contract
satisfied (all SKILL.md-referenced files resolve; the suite's `mapfile` call is a bash-4 feature absent on
macOS bash 3.2 and is a pre-existing environment limitation, not introduced here). The deterministic gate is
unchanged, so the existing test suite still governs.

## Amendment - visual worked examples: show spatial content as a diagram, not prose (same day)

Trigger: a live learner said the four-beat card was still "too much text" ("글 보다는 좀 더 시각적으로").
The worked example for `move-zeroes` was a `<ul class="trace">` of five prose lines ("1번 칸 = 1 -> w 자리로
당겨 ..."), where the same content reads instantly as boxes with R/W pointer tags. The skill had no guidance
that a worked example should be a picture when the content is spatial.

Change - "show, don't tell" extended to the visual level:

- `templates/teach/assets/lesson.css` - a reusable inline-diagram component: `.viz` (flex container),
  `.arr` + `.cell` + `.ptr` (a sequence/array with colored pointer tags that drop a ▼ onto a cell),
  `.arr-sep` (arrow between two states), `.mini` (caption). Covers sequences/arrays and state transitions -
  the bulk of spatial content (two-pointers, sliding window, sorting, stacks). Trees/flows use ad-hoc
  box-and-arrow markup that reuses the surface tokens.
- `templates/teach/assets/activity-card.html` - the BEAT 2b worked-example slot now ships an example
  diagram (boxes + a `->` state transition) and a comment stating the rule: spatial content renders as an
  inline diagram, not a paragraph.
- `reference/learning-core.md` - new always-on rule: when the concept is spatial/structural/relational,
  the worked example is an inline diagram (boxes + arrows/labels). Explicit that this is the reference
  instance and does NOT weaken make-don't-watch (the learner still draws their own in the activity).
- `reference/workspace.md` + `reference/draw.md` + `SKILL.md` - the same rule, scoped: workspace points at
  the `.arr` component; draw.md adds the sharp distinction (the shown worked-example diagram is allowed;
  handing the learner that same finished diagram as the ACTIVITY never is).

Reasoning: a worked example is the solved case the learner is allowed to see, so rendering it as a diagram
is legitimate and strictly more legible for spatial content. The make-don't-watch flagship is preserved
because the diagram is the REFERENCE instance and the learner still PRODUCES their own drawing in the
activity - two distinct visual layers (one shown, one made). Conditional on content shape (spatial), not
universal - a grammatical rule stays prose. Rejected: forcing every worked example into a diagram - some
concepts are textual and a diagram would be decoration.

Verification: `bash tests/run-all.sh` - frontmatter+size gate PASS, gate pass/fail scenarios PASS, mode-
routing PASS, reference-links satisfied. The `.arr` component is presentation only (not read by the gate),
and the `session-claims.json` schema and five sub-gates are unchanged. The live `move-zeroes` vault card was
rebuilt to use the shared `.arr` classes (inline `<style>` dropped) after refreshing the vault's
`assets/lesson.css`; `engagement-gate.mjs` on the vault stays green.
