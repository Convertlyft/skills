# Hypotheses, Frameworks, Prioritization, and Testing

How to move from a diagnosed leak to a change worth making: forming hypotheses, applying LIFT, Fogg, and Cialdini honestly, ranking the backlog, designing experiments, and deciding what to do when the site cannot support a test.

## From evidence to hypothesis

The chain is: observed evidence, then an inferred cause, then a change that targets that cause, then an expected observable effect. Every link must be explicit.

> Because we observed [specific reading and what it showed], we believe [specific change] on [page or step] will [expected behavior change] for [audience segment], which should appear as [metric movement in a named reading]. We will review after [a defined traffic period].

Rules:

- **One mechanism per hypothesis.** A change that bundles a rewrite, a layout shift, and a new form teaches nothing about which part mattered. Bundling is allowed only when the owner explicitly trades learning for speed.
- **Falsifiable or it is not a hypothesis.** Name the metric, the reading it lives in, and what result would count as a loss. If no result could prove it wrong, it is a belief.
- **Inference labeled as inference.** The "we believe" clause is honest about being a guess; the "we observed" clause is not allowed to be one.

## LIFT, applied honestly

Use LIFT as a structured vocabulary for critiquing a conversion page. The value proposition is the anchor; relevance, clarity, and urgency lift it; anxiety and distraction drag it.

- **Value proposition.** The strongest lever and the hardest to fix with tactics. If the offer is weak relative to alternatives, no button color rescues it. Evidence that the value proposition itself is the problem: strong traffic, clean pages, no breakage, and still weak conversion across all segments. Say this to the owner plainly when the readings point there.
- **Relevance.** Continuity between what brought the person (ad, query, link) and what the page says. Diagnose with ads data and rank data against the page's actual first screen.
- **Clarity.** Can the visitor understand the offer and the next step at a glance? Diagnosed through scroll collapse, short visits, and the glance test in the page heuristics reference.
- **Urgency, honestly.** Only real deadlines and real limits: an actual booking cutoff, actual remaining stock, a genuine seasonal reason. Manufactured countdowns that reset and fake "only a few left" claims destroy trust when discovered and can be unlawful. If nothing is genuinely urgent, do not simulate it — reduce friction instead; that lever is always available.
- **Anxiety.** What the page asks the person to risk: money, data, embarrassment, time. Locate it with detours and hesitation evidence, reduce it with reassurance at the exact point of doubt.
- **Distraction.** Everything competing with the primary action. Diagnose with click maps; fix by removal.

## Fogg behavior model

Behavior happens when motivation, ability, and a prompt come together at the same moment. When a desired action is not happening, ask which of the three is missing — in this order:

- **Prompt first.** Is the call to action present, visible, and noticeable at the moment of decision? Heatmaps answer this. A missing or buried prompt is the cheapest fix in optimization.
- **Ability second.** People attempt the action and abandon it: effort friction. Replays and field-level evidence answer this. Simplification is cheaper and more reliable than persuasion — raising ability nearly always beats trying to raise motivation.
- **Motivation last.** The prompt is seen, the task is easy, and people still do not act: the value or the message is failing. This is the expensive lever — it means offer, framing, proof, or audience.

The practical rule: never propose motivational fixes (stronger copy, more persuasion) while ability problems are visible in the replays. Make it easy before making it compelling.

## Cialdini, applied honestly

Each principle has an honest application and a corrupt one. Recommend the first; refuse the second by name if the owner asks for it.

- **Reciprocity.** Honest: give real value before asking — a genuinely useful guide, tool, or answer. Corrupt: bait content that gates everything behind a data grab.
- **Commitment and consistency.** Honest: small first steps that build toward the goal; honoring choices people already made. Corrupt: sneaky opt-ins, and confirm-shaming ("No thanks, I hate saving money").
- **Social proof.** Honest: real counts from real systems, real reviews, real named customers. Corrupt: invented counters, fake activity popups, purchased or edited reviews.
- **Authority.** Honest: verifiable credentials, real expertise shown through the content itself. Corrupt: unearned badges, fabricated press mentions.
- **Liking.** Honest: warmth, real people, a tone matched to the audience. Corrupt: fake personalization pretending to know the visitor.
- **Scarcity.** Honest: true stock levels and true deadlines. Corrupt: perpetual sales and resetting timers.
- **Unity.** Honest: genuine shared identity with a real community. Corrupt: pretending an in-group that does not exist.

