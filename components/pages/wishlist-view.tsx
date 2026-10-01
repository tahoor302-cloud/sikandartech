"use client";
import { useEffect, useState } from "react";
import { Link } from "@/components/ui/link";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { useWishlist } from "@/lib/store/wishlist";
import { clientCatalog } from "@/lib/catalog/client";
import type { Product } from "@/lib/types";

export function WishlistView() {
  const ids = useWishlist((s) => s.ids);
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    let alive = true;
    clientCatalog.getProducts(ids).then((list) => alive && setProducts(ids.map((id) => list.find((p) => p.id === id)).filter(Boolean) as Product[])).catch(() => alive && setProducts([]));
    return () => { alive = false; };
  }, [ids]);
  return (
    <div className="shell pb-[var(--spacing-section)] pt-32 md:pt-40">
      <Reveal variant="fade"><p className="eyebrow text-champagne-deep">Saved — {ids.length}</p></Reveal>
      <MaskText as="h1" text="Wishlist" immediate delay={0.1} className="display mt-5 text-display-lg" />
      <div className="mt-14">
        {products === null ? <ProductGridSkeleton count={4} /> : products.length ? <ProductGrid products={products} flip /> : (
          <div className="flex flex-col items-start gap-6">
            <p className="prose-lux max-w-[42ch]">Save the objects you love by tapping the heart — they’ll wait for you here.</p>
            <Link href="/collections/featured" className="btn btn-primary">Discover the edit</Link>
          </div>
        )}
      </div>
    </div>
  );
}
