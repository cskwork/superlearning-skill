# move.md - MOVE (kinesthetic): one rep, one retrieved item, to music

Loaded in MOVE mode ("I can't sit still", "let's move", "exercise", or drill / rote / sequence / list
content that needs many repetitions). It overlays `learning-core.md` and never overrides the never-vague
core: the bite still ships a jargon-free `definition`, a concrete `workedExample`, and a
`restatementPrompt`. Moving the body is the hook that makes the reps fun and frequent; the never-vague
triple is what makes them teach.

A MOVE bite welds recall to physical exercise set to music. The mechanic is one line and never bends:
**one rep equals one retrieved item.** Each push-up, sit-up, or jumping jack is paired with one thing the
learner says OUT LOUD FROM MEMORY - the next step in a procedure, the next item in an ordered list, one
verb's conjugation. The body keeps a beat; the mouth does the retrieval; the music keeps it light.

## What the learner MAKES

The artifact is the learner's spoken retrieval, paced by their own reps: a sit-up and "step one: set low
and high," another sit-up and "step two: find the middle," and so on - generated from memory, not read off
a page. The reps are the metronome; the recalled words are the point.

This is `produced:true`: the learner generates every item out loud while moving - they do not watch a
workout video or listen to someone else recite. Record it in `session-claims.json` with
`channel:"kinesthetic"`, `produced:true`, and a one-sentence `retrievalRole` naming what the reps force -
for example, "learner does one sit-up per step and speaks the next step at the top of each rep, rebuilding
the ordered procedure from memory." Reading the list while exercising, or moving in silence, is not
retrieval and fails the active-engagement sub-gate.

**The reps plan format (clean and reusable).** Write the activity as a small reps plan so any drill bite
can reuse it. Match the exercise to the content's shape:

- **sit-ups -> an ordered sequence** (each rep = the NEXT step, in order)
- **jumping jacks -> an unordered set or list** (each rep = name ONE member, any order, no repeats)
- **push-ups -> pairs or mappings** (each rep = one pair recalled whole, e.g. a verb and its past tense)

```
Reps plan
- exercise: sit-ups            # sit-ups | jumping jacks | push-ups (scale to the learner)
- count: 6                     # one rep per item to retrieve
- recall on each rep: say the NEXT step of binary search out loud, from memory
- order: in sequence, step 1 -> step 6
- tempo: ~1 rep / 3-4 s, to a steady 60-90 BPM track
- music: a steady-beat track the learner picks
- round 2 (optional, harder): shuffle - coach calls a random rep number, learner does one rep + states that item
```

The shuffle round turns ordered recall into random-access recall - a desirable difficulty that proves the
learner owns the item, not just the running order.

## When this channel fits

Reach for MOVE when the content is a drill: rote, a sequence, a list, or anything that needs MANY spaced
retrievals to stick:

- the ordered steps of an algorithm or procedure (binary search, CPR, long division)
- a list or set to memorize (the planets, the cranial nerves, a vocabulary set)
- mappings and conjugations (irregular verbs: go/went/gone; element symbols; capitals)

It fits poorly for a one-off causal insight (role-play it) or a spatial structure (draw it). Vary the
channel across a session - drill the verbs with reps today, sing them tomorrow. This is multi-channel
encoding, not a "learning style": never route every bite through movement because the learner "is
kinesthetic."

## The move

Carry ONE concrete topic the whole way. Worked topic: **the ordered steps of binary search.**

1. **Name the concept and ship the definition.** *"Binary search finds a target in a sorted list by
   checking the middle item and throwing away the half that cannot contain it, then repeating on what's
   left."* Unpack the jargon as it lands: a **sorted list** is items already in order; the **target** is
   the value you're hunting.

2. **Show it worked, concretely** (the `workedExample`, type `worked`): "Find 7 in [1,3,5,7,9,11]: middle
   is 5, 7>5 so drop the left half; middle of [7,9,11] is 9, 7<9 so drop the right half; land on 7 in 3
   checks, not 6." A real solved instance, not an analogy.

3. **Break it into a numbered list of rep-sized items.** Six steps, one per rep:

   1. Set `low` to the first index, `high` to the last.
   2. Find the middle index between `low` and `high`.
   3. Compare the middle item to the target.
   4. If they are equal, you found it - stop.
   5. If the target is larger, move `low` to just past the middle (search the right half).
   6. If the target is smaller, move `high` to just before the middle (search the left half).

4. **Hand over the reps plan.** Sit-ups, count 6, one step per rep, said from memory at the top of each
   rep, to a steady track the learner picks. Page or screen face-DOWN - the whole point is recall, not
   reading.

5. **Do a round, then a shuffle round.** First round in order (rep 1 -> step 1 ... rep 6 -> step 6).
   Second round shuffled: "rep - what's step 4?" The learner does one sit-up and answers. Random access
   proves ownership.

6. **Ship the say-back in the terminal.** After the reps, the `restatementPrompt`: *"Say the steps back in
   your own words - why does each one follow from the last?"* Grade one gap at a time. A learner who can do
   the reps but cannot explain why step 5 discards a whole half has an `example` or `causal` gap to close.

