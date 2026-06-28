# joke.md - JOKE (humor): land a POW! punchline that only works if the mechanism is understood

Loaded in **JOKE** mode - the request says "make it funny", "a joke", "a pun", "POW", or the content is a
sticky, counterintuitive, or easily-confused point: a trap, a famous bug, a place where intuition quietly
lies. The learner does not get told a joke; they craft the one-liner whose punchline only fires if they
understand the mechanism. We label that snap the **POW!** - the moment the concept *is* the joke. This file
overlays `learning-core.md` with one channel's detail; it never overrides the never-vague core. Every bite
joked here still ships a plain `definition`, a concrete real `workedExample`, and an own-words
`restatementPrompt` - the laugh makes the trap memorable, those three make it stick.

## What the learner MAKES

A short joke, pun, or one-liner whose punchline hinges on the concept - built so that if you got the
mechanism wrong, the joke would not land. The setup baits the naive expectation; the POW! is the twist that
only the correct mechanism delivers.

The learner writes the punchline. They are never *told* the joke - that is passive consumption, and the
active-engagement sub-gate fails any activity marked `produced:false`. So the activity records
`produced:true` (they wrote it) and a one-sentence `retrievalRole` naming what the joke forces - for the
midpoint-overflow trap, "learner writes the punchline that only lands if they encode that low + high
overflows before the division happens, so the joke fails unless the mechanism is right." If you could swap
in a wrong explanation and the joke still worked, the punchline isn't doing the teaching.

## When this channel fits

Reach for JOKE when the concept is a point that *surprises* - where the obvious read is wrong:

- **Counterintuitive** - the naive mental model fails: correlation is not causation, a midpoint can
  overflow, a fast algorithm can be slow on sorted input.
- **Easily-confused** - two things people swap: accuracy vs precision, `==` vs `=`, mass vs weight.
- **A sticky trap or edge case** - the bug everyone writes once, the exception to the rule worth never
  forgetting.

Pick a different channel when the content is not a gotcha: a spatial structure draws better (DRAW), an
ordered list sings better (COMPOSE), a decision is felt better in a scene (ROLEPLAY), a rote drill sticks
with reps (MOVE). And vary the channel across the session - a joke every bite gets exhausting and stops
surprising, which is the opposite of what makes this channel work.

## The move

The running example for this whole file: **the midpoint-overflow trap** in binary search - computing the
middle as `(low + high) / 2` can break. Carry it all the way through.

1. **Find the counterintuitive seam.** Name the spot where the obvious model is wrong: "`(low + high) / 2`
   is *obviously* the middle, right? Except the sum can blow up before you ever divide." The surprise is the
   raw material of the joke.
2. **Ship the never-vague triple into `session-claims.json`.** `definition`: "The midpoint-overflow trap is
   a bug where the middle index `(low + high) / 2` breaks: when `low` and `high` are both large, `low + high`
   overflows - wraps past the biggest value the variable can hold to a garbage, often negative, number -
   before the division happens." Unpack the jargon (`index`, `overflow`, `low`/`high` bounds). `workedExample`
   (`type:"worked"`): "A 32-bit signed int maxes at 2,147,483,647. With low = 2,000,000,000 and
   high = 2,000,000,100, low + high = 4,000,000,100 - past the max, so it wraps negative; divide by 2 and the
   index is negative, off the array. The fix: `low + (high - low) / 2` = 2,000,000,000 + 50 = 2,000,000,050,
   which never exceeds high, so it never overflows." `restatementPrompt`: "In your own words, why does
   `low + (high - low) / 2` land on the same middle spot but never overflow?"
3. **Hand a joke brief, not a joke.** Give the comedic frame - setup (bait the obvious), misdirection,
   POW! (the mechanism is the twist) - and let the learner write the punchline: "Write a one-liner where two
   huge indices try to find their middle, and the punchline is what actually happens to their *sum* first."
   Render to `material/activity-NN.html`: the familiar anchor first, then the brief plus the definition
   and worked example, then the static `restatementPrompt` last.
4. **Pressure-test the POW!** Ask the killer question: would the joke still work if the explanation were
   wrong? If you can swap in "binary search is just slow" and the punchline still lands, it encodes nothing -
   push for a sharper one whose laugh *depends* on the sum overflowing before the divide.
5. **Write the activity entry.** Append to `activities[]`: `conceptId`, `channel:"humor"`, `produced:true`,
   the `retrievalRole`, the `artifact` card path, and the `prompt`.
