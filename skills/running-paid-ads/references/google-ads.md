# Google Ads - Search Campaign Method

How to structure, read, and tune Google Ads search campaigns. Everything here
is relative to the account's own history and economics - never quote outside
benchmark figures.

## Search campaign structure

The hierarchy is campaign, then ad group, then keywords and ads. Settings
that control money and reach (budget, location, bidding strategy, networks)
live at the campaign level; relevance lives at the ad group level.

Structural judgment calls, in order of importance:

- **Split brand from non-brand into separate campaigns, always.** They have
  different economics, different competition, and different jobs. Mixing them
  makes every report unreadable and lets brand performance subsidize
  non-brand waste invisibly.
- **Split campaigns where the settings must differ**: different budgets for
  different product lines, different locations, different bidding targets.
  Do not split for any other reason - every split divides conversion data
  and starves automated bidding.
- **Group keywords by shared intent, not by shared words.** An ad group is a
  promise: everyone searching these terms should be well served by the same
  ad and the same landing page. If you cannot write one honest ad that fits
  all the keywords in a group, the group is too broad.
- **Fewer, tighter ad groups beat many sparse ones.** A small number of ad
  groups with clear intent each is easier to write good ads for, easier to
  match to landing pages, and easier to read.
- **One campaign per theme is the default.** Resist elaborate segmentation
  by device, audience, or match type unless a real settings difference
  demands it. Modern bidding handles most of that internally.

Signs a structure is wrong: the same search term triggers keywords in
several ad groups or campaigns (they compete with and muddy each other);
ad groups with many keywords but generic ads; every ad group landing on the
homepage; a campaign named after a date or a person rather than an intent.

## Quality Score

Quality Score is Google's per-keyword estimate of ad quality, reported on a
ten-point scale, built from three rated components: expected click-through
rate, ad relevance, and landing page experience. Each component is rated
below average, average, or above average against other advertisers on that
query.

How to use it:

- Treat it as a **diagnostic label, not a target**. The goal is cheaper,
  better-placed ads; Quality Score is a symptom readout. Never advise
  chasing the number for its own sake.
- **Read the components, not the composite.** Low expected click-through
  rate points at the ad copy or at buying queries the offer does not fit.
  Low ad relevance points at keyword-to-ad mismatch - usually an ad group
  covering too many intents. Low landing page experience points at the page:
  slow loading, thin or mismatched content, poor mobile experience.
- **Prioritize by spend.** A poor score on a keyword taking a large share of
  budget matters; the same score on a keyword with a trickle of impressions
  does not. Sort by cost first, then look at scores.
- A low score on a brand-adjacent or competitor keyword is often structural
  (the page is not about the competitor) and may be acceptable - judge
  against the economics, not the score.

What raises the components, in practice: tighter ad groups so the ad can
echo the search; ad copy that includes what the person searched for and a
concrete reason to choose this business; landing pages that continue the
ad's promise and load fast on phones. Heatmaps and replays on
the landing page provide direct evidence for the landing-page-experience
component that Google only hints at.

## Keyword match types

Current semantics - these have changed over the years, and stale intuitions
cause real waste:

- **Exact match** covers the keyword's meaning, including close variants:
  plurals, misspellings, reorderings, and same-meaning substitutes. It is no
  longer literally exact. Use it for the terms that provably convert.
- **Phrase match** covers queries that include the meaning of the keyword,
  with looser context around it. The middle ground for controlled discovery.
- **Broad match** covers anything Google's systems consider related to the
  keyword's intent, informed by the landing page and the rest of the ad
  group. It reaches furthest and drifts furthest.

Decision rules:

- Default new spend to exact and phrase on proven intent. Add broad match
  only when paired with conversion-based smart bidding and an actively
  maintained negative list - broad match hands query selection to the
  algorithm, and the algorithm optimizes toward the conversion signal it is
  given, including a bad one.
- The search terms report is the only truth about what any match type is
  buying. Review it on a regular cadence - weekly for an account spending
  meaningfully, and after any match type or bidding change.
- When the same query matches multiple keywords, Google picks by its own
  preference rules; do not build structures that depend on controlling which
  keyword catches which query.

## Negative keywords

Negatives are the steering wheel for match-type looseness. Method:

- Mine the search terms report for queries that cannot convert: wrong
  intent (jobs, free, DIY, informational research when selling a service),
  wrong product, wrong place. Add them as negatives at the level where they
  should never appear - campaign level for universal exclusions, ad group
  level for steering queries between ad groups.
- Maintain a shared negative list at the account level for the universal
  junk, applied to every search campaign, so new campaigns start protected.
- **Negatives match nearly literally.** They do not inherit the generous
  close-variant matching of positive keywords: a negative does not block its
  own misspellings or plurals in all cases. Add the variants seen in the
  search terms report explicitly.
- Check for conflicts after adding: a broad negative can block the
  campaign's own money keywords. Google flags some conflicts, not all.
- Remember the invisible tail: low-volume queries are hidden from the
  report, so negatives can only ever trim the visible waste. Structural
  fixes (tighter match types, better keywords) are the lever on the rest.

## Bidding strategies

The families, and when each fits:

- **Manual and enhanced-style CPC bidding** gives control per keyword but no
  machine learning. Fitting only for tiny accounts, brand-new accounts with
  no conversion history, or when tracking is not yet trustworthy - bidding
  automation trained on bad conversions automates the waste.
- **Maximize clicks** buys traffic volume with no regard for quality. Fit
  for short traffic tests when tracking is not ready. Left running, it
  reliably finds the cheapest clicks, and the cheapest clicks are cheap for
  a reason. Never leave an account on it once conversions are tracked.
- **Maximize conversions / maximize conversion value** (without a target)
  spends the full budget chasing the most conversions or value it can find.
  Fit when the budget is fixed and the account has steady conversion volume.
  Watch for it paying silly prices at the margin when the budget is generous
  relative to demand.
- **Target CPA / target ROAS** (a target set on the maximize strategies)
  trades volume for efficiency. Fit for accounts with solid conversion
  history and a known break-even. Setting the target far more aggressive
  than recent actual performance throttles delivery sharply - move targets
  in modest steps and let each settle.

Operating rules:

- Smart bidding learns from the conversion it is told to optimize. Verify
  the conversion action set as primary is the real business event, not a
  soft event like a pageview - the algorithm will happily maximize whatever
  it is pointed at.
- After any bidding change, expect a learning period with unstable delivery.
  Judge nothing during it, and never judge the change on the incomplete
  most-recent days (conversion lag).
- An account with only a handful of conversions a month cannot feed target
  based bidding. Options, in order: consolidate campaigns to pool signal,
  optimize to a higher-volume upstream event honestly labeled as a proxy,
  or stay on simpler bidding until volume exists.
- When diagnosing a sudden delivery drop, check in this order: budget
  exhaustion, a bidding target recently tightened, a conversion tracking
  break (smart bidding starves quickly once it loses its signal), then the
  auction itself (impression share lost to rank).

## Reading a search account quickly

A fast read, in order, when handed access or an export:

1. Conversion actions: what is counted, which are primary, when each last
   recorded a conversion.
2. Spend by campaign: where the money goes; brand versus non-brand split.
3. Search terms by cost: the top spending terms - are they buyable intent?
4. Impression share lost to budget versus rank, per campaign.
5. Auto-applied recommendations setting, and the change history for
   surprises nobody remembers making.

This ordering surfaces the expensive problems before the interesting ones.
