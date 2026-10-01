"use client";
import { site } from "@/data/site";
import type { Availability, Facets } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export interface FilterState {
  category: string[];
  sub: string[];
  collection: string[];
  availability: Availability[];
  colors: string[];
  sizes: string[];
  maxPrice?: number;
}

export const emptyFilters: FilterState = { category: [], sub: [], collection: [], availability: [], colors: [], sizes: [] };

/** Facet groups a page can hide because they are fixed by its scope (e.g. category on /category/shoes). */
export type FacetKey = "category" | "sub" | "collection";

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function CheckList({ title, items, selected, onToggle }: { title: string; items: { id: string; name: string; count: number }[]; selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div>
      <p className="eyebrow mb-4 text-mist">{title}</p>
      <div className="flex flex-col gap-2.5">
        {items.map((c) => {
          const on = selected.includes(c.id);
          return (
            <label key={c.id} className="group/c flex cursor-pointer items-center gap-3 text-[14px]">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => onToggle(c.id)} />
              <span className="grid size-4 shrink-0 place-items-center border border-ink/40 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-champagne-deep">
                <span className={cn("size-1.5 bg-ivory transition-transform", on ? "scale-100" : "scale-0")} />
              </span>
              <span className="flex-1">{c.name}</span>
              <span className="text-[11px] text-mist tabular-nums">{c.count}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Filter controls — rendered in the desktop panel and the mobile bottom sheet.
 * Every option comes from `facets`, which are computed from the catalog data.
 */
export function FilterControls({ facets, state, onChange, hide = [] }: { facets: Facets; state: FilterState; onChange: (s: FilterState) => void; hide?: FacetKey[] }) {
  const priceMax = state.maxPrice ?? facets.price.max;
  const subs = state.category.length ? facets.subcategories.filter((s) => state.category.includes(s.category)) : facets.subcategories;
  const sizes = facets.sizes.filter((s) => s !== "One size");
  const range = facets.price.max - facets.price.min;
  const step = range > 2000 ? 50 : range > 500 ? 10 : 5;
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      {!hide.includes("category") && facets.categories.length > 1 && (
        <CheckList title="Category" items={facets.categories} selected={state.category} onToggle={(id) => onChange({ ...state, category: toggle(state.category, id), sub: [] })} />
      )}
      {!hide.includes("sub") && subs.length > 1 && (
        <CheckList title="Type" items={subs} selected={state.sub} onToggle={(id) => onChange({ ...state, sub: toggle(state.sub, id) })} />
      )}
      {!hide.includes("collection") && facets.collections.length > 1 && (
        <CheckList title="Collection" items={facets.collections} selected={state.collection} onToggle={(id) => onChange({ ...state, collection: toggle(state.collection, id) })} />
      )}
      {facets.availability.length > 1 && (
        <CheckList title="Availability" items={facets.availability} selected={state.availability} onToggle={(id) => onChange({ ...state, availability: toggle(state.availability, id as Availability) })} />
      )}
      {facets.colors.length > 0 && (
        <div>
          <p className="eyebrow mb-4 text-mist">Colour</p>
          <div className="flex flex-wrap gap-2">
            {facets.colors.map((c) => {
              const on = state.colors.includes(c.id);
              return (
                <button key={c.id} type="button" aria-pressed={on} onClick={() => onChange({ ...state, colors: toggle(state.colors, c.id) })} className={cn("flex items-center gap-2 border px-3 py-2 text-[12px] transition-colors", on ? "border-ink" : "border-line hover:border-ink/50")}>
                  <span className="size-3 rounded-full ring-1 ring-ink/15" style={{ background: c.hex }} />
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {sizes.length > 0 && (
        <div>
          <p className="eyebrow mb-4 text-mist">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const on = state.sizes.includes(s);
              return (
                <button key={s} type="button" aria-pressed={on} onClick={() => onChange({ ...state, sizes: toggle(state.sizes, s) })} className={cn("h-9 min-w-11 border px-2.5 text-[12px] tabular-nums transition-colors", on ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink/50")}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {site.showPrices && facets.price.max > facets.price.min && (
        <div>
          <p className="eyebrow mb-4 flex justify-between text-mist"><span>Price</span><span className="normal-case tracking-normal text-ink">up to {formatPrice(priceMax)}</span></p>
          <input
            type="range"
            min={facets.price.min}
            max={facets.price.max}
            step={step}
            value={priceMax}
            onChange={(e) => onChange({ ...state, maxPrice: Number(e.target.value) >= facets.price.max ? undefined : Number(e.target.value) })}
            className="w-full accent-ink"
            aria-label="Maximum price"
          />
          <div className="mt-2 flex justify-between text-[11px] text-mist tabular-nums"><span>{formatPrice(facets.price.min)}</span><span>{formatPrice(facets.price.max)}</span></div>
        </div>
      )}
    </div>
  );
}