The never-vague triple still ships: step 1 is the `definition`, step 2 is the `workedExample`, step 6 is
the `restatementPrompt`. The exercise multiplied the retrievals; it did not replace the substance.

## Keep it real

- **The reps must exercise the CONCEPT, not just the body.** Fifty jumping jacks with a video playing is a
  workout, not a bite. The rep only counts when it is welded to one item the learner SPEAKS FROM MEMORY. If
  they read the steps off a sheet, or just sweat in silence, the engagement-critic flags "fun but does not
  exercise the concept" - the retrieval is the teaching, the exercise is the wrapper and a mild arousal
  boost.
- **The say-back stays in the terminal.** The card can hold the definition, the worked trace, and the reps
  plan; the restatement, the learner's own-words answer, and the one-gap grading happen live in the
  terminal. Doing the reps shows the learner can recite the order; the terminal say-back shows they
  understand WHY - and only that earns the block.
- **Safety: gentle, optional, scaled.** The reps are a memory tool, not a fitness test. Scale the count
  and the exercise to the learner, swap jumping jacks for seated marches or toe-taps when needed, never
  push through pain, and let anyone opt out for plain seated recall ("text only" / "터미널로"). A learner
  who does three gentle reps and speaks three items has done the bite; the number is never the point.

## One honest aside

A bout of cardiovascular exercise around the time of study is associated with modest memory benefits in
meta-analysis, with larger effects when the movement comes close to learning (Roig et al. 2013,
https://pubmed.ncbi.nlm.nih.gov/23806438/). But be honest about the engine: the heavy lifting here is
retrieval practice - pulling each item out of memory rather than re-reading it - and movement mostly makes
those many retrievals fun, rhythmic, and frequent. Keep it one footnote, not a lecture; the full evidence
base lives in `sources.md`.

## Pitfalls

- **Decoration, not teaching.** Reps with no `definition`, `workedExample`, or `restatementPrompt` are
  just a workout. Ship all three or it fails the never-vague sub-gate.
- **Passive consumption.** Watching an exercise video or hearing someone else recite is `produced:false`
  and fails active-engagement. The learner moves AND speaks, from memory.
- **The rep doesn't touch the concept.** Counting reps while reading the list, or moving in silence,
  retrieves nothing - the critic flags fun-without-engagement. One rep, one item said from memory.
- **Overload.** Cramming twenty items into one bite blows past working memory (about four things at once)
  and the four-new-term bitesize line. Chunk a long list into short sets; space the sets out.
- **Style-typing.** Routing every bite through movement "because you're a kinesthetic learner" is
  style-matching - no evidence, and the gate fails the language. Pick MOVE because the content is a drill,
  then vary the channel next bite.
- **Mistaking order for understanding.** Reciting the steps in sequence is recall of the order, not proof
  of the idea - always close with the terminal say-back that asks WHY.

## Worked example end to end

Topic: binary search. Bite: the ordered steps. Channel: kinesthetic.

1. Frame: `MOVE: the steps of binary search; channel kinesthetic; bite 3`. (Bite 2 was a roleplay - so
   this bite switches sense.)
2. Definition + worked trace shipped (find 7 in [1,3,5,7,9,11] in 3 checks).
3. Reps plan handed over: sit-ups, count 6, one step per rep, from memory, to a steady track; sheet
   face-down.
4. Round 1 in order, round 2 shuffled ("rep - step 4?"). The learner nails both.
5. Terminal say-back: "Why does each step follow the last?" Learner explains the middle check halves the
   list each time -> `gapType:"none"`, and adds, unprompted, "so a list of 1000 only needs about ten
   checks" - transfer.

The `session-claims.json` payload:

```json
{
  "concepts": [
    {
      "id": "binary-search-steps",
      "definition": "Binary search finds a target in a sorted list by checking the middle item and throwing away the half that cannot contain it, then repeating on what is left.",
      "jargonTerms": ["sorted list", "target"],
      "unpacked": { "sorted list": "items already in order, smallest to largest", "target": "the value you are trying to find" },
      "workedExample": { "type": "worked", "content": "Find 7 in [1,3,5,7,9,11]: middle is 5, 7>5 drop the left half; middle of [7,9,11] is 9, 7<9 drop the right half; land on 7 in 3 checks, not 6." },
      "restatementPrompt": "Say the steps back in your own words - why does each one follow from the last?",
      "factual": false
    }
  ],
  "gradings": [
    { "conceptId": "binary-search-steps", "gapType": "none", "followUpQuestion": "" }
  ],
  "activities": [
    { "conceptId": "binary-search-steps", "channel": "kinesthetic", "produced": true, "retrievalRole": "learner does one sit-up per step and speaks the next step at the top of each rep, rebuilding the ordered procedure from memory", "artifact": "material/activity-03.html", "prompt": "Sit-ups x6 to a steady track, sheet face-down: one step of binary search said out loud per rep, in order; then a shuffled round." }
  ]
}
```

At the reward boundary the engagement-critic runs `node templates/engagement-gate.mjs
.superlearning/binary-search`; never-vague and active-engagement pass, and only then is a block earned and
the town grown.
