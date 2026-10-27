#!/usr/bin/env node
/**
 * build:cpanel — Builds a static export of the website in ./out and packages it
 * into ./cpanel-public_html.zip (including .htaccess and /api/submit.php) ready
 * to upload and extract directly inside cPanel's `public_html` folder.
 */
import { spawnSync } from "node:child_process";
import { cp, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ROUTE_FILES = [
  path.join(ROOT, "src", "app", "api", "submit", "route.ts"),
  path.join(ROOT, "src", "app", "api", "revalidate", "route.ts"),
];
const OUT_DIR = path.join(ROOT, "out");
const ZIP_FILE = path.join(ROOT, "cpanel-public_html.zip");

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("Building static cPanel export (output: 'export')...");

  const moved = [];
  for (const file of ROUTE_FILES) {
    if (await exists(file)) {
      const bak = `${file}.cpanel-bak`;
      await rename(file, bak);
      moved.push({ file, bak });
    }
  }

  let buildResult;
  try {
    buildResult = spawnSync(
      process.platform === "win32" ? "npx.cmd" : "npx",
      ["next", "build"],
      {
        cwd: ROOT,
        stdio: "inherit",
        shell: process.platform === "win32",
        env: {
          ...process.env,
          CPANEL_STATIC: "1",
        },
      },
    );
  } finally {
    for (const { file, bak } of moved) {
      if (await exists(bak)) {
        await rename(bak, file);
      }
    }
  }

  if (buildResult.status !== 0) {
    process.exit(buildResult.status ?? 1);
  }

  // Ensure .htaccess and api/submit.php are in out/
  await cp(path.join(ROOT, "public", ".htaccess"), path.join(OUT_DIR, ".htaccess"), { force: true });
  await cp(path.join(ROOT, "public", "api"), path.join(OUT_DIR, "api"), { recursive: true, force: true });

  // Package out/* (including .htaccess) into cpanel-public_html.zip
  await rm(ZIP_FILE, { force: true });
  if (process.platform === "win32") {
    const ps = spawnSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-Command",
        `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${OUT_DIR.replace(/'/g, "''")}', '${ZIP_FILE.replace(/'/g, "''")}')`,
      ],
      { stdio: "inherit" },
    );
    if (ps.status === 0) {
      console.log(`\nCreated cPanel upload archive: ${ZIP_FILE}`);
    }
  } else {
    spawnSync("zip", ["-r", "-q", ZIP_FILE, "."], { cwd: OUT_DIR, stdio: "inherit" });
    console.log(`\nCreated cPanel upload archive: ${ZIP_FILE}`);
  }

  console.log(`
========================================================================
cPanel Static Export Ready!
  Folder : out/
  Archive: cpanel-public_html.zip

To deploy on cPanel (public_html):
  1. Open cPanel -> File Manager -> public_html
  2. Upload "cpanel-public_html.zip"
  3. Right-click "cpanel-public_html.zip" -> Extract (into /public_html)
  4. Delete "cpanel-public_html.zip" from public_html when done.
========================================================================
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
