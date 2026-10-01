export default function Loading() {
  return (
    <div className="shell grid gap-10 pb-24 pt-32 md:grid-cols-[1.25fr_1fr] lg:gap-20">
      <div className="grid gap-5 md:grid-cols-[72px_1fr]">
        <div className="hidden flex-col gap-3 md:flex">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton aspect-[4/5]" />)}</div>
        <div className="skeleton aspect-[4/5]" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-3 w-40" />
        <div className="skeleton h-14 w-3/4" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton mt-6 h-20 w-full" />
        <div className="skeleton mt-6 h-12 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    </div>
  );
}
