# draw.md - DRAW (visual): sketch the structure by hand so the shape becomes the memory

Loaded in **DRAW** mode - the request says "draw it", "diagram", "show me", "map it out", or the content
is spatial, structural, or relational: a tree, a circuit, a data flow, anatomy, a thing that sits between
two other things. The learner does not look at a finished picture; they put pen to paper and build the
shape themselves, because the act of drawing it is the act of remembering it. This file overlays
`learning-core.md` with one channel's detail; it never overrides the never-vague core. Every bite drawn
here still ships a plain `definition`, a concrete real `workedExample`, and an own-words `restatementPrompt`
- the picture makes the relation land, those three make it stick.

## What the learner MAKES

A hand-drawn diagram of the structure or flow: boxes for the parts, arrows for what connects to what,
2-5 word labels, and a traced path through the mechanism. Not a pretty illustration - a structural sketch
where the placement carries meaning (this box is *near*, that one is *far*; this arrow runs *before* that
one).

The learner draws it. They never receive a finished diagram to admire - that is passive consumption, and
the active-engagement sub-gate fails any activity marked `produced:false`. So the activity records
`produced:true` (they made the marks) and a one-sentence `retrievalRole` naming exactly what the drawing
forces them to recall or generate - for a cache diagram, "learner places the cache between CPU and RAM and
traces a hit and a miss by hand, so the picture cannot be finished without showing why the near box is
asked first." If the drawing could be completed without understanding the concept, the `retrievalRole` is
wrong and the critic flags it.

## When this channel fits

Reach for DRAW when the concept's structure lives in space or in a flow:

- **Spatial / structural** - parts arranged relative to each other: a binary tree, a circuit, a stack of
  layers, the chambers of the heart, where a cache sits between CPU and RAM.
- **Relational** - what connects to what: a dependency graph, a state machine, who-calls-whom.
- **Flow with stages** - a request moving through a system, a signal down a pathway, a pipeline.

Pick a different channel when the content is not shaped like a picture: an ordered list to memorize sings
better (COMPOSE), a decision the learner must make is felt better inside a scene (ROLEPLAY), a rote drill
sticks better with reps (MOVE), a counterintuitive trap lands harder as a joke (JOKE). And vary the channel
across the session on purpose - if the last bite was drawn, draw is exactly the one to skip next, so the
web of ideas gets several different hooks rather than one.

## The move

The running example for this whole file: **how a cache sits between the CPU and RAM**. Carry it all the way
through.

1. **Say the concrete thing first, then name it (show, then name).** "Your CPU needs a number. Picture
   asking a sticky note on your desk before walking all the way to the library shelf for it." Only then
   attach the word: that desk sticky note is a `cache`. The learner should feel the near/far gap before the
   term arrives.
2. **Ship the never-vague triple into `session-claims.json`.** `definition`: "A cache is a small, fast
   store of copies that sits between the CPU and main memory (RAM), so the data you use most is fetched from
   the near, fast box instead of the far, slow one." Unpack the jargon (`cache`, `CPU`, `RAM`, `hit`,
   `miss`). `workedExample` (`type:"worked"`): "CPU needs value X. It asks the cache first (about 1 ns) -
   miss, so it goes to RAM (about 100 ns), copies X into the cache, and returns it. Next time X is needed
   the cache answers in 1 ns. Three reads of X cost 100 + 1 + 1 ns with the cache, versus 300 ns going to
   RAM every time." `restatementPrompt`: "In your own words, why does a small fast box in front of a big
   slow one speed things up, even though the small box can't hold everything?"
3. **Hand a drawing brief, not a drawing.** Tell the learner exactly what to put on the page - "Draw three
   boxes left to right: CPU, Cache, RAM. Make the Cache small and close to the CPU, RAM big and far. Write
   the speed under each. Draw the arrow for 'ask the cache first', then the arrow for 'miss - go to RAM',
   then the arrow for 'copy back'." Render this brief plus the definition and worked example to
   `material/activity-NN.html` so the card matches every other card; the dialogue stays in the terminal.
4. **Make them trace, not just label.** The encoding comes from committing the mechanism to the page: "With
   your pen, follow one hit (CPU - cache - done) and one miss (CPU - cache - RAM - back). Number the steps
   as you go." Tracing is what forces the recall the `retrievalRole` names.
5. **Write the activity entry.** Append to `activities[]`: `conceptId`, `channel:"visual"`,
   `produced:true`, the `retrievalRole`, the `artifact` card path, and the `prompt` you handed over.
6. **Grade the say-back in the terminal.** Give the `restatementPrompt`, find the FIRST gap by the 6-type
   rubric, return exactly one warm follow-up question, and cheer the real progress before moving on.

