# Page speed playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-SPEED-LCP — The main content appears late

**When:** Largest contentful paint is over 2.5 seconds at the 75th percentile on a page's visits.

**Do:**
1. `cvl_page_speed` with `from` and `to`: the page's LCP, with the window.
2. Load the page in Google's PageSpeed test on mobile and see what it names as the largest element and what delays it.
3. Serve the hero image at the size it is shown, in WebP or AVIF, with `fetchpriority="high"`; never lazy-load the image in the first screen.
4. Defer scripts the first screen does not need. A slow server answer is the hosting provider's job: name it as such.

**Check after:** LCP for that page with `cvl_page_speed` once enough new visits are in.

### PB-SPEED-INP — Taps and clicks answer late

**When:** Interaction to next paint is over 200 milliseconds at the 75th percentile on a page's visits.

**Do:**
1. `cvl_page_speed` with `from` and `to`: the page's INP, with the window.
2. List the third-party scripts on the page (chat widgets, extra tag-manager tags, old tracking pixels) and remove or delay the ones not needed at once.
3. A developer finds the longest tasks in Chrome's Performance panel and breaks them up.
4. Show a pressed state or spinner as soon as a button is tapped, before slow work starts.

**Check after:** INP for that page with `cvl_page_speed` once enough new visits are in.

### PB-SPEED-CLS — The page jumps while it loads

**When:** Cumulative layout shift is over 0.1 at the 75th percentile on a page's visits.

**Do:**
1. `cvl_page_speed` with `from` and `to`: the page's CLS, with the window.
2. Give every image and video a `width` and `height`, or a CSS `aspect-ratio`.
3. Reserve space for banners, cookie notices, ads and embeds that arrive late, or show them over the content instead of above it.
4. Preload the main web font and use `font-display` with a fallback font of similar size.

**Check after:** CLS for that page with `cvl_page_speed` once enough new visits are in.

### PB-SPEED-SLOW-MONEY-PAGE — A page that brings sales or enquiries is slow

**When:** A page that many visits land on, and that brings purchases or enquiries, has a poor Core Web Vital.

**Do:**
1. `cvl_page_speed` and `cvl_page_conversions` with the same `from` and `to`: the slow pages, and the visits and results each one brings.
2. Fix first the slow page that carries the most visits and results, not the slowest page nobody visits.
3. Open the section above for the vital that is poor: `PB-SPEED-LCP`, `PB-SPEED-INP` or `PB-SPEED-CLS`.
4. Note the day the fix goes live, and never promise a ranking gain from it.

**Check after:** The same vital for that page with `cvl_page_speed`, and its results with `cvl_page_conversions`, over the same length of window after the fix.
