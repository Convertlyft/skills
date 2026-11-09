---
type: llm
weight: 2
---

Pass only if the answer's code does ALL of these:
- registers the tool with `document.modelContext.registerTool`, never `navigator.modelContext` (it may mention navigator only as the old name);
- does not call `unregisterTool`, `provideContext` or `clearContext`;
- passes an AbortSignal in the second (options) argument, or says how to remove the tool with `controller.abort()`;
- handles the promise registerTool returns (`await` in try/catch, or `.catch`);
- marks the tool read-only (`annotations: { readOnlyHint: true }`), since it only reads;
- gives the tool a name of letters, digits, `_`, `-` or `.` only, and a non-empty description.
Fail if any one is missing.
