# roleplay.md - ROLEPLAY (narrative): the concept is the rule of the world, and the learner is the hero

Loaded in ROLEPLAY mode ("what if...?", "tell a story", "role-play", "imagine", or causal /
decision-driven content). It overlays `learning-core.md` and never overrides the never-vague core: even
inside the most gripping scene, the bite still ships a jargon-free `definition`, a concrete
`workedExample`, and a `restatementPrompt`. The story is the hook that makes the idea land; those three
are what make it stick.

A roleplay bite drops the learner into a small "what if...?" world whose ONE rule IS the concept being
taught. The learner is not the audience - they are the hero who can only win the scene by using the
concept correctly, turn after turn. If the scene can be won without understanding the idea, it is
decoration, and the engagement-critic flags it.

## What the learner MAKES

The artifact is the learner's run of the scene: the choices they make, the next move they pick, and the
one-line reason each move obeys the rule. They continue the story by acting, not by listening. Concretely,
the learner says (or types) "I do X because the rule says Y," the coach narrates the consequence, and the
world advances - until the scene is won or the rule is broken.

This is `produced:true`: the learner generates the decisions and their justifications; they do not watch
the coach play it out. Record the activity in `session-claims.json` with `channel:"narrative"`,
`produced:true`, and a one-sentence `retrievalRole` that names exactly what the choices force the learner
to regenerate - for example, "learner picks each next hop and justifies it, rebuilding the forwarding rule
at every node instead of recalling a memorized path." A scene the learner only reads is passive
consumption and fails the active-engagement sub-gate.

## When this channel fits

Reach for ROLEPLAY when the content is causal, decision-driven, a system, or a process - anything where
one choice forces the next:

- a feedback loop (a thermostat, interest compounding, a predator-prey swing)
- a market or mechanism (supply meeting demand, an auction, congestion pricing)
- a protocol or algorithm's decisions (a packet routing across the internet, a handshake, the branch a
  search takes)
- a process with stakes (how a bill becomes law, how a cell decides to divide)

It fits poorly for flat facts, a spatial structure (draw it), or a list to drill (move it). Vary the
channel across a session: if the last bite was a roleplay, draw or sing the next one. Multi-sensory means
several channels of encoding, not matching a "learning style" - never route every bite through stories
because the learner "likes stories."

## The move

Carry ONE concrete world the whole way. Worked topic here: **"what if you were a packet trying to cross
the internet"** - the concept is **next-hop forwarding** (each router sends a packet one step toward its
destination using only its own local table, never the whole map).

1. **Set the "what if...?" and name the rule.** "What if you were a single packet at router A, and you
   had to reach router D - but you can only ever see the router you're standing on?" State the rule
   plainly, which IS the `definition`: *"A packet moves one hop at a time; at each router you read that
   router's routing table, pick the one next hop it points to for your destination, and move - you never
   see the full route."* Unpack the jargon as it lands: a **hop** is one step from one router to the next;
   a **routing table** is the cheat-sheet at a router saying which neighbor is the best next step toward a
   given destination.

2. **Show one turn worked, concretely** (the `workedExample`, type `worked`, not an analogy): "You're at
   A. A's table says: for D, go to B. You hop to B. B's table says: for D, go straight to D. You hop to D.
   Two hops, A->B->D - and A never knew B's table at all." Real nodes, real moves: this is the solved
   instance the gate requires.

3. **Hand the controls to the hero.** Give the learner a fresh start state - say, the packet is at A, the
   destination is now C, and they can only see the current router's table each turn. Ask for their move
   and their reason: "You're at A, you want C. What's your next hop, and why that one?" They must apply the
   rule, not recite the earlier path.

4. **Narrate the consequence; let the rule bite.** Resolve each choice in-world. Right move: "You arrive
   at B - nice, B's table points to C." Wrong move, or an attempt to "teleport" to C by naming the whole
   route: the world refuses - "You can't see C from A; you only get the next hop. What does A's table
   actually say?" The constraint is the teaching: it forces local reasoning.

5. **Add one twist that probes the boundary.** Break a link: "The A-B cable just died and the tables
   updated. You're back at A heading for C - now what?" A learner who memorized a path stalls; a learner
   who owns the rule re-reads the table and re-routes. This separates understanding from recall.

6. **Win the scene, then ship the say-back.** When the packet reaches its destination by clean rule-use,
   the scene is won. Put the `restatementPrompt` on the card: *"In your own words, why can a packet reach D
   even though router A has no idea what the full path looks like?"* In the terminal take the learner's
   answer and grade it one gap at a time (the 6-type rubric in `learning-core.md`).

Throughout, the never-vague triple still ships: the rule was the `definition`, the A->B->D turn was the
`workedExample`, and step 6 is the `restatementPrompt`. The story carried them; it did not replace them.

## Keep it real

The danger of a good story is that it entertains without teaching. Two guardrails:

- **The scene must exercise the CONCEPT, not just be fun.** Winning has to require the rule. If the
  learner could reach D by charm, luck, or a memorized path, the scene is testing the wrong thing - the
  engagement-critic flags "fun but does not exercise the concept." Build the world so the only key that
  opens the next door is the idea itself (here: you literally cannot proceed without choosing a valid next
  hop). Costumes and names are free; the decision must be load-bearing.
