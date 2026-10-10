---
name: getting-started-with-convertlyft
description: Checks how an AI is connected to Convertlyft (signed in or not, which workspace, whether the site's tag is reporting), answers what Convertlyft is and what it can see or change, then hands off to the skill that fits the question. Use when someone first connects Convertlyft, asks "what is Convertlyft", "what can it see", "can it change my site", "is my tracking working", or asks a site question and it is not yet clear which workspace or skill applies.
---

# Getting started with Convertlyft

The router. It answers three questions in order — who am I, which site, is the tag
working — and then hands the person to the skill that does the real work. Point first,
plain English, "people" not "users".

## What Convertlyft is, in its own words

Answer product questions only from what the server itself says: the tool descriptions,
the capabilities manifest at `https://convertlyft.com/.well-known/convertlyft-capabilities.json`,
and the public docs. For anything not covered there, search the docs with
`cvl_docs_search` (no account needed) and quote what it returns. Never type a price, a
plan, a limit or a retention period from memory.

What the tools show it can see, once the site's tag is installed and a person has signed in:

- Visits and the headline figures for a window — visitors, sessions, conversion rate,
  revenue by currency, engaged time (`cvl_kpi`).
- Where people struggle — rage clicks, dead clicks, scroll depth, form starts vs submits
  (`cvl_behavior_report` and the narrower behaviour tools).
- Per-page heatmaps with a picture (`cvl_heatmap`), paths, funnels, page speed.
- JavaScript errors visitors hit, grouped, with a fix brief (`cvl_issues_list`, `cvl_error_brief`).
- Session recordings — the structure of a visit: what was reached, clicked and typed
  into as lengths, never the content typed (`cvl_replays_list`, `cvl_replay_moment`).
- SEO readings on file: rankings, keyword research, competitors, backlinks, crawls,
  AI-assistant mentions.

With no account at all, it can still scan any public site for SEO problems
(`cvl_public_seo_scan`), say what AI agents can reach on it (`cvl_public_agent_readiness`),
and search its own docs (`cvl_docs_search`).

### Can it change my site?

Answer from what the write tools actually do — none of them edits the site's pages:

- `cvl_change_apply` records a marker that the site changed, so impact can be measured
  against it. It changes nothing on the site, and `cvl_change_undo` removes the marker.
- `cvl_propose` queues a fix for the owner to approve. No credential can approve a
  proposal, including its own; approval is a human act in Convertlyft.
- `cvl_error_fix_shipped` records the date a fix went live. It changes nothing on the site.
- `cvl_remember` adds a row to the workspace's ledger. Rows cannot be deleted by a
  credential; only the owner can, from settings.
- `cvl_operator_run` queues the day's operator run; a worker does the work, not this call.

Every write needs an opt-in scope the owner grants at sign-in. Ask the owner before
calling `cvl_change_apply`, `cvl_propose` or `cvl_operator_run`.

## Step 1 — Is anyone signed in?

Call `cvl_whoami`. It answers what the credential is, which workspace it reads, the
scopes it holds, when it expires, and how many calls are left.

- **It answers** → signed in. Note the workspace and the scopes; go to step 2.
- **HTTP 401** (sign-in needed) → there is no account connection. Do not stop. Say:
  "I'm not signed in to Convertlyft, so I can't see your site's visits yet. I can still
  scan any public site for SEO problems." Then:
  - for any "check / scan / audit this site" request, hand off to `auditing-site-seo`
    (it starts with `cvl_public_seo_scan`, no account needed);
  - for "how do I connect / sign in", see **Connecting** below;
  - for product questions, use `cvl_docs_search`.
- **HTTP 403 `insufficient_scope`** on any later call → the body names every scope the
  call needs. Tell the person which scope is missing, in plain words, and that the owner
  grants it by connecting again and ticking it on the consent screen. Do not retry.
- **`token_expired`** → the credential has expired. Pass on what the answer says about
  renewing it; the person connects again to get a new one.

When any tool refuses, call `cvl_whoami` first — its answer usually names the fix.

## Step 2 — Which site?

Call `cvl_workspaces_list`. It returns each workspace this credential can read, its
name, site URL, and whether the tracker has ever reported from it. Today a credential
reaches exactly one workspace, so this is normally a confirmation: "You're connected to
<name> (<site URL>)." Use the names and URLs exactly as returned.

Read `funnel_wiring` before anyone reports an empty funnel stage: a stage with no
mapping is not a stage with no traffic.

## Step 3 — Is the tag reporting?

Call `cvl_install_verify`. Read `reason` and `detail`, not just `installed`:

- Nothing seen at all → the tag has never run. Nothing else will have data yet; say so
  rather than reporting empty charts as results.
- Only crawler traffic → the tag **works**; real people just haven't been counted yet.
- Events from a single page path → the tag is on one page only.
- The payload also names the reasons it cannot derive. Never present the four it can
  check as all the possible causes.

If the person needs to know *when* data last arrived, `cvl_live_feed` lists the newest
events. An empty list means the tag is not sending, which is not the same as a quiet day.

## Step 4 — Hand off

Read what the workspace already knows first: `cvl_recall` returns prior findings (each
with its receipt and window), decisions, preferences and unanswered questions. Anything
there does not need deriving again; a row marked `receipt_stale` is history — quote it
with its date.

Then hand off by the question:

| The person asks | Skill |
|---|---|
| "Sales / sign-ups / conversions dropped" | `diagnosing-conversion-drops` |
| "Where are people getting stuck / frustrated" | `finding-ux-friction` |
| "Show me what people did / watch a visit" | `watching-session-replays` |
| "Errors / something is broken / a bug report" | `fixing-production-errors` |
| "What does this heatmap / scroll / click data mean" | `reading-behaviour-data` |
| "Check / scan / audit my site's SEO" | `auditing-site-seo` |
| "Who am I competing with in search" | `researching-seo-competitors` |
| "What happened on my site today / since yesterday" | `writing-daily-site-briefs` |
| "We fixed it / ship a change and measure it" | `shipping-cro-fixes` |
| "Why don't people buy / improve this landing page, form or checkout / should I A/B test" | `optimizing-conversions` |
| "Does this page look right / is it confusing / review the design or mobile layout" | `reviewing-ux-ui` |
| "Is my tracking right / install GA4 / set up events or UTMs / two tools disagree" | `measuring-with-analytics` |
| "My Google or Meta ads / ad spend / cost per lead / ROAS" | `running-paid-ads` |
| "Write or rewrite the headline, page, ad or email" | `writing-copy` |
| "Why do people buy / social proof, urgency, pricing psychology" | `applying-marketing-psychology` |
| "Why don't I rank / organic traffic fell / what to fix for search" | `improving-search-rankings` |
| "Research one competitor / their positioning, offer or a SWOT" | `profiling-competitors` |
| "Write or plan an article, guide or landing-page content" | `planning-content` |
| "Schema markup / structured data / rich results" | `adding-schema-markup` |
| "What should I fix first / an overall plan across pages, search and ads" | `planning-improvements` |

## Connecting

- MCP server: `https://mcp.convertlyft.com/mcp`. Clients that support sign-in will open
  the Convertlyft consent screen; the owner picks the workspace and ticks any opt-in
  write scopes.
- The connection URL takes `?features=` (for example `?features=all` loads every tool)
  and `?read_only=true` (read tools only, no writes).
- When a needed read tool is not in the client's tool list, find it with
  `cvl_search_tools` and run it with `cvl_call_read`. Writes are never behind the runner:
  they are in the list already, or not available on this connection.
- REST: the same reads at `https://convertlyft.com/api/tools/<name>`, with
  `Authorization: Bearer cvl_pat_…`. The full list of tools and twins is in
  [references/convertlyft-api.md](references/convertlyft-api.md).

## Honesty

- Every number comes from a tool result, with its window and sample. When the answer
  carries a `receipt_id`, run `cvl_check_claim` with the sentence and that id before
  stating the number. Answers with no `receipt_id` (writes, the no-account scan, some
  reads) cannot be checked this way: quote their figures exactly as returned.
- A figure whose `state` is not `ok` does not exist for that workspace or range — it is
  never zero.
- Say the limit in the same breath: "I can see X. I can't see Y yet, because Z."

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_whoami` | `GET https://convertlyft.com/api/tools/cvl_whoami` | none |
| `cvl_workspaces_list` | `GET https://convertlyft.com/api/tools/cvl_workspaces_list` | `workspaces:read` |
| `cvl_install_verify` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_live_feed` | `GET https://convertlyft.com/api/tools/cvl_live_feed` | `sessions:read` |
| `cvl_recall` | `GET https://convertlyft.com/api/tools/cvl_recall` | `memory:read` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_docs_search` | `GET https://convertlyft.com/api/tools/cvl_docs_search` | none (no account over MCP) |
| `cvl_public_seo_scan` | `GET https://convertlyft.com/api/tools/cvl_public_seo_scan` | none (no account over MCP) |
| `cvl_public_agent_readiness` | `GET https://convertlyft.com/api/tools/cvl_public_agent_readiness` | none (no account over MCP) |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_behavior_report` | `GET https://convertlyft.com/api/tools/cvl_behavior_report` | `sessions:read` |
| `cvl_heatmap` | `GET https://convertlyft.com/api/tools/cvl_heatmap` | `sessions:read` |
| `cvl_issues_list` | `GET https://convertlyft.com/api/tools/cvl_issues_list` | `issues:read` |
| `cvl_error_brief` | `GET https://convertlyft.com/api/tools/cvl_error_brief` | `issues:read` |
| `cvl_replays_list` | `GET https://convertlyft.com/api/tools/cvl_replays_list` | `replays:read` |
| `cvl_replay_moment` | `GET https://convertlyft.com/api/tools/cvl_replay_moment` | `replays:read`, `sessions:read` |
| `cvl_change_apply` | none (MCP only) | `changes:write` |
| `cvl_change_undo` | none (MCP only) | `changes:write` |
| `cvl_propose` | none (MCP only) | `proposals:write` |
| `cvl_error_fix_shipped` | none (MCP only) | `issues:write` |
| `cvl_remember` | `POST https://convertlyft.com/api/memory` | `memory:write` |
| `cvl_operator_run` | `POST https://convertlyft.com/api/operator/run` | `operator:run` |
| `cvl_search_tools` | none (MCP only) | none |
| `cvl_call_read` | none (MCP only) | none |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
