import type { CurrencyCode } from "./types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Deterministic across server & client (no locale drift → no hydration mismatch). */
const SYMBOL: Partial<Record<CurrencyCode, string>> = { USD: "$", GBP: "£", EUR: "€" };

export function formatPrice(amount: number, currency: CurrencyCode = "USD") {
  const n = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sym = SYMBOL[currency];
  return sym ? `${sym}${n}` : `${currency} ${n}`;
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function titleCase(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
