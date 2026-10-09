---
name: planning-improvements
description: Turns everything known about a website into one ordered improvement plan, split into on-site work and getting people to the site, with measurement first, repairs second, the biggest leak third and new traffic last. Use when someone asks what to fix first, wants an overall plan or audit, asks how to get more customers or whether the site is healthy — any question spanning pages, search and ads rather than one of them.
---

# Planning improvements

This skill decides the order and the shape of a whole-site plan. The depth on
each item comes from the specialist skills: `optimizing-conversions` for
pages and funnels, `reviewing-ux-ui` for design and usability,
`improving-search-rankings` for search, and `running-paid-ads` for paid
traffic. Plain English throughout. Every item in a plan names its evidence in
the same breath, or names the measurement that would produce it.

## The two halves of any plan

**On the site** — what happens after people arrive. Evidence: sessions,
funnels, errors, replays, page speed, install checks, heatmaps and forms.
Question: of the people who came, why did they not act?

**Getting people to the site** — how people arrive at all. Evidence: search
rankings, keyword research, competitors, backlinks, site crawls, AI-assistant
mentions, and which sources sent the visits. Question: are enough of the right
people arriving, and could more?

Keep the halves separate. On-site fixes are mostly in the owner's hands: copy,
forms, buttons, speed, broken code. Off-site work is mostly patience and
supply: content aimed at searches, links earned, ads bought. Mixing them in
one list hides which lever the owner is pulling.

## Triage order

Each stage can make later ones pointless, so do not skip ahead.

1. **Measurement before opinion.** Is tracking installed and sending? Is a
   conversion defined and counting? Is there a funnel on the money path? If
   not, fixing that is the first item, ahead of any page critique or search
   work (see `measuring-with-analytics`).
2. **Repairs before experiments.** Anything measured as broken goes to the top,
   whichever half it sits in: a button that does nothing, sessions ending in an
   error, a form people start and cannot finish, an important page with a crawl
   problem, tracked searches that fell out of sight. Broken things are not
   hypotheses. Fix, then confirm the reading clears.
3. **The biggest leak on the money path.** With measurement and repairs in
   place, the funnel shows where the most people are lost closest to the money.
   That step, split by device and source, is the heart of the on-site half.
4. **Supply after the site can convert.** More traffic poured onto a leaking
   page is wasted, so rankings, content, links and ads come after the leak.
   The exception: a site with almost no visitors. There, on-site readings
   cannot conclude anything yet, so search demand and getting found come first,
   and the on-site half shrinks to "make sure measurement is ready".

## Effort against evidence

Rank items by how strong the evidence is and how big the change is.

- **Strong evidence, small change** — do it now. Most repairs live here.
- **Strong evidence, big change** — plan it properly; do not bury a project as
  one bullet among quick wins.
- **Weak evidence, small change** — only if it is a repair; otherwise it waits.
- **Weak evidence, big change** — never build first. The plan item is the
  measurement that would firm up the evidence.

Describe effort in terms the owner can feel: rewording a headline is an
afternoon; rebuilding a checkout is a project. Never dress a project as a tweak.

## Gaps, said plainly

Name every gap once, in the half of the plan it affects, with the way to fill
it. Typical gaps:

- **Ad cost.** Without the ad platform's own data, a plan can say whether a paid
  source sent people who acted, but not what that traffic cost. Do not call a
  campaign expensive without the cost.
- **Search Console.** Without it, impressions, queries and click-through from
  Google's side are unknown. Stored rankings answer a narrower question.
- **Too little traffic.** Below the sample a reading needs, say "not enough data
  yet", never "no problem".

Do not let a gap silently become a guess.

## The shape of the answer

Two short lists under plain headings — "On your site" and "Getting people to
your site". One item per line, repairs first within each list, evidence or the
missing measurement named in the same line. Close with the single item to do
first across both lists and why it outranks the rest. If one list is empty
because nothing on that side has been measured, say so and make its first item
the reading or connection that would change that.

## With Convertlyft

With a connected workspace, build the plan from stored readings in this order.

1. **What is already known.** `cvl_recall` returns prior findings, decisions
   and unanswered questions with their receipts. Do not re-derive what is
   there; quote a stale row with its date, never as a current figure.
2. **Open work.** `cvl_board_list` is the queue of what was found and is still
   open. `briefed:false` means nobody has looked yet, which differs from an
   empty board.
