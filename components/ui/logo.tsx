import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * Official Supermimic logo (emblem above wordmark), used exactly as supplied.
 *
 * Source: data/imports/originals/supermimic-logo-source.png (transparent PNG).
 * public/brand/ holds the same artwork with only the invisible transparent margin
 * trimmed, plus a reversed (white) version with the identical shape for dark surfaces.
 * Size it with a height class — width follows the artwork's own proportions.
 */
export const LOGO_RATIO = 1348 / 683;

const SRC = {
  dark: { sm: "/brand/supermimic-logo-640.png", lg: "/brand/supermimic-logo.png" },
  light: { sm: "/brand/supermimic-logo-white-640.png", lg: "/brand/supermimic-logo-white.png" },
} as const;

type Tone = keyof typeof SRC;

function LogoImg({ tone, className, alt, eager }: { tone: Tone; className?: string; alt: string; eager?: boolean }) {
  const s = SRC[tone];
  return (
    <img
      src={asset(s.sm)}
      srcSet={`${asset(s.sm)} 640w, ${asset(s.lg)} 1348w`}
      sizes="(min-width: 1024px) 180px, 140px"
      width={1348}
      height={683}
      alt={alt}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      draggable={false}
      className={cn("block h-full w-auto max-w-none select-none", className)}
      style={{ aspectRatio: `${LOGO_RATIO}` }}
    />
  );
}

/**
 * `tone="dark"` = black logo for light surfaces, `"light"` = white logo for dark ones.
 * `tone="auto"` renders both and cross-fades with the `light` flag (navbar over the hero).
 */
export function Logo({
  className,
  tone = "dark",
  light = false,
  eager = false,
  alt = "Supermimic",
}: { className?: string; tone?: Tone | "auto"; light?: boolean; eager?: boolean; alt?: string }) {
  if (tone !== "auto") {
    return (
      <span className={cn("inline-block h-10 shrink-0", className)}>
        <LogoImg tone={tone} alt={alt} eager={eager} />
      </span>
    );
  }
  return (
    <span className={cn("relative inline-block h-10 shrink-0", className)}>
      <LogoImg tone="dark" alt={light ? "" : alt} eager={eager} className={cn("transition-opacity duration-500 ease-luxe", light ? "opacity-0" : "opacity-100")} />
      <LogoImg tone="light" alt={light ? alt : ""} eager={eager} className={cn("absolute inset-0 transition-opacity duration-500 ease-luxe", light ? "opacity-100" : "opacity-0")} />
    </span>
  );
}

/**
 * Header lockup from the campaign reel: wide geometric caps with the tagline beneath.
 * This is typography only — the official emblem logo (Logo above) is unchanged and still
 * used in the footer, menu and favicon.
 */
export function Wordmark({ className, tagline = true, tone = "dark" }: { className?: string; tagline?: boolean; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex flex-col items-start leading-none transition-colors duration-500 ease-luxe", tone === "light" ? "text-pearl" : "text-ink", className)}>
      <span className="wordmark text-[clamp(1.35rem,2.1vw,1.85rem)] font-medium tracking-[0.05em]">Supermimic</span>
      {tagline && <span className="tagline-caps mt-[0.45em] hidden text-[clamp(0.5rem,0.62vw,0.6rem)] opacity-80 min-[420px]:block">Looks real. Feels yours.</span>}
    </span>
  );
}
