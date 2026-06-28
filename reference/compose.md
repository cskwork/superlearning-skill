# compose.md - COMPOSE (auditory): co-write lyrics and a Google Lyria prompt so the order sings itself back

Loaded in **COMPOSE** mode - the request says "make a song", "give me lyrics", "Lyria", "리리아", or the
content is list-like, sequential, or rhythmic: an ordered process, the steps of an algorithm, a list of
vocabulary, the parts of a formula. The learner does not press play on someone else's song; they co-write
the lyrics that encode the concept, then run a ready-to-paste prompt in Google Lyria to hear their own
track. This file overlays `learning-core.md` with one channel's detail; it never overrides the never-vague
core. Every bite sung here still ships a plain `definition`, a concrete real `workedExample`, and an
own-words `restatementPrompt` - the melody makes the order land, those three make it stick.

One hard fact about this channel: **the skill cannot synthesize audio itself.** The coach produces two
text things - the lyrics the learner co-fills, and a Google Lyria prompt the learner pastes into Lyria to
generate the track. The memory win is the learner *writing the words*, not the audio that comes back.

## What the learner MAKES

Lyrics that encode the concept - the ordered list as the hook, the logic in the lines - which the learner
co-writes by filling in the load-bearing words. Then they paste the assembled Lyria prompt into Google
Lyria and generate the song.

The learner writes the words. They never just listen to a finished song - that is passive consumption, and
the active-engagement sub-gate fails any activity marked `produced:false`. So the activity records
`produced:true` (they authored the lyrics) and a one-sentence `retrievalRole` naming what the writing
forces - for an order-of-operations song, "learner fills the operation and its rank in each line, so the
verse cannot be completed without putting the six operations in the correct order." Listening to the track
afterward is the reward; co-writing it is the learning.

## When this channel fits

Reach for COMPOSE when the concept is a sequence or a list the learner needs to hold in order:

- **Sequential** - steps in a fixed order: the order of operations, the steps of binary search, a
  deploy pipeline, the stages of mitosis.
- **List-like** - a set to memorize: vocabulary, the planets, the parts of a formula, the cranial nerves.
- **Rhythmic** - anything with a beat or meter already in it: a chant, a chemical series, a verb
  conjugation pattern.

Pick a different channel when the content is not a list: a spatial structure draws better (DRAW), a
decision the learner must make is felt better in a scene (ROLEPLAY), a counterintuitive trap lands harder
as a joke (JOKE). And vary the channel across the session - if the last bite was a song, sing something
else next, so the ideas get more than one kind of hook.

## The move

The running example for this whole file: **the order of operations** (do parentheses, then exponents, then
multiply/divide, then add/subtract). Carry it all the way through.

1. **Say the concrete thing first, then name it.** "Two people read 2 + 3 x 4. One does 2 + 3 first and
   gets 20; the other does 3 x 4 first and gets 14. They can't both be right." Only then name it: math
   fixes this with the `order of operations`. The learner feels the problem before the rule arrives.
2. **Ship the never-vague triple into `session-claims.json`.** `definition`: "The order of operations is
   the fixed sequence for evaluating an expression - parentheses first, then exponents, then multiply and
   divide left to right, then add and subtract left to right - so everyone gets the same answer." Unpack the
   jargon (`expression`, `exponent`, `left to right`). `workedExample` (`type:"worked"`): "Evaluate
   2 + 3 x 4^2. Exponent first: 4^2 = 16. Then multiply: 3 x 16 = 48. Then add: 2 + 48 = 50. Doing it left
   to right instead gives 80 - wrong, because multiply binds before add." `restatementPrompt`: "In your own
   words, why do we need a fixed order at all - what goes wrong if two people evaluate 2 + 3 x 4 in
   different orders?"
3. **Co-write the lyrics with blanks the learner fills.** Hand a skeleton where the load-bearing words are
   missing and they supply them - the operation and its rank: "First the ______ that group things up
   (parentheses) / then ______ stacking high (exponents) / ______ and ______ side by side (multiply,
   divide) / last we ______ and ______ by." The hook is the ordered list in their own words.
4. **Assemble the Lyria prompt and hand it ready to paste.** Fill the template below with a genre, mood,
   tempo, and structure, then the co-written lyrics. The learner pastes it into Google Lyria and generates
   the track - that step is theirs to run; the skill writes the prompt, Lyria makes the sound.
5. **Render the card.** Put the definition, the worked example, the lyric skeleton, and the Lyria prompt
   block into `material/activity-NN.html`; keep the restatement and grading in the terminal.
6. **Write the activity entry and grade the say-back.** Append to `activities[]`: `conceptId`,
   `channel:"auditory"`, `produced:true`, the `retrievalRole`, the `artifact` path, the `prompt`. Then in
   the terminal give the `restatementPrompt`, find the first gap, ask one follow-up, and cheer.

