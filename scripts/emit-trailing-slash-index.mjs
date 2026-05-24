// Post-build: duplicate every <name>.html as <name>/index.html so the
// trailing-slash variant of each page serves 200 instead of being
// 308-redirected by Cloudflare Pages. Both files carry the same canonical
// link tag, so Google indexes only the no-slash URL and stops reporting
// "Failed: Redirect error" against the slash variant in Search Console.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const buildDir = join(dirname(__filename), "..", "build");

// index.html is already the trailing-slash form; 404.html must keep its
// 404-ness (turning it into a folder would let Cloudflare serve it as a 200).
const SKIP_NAMES = new Set(["index.html", "404.html"]);

let created = 0;
let skipped = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    if (SKIP_NAMES.has(entry.name)) continue;

    const slug = entry.name.slice(0, -".html".length);
    const targetDir = join(dir, slug);
    const targetFile = join(targetDir, "index.html");

    if (existsSync(targetFile)) {
      skipped++;
      continue;
    }

    await mkdir(targetDir, { recursive: true });
    const content = await readFile(full);
    await writeFile(targetFile, content);
    created++;
  }
}

if (!existsSync(buildDir)) {
  console.error(`emit-trailing-slash-index: build directory not found: ${buildDir}`);
  process.exit(1);
}

await walk(buildDir);
console.log(
  `emit-trailing-slash-index: created ${created} index.html copies (${skipped} skipped)`
);
