/**
 * Scale test — 5,000 synthetic records built IN MEMORY ONLY (never written to data/,
 * never shipped). Proves pagination, filters and ID search stay exact at size.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, formatId } from "../scripts/lib/catalog-pipeline.mjs";
import { queryPage, applyQuery, facetsOf } from "../lib/filters";
import type { Product, SortKey } from "../lib/types";

const CATS: [string, string[]][] = [["shoes", ["sneakers", "boots", "loafers"]], ["bags", ["totes", "crossbody"]], ["watches", ["automatic", "quartz"]], ["accessories", ["wallets", "belts"]]];
const N = 5000;
const synthetic: Product[] = Array.from({ length: N }, (_, i) => {
  const [category, subs] = CATS[i % CATS.length];
  const slug = `synthetic-${i + 1}`;
  return normalize(
    {
      sourceId: `SYN-${i + 1}`, slug, title: `Synthetic ${i + 1}`, category, subcategory: subs[i % subs.length], collection: ["originals", "street"][i % 2],
      price: 1000 + ((i * 7919) % 90000), currency: "PKR", description: `Record ${i + 1}`, createdAt: new Date(Date.UTC(2026, 0, 1) + i * 3600e3).toISOString(),
      sizes: ["S", "M"], colors: [i % 2 ? { id: "noir", name: "Noir", hex: "#111111" } : { id: "ivory", name: "Ivory", hex: "#EEEEEE" }],
      variants: [{ sku: `SYN${i}-S`, size: "S", stock: i % 5 }, { sku: `SYN${i}-M`, size: "M", stock: 0 }],
      images: [{ src: `/media/products/${slug}/01.webp`, kind: "primary" }], featured: i % 50 === 0, trending: i % 97 === 0,
    },
    { id: formatId(i + 1), source: "synthetic" },
  ) as Product;
});

for (const sort of ["featured", "newest", "price-asc", "price-desc", "name"] as SortKey[]) {
  test(`pagination (${sort}) returns every product exactly once`, () => {
    const seen = new Set<string>();
    const first = queryPage(synthetic, { sort, page: 1, pageSize: 48 });
    assert.equal(first.total, N);
    for (let p = 1; p <= first.pageCount; p++) {
      const page = queryPage(synthetic, { sort, page: p, pageSize: 48 });
      for (const item of page.items) { assert.ok(!seen.has(item.id), `${item.id} repeated`); seen.add(item.id); }
    }
    assert.equal(seen.size, N);
  });
}

test("filtered pagination is exact (category + subcategory + availability)", () => {
  const q = { category: "shoes", subcategory: "boots", availability: ["in-stock" as const, "low-stock" as const] };
  const expected = synthetic.filter((p) => p.category === "shoes" && p.subcategory === "boots" && p.availability !== "sold-out").map((p) => p.id).sort();
  const got: string[] = [];
  const first = queryPage(synthetic, { ...q, page: 1 });
  for (let p = 1; p <= first.pageCount; p++) got.push(...queryPage(synthetic, { ...q, page: p }).items.map((x) => x.id));
  assert.deepEqual(got.sort(), expected);
});

test("search by permanent ID or source ID ranks that exact product first", () => {
  for (const n of [1, 777, 4321, N]) {
    assert.equal(applyQuery(synthetic, { search: formatId(n) })[0].id, formatId(n));
    assert.equal(applyQuery(synthetic, { search: `SYN-${n}` })[0].id, formatId(n));
  }
});

test("facets are derived from data and add up", () => {
  const f = facetsOf(synthetic);
  assert.equal(f.categories.reduce((n, c) => n + c.count, 0), N);
  assert.deepEqual(f.categories.map((c) => c.id).sort(), CATS.map(([c]) => c).sort());
  assert.equal(f.availability.reduce((n, a) => n + a.count, 0), N);
});

test("out-of-range page clamps to the last page", () => {
  const r = queryPage(synthetic, { page: 99999, pageSize: 24 });
  assert.equal(r.page, r.pageCount);
  assert.ok(r.items.length > 0);
});
