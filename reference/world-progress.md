# world-progress - the reward town, the memory palace, the reward gate

Load this in WORLD and REWARD-CHECK: when you grow the town, render it, or hand a finished session to the
engagement-critic for the reward gate. `learning-core.md` is the authority and this file never overrides
it; it details the tier ladder, how `world/world.html` draws `progress-state.json`, the memory-palace
idea, the reward-check flow, and the structural check the gate runs on the world page. Its companion
`bitesize-reward.md` covers how blocks are earned in the first place; the two share one set of tier
thresholds, identical across both files.

The town is two things at once: the **reward** the learner is playing for, and the **review system** they
walk through next time. Both only work if every building is honest, so the reward gate is strict.

## The tier ladder: plot -> room -> house -> village -> city

The town climbs five tiers, in this exact order, as the learner masters more concepts. One mastered
concept is one building, so the tier is really a measure of how big the town has grown. `world.tier` in
`progress-state.json` records the current rung; the coach bumps it when the building count crosses a
threshold below, and the renderer reads it to decide what to draw.

| Tier | Town reaches this at (mastered concepts) | What unlocks |
|---|---|---|
| `plot` | 0 | bare ground - the vault exists, nothing mastered yet |
| `room` | 1 | the first building rises |
| `house` | 3 | roofs appear on the buildings |
| `village` | 5 | trees scatter across the grass |
| `city` | 8 | roads thread between the buildings |

`world.js` maps those rungs straight onto what it draws: grass only at `plot` and `room`, pitched roofs
once the town is a `house` (`tierIdx >= 2`), trees scattered on the spare grass at `village`
(`tierIdx >= 3`), and roads threading between buildings at `city` (`tierIdx >= 4`). On top of the tier, a
single building's height grows with the number of blocks earned for its concept, so a long-loved idea
towers over a freshly mastered one even within the same tier.

One honesty note: the threshold is the coach's policy for *when* to set `world.tier`, not a gate rule. The
gate only checks the tier name is one of the five and that every earned block maps to a mastered concept.

## How the world renders progress-state.json

`world/world.html` is a dependency-free page that draws the town on a `<canvas>`. It loads the learner's
state in this order, so it works whether the file is double-clicked from disk or served over http:

1. an inline `<script type="application/json" id="world-data">` block, if present;
2. otherwise a `fetch` of `../progress-state.json` (the live vault file);
3. otherwise an empty plot (nothing learned yet).

From that state, `world.js` keeps only the blocks with `earned:true` and a real `conceptId`, groups them by
concept, and draws one isometric building per group:

- the **building body** is colored by the concept's `channel` - a different hue for visual / auditory /
  narrative / kinesthetic / humor - so the town is color-coded by how each idea was learned;
- the **height** grows with the count of earned blocks for that concept;
- the first `floor` block is the foundation; the other kinds (`lamp`, `door`, `window`, `tree`, `shop`,
  `flag`) are drawn as ornaments clustered at the building's base (the renderer shows up to three);
- blocks with `earned:false` are planned ghost slots - the gate ignores them and the renderer dims them.

Two regions make the reward real and readable:

- **`.world-stage`** holds the `<canvas>` the town is drawn on, and **clicking a building opens its
  concept** - the title and a one-line reminder - so the learner is nudged to recall it from memory first.
- **`.world-summary`** is the text mirror: the same progress in words (tier, building count, xp, streak,
  and a list of buildings with their channels). It is not decoration - a reward that is only a picture
  shuts out anyone using a screen reader, so the summary is required and the gate checks for it.

## What the town looks like as it grows

Take the seeded demo state in `templates/world/world.html`: topic `binary-search`, five mastered concepts,
tier `village`. The renderer reads it like this:

- five `earned:true` groups become five buildings, each tinted by its channel - `halving-the-search` in the
  visual blue, `why-sorted-matters` in the narrative teal, `log-n-steps` in the kinesthetic orange - so a
  glance tells the learner which sense taught what.
- because the tier is `village`, every building wears a roof (unlocked back at `house`) and a few trees dot
  the grass around the edges (unlocked at `village`); roads stay off until `city`.
- a concept with extra earned blocks stands a storey taller and carries its decorations at the base -
  `why-sorted-matters` shows a `door`, `log-n-steps` a `lamp`.
