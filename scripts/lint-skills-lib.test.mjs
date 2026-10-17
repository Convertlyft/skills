// node --test scripts/lint-skills-lib.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toolsTable, toolIndex, argMentions, scopeMentions, skillToolProblems, tableCallReadProblems } from './lint-skills-lib.mjs';

const LIVE = toolIndex([
  { name: 'cvl_kpi', core: true, reads: true, args: ['fields', 'from', 'to'], scopes: ['sessions:read'] },
  { name: 'cvl_page_content', core: false, reads: true, args: ['fields', 'fixes', 'path'], scopes: ['reports:read'] },
  { name: 'cvl_recommendations', core: false, reads: true, args: ['fields'], scopes: ['sessions:read'] },
  { name: 'cvl_run_crawl', core: true, reads: false, args: ['confirm'], scopes: ['crawl:run'] },
  { name: 'cvl_call_read', core: true, reads: true, args: ['arguments', 'fields', 'name'], scopes: null },
]);

test('toolsTable reads the via cvl_call_read marker', () => {
  const t = toolsTable('## Tools\n\n| MCP tool | REST twin | Scope |\n|---|---|---|\n| `cvl_kpi` | none (MCP only) | none |\n| `cvl_page_content` via `cvl_call_read` | none (MCP only) | `reports:read` |\n');
  assert.equal(t.get('cvl_kpi').viaCallRead, false);
  assert.equal(t.get('cvl_page_content').viaCallRead, true);
  assert.equal(t.get('cvl_page_content').scope, '`reports:read`');
});

test('argMentions finds JSON call arguments, top level only', () => {
  const text = '`{"name": "cvl_page_content", "arguments": {"url": "<the page>", "fixes": {"x": 1}}}`';
  assert.deepEqual(argMentions(text), [['cvl_page_content', 'url', 'json'], ['cvl_page_content', 'fixes', 'json']]);
});

test('argMentions finds prose arguments, shared across listed tools', () => {
  assert.deepEqual(argMentions('`cvl_kpi` with `from` and `to` for yesterday'), [['cvl_kpi', 'from', 'prose'], ['cvl_kpi', 'to', 'prose']]);
  assert.deepEqual(argMentions('`cvl_kpi` and `cvl_page_content` take `path: "/x"`'), [['cvl_kpi', 'path', 'prose'], ['cvl_page_content', 'path', 'prose']]);
  assert.deepEqual(argMentions('`cvl_page_content` with the `path`'), [['cvl_page_content', 'path', 'prose']]);
});

test('argMentions skips a tool named as the argument of cvl_call_read, and output keys', () => {
  assert.deepEqual(argMentions('`cvl_call_read` with `cvl_page_content` for the page'), []);
  assert.deepEqual(argMentions('Call `cvl_kpi`. Read `reason` and `detail`'), []);
  assert.deepEqual(argMentions('`cvl_kpi` with `/pricing`'), []);
});

test('scopeMentions ties a scope to the tool named last before it in the paragraph', () => {
  const text = '`cvl_run_crawl` starts one. It is a write and needs `operator:run`; read it with\n`cvl_call_read`.\n\nNeeds `reports:read`.';
  assert.deepEqual(scopeMentions(text).map(([t, s]) => [t, s]), [['cvl_run_crawl', 'operator:run']]);
  assert.deepEqual(scopeMentions('| `cvl_run_crawl` | none | `operator:run` |'), []);
});

test('skillToolProblems: unknown tool, wrong argument, wrong scope', () => {
  const text = [
    'Call `cvl_usage` first.',
    '',
    '`cvl_call_read` with `{"name": "cvl_page_content", "arguments": {"url": "<the page>"}}`.',
    '',
    '`cvl_recommendations` with `from` and `to`.',
    '',
    '`cvl_run_crawl` is a write and needs `operator:run`.',
  ].join('\n');
  const p = skillToolProblems(text, LIVE);
  assert.equal(p.length, 5, p.join('\n'));
  assert.match(p[0], /names cvl_usage, which is not a live tool/);
  assert.match(p[1], /passes `url` to cvl_page_content \(json\)/);
  assert.match(p[2], /passes `from` to cvl_recommendations \(prose\), which takes `fields`/);
  assert.match(p[3], /passes `to` to cvl_recommendations/);
  assert.match(p[4], /ties `operator:run` to cvl_run_crawl, which needs `crawl:run`/);
});

test('skillToolProblems passes text that matches the live list', () => {
  const text = '`cvl_kpi` with `from` and `to`. `cvl_call_read` with `{"name": "cvl_page_content", "arguments": {"path": "/pricing"}}`. `cvl_run_crawl` needs `crawl:run`.';
  assert.deepEqual(skillToolProblems(text, LIVE), []);
});

test('tableCallReadProblems: a tool outside the default list must say via cvl_call_read, a default one must not', () => {
  const table = new Map([
    ['cvl_page_content', { viaCallRead: false }],
    ['cvl_kpi', { viaCallRead: true }],
    ['cvl_recommendations', { viaCallRead: true }],
  ]);
  const p = tableCallReadProblems(table, LIVE);
  assert.equal(p.length, 2, p.join('\n'));
  assert.match(p[0], /cvl_page_content is not in the default tool list/);
  assert.match(p[1], /cvl_kpi is in the default tool list/);
});
