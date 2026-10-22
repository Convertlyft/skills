# Local service playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-SCHEMA-LOCALBUSINESS-NAP — The name, address and phone differ between pages, or carry no LocalBusiness markup

**When:** The business name, address or phone is written differently on different pages, or the page about a location has no `LocalBusiness` markup.

**Do:**
1. For the home, contact and each location page, copy the name, address and phone exactly as each page shows them. `cvl_page_content` with `path` reads the page's main text with the site's header and footer left out; a name, address, phone or hours shown only there is not in it, so read those on the page itself.
2. Lay them side by side, and ask the owner which version is right.
3. Write that one version on every page.
4. On the page about each real location, add `LocalBusiness` with the most specific subtype that fits, and `name`, `address`, `telephone`, `url` and opening hours exactly as the page shows them. No rating or review of the business on its own site. See `adding-schema-markup`, and check the page in Google's Rich Results Test.

**Check after:** The name, address and phone on those pages, read on the pages once the change is live, and the markup in Google's Rich Results Test.

### PB-LOCAL-GBP-PARITY — The site and the Business Profile may say different things

**When:** The site's name, address, phone, hours or services may not match the Google Business Profile. Convertlyft does not read the profile.

**Do:**
1. For the home and contact pages, copy the name, address, phone and hours as the site shows them. `cvl_page_content` with `path` reads the page's main text with the site's header and footer left out; a name, address, phone or hours shown only there is not in it, so read those on the page itself.
2. Ask the owner to open the Business Profile and the main directories and compare them, one fact at a time.
3. Fix whichever side is wrong, so the site and the profile say the same thing.

**Check after:** The same facts read on the site once the change is live, and the owner's word that the profile matches.

### PB-LOCAL-CONTACT-CTA — People on phones cannot call or message from the first screen

**When:** A service page does not put a phone link, WhatsApp link or booking button in the first screen on a phone, or people tap a phone number that does nothing.

**Do:**
1. `cvl_heatmap` with `path` and `device` set to `mobile`: whether people reach and press the phone number or booking button, and clicks that got no answer.
2. Open the page on a phone (or read its source): is the phone number a link (`tel:`), and is there a WhatsApp or booking link? Convertlyft's page reads give the page's text, not its links.
3. Put one clear way to get in touch in the first screen on a phone, as a link that opens the call, the chat or the booking.
4. Change one page first and note the day.

**Check after:** Over the same length of window before and after the change, `cvl_funnel_report` with `steps` `[{"event": "pageview", "path": "<page path>"}, {"event": "contact_click", "method": "tel"}]` (or `"whatsapp"`), and with `cvl_page_conversions` the visits that landed on the page and got in touch. A step in `unknown_events` means the site has never sent that event, not zero.

### PB-LOCAL-SERVICE-AREA-PAGE — Area pages copy one page with the place name swapped

**When:** Pages for different towns or districts carry the same text with only the place name changed, or an area the business serves has its own search results and no page.

**Do:**
1. `cvl_site_pages` with `type` set to `service`: the area pages, with their titles and word counts.
2. `cvl_page_content` with `path` for two of them side by side: is the text the same apart from the place?
3. Keep a page for an area only when the owner can fill it with things true of that place: the jobs done there, the team that covers it, local photos, a review from a customer there. Fold the rest into the one service page.
4. Before adding a page for a new area, `cvl_seo_serp` with `keyword` (the service plus the place, as people type it) and `location_code` (a country, not a town: the place is carried by the keyword only) shows whether that search has its own results. It buys the answer inside the daily limit; ask the owner before running more than a few, and use `dry_run: true` to see the cost first.

**Check after:** The area pages and their word counts on the next crawl, and the tracked searches for those areas with `cvl_seo_rank`.

### PB-EEAT-WHO — The page does not show who does the work

**When:** A service page does not say who does the work, what qualifies them, or how to reach a person.

**Do:**
1. `cvl_page_content` with `path`: list which of these the page's text gives: names and roles, qualifications or licences with how to check them, how long the business has served the area, a way to reach a person, real examples of work. Photos of the team and the work are checked on the page itself; the page read gives text, not images.
2. Each missing one is a question for the owner, one at a time. Never write a qualification, a year or an example the owner has not given.
3. Add the owner's answers to the page, near the top for the facts that decide the hire.

**Check after:** The page's text on the next crawl, and with `cvl_page_conversions` the visits that landed on it and got in touch.
