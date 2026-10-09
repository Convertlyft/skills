# Conversion Tracking Integrity, and Meta Ads Basics

Tracking comes first because every other paid-ads judgment stands on it.
Meta follows because its failure modes are mostly tracking and automation
failure modes.

## Conversion tracking integrity

### What a trustworthy setup looks like

- Each platform tracks a conversion that is a **real business event** - a
  submitted lead, a purchase, a booked call - not a pageview, a button
  click that can fire without success, or a scroll milestone dressed up as
  a conversion.
- Exactly **one primary conversion action per goal** per platform. Multiple
  overlapping actions (a form event and a thank-you pageview and an
  imported event, all primary) double- or triple-count, and automated
  bidding optimizes to the inflated total.
- **Click identifiers flow end to end**: auto-tagging on for Google so the
  click id reaches analytics and any offline import; the Meta pixel or
  server-side events carrying proper event ids for deduplication.
- The platform's conversion count **roughly reconciles** with an
  independent source - analytics, the CRM, the order database, even the
  inbox. Rough agreement is the standard; exact agreement never happens
  because attribution definitions differ.

### Verification method

Run this whenever tracking has never been audited, after any site or tag
change, and whenever numbers feel off:

1. **Name the event.** Ask precisely what fires the conversion and where.
   If nobody can answer, that is the finding.
2. **Fire a test conversion** on the live site and watch it arrive in the
   platform's diagnostics. Confirm it arrives once, not twice.
3. **Reconcile counts over a recent full month** (not recent days -
   conversion lag makes them incomplete): platform versus analytics versus
   CRM or orders. Expect differences from attribution windows, view-through
   counting, consent losses, and cross-device gaps. Investigate gaps that
   are large, growing, or one-sided.
4. **Check the boring settings**: time zones, currencies, attribution
   window, and counting mode ("every" versus "one per click" - lead
   generation should almost always count one per click, or one person
   submitting twice becomes two leads).
5. **Walk the conversion path with behaviour analytics**: the funnel shows whether
   people reach the counted step; error readings show whether the path
   throws errors; a replay of a converting session shows whether the
   confirmation state the tag depends on actually appears. A form that
   fails silently for some people undercounts conversions and miscounts
   ad performance through no fault of the ads.

### Common breakages

- The thank-you page or success state changed in a redesign and the tag
  no longer fires. Symptom: conversions fall off a cliff on a deploy date
  while sessions hold steady. Check deploy history against the drop date.
- Consent banners or script blockers suppress tags for a share of people.
  Symptom: a persistent one-sided gap, platform below reality, worse on
  some browsers and regions. This is partially recoverable (server-side
  events), never fully - state the uncertainty rather than pretending
  precision.
- Duplicate tags after a migration - old and new containers both firing.
  Symptom: conversions near-doubled with no matching revenue change.
- Redirects stripping click ids or tags placed on an intermediate page.
- An eager "conversion" defined on a soft event, silently inflating
  everything downstream. Not a technical break - a definition break,
  and an easy one to miss.

### Lead-gen specifics

Cost per lead is only half a metric: the other half is whether leads close.
Where the owner can share CRM outcomes, connect them - offline conversion
import (uploading closed deals keyed by click id) teaches bidding to chase
leads that become customers, not forms that get filled. Without CRM
evidence, never claim lead quality is good or bad; say it is unmeasured and
that it is the single most valuable measurement to add.

## Meta ads basics

Meta (Facebook and Instagram) is a demand-creation channel: it interrupts
people who were not searching. Search harvests existing intent; Meta
manufactures it. This changes what good looks like.

### What matters, in order

1. **The objective and the optimization event.** The campaign objective
   tells Meta what to deliver toward, and delivery follows it literally.
   Optimizing for traffic buys clicks from people who click a lot;
   optimizing for leads or purchases buys those events. An account
   complaining that "clicks are cheap but nothing converts" while optimizing
   for traffic is getting exactly what it asked for.
2. **The pixel plus server-side events.** Meta's optimization is only as
   good as the events it receives. Browser-only tracking loses a share of
   events to blockers and privacy features; pairing the pixel with the
   conversions API and correct event deduplication is the standard setup
   worth recommending.
3. **Creative is the targeting.** With modern broad delivery, the ad itself
   selects the audience: who stops scrolling defines who sees more of it.
   Creative variety and refresh matter more than audience micro-targeting.
   Rising frequency with falling results is creative fatigue - the fix is
   new creative, not a new audience slice.
4. **Consolidated structure.** The learning phase needs a steady flow of
   optimization events per ad set every week. Many small ad sets starve
   each of signal and keep the account permanently in learning. Fewer,
   broader, better-funded ad sets is the default; split only for real
   differences (offer, geography, budget ownership).

### Meta-specific gotchas

- Significant edits (budget, audience, creative swaps) reset the learning
  phase. Constant tinkering reads as constant instability. Batch changes,
  then leave it alone long enough to judge.
- Advantage-style automation expands audiences and placements beyond what
  was configured. Read the breakdown reports to see where delivery and
  spend actually went before concluding anything about "the audience".
- Meta's attribution can include view-through conversions, depending on the
  attribution setting in use: people who saw an ad, never clicked, and converted later - some of whom would
  have converted anyway. Meta-reported ROAS then tends to run optimistic
  against analytics, and the gap is expected. For decisions, prefer
  click-based comparisons and the owner's blended reality: total spend
  against total new revenue.
- Frequency compounds silently on narrow audiences: the same people see
  the ad again and again while reported reach looks fine. Check frequency
  whenever results decay with no other change.
- Boosted posts are not campaigns: they often run on engagement-style
  optimization. An account "running Meta ads" via the boost button is
  usually buying reactions, not customers.

### When Meta fits, and when it does not

Meta fits products and services a person can want on sight - visual,
explainable in a feed, purchasable or inquirable without a long search
process. It fits remarketing to warm visitors when there is enough site
traffic to build an audience worth the name. It fits badly for
emergency-intent services (people in urgent need search; they do not
scroll) and for offers that cannot be made concrete in a single creative.
When search demand exists and budget is limited, harvest search intent
first; create demand on Meta with what remains.
