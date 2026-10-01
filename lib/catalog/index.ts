import { apiSource } from "./api";
import { localSource } from "./local";
import type { CatalogSource } from "./source";
import type { Collection, Product, ProductQuery } from "../types";

export type { CatalogSource } from "./source";

/** Choose the catalog backend with CATALOG_SOURCE=local|api. */
export const catalog: CatalogSource = process.env.CATALOG_SOURCE === "api" ? apiSource : localSource;

/** Resolves a collection's rule into a product query. */
export function queryForCollection(c: Collection): ProductQuery {
  switch (c.rule.type) {
    case "collection": return { collection: c.rule.value };
    case "flag": return c.rule.value === "featured" ? { featured: true } : { newArrival: true, sort: "newest" };
    default: return {};
  }
}

/** Lightweight index shipped to the client for instant search. */
export type SearchItem = Pick<Product, "id" | "sourceId" | "slug" | "name" | "brand" | "category" | "subcategory" | "collection" | "price" | "currency" | "tags" | "shortDescription" | "materials" | "colors"> & { image: string };

export function toSearchItem(p: Product): SearchItem {
  const image = p.images.find((i) => i.kind === "primary")?.src ?? p.images[0]?.src ?? "";
  const { id, sourceId, slug, name, brand, category, subcategory, collection, price, currency, tags, shortDescription, materials, colors } = p;
  return { id, sourceId, slug, name, brand, category, subcategory, collection, price, currency, tags, shortDescription, materials, colors, image };
}
