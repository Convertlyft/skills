// Shared parsers for the skill scripts.
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_-]+):\s?(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
    else if (line.trim()) fields.__bad = line;
  }
  return fields;
}

// A row's tool cell is `cvl_x`, or `cvl_x` via `cvl_call_read` for a tool outside the default list.
export function toolsTable(text) {
  const rows = new Map();
  const section = text.split(/^## Tools\s*$/m)[1];
  if (!section) return rows;
  for (const line of section.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`(cvl_[a-z0-9_]+)`(\s+via `cvl_call_read`)?\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/);
    if (m) rows.set(m[1], { twin: m[3], scope: m[4], viaCallRead: Boolean(m[2]) });
  }
  return rows;
}

// --- Skills against the cached live tools list (scripts/live-tools.json, written by check-drift --write) ---

export const TOOL_RE = /(?<![A-Za-z0-9])cvl_(?!pat_)[a-z][a-z0-9_]*[a-z0-9]/g;
const SCOPE_RE = /`([a-z]+:(?:read|write|run))`/g;

// live-tools.json rows → Map name → { core, args: Set, scopes: string[] | null }.
export function toolIndex(rows) {
  return new Map(rows.map((t) => [t.name, { core: t.core, args: new Set(t.args), scopes: t.scopes }]));
}

// Top-level keys of the JSON object that starts at text[start] (a "{"). Values may be placeholders like <x> or ….
function topLevelKeys(text, start) {
  const keys = [];
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      const end = text.indexOf('"', i + 1);
      if (end < 0) break;
      if (depth === 1 && /^\s*:/.test(text.slice(end + 1))) keys.push(text.slice(i + 1, end));
      i = end;
    } else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') { depth--; if (depth === 0) break; }
  }
  return keys;
}

// Every argument a skill passes to a tool, as [tool, arg, how].
// Two forms: a JSON call {"name": "cvl_x", "arguments": {"a": …}} and prose "`cvl_x` with `a` and `b`"
// (also "takes", "also takes", "filters by"; several tools before the verb share the arguments).
export function argMentions(text) {
  const out = [];
  for (const m of text.matchAll(/"name":\s*"(cvl_[a-z0-9_]+)",\s*"arguments":\s*\{/g)) {
    for (const k of topLevelKeys(text, m.index + m[0].length - 1)) out.push([m[1], k, 'json']);
  }
  const tools = '`cvl_[a-z0-9_]+`(?:(?:,\\s*|\\s+(?:and|or)\\s+|\\s*/\\s*)`cvl_[a-z0-9_]+`)*';
  const args = '`[^`\\n]+`(?:(?:,\\s*|\\s+(?:and|or)\\s+)(?:the\\s+)?`[^`\\n]+`)*';
  const re = new RegExp(`(${tools})\\s+(?:with|also takes|takes|take|filters by)\\s+(?:the\\s+|its\\s+)?(${args})`, 'g');
  for (const m of text.matchAll(re)) {
    const names = [...m[1].matchAll(/`(cvl_[a-z0-9_]+)`/g)].map((x) => x[1]);
    for (const tok of [...m[2].matchAll(/`([^`]+)`/g)].map((x) => x[1])) {
      if (tok.startsWith('cvl_')) continue; // `cvl_call_read` with `cvl_page_content`: a tool, not an argument
      const id = tok.match(/^([a-z_][a-z0-9_]*)\s*(?:[:=].*)?$/s);
      if (id) for (const n of names) out.push([n, id[1], 'prose']);
    }
  }
  return out;
}

// Each scope named in prose (tables and code fences aside), with the tool named last before it in the
// same paragraph (cvl_call_read aside): "`cvl_run_crawl` starts one … It needs `crawl:run`".
// A scope with no tool before it in its paragraph is about the connection, not a tool, and is skipped.
export function scopeMentions(text) {
  const prose = text.replace(/```[\s\S]*?```/g, '').split(/\r?\n/).filter((l) => !/^\s*\|/.test(l)).join('\n');
  const out = [];
  for (const para of prose.split(/\n\s*\n/)) {
    const flat = para.replace(/\s*\n\s*/g, ' ');
    let tool = null;
    for (const m of flat.matchAll(new RegExp(`${TOOL_RE.source}|${SCOPE_RE.source}`, 'g'))) {
      if (m[1]) { if (tool) out.push([tool, m[1], flat.slice(Math.max(0, m.index - 60), m.index + m[0].length)]); }
      else if (m[0] !== 'cvl_call_read') tool = m[0];
    }
  }
  return out;
}

// Problems with one skill file's text against the live tools list.
export function skillToolProblems(text, index) {
  const problems = [];
  for (const t of new Set(text.match(TOOL_RE) || [])) if (!index.has(t)) problems.push(`names ${t}, which is not a live tool`);
  const seen = new Set();
  for (const [tool, arg, how] of argMentions(text)) {
    const live = index.get(tool);
    if (!live || live.args.has(arg) || seen.has(`${tool} ${arg}`)) continue;
    seen.add(`${tool} ${arg}`);
    problems.push(`passes \`${arg}\` to ${tool} (${how}), which takes ${[...live.args].map((a) => `\`${a}\``).join(', ') || 'no arguments'}`);
  }
  for (const [tool, scope, near] of scopeMentions(text)) {
    const live = index.get(tool);
    if (!live || !live.scopes || live.scopes.includes(scope)) continue;
    problems.push(`ties \`${scope}\` to ${tool}, which needs ${live.scopes.map((x) => `\`${x}\``).join(', ') || 'no scope'} ("…${near}")`);
  }
  return problems;
}

// Tools-table rows: a tool outside the default list says via `cvl_call_read`; a default-list tool does not.
export function tableCallReadProblems(table, index) {
  const problems = [];
  for (const [tool, row] of table) {
    const live = index.get(tool);
    if (!live) continue;
    if (!live.core && !row.viaCallRead) problems.push(`${tool} is not in the default tool list: its Tools row must say \`${tool}\` via \`cvl_call_read\``);
    if (live.core && row.viaCallRead) problems.push(`${tool} is in the default tool list: its Tools row must not say via \`cvl_call_read\``);
  }
  return problems;
}
