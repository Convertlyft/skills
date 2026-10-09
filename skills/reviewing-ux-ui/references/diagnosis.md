# Diagnosis: reading the evidence and running a critique

How to turn behaviour readings (funnels, heatmaps, replays, errors) into defensible findings, and how to run a
page critique that a skeptical owner will believe. Load this when you have
actual readings in front of you or are asked to critique a specific page.

## The first-visit walkthrough protocol

Run this before looking at any data, so the data confirms or kills your
hypotheses instead of writing them for you.

1. **Arrival.** Imagine landing from the most common source (check sessions
   summary: search, ads, direct, social). What promise did that source make?
   The first screenful must repeat that promise in the visitor's own words.
2. **The three-question glance.** Without scrolling: What is this? Who is it
   for? What do they want me to do? Note which of the three takes effort.
3. **Scroll pass.** Scroll at reading speed. Note where your attention drops,
   where you feel lost, where sections repeat themselves, where you meet
   content that serves the owner's ego rather than the visitor's decision.
4. **Action pass.** Attempt the primary action end to end. Count the moments
   of doubt: an ambiguous button label, a field you do not know why they need,
   a price that appears later than expected, a wait with no feedback.
5. **Sabotage pass.** Try to break it: submit the form empty, type a bad
   email, use the back button mid-flow, rotate the phone, tap twice fast.
   How the page fails tells you how it treats people.
6. Write down every hypothesis as a checkable claim: "people abandon the form
   at the phone-number field", "nobody scrolls past the testimonials". Then
   go to the readings.

## Reading each source correctly

### Sessions summary

- What it answers: volume, device split, top landing pages, sources, trends
  over time.
- First use: establish the device reality. If most sessions are mobile, every
  further judgment happens on the mobile layout first.
- Misread trap: a bounce is not always failure — someone who landed, read the
  answer, and called the phone number bounced happily. Judge bounce against
  page intent, not in the abstract.
- Misread trap: a traffic drop is not a design problem. Rule out source
  changes (ads paused, ranking shifts) before touching the page.

### Funnels

- What it answers: which step loses the largest share of the people who reach it.
- Read each step as a ratio of the previous step, not of the total, and
  also note how many people each step loses. A steep relative loss close to
  the money usually matters more than a bigger loss at the top.
- Misread trap: blaming the step where people vanish. People often leave a
  step because of what the previous step promised or failed to say — a price
  that appears here, shipping cost revealed here, an account demanded here.
  Read one step upstream of every leak.
- Misread trap: comparing funnels across periods with different traffic mixes.
  A funnel fed by cold ad traffic will always leak more than one fed by
  returning visitors; segment before comparing.
- A funnel says where. It never says why. Pair the leaking step with replays
  of sessions that dropped exactly there.

### Heatmaps

- Click maps: where people tap. Look for (a) dead clicks — clusters on
  non-interactive elements, meaning people expect a link that is not there;
  (b) attention on secondary actions while the primary action goes cold;
  (c) rapid repeated clicks in one spot, a frustration signal usually meaning
  something failed to respond.
- Scroll maps: how far people get. The reading that matters is where the sharp
  drop sits relative to the primary call to action — if most people never
  reach the button, its quality is irrelevant.
- Move maps: weak evidence on their own. Pointer position loosely tracks
  attention on desktop and not at all on touch screens. Never build a claim
  on a move map alone.
- Misread trap: aggregation across breakpoints. Confirm the device filter
  before making any positional claim; a blended map lies about where elements
  are.
- Misread trap: a hot element is not a good element. A hot navigation link can
  mean the page fails to answer the question and people escape through it.
  Hot means used; whether that is success depends on the page's job.
- Misread trap: content inside carousels, tabs, and accordions is invisible to
  scroll maps. A healthy-looking scroll map can hide the fact that key content
  requires an interaction most people never make.

### Replays

- The only reading that shows struggle directly: hesitation before a field,
  backtracking, re-reading, form corrections, abandoning mid-payment.
- Watch replays selected by the question, not at random: sessions that dropped
  at the leaking funnel step, sessions with rage clicks, sessions that hit an
  error, mobile sessions on the page in question.
- What to log per replay: where attention stalled, what they tried that
  failed, the exact moment of exit and what was on screen.
- Misread trap: sample bias. Replays you chose because something went wrong
  will always look bad. A replay proves the problem exists and shows its
  mechanics; only a funnel or heatmap establishes how common it is. Both are
  needed for a strong claim.
- Misread trap: narrating intent. You see behavior, not thought. Say "they
  paused a long time at the coupon field, then left" — not "they went hunting
  for a coupon and found a better price elsewhere" unless something on screen
  shows it.

### Errors

- Check errors before any behavioral theory when the question is a sudden
  change. A broken script, a failing payment call, or a form that silently
  swallows submissions explains a cliff better than any design critique.
