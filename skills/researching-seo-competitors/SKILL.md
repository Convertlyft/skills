---
name: researching-seo-competitors
description: Researches who a site competes with in search using Convertlyft's stored SEO data, covering the tiered competitor list, the searches rivals win, rankings beside rivals, backlink gaps, AI-assistant mentions, stored briefs and the cross-site matrix for multi-workspace members, and records competitor and keyword choices only with the owner's yes. Use when someone asks who their search competitors are, why a rival outranks them, which searches to go after, or wants to pin, dismiss or track competitors and keywords.
---

# Researching SEO competitors

Everything here reads stored rows: research the workspace already bought and checks already run.
Reading only returns stored rows and asks no provider anything. Needs a signed-in workspace with `reports:read`;
on 401 see `getting-started-with-convertlyft`, on 403 `insufficient_scope` name the scope the
answer lists. For general SEO method, see `improving-search-rankings`; for a site-wide audit, see
`auditing-site-seo`.

## Step 0 — Is the data there?

Call `cvl_seo_flow`. It says whether keywords, competitors, opportunities and briefs are done,
running, waiting for the daily limit, or failed with a reason. If a step has not run, say so —
"no competitors yet" is not "no competition".

## Step 1 — Who competes

Call `cvl_seo_competitors` (optionally with `market`). It returns the owner-tiered list (suggested,
primary, secondary) with the vendor's own intersection and position figures, which domains
actually appeared on this site's paid-for result pages this month, and `rows`: competitors scored
on the money keywords with the reason, labelled business, local, authority or directory, and
whether each is used, pinned or dismissed.

Read the label before calling a domain a rival. A directory or an authority site ranks for the
same searches but is not a business to copy.

## Step 2 — What they win that this site does not

Call `cvl_seo_opportunities`. Each row is a search competitors win and this site does not, a
related search around a money keyword, or a Search Console near-miss — mapped to a page or "new
page" with one action (improve, create or track), the reason, the evidence date and whether its
brief is ready. Take the top rows in the order returned; the order is the tool's.

## Step 3 — One search in depth

For each search worth discussing, call `cvl_seo_keyword` with `keyword`. It returns volume,
difficulty, intent, the tracked position and its 90-day history beside rivals on the same dates,
the mapped page, the stored top 10, and related searches and questions.

If the brief is ready, call `cvl_seo_brief` with `keyword`: the top pages studied and how each
crawl went, what most of them do that this page does not (only items at least 3 pages and 60%
agree on), and the suggested title, meta, outline, questions and structured data. Reading a brief
never generates one.

## Step 4 — The wider picture

- **Rankings.** `cvl_seo_rank` gives the newest position per tracked search, per market and
  device, with history and each used rival's position from the same check. `status` is the honesty
  model: `ranked`, `not_seen` within the depth that was paid for (never "not ranking"), or
  `missing` (could not measure). Say it the same way.
- **Keyword research on file.** `cvl_seo_keywords` returns stored pulls: volume, difficulty, CPC,
  intent and a twelve-month trend per keyword, and the merged list per page tagged by source with
  the money flag. A search with no volume carries null — say "no volume data", never zero.
- **Links.** `cvl_seo_backlinks` gives how many domains and pages link to this site, snapshot by
  snapshot, and the newest link-gap read: domains linking to chosen rivals but not here.
- **AI assistants.** `cvl_seo_ai` gives per-platform mention counts and each tracked question with
  what was cited. It is the vendor's tracked prompt panel, a drawn sample — never say "in ChatGPT"
  as a whole.
- **Several sites.** For someone who belongs to two or more workspaces, `cvl_seo_agency_matrix`
  shows each competitor against each of their sites in one market, with its score. Only
  workspaces they are a member of.

## Step 5 — Acting on it (writes, owner's yes first)

These record choices in Convertlyft. Nothing on the site changes and nothing is bought. They need
the opt-in `seo:write` scope, which the owner only grants if they gave the right. **Ask the owner
before each one**, naming exactly what will be recorded.

