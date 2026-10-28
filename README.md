# Convertlyft skills

Agent skills for reading website behaviour, conversion and SEO evidence with
[Convertlyft](https://convertlyft.com). Each skill names the exact MCP tool it
calls (server `https://mcp.convertlyft.com/mcp`) and that tool's REST twin
(`https://convertlyft.com/api/…`, header `Authorization: Bearer cvl_pat_…`).
The expert skills also work without an account.

This repository is the master copy of the skills.

## Install

| Client | How |
|---|---|
| Claude Code | `/plugin marketplace add Convertlyft/skills`, then `/plugin install convertlyft@convertlyft`. Adds the MCP server, every skill, and a hook that asks you before `cvl_change_apply`, `cvl_operator_run`, `cvl_set_page_type` or `cvl_remove_page_type_rule` runs. Sign in with `/mcp` → `plugin:convertlyft:convertlyft` → Authenticate. |
| Codex | `codex plugin marketplace add Convertlyft/skills`, then `codex plugin add convertlyft@convertlyft`. Sign in with `codex mcp login convertlyft`. Reads `.codex-plugin/plugin.json`. |
| Cursor | Dashboard → Plugins & MCPs → Add Marketplace → Import from Repo, with this repo. Reads `.cursor-plugin/`. |
| Any agent with Agent Skills (Codex, Cursor, Gemini CLI, Copilot and others) | `npx skills add Convertlyft/skills` — skills only; add the MCP server from [convertlyft.com/developers](https://convertlyft.com/developers). |
| From the website | `npx skills add https://convertlyft.com` — the same skills, pinned to a commit of this repo, from `convertlyft.com/.well-known/skills/index.json`. |

Every MCP config here points at `https://mcp.convertlyft.com/mcp` and sends
`Convertlyft-Consumer: plugin`, so Convertlyft can tell calls that came
through a plugin from the rest. The header carries no personal data and changes nothing
about what a call may do.

## Skills

| Skill | What it does |
|---|---|
| `adding-webmcp-tools` | Adds WebMCP tools to a website (form tools or `document.modelContext.registerTool`), matching the current draft, marking risky tools, testing in Chrome, and verifying with Convertlyft's no-account agent-readiness check. Background reading: [webmcpagency.com](https://webmcpagency.com). |
| `adding-schema-markup` | Plans, writes and audits structured data (schema.org JSON-LD) for a site, choosing types by page, filling them only with facts visible on the page, and validating before release. |
| `applying-marketing-psychology` | Explains the behavioural principles behind persuasive marketing — social proof, authority, scarcity, reciprocity, loss aversion, anchoring, the decoy effect, commitment, framing, the endowment effect, familiarity, the peak-end rule, choice overload, working-memory limits, distinctiveness, the halo effect and cognitive fluency — with when to use each and the honest limits. |
| `auditing-shop-journeys` | Audits an online shop's whole buying journey from measured Convertlyft data, cleaning out visits that are not shoppers, finding the step that loses the most people, flagging pages that sell far below the site's own baseline and product pages that lag their sister products, and ranking changes with two certainties: the problem is real, and the change lifts orders. |
| `auditing-site-seo` | Audits a website's SEO with Convertlyft, starting with a no-account scan of any public site that returns a score, the top 3 issues and a report link, then going deeper for signed-in workspaces with the stored crawl, page content, ranked opportunities, keyword detail and competitor briefs. |
| `diagnosing-conversion-drops` | Diagnoses why conversions, sales, sign-ups or enquiries fell on a site by comparing two windows of measured Convertlyft data, narrowing the drop to a source, a landing page, a funnel step, an error or a speed change, and reporting only what the data proves. |
| `finding-ux-friction` | Finds where visitors struggle on a site — rage clicks, dead clicks, forms people start and abandon, pages nobody scrolls far enough on, slow pages — from measured Convertlyft data, and ranks the spots by how many people they touch. |
| `fixing-production-errors` | Takes the JavaScript errors real visitors hit on a site, picks the one that matters most, pulls a fix brief (file, line, page, browser, the steps before it, how many people it hit) for a developer or an AI coding tool, and records when the fix goes live so Convertlyft can tell whether it stayed fixed. |
| `getting-started-with-convertlyft` | Checks how an AI is connected to Convertlyft (signed in or not, which workspace, whether the site's tag is reporting), answers what Convertlyft is and what it can see or change, then hands off to the skill that fits the question. |
| `improving-page-speed` | Finds which pages are slow for real visitors and what to change, reading Core Web Vitals (largest contentful paint, interaction to next paint and cumulative layout shift) per page from Convertlyft's measured speed data, weighing each slow page by the sales and enquiries it carries, and turning the usual causes (oversized images, render-blocking scripts and styles, font loading, content that arrives late and pushes the page) into steps and a snippet a person applies. |
| `improving-search-rankings` | Diagnoses why a site does or does not rank in search and decides what to fix first, covering indexing, search intent, titles, internal links, content quality, backlinks, rank tracking, local search, AI-assistant visibility and how landing pages affect Google Ads quality. |
| `measuring-with-analytics` | Sets up, audits and repairs website measurement — tag installation, event and key-event tracking, UTM campaign tagging, cross-domain tracking and data verification — for Google Analytics 4 and the Convertlyft tag. |
| `optimizing-conversions` | Diagnoses why a website's visitors do not buy, sign up or enquire, and decides what to change first, in what order, with honest evidence — funnels, heatmaps, replays, forms, checkout, A/B tests and what happens after the first conversion. |
| `optimizing-local-service-pages` | Improves the service and location pages of a business that serves people in a place, checking that the name, address and phone match everywhere, that LocalBusiness schema carries only true facts, that a page per service area exists only where it has real local content, that the page shows who is behind the business, and that reviews are earned and shown honestly, using Convertlyft's crawl, page conversions and live results pages. |
| `optimizing-product-category-pages` | Improves a shop's product and category pages on both sides at once, the share of visits that go on to add to cart or buy and how the pages show in search, using measured Convertlyft page conversions, paths, heatmaps and visit recordings, then titles, meta descriptions, unique copy, Product schema and care with filter and duplicate URLs. |
| `planning-content` | Researches, outlines, drafts and checks articles and landing-page content that serve readers, search engines and AI assistants at once, without inventing facts, statistics or experience the owner does not have. |
| `planning-improvements` | Turns everything known about a website into one ordered improvement plan, split into on-site work and getting people to the site, with measurement first, repairs second, the biggest leak third and new traffic last. |
| `profiling-competitors` | Profiles one competitor from public evidence — positioning, offer, search footprint, content, site quality and AI-assistant visibility — and turns it into ranked, evidence-backed moves, keeping observed facts apart from guesses. |
| `reading-behaviour-data` | Teaches how to read visitor behaviour evidence honestly — heatmaps, scroll depth, rage and dead clicks, form friction, funnels, paths and session replays — and how to turn a reading into a page diagnosis and a testable hypothesis. |
| `researching-seo-competitors` | Researches who a site competes with in search using Convertlyft's stored SEO data and, where that does not cover the question, live research on any domain that is included in the plan inside a daily limit for paid search data, covering the tiered competitor list, the searches rivals win, rankings beside rivals, backlink gaps, AI-assistant mentions, stored briefs and the cross-site matrix for multi-workspace members, and records competitor and keyword choices only with the owner's yes. |
| `reviewing-ux-ui` | Reviews a website's UX and UI the way a website owner needs it — layout, visual hierarchy, readability, navigation, forms, signup and checkout friction, error and empty states, mobile behaviour, accessibility, trust and perceived speed — and ranks fixes by severity with the evidence for each. |
| `running-paid-ads` | Diagnoses paid advertising — Google Ads, Meta, Facebook and Instagram ads — in the right order (tracking, then economics, then where the money goes, then query and audience quality, then the landing page, then bidding and structure. |
| `shipping-cro-fixes` | Takes a conversion fix from finding to owner decision to measured result through Convertlyft, by queueing a proposal for the owner, previewing and recording a change marker only after the owner says yes, undoing a marker when needed, and writing the conclusion to the workspace ledger. |
| `sorting-page-types` | Sorts a site's pages into page types with the owner, working through the pages that need the owner busiest first, proposing a type from what each page actually shows, previewing every change and applying it only after the owner says yes in chat, then uses the types to answer analytics and SEO questions by kind of page. |
| `watching-session-replays` | Finds the right recorded visit and reads one moment of it — the pages, the elements clicked, errors and typing lengths in the seconds around a rage click, dead click or error — so a hypothesis from analytics can be confirmed or ruled out. |
| `writing-copy` | Writes, rewrites and edits marketing copy for homepages, landing pages, pricing pages, ads, emails and calls to action, checking clarity, specificity, benefits, proof and customer language. |
| `writing-daily-site-briefs` | Writes a short daily brief for a site from Convertlyft, covering whether the tag is sending, what the live watcher flagged, the key figures for yesterday against the day before, new errors, what is open on the action board and what waits for the owner's decision, without repeating what the workspace already knows. |
| `writing-site-reviews` | Writes a monthly, weekly or custom-range site review an owner and their team can act on, where every item runs from what was seen, against a like-for-like baseline, to why, what it is worth, the fix and how the next review checks it — covering real visitors, the leaking funnel step, pages below their kind, where paid visits land, struggle spots, phones above the fold, search, backlinks, briefs waiting and what not to chase. |

## Checks

CI runs on every push and pull request, and the drift check runs daily:

- `node scripts/lint-skills.mjs` — gerund names, third-person descriptions,
  bodies under 500 lines, references one level deep, every tool in the skill's
  Tools table with its REST twin. Against `scripts/live-tools.json` (the live
  tools list, kept by the drift check): every tool a skill names exists, every
  argument it passes (`{"name": …, "arguments": {…}}`, or "`cvl_x` with `a`")
  is in that tool's inputSchema, a scope tied to a tool is one the tool needs,
  and a tool outside the default list has a Tools row that says
  "via `cvl_call_read`". `node --test scripts/lint-skills-lib.test.mjs` tests
  these rules.
- `node scripts/check-manifests.mjs` — the Claude Code, Codex and Cursor
  manifests agree on name and version, each MCP config points at the real
  server and sends the consumer header, and the hook catches exactly
  `cvl_change_apply`, `cvl_operator_run`, `cvl_set_page_type` and
  `cvl_remove_page_type_rule`.
- `claude plugin validate --strict .` (the marketplace) and
  `claude plugin validate --strict .claude-plugin/plugin.json` (the plugin and its hooks).
- `node scripts/check-drift.mjs` — every tool, REST route and scope a skill
  names must exist on the live server (MCP `tools/list`,
  `/.well-known/convertlyft-capabilities.json`, `/openapi.json`), and the
  generated `skills/getting-started-with-convertlyft/references/convertlyft-api.md`
  must match it, and so must `scripts/live-tools.json`. `--write` regenerates both.
- `claude plugin eval .` with mocked tools (`evals/`). Skipped with a notice
  when the `ANTHROPIC_API_KEY` secret is not set.

## Licence

MIT — see [LICENSE](LICENSE). `reading-behaviour-data` adapts Corey Haines'
`cro` skill under its MIT licence; see [NOTICE](NOTICE).
