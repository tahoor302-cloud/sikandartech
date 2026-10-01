import type { Metadata } from "next";
import { SearchView } from "@/components/pages/search-view";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim();
  const products = q ? await catalog.listProducts({ search: q }) : [];
  return <SearchView query={q} products={products} />;
}