- the most recently earned building gets a brief "new building" toast, and `.world-summary` lists all five
  in plain text for anyone not looking at the canvas.

Open it on an empty vault instead and there are no buildings - just grass and the line that nothing has
been learned yet. The first mastered concept turns that empty plot into a `room` with one building on it,
and the town climbs from there.

## The town is a memory palace

The deepest reason to build a town - not a progress bar - is that **place is the strongest cue we have for
memory**. The *method of loci* (the "memory palace") is the old trick of fixing each thing you want to
remember to a spot along a route you know, then recalling the list by walking the route in your mind. It is
not folklore: when researchers scanned World Memory Championship competitors, most of them turned out to be
using exactly this spatial strategy, leaning on the brain's place-and-navigation machinery rather than any
raw memory horsepower (Maguire et al. 2003, *Nature Neuroscience*).

So the town is built to be walked. Every building is tagged with the concept it stands for, and its
position, its color (the channel), and its decorations are all retrieval cues. When the learner returns,
the first move is to **walk the town and recall each building before reading its label** - that is the
spaced review, dressed up as a stroll through a place they built themselves. Clicking a building is the
check: recall first, then click to confirm.

## The reward-check flow

Rewards are the one thing the coach may never hand itself, so the world only grows through a clean
hand-off. The flow, every time a session produces something worth rewarding:

1. **The coach builds and proposes.** It writes the bites into `session-claims.json`, updates the learner's
   `xp` / `streak`, and lays out the blocks it *believes* were earned - but leaves them `earned:false` and
   the concepts un-`mastered`. It never grades its own reward.
2. **The coach hands off to the engagement-critic.** A fresh-context, independent critic re-reads the vault
   and runs the gate: `node templates/engagement-gate.mjs .superlearning/<topic>`.
3. **The gate runs the five sub-gates in order** - never-vague, active-engagement, bitesize,
   reward-integrity, integrity - plus the structural check on `world/world.html`. Any FAIL is an overall
   FAIL, printed as `file:locator - message`.
4. **On green, the critic earns the rewards.** Only now, and only the critic, flips the passed concepts to
   `mastered:true` / `retrievalPassed:true` and their blocks to `earned:true`.
5. **The coach re-renders and bumps the tier.** With the blocks earned, the coach re-renders the town and
   sets `world.tier` if the new building count crossed a threshold.

If the gate fails, nothing is earned. Fix the lesson and re-run, up to three critique-fix cycles; on
persistent failure report "needs human review" rather than soft-passing. Never weaken the gate to grow the
town - a fabricated building corrupts the very review system the learner depends on.

## The structural world-gate

Whenever the gate sees `world/world.html` (inside a vault, or pointed at directly), it runs a structural
check - the reward has to be a live, accessible page, not a screenshot. It fails the world page unless:

- it is a complete HTML document with a language set (`<html lang=...>`) for screen readers and i18n;
- it links `world.css` and loads `world.js` - built from `templates/world/`, not hand-rolled;
- it has a `.world-stage` (or `#world-stage`) render target for the canvas;
- it has a `.world-summary` (or `data-world-summary`) text region, so progress is readable, not only drawn;
- it carries no learning-style language (no "because you're a visual learner" - there is no evidence for
  style-matching, and the gate fails the phrase).

Keep those hooks intact when you customize the page. The simplest safe path is to copy `templates/world/`
into the vault's `world/` once, then only swap the inline `#world-data` for the learner's live state.

## Pitfalls

- **A building with no learning behind it.** An `earned:true` block whose concept is not mastered with a
  passed retrieval fails reward-integrity. The town must never show a concept the learner cannot recall.
- **The coach earning its own blocks.** Only the critic marks `earned` / `mastered`, and only after a green
  gate. The hand-off is the whole guarantee.
- **Deleting `.world-stage` or `.world-summary`.** Either one missing fails the structural gate; the reward
  must be both drawn and readable.
- **A tier name off the ladder.** `world.tier` must be exactly one of `plot` / `room` / `house` /
  `village` / `city`; anything else fails reward-integrity.
- **Opening a return session with new material.** Walk the town first - the recall on the old buildings is
  the review, and skipping it wastes the one moment forgetting can be caught.
- **Editing the renderer to fake growth.** Grow the town by earning blocks, never by changing how
  `world.js` counts them. A prettier lie is still a lie.
