import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection/collection-view";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { catalog } from "@/lib/catalog";
import { categoryPageProps, queryFromSearch } from "@/lib/catalog/pages";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await catalog.getCategory((await params).slug);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await catalog.getCategory((await params).slug);
  if (!category) notFound();
  const props = categoryPageProps(category);
  const page = await catalog.queryPage({ ...queryFromSearch(await searchParams), ...props.scope }, props.scope);
  return (
    <Suspense fallback={<div className="shell pt-40"><ProductGridSkeleton /></div>}>
      <CollectionView header={props.header} breadcrumbs={props.breadcrumbs} hide={props.hide} subnav={props.subnav} page={page} />
    </Suspense>
  );
}
