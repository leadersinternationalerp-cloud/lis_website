#!/usr/bin/env node
/**
 * docs:samples — writes a one-page placeholder PDF for every document listed in
 * content/resources.json that is missing from public/documents, so no download
 * link on the site is broken before the real files exist. Delete this script
 * once the school has uploaded the genuine documents.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "documents");
const wrap = (text, width = 86) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > width) { lines.push(line.trim()); line = w; }
    else line += ` ${w}`;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
};

function pdf(title, subtitle, paragraphs) {
  const lines = [
    { text: "LEADERS INTERNATIONAL SCHOOL - ZANZIBAR", size: 9 },
    { text: title, size: 19 },
    { text: subtitle, size: 11 },
    ...paragraphs.flatMap((p) => wrap(p).map((t, i) => ({ text: t, size: 10, first: i === 0 }))),
    { text: "PLACEHOLDER DOCUMENT - replace this file in public/documents with the real one, same name.", size: 8.5 },
  ];
  let y = 780;
  let content = "BT\n0.02 0.15 0.36 rg\n";
  for (const l of lines) {
    y -= l.size >= 19 ? 30 : l.size <= 9 ? 16 : 14;
    content += `/F1 ${l.size} Tf\n1 0 0 1 56 ${y} Tm\n(${l.text.replace(/[()\\]/g, "")}) Tj\n`;
    if (l.size >= 19) content += "0.6 0.45 0.02 rg\n0.8 w\n56 " + (y - 6) + " m 300 " + (y - 6) + " l S\n0.02 0.15 0.36 rg\n";
  }
  content += "ET";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let out = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${body}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const o of offsets) out += `${String(o).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, "binary");
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const resources = JSON.parse(await readFile(path.join(ROOT, "content", "resources.json"), "utf8"));
  let made = 0;
  for (const doc of resources.documents ?? []) {
    const rel = doc.href.startsWith("/documents/") ? doc.href : `/${doc.title.replace(/[^\w]+/g, "-").toLowerCase()}.pdf`;
    const file = path.join(ROOT, "public", rel);
    if (!file.startsWith(OUT)) continue;
    try { await readFile(file); continue; } catch { /* missing → create */ }
    await writeFile(file, pdf(doc.title, doc.category ?? "School document", [doc.description ?? "", `Reference: ${doc.href}. This placeholder exists so the website link works.`, "Replace it with the signed PDF from the school office, keeping the same file name, then deploy."]));
    made += 1;
    console.log(`  wrote ${path.relative(ROOT, file)}`);
  }
  console.log(made ? `\ndocs:samples — ${made} placeholder PDF(s) created in public/documents/` : "\ndocs:samples — every listed document already exists, nothing to do.");
}

main().catch((e) => { console.error("docs:samples failed:", e.message); process.exitCode = 1; });
