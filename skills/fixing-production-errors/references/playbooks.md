# Error playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-ERR-CANTSEE — Errors from outside the site's own code

**When:** Errors come from browser extensions or other code the visitor's browser adds, or from a widget or script the site loads from someone else.

**Do:**
1. From a browser extension or code the visitor's browser adds: nothing to fix on the site. Listed so it is clear these were checked.
2. From a widget or script the site loads: the fix may be to remove or replace it, or to report it to its maker.

**Check after:** For a loaded widget or script, whether the error stops after it is removed, replaced or fixed by its maker.

### PB-ERR-YOURS — An error in the site's own code

**When:** An error comes from the site's own code and keeps happening.

**Do:**
1. Open it on the Errors page for the stack, the page it happened on and when it was first seen.
2. Reproduce it on that page and device before changing anything.
3. Fix it, ship it, then record the fix so the next run can check it stopped.

**Check after:** Whether the error still appears after the fix is live.

### PB-ERR-CRASHED-VISITS — Visits that ended in an error

**When:** A number of visits ended right after an error on the page.

**Do:**
1. Start with the error message at the top of the Errors page: one bug often accounts for most of these.
2. Open the most recent recording of a crashed visit and watch what the person was doing just before.
3. Fix that error first, then check the rest.

**Check after:** Crashed visits on the next run.
