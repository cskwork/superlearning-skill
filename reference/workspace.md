# workspace - the vault contract

Load this in any mode that writes state - a teaching bite, a WORLD render, a REWARD-CHECK. The **vault**
is one work directory per learner+topic that holds the control files the deterministic gate reads. The
gate never guesses from chat; it reads these files. So: **no vault, no gate** - and a coach with no gate
cannot honestly grow the world. Create the vault at step 1 of the loop, before teaching.

A *control file* is a small JSON file the coach and researcher write and the engagement-critic reads. A
*sub-gate* is one of the five ordered checks in `engagement-gate.mjs` (never-vague, active-engagement,
bitesize, reward-integrity, integrity). This doc defines the files, their EXACT schemas, and which
sub-gate each field feeds. The schemas here are authoritative against the gate and the seed files in
`templates/workspace/` - if this doc and the gate ever disagree, **the gate wins** and this doc is the
bug.

## Path and layout

One vault per learner+topic. `<topic>` is a kebab-case slug of the subject (`binary-search`,
`photosynthesis`, `french-passe-compose`). A second, unrelated subject is a second vault, never a second
section of the first.

```
.superlearning/<topic>/
  session-claims.json    # OBJECT: { topic, concepts[], gradings[], activities[] }
  facts.json             # ARRAY: sourced external facts (may be []); placeholders marked
  progress-state.json    # OBJECT: xp/streak + masteredConcepts + the world + review schedule
  material/*.html        # default-delivery activity cards (one per bite); live artifacts, NOT gated
  world/world.html       # the growing reward world (read-only render of progress-state.json)
  assets/                # copy of templates/teach/assets/ + templates/world/ (shared css/js)
  gate-report.md         # critic output: each violation as file:locator + one fix (the critic writes this)
```

Seed the vault by copying `templates/workspace/*.example.json` into the three filenames above (drop the
`.example`). Copy `templates/world/` into `world/` and `templates/teach/assets/` into `assets/` once.
Vaults are personal learning data and are git-ignored; only the `templates/` seed is committed. Never
commit a learner's claims, state, or facts.

Who writes what: the **learning-coach** writes `session-claims.json` and updates `progress-state.json`
every bite; the **researcher** writes `facts.json` only when a bite needs an external fact; the
**engagement-critic** only reads - it never edits a claim, it writes violations to `gate-report.md`, and
it is the ONLY role that may flip `mastered:true` or mark a world block `earned:true`.

## Live activity cards (material/) - the default delivery

By default each bite delivers its whole study unit as a card, not as terminal prose. The coach copies
`templates/teach/assets/` into the vault's `assets/` once, then builds one `material/activity-NN.html`
per bite from `activity-card.html` (shared `lesson.css`, so every card matches), paced in four beats: a
FAMILIAR ANCHOR the learner cannot get wrong (everyday, no jargon - the first beat, so difficulty always
starts easy) -> the never-vague pair (the jargon-free `definition` and the concrete `workedExample`) ->
the one sensory activity brief (draw this / write this song / act this scene / do these reps / land this
joke) -> the own-words `restatementPrompt`. The **terminal** keeps only what is live: the one-line mode,
the learner's typed answer, the REACTIVE one-gap follow-up, and the encouragement - because the static
`restatementPrompt` now rides on the card with the rest of the material, while the reactive follow-up
depends on the learner's answer and so cannot be pre-rendered. When the concept is spatial/structural,
the worked example is rendered as an inline diagram (boxes + arrows), not prose - the `.arr` component in
`assets/lesson.css` (`.viz` / `.arr` / `.cell` / `.ptr` / `.arr-sep`) handles sequences/arrays and state
transitions; build ad-hoc box-and-arrow markup for trees and flows. This is the reference instance shown;
the learner still draws their own in the activity.

A card is a **live-turn artifact and is NOT gated**: `engagement-gate.mjs` scans the control files and
`world/world.html` only, never `material/`. Set `progress-state.json.delivery` to `"terminal-text"` when
the learner opts out ("text only" / "터미널로"); then skip the card and put the explanation in terminal
prose.

## session-claims.json

A single OBJECT (not a bare array) with three top-level arrays. Each bite appends one entry to
`concepts`, one to `gradings` (when a restatement is graded), and one or more to `activities`. Schema:

