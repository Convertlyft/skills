# Error playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-ERR-YOURS — An error in the site's own code

**When:** An error comes from the site's own code (`lane` yours_to_fix) and keeps happening.

**Do:**
1. Open it on the Errors page for where it breaks, the page it happened on and when it was first seen. "How sure are we" says whether the exact spot is known.
2. Reproduce it on that page and device before changing anything.
3. Hand it over: "Copy for your developer", or "Fix it with your AI" through the AI app connected to Convertlyft.
4. Ship the fix, then press "I fixed it" so the next run watches whether it stays fixed.

**Check after:** Whether the error comes back once the fix is live (Fixed — checking, then Confirmed fixed or Came back).

### PB-ERR-APPMAKER — An error in an app the site added, or its platform

**When:** An error comes from an app, widget or plugin the site loads, or from the platform it runs on (`lane` tell_app_maker).

**Do:**
1. Nothing in the site's own code can fix it. Copy the message for the app's maker from the error's page: it names the app, what broke, the browsers and how many visits it reached.
2. Send it to the maker's support. If the app is not needed, removing or replacing it is the fix.

**Check after:** Whether the error stops after the maker's fix, or after the app is removed or replaced.

### PB-ERR-CANTSEE — An error nobody can trace to a file yet

**When:** The browser reported the error with no stack, or nothing could place it (`lane` cant_see).

**Do:**
1. Do not blame an app or the platform: nothing shows where it came from.
2. Answer "Is this mine?" on its page if you know; the answer moves it to the right list.
3. Make it traceable: on the page it happens on most, add `crossorigin="anonymous"` to the script tags loaded from other domains (that domain must send `Access-Control-Allow-Origin`). A browser hides the stack of an error from another domain's script, and this lets the next report show the file.
4. Evidence, not the fix: one recording at the moment it fired shows what the person was doing.

**Check after:** Whether a stack arrives on a later report, or the answer moves it.

### PB-ERR-CRASHED-VISITS — Visits that ended in an error

**When:** A number of visits ended right after an error on the page.

**Do:**
1. Start with the error message at the top of the Errors page: one bug often accounts for most of these.
2. Open the most recent recording of a crashed visit and watch what the person was doing just before.
3. Fix that error first, then check the rest.

**Check after:** Crashed visits on the next run.
