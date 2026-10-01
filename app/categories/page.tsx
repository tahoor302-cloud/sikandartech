import type { Metadata } from "next";
import { IndexView } from "@/components/pages/index-view";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const categories = await catalog.listCategories();
  const items = categories.map((c) => ({ href: `/category/${c.slug}`, name: c.name, tagline: c.tagline, description: c.description, image: c.image, count: c.count }));
  return <IndexView eyebrow="Categories" title="Categories" items={items} />;
}
