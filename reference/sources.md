# sources.md - the light evidence base + the never-fabricate backstop

This skill is fun-first, but the fun rides on a few real findings, and this file is where each one is
written down honestly. It is the bibliography of *why a bite teaches the way it does* - not a place for the
*domain facts inside a lesson* (those live in the topic vault's `facts.json`). It is also the backstop the
integrity sub-gate leans on: every method claim a bite states as fact must trace to a line here, with a real
url that was actually fetched. The rule under everything: cite it or cut it. Keep it light - one honest aside
per bite, never a lecture.

## When to open this file

- About to tell a learner *why* a move works ("you remember what you draw") - pull the plain cite from here.
- The `engagement-gate.mjs` integrity sub-gate FAILed an unsourced factual claim - find or add its source.
- A bite wants to state a number, a percent, or a dated figure - confirm the magnitude below first.
- Auditing the skill for fabrication - this is the master list every method claim must resolve to.

## Two kinds of claim - route each correctly

- **Method evidence** ("drawing beats writing for recall") is stable. It is sourced *here*, re-read not
  re-fetched. When a bite states one to the learner, copy it into `facts.json` with the url below.
- **Domain fact in content** ("water boils at 100 C at sea level", "a 2026 chip costs $X") is volatile. The
  researcher re-fetches it into the topic vault's `facts.json` as `{claim, url, retrievedDate}` every time.
  Today is 2026; model memory of any dated figure is presumed stale until re-fetched.

## Canonical numbers - state these verbatim, never inflate

| Claim a bite may state | Magnitude | Source |
|---|---|---|
| Generating an answer beats reading it | d ≈ 0.40 (86 studies, 445 effect sizes) | Bertsch et al. 2007 |
| Drawing a word beats writing it for recall | often >2x as many words recalled | Wammes et al. 2016 |
| Testing beats restudy after a delay | substantially more retained at 1+ week | Roediger & Karpicke 2006 |
| Acute exercise around study, effect on memory | moderate (SMD ≈ 0.26 short-term, ≈ 0.52 long-term) | Roig et al. 2013 |
| Long-term fitness training, effect on memory | small (SMD ≈ 0.15), often not significant | Roig et al. 2013 |
| Spacing study sessions beats cramming | held across 839 assessments; gap scales with target delay | Cepeda et al. 2006 |
| Learning-style "meshing" studies meeting the evidence bar | effectively zero | Pashler et al. 2008 |

Rounding `d ≈ 0.40` up to "doubles your memory", or calling a moderate exercise effect "huge", is
fabrication by exaggeration. State the published magnitude.

## Make, don't watch - generation and retrieval

This is the flagship, and it rests on two of the sturdiest findings in the field.

- **Generation effect: you remember what you produce far better than what you receive.** A meta-analysis put
  the benefit at d ≈ 0.40 across 86 studies and 445 effect sizes - almost half a standard deviation of
  produced-over-read. (Bertsch, Pesta, Wiscott & McDaniel 2007) - https://pubmed.ncbi.nlm.nih.gov/17645161/ .
  The effect was first named by (Slamecka & Graf 1978, *Journal of Experimental Psychology: Human Learning
  and Memory*) [url unverified]. Powers: "make, don't watch", every channel's `produced:true` activity.
- **Testing/retrieval-practice effect: a retrieval attempt beats rereading for lasting memory.** Restudy
  feels better and even raises confidence, yet on a delayed test prior testing wins by a wide margin.
  (Roediger & Karpicke 2006, *Psychological Science*) -
  https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x . Powers: the own-words say-back, the
  spaced return, the block-earned-only-by-passed-retrieval rule.

## DRAW - the drawing effect

- **Drawing a concept beats writing it.** Across seven free-recall experiments, learners recalled often more
  than twice as many drawn as written items; the benefit held even at four seconds per word and did not
  depend on artistic skill, so "I can't draw" is not an exit. (Wammes, Meade & Fernandes 2016, *Quarterly
  Journal of Experimental Psychology*) - journal page is paywalled and would not render; finding verified
  this session via the study summary at https://www.sciencedaily.com/releases/2016/04/160421133821.htm .
  Powers: DRAW (`draw.md`).

## Mix the senses - dual coding

- **Verbal plus visual gives two retrieval hooks, not one.** Dual-coding theory holds that words and images
  are stored in separate but linked systems, so a concept encoded both ways has two independent routes back.
  (Paivio; dual-coding theory) - https://en.wikipedia.org/wiki/Dual-coding_theory ; the education-facing
  review is (Clark & Paivio 1991, *Educational Psychology Review*) [url unverified]. Powers: varying the
  channel across a session, and pairing a plain definition with a made artifact in every bite.

## Spacing and return

- **Spaced practice beats massed practice.** The classic synthesis found distributed study reliably beat
  cramming across 839 assessments, and that the best gap grows with how long you want to keep the material -
  which is exactly why the schedule widens from a day to a week to a month. (Cepeda, Pashler, Vul, Wixted &
  Rohrer 2006, *Psychological Bulletin*) - https://pubmed.ncbi.nlm.nih.gov/16719566/ . Powers: the 1d/1w/1m
  spaced retrieval (`bitesize-reward.md`), the walk-the-town review on return.

## The town is a memory palace - the method of loci

- **Tying ideas to places you know aids recall.** Studying superior memorizers found their edge was not raw
  brainpower but a spatial strategy - the method of loci - that recruited hippocampal, spatial-memory
  circuitry. (Maguire, Valentine, Wilding & Kapur 2003, *Nature Neuroscience*) -
  https://pubmed.ncbi.nlm.nih.gov/12483214/ ; the technique itself - https://en.wikipedia.org/wiki/Method_of_loci .
  Six weeks of loci training later reshaped memory networks in ordinary volunteers (Dresler et al. 2017,
  *Neuron* 93:1227-1235) [url unverified - paywalled]. Powers: the town-as-memory-palace, where each building
  is a spatial cue for the concept it stands for (`world-progress.md`).

## MOVE - movement and memory, honestly

- **A bout of exercise around study time gives a modest memory boost - modest is the honest word.** A
  meta-analysis found acute exercise had moderate effects (SMD ≈ 0.26 on short-term, ≈ 0.52 on long-term
  memory), while long-term fitness training had only small, often non-significant effects. (Roig, Nordbrandt,
  Geertsen & Nielsen 2013, *Neuroscience & Biobehavioral Reviews*) -
  https://pubmed.ncbi.nlm.nih.gov/23806438/ . So MOVE earns its keep mainly because reciting *during* the
  reps is retrieval practice (see "make, don't watch"); the physical effort is a real but secondary assist,
  not magic. Powers: MOVE (`move.md`).

## JOKE - distinctiveness and humor, honestly

- **The surprising item in a list of ordinary ones is remembered better (the von Restorff isolation
  effect).** First shown in 1933: make one item stand out and memory for it jumps.
  https://en.wikipedia.org/wiki/Von_Restorff_effect . Powers: JOKE - a punchline is a spike of distinctiveness.
- **Humor's own added effect is real but mixed, and partly just distinctiveness.** Humorous items are
  recalled better - but the gain comes partly *at the expense* of the non-humorous items around them, a
  differential-processing/distinctiveness account rather than pure "funny = sticky". (Schmidt 2002, *Memory*)
  - https://pubmed.ncbi.nlm.nih.gov/11798442/ . So JOKE leans on distinctiveness plus the fact that *writing*
  a punchline that only lands if the mechanism is right is generation. Don't oversell humor alone. Powers:
  JOKE (`joke.md`).

## ROLEPLAY - the protege effect

- **Preparing to teach makes people try harder and learn more.** Learners who taught a "student" agent put in
  more effort and learned more than those studying for themselves, with the largest gains for lower-achieving
  learners. (Chase, Chin, Oppezzo & Schwartz 2009, *Journal of Science Education and Technology*) -
  https://eric.ed.gov/?id=EJ855299 . Powers: ROLEPLAY, where the learner becomes the hero who must wield the
  concept-as-rule (`roleplay.md`). The story is the wrapper; the generation and the teach-back are the engine.

## Mix by content, not by typing the learner

- **Matching instruction to a self-reported "learning style" has no adequate supporting evidence.** The major
  review found virtually no support for the meshing interaction that the idea requires, and advised spending
  the effort on practices that *do* have an evidence base. (Pashler, McDaniel, Rohrer & Bjork 2008,
  *Psychological Science in the Public Interest*) - https://digitalcommons.usf.edu/psy_facpub/1765/ ; the
  plain-language case is (Willingham 2005) - https://www.aft.org/ae/summer2005/willingham . This is the one
  honest reason the skill mixes channels by the *content* and for *variety*, and never by typing the person -
  no style quiz, no "because you're a visual learner". Not a sermon; just why the router works the way it does.

## The never-fabricate rule

Most bites carry no external fact - a worked example or a derivation is reasoning, not a citation, and needs
no source. But anything a live bite states *as fact* - a number, a date, a named study, an efficacy claim -
resolves to a `facts.json` entry with a real, fetched `url`, or it is cut to a documented placeholder. Never
an invented fact, citation, effect size, or date; a confident guess is a defect, not a hint. A url that 404s
or won't render is not a license to guess - keep the claim only if a second listed source confirms it, else
mark the placeholder and report it. Today is 2026: treat every dated or measured figure as stale until
re-verified. Memory is not a source.
