import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const RESOURCES_PATH = path.resolve("content/resources.json");
const PUBLIC_DIR = path.resolve("public");

function idFor(href) {
  const slug = path
    .basename(href, path.extname(href))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `resource-${slug}`;
}

async function main() {
  const resources = JSON.parse(fs.readFileSync(RESOURCES_PATH, "utf8"));
  const docs = resources.documents || [];
  console.log(`Found ${docs.length} documents in content/resources.json`);

  let uploaded = 0;
  for (const d of docs) {
    const rel = d.href.replace(/^\/+/, "");
    const abs = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`Skipping missing file: ${abs}`);
      continue;
    }

    const filename = path.basename(abs);
    const asset = await client.assets.upload("file", fs.createReadStream(abs), {
      filename,
      contentType: "application/pdf",
    });

    const doc = {
      _id: idFor(d.href),
      _type: "resource",
      title: d.title,
      category: d.category || "Admissions",
      type: d.type || "pdf",
      ...(d.size ? { size: d.size } : {}),
      ...(d.updated ? { updated: d.updated } : {}),
      ...(d.description ? { description: d.description } : {}),
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    };

    await client.createOrReplace(doc);
    uploaded++;
    console.log(`[${uploaded}/${docs.length}] Synced ${doc._id} (${filename})`);
  }

  console.log(`Done! Synced ${uploaded} documents into Sanity.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
