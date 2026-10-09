#!/usr/bin/env node
// Offline check that the Claude Code, Codex and Cursor manifests agree:
// one plugin name and version, every MCP config points at the real server
// and sends the consumer header, and the Claude hook asks before the two
// tools that change a live site. Exit 1 with one line per problem.
import { readFileSync } from 'node:fs';

const MCP_URL = 'https://mcp.convertlyft.com/mcp';
const CONSUMER = ['Convertlyft-Consumer', 'plugin'];
const problems = [];
const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const expect = (ok, msg) => ok || problems.push(msg);

const claude = read('.claude-plugin/plugin.json');
const codex = read('.codex-plugin/plugin.json');
const cursor = read('.cursor-plugin/plugin.json');
for (const [file, m] of [['.codex-plugin/plugin.json', codex], ['.cursor-plugin/plugin.json', cursor]]) {
  expect(m.name === claude.name, `${file}: name "${m.name}" differs from "${claude.name}"`);
  expect(m.version === claude.version, `${file}: version "${m.version}" differs from "${claude.version}"`);
  expect(m.description === claude.description, `${file}: description differs from .claude-plugin/plugin.json`);
  expect(m.skills === './skills/', `${file}: skills must be "./skills/"`);
}

for (const file of ['.claude-plugin/marketplace.json', '.cursor-plugin/marketplace.json']) {
  const m = read(file);
  const entry = (m.plugins || []).find((p) => p.name === claude.name);
  expect(m.plugins?.length === 1 && entry, `${file}: must list exactly the "${claude.name}" plugin`);
  expect(['./', '.'].includes(entry?.source), `${file}: the plugin source must be the repo root`);
}

// Each client's own key for extra request headers.
const servers = [
  ['.mcp.json', 'headers'],
  [codex.mcpServers.replace(/^\.\//, ''), 'http_headers'],
  [cursor.mcpServers.replace(/^\.\//, ''), 'headers'],
];
for (const [file, key] of servers) {
  const s = read(file).mcpServers?.convertlyft;
  expect(s?.url === MCP_URL, `${file}: url must be ${MCP_URL}`);
  expect(s?.[key]?.[CONSUMER[0]] === CONSUMER[1], `${file}: must send ${CONSUMER[0]}: ${CONSUMER[1]} under "${key}"`);
}

const hooks = read(claude.hooks.replace(/^\.\//, ''));
const pre = hooks.hooks?.PreToolUse?.[0];
const re = new RegExp(pre?.matcher ?? '^$');
for (const tool of ['cvl_change_apply', 'cvl_operator_run']) {
  for (const prefix of ['mcp__plugin_convertlyft_convertlyft__', 'mcp__convertlyft__']) {
    expect(re.test(prefix + tool), `PreToolUse matcher misses ${prefix + tool}`);
  }
}
for (const tool of ['cvl_change_preview', 'cvl_change_undo', 'cvl_kpi']) {
  expect(!re.test(`mcp__plugin_convertlyft_convertlyft__${tool}`), `PreToolUse matcher must not catch ${tool}`);
}
const out = /echo '(.*)'$/.exec(pre?.hooks?.[0]?.command ?? '')?.[1];
expect(out && JSON.parse(out).hookSpecificOutput?.permissionDecision === 'ask', 'PreToolUse hook must print permissionDecision "ask"');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('manifests agree');
