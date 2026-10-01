import type { Category, Collection, Product, ProductPage, ProductQuery } from "../types";

/**
 * The single interface every catalog backend implements.
 * Swap implementations in lib/catalog/index.ts — UI code never changes.
 */
export interface CatalogSource {
  listProducts(query?: ProductQuery): Promise<Product[]>;
  /** Paginated query with facets computed inside `scope` (the fixed context of the page). */
  queryPage(query?: ProductQuery, scope?: ProductQuery): Promise<ProductPage>;
  /** Resolves a permanent ID (SM-000001), a slug or a source ID. */
  getProduct(key: string): Promise<Product | null>;
  countProducts(): Promise<number>;
  listCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  listCollections(): Promise<Collection[]>;
  getCollection(slug: string): Promise<Collection | null>;
}
