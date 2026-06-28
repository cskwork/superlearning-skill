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
