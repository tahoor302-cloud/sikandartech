/**
 * Catalog integrity + cross-contamination tests.
 *   npm test        (node --test via tsx so TypeScript modules can be imported)
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assignIds, buildCatalog, normalize, storefrontCategories, formatId } from "../scripts/lib/catalog-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
const taxonomy = readJson("data/taxonomy.json");
const registry = readJson("data/id-registry.json");
const products = readJson("data/products.json");
const categoriesJson = readJson("data/categories.json");
const hero = readJson("data/hero.json");
const sources = readdirSync(join(root, "data/source")).filter((f) => f.endsWith(".json")).sort().map((f) => {
  const j = readJson(`data/source/${f}`);
  return { source: j.source, file: `data/source/${f}`, authorised: j.authorised ?? null, records: j.records };
});
const fileExists = (src) => existsSync(join(root, "public", src));
const records = sources.flatMap((s) => s.records.map((r) => ({ ...r, __source: s.source })));
const bySource = new Map(products.map((p) => [`${p.source}:${p.sourceId}`, p]));

describe("build output is in sync with the source", () => {
  test("data/products.json equals a fresh build (no hand edits, no stale build)", () => {
    const fresh = buildCatalog({ sources, registry, taxonomy, fileExists });
    assert.deepEqual(fresh.products, products);
    assert.deepEqual(storefrontCategories(taxonomy, fresh.products), categoriesJson);
  });
  test("every source record is live — nothing missing", () => {
    assert.equal(products.length, records.length);
    for (const r of records) assert.ok(bySource.has(`${r.__source}:${r.sourceId}`), `missing ${r.sourceId}`);
  });
});

describe("per-product traceability (each field comes from its own record)", () => {
  for (const r of records) {
    test(`${r.sourceId} ${r.title}`, () => {
      const p = bySource.get(`${r.__source}:${r.sourceId}`);
      assert.equal(p.id, registry.entries[`${r.__source}:${r.sourceId}`]);
      assert.equal(p.name, r.title);
      assert.equal(p.price, r.price);
      assert.equal(p.currency, r.currency);
      assert.equal(p.description, r.description);
      assert.equal(p.shortDescription, r.shortDescription);
      assert.equal(p.category, r.category);
      assert.equal(p.subcategory, r.subcategory);
      assert.equal(p.productType, r.productType);
      assert.deepEqual(p.details, r.details);
      assert.deepEqual(p.specifications, r.specifications);
      assert.deepEqual(p.images.map((i) => i.src), r.images.map((i) => i.src));
      assert.deepEqual(p.images.map((i) => i.color ?? null), r.images.map((i) => i.color ?? null));
      assert.deepEqual(p.colors.map((c) => c.id), r.colors.map((c) => c.id));
      assert.deepEqual(p.sizes, r.sizes);
      assert.deepEqual(p.variants.map((v) => v.sku), r.variants.map((v) => v.sku));
      assert.deepEqual(p.variants.map((v) => v.price), r.variants.map((v) => v.price));
      assert.deepEqual(p.variants.map((v) => v.stock), r.variants.map((v) => v.stock));
    });
  }
});

describe("no cross-contamination", () => {
  test("every image lives in its own product folder and exists", () => {
    for (const p of products) for (const i of p.images) {
      assert.ok(i.src.startsWith(`/media/products/${p.slug}/`), `${p.id} uses foreign image ${i.src}`);
      assert.ok(fileExists(i.src), `${p.id} image missing on disk: ${i.src}`);
    }
  });
  test("no image is shared between products", () => {
    const seen = new Map();
    for (const p of products) for (const i of p.images) {
      assert.ok(!seen.has(i.src) || seen.get(i.src) === p.id, `${i.src} used by ${seen.get(i.src)} and ${p.id}`);
      seen.set(i.src, p.id);
    }
  });
  test("each colour has its own primary image and image colours belong to the product", () => {
    for (const p of products) {
      const ids = new Set(p.colors.map((c) => c.id));
      for (const i of p.images) if (i.color) assert.ok(ids.has(i.color), `${p.id} image colour ${i.color}`);
      for (const c of p.colors) assert.ok(p.images.some((i) => i.kind === "primary" && i.color === c.id), `${p.id} has no primary for ${c.id}`);
    }
  });
  test("variants are scoped to their product and use only its colours and sizes", () => {
    for (const p of products) {
      const colors = new Set(p.colors.map((c) => c.id)), sizes = new Set(p.sizes);
      for (const v of p.variants) {
        assert.ok(v.id.startsWith(`${p.id}-`), `${v.id} not scoped to ${p.id}`);
        if (v.color) assert.ok(colors.has(v.color), `${v.sku} colour`);
        if (v.size) assert.ok(sizes.has(v.size), `${v.sku} size`);
      }
    }
  });
  test("descriptions, SKUs and variant IDs are unique across the catalog", () => {
    const uniq = (list, what) => assert.equal(new Set(list).size, list.length, `duplicate ${what}`);
    uniq(products.map((p) => p.description), "description");
    uniq(products.flatMap((p) => p.variants.map((v) => v.sku)), "sku");
    uniq(products.flatMap((p) => p.variants.map((v) => v.id)), "variant id");
  });
  test("IDs, source IDs and slugs are unique; categories are valid", () => {
    const cats = new Map(taxonomy.categories.map((c) => [c.id, new Set(c.subcategories.map((s) => s.id))]));
    assert.equal(new Set(products.map((p) => p.id)).size, products.length);
    assert.equal(new Set(products.map((p) => `${p.source}:${p.sourceId}`)).size, products.length);
    assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
    for (const p of products) {
      assert.match(p.id, /^SM-\d{6}$/);
      assert.ok(cats.has(p.category), `${p.id} category ${p.category}`);
      assert.ok(cats.get(p.category).has(p.subcategory), `${p.id} subcategory ${p.subcategory}`);
    }
  });
  test("storefront shows only categories that contain products", () => {
    for (const c of categoriesJson) {
      assert.ok(c.count > 0);
      assert.equal(c.count, products.filter((p) => p.category === c.id).length);
      for (const s of c.subcategories) assert.equal(s.count, products.filter((p) => p.category === c.id && p.subcategory === s.id).length);
    }
  });
  test("hero scenes link to the product they show", () => {
    const ids = new Map(products.map((p) => [p.id, p]));
    assert.ok(new Set(hero.map((h) => h.category)).size >= 4, "hero spans at least four categories");
    for (const h of hero) {
      const p = ids.get(h.id);
      assert.ok(p, `hero ${h.id} not live`);
      assert.equal(h.href, `/product/${p.id}`);
      assert.ok(h.caption.startsWith(p.name));
      assert.equal(h.category, p.category);
      assert.ok(fileExists(h.src));
    }
  });
});

describe("permanent IDs", () => {
  const src = [{ source: "t", records: [{ sourceId: "A" }, { sourceId: "B" }, { sourceId: "C" }] }];
  test("existing records keep their IDs when the feed is reordered", () => {
    const r1 = assignIds(null, src);
    const r2 = assignIds(r1, [{ source: "t", records: [...src[0].records].reverse() }]);
    assert.deepEqual(r2.entries, r1.entries);
  });
  test("new records get the next number; removed IDs are never reused", () => {
    const r1 = assignIds(null, src);
    const r2 = assignIds(r1, [{ source: "t", records: [{ sourceId: "A" }, { sourceId: "D" }] }]);
    assert.equal(r2.entries["t:D"], formatId(4));
    assert.equal(r2.entries["t:B"], formatId(2));
    assert.equal(r2.next, 5);
  });
  test("the same sourceId in two feeds gets two IDs", () => {
    const r = assignIds(null, [{ source: "a", records: [{ sourceId: "X" }] }, { source: "b", records: [{ sourceId: "X" }] }]);
    assert.notEqual(r.entries["a:X"], r.entries["b:X"]);
  });
  test("the committed registry covers every live product", () => {
    for (const p of products) assert.equal(registry.entries[`${p.source}:${p.sourceId}`], p.id);
  });
});

describe("isolation of the normalizer", () => {
  const deepFreeze = (o) => { if (o && typeof o === "object") { Object.freeze(o); Object.values(o).forEach(deepFreeze); } return o; };
  test("normalize never mutates its input and returns no shared references", () => {
    const rec = deepFreeze(structuredClone(records[0]));
    const out = normalize(rec, { id: "SM-999999", source: "t" });
    out.images[0].src = "changed"; out.colors[0].name = "changed"; out.details.push("x"); out.specifications.X = "y";
    assert.notEqual(rec.images[0].src, "changed");
    assert.notEqual(rec.colors[0].name, "changed");
    assert.ok(!rec.details.includes("x"));
    assert.equal(rec.specifications.X, undefined);
  });
  test("normalizing two records never mixes their data", () => {
    const [a, b] = [records[0], records[records.length - 1]];
    const pa = normalize(a, { id: "SM-1", source: "t" }), pb = normalize(b, { id: "SM-2", source: "t" });
    assert.equal(pa.name, a.title); assert.equal(pb.name, b.title);
    assert.ok(pa.images.every((i) => !pb.images.some((j) => j.src === i.src)));
  });
});

describe("validator rejects bad records instead of guessing", () => {
  const base = records[0];
  const other = records[1];
  const run = (mut) => {
    const r = structuredClone(base); mut(r);
    return buildCatalog({ sources: [{ source: "t", records: [r] }], registry: null, taxonomy, fileExists });
  };
  const codes = (b) => b.report.issues.map((i) => i.code);
  test("missing price", () => { const b = run((r) => delete r.price); assert.equal(b.products.length, 0); assert.ok(codes(b).includes("missing-price")); });
  test("missing description", () => { const b = run((r) => { r.description = ""; r.shortDescription = ""; }); assert.ok(codes(b).includes("missing-description")); assert.equal(b.report.totals.noDescription, 1); });
  test("no images", () => { const b = run((r) => (r.images = [])); assert.ok(codes(b).includes("missing-image")); assert.equal(b.report.totals.noImage, 1); });
  test("another product's image", () => { const b = run((r) => r.images.push(structuredClone(other.images[0]))); assert.ok(codes(b).includes("foreign-image")); assert.equal(b.products.length, 0); });
  test("image file that does not exist", () => { const b = run((r) => (r.images[0].src = `/media/products/${r.slug}/nope.webp`)); assert.ok(codes(b).includes("image-not-found")); });
  test("variant colour not offered", () => { const b = run((r) => (r.variants[0].color = "chartreuse")); assert.ok(codes(b).includes("variant-color")); });
  test("variant size not offered", () => { const b = run((r) => (r.variants[0].size = "99")); assert.ok(codes(b).includes("variant-size")); });
  test("unknown category / subcategory", () => {
    assert.ok(codes(run((r) => (r.category = "spaceships"))).includes("invalid-category"));
    assert.ok(codes(run((r) => (r.subcategory = "hovercraft"))).includes("invalid-subcategory"));
  });
  test("missing sourceId", () => { const b = run((r) => delete r.sourceId); assert.ok(codes(b).includes("missing-source-id")); assert.equal(b.products.length, 0); });
  test("duplicate sourceId in one feed", () => {
    const r2 = structuredClone(other); r2.sourceId = base.sourceId;
    const b = buildCatalog({ sources: [{ source: "t", records: [structuredClone(base), r2] }], registry: null, taxonomy, fileExists });
    assert.ok(b.report.totals.duplicates >= 1);
    assert.ok(b.products.length < 2);
  });
});

test("validator flags duplicate SKUs (regression: Lumen Tank shared SKUs across sizes)", () => {
  const r = structuredClone(records.find((x) => x.variants.length > 1));
  r.variants[1].sku = r.variants[0].sku;
  const b = buildCatalog({ sources: [{ source: "t", records: [r] }], registry: null, taxonomy, fileExists });
  assert.ok(b.report.issues.some((i) => i.code === "duplicate-sku"));
  assert.equal(b.products.length, 0);
});

test("audit reconciles every category and lists excluded sources", () => {
  const report = readJson("data/catalog-report.json");
  for (const [c, r] of Object.entries(report.reconciliation)) {
    assert.equal(r.source, records.filter((x) => x.category === c).length, `${c} source count`);
    assert.equal(r.imported, products.filter((p) => p.category === c).length, `${c} imported count`);
    assert.equal(r.missing, 0, `${c} has missing records`);
  }
  assert.ok(report.exclusions.every((x) => x.imported === 0));
});
