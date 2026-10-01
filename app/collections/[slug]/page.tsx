import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection/collection-view";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { catalog } from "@/lib/catalog";
import { collectionPageProps, queryFromSearch } from "@/lib/catalog/pages";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await catalog.getCollection((await params).slug);
  return c ? { title: c.name, description: c.description, openGraph: { images: [c.image] } } : {};
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const collection = await catalog.getCollection((await params).slug);
  if (!collection) notFound();
  const props = collectionPageProps(collection);
  const query = queryFromSearch(await searchParams);
  const page = await catalog.queryPage({ ...query, ...props.scope, sort: query.sort ?? (collection.rule.type === "flag" && collection.rule.value === "newArrival" ? "newest" : undefined) }, props.scope);
  return (
    <Suspense fallback={<div className="shell pt-40"><ProductGridSkeleton /></div>}>
      <CollectionView header={props.header} breadcrumbs={props.breadcrumbs} hide={props.hide} page={page} />
    </Suspense>
  );
}