- Correlate: do error spikes line up in time with the funnel drop? Do errors
  concentrate on one browser or device that matches the segment that stopped
  converting?
- Misread trap: an error count of zero does not mean nothing is broken — it
  means nothing instrumented is broken. Third-party widgets, payment iframes,
  and off-site steps can fail invisibly.

### Rank data

- Use it to read arrival intent: the queries a page ranks for are the
  questions visitors arrive holding. If the page ranks for a comparison query
  but opens with a hard sell, or ranks for a service the page buries, the
  mismatch is the leak.
- Use the query vocabulary to audit page language — headings and navigation
  should use the searcher's words.

### Ads data

- Message match audit: put the ad text and the landing page's first screenful
  side by side. The headline should continue the ad's sentence. A mismatch
  wastes the click before the page design gets a chance.
- If paid traffic converts far worse than other sources on the same page,
  suspect targeting or message match before suspecting the page.

## Triangulation rules

- A finding is **confirmed** when two independent readings agree (funnel leak
  at a step plus replays showing the struggle there; dead-click cluster plus
  replays of people tapping it) or when errors prove breakage directly.
- A finding is **supported** on one strong reading with a plausible mechanism.
- Anything else is a **hypothesis** — say so, and name the reading that would
  settle it.
- Present findings with these labels. Advice inherits the confidence of its
  weakest evidence.

## Prioritizing findings

Rank by severity first (broken, blocking, confusing, slow, unpersuasive,
unpolished — see SKILL.md), then within a tier by reach (share of visitors who
hit it — a checkout bug beats a footer typo) and by confidence. Recommend the
top item as the one thing to do now; list the rest ranked. Never hand an owner
an unranked list.

## The anti-pattern catalog, with evidence signatures

Each entry: what it is, why it hurts, and the trace it leaves in readings.

- **The everything hero.** First screenful packed with a carousel, several
  messages, and multiple buttons. Nobody's eye lands anywhere. Signature:
  scroll map shows fast scrolling past the hero; clicks scattered thinly
  across it; carousel slides beyond the first effectively unseen.
- **Carousel as compromise.** Rotating banners exist so stakeholders avoid
  choosing a message. People read the first slide at best; auto-advance yanks
  content away mid-read. Signature: click map cold on later slides; replays
  showing people trying to read a slide that moves.
- **False bottom.** A section break that looks like the end of the page, so
  people stop scrolling with content below. Signature: scroll map cliff at a
  full-width divider or hero-like band mid-page.
- **Phantom affordance.** Elements styled like buttons or cards that are not
  clickable, or plain-looking text that is the real link. Signature: dead
  clicks clustered on the decorative element while the real link stays cold.
- **Forced account before value.** Demanding registration before showing
  price, availability, or the product. Signature: funnel cliff at the
  signup/login step; replays of people reaching it and leaving at once.
- **The surprise cost.** Shipping, fees, or taxes revealed at the last step.
  Signature: steep leak at the payment or review step; replays showing the
  exit right after the total updates.
- **Interrogation form.** A form asking for more than the action needs — the
  classic being a phone number for a newsletter. Signature: replays of field
  skipping, long pauses, abandonment at a specific field; funnel leak at the
  form step.
- **Premature popup.** Newsletter or discount overlay before the page has
  delivered anything. Signature: replays showing immediate close-hunting;
  frustration clicks near the dismiss control; exits within the first moments.
- **Navigation in the owner's dialect.** Menu labels from internal vocabulary
  ("Solutions", brand-named products) instead of visitor words. Signature:
  heavy use of site search or footer links in click maps; rank-data vocabulary
  absent from the menu.
- **Sticky-bar sandwich.** On phones, a sticky header plus a sticky cookie or
  promo bar leaves a slot of readable content. Signature: mobile replays with
  constant fiddly scrolling; high mobile exit despite healthy desktop.
- **The silent failure.** A submit that fails with no visible message —
  people click, nothing happens, they click again, they leave. Signature:
  repeated rapid clicks on the button in the click map; matching entries in
  the error report; funnel leak at submit.
- **Spinner limbo.** A long operation with a spinner and no progress or time
  cue. People give up mid-wait. Signature: replays showing exit during
  loading; leak between two steps with no interaction in between.
- **Wall of prose.** Long undifferentiated paragraphs where a decision is
  being made. Many people scan rather than read; unscannable content is
  often unread content. Signature: scroll map racing through the block; time on the
  section near zero in replays.

## Writing up the critique

Structure every finding as: observation (what the reading shows), mechanism
(why that behavior follows from the design), recommendation (the one change),
verification (which reading should move after the fix, and in which
direction). If the owner implements the fix, the follow-up is to re-check that
reading — that closes the loop and keeps you honest.