```json
{
  "topic": "binary-search",
  "concepts": [
    {
      "id": "halving-the-search",
      "definition": "Binary search finds an item in a sorted list by checking the middle one and throwing away the half that cannot contain the target, then repeating on what is left.",
      "jargonTerms": ["sorted list", "target"],
      "unpacked": { "sorted list": "items already in order, smallest to largest", "target": "the value you are trying to find" },
      "workedExample": { "type": "worked", "content": "Find 7 in [1,3,5,7,9,11]. Middle is 5; 7>5 so drop the left half, leaving [7,9,11]. Middle is 9; 7<9 so drop the right half, leaving [7]. Found in 3 checks, not 6." },
      "restatementPrompt": "In your own words, why does checking the middle let you throw away half the list every single time?",
      "factual": false
    }
  ],
  "gradings": [
    { "conceptId": "halving-the-search", "gapType": "boundary", "followUpQuestion": "What has to be true about the list for the half you discard to be safe to ignore?" }
  ],
  "activities": [
    { "conceptId": "halving-the-search", "channel": "visual", "produced": true, "retrievalRole": "learner draws the shrinking range and crosses out the discarded half", "artifact": "material/activity-01.html", "prompt": "Draw the list as six boxes; circle the middle, cross out the impossible half, redraw, repeat." }
  ]
}
```

### concepts[] field rules (the never-vague sub-gate)

- `id` - stable kebab-case concept id; `gradings`, `activities`, `factRefs`, and `masteredConcepts`
  reference it.
- `definition` - plain language, jargon-free, at least four ordinary words. A one-word restatement of the
  `id` FAILs as circular.
- `jargonTerms` - every term here MUST be unpacked, either inline in `definition` OR in the `unpacked`
  map. An unpacked-nowhere term FAILs never-vague. More than **4** new terms in one bite FAILs *bitesize*.
- `unpacked` - optional `{ "<jargonTerm>": "<plain gloss>" }` map; the second accepted way to satisfy the
  undefined-jargon check.
- `workedExample.type` - any concrete-instance label (`worked`, `solved`, `case`...). The single rejected
  value is `analogy`: an analogy is a candidate, not a worked example. Keep analogies in a separate
  optional `analogy` field; they never satisfy this requirement.
- `workedExample.content` - the actual solved instance with real values, not a restatement of the
  definition. Empty or a definition-echo FAILs never-vague.
- `restatementPrompt` - forces the learner to regenerate the idea in their own words (the generation
  effect; see `learning-core.md`). Missing it = incomplete bite = FAIL.
- `factual` - boolean, required. `true` if the entry states an external fact, formula, or dated figure; a
  `true` entry must carry `factRefs` resolving into `facts.json`, or the integrity sub-gate FAILs.
- `factRefs` - array of `facts.json` ids, present when `factual` is `true`.

### gradings[] field rules (the bitesize sub-gate, grading half)

A top-level array, one entry per graded restatement (NOT embedded inside a concept). Each entry:

- `conceptId` - the `concepts[].id` this grading is for.
- `gapType` - exactly one value from the 6-type enum, in the gate's short form:
  `causal | circular | jargon | boundary | example | analogy | none`. (`none` = the restatement was
  gap-free.) The descriptive names live in `learning-core.md`; the JSON uses these short strings.
- `followUpQuestion` - exactly ONE friendly follow-up question targeting that gap. A multi-question dump
  (more than one `?`, or a bulleted list) FAILs bitesize. Use `""` when `gapType` is `none`.

### activities[] field rules (the active-engagement sub-gate - the flagship)

A top-level array, one entry per sensory activity attached to a bite. **At least one activity per
session** or the active-engagement sub-gate FAILs ("a bite must engage a sense"). Each entry:

- `conceptId` - the `concepts[].id` this activity teaches; must resolve to a real concept.
- `channel` - exactly one of `visual | auditory | narrative | kinesthetic | humor`:
  - `visual` -> DRAW (a diagram, sketch, the drawing effect)
  - `auditory` -> COMPOSE (lyrics + a Google Lyria prompt; the learner co-writes the song)
  - `narrative` -> ROLEPLAY ("What if...?" imaginative-world scene where the concept is the rule)
  - `kinesthetic` -> MOVE (recall reps tied to push-ups / sit-ups / jumping jacks to music)
  - `humor` -> JOKE (a POW! pun or one-liner whose punchline hinges on the mechanism)
