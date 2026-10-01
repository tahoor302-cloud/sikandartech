import type { Product, ProductImage, ProductVariant } from "./types";
import { categoryNames } from "./taxonomy";

export function primaryImage(p: Product, color?: string): ProductImage | undefined {
  return (
    p.images.find((i) => i.kind === "primary" && (!color || i.color === color)) ??
    p.images.find((i) => i.kind === "primary") ??
    p.images[0]
  );
}

export function secondaryImage(p: Product): ProductImage | undefined {
  return p.images.find((i) => i.kind === "angle") ?? p.images.find((i) => i.kind !== "primary");
}

/** Gallery for a colour: that colour's primary, then all shared images. */
export function galleryFor(p: Product, color?: string): ProductImage[] {
  const primary = primaryImage(p, color);
  const shared = p.images.filter((i) => i.kind !== "primary" && (!i.color || i.color === color));
  return [primary, ...shared].filter(Boolean) as ProductImage[];
}

export function findVariant(p: Product, color?: string, size?: string): ProductVariant | undefined {
  return p.variants.find((v) => (!color || v.color === color) && (!size || v.size === size));
}

export function isSizeAvailable(p: Product, color: string | undefined, size: string) {
  return p.variants.some((v) => v.size === size && (!color || v.color === color) && v.available);
}

/** Display names for category ids (from data/taxonomy.json). */
export const categoryLabel: Record<string, string> = categoryNames;

/** Canonical product URL — always the permanent ID. */
export const productHref = (p: Pick<Product, "id">) => `/product/${p.id}`;
