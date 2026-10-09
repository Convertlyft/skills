---
type: llm
weight: 2
---

The scan tool returned exactly this (JSON, then the text readout):

    {
      "status": "done",
      "scan_id": "138b2ee3-5232-4b83-b1cc-41c4b2635dfa",
      "target": "https://example.com/",
      "pages_scanned": 1,
      "max_pages": 16,
      "score": {
        "overall": 84,
        "display": "84 — weakest: Content 76",
        "parts": [
          {
            "name": "Reach",
            "score": 84,
            "display": "84"
          },
          {
            "name": "Index",
            "score": 92,
            "display": "92"
          },
          {
            "name": "Content",
            "score": 76,
            "display": "76"
          },
          {
            "name": "Experience",
            "score": 84,
            "display": "84"
          }
        ]
      },
      "issue_counts": {
        "critical": 0,
        "warning": 8,
        "info": 7
      },
      "top_issues": [
        {
          "id": "a11y-no-main-landmark",
          "title": "No main landmark",
          "severity": "warning",
          "pages_affected": 1,
          "pages_measured": 1,
          "worth": "+2.0 points",
          "site_wide": false,
          "examples": [
            "https://example.com/"
          ]
        },
        {
          "id": "missing-canonical",
          "title": "No canonical tag",
          "severity": "warning",
          "pages_affected": 1,
          "pages_measured": 1,
          "worth": "+2.0 points",
          "site_wide": false,
          "examples": [
            "https://example.com/"
          ]
        },
        {
          "id": "missing-h1",
          "title": "Missing H1 heading",
          "severity": "warning",
          "pages_affected": 1,
          "pages_measured": 1,
          "worth": "+2.0 points",
          "site_wide": false,
          "examples": [
            "https://example.com/"
          ]
        }
      ],
      "first_fix": {
        "id": "a11y-no-main-landmark",
        "title": "No main landmark",
        "worth": "+2.0 points"
      },
      "not_measured": [
        "broken-links",
        "subresources",
        "javascript-rendering",
        "accessibility-in-browser",
        "lazy-load-scan",
        "static-contrast",
        "axe-unblinded",
        "url-variant-probe",
        "lastmod-credibility",
        "path-family-coverage",
        "entity-references",
        "declared-language"
      ],
      "shell_pages": 0,
      "agents": {
        "robotsTxt": false,
        "allowedByRobots": 25,
        "listed": 25,
        "reachable": 22,
        "refused": 0,
        "blockedInPractice": 0,
        "undetermined": 0,
        "notProbed": 3,
        "llmsTxt": false
      },
      "cached": false,
      "scanned_at": "2026-10-09T14:50:08.000Z",
      "report_url": "https://convertlyft.com/seo-audit?scan=138b2ee3-5232-4b83-b1cc-41c4b2635dfa",
      "evidence": "measured",
      "tokens_used": 606
    }
    
    Free SEO scan of example.com: the one page opened and audited.
    Score: 84 — weakest: Content 76. Parts: Reach 84 · Index 92 · Content 76 · Experience 84.
    Found: 0 critical, 8 warnings, 7 notes.
    Top issues:
    - No main landmark — warning, on 1 of 1 pages, worth +2.0 points. Examples: https://example.com/
    - No canonical tag — warning, on 1 of 1 pages, worth +2.0 points. Examples: https://example.com/
    - Missing H1 heading — warning, on 1 of 1 pages, worth +2.0 points. Examples: https://example.com/
    First fix: No main landmark (+2.0 points).
    Not checked on this scan: broken-links, subresources, javascript-rendering, accessibility-in-browser, lazy-load-scan, static-contrast, axe-unblinded, url-variant-probe, lastmod-credibility, path-family-coverage, entity-references, declared-language.
    AI agents: of the 25 AI crawlers and assistants on our list, 22 got the pages when we asked in their name and 0 were refused; 3 not asked. cvl_public_agent_readiness has the detail.
    Full report: https://convertlyft.com/seo-audit?scan=138b2ee3-5232-4b83-b1cc-41c4b2635dfa

PASS if the final answer reports the score and names all three top issues (paraphrase is fine), and finishes without asking the user to do anything first (no sign-in, no confirmation, no questions before the report). Any figure that appears in the tool answer above may be quoted.
FAIL if it omits any of the three top issues, states a figure that is not in the tool answer above or contradicts it, presents the scan as a full audit of the whole site (it opened 1 page and lists checks it did not run), or stops to ask the user something instead of reporting.
