# Local service playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-SCHEMA-LOCALBUSINESS-NAP — The name, address and phone differ between pages, or carry no LocalBusiness markup

**When:** The business name, address or phone is written differently on different pages, or the page about a location has no `LocalBusiness` markup.

**Do:**
1. `cvl_page_content` with `path` for the home, contact and each location page: copy the name, address and phone exactly as each page shows them.
2. Lay them side by side, and ask the owner which version is right.
3. Write that one version on every page.
4. On the page about each real location, add `LocalBusiness` with the most specific subtype that fits, and `name`, `address`, `telephone`, `url` and opening hours exactly as the page shows them. No rating or review of the business on its own site. See `adding-schema-markup`, and check the page in Google's Rich Results Test.

**Check after:** The name, address and phone on those pages with `cvl_page_content` on the next crawl, and the markup in Google's Rich Results Test.

### PB-LOCAL-GBP-PARITY — The site and the Business Profile may say different things

**When:** The site's name, address, phone, hours or services may not match the Google Business Profile. Convertlyft does not read the profile.

**Do:**
1. `cvl_page_content` with `path` for the home and contact pages: copy the name, address, phone and hours as the site shows them.
2. Ask the owner to open the Business Profile and the main directories and compare them, one fact at a time.
3. Fix whichever side is wrong, so the site and the profile say the same thing.

**Check after:** The same facts on the site on the next crawl, and the owner's word that the profile matches.

### PB-LOCAL-CONTACT-CTA — People on phones cannot call or message from the first screen

**When:** A service page does not put a phone link, WhatsApp link or booking button in the first screen on a phone, or people tap a phone number that does nothing.

**Do:**
1. `cvl_heatmap` with `path` and `device` set to `mobile`: whether people reach and press the phone number or booking button, and clicks that got no answer.
2. `cvl_page_content` with `path`: is the phone number a link (`tel:`), and is there a WhatsApp or booking link?
3. Put one clear way to get in touch in the first screen on a phone, as a link that opens the call, the chat or the booking.
4. Change one page first and note the day.

**Check after:** Visits that got in touch from that page with `cvl_page_conversions`, and the steps in `cvl_funnel_report`, over the same length of window.

### PB-LOCAL-SERVICE-AREA-PAGE — Area pages copy one page with the place name swapped

**When:** Pages for different towns or districts carry the same text with only the place name changed, or an area the business serves has its own search results and no page.

**Do:**
1. `cvl_site_pages` with `type` set to `service`: the area pages, with their titles and word counts.
2. `cvl_page_content` with `path` for two of them side by side: is the text the same apart from the place?
3. Keep a page for an area only when the owner can fill it with things true of that place: the jobs done there, the team that covers it, local photos, a review from a customer there. Fold the rest into the one service page.
4. Before adding a page for a new area, `cvl_seo_serp` with `keyword` (the service plus the place) and `location_code` shows whether that search has its own results. It buys the answer inside the daily limit; ask the owner before running more than a few, and use `dry_run: true` to see the cost first.

**Check after:** The area pages and their word counts on the next crawl, and the tracked searches for those areas with `cvl_seo_rank`.

### PB-EEAT-WHO — The page does not show who does the work

**When:** A service page does not say who does the work, what qualifies them, or how to reach a person.

**Do:**
1. `cvl_page_content` with `path`: list which of these the page shows: names and roles with real photos, qualifications or licences with how to check them, how long the business has served the area, a way to reach a person, real examples of work.
2. Each missing one is a question for the owner, one at a time. Never write a qualification, a year or an example the owner has not given.
3. Add the owner's answers to the page, near the top for the facts that decide the hire.

**Check after:** The page's text on the next crawl, and visits that got in touch from it with `cvl_page_conversions`.
