---
type: llm
weight: 2
---

The heatmap tool returned exactly this (a text fixture: it answers the same desktop data whatever device is asked for, and no picture is attached, so an answer that notes either of those is correct):

    {
      "evidence": "measured",
      "path": "/pricing",
      "window": { "from": "2026-09-01T00:00:00Z", "to": "2026-09-30T23:59:59Z" },
      "device": "desktop",
      "device_chosen_by": "more_visits",
      "visits_by_device": { "desktop": 640, "mobile": 410 },
      "status": "ready",
      "sample": { "clicks": 412, "visits": 640, "visits_that_clicked": 301, "minimum_clicks": 30 },
      "counts": "412 clicks from 301 of 640 desktop visits",
      "top_elements": [
        { "rank": 1, "selector": "a.nav-link<nav.top", "label": "Docs", "clicks": 118, "visits": 97, "share": 0.286, "dead_clicks": 0, "on_picture": true },
        { "rank": 2, "selector": "div.plan-card<section.plans", "label": "Team", "clicks": 74, "visits": 61, "share": 0.18, "dead_clicks": 52, "on_picture": true },
        { "rank": 3, "selector": "button.faq-toggle<section.faq", "label": "Can I cancel any time?", "clicks": 49, "visits": 44, "share": 0.119, "dead_clicks": 0, "on_picture": true },
        { "rank": 4, "selector": "a.btn-primary<section.hero", "label": "Get started", "clicks": 31, "visits": 29, "share": 0.075, "dead_clicks": 0, "on_picture": true },
        { "rank": 5, "selector": "a.nav-link<nav.top", "label": "Log in", "clicks": 22, "visits": 20, "share": 0.053, "dead_clicks": 0, "on_picture": true }
      ],
      "scroll_depth": [
        { "depth_pct": 25, "visits": 576, "share": 0.9 },
        { "depth_pct": 50, "visits": 371, "share": 0.58 },
        { "depth_pct": 75, "visits": 198, "share": 0.31 },
        { "depth_pct": 100, "visits": 96, "share": 0.15 }
      ],
      "visits_without_scroll_reading": 0,
      "rage_clicks": { "clicks": 27, "visits": 9 },
      "dead_clicks": { "clicks": 61, "visits": 48 },
      "picture": { "width_px": 1000, "page_height_px": 3200, "shows": { "from_px": 0, "to_px": 3200 }, "numbered_ranks": [1, 2, 3, 4, 5] },
      "tokens_used": 900
    }

PASS if the answer names the page and the device, quotes the sample size and the window, describes the top elements in the right rank order with figures that match the tool answer, and mentions scroll depth. Any figure that appears in the tool answer may be quoted, including derived shares that match it.
FAIL if any figure is not in the tool answer or contradicts it, if the ranks are mixed up, if it describes colours or regions of a picture it was not given, or if it omits the sample size or the window.
