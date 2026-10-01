"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image wrapper: next/image for responsive AVIF/WebP + lazy loading, a soft
 * blur-to-sharp fade on load, and passthrough for SVG placeholder art.
 */
export function Media({ className, alt, src, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const isSvg = typeof src === "string" && src.endsWith(".svg");
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isSvg || props.unoptimized}
      onLoad={(e) => { setLoaded(true); onLoad?.(e); }}
      className={cn("transition-[opacity,filter] duration-700 ease-luxe", loaded ? "opacity-100 blur-0" : "opacity-0 blur-md", className)}
      {...props}
    />
  );
}
