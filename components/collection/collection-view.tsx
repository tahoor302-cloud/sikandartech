"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Media } from "@/components/ui/media";
import { Link } from "@/components/ui/link";
import { Sheet } from "@/components/ui/sheet";
import { ClipImage } from "@/components/animations/clip-image";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ProductGrid } from "@/components/products/product-grid";
import { FilterControls, emptyFilters, type FacetKey, type FilterState } from "./filters";
import { SortSelect } from "./sort-select";
import { Pagination } from "./pagination";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/icons";
import type { Availability, ProductPage, SortKey } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export interface CollectionHeader {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}

export interface SubnavItem {
  label: string;
  href: string;
  active: boolean;
  count?: number;
}

interface Props {
  header: CollectionHeader;
  /** One server-computed page of results + facets for the page's scope. */
  page: ProductPage;
  breadcrumbs?: { label: string; href: string }[];
  /** Facet groups fixed by the page scope. */
  hide?: FacetKey[];
  /** Links shown in the sticky toolbar (e.g. subcategories of a category). */
  subnav?: SubnavItem[];
  /** Show an in-page search field (used on /products). */
  searchable?: boolean;
}

/**
 * Catalog landing used by /products, /category/*, /collections/*.
 * Filters, sort, search and page live in the URL; the server (or the preview
 * router) computes the page, so it scales to any catalog size.
 */
