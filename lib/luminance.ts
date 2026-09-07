/**
 * LUMINANCE — how the environment responds to the Throughline's state.
 *
 * The deferred Phase 3A item, now built. The premise: a visitor should
 * feel where they are in the story without being told. Attract is quiet
 * and nearly dark; the environment gathers light as the opportunity
 * enters the system at Capture; a gap warms to amber only where revenue
 * is actually leaking; the far end resolves.
 *
 * WHAT THIS IS NOT
 * Not a lighting engine and not a mood system. It returns two numbers
 * and a colour, which CSS custom properties then feed into radial
 * gradients already present in the design. There is no loop, no canvas
 * and no per-frame work — the caller supplies progress from scroll or
 * from a one-shot reveal, and the environment follows.
 *
 * SEMANTIC, NOT DECORATIVE
 * Tints come only from the approved palette, and each one keeps the
 * meaning it has everywhere else on the site:
 *
 *   blue        revenue moving        --blue / --blue-soft
 *   amber       revenue leaking       --warning
 *   green       a human took over     --success
 *
 * There is no tint for "looks nice". A stage that is not doing one of
 * those things gets the neutral ground and a lower intensity. That is
 * what stops this becoming a rainbow.
 *
 * Derived from THROUGHLINE_STAGES so it cannot drift from the model: add
 * a stage there and it acquires a luminance automatically from its kind.
 */

import { THROUGHLINE_STAGES, nearestStage, type ThroughlineKind } from "@/lib/throughline";

export type Luminance = {
  /** Hex, from the approved palette. Fed to CSS as --lum-tint. */
  tint: string;
  /** 0 → 1. How present the environment light is. --lum-intensity. */
  intensity: number;
  /** Vertical bias of the light pool, -1 (high) → 1 (low). --lum-bias. */
  bias: number;
  /** Why it looks like this. For the design system, not for the UI. */
  reason: string;
};

/** Approved palette. Nothing outside this list may be returned. */
const INK = "#0A0E1A";
const BLUE = "#1A3CFF";
const BLUE_SOFT = "#3B82F6";
const AMBER = "#D97706";
const GREEN = "#059669";

/**
 * Base luminance per stage kind. Intensity is deliberately low
 * throughout — the ceiling is 0.6, because the environment must never
 * compete with the line it is lighting.
 */
const BY_KIND: Record<ThroughlineKind, Omit<Luminance, "reason">> = {
  // A decision point. Present, unremarkable.
  node: { tint: BLUE_SOFT, intensity: 0.2, bias: 0 },
  // An unattended handover. Warmth ONLY when actually leaking — see
  // luminanceAt, which suppresses this entirely once sealed.
  gap: { tint: AMBER, intensity: 0.34, bias: 0.25 },
  // A person taking over. The one place green appears.
  branch: { tint: GREEN, intensity: 0.26, bias: -0.15 },
  // The line coming back. Quiet, returning energy.
  return: { tint: BLUE_SOFT, intensity: 0.22, bias: 0.1 },
  // Resolved.
  completion: { tint: BLUE, intensity: 0.3, bias: -0.1 },
};

/** Attract is the quietest point on the line, whatever its kind says. */
const ARRIVAL: Omit<Luminance, "reason"> = {
  tint: BLUE_SOFT,
  intensity: 0.12,
  bias: 0.05,
};

