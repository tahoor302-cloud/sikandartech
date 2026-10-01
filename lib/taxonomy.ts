import taxonomyJson from "@/data/taxonomy.json";
import collectionsJson from "@/data/collections.json";

interface TaxonomyCategory { id: string; name: string; subcategories: { id: string; name: string }[] }
const taxonomy = taxonomyJson as { categories: TaxonomyCategory[] };

/** Display names for every declared category / subcategory / collection id. */
export const categoryNames: Record<string, string> = Object.fromEntries(taxonomy.categories.map((c) => [c.id, c.name]));
export const subcategoryNames: Record<string, string> = Object.fromEntries(
  taxonomy.categories.flatMap((c) => c.subcategories.map((s) => [s.id, s.name])),
);
export const collectionNames: Record<string, string> = Object.fromEntries(
  (collectionsJson as { id: string; name: string; rule: { type: string } }[]).filter((c) => c.rule.type === "collection").map((c) => [c.id, c.name]),
);
export const categoryOrder = taxonomy.categories.map((c) => c.id);

const title = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
export const nameOfCategory = (id: string) => categoryNames[id] ?? title(id);
export const nameOfSubcategory = (id: string) => subcategoryNames[id] ?? title(id);
export const nameOfCollection = (id: string) => collectionNames[id] ?? title(id);
