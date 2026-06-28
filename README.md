# /superlearning

**English** | [한국어](README.ko.md)

**Teach anyone anything so it actually sticks - through the five senses, in bite-size pieces, with a reward town that grows as you learn.**
No extra install: clone the repo, symlink it into your skills directory, then `/superlearning <topic>`.
Landing page: **[cskwork.github.io/superlearning-skill](https://cskwork.github.io/superlearning-skill/)**.

An agent skill for learning you actually keep. You remember what you *make*, not what you watch - so every
bite hands you one thing to produce with a sense (draw it, sing it, act it, move to it, laugh at it), and
finishing it grows a little isometric town that doubles as your memory palace. It is fun-first on purpose,
because fun is what makes you come back tomorrow. But fun that teaches nothing is just play, so one rule
never bends: every bite still carries a plain definition, a real worked example, and an own-words say-back.
For a quick fact you just want stated, skip the skill and answer plainly.

## What it adds over a plain chatbot

A plain chatbot will explain at you, let you nod along, and call it learned - leaving you with the warm
feeling of knowing and nothing you can rebuild tomorrow. `/superlearning` adds the five things it will not
do for free:

- **Make, don't watch (the flagship).** Every bite hands you ONE sensory activity you produce yourself - a
  sketch, a verse, a "what if...?" scene, a set of recall reps, a punchline - never a clip to watch or a
  finished diagram to stare at. You remember what you generate, not what you receive, and the gate rejects
  any activity marked as passively consumed.
- **The reward is earned - and it doubles as your memory palace.** Finishing a bite with a passed recall
  check earns a block; blocks build an isometric town through five tiers (plot -> room -> house -> village
  -> city), rendered by `templates/world/world.html` with no build step and no dependencies. Each building
  is tagged with the concept it stands for, so the town you built becomes a spatial cue for recalling what
  you learned - the reward AND the review map.
- **Never-vague core.** The fun wraps a core that never changes: a jargon-free definition, one concrete
  REAL worked example (a solved instance, not a hand-wavy analogy), and a prompt that makes you say it back
  in your own words. Miss any one and the bite is decoration, not learning - and the gate fails it.
- **No fake progress.** A reward system dies the moment you can hand yourself a trophy, so the coach never
  awards its own blocks and never stamps its own mastery. An independent **engagement-critic** runs a
  deterministic gate and is the ONLY role that marks a concept mastered or a block earned. Faked progress is
  exactly what it blocks.
- **Never fabricate.** Anything stated as fact - a number, a date, a named study - is sourced into
  `facts.json` with a real URL or it is cut; unverifiable items become documented placeholders, never
  invented facts, citations, or dates.

The fun is the wrapper that keeps you here; the never-vague core and the earned-only reward are what make it
stick.

## Modes

State the mode in one line before teaching, e.g. `JOKE - the midpoint-overflow trap in binary search;
channel humor; bite 4`. The root `SKILL.md` is a router; each mode loads only the reference it needs. Five
channels are things the learner MAKES; two control modes drive the default lesson and the reward world.

| Signal in the request | Mode | One-line use case |
|---|---|---|
| "draw it", "diagram", or spatial / structural content (a tree, a circuit) | **DRAW** (visual) | You sketch the structure or flow by hand - boxes, arrows, a labeled picture; drawing it beats reading it |
| "make a song", "lyrics", "Lyria", or list-like / sequential content | **COMPOSE** (auditory) | You co-write lyrics that encode the idea, plus a ready-to-paste Google Lyria prompt to generate the track |
| "what if", "tell a story", "role-play", or causal / decision content | **ROLEPLAY** (narrative) | A "what if...?" world where the concept is the rule and you are the hero who must use it to win |
| "I can't sit still", "let's move", or drill / rote content | **MOVE** (kinesthetic) | Recall reps tied to push-ups / sit-ups / jumping jacks to music - one rep, one retrieved item |
| "make it funny", "a joke", "a pun", or a sticky, easily-confused point | **JOKE** (humor) | You land a POW! punchline whose joke only works if you understand the mechanism |
| "teach me X", no channel named (the default) | **BITESIZE-LEARN** | Pick the channel the content fits, vary it across bites, teach one small bite end to end, then reward |
| "show my town", "how am I doing", end of a session | **WORLD / REWARD-CHECK** | The independent critic runs the gate, certifies the blocks actually earned, and the town grows |

Tie-breaks: a named channel beats the default ("sing it" -> COMPOSE even inside a "teach me" request); no
channel named -> BITESIZE-LEARN picks by content and variety (never repeat the last sense); "build my world"
with no new learning -> WORLD render only.

> Multi-sensory here means multi-channel *encoding* - more independent hooks back to the same idea - not
> "matching your learning style." Teaching to a self-reported style has no good supporting evidence, so the
> channel is chosen by what the content needs and by variety, never by a label on you.

## Default learn loop (role-separated)

The **learning-coach** teaches the bite, sets the activity, and runs the produce-and-grade loop inline -
your making-and-saying-back is the live verifier, so there is no per-bite reviewer. A **researcher** sources
a fact only when a bite states one. The independent fresh-context **engagement-critic** runs the gate at the
reward boundary - because a reward system dies the moment progress can be faked. The builder never awards
its own blocks.

The work lives in a **vault** = one directory per learner+topic, `.superlearning/<topic>/`, holding
`session-claims.json` (per bite: concept, definition, jargon, worked example, restatement prompt, grading,
sensory activities), `facts.json` (sourced facts, may be `[]`), and `progress-state.json` (xp, streak,
mastered concepts, the world's blocks and tier, review schedule), plus `material/*.html` (the activity
cards) and `world/world.html` (the reward town). **No vault, no gate, no honest town** - create it at step 1.

1. **Frame** (coach). Classify into one mode in a single line. Create or locate the vault.
2. **Diagnose** (coach). A quick, playful prior-knowledge probe. Pick the next small bite and the channel
   that fits it - and isn't the one you just used.
3. **Source** (researcher; only if the bite states an external fact). Verify it into `facts.json` with a
   URL; unverifiable -> documented placeholder, never an invented fact. Skip for pure-reasoning bites.
4. **Teach the bite** (coach). Deliver definition + worked example and attach ONE sensory activity the
   learner MAKES. By default render it to a `material/activity-NN.html` card; the restatement prompt and
   grading stay in the terminal.
5. **Produce + grade** (coach). The learner makes the artifact and says the idea back in their own words.
   Name the FIRST gap by the 6-type rubric, return exactly one friendly follow-up question, and cheer real
   progress. Loop within the bite until gap-free.
6. **Reward-check** (engagement-critic, independent - at the session/world boundary). The critic re-reads
   the vault, runs the gate, and enumerates any violation as `file:locator`. It is the only role that marks
   a block `earned` or a concept `mastered`. Live bites between rewards skip this.
7. **Grow the town + schedule** (coach, after the gate is green). Add the earned block(s), bump xp/streak,
   advance the tier when thresholds are crossed, and re-render `world/world.html`. Schedule spaced retrieval
   (1 day / 1 week / 1 month). On a miss, re-teach through a DIFFERENT channel.

Roles -> personas: teach = `agents/learning-coach.md`, gate/reward = `agents/engagement-critic.md`, sources
= `agents/researcher.md`.

## Quickstart

```text
/superlearning teach me how recursion works with all five senses
/superlearning make studying the Krebs cycle fun
/superlearning sing me a song to remember the cranial nerves
/superlearning act out how a binary search finds a number
/superlearning do push-ups while I memorize the planets
/superlearning show my town
```

## The gate

The certifying check is deterministic and the coach cannot run it on its own work - only the
engagement-critic does:

```bash
node templates/engagement-gate.mjs .superlearning/<topic>
```

It runs at the reward boundary, not on every live bite. It reads the vault control files - never guesses -
and runs five sub-gates IN ORDER; any FAIL = overall FAIL, printed as `file:locator` violations shown
verbatim:

1. **never-vague** (the welded-on core). Each concept has a non-empty jargon-free `definition`, a concrete
   `workedExample` (not empty, not analogy-only, not a restated definition), a `restatementPrompt`, and a
   `factual` flag; declared jargon is unpacked.
2. **active-engagement** (the flagship). Each activity declares a valid `channel`
   (`visual|auditory|narrative|kinesthetic|humor`), `produced:true` (the learner made it), and a non-empty
   `retrievalRole`; passive consumption and learning-style language fail.
3. **bitesize**. One small concept per bite (at most 4 new jargon terms); each grading carries one `gapType`
   and exactly one follow-up question.
4. **reward-integrity**. Every `earned:true` block maps to a concept actually taught AND mastered with a
   passed retrieval; a re-teach uses a different channel. No fabricated progress.
5. **integrity**. Every `factual:true` claim resolves to a `facts.json` source with a non-empty URL.

The reward world (`world/world.html`) is checked structurally in the same run (loads `world.css`/`world.js`,
has a `.world-stage` and a readable `.world-summary`). NEVER weaken a gate to pass a lesson - fix the lesson.

## House rules

- **Make, don't watch.** Every bite hands you one artifact to produce with a sense; passive consumption does
  not count and the gate rejects it.
- **Never vague.** Every bite still ships a jargon-free definition, a concrete real worked example (never an
  analogy alone), and an own-words say-back.
- **The reward must be earned.** A block requires a passed retrieval; the coach never awards its own blocks
  or stamps its own mastery - only the independent critic does.
- **Mix the senses; never type the learner.** Vary the channel across a session for more encoding hooks.
  This is multi-channel encoding, not learning-style matching (no evidence for style-matching); the gate
  fails "because you're a visual learner."
- **Re-teach through a different sense.** A missed concept comes back in a DIFFERENT channel - draw it
  instead of singing it - never the one that just failed.
- **Bite-size, one concept at a time.** Working memory holds about four things; split anything bigger into
  finishable pieces.
- **Never fabricate.** Source every stated fact into `facts.json` or cut it; a missing source yields a
  documented placeholder, never an invented fact, citation, or date.
- **Role-separated.** Coach != critic; the builder never runs its own gate.
- **Output discipline.** Prose in the learner's language; keep identifiers, file paths, commands, and JSON
  keys in canonical English. No emoji; WCAG AA contrast on any HTML; report with the gate's command output.

## Install

This repo **is** the skill. Put it where your agent CLI finds skills:

```bash
git clone https://github.com/cskwork/superlearning-skill.git
cd superlearning-skill
SRC="$(pwd)"
mkdir -p ~/.claude/skills ~/.agents/skills ~/.codex/skills

# One canonical checkout, symlinked into each active agent.
# If a target exists, audit it first and preserve any local edits before replacing it.
ln -s "$SRC" ~/.claude/skills/superlearning
ln -s "$SRC" ~/.agents/skills/superlearning
ln -s "$SRC" ~/.codex/skills/superlearning

# Canonical repo verification:
bash tests/run-all.sh
```

Then in your agent CLI: `/superlearning <your topic>`.

### Windows

The skill runs on Windows; the gate and test scripts use `node` plus POSIX shell, so run them under **Git
Bash** or **WSL** (`node` must be on `PATH`). The repo pins `.gitattributes eol=lf`. Install by **copy** if
symlinks need admin rights (`cp -R` in Git Bash/WSL, or `mklink /D` from an elevated `cmd`), then run the
contract tests under WSL bash.

## Layout

```
SKILL.md            thin router: the never-vague core, the 5 channels + 2 control modes, the role-separated loop, the gate
agents/             one persona per role: learning-coach.md (builder) - engagement-critic.md (independent gate) - researcher.md (facts)
reference/          learning-core.md (always-on authority) - draw.md - compose.md - roleplay.md - move.md - joke.md - bitesize-reward.md - world-progress.md - workspace.md - sources.md
templates/          engagement-gate.mjs (the deterministic gate) - skill-frontmatter-gate.mjs - workspace/ (control-file examples) - world/ (the isometric reward town) - teach/assets/ (HTML activity-card scaffold)
tests/              contract tests + fixtures/ (pass-vault, fail-vault) + run-all.sh canonical verifier
docs/               index.html landing page + .nojekyll
```

The vault `.superlearning/<topic>/` is created per learner+topic at runtime, git-ignored, never committed.

## License

MIT. See [`LICENSE`](LICENSE).
