"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Luxury ambient sound. Uses a licensed audio file when `src` is provided;
 * otherwise synthesises a very soft, slowly breathing pad with WebAudio.
 * Never autoplays — only starts from an explicit user gesture. Fades in/out.
 */
export function useAmbientSound(src?: string, volume = 0.35) {
  const [on, setOn] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);

  const startSynth = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctx.current) {
      const c = new AC();
      const gain = c.createGain();
      gain.gain.value = 0;
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.Q.value = 0.6;
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 0.05;
      lfoGain.gain.value = 380;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();
      // D major 9 voicing, gently detuned — warm, unobtrusive.
      [73.42, 110, 146.83, 185, 220, 329.63].forEach((f, i) => {
        [-4, 4].forEach((det) => {
          const o = c.createOscillator();
          const g = c.createGain();
          o.type = i < 2 ? "sine" : "triangle";
          o.frequency.value = f;
          o.detune.value = det;
          g.gain.value = (i < 2 ? 0.16 : 0.07) / 2;
          o.connect(g).connect(filter);
          o.start();
        });
      });
      filter.connect(gain).connect(c.destination);
      ctx.current = c;
      master.current = gain;
    }
    const c = ctx.current!;
    c.resume();
    master.current!.gain.cancelScheduledValues(c.currentTime);
    master.current!.gain.setTargetAtTime(0.09 * volume * 2, c.currentTime, 1.2);
  };

  const stopSynth = () => {
    const c = ctx.current;
    if (!c || !master.current) return;
    master.current.gain.cancelScheduledValues(c.currentTime);
    master.current.gain.setTargetAtTime(0, c.currentTime, 0.5);
    setTimeout(() => c.state === "running" && !master.current?.gain.value && c.suspend(), 2500);
  };

  const fade = (el: HTMLAudioElement, to: number, done?: () => void) => {
    const from = el.volume, start = performance.now(), dur = 1400;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      el.volume = from + (to - from) * k;
      if (k < 1) requestAnimationFrame(step); else done?.();
    };
    requestAnimationFrame(step);
  };

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      if (src) {
        if (!audio.current) { audio.current = new Audio(src); audio.current.loop = true; audio.current.volume = 0; }
        const el = audio.current;
        if (next) { el.play().then(() => fade(el, volume)).catch(() => setOn(false)); }
        else fade(el, 0, () => el.pause());
      } else {
        next ? startSynth() : stopSynth();
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, volume]);

  // Pause when tab hidden; stop on unmount.
  useEffect(() => {
    const vis = () => { if (document.hidden && on) { audio.current?.pause(); ctx.current?.suspend(); } else if (on) { audio.current?.play().catch(() => {}); ctx.current?.resume(); } };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, [on]);
  useEffect(() => () => { audio.current?.pause(); ctx.current?.close(); }, []);

  return { on, toggle };
}
