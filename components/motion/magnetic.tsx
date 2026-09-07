"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic — a CTA that leans very slightly toward the pointer.
 *
 * Deferred from Phase 3B on the grounds that a 4px pull can only be
 * tuned against a finished composition. There is one now.
 *
 * THE WHOLE EFFECT IS 4 PIXELS. That is deliberate and it is the point:
 * the visitor should not notice the movement, only that the button felt
 * responsive. Anything larger reads as a gimmick, and the brief for this
 * design system is that motion confirms an action rather than performs.
 *
 * WHAT IT DOES NOT DO
 *  · Nothing on touch. Gated on `pointerType === "mouse"`, the same test
 *    TiltCard already uses — a touch device has no hover state to
 *    respond to and translating a button under a thumb is worse than
 *    leaving it still.
 *  · Nothing under prefers-reduced-motion.
 *  · Nothing to focus behaviour. The transform is on a wrapper, so the
 *    button keeps its own focus ring, its own hit area and its own
 *    keyboard behaviour. A keyboard user gets an unmoved, fully
 *    functional control.
 *  · No information. The pull carries no meaning, so nothing is lost
 *    when it does not run.
 *
 * COST. No state, no re-render, no loop. The pointer handler writes a
 * transform directly through a ref inside one rAF; on leave it clears.
 */

/** Maximum displacement in px. Do not raise this. */
const PULL = 4;

export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    // Offset from centre, normalised to -1 → 1, then scaled to PULL.
    let dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * PULL;
    let dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * PULL;
    // Clamp the VECTOR, not each axis. Scaling the axes independently
    // would let a corner reach PULL√2 ≈ 5.7px, which is over budget in
    // the direction a pointer most often approaches from.
    const mag = Math.hypot(dx, dy);
    if (mag > PULL) {
      dx = (dx / mag) * PULL;
      dy = (dy / mag) * PULL;
    }
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
    });
  };

  const reset = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={cn("af-magnetic", className)}
    >
      {children}
    </span>
  );
}
