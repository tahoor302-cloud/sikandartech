import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ProductView } from "@/components/products/product-view";
import { catalog } from "@/lib/catalog";
import { primaryImage } from "@/lib/product";
import { site } from "@/data/site";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return (await catalog.listProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await catalog.getProduct((await params).id);
  if (!p) return {};
  return { title: p.name, description: p.shortDescription, openGraph: { images: [primaryImage(p)?.src ?? "/media/hero/scene-01.webp"] } };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await catalog.getProduct(id);
  if (!product) notFound();
  // Legacy slug / source-ID URLs resolve to the one canonical URL per product.
  if (decodeURIComponent(id) !== product.id) permanentRedirect(`/product/${product.id}`);
  const [sameSub, sameCategory, others] = await Promise.all([
    catalog.listProducts({ category: product.category, subcategory: product.subcategory, exclude: [product.id], limit: 4 }),
    catalog.listProducts({ category: product.category, exclude: [product.id], limit: 8 }),
    catalog.listProducts({ trending: true, exclude: [product.id], limit: 8 }),
  ]);
  const related = [...new Map([...sameSub, ...sameCategory, ...others].map((p) => [p.id, p])).values()].slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    sku: product.variants[0]?.sku,
    productID: product.id,
    category: product.productType || product.category,
    ...(site.showPrices ? { offers: { "@type": "AggregateOffer", priceCurrency: product.currency, lowPrice: product.price, highPrice: product.price, availability: product.availability === "sold-out" ? "https://schema.org/OutOfStock" : product.availability === "low-stock" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock" } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} related={related} />
    </>
  );
}
