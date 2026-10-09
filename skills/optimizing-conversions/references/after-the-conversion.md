# After the conversion

A conversion is the start of a customer, not the end of the job. This file
covers onboarding, activation, cancellations, failed payments and win-back —
and, above all, where site analytics can and cannot see. State that boundary
before giving advice: most of the lifecycle happens in billing systems,
inboxes and support desks that a site tag never sees.

## The measurement boundary

Site analytics can see, on pages that carry the tag:

- whether new customers reach the first useful screen after signup;
- page views on account, settings, billing, cancel and help pages;
- form interactions on a cancel survey hosted on the site;
- errors people hit inside the product, if the product carries the tag;
- whether returning customers come back and how often.

It cannot see, unless separately connected:

- payment failures, retries and card updates (the billing provider holds them);
- emails sent, opened or clicked;
- support tickets and satisfaction surveys;
- anything inside a third-party billing page that does not carry the tag.

Say which side each recommendation sits on: "measurable once these pages are
tagged" or "advice only — the outcome lives in another system".

A practical first step: make sure account, settings, billing and cancel pages
carry the tag. Without it the whole cancel flow is invisible.

## Onboarding and activation

- **Map the path from signup to first value.** Write every step between the
  confirmation screen and the first moment the product does something useful
  for this person. Each step is a place to lose them.
- **Define activation for this product.** The action that marks "this person
  got value" is specific to the business. Agree it with the owner; do not
  borrow another company's.
- **Remove everything between signup and activation** that does not have to
  be there: optional profile fields, tours that block the screen, settings
  that can wait.
- **Measure it as a funnel** — signup, each onboarding step, activation — and
  read it exactly like a purchase funnel: biggest loss first, segmented by
  device and source.

### Empty states

An empty screen right after signup should teach, not depress:

- what this screen will show once there is data (a labelled example, never
  data presented as real);
- the single action that fills it;
- an honest description of what that action involves.

## Cancellations

### The cancel flow

A typical flow is: cancel button, one short question about why, an offer
matched to the reason, a clear confirmation, then a way back.

Rules:

- **Make cancelling findable.** Hidden cancel buttons breed resentment and
  can create legal exposure; flag that and leave the legal judgment to the
  owner.
- **One question, single choice, optional free text.** The person is
  leaving; do not interview them. The free text is often the most useful
  thing collected.
- **Never block the exit.** The "continue cancelling" option is always
  visible. No guilt-trip copy ("Are you sure you want to abandon us?").

### Matching the offer to the reason

| Reason given | What might genuinely help |
|---|---|
| Too expensive | A smaller plan, or a short, clearly time-boxed discount the owner chooses |
| Not using it enough | A pause with data kept, or help getting set up |
| Missing a feature | Show it if it already exists; otherwise say so honestly |
| Switching to a competitor | Ask what the competitor does better; offer a conversation |
| Bugs or technical problems | Escalate to support — this is a fix, not a save |
| Temporary need | A pause |
| Business closed | No offer. Thank them. |

Guardrails:

- Never invent a roadmap item or promise a feature to keep someone.
- Never threaten data deletion to scare someone into staying.
- Deep or repeated discounts teach customers to cancel for deals; keep any
  offer modest and time-boxed, and leave its size to the owner.
- Long pauses tend to drift into silent loss; recommend a cap and measure
  how many pausers come back on this site.
- How many people accept any offer is a measurement on this site, never an
  assumed rate.

## Spotting risk before the cancel

Signals visible in site behaviour, on tagged pages:

- visits from an existing customer becoming rarer;
- key product pages no longer being opened;
- a jump in errors for that customer;
- more visits to billing, cancel, export or help pages.

These are warning signs, not predictions. Say "usage suggests risk", never
"this customer is about to cancel". How far ahead of a cancellation any
signal appears is specific to the site; measure it from past cancellations
before claiming a lead time.

## Failed payments

Site analytics cannot see failed payments. The advice here is strategy, and
the billing provider is where it is configured and measured:

- warn before cards expire and offer a backup payment method;
- retry soft declines (insufficient funds, temporary processor errors) on a
  sensible schedule; do not retry hard declines (closed or stolen cards) —
  ask for a new card;
- send clear, friendly reminders with a direct link to update the card;
- pause rather than delete during a grace period, with a one-step way back.

Recovery rates belong to the billing provider's own report. Never quote one.

## Win-back

- After cancelling, the confirmation page should offer a one-step way back,
  and the login page should recognise a returning former customer.
- Keep settings and data if the business can; if it cannot, say so honestly
  before the person cancels.
- Win-back emails are sent from an email platform, not from site analytics.
  Recommend them; do not claim to send or measure them without that
  connection.

## The rule

Measure what the site can see. Recommend what it cannot. Always say which is
which.
