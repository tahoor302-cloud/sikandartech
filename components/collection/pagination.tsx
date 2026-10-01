"use client";
import { Link } from "@/components/ui/link";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Compact numbered pagination: 1 … 4 5 [6] 7 8 … 20 */
function pages(current: number, count: number) {
  const out: (number | "…")[] = [];
  const add = (n: number | "…") => out[out.length - 1] !== n && out.push(n);
  for (let i = 1; i <= count; i++) {
    if (i === 1 || i === count || Math.abs(i - current) <= 1) add(i);
    else add("…");
  }
  return out;
}

export function Pagination({ page, pageCount, hrefFor, onNavigate }: { page: number; pageCount: number; hrefFor: (p: number) => string; onNavigate?: () => void }) {
  if (pageCount <= 1) return null;
  const btn = "grid h-11 min-w-11 place-items-center px-2 text-[13px] tabular-nums transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-1 md:mt-24">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} onClick={onNavigate} scroll={false} aria-label="Previous page" className={cn(btn, "hover:text-champagne-deep")}><ArrowLeft width={18} height={18} /></Link>
      ) : <span className={cn(btn, "text-mist/40")} aria-hidden><ArrowLeft width={18} height={18} /></span>}
      {pages(page, pageCount).map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className={cn(btn, "text-mist")}>…</span>
        ) : (
          <Link key={n} href={hrefFor(n)} onClick={onNavigate} scroll={false} aria-current={n === page ? "page" : undefined} className={cn(btn, "relative", n === page ? "text-ink" : "text-mist hover:text-ink")}>
            {n}
            <span className={cn("absolute inset-x-3 bottom-1.5 h-px bg-champagne transition-transform duration-500 ease-luxe", n === page ? "scale-x-100" : "scale-x-0")} />
          </Link>
        ),
      )}
      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} onClick={onNavigate} scroll={false} aria-label="Next page" className={cn(btn, "hover:text-champagne-deep")}><ArrowRight width={18} height={18} /></Link>
      ) : <span className={cn(btn, "text-mist/40")} aria-hidden><ArrowRight width={18} height={18} /></span>}
    </nav>
  );
}
