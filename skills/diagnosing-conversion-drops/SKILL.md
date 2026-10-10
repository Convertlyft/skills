---
name: diagnosing-conversion-drops
description: Diagnoses why conversions, sales, sign-ups or enquiries fell on a site by comparing two windows of measured Convertlyft data, narrowing the drop to a source, a landing page, a funnel step, an error or a speed change, and reporting only what the data proves. Use when someone says conversions dropped, sales are down, fewer leads came in, "what changed since last week", or asks why a conversion rate moved.
---

# Diagnosing conversion drops

Goal: name where the drop happened and what changed alongside it — with the window,
the sample and the evidence for each line. A drop is located before it is explained,
and a correlation is reported as one, never as the cause.

Needs a signed-in connection with `sessions:read` and `reports:read`. If `cvl_whoami`
fails or the tag is not reporting, run `getting-started-with-convertlyft` first.

## Step 0 — What is already known

Call `cvl_recall`. If a prior finding already covers this window, quote it with its date
instead of deriving it again. Also call `cvl_watch`: anything the live watcher has
flagged and not seen fixed (an error group that wasn't there yesterday, a form losing
starters, the tag going quiet) is the first lead. Quote its line as the trigger's own
arithmetic, not a diagnosis.

## Step 1 — Confirm the drop, on one window

Call `cvl_kpi` with `from` and `to` for the window the person means (ask if it is
unclear; a date alone means the whole UTC day). Then reuse the returned
`window.handle` on every later call that takes one, so the whole chain reads one window.

- Read `state` on every figure first. Only `ok` figures carry `value`, `display`,
  `previous` and `delta` — use those; never divide yourself.
- A non-`ok` figure has no value at all; its `reason` is a sentence you can show. It
  means the number does not exist for this workspace or range — **never** that it is zero.
- If the person asked about a specific source or campaign, pass `source` / `campaign`.
- If the definition matters ("what counts as a conversion here?"), call `cvl_explain`
  with the same `window_handle` and the same `source` / `campaign`. It returns the
  definition, the population and the condition under which a figure is withheld, and the
  attribution epoch before which campaign-filtered counts are undercounted.

If `delta` shows no real drop, say so and stop: "Conversion rate for <window> was
<display>, against <previous display> before." Do not hunt for a cause of a drop that
the figures do not show.

**Is it the tag, not the visitors?** If sessions fell along with conversions, call
`cvl_install_verify` and `cvl_live_feed` before anything else. A tag that went quiet
looks like a traffic collapse. If the tag is missing, partial, or the conversion was never
tracked, stop here and hand off to `measuring-with-analytics`: a drop cannot be diagnosed
from figures that were never recorded.

## Step 2 — Locate it

Work down this list and stop at the first place the drop concentrates. Use the same
`from` / `to` for each.

1. **Landing pages** — `cvl_page_conversions`: sessions and converted sessions by the
   page people landed on. Attribution is the entry page, not the page the purchase
   fired on. Compare with the previous window by calling it again with that window's
   dates. A page whose converted sessions fell while its sessions held is a lead.
2. **The funnel** — `cvl_funnels_list` for the funnel ids (never guess one), then
   `cvl_funnel_report` with `funnel_id` set to the id of the steps funnel that ends in the
   conversion, both windows (a `stage_model` id is not a steps funnel). Counts
   are people, not visits. Name the step where the loss grew. Before calling an empty
   stage a loss, check `funnel_wiring` in `cvl_workspaces_list` — an unmapped stage is
   not a stage with no traffic. A window is at most 90 days.
3. **Errors** — `cvl_issues_list` (ordered by last seen). For any group first seen
   inside the window, read it with `cvl_issue_detail` (pass the same window — an error
   outside the window is not an error that does not exist).
4. **Speed** — `cvl_page_speed` for the pages found in 1 or 2. It reports the 75th
   percentile; pages with too few readings are left out rather than reported thin.
5. **Friction** — `cvl_form_friction` if the conversion is a form; `cvl_behavior_report`
   for rage and dead clicks on the pages found above. Interpretation rules live in
   `reading-behaviour-data`.
6. **Changes the owner made** — `cvl_recall` decisions, and any change markers the
   person mentions. A drop that starts on the day of a change is a lead, not a verdict.

For "what did people do instead", `cvl_paths` with `path` set to the page found gives
what happened next — on to another page, viewed again, or left.

## Step 3 — Report

Shape:

1. **The drop, in one line**, with window and comparison: figure, display, previous.
2. **Where it is**: the one page / step / error / speed change it concentrates in, with
   the counts and the window.
3. **What changed alongside it**, clearly marked as co-occurring, not proven cause.
4. **What we can't see**: any figure whose state was not `ok`, any capped list
   (`truncated`, `counts`), and anything the tools don't cover.
5. **One next step**: a replay of an affected visit (`watching-session-replays`), a fix
   brief for an error (`fixing-production-errors`), or a change to test
   (`shipping-cro-fixes`).

Rules:

- Every numeral comes from a tool result. Before stating one from an answer that carries a
  `receipt_id`, run `cvl_check_claim` with the sentence and that id — it catches a real
  number on the wrong figure. An answer with no `receipt_id` cannot be checked this way;
  quote its figure exactly as returned, with its window.
- Small samples: if a page or step has too few sessions to compare, say "too few visits
  to tell" with the count, rather than a percentage.
- Never say "no effect" or "this caused it". Say "this changed in the same window".
- If the person wants the finding kept, `cvl_remember` with kind finding, the
  `receipt_id` and the window (a finding without a receipt is refused, by design).
  Ask first — rows cannot be deleted by a credential.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_recall` | `GET https://convertlyft.com/api/tools/cvl_recall` | `memory:read` |
| `cvl_watch` | `GET https://convertlyft.com/api/tools/cvl_watch` | `sessions:read` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_explain` | `GET https://convertlyft.com/api/tools/cvl_explain` | `sessions:read`, `reports:read` |
| `cvl_install_verify` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_live_feed` | `GET https://convertlyft.com/api/tools/cvl_live_feed` | `sessions:read` |
| `cvl_page_conversions` | `GET https://convertlyft.com/api/tools/cvl_page_conversions` | `sessions:read` |
| `cvl_funnels_list` | `GET https://convertlyft.com/api/tools/cvl_funnels_list` | `reports:read` |
| `cvl_funnel_report` | `GET https://convertlyft.com/api/tools/cvl_funnel_report` | `reports:read` |
| `cvl_workspaces_list` | `GET https://convertlyft.com/api/tools/cvl_workspaces_list` | `workspaces:read` |
| `cvl_issues_list` | `GET https://convertlyft.com/api/tools/cvl_issues_list` | `issues:read` |
| `cvl_issue_detail` | `GET https://convertlyft.com/api/tools/cvl_issue_detail` | `issues:read`, `sessions:read` |
| `cvl_page_speed` | `GET https://convertlyft.com/api/tools/cvl_page_speed` | `sessions:read` |
| `cvl_form_friction` | `GET https://convertlyft.com/api/tools/cvl_form_friction` | `sessions:read` |
| `cvl_behavior_report` | `GET https://convertlyft.com/api/tools/cvl_behavior_report` | `sessions:read` |
| `cvl_paths` | `GET https://convertlyft.com/api/tools/cvl_paths` | `reports:read` |
| `cvl_whoami` | `GET https://convertlyft.com/api/tools/cvl_whoami` | none |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_remember` | `POST https://convertlyft.com/api/memory` | `memory:write` |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
