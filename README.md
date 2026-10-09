# Convertlyft skills

Agent skills for reading website behaviour, conversion and SEO evidence with
[Convertlyft](https://convertlyft.com). Each skill names the exact MCP tool it
calls (server `https://mcp.convertlyft.com/mcp`) and that tool's REST twin
(`https://convertlyft.com/api/…`, header `Authorization: Bearer cvl_pat_…`).
The expert skills also work without an account.

This repository is the master copy of the skills. It is also a Claude Code
plugin (`.claude-plugin/plugin.json`, `.mcp.json`).

## Skills

| Skill | What it does |
|---|---|
| `adding-schema-markup` | Plans, writes and audits structured data (schema.org JSON-LD) for a site, choosing types by page, filling them only with facts visible on the page, and validating before release. |
| `applying-marketing-psychology` | Explains the behavioural principles behind persuasive marketing — social proof, authority, scarcity, reciprocity, loss aversion, anchoring, the decoy effect, commitment, framing, the endowment effect, familiarity, the peak-end rule, choice overload, working-memory limits, distinctiveness, the halo effect and cognitive fluency — with when to use each and the honest limits. |
| `auditing-site-seo` | Audits a website's SEO with Convertlyft, starting with a free no-account scan of any public site that returns a score, the top 3 issues and a report link, then going deeper for signed-in workspaces with the stored crawl, page content, ranked opportunities, keyword detail and competitor briefs. |
| `diagnosing-conversion-drops` | Diagnoses why conversions, sales, sign-ups or enquiries fell on a site by comparing two windows of measured Convertlyft data, narrowing the drop to a source, a landing page, a funnel step, an error or a speed change, and reporting only what the data proves. |
| `finding-ux-friction` | Finds where visitors struggle on a site — rage clicks, dead clicks, forms people start and abandon, pages nobody scrolls far enough on, slow pages — from measured Convertlyft data, and ranks the spots by how many people they touch. |
| `fixing-production-errors` | Takes the JavaScript errors real visitors hit on a site, picks the one that matters most, pulls a fix brief (file, line, page, browser, the steps before it, how many people it hit) for a developer or an AI coding tool, and records when the fix goes live so Convertlyft can tell whether it stayed fixed. |
| `getting-started-with-convertlyft` | Checks how an AI is connected to Convertlyft (signed in or not, which workspace, whether the site's tag is reporting), answers what Convertlyft is and what it can see or change, then hands off to the skill that fits the question. |
| `improving-search-rankings` | Diagnoses why a site does or does not rank in search and decides what to fix first, covering indexing, search intent, titles, internal links, content quality, backlinks, rank tracking, local search, AI-assistant visibility and how landing pages affect Google Ads quality. |
| `measuring-with-analytics` | Sets up, audits and repairs website measurement — tag installation, event and key-event tracking, UTM campaign tagging, cross-domain tracking and data verification — for Google Analytics 4 and the Convertlyft tag. |
| `optimizing-conversions` | Diagnoses why a website's visitors do not buy, sign up or enquire, and decides what to change first, in what order, with honest evidence — funnels, heatmaps, replays, forms, checkout, A/B tests and what happens after the first conversion. |
| `planning-content` | Researches, outlines, drafts and checks articles and landing-page content that serve readers, search engines and AI assistants at once, without inventing facts, statistics or experience the owner does not have. |
| `planning-improvements` | Turns everything known about a website into one ordered improvement plan, split into on-site work and getting people to the site, with measurement first, repairs second, the biggest leak third and new traffic last. |
| `profiling-competitors` | Profiles one competitor from public evidence — positioning, offer, search footprint, content, site quality and AI-assistant visibility — and turns it into ranked, evidence-backed moves, keeping observed facts apart from guesses. |
| `reading-behaviour-data` | Teaches how to read visitor behaviour evidence honestly — heatmaps, scroll depth, rage and dead clicks, form friction, funnels, paths and session replays — and how to turn a reading into a page diagnosis and a testable hypothesis. |
| `researching-seo-competitors` | Researches who a site competes with in search using Convertlyft's stored SEO data, covering the tiered competitor list, the searches rivals win, rankings beside rivals, backlink gaps, AI-assistant mentions, stored briefs and the cross-site matrix for multi-workspace members, and records competitor and keyword choices only with the owner's yes. |
| `reviewing-ux-ui` | Reviews a website's UX and UI the way a website owner needs it — layout, visual hierarchy, readability, navigation, forms, signup and checkout friction, error and empty states, mobile behaviour, accessibility, trust and perceived speed — and ranks fixes by severity with the evidence for each. |
| `running-paid-ads` | Diagnoses paid advertising — Google Ads, Meta, Facebook and Instagram ads — in the right order: tracking, then economics, then where the money goes, then query and audience quality, then the landing page, then bidding and structure. |
| `shipping-cro-fixes` | Takes a conversion fix from finding to owner decision to measured result through Convertlyft, by queueing a proposal for the owner, previewing and recording a change marker only after the owner says yes, undoing a marker when needed, and writing the conclusion to the workspace ledger. |
| `watching-session-replays` | Finds the right recorded visit and reads one moment of it — the pages, the elements clicked, errors and typing lengths in the seconds around a rage click, dead click or error — so a hypothesis from analytics can be confirmed or ruled out. |
| `writing-copy` | Writes, rewrites and edits marketing copy for homepages, landing pages, pricing pages, ads, emails and calls to action, checking clarity, specificity, benefits, proof and customer language. |
| `writing-daily-site-briefs` | Writes a short daily brief for a site from Convertlyft, covering whether the tag is sending, what the live watcher flagged, the key figures for yesterday against the day before, new errors, what is open on the action board and what waits for the owner's decision, without repeating what the workspace already knows. |

## Checks

CI runs on every push and pull request, and the drift check runs daily:

- `node scripts/lint-skills.mjs` — gerund names, third-person descriptions,
  bodies under 500 lines, references one level deep, every tool in the skill's
  Tools table with its REST twin.
- `claude plugin validate --strict .`
- `node scripts/check-drift.mjs` — every tool, REST route and scope a skill
  names must exist on the live server (MCP `tools/list`,
  `/.well-known/convertlyft-capabilities.json`, `/openapi.json`), and the
  generated `skills/getting-started-with-convertlyft/references/convertlyft-api.md`
  must match it. `--write` regenerates that file.
- `claude plugin eval .` with mocked tools (`evals/`). Skipped with a notice
  when the `ANTHROPIC_API_KEY` secret is not set.

## Licence

MIT — see [LICENSE](LICENSE). `reading-behaviour-data` adapts Corey Haines'
`cro` skill under its MIT licence; see [NOTICE](NOTICE).
