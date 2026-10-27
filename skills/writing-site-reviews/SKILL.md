---
name: writing-site-reviews
description: Writes a site review an owner and their team can act on — monthly, weekly, or for any date range they pick — from measured Convertlyft data, where every item is a chain from what was seen, against a like-for-like baseline, to why, what it is worth, the fix, and how the next review will check it. Covers who really visited, where sales or enquiries come from, the funnel step that loses the most people, pages that sell below their kind, where paid visits land, where people struggle, what sits above the fold on phones, search, backlinks, briefs waiting, and what not to chase. Use when someone asks for a monthly or weekly review, a site report, "what should we fix this month", a review for a custom period, or a deck for a manager and an e-commerce team.
---

# Writing site reviews

A review is a short list of things worth doing, each one proven as far as the data
allows, written for two readers at once: a manager who reads the first page and the
action table, and the team who reads the evidence behind each item. It is never a
tour of every chart.

## The chain every item must survive

1. **What we saw** — a count with its denominator and window ("5 adds to cart from
   1,652 views, 15–26 Oct").
2. **Compared with what** — the same kind of page, same device, same market, same
   window. Never an industry average.
3. **Why** — the element, page, product, campaign or sequence that explains it. Say
   "linked to" unless the mechanism is shown (a button that never answers, a page that
   shows "sold out").
4. **What it is worth** — orders, enquiries or sign-ups, and money at the site's own
   average value, labelled **Estimate** with the method; or **not measured** and why.
5. **Fix** — one concrete step, who does it, and the size (small, medium, large).
6. **How we will know** — the reading the next review repeats.

An item that cannot reach step 2 is not an item. Put it under "checked and fine" or
"set up to unlock more".

## Three kinds of review

| Kind | Range | Items | Leads with |
|---|---|---|---|
| Monthly | the last full month | up to 8, plus Search and the action table | the short version: one figure, top three |
| Weekly | the last Monday–Sunday | up to 4 | what changed against the week before, and last week's fixes |
| Custom | the dates the person picked | as monthly | the same as monthly, for their window |

A workspace gets at most 8 reviews a calendar month across all three kinds. Say how
many are left when someone asks for a custom one.

For a weekly review, a figure only counts as a change when the week has enough to
compare: at least 30 visits in the segment, and say "too few to call" otherwise. Small
sites get monthly depth only.

## Order of work

### 0. Can the data be trusted?
- `cvl_whoami`, then `cvl_install_verify`: if the tag is not sending, the review is one
  line saying so and how to fix it. Stop there.
- `cvl_kpi` for the window and the one before it. Read each figure's state; a figure that
  is not "ok" does not exist, it is never zero.
- `cvl_traffic_breakdown` with `by` set to country, hour, device and landing page. Look
  for visits that cannot buy: other countries, a block of one-page desktop visits at
  night, one-second visits arriving with no referrer. Name them, take them out of every
  rate, and say how much they moved the headline rate.

**Big sites.** A read that would scan too much answers 409 and names a smaller window
that fits. Split the range into those windows, add up counts, and recompute rates from
the summed counts. Never average two rates. If a read fails with a fault on our side,
retry it on a shorter window and say which part could not be read.

### 1. Where results come from
- `cvl_page_baselines` with `type` home, category_listing, product, service or the
  site's own kinds: how each kind of landing page sells and which pages fall short.
  A page "falls short" only when the gap would happen by chance less than 1 in 20 times.
- `cvl_page_conversions` with `source` set to paid, then to each other source.
- `cvl_attribution` for which channels earn the results.

### 2. The funnel step that loses the most people
- `cvl_funnels_list`, then `cvl_funnel_report` with `device` phones and computers
  separately. Name the step with the largest loss against what is normal for this site,
  and say what people did instead (back to the list, search, cart opened and closed).
- Shops: `cvl_checkout_health` (do add to cart and payment work) and
  `cvl_checkout_values` with `bucket` 25 or 50. Compare the order rate below and above
  the free-delivery line the site states on its pages (read it with `cvl_page_content`).
- Lead sites: landing page → service page → enquiry tap. Name the page that turns
  visits into enquiries best; it is often not the home page.

### 3. Pages that sell below their kind — find the reason on the page
For each page that falls short, open it before guessing:
- `cvl_page_content` for its words. Check the description matches the product.
- `cvl_heatmap` with `device` mobile for what people tap. Many taps on "Notify me",
  "Sold out" or a waitlist button mean the item could not be bought, even when the shop's
  feed says it is in stock. Ads and Google Shopping keep sending people to such pages;
  say how many paid and Shopping landings went there.
- Cheaper and in-stock products usually win; long descriptions and photo counts usually
  do not explain gaps. Do not claim a cause the page does not show.

### 4. Where paid visits land, and whether to move them
- `cvl_page_conversions` with `source` paid, and `cvl_kpi` with `campaign` for each
  campaign.
- Compare campaigns **on the same landing page** before blaming the page. If one
  campaign sells and another does not on the same page, the problem is who the ad
  reaches, not the page: say so and do not move it to another page.
- Move paid visits only when the same audience sells better on another page; the worth
  is the difference in rates times the visits, labelled Estimate.
- Paid visits from countries the shop does not serve are waste; count them.
- Without the ad account's cost, say what each campaign brought, not what it cost.

### 5. Where people struggle — without claiming lost sales
- `cvl_behavior_report`, `cvl_dead_clicks` and `cvl_rage_clicks`.
- **Busy shoppers click more.** Visits with rage or dead clicks often buy more than
  similar visits. Never say friction costs sales unless a before-and-after or a
  comparison with similar visits shows it.
- What is worth reporting: a control that never answers (an Add button that adds
  nothing, checked with `cvl_replay_moment` on that element), a swipe area that does not
  move, text people tap expecting a link (a price, a phone number, an address).
- When rage clicks show "element not recorded", place them by the page and the click
  just before; do not name an element.

### 6. Above the fold on phones
- `cvl_page_attention` for the share of phone visits that reach each part of the page,
  and `cvl_heatmap` for where the first taps land.
- `cvl_crawl_page` with `screenshot` for a picture of the page. Say plainly that the
  crawl does not yet record where each button sits on a phone screen; describe what the
  screenshot shows (price and Add to cart below the first screen, a header taking a third
  of it, a popup covering it) and how many visits never scroll to it.
- Popups that open while people type a search interrupt the search; check search
  completion with `cvl_site_search` when a popup is on the page.

### 7. Search
- `cvl_seo_overview`: is Search Console connected, how old is its data. Not connected is
  an item on its own when Google brings real visits.
- `cvl_seo_search_console` with `by` query and with `by` page: searches in positions 4–20,
  pages shown often and clicked rarely (read their title), several pages competing for
  one search.
- `cvl_seo_opportunities` and `cvl_seo_competitors`: searches with volume where rivals
  rank and the site does not, grouped into topics, each with the page that should own it.
- `cvl_seo_backlinks`: compare snapshots. Linking sites jumping several times over in one
  snapshot is usually a wave of spam links; say so, suggest checking Search Console for
  a manual action, and keep a disavow file ready. Do not count spam as progress.
- `cvl_seo_drafts` and `cvl_seo_brief`: briefs and drafts that are ready and unused, their
  age, and whether the target page has changed since.
- Google Shopping visits often outnumber normal Google results on a shop: protect the
  product feed before chasing rankings.
- AI assistants: visits from them and how often they buy or enquire.

### 8. What not to chase
Name sources, countries, pages and searches that bring visits and almost never results,
and what growing them would and would not do: searches the business cannot serve (opening
hours it does not keep, products it does not sell, places it is not), markets it does not
deliver to, generic terms owned by marketplaces.

### 9. Write it
- One item per page or block, in the chain above. Plain words. No percentages without
  their counts. Money only as Estimate with its method.
- Rank by what it is worth and how sure you are; repairs before experiments.
- A "checked and fine" list: things looked at that showed nothing. It saves the owner
  from chasing them.
- A "set up to unlock more" list: Search Console, ad cost, purchase tracking, AI mentions.
- Our own faults go in a separate "what we are fixing" box, never in the owner's list.
- Last page: how to get the same answers through the Convertlyft MCP — the questions,
  not the tool names.
- Before stating any number, run `cvl_check_claim` with the sentence and the receipts of
  the answers it came from. Drop a sentence that fails rather than soften it.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_whoami` | `GET https://convertlyft.com/api/tools/cvl_whoami` | none |
| `cvl_install_verify` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_traffic_breakdown` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_traffic_breakdown` | `sessions:read` |
| `cvl_page_baselines` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_page_baselines` | `sessions:read` |
| `cvl_page_conversions` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_page_conversions` | `sessions:read` |
| `cvl_attribution` | `GET https://convertlyft.com/api/tools/cvl_attribution` | `sessions:read`, `reports:read` |
| `cvl_funnels_list` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_funnels_list` | `reports:read` |
| `cvl_funnel_report` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_funnel_report` | `reports:read` |
| `cvl_checkout_health` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_checkout_health` | `sessions:read` |
| `cvl_checkout_values` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_checkout_values` | `sessions:read` |
| `cvl_page_content` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_page_content` | `reports:read` |
| `cvl_heatmap` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_heatmap` | `sessions:read` |
| `cvl_page_attention` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_page_attention` | `sessions:read` |
| `cvl_behavior_report` | `GET https://convertlyft.com/api/tools/cvl_behavior_report` | `sessions:read` |
| `cvl_dead_clicks` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_dead_clicks` | `sessions:read` |
| `cvl_rage_clicks` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_rage_clicks` | `sessions:read` |
| `cvl_replay_moment` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_replay_moment` | `replays:read`, `sessions:read` |
| `cvl_crawl_page` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_crawl_page` | `reports:read` |
| `cvl_site_search` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_site_search` | `sessions:read` |
| `cvl_seo_overview` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_seo_overview` | `reports:read` |
| `cvl_seo_search_console` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_seo_search_console` | `reports:read` |
| `cvl_seo_opportunities` | `GET https://convertlyft.com/api/tools/cvl_seo_opportunities` | `reports:read` |
| `cvl_seo_competitors` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_seo_competitors` | `reports:read` |
| `cvl_seo_backlinks` | `GET https://convertlyft.com/api/tools/cvl_seo_backlinks` | `reports:read` |
| `cvl_seo_drafts` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_seo_drafts` | `reports:read` |
| `cvl_seo_brief` via `cvl_call_read` | `GET https://convertlyft.com/api/tools/cvl_seo_brief` | `reports:read` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_call_read` | none (MCP only) | none |