/** Nothing has happened yet. */
export const LUMINANCE_IDLE: Luminance = {
  tint: INK,
  intensity: 0,
  bias: 0,
  reason: "Before the opportunity arrives, the environment is inert.",
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** Smoothstep. No overshoot, no bounce — it only removes corners. */
const smooth = (n: number) => {
  const x = clamp01(n);
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/**
 * Luminance at a point on the Throughline.
 *
 * @param t        position on the line, 0 → 1
 * @param progress how far the opportunity has actually travelled. The
 *                 environment does not light ahead of the line.
 * @param seal     0 = handovers open and leaking, 1 = closed. A sealed
 *                 gap produces no amber at all, which is the entire
 *                 point of the leak argument.
 */
export function luminanceAt(
  t: number,
  progress = 1,
  seal = 1
): Luminance {
  const pos = clamp01(t);
  if (pos > clamp01(progress)) return LUMINANCE_IDLE;

  const stage = nearestStage(pos);
  const isFirst = stage.label === THROUGHLINE_STAGES[0].label;
  const base = isFirst ? ARRIVAL : BY_KIND[stage.kind];

  // A closed handover is not leaking, so it gets no warmth — it falls
  // back to an ordinary node. Amber is never ambient.
  if (stage.kind === "gap" && seal >= 0.999) {
    return {
      ...BY_KIND.node,
      reason: `${stage.label}: handover closed, so no loss to signal.`,
    };
  }

  // An open gap warms in proportion to how open it is.
  if (stage.kind === "gap") {
    return {
      ...base,
      intensity: base.intensity * (1 - seal),
      reason: `${stage.label}: revenue leaking at an unattended handover.`,
    };
  }

  return {
    ...base,
    reason: isFirst
      ? `${stage.label}: attention arriving, environment still quiet.`
      : `${stage.label}: ${stage.kind}.`,
  };
}

/* The shape of a section's light, as three numbers.

   PEAK   where in the section's travel the focus stage is reached. 0.5
          means the climax lands when the section is centred on screen,
          which is where a reader is actually looking at it.
   ARRIVE how much of the travel the fade-up occupies. Below this the
          section is effectively still dark.
   SETTLE how far the light falls back after the climax. It settles; it
          does not switch off, because the opportunity has not left —
          it has gone further into the system. */
const PEAK = 0.5;
const ARRIVE = 0.22;
const SETTLE = 0.28;

/**
 * The luminance a whole section carries as the opportunity travels
 * through it — a continuous response to progress, not a state.
 *
 * The section owns a STRETCH of the Throughline, from `fromT` to its
 * focus stage, and the light walks that stretch as the section crosses
 * the viewport: quiet at the near end, strongest exactly at the focus
 * stage, then easing back as the opportunity carries on past it.
 *
 * ONE SECTION, ONE COLOUR. The tint is pinned to the focus stage for
 * the whole traversal and only the intensity and the position of the
 * light pool move. This is the rule that makes continuous luminance
 * safe: interpolating tint between stages would cross-fade blue into
 * green into amber and produce exactly the rainbow this design system
 * forbids. Sections change colour by being about a different stage,
 * never mid-scroll.
 *
 * THE CEILING IS THE FOCUS STAGE. Nothing beyond it is consulted, so
 * the intensity can never climb past that stage's own value — 0.2 for
 * the Attract→Capture proof. The settle phase only ever multiplies
 * down. There is no configuration of this function that brightens.
 *
 * COST. Arithmetic on three numbers. No loop, no timer, no allocation
 * beyond the returned object; it is meant to be called from whatever
 * scroll mechanism the section already has.
 */
export function sectionLuminance(
  progress: number,
  seal = 1,
  /** Stage the section is about, and the peak of its light. */
  focusT?: number,
  /** Where the section's stretch of line starts. */
  fromT = 0,
  /**
   * PHASE 3F.1 — the emotional curve.
   *
   * Every scene previously resolved to roughly the same 0.2, so the page
   * was evenly toned and no moment could feel like a payoff. Contrast is
   * what makes a climax; a uniform average is what removes one.
   *
   * This scales a scene's light WITHOUT touching stage semantics: the
   * tint, the amber-only and green-only rules and the sealed-gap
   * behaviour are all unchanged. Problem scenes go below 1 so they sit
   * darker; the pivot and the close go above it so they can rise.
   *
   *   dark -> tension -> recognition -> transformation -> connection
   *   -> restrained landing
   *
   * Clamped to the 0.6 ceiling regardless of what is passed, so this
   * can never be used to make the environment compete with the line.
   */
  emphasis = 1
): Luminance {
  const p = clamp01(progress);
  if (p <= 0.001) return LUMINANCE_IDLE;

  const focus = focusT ?? THROUGHLINE_STAGES[1].t;
  // Both endpoints come from luminanceAt so the stage semantics — the
  // Attract override, a sealed gap resolving to an ordinary node — are
  // defined in exactly one place.
  const near = luminanceAt(fromT, 1, seal);
  const far = luminanceAt(focus, 1, seal);

  // Approach: the light walks from the near stage to the focus stage,
  // arriving exactly at PEAK, and holds there afterwards.
  const walk = smooth(Math.min(1, p / PEAK));
  // Arrival: fades up out of the dark rather than appearing.
  const arrive = smooth(Math.min(1, p / ARRIVE));
  // Departure: eases back once the climax is behind the reader.
  const settle =
    p <= PEAK ? 1 : 1 - SETTLE * smooth((p - PEAK) / (1 - PEAK));

  /** Hard ceiling. The environment lights the composition; it never
   *  competes with it, whatever emphasis a caller asks for. */
  const CEILING = 0.6;
  const shaped =
    lerp(near.intensity, far.intensity, walk) * arrive * settle * emphasis;

  return {
    tint: far.tint,
    intensity: Math.min(CEILING, shaped),
    bias: lerp(near.bias, far.bias, walk),
    reason:
      p < PEAK
        ? `Approaching ${nearestStage(focus).label}; the environment is gathering.`
        : `${far.reason} Past the threshold, the light settles.`,
  };
}

/** CSS custom properties for a luminance. Applied to a section wrapper. */
export function luminanceVars(l: Luminance): React.CSSProperties {
  return {
    ["--lum-tint" as string]: l.tint,
    ["--lum-intensity" as string]: l.intensity.toFixed(3),
    ["--lum-bias" as string]: `${(l.bias * 50).toFixed(1)}%`,
  } as React.CSSProperties;
}
