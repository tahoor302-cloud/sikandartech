"use client";
import { createStore, useStore } from "./create-store";
import type { CartLine } from "../types";

interface CartState {
  lines: CartLine[];
  open: boolean;
  /** Increments on every add — used to trigger badge / drawer animations. */
  pulse: number;
}

export const cartStore = createStore<CartState>({ lines: [], open: false, pulse: 0 }, "sm-cart-v2", (s) => ({ lines: s.lines }));

export const cart = {
  add(line: Omit<CartLine, "quantity">, quantity = 1, { open = true } = {}) {
    cartStore.set((s) => {
      const existing = s.lines.find((l) => l.id === line.id);
      const lines = existing
        ? s.lines.map((l) => (l.id === line.id ? { ...l, quantity: Math.min(10, l.quantity + quantity) } : l))
        : [...s.lines, { ...line, quantity }];
      return { ...s, lines, open: open || s.open, pulse: s.pulse + 1 };
    });
  },
  setQuantity(id: string, quantity: number) {
    cartStore.set((s) => ({
      ...s,
      lines: quantity <= 0 ? s.lines.filter((l) => l.id !== id) : s.lines.map((l) => (l.id === id ? { ...l, quantity: Math.min(10, quantity) } : l)),
    }));
  },
  remove(id: string) {
    cartStore.set((s) => ({ ...s, lines: s.lines.filter((l) => l.id !== id) }));
  },
  clear() {
    cartStore.set((s) => ({ ...s, lines: [] }));
  },
  open() { cartStore.set((s) => ({ ...s, open: true })); },
  close() { cartStore.set((s) => ({ ...s, open: false })); },
};

export const useCart = <S,>(sel: (s: CartState) => S) => useStore(cartStore, sel);
export const cartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
export const cartSubtotal = (s: CartState) => s.lines.reduce((n, l) => n + l.price * l.quantity, 0);
