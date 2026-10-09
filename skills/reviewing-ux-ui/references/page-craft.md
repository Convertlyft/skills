# Page craft: decision rules by surface

Deep judgment for specific surfaces. Load this when the question centers on
hierarchy, navigation, forms, errors, trust, speed, or mobile behavior.
All thresholds are qualitative on purpose — never attach numbers to them.

## Visual hierarchy

The page should read in one pass: what this is, why it matters, what to do.
Hierarchy is built with four levers — size, contrast, position, and space.
Use as few levers as possible per distinction.

- One dominant element per screenful. If the headline, an image, and a promo
  all fight for the same visual weight, the visitor decides nothing.
- The primary action gets the highest-contrast treatment on the page, and
  that treatment appears on nothing else. A page of same-colored buttons has
  no primary action.
- Secondary actions exist but look secondary: outline or text style, smaller,
  beside — never equal to — the primary.
- Whitespace is emphasis. Owners fear empty space and fill it; the fix for a
  weak element is usually more space around it, not more decoration on it.
- Reading gravity: people scan the first lines and the left edge (in
  left-to-right languages), then skim. Front-load meaning — first words of
  headings, first sentence of paragraphs, first items of lists.
- Typographic scale: a small number of distinct text sizes, consistently
  applied. Many near-identical sizes read as sloppiness; the eye needs
  obvious steps to know what is a heading, what is body, what is a caption.
- Alignment: pick a grid and keep to it. Mixed alignments make a page feel
  broken even when the visitor cannot say why.

Diagnostic: the glance test (blur the page — does the important thing still
dominate?), and the direction test (can you draw the intended eye path? does
anything on the page point away from it?).

## Cognitive load

Every decision, unfamiliar term, and moment of doubt spends a limited budget.
When the budget runs out, people leave — usually without knowing why.