The test for any persuasion tactic: would it survive the owner explaining it to a customer's face? If not, drop it. Deceptive patterns also carry legal exposure in many jurisdictions — flag that and leave the legal judgment to the owner.

## Prioritization

**ICE**, with discipline on the middle letter:

- **Impact:** size of the leak the idea touches, weighted by proximity to money. An idea aimed at a step that loses few people cannot have high impact whatever its elegance.
- **Confidence:** strength of evidence, ranked from strongest to weakest: reproduced breakage; multiple independent readings converging; a single clear reading; a pattern that worked elsewhere; an opinion. Confidence scores come from this ladder, never from enthusiasm.
- **Ease:** build cost plus risk plus how reversible it is.

**PXL-style scoring** replaces gut feel with mostly yes-or-no questions, answered from evidence: Is the change above the fold? Would a visitor notice it within a glance? Does it add or remove something, rather than restyle? Does it remove friction? Is it supported by qualitative evidence from this site? By quantitative evidence from this site? Is it on a high-traffic page or step? Is it cheap to build? Count the yeses and rank. The virtue of this style is that "I love this idea" earns nothing.

Standing rules: evidence-backed beats clever; leaks near money beat leaks at the top; repairs skip the queue entirely.

## Experiment design

- **One primary metric, chosen before launch,** as close to money as the traffic volume allows. Everything else is secondary or a guardrail. Guardrails worth watching: revenue per visitor, refund rate, support contact rate.
- **Randomize by person, not by pageview,** and keep each person in their assigned arm for the whole test. Mixed exposure poisons the comparison.
- **Run whole traffic cycles.** Full weeks, covering weekday and weekend rhythm, through at least one complete business cycle for the site. Never stop on a good day — stopping the moment results look favorable is the most common way teams fool themselves.
- **Set the stopping point in advance** from the expected effect size. Qualitatively: the smaller the effect you hope to detect, the more conversions the test needs, and the need grows steeply as effects get small. Most small sites cannot detect modest effects in any reasonable time — see the next section before promising otherwise.
- **Check the split.** Arms should divide as configured; a lopsided assignment means the mechanism is broken and the results are void, however exciting they look.
- **Post-hoc segment digging is exploration, not confirmation.** A "win in one segment" discovered after the fact is a new hypothesis to test, not a result to ship.
- **Write it all down:** hypothesis, variant description, dates, exposure, result, decision. Losing tests are tuition — the record of why something failed is often worth more than a win.

## When there is too little traffic to test

Judge by conversions at the tested step, not by visits. A rough rule expressed honestly: if the step completes only a handful of conversions in a week, a split test of a modest improvement will not resolve in business-relevant time, and recommending one wastes months. With plenty of weekly conversions, most sensible tests can resolve; run a sample-size calculation on the site's own conversion count before promising one. In between, only large, obvious swings are worth testing — subtle variants are not detectable.

When testing is out of reach, work down this ladder instead:

1. **Repair everything broken.** Errors, dead clicks, device cliffs. No test needed, pure gain.
2. **Ship strong-evidence changes and watch.** Before-and-after on the same reading, full traffic cycles on both sides, traffic mix compared, seasonality and campaign changes named in the write-up. Label the conclusion as observational, because it is.
3. **Test only big swings.** Whole-step or whole-page changes with plausibly large effects, not button shades.
4. **Move the test up-funnel** to a higher-traffic step, accepting that the metric is now a micro-step — and always report the money metric alongside it, since moving more people to the next step is worthless if the money metric stays flat.
5. **Run qualitative rounds.** Watch replays at the step until failure modes repeat; have a handful of real or representative people attempt the task while thinking aloud. A small number of observed attempts reliably surfaces the gross problems, though it cannot rank subtle ones.
6. **Painted-door checks for demand questions.** A real-looking entry point for a not-yet-built offer, measuring clicks, with an honest "not available yet" page behind it. Use sparingly and apologize well — it spends a little trust to answer a demand question cheaply.
7. **Accumulate learning with a ritual.** Sequential changes, one at a time, each measured the same way against the same reading, each written down. Slow, but honest — and over time it builds real knowledge of what this site's audience responds to.

## After the change

- Verify in production, on real devices, in the segments that mattered — especially the phone.
- Re-read the same funnel and the same segments after at least one full traffic cycle, and compare the traffic mix before claiming anything.
- Watch the guardrails: a conversion lift that raises refunds or support contacts is not a win.
- Record the outcome either way, in the same log as the hypothesis. The log is the asset; individual wins are just entries in it.
