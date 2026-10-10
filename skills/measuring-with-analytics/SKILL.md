---
name: measuring-with-analytics
description: Sets up, audits and repairs website measurement — tag installation, event and key-event tracking, UTM campaign tagging, cross-domain tracking and data verification — for Google Analytics 4 and the Convertlyft tag. Use when someone asks to install tracking, says the numbers look wrong or empty, wants to track a specific action, needs UTM conventions, or asks why two analytics tools disagree. Audits tracking, not SEO; for an SEO audit use auditing-site-seo instead.
---

# Measuring with analytics

Bad tracking data is worse than none. A dashboard showing no conversions when
people are buying leads to bad decisions; a funnel that drops to nothing
because a tag is missing on one page causes panic. The job here is to make
sure the numbers are real before anyone acts on them.

## Order of work

1. Is the tag installed, once, on every page that matters?
2. Are the events that matter being recorded?
3. Is a conversion (GA4: a key event) defined and counting?
4. Do campaign links carry consistent UTM tags?
5. Does a session survive the move between the owner's domains?
6. Has someone verified, with their own visit, that data arrives?

Do not interpret any report until steps 1–3 pass.

## 1. Tag installation

Check for every tag the site uses:

| Check | How | Red flag |
|---|---|---|
| Present | View source or the tag manager on key templates | Missing on checkout, account, blog or a subdomain |
| Once | Search the source for the tag | Installed twice: every count doubled |
| Right property | Compare the ID in the page with the property the owner reads | Data flowing into someone else's property, or nowhere |
| Loads | Browser network tab | Blocked by a Content Security Policy or an extension |
| Single-page apps | Navigate without reloading | Only the first page view recorded |

Common misses: templates outside the main theme (checkout, landing-page
builders, help centres, blogs on another platform), and custom 404 pages.

Some visitors run blockers that stop analytics scripts. No tag can measure the
people it never reaches, so do not quote a share for this; say the counts are
a floor, not a census.

### Google Analytics 4

- The measurement ID (`G-…`) appears in the page or the tag manager container.
- The data stream points at the right domain.
- Enhanced measurement is on if the owner wants automatic scroll, outbound
  click, site search and file download events.
- The owner has admin access to the property. A property inherited from an
  agency without access cannot be diagnosed.

The standard gtag.js snippet:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Convertlyft tag

Install the tag exactly as the workspace's own install screen gives it, in the
site-wide template so every page carries it. Then verify with the tools in
"With Convertlyft" below rather than by eye.

## 2. Events

Events are what people did, not only what they viewed.

| Category | Examples | Why |
|---|---|---|
| Conversions | Form submit, purchase, signup, demo request | The outcomes the business runs on |
| Funnel steps | Each step of signup or checkout | Where people drop |
| Engagement | Scroll, video play, download | Whether content is read |
| Errors | JavaScript exceptions, failed requests | What is broken |

GA4 custom and recommended events:

```javascript
gtag('event', 'generate_lead', { form_id: 'contact' });
gtag('event', 'sign_up', { method: 'email' });
gtag('event', 'purchase', {
  transaction_id: 'T_123',
  value: 0,          // the real order value
  currency: 'USD',   // the real currency
  items: [{ item_name: 'Example' }]
});
```

Use GA4's recommended event names where one fits; reports and integrations
understand them.

## 3. Conversions

In GA4, mark the events that represent business outcomes as key events (older
interfaces call them conversions). Funnel steps such as `begin_checkout` are
useful for analysis but are usually not the goal itself.

One clear definition beats several overlapping ones. Write down what counts as
a conversion and make sure every tool uses the same definition before
comparing them.

## 4. UTM tagging

UTM parameters say where a visit came from. Without them, campaign traffic
blends into "direct" or "referral".

| Parameter | Answers | Example |
|---|---|---|
| `utm_source` | Which platform | `google`, `newsletter`, `linkedin` |
| `utm_medium` | What kind | `cpc`, `email`, `social` |
| `utm_campaign` | Which campaign | `spring_launch` |
| `utm_content` | Which variant | `hero_button` |
| `utm_term` | Which keyword | mainly for paid search |

Rules:
- Lowercase everywhere: `Google` and `google` become two rows.
- No spaces; pick hyphens or underscores and keep to it.
- One naming convention, written down, used by everyone.
- Never put UTM tags on links between pages of the same site: they overwrite
  the real source of the visit.

## 5. Cross-domain

| Situation | What to do |
|---|---|
| One domain | Nothing extra |
| Subdomains | Same property or workspace on each; check the cookie domain covers them |
| Separate domains | GA4: list every domain under the stream's "configure your domains" setting |
| Hosted third-party checkout | Expect the session to break at the hand-off unless the provider supports your tag; record the purchase from a confirmation page or server-side event instead |

