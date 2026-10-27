#!/usr/bin/env node
/**
 * media:import — turn a folder of photographs into the gallery.
 *
 *   public/media/uploads/<album>/<file>.jpg   →   content/gallery.json
 *
 * Existing captions are kept when the file name is unchanged. Files are never
 * moved or deleted, and nothing is uploaded anywhere.
 */
import { readdir, stat, mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const UPLOADS = path.join(ROOT, "public", "media", "uploads");
const CONTENT = path.join(ROOT, "content", "gallery.json");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const ALBUMS = [
  { id: "campus", label: "Campus & Classrooms" },
  { id: "science", label: "Science & Technology" },
  { id: "sport", label: "Sport" },
  { id: "culture", label: "Culture & Assemblies" },
  { id: "library", label: "Library & Reading" },
];

const titleFrom = (file) =>
  path
    .basename(file, path.extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function listAlbum(album) {
  const dir = path.join(UPLOADS, album);
  if (!(await exists(dir))) return [];
  const entries = await readdir(dir);
  return entries
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((f) => `uploads/${album}/${f}`);
}

async function main() {
  await mkdir(UPLOADS, { recursive: true });
  for (const album of ALBUMS) await mkdir(path.join(UPLOADS, album.id), { recursive: true });

  const gallery = JSON.parse(await readFile(CONTENT, "utf8"));
  const previous = new Map((gallery.photos ?? []).map((p) => [p.src, p]));
  const photos = [];

  for (const album of ALBUMS) {
    const files = await listAlbum(album.id);
    for (const rel of files) {
      const src = `/${rel}`;
      const keep = previous.get(src) ?? {};
      photos.push({
        src,
        album: album.id,
        title: keep.title || titleFrom(rel),
        ...(keep.caption ? { caption: keep.caption } : {}),
      });
    }
  }

  // keep curated photos that already live in /public/media (not in uploads/)
  const curated = (gallery.photos ?? []).filter((p) => !String(p.src).includes("/uploads/"));
  const merged = [...curated, ...photos.filter((p) => !curated.some((c) => c.src === p.src))];

  gallery.photos = merged;
  // `count` is the size of the whole school archive; only grow it, never shrink it.
  gallery.count = Math.max(Number(gallery.count ?? 0) || 0, merged.length);
  await writeFile(CONTENT, `${JSON.stringify(gallery, null, 2)}\n`, "utf8");

  const perAlbum = ALBUMS.map((a) => `${a.id.padEnd(9)} ${photos.filter((p) => p.album === a.id).length}`).join("\n            ");
  console.log(`
media:import — done

  Scanned   public/media/uploads/<album>/
  Wrote     content/gallery.json
  New       ${photos.length} photograph(s) from uploads/
  Total     ${merged.length} in the gallery

            ${perAlbum}

  Run "npm run build" (or restart "npm run dev") to see them on the site.
`);
}

main().catch((error) => {
  console.error("media:import failed:", error.message);
  process.exitCode = 1;
});
