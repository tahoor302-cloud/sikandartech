"use client";
import { createStore, useStore } from "./create-store";

interface WishState { ids: string[] }
export const wishlistStore = createStore<WishState>({ ids: [] }, "sm-wishlist-v2");

export const wishlist = {
  toggle(id: string) {
    wishlistStore.set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [id, ...s.ids] }));
  },
  has: (id: string) => wishlistStore.get().ids.includes(id),
};

export const useWishlist = <S,>(sel: (s: WishState) => S) => useStore(wishlistStore, sel);
