import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import collectionsJson from "@/data/collections.json";
import { applyQuery, queryPage } from "../filters";
import type { Category, Collection, Product, ProductQuery } from "../types";
import type { CatalogSource } from "./source";

/** Catalog records are read-only at runtime: nothing in the UI can mutate one product into another. */
function deepFreeze<T>(o: T): T {
  if (o && typeof o === "object" && !Object.isFrozen(o)) {
    Object.freeze(o);
    for (const v of Object.values(o as Record<string, unknown>)) deepFreeze(v);
  }
  return o;
}

const products = deepFreeze(productsJson as unknown as Product[]);
const categories = deepFreeze(categoriesJson as unknown as Category[]);
const collections = deepFreeze(collectionsJson as unknown as Collection[]);

const index = new Map<string, Product>();
for (const p of products) {
  index.set(p.id.toLowerCase(), p);
  if (p.sourceId) index.set(`src:${p.sourceId.toLowerCase()}`, p);
}
const bySlug = new Map(products.map((p) => [p.slug, p]));

/** ID first (canonical), then source ID, then slug (legacy URLs). */
export function findProduct(key: string): Product | null {
  const k = decodeURIComponent(key).trim();
  return index.get(k.toLowerCase()) ?? index.get(`src:${k.toLowerCase()}`) ?? bySlug.get(k) ?? null;
}

/** Reads the JSON files in /data (built by scripts/build-catalog.mjs). */
export const localSource: CatalogSource = {
  async listProducts(query?: ProductQuery) {
    return applyQuery(products, query);
  },
  async queryPage(query?: ProductQuery, scope?: ProductQuery) {
    return queryPage(products, query, scope);
  },
  async getProduct(key) {
    return findProduct(key);
  },
  async countProducts() {
    return products.length;
  },
  async listCategories() {
    return categories;
  },
  async getCategory(slug) {
    return categories.find((c) => c.slug === slug) ?? null;
  },
  async listCollections() {
    return collections;
  },
  async getCollection(slug) {
    return collections.find((c) => c.slug === slug) ?? null;
  },
};

/** Synchronous access for client-only contexts (e.g. static preview). */
export const localData = { products, categories, collections };
