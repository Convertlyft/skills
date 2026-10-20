# Stuck-spot playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-FRICTION-FORM-ABANDON — People start the form and leave

**When:** Visitors begin a form and many leave before sending it.

**Do:**
1. Cut the form to the fields genuinely needed to reply.
2. Look for the field where people stop most often and question whether it is needed at all.
3. Make error messages say what to fix, next to the field.

**Check after:** Form completion on the next run.

### PB-FRICTION-STUCK-BLOCK — People click something that does nothing

**When:** Visitors click or swipe a block, image or text that looks interactive but does nothing.

**Do:**
1. Name the element: `cvl_dead_clicks` lists it by its `label` (its words, else its name, id or tag), with `element` for the exact one. "element not recorded" means the tracker captured none, so say that rather than guess.
2. Make that element do what people expect (a link that opens, a button that answers, a slide that moves on a swipe), or remove the styling that makes it look clickable or swipeable.
3. Evidence, not the fix: one recording of it (`cvl_replay_moment` with `path` and `element`) shows what people expected.

**Check after:** Clicks with no response on that element on the next run.

### PB-FRICTION-STUCK-CONTACT — A contact control does not respond

**When:** Visitors click a call, message or contact control and nothing happens.

**Do:**
1. Open the page on the device named and click the control yourself.
2. If it is a tel: or messaging link, check the link target.
3. If it is text styled as a button, make it a real link.

**Check after:** Clicks with no response on that control on the next run.

### PB-FRICTION-RAGE — People click the same spot again and again

**When:** Visitors click one spot many times in quick succession.

**Do:**
1. Make the spot the finding names respond to the click. If it is a button or link that is slow or broken, fix its handler or its link target.
2. If it only looks clickable (an image, a heading, an icon, styled text), make it a real link to where people expect to go, or remove the clickable look.
3. Evidence, not the fix: one recording of the burst (`cvl_replay_moment` with `path` and `element`) shows which of the two it is and what people expected.

**Check after:** Repeated clicks on that spot on the next run.
