export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="skeleton aspect-[4/5]" />
          <div className="skeleton mt-4 h-2.5 w-1/3" />
          <div className="skeleton mt-2.5 h-3.5 w-2/3" />
          <div className="skeleton mt-2.5 h-3 w-1/4" />
        </div>
      ))}
    </div>
  );
}
