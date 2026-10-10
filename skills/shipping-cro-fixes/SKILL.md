---
name: shipping-cro-fixes
description: Takes a conversion fix from finding to owner decision to measured result through Convertlyft, by queueing a proposal for the owner, previewing and recording a change marker only after the owner says yes, undoing a marker when needed, and writing the conclusion to the workspace ledger. Use when a fix has been found and the next step is to put it in front of the owner, mark that it shipped, measure it later, or roll the marker back.
---

# Shipping CRO fixes

A fix only counts when the owner chose it, the change is marked on the date it went live, and the
result is read against that marker later. This skill is the procedure for that chain. Finding the
fix belongs to `finding-ux-friction`, `diagnosing-conversion-drops` and `reading-behaviour-data`.

The rule that overrides everything here: **nothing is applied without the owner's explicit yes in
this conversation.** A proposal sitting in the queue is not a yes. Silence is not a yes.

## Before anything: what is already known

1. Call `cvl_recall`. Anything in the ledger has already been established — a finding, a decision,
   a preference ("never touch the checkout"), or a question nobody answered. A row marked
   `receipt_stale` is historical: quote it with its date, never as a current figure.
2. Call `cvl_proposals_list`. By default it lists what still needs a decision. If the same fix is
   already queued, do not queue it again under a new name; point the owner at the existing one.

## Step 1 — Put the fix in front of the owner

Call `cvl_propose` with:

- `fix_identity` — a stable id for this fix. Proposing the same `fix_identity` twice replaces the
  earlier card rather than adding a second one.
- `title` — one plain sentence: what changes, on which page.
- `baseline` — what was measured before proposing: the reading, its window and its sample size.
  Required. Copy the figures from the tool results; do not round or restate them from memory.
- `revert_plan` — how to undo the change on the site. Required.
- `detail` — the evidence and why this fix comes first.

`cvl_propose` does not apply anything and cannot. Approval is a human act in Convertlyft, and no
credential can approve a proposal, including its own. Tell the owner the proposal is queued and
where to decide on it; do not describe it as done.

If the call answers 403 `insufficient_scope`, the credential lacks `proposals:write`. Say so, show
the proposal text in the chat instead, and let the owner decide there.

## Step 2 — The owner ships the change

The change itself happens on the owner's site, by the owner or their developer. Convertlyft does
not edit the site. Ask the owner to say when it is live, and on what date and time.

## Step 3 — Preview the marker, then ask

Once the owner confirms the change is live:

1. Call `cvl_change_preview` with the `note` (what changed) and `marked_at` (when it went live, ISO
   8601 with a zone). It shows exactly what `cvl_change_apply` would write and the undo it would
   hand back. Nothing is stored by this call.
2. Show the owner the preview in plain words: "This will record that <note> went live at
   <marked_at>. Record it?"
3. Only on a clear yes, call `cvl_change_apply` with the same `note` and `marked_at` and a fresh
   `idempotency_key`. A retry with the same key returns the same single marker, never a second
   one, so reuse the key if the call fails mid-way.
   What it records is a timeline marker in Convertlyft: the note and the time the change went
   live. It does not edit the site, and `cvl_change_undo` removes only the marker, never the
   change itself. Say it that way to the owner: "recorded", never "applied to your site".
4. Keep the proposal id it returns. That id is what `cvl_change_undo` takes.

Both calls need `changes:write`, which is an opt-in scope. On 403 `insufficient_scope`, say the
marker could not be recorded and why; do not try another route.

## Step 4 — Measure later, honestly

The marker exists so the impact can be read against it. When the owner comes back:

- Read the same figure, the same way, over a window after the marker, beside the baseline window.
  `cvl_kpi` returns each figure with its own `previous` and `delta` for a window; present the
  `window.handle` on later calls so the whole chain reads one window.
- Read `state` before any value. A non-ok figure means the number does not exist for that range,
  never that it is zero.
- A before-and-after comparison is not a controlled test. Say so. Other changes, seasons and
  campaigns move the same numbers.
- Too little traffic after the marker means "too early to tell", with the real counts.
- Before stating a number from an answer that carries a `receipt_id`, run `cvl_check_claim` with
  the sentence and that id, and use the corrected sentence if it returns one. Write results carry
  no receipt; quote a figure from an answer with none exactly as returned.

## Step 5 — Undo, if the owner asks

If the change was rolled back on the site, or the marker was wrong, call `cvl_change_undo` with
the proposal id from Step 3. It removes the marker using the undo computed when it was applied.
Calling it twice is safe; the second call removes nothing. Ask the owner first.

## Step 6 — Write the conclusion down

When there is a conclusion — the fix helped, did not help, or it is too early — record it with
`cvl_remember` so the next session does not derive it again:

- `kind` — a finding, a decision, a preference or a question.
- `statement` — one plain sentence.
- A finding must carry the `receipt_id` of the call it came from and the window it covers
  (`window_from`, `window_to`). A claim with no receipt is refused by design.
- Nothing in the ledger can be deleted from here; only the owner can, from their settings. Write
  carefully.

## What to report

- What was proposed, and that it waits for the owner's decision.
- Whether a marker was recorded, with its time and the proposal id.
- Any measured result with its window, sample size and evidence class (`measured`, `indexed` or
  `modelled`; a modelled figure is "estimated").
- What was not done, and why (missing scope, no yes from the owner, too little data).

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_recall` | `GET https://convertlyft.com/api/tools/cvl_recall` | `memory:read` |
| `cvl_proposals_list` | `GET https://convertlyft.com/api/tools/cvl_proposals_list` | `proposals:read` |
| `cvl_propose` | none (MCP only) | `proposals:write` |
| `cvl_change_preview` | none (MCP only) | `changes:write` |
| `cvl_change_apply` | none (MCP only) | `changes:write` |
| `cvl_change_undo` | none (MCP only) | `changes:write` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_remember` | `POST https://convertlyft.com/api/memory` | `memory:write` |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
