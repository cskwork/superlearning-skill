# bitesize-reward - sizing the bite and earning the blocks

Load this in BITESIZE-LEARN: when you decide how big the next bite is, which sense carries it, and what
the learner earns for finishing it. `learning-core.md` is the authority and this file never overrides it;
it only fills in the detail for bite sizing, the channel choice, the block economy, xp and streak,
spacing, and what a miss costs. The companion `world-progress.md` covers the town those blocks build -
the tiers, the render, the memory palace - and the two files share one set of tier thresholds, printed at
the bottom of each and identical across both.

The whole point: keep every bite small enough to win, fun enough to come back to, and honest enough that
the reward means something. A bite the learner cannot finish is too big; a reward the learner did not
earn is worth nothing.

## Size the bite: one small concept, four new words at most

A *bite* is ONE small concept with a handful of new terms and nothing more. Working memory holds about
four things at once, so a bite that drops more than **four** new jargon terms overflows it and the
bitesize sub-gate fails the concept (`session-claims.json:<conceptId>`). A *jargon term* is any word the
learner would not already use plainly; every one you keep must be unpacked, either inside the `definition`
or in the `unpacked` map (that is the never-vague rule, enforced separately).

Rules of thumb for cutting a bite to size:

- **One concept, one bite.** "How binary search works" is a topic, not a bite. "Why throwing away half is
  safe" is a bite. If the say-back would need two ideas to be complete, split it into two bites.
- **Show, then name.** Lead with the concrete thing the learner can see or do and attach the word second -
  the mechanism should land before the label arrives, never the other way round.
- **Start on familiar ground.** Open the bite with an everyday anchor the learner already knows (a group
  chat, a line at a counter) and make the first ask a near-certain win; reach the new term as the name for
  what they just pictured. A winnable first step buys the confidence for the harder say-back, and on a
  "this is hard" you shrink the anchor rather than repeat the framing. See the ease-in law in
  `learning-core.md`.
- **Four new words is the ceiling, not the target.** Most good bites introduce one or two. If you are at
  four and still need another, that is the signal the bite is really two bites.
- **Finishable beats complete.** A short bite the learner nails and a small reward they pocket beats a
  thorough bite they abandon halfway.

## Pick the channel by the content, then vary it

Every bite hands the learner ONE thing they *make* through one of the five channels (the make-don't-watch
law in `learning-core.md`). Choose the channel by what the content actually is, not by who the learner is -
there is no such thing as a fixed "learning style" and the gate fails that phrase.

| The content is mostly... | Reach for | Mode | Because |
|---|---|---|---|
| structure, layout, or flow | `visual` | DRAW | a shape is easiest to hold as a picture |
| a sequence or a list to keep in order | `auditory` | COMPOSE | rhythm and rhyme lock an order in |
| a decision, a rule, or a cause | `narrative` | ROLEPLAY | a story makes the learner apply the rule |
| a procedure or a count to drill | `kinesthetic` | MOVE | tying recall to reps fixes a sequence |
| a trap, a gotcha, or a sharp mechanism | `humor` | JOKE | a punchline only lands if you get the mechanism |

Then **vary it across the session** - draw one bite, sing the next, act the third. Variety is a desirable
difficulty (it makes each retrieval a little harder and a little stickier), and the same web of ideas gets
several different hooks. The gate cannot measure variety, but the engagement-critic flags a single-channel
session as a HIGH finding, so spread the senses on purpose.

## The block economy: finished means a passed retrieval

Finishing a bite earns blocks, and blocks build the town. "Finished" has exactly one meaning here: the
learner said the idea back cleanly and then, **unprompted, applied it to a small new case**. That is a
*passed retrieval* - the concept is recorded `mastered:true` with `retrievalPassed:true`, and only then is
a block `earned:true`.

Two rules are welded on and never bend:

- **A block is earned only for a passed retrieval.** A block on a concept that is not mastered with
  `retrievalPassed:true` is fabricated progress, and the reward-integrity sub-gate blocks it
  (`progress-state.json:world.blocks[i]`). No orphan blocks, no IOUs.
- **No self-awarding.** The coach never flips its own `earned` and never stamps its own `mastered`. It
  builds the bite and proposes the reward; the independent engagement-critic is the ONLY role that marks a
  concept mastered or a block earned, and only after the gate runs green. A reward you can hand yourself is
  worth nothing.

### What a block is, and how a building grows

Each earned block carries a `kind` - a decoration label the world maps to a sprite. The kinds are `floor`,
`lamp`, `door`, `window`, `tree`, `shop`, and `flag`.

- The **first** block a concept earns is its `floor` - the foundation. That is what makes a building rise
  on the town; one mastered concept is one building.
- Every **later** passed retrieval for that same concept earns one more block - a decoration (`door`,
  `lamp`, `window`, `tree`, `shop`, `flag`) - and the building grows taller and gains an ornament at its
  base. So a concept the learner keeps alive visibly becomes a taller, busier house.

