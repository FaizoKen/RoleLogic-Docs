/**
 * Builds static/plugin/list.compact.json from static/plugin/list.json.
 *
 * list.json is the full source-of-truth (catalog + SEO copy). The compact
 * file strips fields the runtime marketplace modal never reads, so the
 * dashboard fetches a payload ~5–10x smaller on every page load.
 *
 * Runs as part of `bun run build` (see package.json prebuild hook). Also
 * runnable on its own via `bun run scripts/build-compact-list.ts`.
 *
 * Keep this script in sync with `PluginListEntry` in
 * web/src/lib/model/Model.ts — if a runtime consumer starts reading a new
 * field, add it to KEEP_FIELDS below.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = join(__dirname, "..", "static", "plugin");
const SOURCE = join(PLUGIN_DIR, "list.json");
const OUTPUT = join(PLUGIN_DIR, "list.compact.json");

const KEEP_FIELDS = [
  "id",
  "name",
  "short_description",
  "author",
  "icon_url",
  "plugin_url",
  "category",
  "tags",
  "featured",
] as const;

interface PluginListJson {
  version: number;
  categories: string[];
  plugins: Record<string, unknown>[];
}

const raw = readFileSync(SOURCE, "utf-8");
const list = JSON.parse(raw) as PluginListJson;

const compact = {
  version: list.version,
  categories: list.categories,
  plugins: list.plugins.map((p) => {
    const out: Record<string, unknown> = {};
    for (const key of KEEP_FIELDS) {
      if (p[key] !== undefined) out[key] = p[key];
    }
    return out;
  }),
};

writeFileSync(OUTPUT, JSON.stringify(compact) + "\n", "utf-8");

const fullSize = Buffer.byteLength(raw, "utf-8");
const compactSize = Buffer.byteLength(JSON.stringify(compact), "utf-8");
const ratio = ((1 - compactSize / fullSize) * 100).toFixed(1);
console.log(
  `[compact] ${SOURCE.replace(PLUGIN_DIR, "static/plugin")} (${fullSize}B) → ${OUTPUT.replace(PLUGIN_DIR, "static/plugin")} (${compactSize}B, -${ratio}%)`,
);
