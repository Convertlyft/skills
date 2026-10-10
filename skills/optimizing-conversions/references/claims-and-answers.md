# Claims and answers

What each reading can support, what no reading here can conclude, how to
shape the common answers, and the traps that make a correct reading say the
wrong thing. Load before writing a diagnosis or verdict for the owner.

## Which reading supports which claim

| Reading | Supports claims about | Cannot tell you |
|---|---|---|
| Traffic summary | Volume, trend, source and device mix; whether there is enough traffic to test | Why anything happens |
| Funnels | Which step loses the most people; differences between segments | The reason for the loss |
| Heatmaps | What people click or ignore, how far they scroll, on one page | Intent, emotion, anything off the page |
| Replays | How individual failures happen: rage clicks, dead clicks, form struggle, error loops | How common they are |
| Errors | Failing scripts and requests; device- or browser-specific breakage | Whether people hit them at the leaking step (cross-check) |
| Search rankings | How people find the site; whether query intent matches the landing page | On-page behaviour |
| Ad data | Paid intent, ad-to-page message match, the money cost of a leak | On-page behaviour |

A claim is strong when two independent readings point the same way — for
example, a drop at the payment step, plus replays showing hesitation at card
entry, plus no error spike, together support "anxiety, not breakage".

## What cannot be concluded without specific evidence

Say these limits plainly.

- **Why people left.** Motive claims ("too expensive", "didn't trust us") are
  inferences until tested or backed by people's own words — surveys,
  interviews, support messages.
- **That a change caused an improvement.** Without a controlled test, or at
  least a clean before-and-after with a stable traffic mix, "went up after we
  changed it" is correlation.
- **That a tactic from another site applies here.** It is hypothesis
  material, never a conclusion.
- **That price is the problem.** Needs evidence such as exits concentrated
  at the price reveal — and even then it is a hypothesis about value.
- **Any external benchmark.** Refuse the framing; use the site's own history.
- **Anything about pages or segments with little data.** Say the sample is
  too small and what volume would change that.
- **How the site feels or reads.** Copy quality and trust need qualitative
  input; analytics shows only their behavioural shadow.
- **What happens off the site.** Calls, emails and later visits that convert
  are invisible unless tracked. Say where visibility ends.

## Answer shapes

**A diagnosis** ("why aren't people converting?"): funnel finding, then
segment finding, then page evidence, then friction class, then the change —
each with its reading named, facts and inferences visibly separate.

**A page review** ("what do you think of my landing page?"): use
page-heuristics.md, but first check whether this page is where
the funnel leaks, and pair every heuristic finding with the reading that
would confirm people hit it.

**A test recommendation** ("should I A/B test this?"): is it testable at this
site's conversion volume; what exactly is the hypothesis; what is the primary
metric and the stopping rule. If volume is too low, say so and offer the
alternatives ladder in hypotheses-and-testing.md.

**A verdict on a past change** ("did the redesign work?"): what the
before-and-after readings honestly support given the traffic mix, and what
they do not. "Not determinable from this data" is often the honest answer.

**Life after the first conversion** (onboarding, activation, cancellations,
failed payments, win-back): read after-the-conversion.md.

## Reporting to the owner

- Lead with the finding that costs the most, not the first one found.
- One recommendation per finding, evidence named inline: "The checkout drop
  is concentrated on phones (funnel by device); replays show the card field
  rejecting valid input; fix the card field validation."
- A plain confidence label on every claim: "confirmed" (reproduced, or
  several readings agree), "likely" (one clear reading), "possible" (pattern
  or inference). Never present a "possible" as a finding.
- Quantify impact only in observed terms — people lost at a step in a named
  window, from the actual reading — never as a projected uplift.
- Every recommendation states how it will be verified and which reading will
  be checked afterwards.
- When the data cannot answer, say so, and name the cheapest way to make it
  answerable.

## Gotchas

- A big drop can be healthy. A signup prompt shown to casual blog readers
  sheds most of them by design. Judge each step against its realistic intent.
- Averages hide mixtures. A site-wide fall is often one segment collapsing
  while everything else is flat.
- A falling conversion rate is not always a page problem. Colder traffic from
  new rankings or broader ads can raise conversions while the rate falls.
- Heatmaps blend screen sizes and page versions. If the page changed inside
  the window, the map shows two pages at once.
- Pick replays by failure signal (rage click, error, abandoned form at the
  leaking step), not by length.
- Do not test what is broken. Fix it and verify.
- More people reaching the next step means nothing if the money metric is
  flat; always report the primary conversion beside any micro-step.
- Full redesigns destroy learning. Prefer targeted changes unless the owner
  accepts that trade.
- Never recommend fake scarcity, invented reviews, countdowns that reset, or
  costs revealed late. Honest alternatives are in
  hypotheses-and-testing.md.
