"use client";
import { createStore, useStore } from "./create-store";

interface UIState {
  searchOpen: boolean;
  menuOpen: boolean;
  quickView: string | null; // product id (SM-000001)
  recentSearches: string[];
}

export const uiStore = createStore<UIState>(
  { searchOpen: false, menuOpen: false, quickView: null, recentSearches: [] },
  "sm-ui",
  (s) => ({ recentSearches: s.recentSearches }),
);

export const ui = {
  openSearch: () => uiStore.set((s) => ({ ...s, searchOpen: true, menuOpen: false })),
  closeSearch: () => uiStore.set((s) => ({ ...s, searchOpen: false })),
  toggleMenu: () => uiStore.set((s) => ({ ...s, menuOpen: !s.menuOpen })),
  closeMenu: () => uiStore.set((s) => ({ ...s, menuOpen: false })),
  openQuickView: (id: string) => uiStore.set((s) => ({ ...s, quickView: id })),
  closeQuickView: () => uiStore.set((s) => ({ ...s, quickView: null })),
  pushRecent: (q: string) =>
    uiStore.set((s) => {
      const t = q.trim();
      if (!t) return s;
      return { ...s, recentSearches: [t, ...s.recentSearches.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6) };
    }),
  clearRecent: () => uiStore.set((s) => ({ ...s, recentSearches: [] })),
};

export const useUI = <S,>(sel: (s: UIState) => S) => useStore(uiStore, sel);
