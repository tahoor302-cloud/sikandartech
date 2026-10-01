import type { Category, Collection, ProductQuery } from "../types";
import type { CollectionHeader, SubnavItem } from "@/components/collection/collection-view";
import type { FacetKey } from "@/components/collection/filters";
import { queryFromParams } from "../filters";

type SP = Record<string, string | string[] | undefined>;
/** Adapts Next's searchParams object (or URLSearchParams) to the shared query parser. */
export function queryFromSearch(sp: SP | URLSearchParams): ProductQuery {
  const get = sp instanceof URLSearchParams ? (k: string) => sp.get(k) : (k: string) => { const v = sp[k]; return Array.isArray(v) ? v.join(",") : v; };
  const q = queryFromParams(get);
  delete q.ids;
  delete q.limit;
  return q;
}

export function allProductsProps(total: number) {
  return {
    header: { eyebrow: "The complete catalogue", title: "All Products", description: `Every object in the house, in one place: ${total} pieces across every category. Filter by type, colour, size, availability or price, or search by name or product ID.` } satisfies CollectionHeader,
    breadcrumbs: [{ label: "Home", href: "/" }],
    searchable: true,
  };
}

/** Header, scope and subnav for /category/[slug] and /category/[slug]/[sub]. */
export function categoryPageProps(category: Category, subSlug?: string) {
  const sub = subSlug ? category.subcategories.find((s) => s.slug === subSlug) : undefined;
  const scope: ProductQuery = sub ? { category: category.id, subcategory: sub.id } : { category: category.id };
  const subnav: SubnavItem[] = category.subcategories.length > 1
    ? [{ label: `All ${category.name}`, href: `/category/${category.slug}`, active: !sub, count: category.count }, ...category.subcategories.map((s) => ({ label: s.name, href: `/category/${category.slug}/${s.slug}`, active: s.id === sub?.id, count: s.count }))]
    : [];
  return {
    sub,
    scope,
    hide: (sub ? ["category", "sub"] : ["category"]) as FacetKey[],
    subnav,
    header: { eyebrow: sub ? category.name : category.tagline, title: sub ? sub.name : category.name, description: category.description, image: category.banner ?? category.image } satisfies CollectionHeader,
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Shop all", href: "/products" }, ...(sub ? [{ label: category.name, href: `/category/${category.slug}` }] : [])],
  };
}

export function collectionScope(c: Collection): ProductQuery {
  switch (c.rule.type) {
    case "collection": return { collection: c.rule.value };
    case "flag": return c.rule.value === "featured" ? { featured: true } : { newArrival: true };
    default: return {};
  }
}

export function collectionPageProps(c: Collection) {
  return {
    scope: collectionScope(c),
    hide: (c.rule.type === "collection" ? ["collection"] : []) as FacetKey[],
    header: { eyebrow: c.tagline, title: c.name, description: c.description, image: c.image } satisfies CollectionHeader,
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }],
  };
}
