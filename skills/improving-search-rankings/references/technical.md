# Technical SEO — crawl, index, rendering, speed

Scope: diagnosing why Google cannot fetch, understand, index, or serve a page
well. Work top-down: access before index, index before rendering detail,
rendering before speed. Speed last — it is real but almost never the reason a
page is absent from search.

## Crawl: can Google reach it?

Google finds pages by following links and reading sitemaps, fetches them as
Googlebot, and revisits on a schedule it sets itself. Diagnosis order:

1. **robots.txt.** Read it first, in full. Look for rules that catch the page
   by prefix accident (a rule meant for a folder catching a page that shares
   the prefix). Remember robots.txt controls crawling, not indexing.
2. **Internal reachability.** Can you click from the homepage to the page in
   a few steps? A page with no internal links pointing at it (an orphan) gets
   crawled late or never, and is judged unimportant. Search the site's own
   navigation and content for links to the page; the sitemap does not count.
3. **Response health.** The page must return a success status to Googlebot
   consistently. Watch for: redirect chains (each hop adds delay and another
   point of failure — collapse to a single hop), pages that return success but show an error message
   (soft errors — Google eventually treats them as gone), server errors under
   load, and bot protection or geo-blocking that serves Googlebot a challenge
   page while people see content. If a fetch-as-Google check (Search
   Console's live test) shows different content than a browser, suspect bot
   handling.
4. **Crawl waste** (large sites only — thousands of pages and up). Faceted
   navigation, calendar pages, search-results pages, and tracking parameters
   can mint unlimited URLs and drown the real pages. Symptoms in Search
   Console: crawled-page counts far above real-page counts, important pages
   crawled rarely. Fixes: block the parameter patterns in robots.txt, add
   `noindex` where crawl is still wanted, link only to canonical forms.
   A small site should not spend time on crawl budget at all.

What good looks like: every page that should rank is linked from at least one
indexed page, returns success on the first request, and has exactly one URL
(one protocol, one host form, one trailing-slash convention — everything else
redirects to it in one hop).

## Index: is it in, and as which URL?

The pipeline is discovered, then crawled, then indexed, then served. A page
can stall at any stage. Search Console's URL inspection names the stage and
the reason — always start there rather than theorizing.

Decision rules by reported state:

- **"Excluded by noindex".** Find who adds the tag or header. Common
  culprits: a CMS setting, a staging flag that shipped, a plugin, or a
  `noindex` on the canonical target rather than the inspected URL.
- **"Duplicate / alternate page with proper canonical" or "Google chose a
  different canonical".** Google folded this page into another. If the folded
  target is the right page, this is working as intended. If not: the pages
  are too similar — differentiate the content, fix the canonical tag, and
  point internal links consistently at the one you want.
- **"Discovered — currently not crawled".** Google knows the URL and has not
  bothered. On a new site this is patience; on an established site it means
  the page looks unimportant — add internal links from strong pages.
- **"Crawled — currently not indexed".** Google fetched it and declined.
  This is a quality or demand verdict on the page (or the site), not a
  switch to flip. Resubmitting does nothing. Improve the page or accept that
  some pages (tag archives, near-duplicates, thin listings) do not deserve
  indexing.
- **Indexed but not for the wanted query.** Not a technical problem. Move up
  the ladder to intent and authority (see the on-page reference of this skill).

Removal, done right: to keep a page out of search, allow crawling and serve
`noindex` — a robots.txt block prevents Google from ever seeing the
`noindex`, so the URL can linger in the index with no snippet. For urgent
removal use Search Console's removal tool, then make the state permanent.

Canonical discipline: the canonical tag is a hint, not an order. Google
overrides it when internal links, sitemaps, and redirects disagree with it.
Make all four point at the same URL and Google will agree with you.

## Rendering: does Google see what people see?

Modern sites often build content with JavaScript after the initial HTML
arrives. Google does render JavaScript, but later, at lower priority, and
imperfectly. Diagnose by comparing the raw HTML source against the rendered
page (Search Console's live test shows the rendered result and a screenshot).

Red flags, roughly in order of damage:

- **Main content absent from the initial HTML** and injected client-side. If
  rendering fails or is delayed, the page is judged empty. Prefer
  server-rendered or statically generated HTML for anything that must rank.
- **Links created only by JavaScript click handlers** rather than real
  anchor tags with href attributes. Google follows anchors; it does not
  click buttons. Whole sections of a site can be invisible this way.
- **Infinite scroll without paginated URLs.** Content below the first batch
  is unreachable. Provide real paginated links as a fallback.
- **Consent walls, interstitials, or age gates** that hide content until
  interaction. Googlebot does not interact. Serve the content underneath.
- **Geo-redirects** that bounce visitors by country. Googlebot crawls mostly
  from the United States; a hard redirect means Google only ever sees one
  country's version. Suggest content adaptation without forced redirects.
- **Randomized or unstable output** (content that differs per fetch) makes
  what gets indexed a lottery.

The honest test: view the raw source, search it for a sentence of the main
content and for the main navigation links. Present in raw HTML: safe. Absent
from raw HTML but present in the rendered test: usually fine, but fragile.
Absent from both: broken.

## Speed and Core Web Vitals

Two data types exist and must never be conflated:

- **Field data**: what real visitors experienced, collected by Chrome and
  reported in Search Console and PageSpeed Insights ("what real people
  experienced"). This is what Google uses. Judged at the slower end of real
  visits, graded good / needs improvement / poor.
- **Lab data**: a synthetic one-off test (Lighthouse scores). Useful for
  debugging, meaningless as a verdict. A poor lab score with good field data
  is a non-problem; never open with a lab score.

The three vitals, in plain terms:

- **Largest Contentful Paint** — how soon the main content appears. Usual
  causes: slow server response, render-blocking stylesheets and scripts, a
  huge uncompressed hero image, images lazy-loaded even above the fold.
  Fixes in payoff order: cache or speed the server response, compress and
  properly size the hero image and load it eagerly with high priority, defer
  scripts that are not needed to paint.
- **Interaction to Next Paint** — how quickly the page reacts to taps and
  clicks. Usual cause: heavy JavaScript hogging the main thread — oversized
  frameworks, tag-manager bloat, third-party widgets. Fixes: remove or delay
  third-party scripts, break up long tasks, ship less JavaScript.
- **Cumulative Layout Shift** — content jumping while loading. Usual causes:
  images without declared dimensions, late-loading ads or banners pushing
  content down, fonts swapping and reflowing text. Fixes: reserve space for
  everything that arrives late; set width and height on media.

Judgment call for owners: fix vitals when field data is outside "good" AND
either rankings are close contests with similar competitors or replays and
funnels show people bouncing before the page settles. Frame speed primarily
as a conversion and experience win with a modest ranking side effect. Never
promise a ranking jump from speed work, and never diagnose vitals as the
cause of a page ranking nowhere — absence is an index, intent, or authority
problem.

## Migrations and domain moves (brief)

The regression class that destroys traffic overnight. Non-negotiables:
redirect every old URL to its exact new counterpart (not the homepage), one
hop; carry over title tags, canonicals, and internal links; keep the old
domain's redirects alive indefinitely; update Search Console (address-change
tool for domain moves) and the sitemap; re-verify analytics and rank data
the week after. Expect turbulence for weeks even when done perfectly — say
so in advance so the owner does not panic-revert. A traffic drop right after
any relaunch is a redirect audit first, everything else second.

## Evidence discipline for this file

Claims about crawling and indexing rest on Search Console, not intuition.
Claims about real-visitor speed rest on field data. Error data and
replays corroborate experience problems (broken pages, rage clicks during
load) but cannot show what Googlebot saw. When Search Console access is not
available, say the diagnosis is provisional and name the exact report that
would settle it.