- Fewer choices, faster choices (Hick's Law). Trim options, or group them so
  the visitor first makes one easy choice among a few categories.
- Recognition beats recall. Never make people remember something from a
  previous screen — repeat the product, the price, the plan they picked.
- Chunk everything: short paragraphs, scannable subheadings that carry
  meaning by themselves, lists for parallel items, tables for comparisons.
- Progressive disclosure: lead with the simple version; put detail behind
  "more" for the minority who need it. But never hide what the decision
  depends on — price, availability, and commitments must be visible before
  the ask, or hiding reads as deceit.
- Smart defaults do the work: preselect the common option, prefill what is
  known, infer what can be inferred (city from postcode). Every default is a
  decision the visitor no longer makes.
- Jargon audit: every term the visitor must translate is load. Use the words
  from rank data and ads search terms — the vocabulary people actually bring.

## Navigation and information architecture

- Labels in visitor language. The menu is not an org chart; it answers "where
  is the thing I came for". Test each label: would someone who has never heard
  of this company predict what is behind it?
- Prefer a broad shallow structure over a deep one: more visible top-level
  choices with obvious labels beat elegant nesting where every level is a
  gamble. People fail silently in deep trees.
- Current location must be visible: highlighted section, breadcrumbs on deep
  sites. "Where am I" confusion ends sessions.
- The footer is the safety net — contact, policies, and key pages live there
  because people scroll to the bottom when lost. Heavy footer clicks in the
  heatmap usually mean the main navigation failed, not that the footer is good.
- Heavy on-site search usage is the same signal: browsing failed. Read the
  searched terms — they are a free list of what the navigation hides.
- Every page must offer a next step. Dead-end pages (thank-you pages, empty
  results, articles with no related content) leak people who were willing to
  continue.

## Forms and checkout

Forms are where intent goes to die. The owner sees fields; the visitor sees
effort and risk.

- Every field must justify itself against the action being taken. If it is
  not needed to deliver this thing, cut it or defer it to after the
  conversion. The classic offender: demanding a phone number for something
  that will never involve a call.
- Single column, one thing per row. Multi-column forms create ambiguous
  fill order and broken tabbing.
- Labels stay visible while typing — labels above fields, not placeholder
  text that vanishes and takes the question with it.
- Group related fields under plain subheadings so a long form reads as a few
  small tasks, not one wall.
- Validate at the right moment: confirm a field when the person leaves it,
  not while they are still typing (premature red is punishment for being
  mid-word). On submit, keep everything they entered, name every problem
  next to its field, and summarize at the top.
- Say why for sensitive asks. One line — "for delivery updates only" — next
  to the phone field converts suspicion into consent.
- Mobile: the right keyboard per field (numeric for numbers, email layout for
  email), autofill enabled, tap targets a thumb can hit without zooming, the
  active field never hidden behind the keyboard.
- Checkout specifically: show the full cost as early as it can be known —
  surprise shipping at the last step is among the most reliable ways to lose
  a sale. Offer guest checkout; the account can be created after payment
  from the data already entered. Show a progress indication for multi-step
  flows so people can price the remaining effort.
- Do not disable the submit button as an error strategy: a dead button with
  no explanation is a puzzle. Enabled button, clear errors on submit.

## Error states and empty states

An error is a conversation at the worst moment; design it with more care than
the happy path, because feelings at failure decide whether people retry.

- Every error answers three things in plain words: what happened, whether it
  was their fault or yours, and exactly what to do next. "Something went
  wrong" answers none of them.
- Never dead-end. A failed payment offers retry and an alternative; a broken
  page offers a way back and a search; an empty result suggests a looser
  query or a category to browse.
- Preserve people's work. Wiping a form on failure is one of the most
  rage-inducing patterns in forms; assume anyone who loses their input leaves.
- Write like a person, without blame. "We couldn't process the card — nothing
  was charged. Check the number or try another card." Note what did NOT
  happen (no charge, nothing lost); uncertainty about consequences is worse
  than the error itself.
- Empty states are first impressions, not errors: a new account, an empty
  cart, no results yet. Each should say what belongs here and offer the one
  action that fills it. A bare "no data" wastes a teaching moment.

## Trust signals

People decide whether a site is safe the way they size up a shop from the
doorway — fast, and mostly on cues (credibility judgment per Fogg: perceived
expertise plus perceived trustworthiness).

- Specificity is the strongest signal. Exact prices, named people with real
  photos, a street address, concrete guarantees with their conditions stated.
  Vague superlatives ("world-class", "trusted by thousands") signal the
  opposite of what they claim.
- Proximity matters: reassurance belongs next to the risky act. Return
  policy near the buy button; security cue near the card fields; "we never
  share your email" next to the email field. The same content buried in a
  footer page reassures nobody at the moment of doubt.
- Testimonials work when they are checkable and specific — full name,
  company, a concrete result in the person's own words. Anonymous initials
  and stock-photo faces actively hurt.
- Coherence is a trust signal: broken images, mixed fonts, typos, and one
  dated page infect the credibility of everything else, including the parts
  done well.
- Honest friction builds trust: stating limits ("not suitable for X",
  "delivery takes a while to Y") makes the rest of the page believable.
- Do not stack badge rows. One or two recognizable marks near the payment
  step beat a strip of logos nobody recognizes, which reads as protesting
  too much.

## Page speed as UX

People experience sequence, not scores. A page that shows its headline
immediately and settles quickly feels fast even if the score is mediocre; a
page that flashes, jumps, and reflows feels broken at any score.

- The first screenful should render meaningfully before anything else — text
  readable, layout stable, primary action visible. Everything below can wait.
- Layout shift is worse than slowness: content that jumps as images and
  embeds load causes misclicks and a felt sense of jank. Reserve space for
  everything that arrives late.
- Every action needs immediate acknowledgment. A tapped button changes state
  at once even if the work takes longer; otherwise people tap again (visible
  in click maps as rapid repeats) and often double-submit.
- For genuinely long waits, show progress or a step name, not a bare spinner.
  Unexplained waiting reads as broken; the exit happens mid-spinner (visible
  in replays).
- Speed problems are usually weight problems: oversized images, autoplaying
  video, tag bloat from stacked marketing scripts. Look there before exotic
  fixes.

## Mobile-first behavior

Design judgments made on a desktop monitor fail quietly on a phone. Critique
on the small screen first; the sessions summary tells you how much of the
audience lives there.

- Thumb reach: primary actions belong where a thumb rests — lower half of
  the screen — not tucked in a top corner. Frequent actions should not
  require regripping the phone.
- Tap targets big enough to hit without zooming, with real space between
  them. Adjacent tiny links produce mistaps, and mistaps produce back-button
  exits.
- Sticky elements must earn their pixels. A sticky header plus a cookie bar
  plus a chat bubble can shrink the readable area to a slot; on phones,
  default to less chrome, not more.
- Hover does not exist. Anything revealed on hover — menus, tooltips,
  definitions — needs a tap path, or the content is unreachable for
  people on touch screens.
- Full-screen interstitials and hard-to-dismiss popups are far more hostile
  on phones, where the close control is small and easy to miss.
- Text readable without zooming, forms usable with the keyboard open, no
  horizontal scrolling ever.
- Test the phone reality, not the emulator fantasy: mid-range device, mobile
  network, one hand. Mobile replays are the closest available proxy.
