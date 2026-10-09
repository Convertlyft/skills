#!/usr/bin/env node
// Offline checks for the skill authoring rules (D2/D3, kept from CVL-369).
// Exit 1 with one line per problem.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontmatter, toolsTable } from './lint-skills-lib.mjs';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SKILLS = join(ROOT, 'skills');
const GENERATED = 'getting-started-with-convertlyft/references/convertlyft-api.md';
const MAX_LINES = 500;
const TOOL_RE = /(?<![A-Za-z0-9])cvl_(?!pat_)[a-z][a-z0-9_]*[a-z0-9]/g;
const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

const lines = (t) => t.split(/\r?\n/).length;
const mdFiles = (dir) => existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : [];

const dirs = readdirSync(SKILLS).filter((d) => statSync(join(SKILLS, d)).isDirectory());
if (dirs.length < 18 || dirs.length > 24) fail('skills/', `expected about 20 skills, found ${dirs.length}`);

for (const dir of dirs) {
  const where = `skills/${dir}`;
  const file = join(SKILLS, dir, 'SKILL.md');
  if (!existsSync(file)) { fail(where, 'missing SKILL.md'); continue; }
  const text = readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) { fail(where, 'no frontmatter'); continue; }

  const keys = Object.keys(fm).filter((k) => k !== '__bad');
  const extra = keys.filter((k) => !['name', 'description'].includes(k));
  if (extra.length) fail(where, `frontmatter keys not allowed: ${extra.join(', ')}`);
  if (fm.__bad) fail(where, `unparsed frontmatter line: ${fm.__bad}`);

  const name = fm.name || '';
  if (name !== dir) fail(where, `name "${name}" must equal the directory name`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(where, 'name must be lowercase-hyphen, at most 64 chars');
  if (!/^[a-z]+ing$/.test(name.split('-')[0])) fail(where, `name must start with a gerund (…ing): "${name}"`);

  const desc = fm.description || '';
  if (!desc) fail(where, 'description missing');
  if (desc.length > 1024) fail(where, `description is ${desc.length} chars (max 1024)`);
  if (!/^[A-Z][a-z]+s\b/.test(desc)) fail(where, 'description must open with a third-person verb (e.g. "Audits …")');
  // Quoted trigger phrases ("why is my traffic down") are the user's words, not the skill's voice.
  const voice = desc.replace(/"[^"]*"|“[^”]*”|'[^']*'/g, '');
  if (/\b(I|I'm|me|my|you|your|you're|we|our|us)\b/.test(voice)) fail(where, 'description must be in the third person (no I/you/we outside quoted phrases)');
  if (!/\bUse when\b/.test(desc)) fail(where, 'description must say when to use it ("Use when …")');

  if (lines(text) >= MAX_LINES) fail(where, `SKILL.md is ${lines(text)} lines (must be under ${MAX_LINES})`);

  const table = toolsTable(text);
  let named = new Set(text.match(TOOL_RE) || []);

  // References: one level deep, each linked target must exist.
  for (const m of text.matchAll(/\]\(([^)#\s]+)(#[^)]*)?\)/g)) {
    const target = m[1];
    if (/^[a-z]+:/i.test(target)) continue;
    if (!/^references\/[^/]+\.md$/.test(target)) fail(where, `link "${target}" must point at references/<file>.md (one level deep)`);
    else if (!existsSync(join(SKILLS, dir, target))) fail(where, `link "${target}" does not exist`);
  }
  const refDir = join(SKILLS, dir, 'references');
  if (existsSync(refDir)) {
    for (const entry of readdirSync(refDir)) {
      if (statSync(join(refDir, entry)).isDirectory()) fail(`${where}/references`, `nested directory "${entry}" (one level only)`);
    }
  }
  for (const ref of mdFiles(refDir)) {
    const rel = `${dir}/references/${ref}`;
    const rtext = readFileSync(join(refDir, ref), 'utf8');
    if (lines(rtext) >= MAX_LINES) fail(`skills/${rel}`, `${lines(rtext)} lines (must be under ${MAX_LINES})`);
    for (const m of rtext.matchAll(/\]\(([^)#\s]+)(#[^)]*)?\)/g)) {
      if (!/^[a-z]+:/i.test(m[1])) fail(`skills/${rel}`, `links "${m[1]}"; references must not link further (one level deep)`);
    }
    if (rel !== GENERATED) for (const t of rtext.match(TOOL_RE) || []) named.add(t);
    if (/abdullas-test|^author:/m.test(rtext)) fail(`skills/${rel}`, 'contains a removed author tag');
  }

  for (const tool of named) if (!table.has(tool)) fail(where, `names ${tool} but it is not in the "## Tools" table (tool + REST twin)`);
  for (const [tool, row] of table) {
    if (!/^`(GET|POST) https:\/\/convertlyft\.com\/api\/[^`\s]+`$|^none \(MCP only\)$/.test(row.twin)) fail(where, `${tool}: REST twin cell must be "\`METHOD https://convertlyft.com/api/…\`" or "none (MCP only)"`);
    if (!/^(`[a-z]+:[a-z]+`(, `[a-z]+:[a-z]+`)*|none.*)$/.test(row.scope)) fail(where, `${tool}: scope cell must list scopes in backticks or say none`);
  }
  if (/abdullas-test|^author:/m.test(text)) fail(where, 'contains a removed author tag');

  // Hand-offs name other skills in backticks; each must exist.
  for (const m of text.matchAll(/`([a-z]+ing(?:-[a-z0-9]+)+)`/g)) {
    if (!dirs.includes(m[1])) fail(where, `refers to skill \`${m[1]}\`, which does not exist`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`lint ok: ${dirs.length} skills`);
