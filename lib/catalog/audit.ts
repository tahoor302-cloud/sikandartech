import type { Product } from "../types";

export interface AuditIssue { id: string | null; sourceId: string | null; name: string | null; severity: "error" | "warning"; code: string; field: string; message: string }
export interface AuditReport {
  generatedAt: string;
  sources: { source: string; file: string; records: number; authorised: string | null }[];
  totals: Record<"sourceRecords" | "imported" | "invalid" | "missing" | "duplicates" | "noImage" | "noPrice" | "noDescription" | "noCategory" | "brokenImages" | "warnings" | "errors", number>;
  byCategory: Record<string, { total: number; subcategories: Record<string, number> }>;
  reconciliation: Record<string, { source: number; imported: number; invalid: number; missing: number }>;
  exclusions: { source: string; url: string; role: string; reviewed: string; status: string; reason: string; imported: number; unblock: string }[];
  duplicates: { field: string; value: string; ids: string[] }[];
  invalid: { id: string; sourceId: string; source: string; row: number; name: string }[];
  retiredIds: { key: string; id: string }[];
  issues: AuditIssue[];
}

export interface LedgerRow {
  id: string; sourceId: string; source: string; name: string; category: string; subcategory: string; productType: string;
  price: number; currency: string; images: number; primaryImages: number; variants: number; colors: number; availability: string; image: string;
}

export const ledgerOf = (products: readonly Product[]): LedgerRow[] =>
  products.map((p) => ({
    id: p.id, sourceId: p.sourceId, source: p.source, name: p.name, category: p.category, subcategory: p.subcategory, productType: p.productType,
    price: p.price, currency: p.currency, images: p.images.length, primaryImages: p.images.filter((i) => i.kind === "primary").length,
    variants: p.variants.length, colors: p.colors.length, availability: p.availability,
    image: p.images.find((i) => i.kind === "primary")?.src ?? "",
  }));

export function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n") + "\n";
}

/** The exact input a full authorised dataset must provide (mirrors data/import-template.csv). */
export const REQUIRED_INPUT: { field: string; required: boolean; note: string }[] = [
  { field: "source_id", required: true, note: "Stable identifier from your system (never reused). Drives the permanent SM-XXXXXX ID." },
  { field: "name", required: true, note: "Product title exactly as it should appear." },
  { field: "category", required: true, note: "One of: shoes, bags, watches, jewelry, clothing, accessories, fragrance, travel, other." },
  { field: "subcategory", required: false, note: "Must exist under its category in data/taxonomy.json (e.g. sneakers, totes, automatic)." },
  { field: "price", required: true, note: "Numeric selling price per product (and per variant if it differs)." },
  { field: "currency", required: true, note: "USD (store currency). PKR, AED, GBP or EUR are also accepted by the schema." },
  { field: "description / short_description", required: true, note: "At least one; written for this exact product." },
  { field: "image_primary (per colour)", required: true, note: "Path under /media/products/<handle>/ or an https URL you own or are licensed to use." },
  { field: "image_angle, image_detail, image_editorial", required: false, note: "Alternate angle (card hover), macro detail and lifestyle image." },
  { field: "color, color_hex, size, sku, stock", required: false, note: "One CSV row per variant. Variant colours and sizes must belong to that product." },
  { field: "product_type, collection, line, materials, details, care, spec:*", required: false, note: "Optional attributes; semicolon-separate list values." },
  { field: "featured, new_arrival, trending, created_at", required: false, note: "Merchandising flags and launch date (ISO 8601)." },
];
