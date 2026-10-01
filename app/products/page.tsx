import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionView } from "@/components/collection/collection-view";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { catalog } from "@/lib/catalog";
import { allProductsProps, queryFromSearch } from "@/lib/catalog/pages";

export const metadata: Metadata = { title: "All Products", description: "The complete Super Mimic catalogue." };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProductsPage({ searchParams }: Props) {
  const query = queryFromSearch(await searchParams);
  const [page, total] = await Promise.all([catalog.queryPage(query), catalog.countProducts()]);
  return (
    <Suspense fallback={<div className="shell pt-40"><ProductGridSkeleton /></div>}>
      <CollectionView {...allProductsProps(total)} page={page} />
    </Suspense>
  );
}