The natural cadence for the later blocks is the spaced-review schedule below: each clean review pass earns
one decoration. A freshly mastered concept is a one-floor building; a concept that has survived its day,
week, and month reviews is a tall, decorated one. How the town reads those blocks - and how it climbs the
tiers - lives in `world-progress.md`.

## xp and streak: cosmetic fuel, never a gate

`xp` and `streak` are pure motivation and the gate ignores both. `xp` is a points counter that ticks up
when a bite is finished and again when a review passes; `streak` counts the consecutive days the learner
shows up. They make the numbers go up and the dopamine flow, but they never earn a block, never advance a
tier, and never stand in for a passed retrieval. Keep them honest too: do not pad `xp` for a bite that was
not finished.

## Spacing and interleaving: keep the blocks earned

A concept is not done the day it is mastered; it has to survive time. Schedule spaced retrieval at
**1 day / 1 week / 1 month** after mastery (spaced practice beats cramming), and write each due-marker into
`reviewSchedule` as `{ conceptId, due }` with `due` one of `1d` / `1w` / `1m`. A returning session opens by
walking the town and testing the old buildings before any new ground is broken (see `world-progress.md`).

- **A clean review pass earns a decoration** and pushes the next interval out a rung (`1d` -> `1w` -> `1m`).
- **A failed review demotes the concept** out of `masteredConcepts` - drop `mastered` and `retrievalPassed`
  - and it re-enters the loop through a fresh channel. Its building stops growing until it is re-earned.
- **Interleave once each concept stands on its own.** Mix two or more mastered concepts in a review set and
  make the learner name which one a question is about before answering. Do not interleave a concept the
  learner has never passed alone - that is confusion, not difficulty.

## A miss costs nothing but a different sense

A miss is normal and it is cheap: no block, no penalty, just a re-teach. The one rule is that the re-teach
uses a **different channel** than the one that just failed - if singing it did not land, draw it instead.
Append the new attempt as a fresh `activities` entry with the new `channel`, and log the channel in the
concept's `reteachHistory`. The reward-integrity sub-gate reads that history: if any channel appears twice,
it fails ("re-teach through a DIFFERENT sense"). Same idea, new hook - never the same hook louder.

## Worked walk-through: three bites, three buildings

Topic `binary-search`, learner Alex.

1. **Bite 1 - "throw away half" (`visual` / DRAW).** Alex draws the list as six boxes, circles the middle,
   crosses out the impossible half, redraws, repeats. Asked why the half is safe to drop, Alex explains it
   unprompted and applies it to a fresh seven-item list. Passed retrieval, so the critic records
   `halving-the-search` as `mastered` and earns its `floor` block. One building stands on the plot.
2. **Bite 2 - "why sorted matters" (`narrative` / ROLEPLAY).** Wrong channel first: Alex tries to sing it
   and stumbles on the say-back. No block. The coach re-teaches it as a scene - Alex is a librarian who can
   only trust the shelf when it is in order - logs the failed `auditory` and the new `narrative` in
   `reteachHistory`, and this time the say-back is clean. Second building, second `floor`.
3. **Bite 3 - "about log2(n) steps" (`kinesthetic` / MOVE).** Alex does one push-up per halving of a
   1000-item list and counts to about ten. Clean, unprompted transfer to a million items (about twenty
   push-ups). Third `floor` block, third building. The town is now three buildings - a `house`.

A day later Alex returns, walks the town, and re-derives "throw away half" from memory: a clean review
pass, so that building earns a `lamp` and grows a storey. The reward tracked the learning exactly.

## Canonical tier thresholds

The town climbs five tiers as buildings (one per mastered concept) accumulate. These thresholds are the
coach's policy for when to bump `world.tier`; the gate only checks the tier name is one of the five and
that every earned block maps to a mastered concept. The same table appears in `world-progress.md` and the
two MUST stay identical.

| Tier | Town reaches this at (mastered concepts) | What unlocks |
|---|---|---|
| `plot` | 0 | bare ground - the vault exists, nothing mastered yet |
| `room` | 1 | the first building rises |
| `house` | 3 | roofs appear on the buildings |
| `village` | 5 | trees scatter across the grass |
| `city` | 8 | roads thread between the buildings |

## Pitfalls

- **A block for an unmastered concept.** Fabricated progress - reward-integrity fails it. Pass the
  retrieval first, then earn the block.
- **The coach awarding its own block.** Only the engagement-critic marks `earned` or `mastered`, only after
  a green gate. A self-awarded reward is the one thing this skill will not allow.
- **A bite with five-plus new terms.** It overflows working memory and fails bitesize. Split it.
- **Re-teaching a miss with the same channel.** A duplicate channel in `reteachHistory` fails the gate, and
  repetition was never the fix anyway. Change the sense.
- **Padding xp or streak.** They are cosmetic, but a padded counter is still a lie the learner feels when
  the recall is not there. Tick them only for real finishes.
- **One sense all session.** A single-channel run is a HIGH finding; vary the channel so the ideas get
  several hooks.
