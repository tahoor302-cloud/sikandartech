"use client";
import { useEffect, type ReactNode } from "react";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { TransitionCurtain } from "@/components/animations/page-transition";
import { Cursor } from "@/components/animations/cursor";
import { Navbar } from "@/components/navigation/navbar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchOverlay } from "@/components/search/search-overlay";
import { QuickView } from "@/components/products/quick-view";
import { Footer } from "./footer";
import { ChatButton } from "./chat-button";
import { IntroVideo } from "@/components/intro/intro-video";
import { intro } from "@/data/site";
import { cartStore } from "@/lib/store/cart";
import { wishlistStore } from "@/lib/store/wishlist";
import { uiStore } from "@/lib/store/ui";
import type { Category, Collection } from "@/lib/types";

/** App shell: smooth scroll, global overlays, persisted stores. */
export function Providers({ children, categories, collections }: { children: ReactNode; categories: Category[]; collections: Collection[] }) {
  useEffect(() => {
    cartStore.hydrate();
    wishlistStore.hydrate();
    uiStore.hydrate();
  }, []);
  return (
    <SmoothScroll>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-ink focus:px-4 focus:py-2 focus:text-pearl">Skip to content</a>
      <Navbar categories={categories} collections={collections} />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay categories={categories} />
      <QuickView />
      <TransitionCurtain />
      <ChatButton />
      <Cursor />
      {intro.enabled && <IntroVideo />}
    </SmoothScroll>
  );
}