- `produced` - boolean, MUST be `true`. The learner makes the artifact; passive consumption (watching,
  listening to someone else's song, staring at a finished diagram) FAILs active-engagement. You only
  remember what you generate.
- `retrievalRole` - a non-empty sentence saying exactly what recall or generation this activity forces
  ("learner writes the punchline that only lands if each guess halves the space"). Missing it FAILs.
- `artifact` - optional path to the `material/*.html` card (or other rendered output).
- `prompt` - optional the exact instruction handed to the learner.

Note: across a session, **vary the channel** - do not run every bite through the same sense. The gate
does not force this (variety is judgment, not a deterministic line), but `learning-core.md` requires it,
and the engagement-critic flags a single-channel session as a HIGH finding. Multi-sensory means multiple
channels of encoding, NOT matching one "learning style" (there is no evidence for style-matching; the
gate FAILs the phrase "because you're a visual learner").

## facts.json

An ARRAY of sourced facts, written by the researcher. May be `[]` for a pure-reasoning topic. The skill
is fun-first, so most bites carry no external fact - but a stated fact, figure, or efficacy claim still
gets a real source or it is cut. Schema:

```json
[
  { "id": "generation-effect", "claim": "Self-generated answers are retained better than re-read ones (the generation effect).", "url": "https://psycnet.apa.org/record/1980-20399-001", "retrievedDate": "2026-06-28" },
  { "id": "PLACEHOLDER-song-memory-2026", "claim": "[PLACEHOLDER -- needs verification] effect size for melody-as-mnemonic on verbal recall.", "url": "", "retrievedDate": null, "status": "placeholder" }
]
```

Rules:

- `id` - the stable key a concept's `factRefs` points at; the integrity sub-gate resolves a `factRef` to
  the fact whose `id` (or `claim`) matches. Every `factRefs` id in a `factual:true` concept must resolve
  to an entry here whose `url` is non-empty.
- `retrievedDate` - ISO `YYYY-MM-DD` the source was checked (`null` for a placeholder).
- **Placeholder format** (the only honest way to record an unverified fact): `id` prefixed
  `PLACEHOLDER-`, `claim` wrapped `[PLACEHOLDER -- needs verification]`, empty `url`, `retrievedDate:
  null`, `status: "placeholder"`. A concept may point at a placeholder, but because the `url` is empty the
  integrity sub-gate keeps that concept blocked until a real source replaces it. Never invent a fact, URL,
  or date to clear it.

## progress-state.json

A single OBJECT: the learner's reward state plus the mastery and review records. This file drives the
world. Schema:

```json
{
  "learner": "alex",
  "topic": "binary-search",
  "delivery": "html-card",
  "xp": 120,
  "streak": 3,
  "masteredConcepts": [
    { "id": "halving-the-search", "mastered": true, "retrievalPassed": true, "channel": "visual", "reteachHistory": [] }
  ],
  "world": {
    "tier": "room",
    "blocks": [
      { "id": "b1", "conceptId": "halving-the-search", "kind": "floor", "earned": true },
      { "id": "b2", "conceptId": "halving-the-search", "kind": "lamp", "earned": true }
    ]
  },
  "reviewSchedule": [
    { "conceptId": "halving-the-search", "due": "1d" },
    { "conceptId": "halving-the-search", "due": "1w" }
  ]
}
```

Field rules:

- `delivery` - `html-card` (default - explanation + activity go to a `material/activity-NN.html` card) or
  `terminal-text` (opt-out - explanation as terminal prose). The gate ignores this field; it only steers
  the coach's delivery.
- `xp`, `streak` - cosmetic progress counters the world shows; the gate does not police them.
- `masteredConcepts[]` - one entry per concept the learner has actually learned. Each carries
  (the **reward-integrity** sub-gate):
  - `mastered` - `true` only when there is a passed retrieval check.
  - `retrievalPassed` - MUST be `true` for `mastered:true`; a `mastered` stamp with no passed retrieval
    FAILs ("reward must be earned, not stamped"). The learner showed they can recall/apply it unprompted.
  - `channel` - the sensory channel that worked.
  - `reteachHistory` - optional `[ { "channel": "..." } ]`; a re-teach after a miss must use a DIFFERENT
    channel than the one that failed (draw it instead of singing it), or reward-integrity FAILs.
- `world` - the growing settlement the reward world renders (`world/world.html` reads this):
  - `tier` - one of `plot | room | house | village | city` (the growth ladder).
  - `blocks[]` - each placed block/decoration. A block with `earned:true` MUST carry a `conceptId` that
    (a) exists in `session-claims.json` concepts, and (b) is a `masteredConcepts` entry with
    `mastered:true` and `retrievalPassed:true`. An earned block with no concept, an unknown concept, or a
    not-yet-mastered concept FAILs reward-integrity ("no fabricated progress"). Blocks with
    `earned:false` are planned/ghost slots and are ignored by the gate and dimmed by the world.
  - `kind` - free-form decoration label (`floor`, `lamp`, `door`, `tree`, `shop`...); the world maps it
    to a sprite.
- `reviewSchedule` - `[ { "conceptId", "due" } ]` retrieval due-markers at `1d` / `1w` / `1m`, consumed
  by a returning session.

## Which file feeds which sub-gate

| Control file | Fields read | Sub-gate | What it proves |
|---|---|---|---|
| session-claims.json | `concepts[].definition / jargonTerms / unpacked / workedExample / restatementPrompt / factual` | never-vague | every bite still ships the jargon-free triple |
| session-claims.json | `activities[].channel / produced / retrievalRole / conceptId` | active-engagement | every bite makes the learner PRODUCE through a real sense |
| session-claims.json | `concepts[].jargonTerms` length + `gradings[].gapType / followUpQuestion` | bitesize | one small concept per bite; one gap, one question |
| progress-state.json + session-claims.json | `masteredConcepts[]` + `world.blocks[].conceptId / earned` | reward-integrity | the world only grows for concepts actually learned |
| session-claims.json + facts.json | `concepts[].factual / factRefs` -> `facts.json[].id / url` | integrity | every stated fact resolves to a real sourced url |

## Append discipline

- **Append, never silently rewrite.** Each new bite appends to `concepts`, `gradings`, and `activities`;
  you never edit or delete a prior claim. The gate audits the full history.
- **Re-teach appends a new activity in a DIFFERENT channel.** A missed concept is re-taught as a new
  activity with a different `channel`, logged in `reteachHistory`; reward-integrity confirms the channels
  differ.
- **progress pointers update in place; records append.** `xp`, `streak`, `world.tier` are current-state
  and may be overwritten; `masteredConcepts`, `world.blocks`, and `reviewSchedule` only grow. A failed
  spaced retrieval demotes a concept out of `masteredConcepts` (drop `mastered`/`retrievalPassed`) and
  re-enters the loop.

## Running the gate

The critic - never the coach - runs:

```
node templates/engagement-gate.mjs .superlearning/<topic>
```

It reads the control files, runs the five sub-gates in order, and prints `file:locator` violations
verbatim. Any FAIL = overall FAIL. The world artifact under `world/` is checked structurally in the same
run. Cap at 3 critique->fix cycles; persistent failure reports "needs human review" rather than
soft-passing. Never weaken the gate to pass a lesson - fix the lesson.

## Pitfalls

- **No vault, then "trust me, it was fun."** Without the files there is nothing to gate and no honest
  world; the critic must refuse. Create the vault first.
- **session-claims.json as a bare array.** The gate reads `claims.concepts`; a top-level array has no
  `.concepts` and FAILs "no concepts[]". It is one object with `concepts` / `gradings` / `activities`.
- **An activity with `produced:false`.** That is passive consumption; it FAILs active-engagement. The
  learner makes the drawing/song/scene/joke - they do not watch one.
- **A world block earned for an unmastered concept.** Fabricated progress; FAILs reward-integrity. Teach
  and pass the retrieval first, then the block is earned.
- **One vault for two topics.** Mixed concepts corrupt the world and the review schedule. One topic, one
  vault, one growing city.
