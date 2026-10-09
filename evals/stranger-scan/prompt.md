---
description: D18 success test 1 — a stranger's AI, told only to check a site with Convertlyft, finishes a real scan and reports the top 3 findings with no human steps. The scan answer is a recording of a live no-account scan of example.com.
tags: [success-test, no-account]
runs: 10
max_turns: 12
allowed_tools: [Skill, mcp__plugin_convertlyft_convertlyft__cvl_public_seo_scan, mcp__plugin_convertlyft_convertlyft__cvl_public_seo_scan_result, mcp__plugin_convertlyft_convertlyft__cvl_public_agent_readiness, mcp__plugin_convertlyft_convertlyft__cvl_docs_search]
---

check https://example.com with Convertlyft
