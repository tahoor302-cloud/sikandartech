"use client";
import type { Product } from "../types";
import type { SearchItem } from "./index";

/**
 * Browser-side catalog access via the app's API routes (app/api/*).
 * Keeps the full catalog out of the client bundle — only what's needed is fetched.
 */
const cache = new Map<string, Promise<unknown>>();
function getJSON<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).catch((e) => { cache.delete(url); throw e; }));
  }
  return cache.get(url) as Promise<T>;
}

export const clientCatalog = {
  getProduct: (key: string) => getJSON<Product | null>(`/api/products/${encodeURIComponent(key)}`).catch(() => null),
  getProducts: (ids: string[]) => (ids.length ? getJSON<Product[]>(`/api/products?ids=${ids.map(encodeURIComponent).join(",")}`) : Promise.resolve([])),
  search: (q: string, limit = 8) => getJSON<SearchItem[]>(`/api/search?q=${encodeURIComponent(q)}&limit=${limit}`),
};
