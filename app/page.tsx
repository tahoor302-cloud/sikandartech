import { HomeView } from "@/components/home/home-view";
import { catalog } from "@/lib/catalog";

/** Every homepage section is generated from the catalog — no hand-picked product lists. */
export default async function HomePage() {
  const [originals, newArrivals, trending, featured, categories, total] = await Promise.all([
    catalog.listProducts({ collection: "originals", featured: true }).then((l) => l.filter((p) => p.subcategory !== "boots").slice(0, 2)),
    catalog.listProducts({ newArrival: true, sort: "newest", limit: 8 }),
    catalog.listProducts({ trending: true, limit: 4 }),
    catalog.listProducts({ featured: true }),
    catalog.listCategories(),
    catalog.countProducts(),
  ]);
  const rails = await Promise.all(categories.map(async (category) => ({ category, products: await catalog.listProducts({ category: category.id, limit: 10 }) })));
  return <HomeView originals={originals} newArrivals={newArrivals} trending={trending} featured={featured} categories={categories} rails={rails} total={total} />;
}
