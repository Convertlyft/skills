---
name: adding-webmcp-tools
description: Adds WebMCP tools to a website so AI agents in the browser can call named actions (search, book, look up an order) instead of guessing at buttons, choosing which actions become tools, writing form tools or script tools that match the current draft (document.modelContext), marking risky tools, testing them in Chrome, and then verifying the result with Convertlyft's no-account agent-readiness check. Use when someone asks to "add WebMCP", "make the site agent-ready", "expose tools to AI agents", "register a WebMCP tool", fix "navigator.modelContext" code, or check why an agent cannot use a site's forms. For llms.txt, robots rules for AI crawlers and SEO, use auditing-site-seo instead.
---

# Adding WebMCP tools

WebMCP is a draft web API (W3C Web Machine Learning Community Group, draft of 20 October 2026)
that lets a page give an AI agent in the browser a list of tools: named actions with a
description and an input schema. The agent calls a tool instead of clicking through the page.
Tools run in the visitor's own tab, with whatever they are signed in to.

The draft changes often. Everything below matches the 20 October 2026 draft and Chrome's
documentation as read on 23–24 October 2026. If the code you find disagrees, check the current
spec at https://webmachinelearning.github.io/webmcp/ before "fixing" it.

## 1. Pick the actions

List the things a visitor comes to do. Good tools are the jobs a person would describe in one
sentence, and they already exist as a form or a request on the site:

- site search, product search, docs search
- check stock, price, opening hours, order status (read-only)
- book, request a call, send a contact message (changes something)
- add to cart, go to checkout (changes something, often irreversible)

Leave out: login, password reset, payment entry, account deletion. Never make a tool whose
inputs include a password, card number or government ID.

Fewer, clear tools beat many. Lighthouse warns above 40 tools on a page; there is no browser
limit, but every tool costs the agent context.

## 2. Form tool or script tool

| | Form tool (declarative) | Script tool (imperative) |
|---|---|---|
| Use when | An HTML `<form>` already does the job | The action is JavaScript, or needs typed inputs |
| Where | Attributes on the form | `document.modelContext.registerTool(...)` |
| Status | Removed from the spec on 8 Oct 2026 "for now"; still documented and supported by Chrome | In the spec |

Prefer a script tool for anything new. Use a form tool to expose an existing simple form fast.

## 3. Form tool

Only these four attributes are documented: `toolname`, `tooldescription` (both on `<form>`),
`toolparamdescription` (on each control), `toolautosubmit` (boolean, on `<form>`). Do not use
`tooltitle` or `toolparamtitle`: no primary source documents them.

```html
<form action="/search" method="get" toolname="search_products"
      tooldescription="Searches the shop's products by keyword and returns the results page.">
  <label for="q">Search</label>
  <input id="q" name="q" required toolparamdescription="What to search for, like 'blue running shoes'">
  <button type="submit">Search</button>
</form>
```

- Every control the tool uses needs a `name`. A required control without one breaks the tool.
- If `toolparamdescription` is missing, Chrome falls back to the `<label>`, then `aria-description`.
- Add `toolautosubmit` only to read-only forms (search). Without it, the person presses submit.
- To return a result to the agent instead of navigating, handle the submit:

```js
form.addEventListener('submit', (e) => {
  if (!e.agentInvoked) return;          // a person pressed the button: normal submit
  e.preventDefault();                    // must come before respondWith
  e.respondWith(fetch('/api/search?q=' + encodeURIComponent(form.q.value)).then((r) => r.json()));
});
```

## 4. Script tool

