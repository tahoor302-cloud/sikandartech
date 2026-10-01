#!/usr/bin/env node
/**
 * Converts an AUTHORISED catalog export into a source file under data/source/,
 * then run `npm run catalog:build` to publish it.
 *
 *   node scripts/import-catalog.mjs <export.csv|export.json> --source <name> --authorised "<who owns / licensed this data>"
 *
 * CSV: one row per variant (see data/import-template.csv). Rows sharing `source_id`
 *      (or `handle` when source_id is absent) merge into one product.
 * JSON: an array of records already in source shape (see data/source/super-mimic-master.json).
 *
 * The importer never invents data: empty cells stay empty and the build's validator
 * reports them on /catalog-audit instead of filling them in.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "./lib/catalog-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--source" && args[args.indexOf(a) - 1] !== "--authorised");
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const source = slugify(opt("--source") || "");
const authorised = opt("--authorised");
if (!file || !source || !authorised) {
  console.error('Usage: node scripts/import-catalog.mjs <export.csv|export.json> --source <name> --authorised "<data owner / licence>"');
  process.exit(1);
}

export function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; continue; }
    if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

const bool = (v) => /^(1|true|yes|y)$/i.test(v ?? "");
const list = (v) => (v ?? "").split(";").map((s) => s.trim()).filter(Boolean);
const num = (v) => (v === undefined || v === "" ? undefined : Number(v));

function fromCSV(rows) {
  const groups = new Map();
  for (const r of rows) {
    const key = r.source_id || r.handle;
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }
  return [...groups.entries()].map(([key, rs]) => {
    const f = rs[0];
    const colors = [];
    for (const r of rs) if (r.color && !colors.some((c) => c.name === r.color)) colors.push({ id: slugify(r.color), name: r.color, hex: r.color_hex || "" });
    const images = [];
    for (const r of rs) if (r.image_primary && !images.some((i) => i.src === r.image_primary)) images.push({ src: r.image_primary, kind: "primary", ...(r.color ? { color: slugify(r.color) } : {}), alt: `${f.name}${r.color ? ` in ${r.color}` : ""}` });
    for (const [col, kind] of [["image_angle", "angle"], ["image_detail", "detail"], ["image_editorial", "editorial"]]) if (f[col]) images.push({ src: f[col], kind, alt: `${f.name} — ${kind}` });
    const specifications = Object.fromEntries(Object.entries(f).filter(([k, v]) => k.startsWith("spec:") && v).map(([k, v]) => [k.slice(5), v]));
    return {
      sourceId: f.source_id || key,
      slug: f.handle || slugify(f.name),
      title: f.name,
      line: f.line || f.brand_line || "",
      category: f.category,
      subcategory: f.subcategory || "",
      productType: f.product_type || "",
      collection: f.collection || "",
      price: num(f.price),
      ...(f.compare_at_price ? { compareAtPrice: num(f.compare_at_price) } : {}),
      currency: f.currency || "",
      shortDescription: f.short_description || "",
      description: f.description || "",
      details: list(f.details),
      materials: f.materials || "",
      care: list(f.care),
      specifications,
      sizeLabel: f.size_label || "",
      sizes: [...new Set(rs.map((r) => r.size).filter(Boolean))],
      colors,
      variants: rs.map((r) => ({ sku: r.sku || "", color: r.color ? slugify(r.color) : undefined, size: r.size || undefined, price: num(r.price) ?? num(f.price), ...(r.stock !== "" && r.stock !== undefined ? { stock: Number(r.stock) } : {}) })),
      images,
      featured: bool(f.featured),
      newArrival: bool(f.new_arrival),
      trending: bool(f.trending),
      createdAt: f.created_at || "",
    };
  });
}

const records = extname(file) === ".json" ? JSON.parse(readFileSync(file, "utf8")) : fromCSV(parseCSV(readFileSync(file, "utf8")));
if (!Array.isArray(records)) { console.error("Expected an array of records."); process.exit(1); }

const out = join(root, "data", "source", `${source}.json`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ source, authorised, importedAt: new Date().toISOString(), records }, null, 2) + "\n");
console.log(`✓ ${records.length} source records → data/source/${source}.json`);
console.log("  Next: npm run catalog:build   (assigns SM IDs, validates, writes data/products.json + audit report)");