- `cvl_seo_set_competitor_state` — pin a competitor (always used), dismiss one (hidden 180 days, or
  until it shares twice as many money keywords), or clear the choice. An authority site cannot be
  pinned.
- `cvl_seo_opportunity_track` — act on an opportunity by tracking its search.
- `cvl_seo_track_keywords` / `cvl_seo_untrack_keywords` — add searches to, or remove them from,
  rank tracking in a market. Checks follow the market's existing schedule.
- `cvl_seo_set_keyword_money` — mark a search as a money keyword or not; the same call with the
  other value undoes it.
- `cvl_seo_map_keyword_page` — say which page targets a search; it answers the page it had before.
- `cvl_seo_add_keywords` — add searches to the keyword list, optionally for one page.

Two more ask for paid work and never run from a token: `cvl_seo_run_flow` (run the SEO chain
again; it buys search data within the daily limit) and `cvl_seo_make_brief` (crawl the top pages
for one search and write suggestions). Each becomes a proposal the owner approves in Convertlyft.
Tell the owner that is what happens; do not say the run or the brief has started.

On 403 `insufficient_scope`, say the choice was not recorded and which scope it needs.

## Reporting

Point first: who the real business rivals are, and the one or two searches where closing the gap
matters most. Then, for each search: this site's position (or `not_seen`), the rivals' positions
from the same check, the date of that check, and the action the opportunity names. Quote figures
as the tools return them with their dates; state the evidence class (`measured`, `indexed`,
`modelled` — modelled means "estimated"). When receipts are available, run `cvl_check_claim`
before stating a number.

Never invent a traffic estimate, a "rank in N weeks" promise or a figure the tools did not return.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_seo_flow` | `GET https://convertlyft.com/api/tools/cvl_seo_flow` | `reports:read` |
| `cvl_seo_competitors` | `GET https://convertlyft.com/api/tools/cvl_seo_competitors` | `reports:read` |
| `cvl_seo_opportunities` | `GET https://convertlyft.com/api/tools/cvl_seo_opportunities` | `reports:read` |
| `cvl_seo_keyword` | `GET https://convertlyft.com/api/tools/cvl_seo_keyword` | `reports:read` |
| `cvl_seo_brief` | `GET https://convertlyft.com/api/tools/cvl_seo_brief` | `reports:read` |
| `cvl_seo_rank` | `GET https://convertlyft.com/api/tools/cvl_seo_rank` | `reports:read` |
| `cvl_seo_keywords` | `GET https://convertlyft.com/api/tools/cvl_seo_keywords` | `reports:read` |
| `cvl_seo_backlinks` | `GET https://convertlyft.com/api/tools/cvl_seo_backlinks` | `reports:read` |
| `cvl_seo_ai` | `GET https://convertlyft.com/api/tools/cvl_seo_ai` | `reports:read` |
| `cvl_seo_agency_matrix` | `GET https://convertlyft.com/api/tools/cvl_seo_agency_matrix` | `reports:read` |
| `cvl_seo_set_competitor_state` | `POST https://convertlyft.com/api/tools/cvl_seo_set_competitor_state` | `seo:write` |
| `cvl_seo_opportunity_track` | `POST https://convertlyft.com/api/tools/cvl_seo_opportunity_track` | `seo:write` |
| `cvl_seo_track_keywords` | `POST https://convertlyft.com/api/tools/cvl_seo_track_keywords` | `seo:write` |
| `cvl_seo_untrack_keywords` | `POST https://convertlyft.com/api/tools/cvl_seo_untrack_keywords` | `seo:write` |
| `cvl_seo_set_keyword_money` | `POST https://convertlyft.com/api/tools/cvl_seo_set_keyword_money` | `seo:write` |
| `cvl_seo_map_keyword_page` | `POST https://convertlyft.com/api/tools/cvl_seo_map_keyword_page` | `seo:write` |
| `cvl_seo_add_keywords` | `POST https://convertlyft.com/api/tools/cvl_seo_add_keywords` | `seo:write` |
| `cvl_seo_run_flow` | none (MCP only) | `seo:write` |
| `cvl_seo_make_brief` | none (MCP only) | `seo:write` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
