import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="shell pb-24 pt-36">
      <div className="skeleton h-3 w-32" />
      <div className="skeleton mt-6 h-24 w-2/3 max-w-3xl" />
      <div className="skeleton mt-16 aspect-[21/9] w-full" />
      <div className="mt-16"><ProductGridSkeleton /></div>
    </div>
  );
}