export function CollectionView({ header, page, breadcrumbs, hide = [], subnav, searchable }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [panel, setPanel] = useState(false);
  const [sheet, setSheet] = useState(false);
  const gridTop = useRef<HTMLDivElement>(null);
  const { facets } = page;

  const csv = (k: string) => params.get(k)?.split(",").filter(Boolean) ?? [];
  const state: FilterState = {
    category: csv("category"),
    sub: csv("sub"),
    collection: csv("collection"),
    availability: csv("availability") as Availability[],
    colors: csv("color"),
    sizes: csv("size"),
    maxPrice: params.get("max") ? Number(params.get("max")) : undefined,
  };
  const sort = (params.get("sort") as SortKey) || (params.get("q") ? undefined : "featured");
  const query = params.get("q") ?? "";
  const [term, setTerm] = useState(query);
  useEffect(() => setTerm(query), [query]);

  const build = useCallback(
    (next: FilterState, nextSort: SortKey | undefined, q: string, pageNo = 1) => {
      const sp = new URLSearchParams();
      if (q) sp.set("q", q);
      if (next.category.length) sp.set("category", next.category.join(","));
      if (next.sub.length) sp.set("sub", next.sub.join(","));
      if (next.collection.length) sp.set("collection", next.collection.join(","));
      if (next.availability.length) sp.set("availability", next.availability.join(","));
      if (next.colors.length) sp.set("color", next.colors.join(","));
      if (next.sizes.length) sp.set("size", next.sizes.join(","));
      if (next.maxPrice) sp.set("max", String(next.maxPrice));
      if (nextSort && nextSort !== "featured") sp.set("sort", nextSort);
      if (pageNo > 1) sp.set("page", String(pageNo));
      const qs = sp.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname],
  );
  const write = (next: FilterState, nextSort = sort, q = query) => router.replace(build(next, nextSort, q), { scroll: false });
  const toGrid = () => {
    const el = gridTop.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: "instant" as ScrollBehavior });
  };

  const name = (list: { id: string; name: string }[], id: string) => list.find((x) => x.id === id)?.name ?? id;
  const active = [
    ...state.category.map((c) => ({ key: `c-${c}`, label: name(facets.categories, c), clear: () => write({ ...state, category: state.category.filter((x) => x !== c), sub: [] }) })),
    ...state.sub.map((c) => ({ key: `u-${c}`, label: name(facets.subcategories, c), clear: () => write({ ...state, sub: state.sub.filter((x) => x !== c) }) })),
    ...state.collection.map((c) => ({ key: `o-${c}`, label: name(facets.collections, c), clear: () => write({ ...state, collection: state.collection.filter((x) => x !== c) }) })),
    ...state.availability.map((c) => ({ key: `a-${c}`, label: name(facets.availability, c), clear: () => write({ ...state, availability: state.availability.filter((x) => x !== c) }) })),
    ...state.colors.map((c) => ({ key: `k-${c}`, label: name(facets.colors, c), clear: () => write({ ...state, colors: state.colors.filter((x) => x !== c) }) })),
    ...state.sizes.map((s) => ({ key: `s-${s}`, label: `Size ${s}`, clear: () => write({ ...state, sizes: state.sizes.filter((x) => x !== s) }) })),
    ...(state.maxPrice ? [{ key: "p", label: `Under ${formatPrice(state.maxPrice)}`, clear: () => write({ ...state, maxPrice: undefined }) }] : []),
    ...(query ? [{ key: "q", label: `“${query}”`, clear: () => write(state, sort, "") }] : []),
  ];
  const clearAll = () => write(emptyFilters, sort, "");

  const from = page.total ? (page.page - 1) * page.pageSize + 1 : 0;
  const to = Math.min(page.total, page.page * page.pageSize);
  const tabs: SubnavItem[] | null = subnav?.length
    ? subnav
    : !hide.includes("category") && facets.categories.length > 1
      ? [{ label: "All", href: build({ ...state, category: [], sub: [] }, sort, query), active: !state.category.length }, ...facets.categories.map((c) => ({ label: c.name, href: build({ ...state, category: [c.id], sub: [] }, sort, query), active: state.category.length === 1 && state.category[0] === c.id }))]
      : null;

  return (
    <>
      {/* Editorial header */}
      <header className="shell pt-32 md:pt-40">
        {breadcrumbs && (
          <Reveal variant="fade" as="nav" className="eyebrow mb-10 flex flex-wrap gap-2 text-mist" aria-label="Breadcrumb">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex gap-2">{i > 0 && <span>/</span>}<Link href={b.href} className="hover:text-ink">{b.label}</Link></span>
            ))}
          </Reveal>
        )}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal variant="fade" className="flex items-center gap-3"><span className="h-px w-8 bg-champagne" /><span className="eyebrow text-champagne-deep">{header.eyebrow}</span></Reveal>
            <MaskText as="h1" text={header.title} immediate delay={0.2} className="display mt-6 text-display-xl leading-[1.02]" />
          </div>
          <Reveal delay={0.35} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-lux">{header.description}</p>
            <p className="eyebrow mt-5 text-mist">{page.total} {page.total === 1 ? "object" : "objects"}</p>
            {searchable && (
              <form
                role="search"
                className="mt-6 flex h-12 items-center gap-3 border-b border-ink/30 focus-within:border-ink"
                onSubmit={(e) => { e.preventDefault(); write(state, term.trim() ? undefined : sort, term.trim()); }}
              >
                <SearchIcon width={18} height={18} className="shrink-0 text-mist" />
                <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search by name, type or ID" aria-label="Search products" className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-mist" />
                {term && <button type="button" onClick={() => { setTerm(""); write(state, sort, ""); }} aria-label="Clear search" className="text-mist hover:text-ink"><CloseIcon width={14} height={14} /></button>}
              </form>
            )}
          </Reveal>
        </div>
        {header.image && (
          <ClipImage className="mt-14 aspect-[16/10] w-full bg-bone md:mt-20 md:aspect-[21/9]" delay={0.3}>
            <Media src={header.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </ClipImage>
        )}
      </header>

      {/* Sticky toolbar */}
      <div ref={gridTop} className="under-nav sticky top-0 z-40 mt-14 border-y border-line bg-ivory/85 backdrop-blur-xl md:mt-20">
        <div className="shell flex h-14 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-6">
            <button type="button" onClick={() => (window.matchMedia("(min-width: 768px)").matches ? setPanel((p) => !p) : setSheet(true))} aria-expanded={panel} className="label flex h-10 shrink-0 items-center gap-2 text-[10.5px]">
              <FilterIcon width={16} height={16} /> Filters {active.length > 0 && <span className="grid size-4 place-items-center rounded-full bg-champagne text-[9px] text-ink">{active.length}</span>}
            </button>
            {tabs && (
              <div className="no-scrollbar hidden gap-5 overflow-x-auto md:flex">
                {tabs.map((t) => (
                  <Link key={t.href} href={t.href} scroll={false} className={cn("label relative shrink-0 py-1 text-[10px] transition-colors", t.active ? "text-ink" : "text-mist hover:text-ink")}>
                    {t.label}{t.count != null && <span className="ml-1.5 text-mist">{t.count}</span>}
                    <span className={cn("absolute inset-x-0 -bottom-0.5 h-px origin-left bg-champagne transition-transform duration-500 ease-luxe", t.active ? "scale-x-100" : "scale-x-0")} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden whitespace-nowrap text-[12px] text-mist tabular-nums sm:inline" aria-live="polite">{page.total ? `${from}–${to} of ${page.total}` : "0 results"}</span>
            <SortSelect value={sort ?? "featured"} onChange={(s) => write(state, s)} />
          </div>
        </div>
        {/* Desktop filter panel */}
        <div className={cn("hidden border-t border-line transition-[grid-template-rows,opacity] duration-500 ease-luxe md:grid", panel ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0")}>
          <div className="min-h-0 overflow-hidden">
            <div className="shell max-h-[60vh] overflow-y-auto py-10" data-lenis-prevent>
              <FilterControls facets={facets} state={state} onChange={(s) => write(s)} hide={hide} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile subnav chips */}
      {tabs && (
        <div className="no-scrollbar shell flex gap-2 overflow-x-auto pt-5 md:hidden">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} scroll={false} className={cn("shrink-0 border px-3.5 py-2 text-[12px] transition-colors", t.active ? "border-ink bg-ink text-ivory" : "border-line")}>{t.label}</Link>
          ))}
        </div>
      )}

      {/* Active filter pills */}
      <div className={cn("shell flex flex-wrap items-center gap-2 transition-[opacity] duration-300", active.length ? "pt-6 opacity-100" : "h-0 opacity-0")}>
        {active.map((a) => (
          <button key={a.key} onClick={a.clear} className="group/p flex items-center gap-2 border border-line bg-ivory-2 px-3 py-1.5 text-[12px] transition-colors hover:border-ink">
            {a.label} <CloseIcon width={12} height={12} className="transition-transform group-hover/p:rotate-90" />
          </button>
        ))}
        {active.length > 1 && <button onClick={clearAll} className="link-u ml-2 text-[12px] text-graphite">Clear all</button>}
      </div>

      <section className="shell pb-[var(--spacing-section)] pt-12 md:pt-16">
        {page.items.length ? (
          <>
            <ProductGrid products={page.items} flip priorityCount={4} />
            <Pagination page={page.page} pageCount={page.pageCount} hrefFor={(n) => build(state, sort, query, n)} onNavigate={toGrid} />
          </>
        ) : (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <p className="font-display text-[36px] font-light">Nothing matches — yet.</p>
            <p className="text-[14px] text-graphite">Try removing a filter to see more of the collection.</p>
            <button onClick={clearAll} className="btn btn-outline mt-2">Clear filters</button>
          </div>
        )}
      </section>

      {/* Mobile filter bottom sheet */}
      <Sheet open={sheet} onClose={() => setSheet(false)} side="bottom" label="Filters">
        <div className="flex items-center justify-between px-6 pb-2 pt-4">
          <p className="label">Filters</p>
          <button onClick={() => setSheet(false)} aria-label="Close filters" className="-mr-2 grid size-10 place-items-center"><CloseIcon /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4" data-lenis-prevent>
          <FilterControls facets={facets} state={state} onChange={(s) => write(s)} hide={hide} />
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-line px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <button onClick={clearAll} className="btn btn-outline">Clear</button>
          <button onClick={() => setSheet(false)} className="btn btn-primary">Show {page.total}</button>
        </div>
      </Sheet>
    </>
  );
}
