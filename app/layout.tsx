import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { catalog } from "@/lib/catalog";
import { site, intro } from "@/data/site";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, images: ["/media/hero/studio-01.webp"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: [{ url: "/brand/favicon-64.png", type: "image/png", sizes: "64x64" }, { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" }], apple: "/brand/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#e8ddd8",
  width: "device-width",
  initialScale: 1,
};

import { INTRO_BOOT_SCRIPT } from "@/components/intro/intro-video";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, collections] = await Promise.all([catalog.listCategories(), catalog.listCollections()]);
  return (
    <html lang="en" className={jost.variable} suppressHydrationWarning>
      <head>
        {/* Flags JS early so reveal initial-states apply before first paint (no flash, no hidden content without JS). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {intro.enabled && <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />}
      </head>
      <body>
        <Providers categories={categories} collections={collections}>{children}</Providers>
      </body>
    </html>
  );
}