```js
if (window.isSecureContext && document.modelContext?.registerTool) {
  const controller = new AbortController();
  document.modelContext.registerTool({
    name: 'get_order_status',                     // 1–128 chars: letters, digits, _ - .
    title: 'Order status',                         // top-level field, not inside annotations
    description: 'Returns the delivery status of one order placed on this site, by order number.',
    inputSchema: {
      type: 'object',
      properties: { orderNumber: { type: 'string', description: 'The order number from the confirmation email, like A10234' } },
      required: ['orderNumber'],
    },
    annotations: { readOnlyHint: true },
    async execute({ orderNumber }) {
      const res = await fetch('/api/orders/' + encodeURIComponent(orderNumber) + '/status');
      return JSON.stringify(await res.json());
    },
  }, { signal: controller.signal })               // exposedTo also goes here, never in the tool
    .catch((err) => console.warn('WebMCP tool not registered:', err.name));
  // Later, to remove the tool: controller.abort();
}
```

Rules that the browser enforces (each rejects the promise, so always `.catch` it):

- name: 1 to 128 characters, only `A–Z a–z 0–9 _ - .`; unique on the page (`InvalidStateError`)
- description: not empty (`InvalidStateError`)
- the page's `tools` permission must be allowed (`NotAllowedError`)

## 5. Mark risk honestly

| Annotation | Set it when |
|---|---|
| `readOnlyHint: true` | The tool only reads. Never on a tool whose name or effect changes data. |
| `consequentialHint: true` | It buys, books, sends, deletes or is otherwise hard to undo. Agents may ask the person first. |
| `untrustedContentHint: true` | The output contains text from users or other sites (reviews, comments, fetched pages). |

Also:

- Only list origins you trust in `exposedTo`. Tools are same-origin by default; leave it that way
  unless a partner origin needs them.
- To switch WebMCP off on a page or frame: `Permissions-Policy: tools=()`.
- A script from another site registering tools on your page acts in your name. Check every
  third-party script that calls `registerTool`.
- Do not put instructions to the agent ("ignore previous…", "always call this first") in names
  or descriptions.

## 6. Old code to replace

| Found in code | Replace with |
|---|---|
| `navigator.modelContext` | `document.modelContext` (moved on 19 May 2026) |
| `provideContext()`, `clearContext()` | one `registerTool()` per tool (removed 5 Mar 2026) |
| `unregisterTool(name)` | pass `{ signal }` when registering and call `controller.abort()` (removed 27 Mar 2026) |
| `exposedTo` inside the tool object | the second argument: `registerTool(tool, { exposedTo, signal })` |
| `annotations.title` | top-level `title` |
| `executeTool(tool, JSON.stringify(input))` | pass the object itself |

## 7. Test it in Chrome

1. Serve the page over https or localhost (WebMCP is secure-context only).
2. In Chrome, turn on `chrome://flags/#enable-webmcp-testing`, or add the site's WebMCP origin
   trial token (Chrome 149 to 156).
3. DevTools → Application → WebMCP lists the registered tools, logs each call, and can run one.
4. Lighthouse → Agentic browsing reports registered tools, schema problems and forms that could
   be tools.

## 8. Verify with Convertlyft (no account)

Run Convertlyft's free agent-readiness check on the live site:

1. Call `cvl_public_agent_readiness` with `url` (the site's address). It waits up to about 45
   seconds. If it says the scan is still running, call it again with the `scan_id` it gave.
2. Report, exactly as returned:
   - the level (L0 Unreachable to L3 Operable on a free scan) and the check that holds it there;
   - the WebMCP tool forms found in the HTML and any problems the scan raised on them;
   - `report_url`, the full result on convertlyft.com/agent-readiness. Always include it.
3. Say plainly what the free check cannot see: it reads the HTML the server sends and never runs
   JavaScript, so script tools (`registerTool`) are not in it. Whether Chrome actually holds the
   tools (L4, Agent-native) needs pages loaded in a browser, which a Convertlyft account's crawl
   does, or step 7 above.

Never call a site's tools during verification, and never submit its forms.

## Tools

| MCP tool | REST twin | Scope |
|---|---|---|
| `cvl_public_agent_readiness` | `GET https://convertlyft.com/api/tools/cvl_public_agent_readiness` | none (no account over MCP) |
