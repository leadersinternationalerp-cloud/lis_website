#!/usr/bin/env node
/**
 * check:media — fail the build workflow when the content points at a file that
 * does not exist. Run before you push:  npm run check:media
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FILES = ["site", "news", "gallery", "resources", "about", "academics", "admissions", "contact", "faq"].map(
  (name) => `content/${name}.json`,
);
const KEYS = new Set(["src", "image", "thumbnail", "photo", "openGraphImage", "logo"]);
const DOC_KEYS = new Set(["href"]);

const found = [];
function walk(node, file, key) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, file, key));
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (typeof v === "string" && v.startsWith("/") && (KEYS.has(k) || (DOC_KEYS.has(k) && /\.(pdf|png|jpg|jpeg|webp|docx?|xlsx?|csv)$/i.test(v)))) {
      found.push({ file, key: k, ref: v });
    } else walk(v, file, k);
  }
}

for (const file of FILES) {
  try {
    walk(JSON.parse(await readFile(path.join(ROOT, file), "utf8")), path.basename(file), undefined);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
// hero image lives under site.json > hero.image (already covered) and docs under public/documents
const unique = [...new Map(found.map((f) => [f.ref, f])).values()].sort((a, b) => a.ref.localeCompare(b.ref));

const missing = [];
for (const item of unique) {
  const ext = path.extname(item.ref);
  if (!ext || !/\.(png|jpe?g|webp|avif|svg|pdf|docx?|xlsx?|csv)$/i.test(ext)) continue; // routes, not files
  try { await readFile(path.join(ROOT, "public", item.ref.slice(1))); } catch { missing.push(item); }
}

if (missing.length) {
  console.error(`\ncheck:media — ${missing.length} file(s) referenced in content/ but missing from public/\n`);
  for (const m of missing) console.error(`  ${m.ref}\n      from ${m.file} → "${m.key}"`);
  console.error(`\nAdd the file, or fix the path in the JSON. Nothing else on the page breaks, but that slot stays empty.\n`);
  process.exit(1);
}
console.log(`check:media — ${unique.filter((u) => path.extname(u.ref)).length} media/document paths all present in public/.`);