## Keep it real

A drawing is fun, and fun is the point - but the picture has to carry the *concept*, not just decorate the
screen. The test the engagement-critic applies: could the learner have drawn this without understanding
anything? A blob labeled "computer", a clip-art CPU, three boxes with no arrows and no near/far placement -
that is decoration, fun-but-empty, and it gets flagged even though `produced:true`. The drawing earns its
place only when the *placement and the arrows encode the relation*: the cache has to be between the CPU and
RAM, the near box has to be asked first, the miss has to walk all the way to RAM. Make the learner commit
those choices on paper.

And the picture is the encoding, not the check. The say-back still happens in the terminal: after they
draw, they tell you in their own words why the near box is checked first, and you grade that one gap at a
time. A beautiful diagram with no restatement is half a bite.

## One honest aside

There is a real reason drawing beats re-reading, and it is worth one sentence to the learner, not a
lecture. When people drew a to-be-remembered word instead of writing it, they later recalled more than
twice as many - and it was not because drawing took longer or because they were "artistic"; the benefit
held across seven experiments even with the drawing time cut short (Wammes, Meade & Fernandes 2016,
https://journals.sagepub.com/doi/10.1080/17470218.2015.1094494). Drawing makes you encode the thing as a
picture *and* in words at once, so you get two hooks to recall it by instead of one. That is the whole
bet of this channel.

## Pitfalls

- **Decoration over structure.** A nice-looking picture that encodes no relation - no arrows, no near/far,
  no order. Pretty is not the goal; the placement carrying meaning is. The critic flags fun-but-empty.
- **Passive consumption.** Handing the learner a finished diagram to look at. That is `produced:false` and
  fails active-engagement. They draw it; you do not draw it for them.
- **The drawing doesn't touch the concept.** Sketching the CPU's logo or a cute computer face instead of
  *where the cache sits and why near means first*. If the mechanism never has to appear on the page, the
  activity is empty.
- **Overload.** Cramming the whole memory hierarchy (registers, L1, L2, L3, RAM, disk, network) into one
  bite. Working memory holds about four things; one bite is one small concept with at most four new terms.
  Draw the cache-between-two-boxes first; the rest are later bites.
- **Style-typing.** Routing this learner to DRAW every single time "because they're a visual learner." There
  is no evidence style-matching helps, the phrase fails the gate, and it starves the other channels. Pick
  DRAW by the content's shape and by variety, never by a label on the person.
- **Skipping the triple.** A gorgeous diagram with no plain `definition`, no real `workedExample`, or no
  `restatementPrompt`. The fun never replaces the core; never-vague fails the bite.

## Worked example end to end

Topic: caching. Bite: where a cache sits and why it helps. Channel: visual.

The card (`material/activity-03.html`) shows the learner:

- **Definition:** "A cache is a small, fast store of copies that sits between the CPU and main memory (RAM),
  so the data you use most comes from the near, fast box instead of the far, slow one." (`hit` = the cache
  had it; `miss` = it didn't and we go to RAM.)
- **Worked example:** "CPU needs X. Cache first (~1 ns): miss. Go to RAM (~100 ns), copy X into the cache,
  return it. Next read of X: ~1 ns. Three reads cost 100 + 1 + 1 ns, versus 300 ns straight to RAM."
- **Draw this:** "Three boxes - CPU, Cache, RAM, left to right. Cache small and near, RAM big and far. Write
  the speed under each. Draw and number the arrows: ask cache, miss to RAM, copy back. Then trace one hit
  and one miss with your pen."

The activity entry in `session-claims.json`:

```json
{
  "conceptId": "cache-between-cpu-and-ram",
  "channel": "visual",
  "produced": true,
  "retrievalRole": "learner places the cache between CPU and RAM and traces a hit and a miss by hand, so the picture cannot be finished without showing why the near box is asked first",
  "artifact": "material/activity-03.html",
  "prompt": "Draw CPU, Cache, RAM as three boxes; size and place them by speed; draw and number the hit and miss arrows; trace each path with your pen."
}
```

In the terminal, after they draw: "Nice - you put the cache right where it belongs. In your own words, why
does asking the small box first speed things up even though it can't hold everything?" The learner answers;
you grade one gap. If they say "because it's faster" without saying *why* checking the near box first saves
the slow trip, that is a `causal` gap, and your single follow-up is "What does asking the cache first let
you skip when the data is already there?" Cheer the fix, then the bite is ready for the reward boundary -
where the independent engagement-critic, not the coach, decides whether the block is earned.