- **The restatement prompt is on the card.** The card renders the world, the worked turn, and the static
   `restatementPrompt`; the learner's own-words answer and the reactive one-gap grading happen live in the
   terminal - that is where you find out whether the hero actually learned the rule or just enjoyed the
   ride. A clean scene with no graded say-back is an unfinished bite.

A strong sign you got it right: the learner, unprompted, applies the rule to a case you never scripted
("so if B's cable died too, I'd check A's table for the next-best neighbor, right?"). That unprompted
transfer is what lets the critic mark the concept mastered.

## One honest aside

Stories are not just sugar - absorption into a narrative ("transportation") measurably shifts what a
reader takes away and believes, more than a flat presentation of the same content (Green & Brock 2000,
https://pubmed.ncbi.nlm.nih.gov/11079236/). A learner who is *in* the scene is doing the kind of effortful
imagining that lays down memory. And when the scene asks the learner to guide or teach a character rather
than only act, you can borrow the protege effect - people work harder and learn more preparing to teach
than to be tested (Chase et al. 2009, https://link.springer.com/article/10.1007/s10956-009-9180-4). Keep
it one honest footnote, not a lecture; the full evidence base lives in `sources.md`.

## Pitfalls

- **Decoration, not teaching.** A vivid world with no `definition`, `workedExample`, or
  `restatementPrompt` is a campfire story. Ship all three or it fails the never-vague sub-gate.
- **Passive consumption.** The coach narrating an adventure while the learner listens is `produced:false`
  and fails active-engagement. The learner must make the choices and give the reasons.
- **A scene that doesn't touch the concept.** Naming a hero and a dragon but letting the win turn on a
  coin flip teaches nothing. The rule must be the only path forward; the critic flags fun-without-
  engagement.
- **Cognitive overload.** A sprawling lore dump (ten characters, three subplots, five new terms) drowns
  the one idea. Working memory holds about four things - keep the world tiny and the new jargon at four
  terms or fewer, or it fails bitesize.
- **Style-typing.** Routing every bite through stories "because you're a narrative learner" is
  style-matching, which has no evidence and fails the gate. Pick ROLEPLAY because the content is
  decision-driven, then vary the channel next bite.
- **An analogy wearing a story's clothes.** "Imagine the packet is a tourist asking for directions" is an
  analogy, not a worked example - it can ride along tagged `type:"analogy"`, but the `workedExample` must
  still be a real solved instance (A->B->D with actual tables).

## Worked example end to end

Topic: computer networking. Bite: next-hop forwarding. Channel: narrative.

1. Frame: `ROLEPLAY: next-hop forwarding; channel narrative; bite 2`. (Bite 1 was a DRAW of the network's
   shape - so this bite switches sense.)
2. Scene: "You are a packet at router A. Reach router D. You can only see the table of the router you're
   on." The rule is the definition.
3. Worked turn shown: A's table -> B; B's table -> D; arrived in two hops, A never saw B's table.
4. Learner plays a fresh start (A -> C), choosing each hop and justifying it; the coach narrates; a downed
   link forces a re-route to probe the boundary.
5. The card poses the say-back: "Why does A not need the whole map?" In the terminal the learner answers:
   "Because each router only has to know the next step, and the next router knows the step after that." Gap
   check: clear cause -> `gapType:"none"`. They add, unprompted, "and if a link dies, the table just points
   somewhere else" - transfer.

The `session-claims.json` payload for the bite:

```json
{
  "concepts": [
    {
      "id": "next-hop-forwarding",
      "definition": "A packet crosses a network one hop at a time: at each router it reads that router's table, takes the single next hop pointed at its destination, and repeats - no router needs the whole route.",
      "jargonTerms": ["hop", "routing table"],
      "unpacked": { "hop": "one step from one router to the next", "routing table": "the cheat-sheet at a router listing the best next neighbor for each destination" },
      "workedExample": { "type": "worked", "content": "Packet at A wants D. A's table: for D go to B. Hop to B. B's table: for D go straight to D. Hop to D. Two hops, A->B->D; A never saw B's table." },
      "restatementPrompt": "In your own words, why can a packet reach D even though router A has no idea what the full path looks like?",
      "factual": false
    }
  ],
  "gradings": [
    { "conceptId": "next-hop-forwarding", "gapType": "none", "followUpQuestion": "" }
  ],
  "activities": [
    { "conceptId": "next-hop-forwarding", "channel": "narrative", "produced": true, "retrievalRole": "learner picks each next hop and justifies it, rebuilding the forwarding rule at every node instead of recalling a memorized path", "artifact": "material/activity-02.html", "prompt": "You're a packet at A heading for C; you can see only the current router's table. Call each next hop and why - then survive a downed link." }
  ]
}
```

At the reward boundary the engagement-critic runs `node templates/engagement-gate.mjs
.superlearning/computer-networking`; never-vague and active-engagement pass, and only then is a block
earned and the town grown.
