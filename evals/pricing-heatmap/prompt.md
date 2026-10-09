---
description: D18 success test 2 — a signed-in AI correctly describes a /pricing heatmap. The heatmap answer is a fixture (fixed mocks answer text only, so the numbered picture itself is not attached; its numbering is in top_elements).
tags: [success-test, signed-in]
runs: 10
max_turns: 10
allowed_tools: [Skill, mcp__plugin_convertlyft_convertlyft__cvl_heatmap, mcp__plugin_convertlyft_convertlyft__cvl_whoami, mcp__plugin_convertlyft_convertlyft__cvl_page_attention, mcp__plugin_convertlyft_convertlyft__cvl_rage_clicks, mcp__plugin_convertlyft_convertlyft__cvl_dead_clicks]
---

I'm signed in to Convertlyft. Describe the heatmap for our /pricing page — where do people click?
