import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection/collection-view";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { catalog } from "@/lib/catalog";
import { categoryPageProps, queryFromSearch } from "@/lib/catalog/pages";

type Props = { params: Promise<{ slug: string; sub: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const c = await catalog.getCategory(slug);
  const s = c?.subcategories.find((x) => x.slug === sub);
  return c && s ? { title: `${s.name} — ${c.name}`, description: c.description } : {};
}

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const { slug, sub } = await params;
  const category = await catalog.getCategory(slug);
  if (!category) notFound();
  const props = categoryPageProps(category, sub);
  if (!props.sub) notFound();
  const page = await catalog.queryPage({ ...queryFromSearch(await searchParams), ...props.scope }, props.scope);
  return (
    <Suspense fallback={<div className="shell pt-40"><ProductGridSkeleton /></div>}>
      <CollectionView header={props.header} breadcrumbs={props.breadcrumbs} hide={props.hide} subnav={props.subnav} page={page} />
    </Suspense>
  );
}
