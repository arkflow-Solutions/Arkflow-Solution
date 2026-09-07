"use client";

import { useEffect, useState } from "react";

/**
 * useViewportProgress — how far an element has travelled through the
 * viewport, 0 → 1.
 *
 * WHY THIS EXISTS ALONGSIDE useScrollProgress
 * `useScrollProgress` (lib/use-scene-gate.ts) measures scroll progress
 * THROUGH a tall element — it drives the pinned leak section, where the
 * element is deliberately 200vh and the visitor scrolls inside it. Its
 * first act is `const total = r.height - window.innerHeight`, and it
 * returns 0 when that is negative. For any section shorter than the
 * viewport it therefore reports 0 forever, which is correct for its job
 * and useless for ours.
 *
 * This measures the opposite thing: an ordinary-height element moving
 * PAST the viewport. 0 as its top enters from below, 1 as its bottom
 * leaves at the top. That is what lets an atmosphere respond to where a
 * section sits on screen without pinning anything.
 *
 * Neither replaces the other and neither is modified. Pinned sections
 * keep using useScrollProgress.
 *
 * COST. rAF-throttled, passive listener, and it does nothing at all
 * under prefers-reduced-motion — the hook returns `settled` so callers
 * can render the resolved state instead of a mid-scroll one.
 */
export function useViewportProgress(
  ref: React.RefObject<HTMLElement>,
  /** Value returned when motion is reduced. The resolved state. */
  reducedValue = 1,
  /**
   * Quantise to this granularity before committing to state, so a
   * continuous scroll does not force a render on every frame. 0.02
   * gives at most 50 updates across a whole traversal.
   *
   * This does NOT make the result look stepped: consumers animate the
   * value with a CSS transition, which interpolates between the steps.
   * The steps are a render budget, not a visual quantisation.
   */
  step = 0
) {
  const [progress, setProgress] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(reducedValue);
      setSettled(true);
      return;
    }

    let frame = 0;
    let observing = false;

    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the top edge is at the bottom of the viewport,
      // 1 when the bottom edge has passed the top of it.
      const span = r.height + vh;
      const travelled = vh - r.top;
      const raw = Math.min(1, Math.max(0, travelled / span));
      const next = step > 0 ? Math.round(raw / step) * step : raw;
      // Bail before setState when nothing changed, so a scroll that
      // does not move this element past a step costs one measurement
      // and no render at all.
      setProgress((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (frame || !observing) return;
      frame = requestAnimationFrame(measure);
    };

    // Only listen while the element is anywhere near the viewport. An
    // offscreen section must not cost a scroll handler.
    const io = new IntersectionObserver(
      ([e]) => {
        observing = e.isIntersecting;
        if (observing) measure();
      },
      { rootMargin: "40% 0px" }
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, reducedValue, step]);

  return { progress, settled };
}
