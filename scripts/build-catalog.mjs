#!/usr/bin/env node
/**
 * Builds the storefront catalog from every authorised source file.
 *
 *   data/source/*.json   { source, authorised, records: [...] }   ← input (one file per authorised feed)
 *   data/taxonomy.json   categories + subcategories                  ← input
 *   data/id-registry.json  sourceKey → SM-000001 (append-only)       ← updated
 *
 *   data/products.json         valid products only                   ← output
 *   data/categories.json       non-empty categories with counts      ← output
 *   data/catalog-report.json   audit report (/catalog-audit)         ← output
 *   data/hero.json             hero scenes from data/hero-plan.json  ← output
 *
 * Exit code 1 with --strict when any record fails validation.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog, storefrontCategories } from "./lib/catalog-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = (f) => join(root, "data", f);
const readJson = (f, fallback) => (existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : fallback);

const sourceDir = data("source");
const sources = readdirSync(sourceDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((file) => {
    const json = readJson(join(sourceDir, file));
    if (!json.source || !Array.isArray(json.records)) throw new Error(`${file}: expected { source, records: [] }`);
    return { source: json.source, file: `data/source/${file}`, authorised: json.authorised ?? null, records: json.records };
  });

/** Deterministic timestamp (newest source file mtime) so rebuilding unchanged data yields identical output. */
function latestSourceTime() {
  return new Date(Math.max(...readdirSync(sourceDir).filter((f) => f.endsWith(".json")).map((f) => statSync(join(sourceDir, f)).mtimeMs))).toISOString();
}
const taxonomy = readJson(data("taxonomy.json"));
const registry = readJson(data("id-registry.json"), { prefix: "SM", next: 1, entries: {} });
const fileExists = (src) => existsSync(join(root, "public", src));

const exclusions = readJson(data("source-exclusions.json"), { exclusions: [] }).exclusions;
const { registry: nextRegistry, products, report } = buildCatalog({ sources, registry, taxonomy, fileExists, exclusions, now: latestSourceTime() });

// --strict is a gate: never overwrite the committed catalog with a partial one (e.g. when media files are missing).
if (process.argv.includes("--strict") && report.totals.invalid > 0) {
  const t = report.totals;
  console.error(`Catalog check failed: ${t.invalid} invalid of ${t.sourceRecords} records (${t.errors} errors). Data files left unchanged.`);
  for (const issue of report.issues.filter((i) => i.severity === "error").slice(0, 20)) console.error(`  ${issue.id ?? issue.sourceId} ${issue.field}: ${issue.message}`);
  process.exit(1);
}

writeFileSync(data("id-registry.json"), JSON.stringify(nextRegistry, null, 2) + "\n");
writeFileSync(data("products.json"), JSON.stringify(products, null, 2) + "\n");
writeFileSync(data("categories.json"), JSON.stringify(storefrontCategories(taxonomy, products), null, 2) + "\n");
writeFileSync(data("catalog-report.json"), JSON.stringify(report, null, 2) + "\n");
writeFileSync(
  data("media-manifest.json"),
  JSON.stringify(products.map((p) => ({ id: p.id, sourceId: p.sourceId, name: p.name, price: p.price, currency: p.currency, images: p.images.map((i) => ({ kind: i.kind, color: i.color, src: i.src })) })), null, 2) + "\n",
);

// Hero rotation — captions and links are derived from the product each scene points at.
const plan = readJson(data("hero-plan.json"), { scenes: [] });
const bySource = new Map(products.map((p) => [p.sourceId, p]));
const hero = [];
for (const s of plan.scenes) {
  const p = bySource.get(s.sourceId);
  if (!p) { console.warn(`  hero: ${s.sourceId} is not a live product — scene skipped`); continue; }
  const src = s.image ?? `/media/hero/${p.slug}.webp`;
  if (!fileExists(src)) { console.warn(`  hero: ${src} missing (run scripts/media/hero-composites.py) — scene skipped`); continue; }
  const color = p.colors.find((c) => c.id === s.color);
  hero.push({ id: p.id, type: "image", src, caption: color && p.colors.length > 1 ? `${p.name} — ${color.name}` : p.name, category: p.category, href: `/product/${p.id}`, tone: s.tone ?? "dark" });
}
writeFileSync(data("hero.json"), JSON.stringify(hero, null, 2) + "\n");

const t = report.totals;
console.log(`Sources: ${report.sources.map((s) => `${s.source} (${s.records})`).join(", ")}`);
console.log(`Imported ${t.imported}/${t.sourceRecords} · invalid ${t.invalid} · duplicates ${t.duplicates} · errors ${t.errors} · warnings ${t.warnings}`);
for (const x of report.exclusions) console.log(`  excluded source: ${x.source} (${x.status}) — imported ${x.imported}`);
for (const [c, v] of Object.entries(report.byCategory)) console.log(`  ${c.padEnd(12)} ${String(v.total).padStart(4)}  ${Object.entries(v.subcategories).map(([s, n]) => `${s}:${n}`).join(" ")}`);
if (process.argv.includes("--strict") && t.invalid > 0) process.exit(1);
