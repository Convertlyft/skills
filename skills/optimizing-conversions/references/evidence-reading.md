# Reading the Evidence

How to interpret each behaviour reading — funnels, heatmaps, replays, paths, errors — and turn what you see into a friction diagnosis. The summary of what each reading can and cannot support lives in SKILL.md; this file is the working method.

## Funnel analysis method

1. **Define steps as commitments, not pageviews.** A step should represent a decision the visitor made — reached checkout, submitted the form, chose a plan — not merely a page that loaded. If a page can be reached idly (from navigation curiosity, from a back button), its numbers overstate intent and the drop after it overstates failure.
2. **Set an honest window.** Cover at least one full traffic cycle — a whole week or more, longer when traffic is thin or weekly rhythm is strong — and never let the window span a major site change or campaign launch. A window straddling a change blends two different sites.
3. **Read losses in people first, proportions second.** A modest proportional drop on a high-traffic step can lose more actual people than a dramatic-looking drop on a trickle. Rank by people lost.
4. **Weight by proximity to money.** People lost just before payment had proven intent; people lost on the landing page mostly had none. A leak late in the funnel usually outranks a larger one at the top.
5. **Segment before diagnosing.** Cut the leaking step by device class, traffic source, landing page, and new versus returning. You are looking for divergence:
   - One segment far worse than its siblings: diagnose that segment. It is often one device class, one browser, or one campaign — frequently breakage or mismatch, not design.
   - All segments leaking equally: the step itself is the problem.
6. **Compare the site only to itself.** Trend the step against earlier periods with a similar traffic mix. Never against an external benchmark — you do not have one you can honestly state.
7. **Check what leavers did next.** Went back, looped, detoured, or left the site entirely — each points somewhere different (see Reading paths).

Judging whether a drop is even a problem: hold each step against its realistic intent. A signup prompt shown to casual blog readers will shed most of them by design; the same shed at the final payment step is a fire. Also check entrance quality — a step fed by a broad cold campaign will always convert worse than one fed by brand searches, and that is a traffic fact, not a page fault.

## Reading heatmaps

**Click maps.**
- Clusters of clicks on things that are not clickable (dead clicks) mean affordance confusion: something looks pressable, or people expect it to do something. Frequent on images, headings, and styled text.
- Clicks on product images that do nothing usually mean people wanted detail — zoom, gallery, another angle.
- A primary button that is clearly visible but barely clicked is not a visibility problem; suspect motivation or clarity instead.
- Heavy clicking on navigation from the middle of a money flow is distraction or missing information — people are leaving the path to find something.

**Scroll maps.**
- The question is always: where does attention collapse, relative to where the call to action and the key reassurances sit? Content below the collapse effectively does not exist for most visitors.
- A sharp collapse near the top of a landing page says the first screen fails the glance test (see the glance test in the page heuristics reference).
- A cliff at a strong visual break — a full-width band, a large image edge — is often a false floor: the page looked finished there, so people stopped.

**Move maps.** Cursor position is a weak proxy for gaze. Use only as weak corroboration, never as the basis of a claim.

**Aggregation traps.**
- Always split by device; a blended map of phone and desktop layouts describes neither.
- Check deploy dates against the reading window; a map spanning a page change is a blend of two pages.
- A map built from a handful of sessions is noise. Say so rather than reading tea leaves.

What a heatmap proves: what got seen and clicked on this page, in aggregate. What it cannot prove: intent, emotion, comprehension, or anything off the page.

## Reading replays

**Selection discipline.** Sample by failure signal at the step you are diagnosing — rage click, error, form abandoned, reached-but-not-completed — never by session length. Length-sorted replays skew toward the strange and the idle.

**Watching discipline.** For each replay note: device, step reached, the exact moment of struggle, any error shown, and what the person did next. Stop watching when new replays stop revealing new failure modes — saturation, not a fixed count, is the stopping rule.

