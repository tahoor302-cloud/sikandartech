"use client";
import { useEffect, useRef } from "react";
import type { HeroScene } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/use-media";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * Stacked scene layers. The active layer cross-fades in over 1.6s and runs a slow
 * Ken Burns move (scale + drift). Video scenes play only while active.
 * Mobile gets 9:16 sources where provided.
 */
export function HeroMedia({ scenes, index, soundOn = false }: { scenes: HeroScene[]; index: number; soundOn?: boolean }) {
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const mobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const reduce = prefersReducedMotion();
    layers.current.forEach((el, i) => {
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement;
      const active = i === index;
      gsap.to(el, { opacity: active ? 1 : 0, duration: reduce ? 0 : 1.6, ease: "power2.inOut", overwrite: true });
      if (active && !reduce && scenes[i]?.type !== "video") {
        const dir = i % 2 ? 1 : -1;
        gsap.fromTo(inner, { scale: 1.1, xPercent: -1.5 * dir, yPercent: 1 }, { scale: 1.0, xPercent: 1.5 * dir, yPercent: -0.5, duration: 8.5, ease: "none", overwrite: true });
      }
      const v = videos.current[i];
      if (v) { if (active) { v.currentTime = 0; v.play().catch(() => {}); } else setTimeout(() => v.pause(), 1600); }
    });
  }, [index]);

  // Unmute only on an explicit Sound-on gesture; fade the level for a soft entrance.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      const on = soundOn && i === index;
      if (on) {
        v.muted = false; v.volume = 0;
        v.play().catch(() => {});
        gsap.to(v, { volume: 0.8, duration: 1.2, ease: "power1.out", overwrite: true });
      } else if (!v.muted) {
        gsap.to(v, { volume: 0, duration: 0.5, overwrite: true, onComplete: () => { v.muted = true; } });
      }
    });
  }, [soundOn, index]);

  return (
    <div className="absolute inset-0">
      {scenes.map((s, i) => {
        const src = asset(mobile && s.mobileSrc ? s.mobileSrc : s.src);
        return (
          <div key={s.id} ref={(el) => { layers.current[i] = el; }} className={cn("absolute inset-0", i === 0 ? "opacity-100" : "opacity-0")} aria-hidden={i !== index}>
            <div className="absolute inset-0 will-change-transform">
              {s.type === "video" ? (
                <video
                  ref={(el) => { videos.current[i] = el; }}
                  className="h-full w-full object-cover"
                  poster={s.poster && asset(s.poster)}
                  muted
                  loop={s.loop ?? true}
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  disablePictureInPicture
                  autoPlay={i === 0}
                >
                  <source src={src} type="video/mp4" />
                  {s.webm && !(mobile && s.mobileSrc) && <source src={asset(s.webm)} type="video/webm" />}
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="h-full w-full object-cover object-center" fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
