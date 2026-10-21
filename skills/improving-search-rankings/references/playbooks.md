# Search playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-SPEED-VITAL-POOR — Page experience is poor on the slowest pages

**When:** A Core Web Vital is poor for a share of the site's visits.

**Do:**
1. Speed is rarely why a page ranks nowhere; treat this as page experience for visitors first.
2. Start on the slowest pages rather than the site as a whole: the slow tail is where this lives.
3. Find what is heaviest or shifts most on those pages.
4. Fix the worst page first and check it before moving on.

**Check after:** The same vital for those pages on the next run.

### PB-RANK-LOST — Searches the site used to appear for are gone

**When:** Searches that used to show the site within the checked depth no longer do.

**Do:**
1. Check that the page that used to answer the search is still reachable: not redirecting, not erroring, not blocked from indexing.
2. Check whether its content still answers the search.
3. Look at what now ranks for the search to see what changed in the results.

**Check after:** The position of those searches on the next check.

### PB-INTENT-PAGETYPE — The search is won by a different kind of page

**When:** A search sits under Won elsewhere in Content briefs: more than half of its top results are a kind of page the site does not make (guides, directories, government pages or shop pages), so a page like the site's is unlikely to rank there.

**Do:**
1. Read the Won elsewhere line for the search: it names the kinds of page that hold the top results. `cvl_seo_keyword` shows the stored top 10 to look at yourself.
2. Check the site's own kind is right: `cvl_page_types` gives it as `site_type`. If it is wrong, correct it with `cvl_set_site_type` and make the brief again with `cvl_seo_make_brief` and `force: true`.
3. Decide with the owner: make that kind of page only if the business can honestly write it and it leads to what the business sells, then link it to the page that sells.
4. Otherwise stop chasing the search: take it out of tracking with `cvl_seo_untrack_keywords`, or mark it not a money keyword with `cvl_seo_set_keyword_money`, and put the effort into a longer, more specific search whose top results are pages like the site's.

**Check after:** If a page was made, its position for the search on the next rank check after Google has it; if not, the search stays under Won elsewhere and needs nothing more.

### PB-LINKS-ORPHAN — Pages almost nothing on the site links to

**When:** Site audit lists "No other page on your site links here" or "Hardly linked from page content" on pages that should be found.

**Do:**
1. See which pages: `cvl_seo_audit` with `issue: "orphan-page"` (or `"near-orphan-page"`) gives the fix text and sample pages.
2. Make sure the latest crawl reached the whole site first: a crawl that stopped early cannot say what nothing links to. Crawl again before acting if it was cut short.
3. Link each page that should be found from a page people already reach and that is about the same thing (its category, a related service or guide, the menu), with link words that say what the page is.
4. A page that should not exist any more: remove it or send it to its nearest live page. A page kept apart on purpose: mark the issue Not a problem with `cvl_seo_issue_not_a_problem`, only when every page it lists is meant to be that way, since it covers the whole issue.

**Check after:** How many pages the issue touches on the next crawl.

### PB-SNIPPET-4-10-LOW-CTR — Google shows the page at 4–10 but few click

**When:** A search shows the page at positions 4–10 on Google, at least 20 times in 28 days, and nobody clicked, or a smaller share clicked than across the site's other searches at 4–10.

**Do:**
1. Find the search and its page: Your next 3 moves on the SEO Overview (`cvl_seo_overview`, a move of kind `snippet`) names both, with how often Google showed the page and how many clicked.
2. Search it yourself on a phone and read the page's title and description beside the results around it: do they say what the person searched for, and why to pick this page?
3. Rewrite the title and meta description first, not the page body: the search's words early, then what the page offers. A brief for the search (`cvl_seo_brief`) has title and description options and the page's top searches; keep the words of any search it already holds in the top 3.
4. Change only the title and description this time, so the next read shows whether they did it.

**Check after:** Clicks from Google for that search against the times shown, once Google shows the new title.

### PB-AI-REFERRALS — Visits arrive from AI apps

**When:** Visits arrive from a link in an AI answer (ChatGPT, Perplexity, Claude, Gemini, Copilot) or from an AI tool's own browser, the AI tools row of Traffic › Sources.

**Do:**
1. Make the pages they land on answer and convert first: that is `optimizing-conversions#PB-ACQ-AI-TOOLS` (where they land, what to put in the first screen).
2. See which questions AI answers name the site for, and what they cite: Seen in AI answers (`cvl_seo_ai`), a tracked sample of questions, never every AI answer.
3. For a tracked question that cites other sites and not this one, read the cited page beside the site's own page on the same thing: does the site's page state the facts plainly, in words a person would ask with?
4. Put those facts on the page AI tools already send people to, and link it from the pages about the same thing.

**Check after:** The AI tools row's visits and results on the next read, and the tracked questions on the next AI check.