3. **Measurement.** `cvl_install_verify` (read `reason` and `detail`),
   `cvl_funnels_list` and `cvl_workspaces_list` (`funnel_wiring`: an unmapped
   stage is not an empty stage). `cvl_connections_list` shows whether Search
   Console and other accounts are connected.
4. **Repairs.** `cvl_watch` lists what is tripping and not yet fixed;
   `cvl_issues_list` lists grouped errors; `cvl_form_friction` shows forms
   people start and do not finish; `cvl_page_speed` names slow pages.
5. **The leak.** `cvl_kpi` gives the headline figures for a window (read each
   figure's `state`; a non-ok figure has no value and is never zero).
   `cvl_funnel_report` counts people through each step; `cvl_page_conversions`
   shows which entry pages convert.
6. **Practice applied to this site.** `cvl_recommendations` pairs a measured
   observation with advice; quote both and keep them apart. They claim no
   effect size.
7. **Getting people here.** `cvl_seo_flow` shows where the SEO chain stands;
   `cvl_seo_rank` gives tracked positions (`not_seen` is not "not ranking";
   `missing` means it could not be measured); `cvl_seo_opportunities` is the
   ranked search to-do list. With no account, the free `cvl_public_seo_scan`
   gives a score, the top 3 issues and a report link for any public site.
8. **Before stating any number**, run `cvl_check_claim` with the sentence and
   the receipt ids. Quote the window and sample size.
9. **Hand the first item to the owner.** `cvl_propose` queues a fix for the
   owner to approve; it applies nothing. It needs the opt-in
   `proposals:write` scope, a `baseline` (what was seen) and a `revert_plan`.
   Ask the owner before proposing. Record the plan's conclusions with
   `cvl_remember` (opt-in `memory:write`) so the next session does not derive
   them again; a finding must carry its receipt.

If a tool answers 401, it needs a sign-in. If it answers 403
`insufficient_scope`, the token lacks the scope listed below; plan around the
gap and say so.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_recall` | `GET https://convertlyft.com/api/tools/cvl_recall` | `memory:read` |
| `cvl_board_list` | `GET https://convertlyft.com/api/tools/cvl_board_list` | `board:read` |
| `cvl_install_verify` | `GET https://convertlyft.com/api/tools/cvl_install_verify` | `workspaces:read` |
| `cvl_funnels_list` | `GET https://convertlyft.com/api/tools/cvl_funnels_list` | `reports:read` |
| `cvl_workspaces_list` | `GET https://convertlyft.com/api/tools/cvl_workspaces_list` | `workspaces:read` |
| `cvl_connections_list` | `GET https://convertlyft.com/api/tools/cvl_connections_list` | `workspaces:read` |
| `cvl_watch` | `GET https://convertlyft.com/api/tools/cvl_watch` | `sessions:read` |
| `cvl_issues_list` | `GET https://convertlyft.com/api/tools/cvl_issues_list` | `issues:read` |
| `cvl_form_friction` | `GET https://convertlyft.com/api/tools/cvl_form_friction` | `sessions:read` |
| `cvl_page_speed` | `GET https://convertlyft.com/api/tools/cvl_page_speed` | `sessions:read` |
| `cvl_kpi` | `GET https://convertlyft.com/api/tools/cvl_kpi` | `sessions:read`, `reports:read` |
| `cvl_funnel_report` | `GET https://convertlyft.com/api/tools/cvl_funnel_report` | `reports:read` |
| `cvl_page_conversions` | `GET https://convertlyft.com/api/tools/cvl_page_conversions` | `sessions:read` |
| `cvl_recommendations` | `GET https://convertlyft.com/api/tools/cvl_recommendations` | `sessions:read` |
| `cvl_seo_flow` | `GET https://convertlyft.com/api/tools/cvl_seo_flow` | `reports:read` |
| `cvl_seo_rank` | `GET https://convertlyft.com/api/tools/cvl_seo_rank` | `reports:read` |
| `cvl_seo_opportunities` | `GET https://convertlyft.com/api/tools/cvl_seo_opportunities` | `reports:read` |
| `cvl_public_seo_scan` | `GET https://convertlyft.com/api/tools/cvl_public_seo_scan` | none (no account over MCP) |
| `cvl_check_claim` | `GET https://convertlyft.com/api/tools/cvl_check_claim` | none |
| `cvl_propose` | none (MCP only) | `proposals:write` |
| `cvl_remember` | `POST https://convertlyft.com/api/memory` | `memory:write` |

REST calls send `Authorization: Bearer cvl_pat_…`; arguments go in the query string for GET and a JSON body for POST.
