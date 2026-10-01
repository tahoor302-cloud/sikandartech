"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion, registerGsap } from "@/lib/motion";
import { asset } from "@/lib/asset";

/**
 * Scroll-scrubbed 3D cloning film (public/media/clone). Not a video player: no controls, no
 * audio, no UI. The film's playhead follows the scroll position while the frame crosses the
 * viewport (forwards on the way down, backwards on the way up), eased so it glides rather than
 * steps. Sources are encoded with a 2-frame keyframe interval so every scroll position seeks
 * instantly. The file is only fetched when the visitor approaches the section.
 */
const SRC = { mp4: "/media/clone/clone.mp4", webm: "/media/clone/clone.webm", poster: "/media/clone/clone-poster.webp" };

export function CloneScrub() {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  // Lazy-load: attach the sources only when the section is within ~1.5 screens.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setNear(true);
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scrub.
  useEffect(() => {
    const v = video.current;
    const el = wrap.current;
    if (!near || !v || !el || prefersReducedMotion()) return;
    registerGsap();
    v.load(); // sources were attached after mount
    let target = 0, current = 0, raf = 0, ready = false;

    const tick = () => {
      raf = 0;
      if (!ready) return;
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0004) current = target;
      const t = current * Math.max(0, v.duration - 0.05);
      if (!v.seeking && Math.abs(v.currentTime - t) > 0.008) v.currentTime = t;
      if (current !== target || v.seeking) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      onUpdate: (s) => { target = s.progress; kick(); },
      onRefresh: (s) => { target = s.progress; kick(); },
    });

    const onReady = () => {
      if (ready) return;
      ready = true;
      v.pause();
      // iOS only paints seeked frames after the element has played once (muted inline is allowed).
      v.play().then(() => { v.pause(); kick(); }).catch(() => kick());
    };
    if (v.readyState >= 1) onReady(); else v.addEventListener("loadedmetadata", onReady, { once: true });
    v.addEventListener("seeked", kick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", onReady);
      v.removeEventListener("seeked", kick);
      st.kill();
    };
  }, [near]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover object-center"
        poster={asset(SRC.poster)}
        muted
        playsInline
        preload={near ? "auto" : "none"}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        aria-hidden
        tabIndex={-1}
      >
        {near && <source src={asset(SRC.mp4)} type="video/mp4" />}
        {near && <source src={asset(SRC.webm)} type="video/webm" />}
      </video>
    </div>
  );
}
