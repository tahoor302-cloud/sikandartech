"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/animations/smooth-scroll";
import { gsap } from "@/lib/motion";
import { asset } from "@/lib/asset";
import { intro } from "@/data/site";

/**
 * Full-screen opening film, shown once per browser session before the site.
 *
 *   video plays (muted fallback if sound autoplay is blocked)
 *     → ends / Skip → video fades to black → black layer fades out → layer unmounts
 *
 * public/media/intro/intro.mp4 is the supplied film, detail-restored at 2x (1696x960) with its
 * content, tone, timing, frame rate and audio unchanged (scripts/media/intro-enhance.*, intro-tone-match.py;
 * original kept at data/imports/originals/intro-source.mp4). The layer is
 * server-rendered so it covers the page from the very first paint; an inline <head>
 * script (INTRO_BOOT_SCRIPT) marks <html> before paint so a returning visitor in the
 * same session never sees it. Failsafes guarantee the site always becomes usable.
 */
export const INTRO_SEEN_KEY = "sm-intro-seen";
export const INTRO_DONE_EVENT = "sm:intro-done";

/** Runs in <head> before first paint: decides whether the intro plays this session. */
export const INTRO_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('${INTRO_SEEN_KEY}')){d.classList.add('intro-seen')}else{d.classList.add('intro-active')}}catch(e){document.documentElement.classList.add('intro-active')}})();`;

type Phase = "playing" | "leaving" | "gone";

export function IntroVideo() {
  const [phase, setPhase] = useState<Phase>("playing");
  const [skipVisible, setSkipVisible] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const finishing = useRef(false);
  const lenis = useLenis();

  const release = useCallback(() => {
    const d = document.documentElement;
    d.classList.remove("intro-active");
    d.classList.add("intro-seen");
    try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch { /* private mode: plays again next load */ }
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, []);

  /** Video → black (0.9s) → website fades in (1.3s) → unmount. */
  const finish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    setPhase("leaving");
    const v = video.current;
    const tl = gsap.timeline({
      onComplete: () => {
        v?.pause();
        v?.removeAttribute("src");
        v?.load(); // release the decoder / network
        setPhase("gone");
      },
    });
    if (v) {
      tl.to(v, { opacity: 0, duration: 0.9, ease: "power2.inOut" });
      if (!v.muted) tl.to(v, { volume: 0, duration: 0.9, ease: "power1.out" }, 0);
    }
    // reveal starts on black; the site underneath fades up as the black layer dissolves
    tl.add(release, ">-0.05");
    tl.to(layer.current, { opacity: 0, duration: 1.3, ease: "power2.inOut" }, ">");
  }, [release]);

  // Seen earlier this session (head script) → never show.
  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      finishing.current = true;
      setPhase("gone");
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }
  }, []);

  // Lock scrolling (Lenis + native) while the intro is on screen.
  useEffect(() => {
    if (phase === "gone") { lenis?.start(); return; }
    lenis?.stop();
  }, [phase, lenis]);

  // Autoplay with graceful fallbacks.
  useEffect(() => {
    const v = video.current;
    if (!v || finishing.current) return;
    let started = false;
    const onPlaying = () => { started = true; };
    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended", finish);
    v.addEventListener("error", finish);

    // Try with sound; browsers that block audible autoplay get the muted version.
    v.muted = !intro.tryAudio;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(finish); // autoplay fully blocked → go straight to the site
    });

    const skipTimer = window.setTimeout(() => setSkipVisible(true), 1200);
    // If nothing has started after a few seconds (slow network, data saver), don't hold the site hostage.
    const stallTimer = window.setTimeout(() => { if (!started) finish(); }, intro.maxWaitMs);
    // Absolute ceiling: never longer than the film plus a small margin.
    const hardTimer = window.setTimeout(finish, intro.maxTotalMs);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", finish);
      v.removeEventListener("error", finish);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(skipTimer); window.clearTimeout(stallTimer); window.clearTimeout(hardTimer);
    };
  }, [finish]);

  if (phase === "gone") return null;

  return (
    <div
      ref={layer}
      data-intro
      role="dialog"
      aria-label="Super Mimic introduction"
      className="fixed inset-0 z-[1000] h-[100dvh] w-screen overflow-hidden bg-black"
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover object-center portrait:object-contain"
        src={asset(intro.src)}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        aria-hidden
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={finish}
        className={`eyebrow absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-10 px-3 py-2 text-[9.5px] text-white/45 transition-[opacity,color] duration-700 hover:text-white/90 focus-visible:text-white md:bottom-7 md:right-8 ${skipVisible && phase === "playing" ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        Skip intro
      </button>
    </div>
  );
}
