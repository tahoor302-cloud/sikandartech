import type { Category, Collection, Product, ProductPage, ProductQuery } from "../types";
import type { CatalogSource } from "./source";

/**
 * Example remote adapter. Point CATALOG_API_URL at any backend that returns the
 * shapes in lib/types.ts (or map the response in `normalize` below).
 */
const BASE = process.env.CATALOG_API_URL ?? "";

async function get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const url = new URL(path, BASE);
  Object.entries(params ?? {}).forEach(([k, v]) => {
    if (v == null) return;
    url.searchParams.set(k, Array.isArray(v) ? v.join(",") : String(v));
  });
  const res = await fetch(url, { next: { revalidate: 300, tags: ["catalog"] } } as RequestInit);
  if (!res.ok) throw new Error(`Catalog API ${res.status} on ${url.pathname}`);
  return res.json() as Promise<T>;
}

const normalize = (p: Product): Product => p; // map backend fields here

export const apiSource: CatalogSource = {
  async listProducts(query?: ProductQuery) {
    return (await get<Product[]>("/products", query as Record<string, unknown>)).map(normalize);
  },
  async queryPage(query?: ProductQuery, scope?: ProductQuery) {
    const page = await get<ProductPage>("/products/page", { ...query, scope: scope ? JSON.stringify(scope) : undefined } as Record<string, unknown>);
    return { ...page, items: page.items.map(normalize) };
  },
  async getProduct(key) {
    try { return normalize(await get<Product>(`/products/${encodeURIComponent(key)}`)); } catch { return null; }
  },
  async countProducts() {
    return (await get<{ total: number }>("/products/count")).total;
  },
  listCategories: () => get<Category[]>("/categories"),
  async getCategory(slug) {
    return (await get<Category[]>("/categories")).find((c) => c.slug === slug) ?? null;
  },
  listCollections: () => get<Collection[]>("/collections"),
  async getCollection(slug) {
    return (await get<Collection[]>("/collections")).find((c) => c.slug === slug) ?? null;
  },
};
