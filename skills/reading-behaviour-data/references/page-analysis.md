# Page analysis framework

Adapted from Corey Haines' `cro` skill
(https://github.com/coreyhaines31/marketingskills, `skills/cro/SKILL.md`,
MIT licence, Copyright (c) 2025 Corey Haines). Changes: rewritten for reading
alongside behaviour data, examples with figures removed, and each dimension
paired with the behaviour signal that points to it.

Use this after the behaviour readings have told you **where** the trouble is.
It gives the order in which to look at the page itself.

## Before you start

Identify, from the owner or from the page:

1. **Page type**: home, landing, pricing, feature, blog, about, other.
2. **The one conversion goal** for this page: sign up, request a demo, buy,
   subscribe, download, contact.
3. **Where visitors come from**: organic search, paid, email, social, direct.
   Behaviour differs by source; read the page against the intent that brought
   people.

## The dimensions, in order of impact

### 1. Value proposition clarity

- Can a visitor tell what this is and why it matters to them within a glance?
- Is the main benefit specific and different from alternatives?
- Is it in the customer's words, not the company's jargon?

Common problems: features instead of outcomes; too vague or too clever; trying
to say everything at once.

Behaviour signal: an early scroll drop, a hot menu with a cold call to action,
short visits that end on this page.

### 2. Headline

- Does it state the core value?
- Is it specific enough to mean something?
- Does it match the message of the ad, email or search that brought people?

Strong patterns: the outcome people want, without the pain they want to avoid;
concrete detail rather than adjectives.

Behaviour signal: one traffic source leaving far faster than others suggests a
mismatch between what brought people and what the headline says.

### 3. Call to action: placement, words, hierarchy

- Is there one clear primary action?
- Can people reach it? Compare its position with the scroll reading: if fewer
  than half of visitors reach it, it sits too low.
- Does the button say what people get ("Get my report") rather than only an
  action ("Submit")?
- Is there a clear primary and secondary action, repeated at decision points?

Behaviour signal: a visible but rarely clicked call to action points to clarity
or motivation, not visibility.

### 4. Visual hierarchy and scanning

- Does a person scanning get the main message?
- Are the most important elements the most prominent?
- Do images support the message or compete with it?

Behaviour signal: clicks concentrated on decorative or secondary elements; dead
clicks on images and headings.

### 5. Trust and proof

- Customer logos, attributed testimonials, case studies with real results,
  review scores, security marks where money or personal data is asked for.
- Placed near the call to action and after claims.
- Only real, verifiable proof. Never suggest inventing it.

Behaviour signal: detours to about, reviews, privacy or returns pages before
converting; hesitation at payment or personal-detail fields.

### 6. Objections

Common doubts: is it worth the price, will it work for me, how hard is it to set
up, what if it does not work. Answer them on the page with FAQs, guarantees,
comparisons or a clear description of the process.

Behaviour signal: loops between this page and pricing or FAQ pages.

### 7. Friction

- Too many form fields; unclear next steps; confusing navigation; information
  required that should be optional; mobile problems; slow loading.

Behaviour signal: form starts far above submits, rage clicks on submit, drops
concentrated on phones, slow pages in `cvl_page_speed` terms if measured.

## Page-type notes

- **Home page**: clear positioning for cold visitors; a quick path to the most
  common conversion; room for both "ready now" and "still looking".
- **Landing page**: message match with the traffic source; a single call to
  action; the whole argument on one page.
- **Pricing page**: clear plan comparison; a recommended option; help with
  "which one is right for me".
- **Feature page**: connect the feature to an outcome; show use cases; a clear
  path to try or buy.
- **Blog post**: calls to action that match the topic, at natural stopping
  points.

## Output format

Group recommendations as:

1. **Quick wins**: small changes with a likely immediate effect.
2. **High-impact changes**: bigger changes worth prioritising.
3. **Test ideas**: hypotheses to test rather than assume, each with the
   behaviour reading that prompted it and how it would be confirmed.
4. **Copy alternatives**: for the headline and the main call to action, two or
   three options with the reasoning for each.

Every recommendation names the reading behind it, with its sample and window, or
says plainly that it comes from the page alone and has not been measured.
