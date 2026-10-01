import type { Metadata } from "next";
import { IndexView } from "@/components/pages/index-view";
import { catalog, queryForCollection } from "@/lib/catalog";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsPage() {
  const collections = await catalog.listCollections();
  const items = await Promise.all(
    collections.map(async (c) => ({
      href: `/collections/${c.slug}`, name: c.name, tagline: c.tagline, description: c.description, image: c.image,
      count: (await catalog.listProducts(queryForCollection(c))).length,
    })),
  );
  return <IndexView eyebrow="Collections" title="Collections" items={items} />;
}
