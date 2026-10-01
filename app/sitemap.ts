import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog";
import { site } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections, categories] = await Promise.all([catalog.listProducts(), catalog.listCollections(), catalog.listCategories()]);
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), priority: 1 },
    { url: u("/about") },
    ...collections.map((c) => ({ url: u(`/collections/${c.slug}`), priority: 0.8 })),
    { url: u("/products"), priority: 0.9 },
    ...categories.flatMap((c) => [{ url: u(`/category/${c.slug}`), priority: 0.8 }, ...c.subcategories.map((s) => ({ url: u(`/category/${c.slug}/${s.slug}`), priority: 0.7 }))]),
    ...products.map((p) => ({ url: u(`/product/${p.id}`), lastModified: p.createdAt, priority: 0.7 })),
  ];
}
