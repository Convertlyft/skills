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

### PB-SNIPPET-4-10-LOW-CTR — Shown on Google's first page, but rarely clicked

**When:** A search shows the site at positions 4–10 in Search Console over the last 28 days, with enough views to judge (20 or more), and the page gets no clicks, or fewer clicks per view than the site's other searches in that band.

**Do:**
1. Read the search: `cvl_seo_keyword` gives its Search Console average position (`tiles.gscAvgPosition`), the clicks and views of the page mapped to it (`pageGsc`), and the stored top 10 with each result's title.
2. Compare the page's title and description with the titles around it. Put the search's own words first in the title and say plainly what the page offers.
3. Rewrite the description so it answers the search and gives one reason to click, in the page's own facts.
4. Change only the title and description; keep the page's address and content as they are, so the position is not disturbed while you measure.
5. Change one page at a time, and note the day you changed it.

**Check after:** Clicks against views for that search in the next 28 days of Search Console, at about the same position.

### PB-INTENT-PAGETYPE — The search is won by a different kind of page

**When:** The top results for a search are not pages like yours: guides when you sell, directories, marketplaces or official listings when you offer a service, a map instead of websites. The brief for the search says so in `relevance` (a page like yours is unlikely to rank there).

**Do:**
1. Look at what wins: `cvl_seo_keyword` lists the stored top 10, each labelled (a business, a directory, a big general site).
2. Do not write a page to compete with a kind of result Google does not show for this search.
3. Go where those results are instead, when it fits your business: the directory or listing that ranks, your Business Profile when a map leads, or a guide if guides win and you can write one honestly.
4. Choose another search whose top results are pages like yours.

**Check after:** Nothing to measure on your page. The search stays out of your briefs, and the one you chose instead is tracked.

### PB-LINKS-ORPHAN — No other page on the site links here

**When:** The latest crawl reached a page only from outside its links (the sitemap or a direct address): no crawled page links to it.

**Do:**
1. List the pages: `cvl_seo_audit` with `issue` `orphan-page` names them, with what the crawl found for each.
2. Decide whether each page should be found. If not, remove it from the sitemap and stop there.
3. If it should, link to it from two or three pages on the same topic, in their main text, with words that say what the linked page is about. A link in the menu or the footer counts too, for pages people look for there.
4. Link from pages that are themselves linked and indexable, so the link can be followed.

**Check after:** The page is no longer listed for this finding on the next crawl.

### PB-AI-REFERRALS — AI assistants send visitors here

**When:** Visits arrive from a link in an AI assistant's answer (ChatGPT, Perplexity, Claude, Gemini, Copilot).

**Do:**
1. Find where they land: `cvl_page_conversions` with `source` `ai_tools` lists the pages, with their visits and how many bought or got in touch.
2. See what the assistants are asked and what they cite: `cvl_seo_ai` lists the mentions per platform and each tracked question with what was cited.
3. On the pages they land on, say the facts an answer would quote in plain text near the top (price, place, hours, what is included), not only in images.
4. Make sure AI assistants may read those pages: `cvl_public_agent_readiness` with the site's address says, for each AI crawler or assistant, whether the site's rules for bots (robots.txt) let it in, and what a request in its name got.
5. For what visitors do once they arrive, follow PB-ACQ-AI-TOOLS in optimizing-conversions.

**Check after:** Visits from AI assistants and their results on the next run, and the mentions on the next AI check.
