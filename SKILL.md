---
name: superlearning
description: Teach anything so it sticks - bite-size lessons across five senses the learner MAKES (draw, sing, roleplay, move, joke), each with a plain definition, a worked example, and an own-words restatement, earning blocks that grow a memory-palace town. Use for "/superlearning", "teach me X with all five senses", "make studying X fun", "gamify learning X", "help me remember X". Not for one-off lookups or production code.
---

# /superlearning - learn with all five senses, bite by bite, and watch your town grow

Studying is not a brain-only sport. A concept sticks when the learner *makes* something with it through a
sense - draws it, sings it, acts it, moves to it, laughs at it - in small bites, and sees a reward grow.
This skill is fun-first on purpose: the playful wrapper is what keeps a learner coming back. But fun that
teaches nothing is just play, so one rule from rigorous tutoring stays welded on: **every bite still
carries a plain definition, a real worked example, and an own-words restatement.** The fun makes it land;
those three make it stick. This file is a router; each mode loads only the reference it needs. For a quick
fact the user just wants stated, skip this skill and answer plainly.

## Core principles

- **You remember what you MAKE, not what you watch.** Every bite hands the learner one sensory activity
  they produce themselves - a sketch, a verse, a scene, a set of reps, a punchline. Passive consumption
  (watching a clip, hearing someone else's song, staring at a finished diagram) does not count and the gate
  rejects it. Generating an answer is encoded far more durably than re-reading one.
- **Never skip the substance.** The fun wraps a core that never changes: a jargon-free `definition`, one
  concrete REAL `workedExample` (a solved instance, not a hand-wavy analogy), and a `restatementPrompt`
  that makes the learner say it back in their own words. Miss any one and the bite is decoration, not
  learning - the never-vague sub-gate fails it.
- **Bite-size, one concept at a time.** Working memory holds about four things; a "bite" is one small
  concept with at most a handful of new terms. Split anything bigger. Short, finishable, rewarding.
- **Start easy; ease in from the familiar.** Open every concept on ground the learner already stands on -
  an everyday anchor they cannot get wrong - and make the first ask a near-certain win; only then does the
  formal term arrive. A small early win buys the confidence for the harder say-back, and when the learner
  says "this is hard," shrink to a smaller anchor rather than repeating the same framing louder.
- **Mix the senses; never type the learner.** Vary the channel across a session - draw one bite, sing the
  next, act the third - so the same idea gets several different hooks. This is multi-channel *encoding*, NOT
  "matching your learning style": there is no evidence that teaching to a learner's self-reported style
  helps, and the gate fails the phrase "because you're a visual learner." Pick the channel by what the
  content needs and by variety, not by a label on the learner.
- **The reward must be earned.** Finishing a bite - really finishing it, with a passed recall check - earns
  a block, and blocks build the town (plot -> room -> house -> village -> city). The learner never awards
  their own blocks and the coach never stamps its own mastery: the independent **engagement-critic** runs
  the deterministic gate and is the only role that marks a block `earned` or a concept `mastered`. Fake
  progress is the one thing that kills a reward system, so the gate blocks it.
- **The town is a memory palace.** Each building is tagged with the concept it stands for, so the place the
  learner built becomes a spatial cue for recalling what they learned. Growth is the reward AND the review
  map.
- **Warm, never preachy, never fabricating.** Talk like an excited friend, not a textbook. Keep the science
  in the background (one honest footnote, not a lecture). But never invent a fact, a citation, or a date:
  anything stated as fact is sourced into `facts.json` or cut.

## Output and delivery

**Default delivery: the explanation + the activity are an HTML card; the dialogue is the terminal.** Each
bite renders its definition + worked example + the one sensory activity into a standalone card in the vault
(`material/activity-NN.html`, built from `templates/teach/assets/` so every card matches). The terminal
carries what the learner acts on - the one-line mode, the restatement prompt, the one-gap grading, and the
encouragement - plus a relative path to open the card. A learner can opt out ("text only" / "터미널로") to
get the explanation as terminal prose. Cards are live-turn artifacts and are NOT gated.

**The reward world** lives at `world/world.html` (built from `templates/world/`). It reads
`progress-state.json` and draws the isometric town that grows as blocks are earned. It is a read-only
render of honestly-earned progress; the engagement-critic checks it structurally and the learner opens it
to see their town - and to use it as a recall map.

## Mode (classify the request, state it in one line)

State e.g. `Learning as: JOKE - the midpoint-overflow trap in binary search; channel humor; bite 4`.

| Signal in the request | Mode | Approach | Reference |
|---|---|---|---|
| "draw it", "diagram", "show me", or spatial / structural content (a tree, a circuit, parts in space) | **DRAW** (visual) | The learner sketches the structure or flow by hand - boxes, arrows, a labeled picture. Drawing it beats reading it. | `reference/draw.md` |
| "make a song", "lyrics", "리리아", "Lyria", or list-like / sequential / rhythmic content to memorize | **COMPOSE** (auditory) | The learner co-writes lyrics that encode the concept, plus a ready-to-paste Google Lyria prompt to generate the track. | `reference/compose.md` |
| "what if", "tell a story", "role-play", "imagine", or causal / decision-driven content | **ROLEPLAY** (narrative) | A compelling "what if...?" world where the concept is the rule; the learner is the hero who must use it to win. | `reference/roleplay.md` |
| "I can't sit still", "let's move", "exercise", or drill / rote content that needs many reps | **MOVE** (kinesthetic) | Recall reps tied to push-ups / sit-ups / jumping jacks to music - one rep, one retrieved item. | `reference/move.md` |
| "make it funny", "a joke", "a pun", "POW", or a sticky, easily-confused point | **JOKE** (humor) | The learner lands a POW! punchline whose joke only works if they understand the mechanism. | `reference/joke.md` |
| "teach me X", "help me learn X", no channel named (the default) | **BITESIZE-LEARN** | Pick the channel the content fits, vary it across bites, teach one small bite end to end, then reward. | `reference/learning-core.md` (+ `bitesize-reward.md`) |
| "show my town", "how am I doing", "build my world", end of a session, before advancing | **WORLD / REWARD-CHECK** | The independent critic runs the gate, certifies the blocks actually earned, and the town grows; no self-awarded progress. | `reference/world-progress.md` (+ `workspace.md`) |

Tie-breaks (one mode wins): a named channel beats the default ("sing it" -> COMPOSE even inside a "teach
me" request). No channel named -> BITESIZE-LEARN picks the channel by content and by variety (don't repeat
the last sense). "Build my world" with no new learning -> WORLD render only, no new blocks. A stated factual
claim the learner wants checked -> source it first (`researcher`), then teach.

## Default learn loop - role-separated, the builder never awards its own blocks

Roles are author-independent. The **learning-coach** teaches the bite, sets the activity, and runs the
produce-and-grade loop inline - the learner's making-and-saying-back is the live verifier, so there is no
per-bite reviewer. The **researcher** sources a fact only when a bite states one. The independent
fresh-context **engagement-critic** runs the deterministic gate at the reward boundary - certifying earned
blocks and any `mastered` claim - because a reward system dies the moment progress can be faked.

**Vault** = one work dir per learner+topic, `.superlearning/<topic>/`, holding `session-claims.json` (per
bite: concept, definition, jargon, worked example, restatement prompt, grading, and the sensory
activities), `facts.json` (sourced facts, may be `[]`), and `progress-state.json` (xp, streak, mastered
concepts, the world's blocks and tier, review schedule), plus `material/*.html` (the activity cards) and
`world/world.html` (the reward town) beside an `assets/` copy of the templates. Start each from
`templates/workspace/` + `templates/world/` + `templates/teach/assets/`. **No vault, no gate, no honest
town** - create it at step 1.

1. **Frame** (coach). Classify into one mode in a single line. Create or locate the vault.
2. **Diagnose** (coach). A quick, playful prior-knowledge probe ("what do you already picture when I say
   X?"). Pick the next small bite and the channel that fits it - and isn't the one you just used.
3. **Source** (researcher; only if the bite states an external fact). Verify it into `facts.json` with a
   URL; unverifiable -> documented placeholder, never an invented fact. Skip for pure-reasoning bites.
4. **Teach the bite** (coach). Deliver definition + worked example, and attach ONE sensory activity the
   learner MAKES (draw / compose / roleplay / move / joke). By default render it to
   `material/activity-NN.html`; the restatement prompt and grading stay in the terminal. Write the
   never-vague triple + the activity (`channel`, `produced`, `retrievalRole`) into `session-claims.json`.
5. **Produce + grade** (coach). The learner makes the artifact and says the idea back in their own words.
   Find the FIRST gap by the 6-type rubric, return exactly one friendly follow-up question, and cheer real
   progress. Loop within the bite until gap-free; keep it short.
6. **Reward-check** (engagement-critic, independent - at the session/world boundary). The critic re-reads
   the vault, runs `node templates/engagement-gate.mjs .superlearning/<topic>`, and enumerates any
   violation as `file:locator`. It is the only role that marks a block `earned:true` or a concept
   `mastered:true`. Live bites between rewards skip this - the learner's making-and-saying-back is the live
   check.
7. **Grow the town + schedule** (coach, after the gate is green). Add the earned block(s) to
   `progress-state.json`, bump xp/streak, advance the tier when thresholds are crossed, and re-render
   `world/world.html`. Schedule spaced retrieval (1 day / 1 week / 1 month). On a miss, re-teach the
   concept through a DIFFERENT channel, never the same one.

Roles -> personas: teach = `agents/learning-coach.md`, gate/reward = `agents/engagement-critic.md`,
sources = `agents/researcher.md`.

## The gate (deterministic; the coach cannot run it on its own work)

`node templates/engagement-gate.mjs .superlearning/<topic>` (or a `world/world.html` path). It runs at the
reward boundary, not on every live bite. It reads the vault control files - never guesses - and runs five
sub-gates IN ORDER; any FAIL = overall FAIL, printed as `file:locator` violations shown verbatim:

1. **never-vague** (the welded-on core). Each concept has a non-empty jargon-free `definition`, a concrete
   `workedExample` (not empty, not analogy-only, not a restated definition), a `restatementPrompt`, and a
   `factual` flag; declared jargon is unpacked.
2. **active-engagement** (the flagship). Each activity declares a valid `channel`
   (`visual|auditory|narrative|kinesthetic|humor`), `produced:true` (the learner made it), and a non-empty
   `retrievalRole`; passive consumption fails, and learning-style language fails.
3. **bitesize**. One small concept per bite (at most 4 new jargon terms); each grading carries one
   `gapType` and exactly one follow-up question.
4. **reward-integrity**. Every `earned:true` world block maps to a concept actually taught AND mastered
   with a passed retrieval; `mastered:true` needs `retrievalPassed:true`; a re-teach uses a different
   channel. No fabricated progress.
5. **integrity**. Every `factual:true` claim resolves to a `facts.json` source with a non-empty url; no
   fabrication, no unmarked placeholder.

The world artifact (`world/world.html`) is checked structurally in the same run (loads world.css/world.js,
has a `.world-stage` and a readable `.world-summary`). Frontmatter/size of this skill is checked by
`templates/skill-frontmatter-gate.mjs`. NEVER weaken a gate to pass a lesson - fix the lesson.

## Reference map (load only what the current mode needs)

| Read this | When |
|---|---|
| `reference/learning-core.md` | always-on authority; every mode obeys it (the never-vague core + make-don't-watch) |
| `reference/draw.md` | DRAW: sketch the structure/flow; the drawing effect |
| `reference/compose.md` | COMPOSE: co-write lyrics + a Google Lyria prompt |
| `reference/roleplay.md` | ROLEPLAY: a "what if...?" world where the concept is the rule |
| `reference/move.md` | MOVE: recall reps tied to exercise and music |
| `reference/joke.md` | JOKE: a POW! punchline that hinges on the mechanism |
| `reference/bitesize-reward.md` | BITESIZE-LEARN: bite sizing, spacing, xp/streak, the block economy |
| `reference/world-progress.md` | WORLD / REWARD-CHECK: tiers, blocks, the memory palace, growing the town |
| `reference/workspace.md` | the vault contract + control-file schemas |
| `reference/sources.md` | the light evidence base + the never-fabricate backstop |

**Done =** mode stated in one line; vault created; every bite carries a jargon-free definition + a concrete
real worked example + an own-words restatement prompt + ONE sensory activity the learner produced;
explain-back graded one gap at a time; channels varied, never style-matched; the explanation + activity
delivered as a `material/` card while restatement and grading stay in the terminal; at the reward boundary
the independent critic's `engagement-gate.mjs` is green (output reported); blocks added only for concepts
mastered with a passed retrieval; the town re-rendered; facts sourced or cut; spaced review scheduled.
