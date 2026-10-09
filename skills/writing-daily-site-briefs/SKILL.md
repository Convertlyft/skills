---
name: writing-daily-site-briefs
description: Writes a short daily brief for a site from Convertlyft, covering whether the tag is sending, what the live watcher flagged, the key figures for yesterday against the day before, new errors, what is open on the action board and what waits for the owner's decision, without repeating what the workspace already knows. Use when someone asks for a daily brief, a morning summary, "what happened on my site", "anything I should know today", or a recurring site check-in.
---

# Writing daily site briefs

A brief is short, point first, and only says what changed or needs a decision. It never pads an
empty day with advice. Needs a signed-in workspace; on 401 see `getting-started-with-convertlyft`.
If one call answers 403 `insufficient_scope`, leave that section out and say which scope it needs
— do not fail the whole brief.

## Order of calls

1. **What is already known.** `cvl_recall`. Do not re-announce a finding already in the ledger.
   A row marked `receipt_stale` is historical: quote it with its date, never as current.
2. **Is data arriving?** `cvl_live_feed` returns the newest events, newest first. Use it to say
   when something last arrived. An empty list means the tag is not sending, which is not a quiet
   day. If it is empty, call `cvl_install_verify` and read `reason` and `detail` (only crawler
   traffic means the tag works). If the tag is not sending, lead the brief with that and stop
   there: every other figure would be wrong.
3. **What tripped.** `cvl_watch` lists what the live watcher flagged and has not seen fixed: the
   tag going quiet, a new error group, dead or rage clicking concentrating on one element, a form
   losing the people who start it. Each line is the trigger's own arithmetic, not a diagnosis —
   quote it, then say what to read next. An empty list means nothing the watcher covers is
   tripping, not that nothing is wrong.
4. **Key figures.** `cvl_kpi` with `from` and `to` for yesterday (a date alone means the whole UTC
   day). It returns visitors, sessions, conversion rate, revenue by currency, median engaged time
   and site health, each with its own `previous` and `delta`. Read `state` first: a non-ok figure
   has no value and a `reason` sentence — show the reason, never a zero.
5. **New errors.** `cvl_issues_list` (a small `limit`) gives error groups ordered by when each was
   last seen. Mention only groups seen in the brief's window, or flagged by the watcher.
6. **Open work.** `cvl_board_list` is the queue of what is still open, with what it is worth.
   `briefed:false` means nobody has looked yet — different from an empty board. Mention the top
   rows in the order the board gives (`ranking` states the rule).
7. **Waiting on the owner.** `cvl_proposals_list` lists fixes queued for the owner's decision,
   oldest first. Listing one is not permission to act on it.

## The brief

Keep it under about ten lines:

1. **One line headline** — the single thing that matters most today, or "Nothing changed that needs
   you" if that is true.
2. **Data health** — when the last event arrived.
3. **Flags** — each watcher line, quoted, with the next thing to read.
4. **Figures** — yesterday against the day before, using each figure's `display` and `delta` as
   returned, with the window stated. Mark any non-ok figure with its reason.
5. **Errors** — new or rising groups only.
6. **Decisions waiting** — proposals and top board rows, one line each.

Rules:

- Every figure comes from a tool result. Do not compute a percentage the tool did not return.
- State the window and, where small, the sample. One day of low traffic swings easily; say
  "too few visits to read" rather than reading a swing as a trend.
- State the evidence class (`measured`, `indexed`, `modelled`; modelled means "estimated").
- When receipts are available, run `cvl_check_claim` with each sentence that carries a number
  before sending the brief, and use any corrected sentence it returns.
- For "why" questions the brief raises, hand off: friction to `finding-ux-friction`, a drop to
  `diagnosing-conversion-drops`, errors to `fixing-production-errors`.

## Optional: queue the operator run

If the owner wants Convertlyft's own daily operator run, `cvl_operator_run` queues it. It does not
execute here — a worker runs it — so it returns a run id and a status, never a report. If the
workspace has spent its daily cap the call is refused and names the cap. It is a write
(`operator:run`); ask the owner first.

## Remember, sparingly

If the brief establishes something worth keeping, record it with `cvl_remember` (a finding needs
the `receipt_id` and window it came from). Do not log the brief itself.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_recall` | `GET https://convertlyft.com/api/tools/cvl_recall` | `memory:read` |
| `cvl_live_feed` | `GET https://convertlyft.com/api/tools/cvl_live_feed` | `sessions:read` |
| `cvl_install_verify` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_watch` | `GET https://convertlyft.com/api/tools/cvl_watch` | `sessions:read` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_issues_list` | `GET https://convertlyft.com/api/tools/cvl_issues_list` | `issues:read` |
| `cvl_board_list` | `GET https://convertlyft.com/api/tools/cvl_board_list` | `board:read` |
| `cvl_proposals_list` | `GET https://convertlyft.com/api/tools/cvl_proposals_list` | `proposals:read` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_operator_run` | `POST https://convertlyft.com/api/operator/run` | `operator:run` |
| `cvl_remember` | `POST https://convertlyft.com/api/memory` | `memory:write` |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