**Struggle vocabulary.**
- Rage clicks (rapid repeated clicks on one spot): the expected response did not happen. Pair with the error stream to decide breakage versus slowness.
- Dead clicks (clicks on inert elements): affordance confusion or silent breakage; the error stream tells you which.
- Rapid back-and-forth between two pages: a question one page raises and the other fails to answer.
- Form struggle: re-entering a field, long pauses at one field, a validation loop, or abandonment right after one particular field — that field is your suspect. Entered data wiped by an error is a severe finding on its own.
- Scroll hunting (fast sweeps up and down): the person believes something exists and cannot find it.

**Prevalence discipline.** Replays prove existence and mechanism, never frequency. "Several replays show people stuck at the card field" is honest. "Most people struggle with the card field", from replays alone, is not — count prevalence with funnels and error counts.

## Reading paths

- Write down the intended path first, then lay actual paths against it. The gaps are the findings.
- Loops between two pages: an unanswered question spanning both.
- Mid-funnel detours to pricing, shipping, returns, FAQ, or privacy pages: information missing at the point of need. The usual fix is answering it inline at the step where the detour starts, not improving the destination page.
- Deep entries from search that bounce: the entry page assumes context that arriving visitors do not have. Rank data tells you what they searched for; check the page against that intent.
- Repeated returns to the home page: navigation is failing as a recovery tool; people reset and start over.
- Sessions ending at comparison-stage pages suggest comparison shopping or unresolved doubt — hypothesis material only, never a conclusion.

## Reading the error stream

- Correlate spikes with the funnel. An error cluster at the leaking step, concentrated in the leaking segment's device or browser, upgrades a diagnosis from inference to near-certainty.
- Concentration by device or browser means compatibility breakage. This is a repair, not a test.
- Silent failures — a click that produces no navigation and no request — pair with dead clicks in replays. The page swallowed the action.
- Third-party scripts (payment widgets, chat, tag managers) fail intermittently and unevenly; an intermittent conversion problem on a clean-looking site often lives here.
- The absence of errors at a leaking step is also information: it moves suspicion from breakage to the human friction classes below.

## Friction diagnosis

Map observed signals to a class. The class dictates the direction of the fix.

| Class | Typical signals | Fix direction |
|---|---|---|
| Clarity | short visits ending at the landing page; scroll collapse near the top; no engagement with the value message; deep-entry bounces | rewrite the first screen: what this is, for whom, why here, what to do next |
| Relevance | one source or campaign drops far harder than others; ad promise absent from the page; query intent mismatched to page (rank data) | match the page message to the intent that brought people |
| Anxiety | drop at payment or personal-detail fields; detours to privacy, returns, guarantees; replays hesitating at card entry with no errors present | reassure at the exact point of doubt; ask for less |
| Distraction | mid-funnel clicks on navigation, banners, cross-sells; heatmap attention on competing elements | remove competing exits from money pages |
| Effort | drops concentrated on phones; field re-entry and validation loops; long forms; address-entry struggle | shorten, simplify, prefill, fix the inputs — effort is usually the cheapest class to fix |
| Breakage | error spikes; dead clicks with silent failures; device- or browser-specific cliffs | repair and verify; no experiment needed |

Classes co-occur — checkout leaks are often anxiety and effort together. Name the dominant one, cite its signals, and make the hypothesis about it specifically.

## Funnel review checklist

- [ ] Conversion and money path defined
- [ ] Window covers a full traffic cycle with no site change inside it
- [ ] Steps are commitments, not idle pageviews
- [ ] Leaks ranked by people lost, weighted by proximity to money
- [ ] Leaking step segmented by device, source, landing page, new versus returning
- [ ] Error stream checked for the step and segment
- [ ] Heatmap and replay evidence gathered at the step
- [ ] Friction class named, with the signals that support it cited
- [ ] Observed facts separated from inferences in the write-up
