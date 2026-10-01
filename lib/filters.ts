import type { Availability, Facets, Product, ProductPage, ProductQuery, SortKey } from "./types";
import { categoryOrder, nameOfCategory, nameOfCollection, nameOfSubcategory } from "./taxonomy";

/** Pure, framework-free filtering — shared by the local source, API routes and client UI. */
const hayCache = new WeakMap<Product, string>();
function haystack(p: Product) {
  let h = hayCache.get(p);
  if (!h) {
    h = [p.id, p.sourceId, p.name, p.brand, p.category, p.subcategory, p.productType, p.collection, p.shortDescription, p.materials, ...p.tags, ...p.colors.map((c) => c.name), ...p.variants.map((v) => v.sku)]
      .join(" ")
      .toLowerCase();
    hayCache.set(p, h);
  }
  return h;
}

export function matchesSearch(p: Product, q: string) {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const hay = haystack(p);
  return terms.every((t) => hay.includes(t));
}

export function searchScore(p: Product, q: string) {
  const s = q.toLowerCase().trim();
  if (!s) return 0;
  if (p.id.toLowerCase() === s || p.sourceId.toLowerCase() === s) return 5;
  const name = p.name.toLowerCase();
  if (name.startsWith(s)) return 3;
  if (name.includes(s)) return 2;
  return matchesSearch(p, s) ? 1 : 0;
}

export function sortProducts(list: Product[], sort: SortKey = "featured") {
  const arr = [...list];
  const byId = (a: Product, b: Product) => a.id.localeCompare(b.id); // stable tiebreak → deterministic pagination
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.price - b.price || byId(a, b));
    case "price-desc": return arr.sort((a, b) => b.price - a.price || byId(a, b));
    case "name": return arr.sort((a, b) => a.name.localeCompare(b.name) || byId(a, b));
    case "newest": return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || byId(a, b));
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.trending) - Number(a.trending) || b.createdAt.localeCompare(a.createdAt) || byId(a, b));
  }
}

const asList = <T,>(v: T | T[] | undefined) => (v == null ? null : Array.isArray(v) ? (v.length ? v : null) : [v]);

export function filterProducts(all: Product[], q: ProductQuery = {}) {
  const cats = asList(q.category);
  const subs = asList(q.subcategory);
  const cols = asList(q.collection);
  const ids = q.ids ? new Set(q.ids) : null;
  return all.filter((p) => {
    if (cats && !cats.includes(p.category)) return false;
    if (subs && !subs.includes(p.subcategory)) return false;
    if (cols && !cols.includes(p.collection)) return false;
    if (q.featured && !p.featured) return false;
    if (q.newArrival && !p.newArrival) return false;
    if (q.trending && !p.trending) return false;
    if (q.availability?.length && !q.availability.includes(p.availability)) return false;
    if (q.colors?.length && !p.colors.some((c) => q.colors!.includes(c.id))) return false;
    if (q.sizes?.length && !p.variants.some((v) => v.available && v.size && q.sizes!.includes(v.size))) return false;
    if (q.minPrice != null && p.price < q.minPrice) return false;
    if (q.maxPrice != null && p.price > q.maxPrice) return false;
    if (q.exclude?.includes(p.id)) return false;
    if (ids && !ids.has(p.id)) return false;
    if (q.search && !matchesSearch(p, q.search)) return false;
    return true;
  });
}

export function applyQuery(all: Product[], q: ProductQuery = {}) {
  let list = filterProducts(all, q);
  list = q.search && !q.sort
    ? list.sort((a, b) => searchScore(b, q.search!) - searchScore(a, q.search!) || a.id.localeCompare(b.id))
    : sortProducts(list, q.sort);
  return q.limit ? list.slice(0, q.limit) : list;
}

export const PAGE_SIZE = 24;

/**
 * Paginated query. `scope` is the fixed context of the page (e.g. the category of
 * /category/shoes); facets are computed within that scope so filters only offer
 * values that exist in the data.
 */