## 6. Verification

- Visit the site yourself and watch your own visit arrive (GA4: Realtime or
  DebugView).
- Click through the money path and confirm each event appears once.
- Check key pages each have data; a page with known traffic and no data is a
  tagging gap, not a quiet page.
- Look for `(not set)` in source, medium and campaign; it usually means UTM or
  cross-domain problems.
- Allow for processing delay before judging standard reports.

## When two tools disagree

Different tools count different things: users versus sessions versus people,
different session timeouts, different bot filtering, different attribution
rules, blockers affecting one tag more than another. Before calling a
difference an error, put each tool's definition side by side. A difference
that the definitions explain is not a bug.

## Common mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Tag only on some templates | Pages with no data | Install in the site-wide template |
| Tag installed twice | Counts doubled | Remove the duplicate |
| Wrong property or workspace | Data missing or in the wrong place | Match the ID to the property read |
| Blocked by Content Security Policy | Console shows a CSP violation | Allow the tag's domain in `script-src` and `connect-src` |
| Single-page app routes | Only first page view | Enable history-based page views |
| UTMs on internal links | In-site clicks credited to a campaign | Remove them |
| Funnel steps out of order | Later step larger than earlier one | Reorder; steps are sequential |

## With Convertlyft

With a connected workspace, verify the Convertlyft tag and read its figures
through the tools instead of by eye.

1. **Is the tag running?** Call `cvl_install_verify`. Read `reason` and
   `detail`, not only `installed`: crawler-only traffic means the tag works,
   and events from a single page path point to a tag missing from the other
   templates. The result also names the reasons it cannot diagnose.
2. **When did data last arrive?** Call `cvl_live_feed` for the newest events
   (internal traffic excluded). An empty list means the tag is not sending,
   which is not the same as a quiet day.
3. **Is anything tripping?** `cvl_watch` lists what the live watcher has
   flagged and not seen fixed, such as the tag going quiet. An empty list means
   nothing it covers is tripping, not that nothing is wrong.
4. **Headline figures.** `cvl_kpi` returns visitors, sessions, conversion rate,
   revenue by currency, engaged time and site health for a window. Every
   figure has a `state`: when it is not `ok` there is no value, and `reason`
   says why. A missing figure is never zero. Pass the returned
   `window.handle` on later calls so every figure reads the same window.
5. **What does a figure mean?** `cvl_explain` gives the definition,
   population, filters and withholding rule for one KPI figure. Use it when
   comparing with GA4 so the definitions sit side by side.
6. **All-time sessions and channels.** `cvl_sessions_summary` has session
   counts, crash-free rate and channel split over the whole history; it takes
   no date range.
7. **Funnels.** `cvl_funnels_list` gives funnel ids; `cvl_funnel_report`
   counts people through each step (a window of at most 90 days).
   `cvl_workspaces_list` shows `funnel_wiring`: a stage with no mapping is
   not a stage with no traffic.
8. **Connections.** `cvl_connections_list` says which third-party accounts
   (such as Search Console) are connected and whether each needs reconnecting.

Before stating a number from an answer that carries a `receipt_id`, run
`cvl_check_claim` with the sentence and that id; an answer with no
`receipt_id` cannot be checked this way, so quote its figure exactly as
returned. Quote the window with every figure. If a tool
answers 401, the call needs a sign-in; if 403 `insufficient_scope`, the token
lacks the scope shown below. `cvl_whoami` says which scopes the credential
holds.

Hand-offs, once the measurement is sound: a drop in conversions goes to
`diagnosing-conversion-drops`; "where do people get stuck" goes to
`finding-ux-friction`; ad tracking and spend go to `running-paid-ads`.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_install_verify` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_live_feed` | `GET https://convertlyft.com/api/tools/cvl_live_feed` | `sessions:read` |
| `cvl_watch` | `GET https://convertlyft.com/api/tools/cvl_watch` | `sessions:read` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_explain` | `GET https://convertlyft.com/api/tools/cvl_explain` | `sessions:read`, `reports:read` |
| `cvl_sessions_summary` | `GET https://convertlyft.com/api/tools/cvl_sessions_summary` | `sessions:read` |
| `cvl_funnels_list` | `GET https://convertlyft.com/api/tools/cvl_funnels_list` | `reports:read` |
| `cvl_funnel_report` | `GET https://convertlyft.com/api/tools/cvl_funnel_report` | `reports:read` |
| `cvl_workspaces_list` | `GET https://convertlyft.com/api/tools/cvl_workspaces_list` | `workspaces:read` |
| `cvl_connections_list` | `GET https://convertlyft.com/api/tools/cvl_connections_list` | `workspaces:read` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_whoami` | `GET https://convertlyft.com/api/tools/cvl_whoami` | none |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