6. **Grade the say-back in the terminal.** The `restatementPrompt` is on the card; take the learner's
   answer, find the FIRST gap by the 6-type rubric, return exactly one warm reactive follow-up question,
   and cheer the real progress.

## Keep it real

A joke is fun, and fun is the hook - but the punchline has to *hinge on the mechanism*, or it is just a
laugh with nothing under it. The test the engagement-critic applies, and the one you apply at step 4: if
the joke would still land with the concept wrong, it teaches nothing - fun-but-empty, and it gets flagged
even with `produced:true`. "Programming is hard, am I right?" is not a POW!; "their sum was too big to hold,
so they wrapped right past each other" is, because you only laugh if you know low + high overflows. Make the
correct mechanism the *only* thing that makes it funny.

And the joke is the encoding, not the check. The `restatementPrompt` is on the card; in the terminal they
answer it in their own words, and you grade that one gap at a time. A great punchline with no restatement
is half a bite.

## One honest aside

There is a real reason a punchline sticks, worth one sentence to the learner, not a lecture: a surprising,
distinctive item stands out against a uniform background and is recalled better than the items around it -
the isolation effect, where the one thing that breaks the pattern is the one you remember (von Restorff
1933; the original German paper is not available in English, so this one travels without a link). A joke is
a deliberate spike of distinctiveness - the trap, dressed up so it refuses to blend in. That is why the
midpoint-overflow trap, told straight, fades, but told as a POW!, sticks.

## Pitfalls

- **Decoration.** A joke that is funny but whose punchline doesn't touch the mechanism. Fun-but-empty; the
  critic flags it. The laugh has to *be* the concept.
- **Passive consumption.** Telling the learner the joke yourself. That is `produced:false` and fails
  active-engagement. They write the punchline; you set the frame.
- **The POW! doesn't hinge on the concept.** If swapping in a wrong explanation leaves the joke intact, it
  encodes nothing - this is the single most common failure of this channel. Test it at step 4, every time.
- **Obscurity or overload.** A joke that needs five new terms to even parse. Keep it one small concept with
  at most four new terms; the punchline should be short enough to land in one breath.
- **Style-typing.** Routing every bite to humor "because they like jokes." No evidence supports
  style-matching, the phrase fails the gate, and constant jokes stop surprising. Pick JOKE by the content's
  shape and by variety.
- **Punching down instead of insight.** A joke about being bad at coding, or at someone's expense, instead
  of about the mechanism - no retrieval value, and it sours the room. The target is the trap, never the
  learner.

## Worked example end to end

Topic: binary search. Bite: the midpoint-overflow trap. Channel: humor.

The card (`material/activity-04.html`) shows the learner:

- **Definition:** "The midpoint-overflow trap: the middle index `(low + high) / 2` can break, because when
  `low` and `high` are both large their sum overflows - wraps past the biggest value the variable holds to a
  garbage, often negative, number - before the divide ever happens." (`index` = a position in the list;
  `overflow` = a number grows past the max the variable can store and wraps around.)
- **Worked example:** "low = 2,000,000,000, high = 2,000,000,100, max int = 2,147,483,647. low + high =
  4,000,000,100 wraps negative; /2 gives a negative index, off the array. Fix: low + (high - low) / 2 =
  2,000,000,050 - same middle, never overflows."
- **Write this:** "A POW! one-liner where two huge indices try to meet in the middle - the punchline is what
  happens to their sum first."

The activity entry in `session-claims.json`:

```json
{
  "conceptId": "midpoint-overflow",
  "channel": "humor",
  "produced": true,
  "retrievalRole": "learner writes the punchline that only lands if they encode that low + high overflows before the division happens, so the joke fails unless the mechanism is right",
  "artifact": "material/activity-04.html",
  "prompt": "Write a one-liner where two large indices try to find their midpoint; the POW! is what happens to their sum before the divide."
}
```

The learner lands something like: "Two maxed-out indices tried to find their middle ground - but their sum
was too big to hold, so they wrapped right past each other into the negatives. POW!" The card already
posed the `restatementPrompt`, so in the terminal you open on their answer: "Ha - that only works because
you know the sum blows up first." The learner answers; you grade one gap. If they say "it's smaller" without
saying *why* (it adds only the half-gap to low, so it can never exceed high), that is a `causal` gap, and
your single follow-up is "What is the biggest value low + (high - low) / 2 can reach, and why can't it pass
high?" Cheer the fix, then the bite is ready for the reward boundary - where the independent
engagement-critic, not the coach, decides whether the block is earned.
