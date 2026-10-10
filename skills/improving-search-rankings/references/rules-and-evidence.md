# Rules and evidence — decisions, conclusions, gotchas, Ads overlap

Loaded from the improving-search-rankings skill when a question needs more
than the short decision rules, or before stating what a reading proves.

## More fast decision rules

- **"Should I fix Core Web Vitals?"** Argue only from field data (what real
  visitors experienced), never from a lab score alone. Treat it as a
  tiebreaker in close contests and a conversion issue in its own right — not
  a rescue plan for a page that ranks nowhere.
- **"Is this backlink good or bad?"** Judge one link by relevance, editorial
  placement and whether a real person would click it. Judge a profile by the
  spread of referring domains and natural anchor variety. Vendor authority
  scores are third-party estimates, not Google's opinion.
- **"Brand-new site, no traffic."** Expected. Set the expectation honestly:
  organic traffic builds slowly, and nobody can promise when. Focus on indexing, a handful of winnable specific
  queries, and one clearly better page per query.
- **Rewrite or new page:** one page per intent. Two pages chasing the same
  query: consolidate. One page chasing two intents: split.
- **Pages built from a template at scale** (one page per city, product
  variant or comparison) only work when each page carries data no other page
  has and answers a distinct search. Swapped nouns on a template are doorway
  pages. Start small, index only the pages that earn it.

## What can and cannot be concluded

Ground every claim in a reading and say which one backs it.

- **Sessions** show organic volume over time and which landing pages get it.
  They show that traffic changed, never why a rank changed.
- **Funnels** show what search visitors do after arriving. A good rank with a
  bad funnel usually means the wrong query or the wrong intent.
- **Heatmaps and scroll depth** show how far people read on one page —
  evidence for content-quality and intent-match arguments.
- **Replays** show single visits: where search visitors stall and what they
  fail to find. Hypotheses, not statistics.
- **Errors** show broken experiences that waste organic clicks, and reveal
  tracking breaks that masquerade as traffic drops.
- **Rank data** is the only reading that speaks about rankings directly. It
  shows movement, not cause.
- **Ads search terms** show what real searchers type and what it costs —
  the most honest keyword research there is.

Say plainly when something cannot be concluded:

- *Why* a ranking changed. Google does not disclose causes. Correlating a move
  with a site edit, an update or a competitor's change is the honest ceiling.
  Never promise that a fix restores a position.
- That a specific link, or a disavow, moved a ranking.
- Penalty versus algorithm: a manual action exists only if Search Console says
  so.
- Real-visitor speed from a lab test alone.
- That AI assistants cite or ignore the site — check, do not assume.
- Search volume, difficulty or a competitor's traffic without a data source
  in hand. Offer to check; never estimate from thin air.
- The owner's own results page is not "the" ranking — results are
  personalised and localised.

## Gotchas that defy intuition

- Being in the sitemap does not make a page indexed; internal links are the
  stronger signal.
- Indexed is the floor, not the goal.
- The meta description does not affect ranking. It can change how many people
  click, and Google often replaces it.
- Google rewrites weak titles. A rewritten title is feedback that the written
  one was boilerplate or stuffed.
- A `noindex` or stray canonical on the destination of a redirect chain
  removes the whole chain from search. Inspect the final URL.
- "Crawled — currently not indexed" is usually a quality or demand verdict,
  not a bug that resubmission fixes.
- Blocking a page in robots.txt does not remove it from the index. Removal
  needs `noindex`, and the page must be crawlable for `noindex` to be seen.
- Ranks wobble daily. Judge trends over weeks.
- Fixing everything an audit tool flags is not a strategy. The ladder decides
  what matters.
- `llms.txt` is an emerging convention for AI agents, not a ranking lever.
  Fine to add; promise nothing from it.

## Ads and SEO share one landing page

Google Ads' landing-page experience (a Quality Score component, beside
expected clickthrough rate and ad relevance) rewards what organic search
rewards: a page that matches the query, loads fast, works on phones and is
open about who is behind it. Fixing a landing page for one channel helps the
other. Ads stop when spend stops; organic compounds slowly and persists.
