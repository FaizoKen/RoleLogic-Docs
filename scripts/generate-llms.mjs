import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(scriptDir, "..");
const docsDir = join(projectDir, "docs");
const staticDir = join(projectDir, "static");
const docsOrigin = "https://rolelogic.faizo.net/docs";

const preferredOrder = [
  "intro.md",
  "quick-start.md",
  "concepts/rules.md",
  "concepts/conditions.md",
  "concepts/actions.md",
  "concepts/role-hierarchy.md",
  "features/rule-builder.md",
  "features/testing-sandbox.md",
  "features/webhooks-logging.md",
  "features/cross-guild.md",
  "features/activity-log.md",
  "guides/discord-verification-role-automation.md",
  "guides/discord-booster-role-rewards.md",
  "guides/troubleshoot-discord-role-bot.md",
  "guides/common-scenarios.md",
  "guides/best-practices.md",
  "plans.md",
  "faq.md",
  "support.md",
  "glossary.md",
  "reference/conditions-reference.md",
  "reference/placeholders-reference.md",
  "reference/limits-reference.md",
  "reference/role-link-api.md",
];

async function findMarkdownFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }
  return files;
}

function normalizePath(path) {
  return path.split(sep).join("/");
}

function stripFrontMatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function stripSiteComponents(markdown) {
  return markdown
    .replace(/^import .*from ['"]@site\/src\/components\/Seo\/.*;\r?\n/gm, "")
    .replace(/<StructuredData[\s\S]*?\}\} \/>\r?\n?/g, "")
    .replace(/^<\/?ProductCta[^>]*>\r?\n?/gm, "")
    .replace(/^<ProductCta[^>]*\/>\r?\n?/gm, "");
}

function routeFor(relativePath) {
  if (relativePath === "intro.md") return "/";
  return `/${relativePath.replace(/\.md$/, "")}`;
}

function absoluteLink(target, currentRoute) {
  if (/^(?:https?:|mailto:|tel:|#)/i.test(target)) return target;
  if (target.startsWith("/")) return `${docsOrigin}${target}`;
  return new URL(target, `${docsOrigin}${currentRoute}`).toString();
}

function absolutizeMarkdownLinks(markdown, currentRoute) {
  return markdown.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (_, target, title = "") => {
    return `](${absoluteLink(target, currentRoute)}${title})`;
  });
}

const allFiles = await findMarkdownFiles(docsDir);
const byRelativePath = new Map(
  allFiles
    .filter((path) => !normalizePath(relative(docsDir, path)).startsWith("release-notes/"))
    .map((path) => [normalizePath(relative(docsDir, path)), path]),
);

const unknownFiles = [...byRelativePath.keys()]
  .filter((path) => !preferredOrder.includes(path))
  .sort();
const orderedPaths = [...preferredOrder, ...unknownFiles].filter((path) =>
  byRelativePath.has(path),
);

const sections = [];
for (const relativePath of orderedPaths) {
  const currentRoute = routeFor(relativePath);
  const sourceUrl = `${docsOrigin}${currentRoute}`;
  const source = await readFile(byRelativePath.get(relativePath), "utf8");
  const content = absolutizeMarkdownLinks(
    stripSiteComponents(stripFrontMatter(source)).trim(),
    currentRoute,
  );
  sections.push(`Source: ${sourceUrl}\n\n${content}`);
}

const fullText = `# RoleLogic — Complete Current Documentation

> This file is generated from RoleLogic's canonical current documentation. Historical release notes are intentionally excluded so old limits and behavior are not mistaken for the current product.

Product: https://rolelogic.faizo.net/

Documentation index: https://rolelogic.faizo.net/docs/

Release history: https://rolelogic.faizo.net/docs/release-notes

---

${sections.join("\n\n---\n\n")}
`;

const summary = await readFile(join(staticDir, "llms.txt"), "utf8");
await Promise.all([
  writeFile(join(staticDir, "llms-full.txt"), fullText, "utf8"),
  writeFile(join(staticDir, ".well-known", "llms.txt"), summary, "utf8"),
]);

console.log(
  `generate-llms: wrote ${orderedPaths.length} current documentation pages`,
);
