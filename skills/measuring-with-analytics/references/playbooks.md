# Measurement playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-MEASURE-UNATTRIBUTED — Visits arrive with no source

**When:** A large share of visits carry no referrer and no campaign tag.

**Do:**
1. List the links the business controls: email footers, newsletters, social bios, QR codes, partner listings, messaging links.
2. Add utm_source (and utm_medium, utm_campaign where useful) to each of them.
3. Do not expect the referrer alone to recover these: apps and many email clients strip it.

**Check after:** The share of visits with no source on the next run.

### PB-MEASURE-AD-BLOCKED — Ad platform tags are blocked in the browser

**When:** The site loads ad platform tags and a share of those loads is blocked by the visitor's browser.

**Do:**
1. Ask whoever runs the ad accounts to send results to each platform from the server as well as the browser (for example a conversions API or enhanced conversions).
2. Agree on one event id per result so the platform does not count it twice.
3. This is a change inside the ad account and on the site's server, not a switch in Convertlyft.

**Check after:** The results each ad platform reports, against the results counted on the site.

### PB-MEASURE-MAP-CONVERSION — No event counts as a result yet

**When:** The site sends events but none of them is set to count as its result, so no rate can be read.

**Do:**
1. Decide what a win is for this site: a purchase, a form submitted, a contact click, a booking.
2. Pick the event the site sends at that moment and have it set to count as the site's result.
3. Until one is set, read nothing about results or rates as true.

**Check after:** Results appear against visits on the next run.
