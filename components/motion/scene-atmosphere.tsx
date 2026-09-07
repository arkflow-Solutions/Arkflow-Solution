"use client";

import { sectionLuminance, luminanceVars } from "@/lib/luminance";
import { cn } from "@/lib/utils";

/**
 * SceneAtmosphere — the environment layer for a cinematic section.
 *
 * Wraps a section and exposes its luminance to CSS as three custom
 * properties, which the atmosphere gradients in globals.css consume:
 *
 *   --lum-tint        the semantic colour (blue / amber / green)
 *   --lum-intensity   0 → 1, how present the light is
 *   --lum-bias        vertical position of the light pool
 *
 * WHY CUSTOM PROPERTIES RATHER THAN INLINE GRADIENTS
 * The gradients stay in the stylesheet where a designer can see them
 * together, and the component supplies only the three values that
 * change. It also means the atmosphere costs one style recalculation
 * per scroll frame rather than re-serialising a gradient string.
 *
 * NO LOOP. Nothing here animates on a timer. The caller passes progress
 * — from scroll, or from a one-shot reveal — and the environment
 * follows. When the visitor stops scrolling, the atmosphere stops too.
 * That is what makes it feel alive without costing anything at rest.
 *
 * CONTRACT FOR CALLERS. Both atmosphere layers paint at z-index 0, so
 * the wrapped section must position its own content plane — any child
 * that establishes z-index 1 or more sits above the light. There is no
 * catch-all child rule doing this for you, on purpose: one would clash
 * with the positioned children sections already have.
 *
 * REDUCED MOTION is the caller's decision, because the caller owns the
 * progress source. `useViewportProgress` already resolves to its final
 * value under reduced motion, so a section using it gets the settled
 * atmosphere rather than a dark one.
 */
export function SceneAtmosphere({
  /** How far this section's Throughline has advanced, 0 → 1. */
  progress,
  /** 0 = handovers open and leaking, 1 = closed. */
  seal = 1,
  /** The stage the section is about, and the peak of its light. */
  focusT,
  /** Where this section stretch of the Throughline begins. */
  fromT = 0,
  /** Phase 3F.1 emotional curve. See sectionLuminance. */
  emphasis = 1,
  /** Adds the depth vignette. Off for sections that sit flush. */
  vignette = true,
  as: Tag = "div",
  className,
  children,
}: {
  progress: number;
  seal?: number;
  focusT?: number;
  fromT?: number;
  emphasis?: number;
  vignette?: boolean;
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
}) {
  const lum = sectionLuminance(progress, seal, focusT, fromT, emphasis);

  return (
    <Tag
      className={cn("af-atmos", vignette && "af-atmos--vignette", className)}
      style={luminanceVars(lum)}
      data-lum-reason={lum.reason}
    >
      {children}
    </Tag>
  );
}
