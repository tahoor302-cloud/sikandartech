"use client";
import { useSyncExternalStore } from "react";

/**
 * A tiny, dependency-free external store (≈ zustand-lite).
 * Persisted stores hydrate after mount to keep SSR markup deterministic.
 */
export interface Store<T> {
  get(): T;
  set(next: T | ((prev: T) => T)): void;
  subscribe(fn: () => void): () => void;
  hydrate(): void;
  initial: T;
}

export function createStore<T>(initial: T, persistKey?: string, pick?: (s: T) => Partial<T>): Store<T> {
  let state = initial;
  const subs = new Set<() => void>();
  let hydrated = false;

  const store: Store<T> = {
    initial,
    get: () => state,
    set(next) {
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      if (persistKey && hydrated) {
        try { localStorage.setItem(persistKey, JSON.stringify(pick ? pick(state) : state)); } catch { /* storage unavailable */ }
      }
      subs.forEach((fn) => fn());
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    hydrate() {
      if (hydrated) return;
      hydrated = true;
      if (!persistKey) return;
      try {
        const raw = localStorage.getItem(persistKey);
        if (raw) store.set({ ...state, ...JSON.parse(raw) });
      } catch { /* ignore */ }
    },
  };
  return store;
}

export function useStore<T, S>(store: Store<T>, selector: (s: T) => S): S {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.initial),
  );
}
