import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const GALLERY_PATH = path.resolve("content/gallery.json");
const PUBLIC_DIR = path.resolve("public");

const SLOTS = new Set([
  "/media/hero-students.jpg",
  "/media/classroom-primary-1.jpg",
  "/media/admissions-open-banner.jpg",
  "/media/infrastructure-activity-room.jpg",
  "/media/infrastructure-classroom-nursery.jpg",
  "/media/gallery-lab.jpg",
  "/media/gallery-culture-day.jpg",
  "/media/gallery-reading-corner.jpg",
  "/media/gallery-computer-lab.jpg",
  "/media/school-uniform.jpg",
  "/media/classroom-primary-2.jpg",
  "/media/gallery-sports.jpg",
  "/media/gallery-drums.jpg",
]);

function idFor(src) {
  const slug = path
    .basename(src, path.extname(src))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `photo-${slug}`;
}

async function main() {
  const gallery = JSON.parse(fs.readFileSync(GALLERY_PATH, "utf8"));
  const photos = gallery.photos || [];
  console.log(`Found ${photos.length} photos in content/gallery.json`);

  let uploaded = 0;
  for (let i = 0; i < photos.length; i++) {
    const p = photos[i];
    const rel = p.src.replace(/^\/+/, "");
    const abs = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`Skipping missing file: ${abs}`);
      continue;
    }

    const filename = path.basename(abs);
    const asset = await client.assets.upload("image", fs.createReadStream(abs), {
      filename,
    });

    const doc = {
      _id: idFor(p.src),
      _type: "photo",
      title: p.title || filename,
      ...(p.caption ? { caption: p.caption } : {}),
      ...(p.album ? { album: p.album } : {}),
      ...(SLOTS.has(p.src) ? { slot: p.src } : {}),
      order: i + 1,
      publishedAt: new Date().toISOString(),
      image: {
        _type: "image",
        alt: p.title || filename,
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    };

    await client.createOrReplace(doc);
    uploaded++;
    console.log(`[${uploaded}/${photos.length}] Synced ${doc._id} (${filename})${doc.slot ? ` [slot: ${doc.slot}]` : ""}`);
  }

  console.log(`Done! Synced ${uploaded} photos into Sanity.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
