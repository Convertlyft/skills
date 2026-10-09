# Accessibility: practical WCAG AA judgment

Load this when accessibility, WCAG, contrast, keyboard use, or screen readers
come up, or when an audit should include an accessibility pass.

Frame it for the owner as quality, not charity: accessibility failures are
usability failures with a wider blast radius. Low-contrast text is hard for
everyone in sunlight; keyboard traps break password managers and anyone driving the page by keyboard;
missing labels break autofill. Fixing them helps every visitor, and many of
these fixes also remove conversion friction. Legal exposure around
accessibility exists in many places, but do not play lawyer — flag that the
owner may want advice if it concerns them, and stick to the craft.

## The frame: POUR

WCAG organizes everything under four questions. Use them as the audit lens:

- **Perceivable** — can everyone take in the content? (contrast, text
  alternatives, not relying on color alone)
- **Operable** — can everyone drive the interface? (keyboard, targets, time
  limits, motion)
- **Understandable** — can everyone follow it? (plain language, predictable
  behavior, helpful errors)
- **Robust** — does it work with assistive technology? (real HTML semantics,
  labeled controls)

Level AA is the standard commonly targeted; it is the sensible bar to advise.

## What AA means in practice

Express requirements qualitatively; where exact ratios or sizes matter, point
to a checker tool rather than reciting numbers.

### Perceivable

- **Contrast.** Body text needs strong contrast against its background; the
  bar is stricter for normal-size text than for large headings. Judge with a
  contrast checker, never by eye — screens, brightness, and vision vary too
  much. The usual offenders: light gray text on white, text over photos, and
  placeholder-colored text used for real content.
- **Never color alone.** Anything communicated only by color — red for
  error, green for success, colored links with no underline — is invisible
  to a meaningful share of people. Pair color with a word, an icon, or a
  shape change.
- **Alt text that does the image's job.** Describe what the image is for,
  not what it looks like ("Pricing table showing the three plans" beats
  "screenshot"). Decorative images get empty alt so screen readers skip
  them. An image of text is a bug: the text belongs in HTML.
- **Media.** Videos that matter need captions; audio-only content needs a
  transcript. Autoplaying sound is hostile to everyone.

### Operable

- **Everything by keyboard.** Every action a mouse can do — menus, modals,
  carousels, custom dropdowns — must work with tab, enter, space, arrows,
  and escape. Custom-built widgets are where this dies; native HTML elements
  get it free.
- **Visible focus.** As you tab, you must always see where you are. Removing
  the focus outline for looking ugly, without replacing it, strands everyone
  navigating by keyboard. Focus order must follow visual order.
- **No traps.** Focus must never get stuck in a widget, and a modal must
  contain focus while open, then return it on close.
- **Skip link.** A way to jump past repeated navigation to the content, for
  people who would otherwise tab through the whole header on every page.
- **Targets and gestures.** Touch targets comfortably tappable and spaced;
  anything done by gesture (swipe, drag) also doable by simple tap; nothing
  triggered on focus or hover alone.
- **Time and motion.** People can pause or extend time limits; moving,
  auto-advancing, or blinking content can be paused; respect the system
  setting for reduced motion. Big animated flourishes should degrade to
  stillness gracefully.

### Understandable

- **Labels that persist.** Every form field has a visible label that stays
  while typing, and the label is programmatically attached to the field (a
  checker or the click-the-label test confirms: clicking a proper label
  focuses its field).
- **Errors that identify and instruct.** Errors named in text next to the
  field, not signaled by a red border alone; instructions before the field
  when a format is required, not revealed as punishment after.
- **Predictability.** Nothing surprising on focus or while typing — no forms
  that submit when a dropdown changes, no context switches nobody asked for.
- **Plain language everywhere.** The simplest words that are accurate. This
  overlaps entirely with conversion craft.

### Robust

- **Real HTML.** Buttons are button elements, links are links, headings are
  heading tags in a sensible outline (one main heading, no skipped levels —
  the heading list is the table of contents for someone on a screen reader). A div with
  a click handler is invisible to assistive tech until re-engineered with
  ARIA — the native element was free.
- **ARIA is a last resort.** Wrong ARIA is worse than none. Reach for it
  only when no native element does the job, and test the result with a
  screen reader.
- **Zoom must work.** Never disable pinch zoom; the page must survive heavy
  browser zoom without loss of content or horizontal scrolling.

## How to hand-test without tooling

A short pass that finds most of the serious problems:

1. **Keyboard-only pass.** Unplug the mouse mentally. Tab through the key
   pages and the primary action end to end. Can you see focus at all times?
   Reach everything? Escape everything? Complete the purchase or signup?
2. **The click-the-label test** on every form: clicking each visible label
   should focus its field. Where it does not, the label is decorative and
   assistive tech cannot see it either.
3. **Grayscale test.** Imagine the page without color. Do links, errors, and
   states survive?
4. **Zoom test.** Crank the browser zoom well up. Does the layout reflow
   without horizontal scrolling and without content vanishing?
5. **Screen reader smoke test** (VoiceOver, NVDA, or the phone's built-in):
   listen to the first screenful and the main form. Are images meaningfully
   described, buttons announced with real names, headings a usable outline?
6. **Contrast checker** on body text, buttons, and text over images.

## Honest limits

- Automated accessibility scanners catch only a minority of real issues —
  mostly missing attributes and contrast. A clean scan is not an accessible
  site; the keyboard and screen-reader passes above find what scanners miss.
  Say this plainly rather than blessing a site on a scan.
- Behaviour analytics say little about accessibility directly: replays
  mostly show pointer and touch behavior, and people using assistive
  technology are invisible in aggregate readings, not absent from the
  audience. Absence of evidence here is not evidence of absence — the audit
  methods above are the evidence, not the analytics.
- Do not certify. You can say a page passes or fails specific AA checks you
  actually performed; you cannot declare a site "WCAG compliant" from a
  partial review, and formal conformance claims are the owner's call.
