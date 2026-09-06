"use client";

import { useEffect, useState } from "react";

export type SceneTier = "full" | "lite" | "none";

/**
 * Decides whether a 3D scene runs, and at what weight.
 *
 *   full  desktop / large screens — everything
 *   lite  phones and tablets — same scene, fewer elements, lower dpr,
 *         no per-frame DOM labels, battery-friendly GPU hint
 *   none  reduced-motion, or no WebGL2 — the 2D fallback renders
 *
 * Phones deliberately get a REAL scene rather than a flat substitute.
 * A clinic owner opening this between patients is the primary reader;
 * shipping them the version we spent least effort on would be the wrong
 * way round. The cost is managed by trimming the scene, not removing it.
 */
export function useSceneGate(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);
  const [tier, setTier] = useState<SceneTier | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 900px)");

    const evaluate = () => {
      if (motion.matches) return setTier("none");

      // No WebGL2 means no scene at all, regardless of preference.
      let ok = false;
      try {
        const c = document.createElement("canvas");
        ok = Boolean(c.getContext("webgl2"));
      } catch {
        ok = false;
      }
      if (!ok) return setTier("none");

      // Very low core counts are a decent proxy for a device that will
      // struggle. Conservative threshold: most phones since ~2018 pass.
      const cores = navigator.hardwareConcurrency ?? 4;
      if (cores <= 2) return setTier("none");

      setTier(small.matches ? "lite" : "full");
    };

    evaluate();
    motion.addEventListener("change", evaluate);
    small.addEventListener("change", evaluate);
    return () => {
      motion.removeEventListener("change", evaluate);
      small.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return {
    tier: tier ?? "none",
    lite: tier === "lite",
    use3d: tier === "full" || tier === "lite",
    inView,
    resolved: tier !== null,
  };
}

/** Scroll progress through an element, 0 → 1, rAF-throttled. */
export function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return setP(0);
        setP(Math.min(1, Math.max(0, -r.top / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return p;
}