### Lyria prompt template

A clean, reusable block - fill the bracketed parts, keep the lyrics in front:

```
[genre/style], [mood], [tempo in BPM], [structure: e.g. short verse + repeating chorus].
A study song to memorize <CONCEPT>. Clear lead vocal, lyrics easy to hear, simple backing.
Lyrics:
<the co-written lyrics, one idea per line, the ordered list as the chorus hook>
```

Filled for the order of operations:

```
Upbeat pop, bright and playful, 100 BPM, short verse + repeating chorus.
A study song to memorize the order of operations. Clear lead vocal, lyrics easy to hear, simple backing.
Lyrics:
First the parentheses that group things up,
then the exponents stacking high,
multiply and divide moving left to right,
add and subtract go by.
(Chorus) P-E, M-D, A-S - that's the order, that's the order,
P-E, M-D, A-S - same answer every time.
```

## Keep it real

A catchy tune is fun, and fun is what brings the learner back - but the lyrics have to carry the *logic*,
not just rhyme. The test the engagement-critic applies: do the words actually encode the concept, or do
they only name it? A jingle that sings "math is fun, PEMDAS, woo" without the learner generating the order
and *why* multiply binds before add is fun-but-empty, and it gets flagged even with `produced:true`. The
lyrics earn their place when the learner had to put the operations in sequence themselves and the chorus is
that sequence.

And the song is the encoding, not the check. The say-back still happens in the terminal: after they write
the verse, they tell you in their own words why a fixed order is needed, and you grade that one gap at a
time. A great track with no restatement is half a bite.

## One honest aside

There is a real reason co-writing beats listening, worth one sentence to the learner, not a lecture: you
remember what you generate far better than what you receive, so the win is the learner *filling the words*,
not the polished audio that Lyria sends back (the generation effect; Slamecka & Graf 1978,
https://psycnet.apa.org/record/1980-20399-001). The melody is the glue that holds the order together; the
writing is what burns it in. So always make them author the load-bearing lines - never hand over a finished
song to memorize.

## Pitfalls

- **Decoration.** A catchy hook that names the concept but encodes none of its logic - the order never
  actually appears in the words. Fun-but-empty; the critic flags it.
- **Passive consumption.** Handing the learner a finished song to listen to and memorize. That is
  `produced:false` and fails active-engagement. They co-write the lyrics; you do not sing it at them.
- **Lyrics that don't touch the concept.** Rhyming for vibe ("numbers numbers all day long") while the
  actual sequence and the reason for it never make it into a line.
- **Overload.** Cramming a whole syllabus into one anthem. One bite is one small concept with at most four
  new terms; the order of operations is one song, the distributive law is a different one.
- **Style-typing.** Routing every bite to a song "because they're an auditory learner." No evidence supports
  style-matching, the phrase fails the gate, and it starves the other channels. Pick COMPOSE by the
  content's shape and by variety.
- **Promising audio the skill can't make.** Saying "here's your song, press play." The skill writes lyrics
  and a Lyria prompt; the learner runs Lyria. Be honest about who makes the sound.

## Worked example end to end

Topic: arithmetic. Bite: the order of operations. Channel: auditory.

The card (`material/activity-02.html`) shows the learner:

- **Definition:** "The order of operations is the fixed sequence for evaluating an expression - parentheses,
  then exponents, then multiply/divide left to right, then add/subtract left to right - so everyone gets the
  same answer." (`expression` = the math you're evaluating; `left to right` = when two are tied, do the
  leftmost first.)
- **Worked example:** "2 + 3 x 4^2: exponent 4^2 = 16, then 3 x 16 = 48, then 2 + 48 = 50. Left-to-right
  instead gives 80 - wrong, multiply binds before add."
- **Write this:** the blanked verse above, for the learner to fill - then the filled Lyria prompt to paste.

The activity entry in `session-claims.json`:

```json
{
  "conceptId": "order-of-operations",
  "channel": "auditory",
  "produced": true,
  "retrievalRole": "learner fills the operation and its rank in each line, so the verse cannot be completed without putting the operations in the correct order",
  "artifact": "material/activity-02.html",
  "prompt": "Fill the blanks in the verse with the operation and its rank, then paste the assembled prompt into Google Lyria to generate your song."
}
```

In the terminal, after they write the verse: "Love it - the chorus is the order itself. In your own words,
why do we even need a fixed order - what breaks without one?" The learner answers; you grade one gap. If
they say "so it's neat" without naming that two people would otherwise get different answers, that is a
`causal` gap, and your single follow-up is "What happens to 2 + 3 x 4 if two people pick different orders?"
Cheer the fix, then the bite is ready for the reward boundary - where the independent engagement-critic, not
the coach, decides whether the block is earned.
