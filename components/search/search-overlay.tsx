"use client";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { CloseIcon, SearchIcon, ArrowRight } from "@/components/ui/icons";
import { coverThen } from "@/components/animations/page-transition";
import { clientCatalog } from "@/lib/catalog/client";
import type { SearchItem } from "@/lib/catalog";
import { site } from "@/data/site";
import { ui, useUI } from "@/lib/store/ui";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useEscape } from "@/hooks/use-escape";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { formatPrice, cn } from "@/lib/utils";
import { categoryLabel } from "@/lib/product";
import { nameOfSubcategory } from "@/lib/taxonomy";
import type { Category } from "@/lib/types";

/** Full-width search overlay with recent searches, categories and live results. */
export function SearchOverlay({ categories }: { categories: Category[] }) {
  const open = useUI((s) => s.searchOpen);
  const recent = useUI((s) => s.recentSearches);
  const router = useRouter();
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [trending, setTrending] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  useLockScroll(open);
  useEscape(open, ui.closeSearch);

  // ⌘K / Ctrl+K / "/" opens search
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) { e.preventDefault(); ui.openSearch(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 250);
    if (!trending.length) clientCatalog.search("", 4).then(setTrending).catch(() => {});
    return () => clearTimeout(t);
  }, [open, trending.length]);

  useEffect(() => {
    const term = deferred.trim();
    if (!term) { setResults([]); return; }
    let alive = true;
    setLoading(true);
    const t = setTimeout(() => {
      clientCatalog.search(term, 8).then((r) => { if (alive) { setResults(r); setLoading(false); } }).catch(() => alive && setLoading(false));
    }, 120);
    return () => { alive = false; clearTimeout(t); };
  }, [deferred]);

  // Staggered entrance whenever results change
  useEffect(() => {
    const items = list.current?.querySelectorAll("li");
    if (!items?.length || prefersReducedMotion()) return;
    gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.05, overwrite: true });
  }, [results, trending, open]);

  const submit = (term: string) => {
    const t = term.trim();
    if (!t) return;
    ui.pushRecent(t);
    ui.closeSearch();
    coverThen(() => router.push(`/search?q=${encodeURIComponent(t)}`));
  };

  const shown = q.trim() ? results : trending;

  return (
    <div className={cn("fixed inset-0 z-[125]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div onClick={ui.closeSearch} className={cn("absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        data-lenis-prevent
        className={cn("absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-ivory transition-[translate,visibility] duration-[750ms] ease-luxe", open ? "visible translate-y-0" : "invisible -translate-y-full")}
      >
        <div className="shell pb-12 pt-5 md:pb-16 md:pt-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-champagne-deep">Search Super Mimic</span>
            <button onClick={ui.closeSearch} aria-label="Close search" className="-mr-2 grid size-10 place-items-center transition-transform duration-500 ease-luxe hover:rotate-90"><CloseIcon /></button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submit(q); }} className="relative mt-6 flex items-center border-b border-ink/80 md:mt-10">
            <SearchIcon width={26} height={26} className="shrink-0 text-mist" />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search products"
              className="h-20 w-full bg-transparent px-4 font-display text-[clamp(1.25rem,6.2vw,2rem)] font-light placeholder:text-mist/60 focus:outline-none md:h-28 md:text-[56px]"
            />
            {loading && <span className="absolute bottom-0 left-0 h-px w-full origin-left animate-pulse bg-champagne" />}
            {q && <button type="button" onClick={() => setQ("")} className="label shrink-0 text-[10px] text-mist">Clear</button>}
          </form>

          <div className="mt-10 grid gap-12 md:grid-cols-[240px_1fr] md:gap-16">
            <aside className="flex flex-col gap-10">
              {recent.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="eyebrow text-mist">Recent</p>
                    <button onClick={ui.clearRecent} className="text-[11px] text-mist hover:text-ink">Clear</button>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {recent.map((r) => <li key={r}><button onClick={() => setQ(r)} className="link-u text-[15px]">{r}</button></li>)}
                  </ul>
                </div>
              )}
              <div>
                <p className="eyebrow mb-4 text-mist">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {site.popularSearches.map((t) => (
                    <button key={t} onClick={() => setQ(t)} className="border border-line px-3.5 py-2 text-[12px] transition-colors hover:border-ink">{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-4 text-mist">Categories</p>
                <ul className="flex flex-col gap-2">
                  {categories.map((c) => (
                    <li key={c.id}><Link href={`/category/${c.slug}`} onClick={ui.closeSearch} className="link-u text-[15px]">{c.name}</Link></li>
                  ))}
                </ul>
              </div>
            </aside>

            <section aria-live="polite">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="eyebrow text-mist">{q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Trending now"}</p>
                {q.trim() && results.length > 0 && (
                  <button onClick={() => submit(q)} className="label link-u inline-flex items-center gap-2 text-[10px]">View all <ArrowRight width={13} height={13} /></button>
                )}
              </div>
              {q.trim() && !loading && results.length === 0 ? (
                <p className="font-display text-[28px] font-light text-graphite">No objects match “{q}”. Try “leather” or “automatic”.</p>
              ) : (
                <ul ref={list} className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                  {shown.map((r) => (
                    <li key={r.id}>
                      <Link href={`/product/${r.id}`} onClick={() => { ui.pushRecent(q || r.name); ui.closeSearch(); }} className="group/s block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2">
                          <Media src={r.image} alt={r.name} fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover transition-transform duration-700 ease-luxe group-hover/s:scale-105" />
                        </div>
                        <p className="eyebrow mt-3 text-[9px] text-mist">{categoryLabel[r.category] ?? r.category}{r.subcategory && ` · ${nameOfSubcategory(r.subcategory)}`}</p>
                        <p className="mt-1 text-[14px] font-medium">{r.name}</p>
                        {site.showPrices && <p className="text-[13px] text-graphite">{formatPrice(r.price, r.currency)}</p>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
