/**
 * SUPER MIMIC — commerce domain types.
 *
 * These types are the contract between the UI and any catalog backend.
 * The local JSON catalog, a headless CMS, Shopify, Medusa or a custom API
 * only need an adapter that returns these shapes (see lib/catalog).
 */

export type CurrencyCode = "PKR" | "USD" | "AED" | "GBP" | "EUR";

/** Category ids come from data/taxonomy.json (shoes, bags, watches, jewelry, clothing, accessories, fragrance, travel, other). */
export type CategoryId = string;

export type Availability = "in-stock" | "low-stock" | "sold-out";

export type ImageKind = "primary" | "angle" | "detail" | "editorial";

export interface ProductImage {
  src: string;
  alt: string;
  kind: ImageKind;
  width: number;
  height: number;
  /** Colour id this image belongs to. Omit for images shared by every colour. */
  color?: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  color?: string;
  size?: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  stock?: number;
}

export interface Product {
  /** Permanent storefront ID, e.g. "SM-000001". Never reused (data/id-registry.json). */
  id: string;
  /** Identifier of the record in the authorised source feed. */
  sourceId: string;
  /** Name of the source feed (data/source/<source>.json). */
  source: string;
  slug: string;
  name: string;
  /** House line shown above the product name, e.g. "Super Mimic Originals". */
  brand: string;
  category: CategoryId;
  subcategory: string;
  /** Free-text product type from the source, e.g. "Running sneaker". */
  productType: string;
  collection: string;
  tags: string[];
  price: number;
  compareAtPrice?: number;
  currency: CurrencyCode;
  images: ProductImage[];
  shortDescription: string;
  description: string;
  colors: ProductColor[];
  sizes: string[];
  /** e.g. "EU", "Case", "One size" */
  sizeLabel?: string;
  variants: ProductVariant[];
  availability: Availability;
  specifications: Record<string, string>;
  details: string[];
  materials: string;
  care: string[];
  featured: boolean;
  newArrival: boolean;
  trending: boolean;
  createdAt: string;
  /** True for demo/sample entries that must be replaced with authorised catalog data. */
  sample?: boolean;
}

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Wide header image for the category landing page. */
  banner?: string;
  /** Number of products in the built catalog. */
  count: number;
  /** Only subcategories that contain products. */
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  count: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Optional rule — collections can be tag-, flag- or list-based. */
  rule:
    | { type: "collection"; value: string }
    | { type: "flag"; value: "featured" | "newArrival" }
    | { type: "all" };
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name";

export interface ProductQuery {
  category?: CategoryId | CategoryId[];
  subcategory?: string | string[];
  collection?: string | string[];
  availability?: Availability[];
  trending?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  colors?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortKey;
  limit?: number;
  exclude?: string[];
  ids?: string[];
  /** 1-based page for queryPage(). */
  page?: number;
  pageSize?: number;
}

export interface Facets {
  categories: { id: string; name: string; count: number }[];
  subcategories: { id: string; name: string; category: string; count: number }[];
  collections: { id: string; name: string; count: number }[];
  colors: { id: string; name: string; hex: string; count: number }[];
  sizes: string[];
  availability: { id: Availability; name: string; count: number }[];
  price: { min: number; max: number };
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  facets: Facets;
}

export interface CartLine {
  /** Variant id — unique per product + colour + size. */
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  color?: string;
  colorName?: string;
  size?: string;
  price: number;
  currency: CurrencyCode;
  quantity: number;
}