export function queryPage(all: Product[], q: ProductQuery = {}, scope: ProductQuery = {}): ProductPage {
  const list = applyQuery(all, { ...q, limit: undefined });
  const pageSize = Math.max(1, Math.min(96, q.pageSize ?? PAGE_SIZE));
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
  const page = Math.min(Math.max(1, Math.floor(q.page ?? 1)), pageCount);
  return {
    items: list.slice((page - 1) * pageSize, page * pageSize),
    total: list.length,
    page,
    pageSize,
    pageCount,
    facets: facetsOf(filterProducts(all, scope)),
  };
}

const AVAILABILITY: { id: Availability; name: string }[] = [
  { id: "in-stock", name: "In stock" },
  { id: "low-stock", name: "Low stock" },
  { id: "sold-out", name: "Sold out" },
];

/** Facets available in a product set — drives the filter UI. Derived only from data. */
export function facetsOf(list: Product[]): Facets {
  const count = <K extends string>(m: Map<K, number>, k: K) => m.set(k, (m.get(k) ?? 0) + 1);
  const cats = new Map<string, number>(), cols = new Map<string, number>(), avail = new Map<Availability, number>(), sizes = new Map<string, number>();
  const subs = new Map<string, { category: string; count: number }>();
  const colors = new Map<string, { id: string; name: string; hex: string; count: number }>();
  let min = Infinity, max = 0;
  for (const p of list) {
    count(cats, p.category);
    count(cols, p.collection);
    count(avail, p.availability);
    if (p.subcategory) subs.set(p.subcategory, { category: p.category, count: (subs.get(p.subcategory)?.count ?? 0) + 1 });
    p.colors.forEach((c) => colors.set(c.id, { ...c, count: (colors.get(c.id)?.count ?? 0) + 1 }));
    p.sizes.forEach((s) => count(sizes, s));
    min = Math.min(min, p.price);
    max = Math.max(max, p.price);
  }
  const sizeOrder = (s: string) => (isNaN(parseFloat(s)) ? 1e6 + s.charCodeAt(0) : parseFloat(s));
  const catIndex = (id: string) => { const i = categoryOrder.indexOf(id); return i < 0 ? 999 : i; };
  return {
    categories: [...cats].map(([id, n]) => ({ id, name: nameOfCategory(id), count: n })).sort((a, b) => catIndex(a.id) - catIndex(b.id)),
    subcategories: [...subs].map(([id, v]) => ({ id, name: nameOfSubcategory(id), category: v.category, count: v.count })).sort((a, b) => catIndex(a.category) - catIndex(b.category) || b.count - a.count),
    collections: [...cols].map(([id, n]) => ({ id, name: nameOfCollection(id), count: n })).sort((a, b) => b.count - a.count),
    colors: [...colors.values()].sort((a, b) => b.count - a.count),
    sizes: [...sizes.keys()].sort((a, b) => sizeOrder(a) - sizeOrder(b)),
    availability: AVAILABILITY.filter((a) => avail.has(a.id)).map((a) => ({ ...a, count: avail.get(a.id)! })),
    price: { min: isFinite(min) ? min : 0, max },
  };
}

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price — Low to High" },
  { value: "price-desc", label: "Price — High to Low" },
  { value: "name", label: "Name — A to Z" },
];

/** Parses URL search params into a ProductQuery (shared by pages and /api/products). */
export function queryFromParams(get: (k: string) => string | null | undefined): ProductQuery {
  const list = (k: string) => get(k)?.split(",").map((s) => s.trim()).filter(Boolean) || undefined;
  const num = (k: string) => { const v = get(k); return v != null && v !== "" && !isNaN(Number(v)) ? Number(v) : undefined; };
  const sort = get("sort");
  return {
    category: list("category"),
    subcategory: list("sub"),
    collection: list("collection"),
    availability: list("availability") as Availability[] | undefined,
    colors: list("color"),
    sizes: list("size"),
    minPrice: num("min"),
    maxPrice: num("max"),
    featured: get("featured") === "1" || undefined,
    newArrival: get("new") === "1" || undefined,
    trending: get("trending") === "1" || undefined,
    search: get("q") || undefined,
    sort: sort && SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : undefined,
    page: num("page"),
    pageSize: num("per"),
    ids: list("ids"),
    limit: num("limit"),
  };
}
