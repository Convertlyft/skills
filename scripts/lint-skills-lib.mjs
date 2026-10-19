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

export function toolsTable(text) {
  const rows = new Map();
  const section = text.split(/^## Tools\s*$/m)[1];
  if (!section) return rows;
  for (const line of section.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`(cvl_[a-z0-9_]+)`\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/);
    if (m) rows.set(m[1], { twin: m[2], scope: m[3] });
  }
  return rows;
}
