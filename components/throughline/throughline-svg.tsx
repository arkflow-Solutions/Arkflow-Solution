"use client";

import { useId, useMemo } from "react";
import {
  THROUGHLINE_COLOURS,
  THROUGHLINE_STAGES,
  pointAt,
  type ThroughlineStage,
} from "@/lib/throughline";
import { cn } from "@/lib/utils";

/**
 * ThroughlineSvg — the Throughline as a composed scene.
 *
 * WHAT CHANGED IN PHASE 3C, AND WHY
 * The first version drew the ten stages evenly across the full width.
 * Reviewed on the page, that read as an infographic: Attract → Capture,
 * which is the entire argument of the /attract handoff, occupied 9.5% of
 * the composition and the line was a hairline in a large empty panel.
 *
 * Three changes fix that, none of which touch the model:
 *
 *  1. PERSPECTIVE. Horizontal position is now `t ** perspective` rather
 *     than `t`. The near field — the stages the section is about —
 *     spreads out; later stages compress toward a vanishing point. This
 *     is depth without 3D, and it is presentation only: the canonical t
 *     values in lib/throughline.ts are untouched. At the default 0.6,
 *     Attract → Capture grows from 9.5% to 27% of the width.
 *
 *  2. TAPER. The spine is drawn as segments whose weight and opacity
 *     fall off with distance, so the line recedes rather than stopping.
 *     A single stroke cannot taper in SVG; segments can.
 *
 *  3. ASYMMETRIC PADDING. The old symmetric 28px put Attract hard on the
 *     left edge and its label half outside the panel. The lead-in needs
 *     room, so the left inset is much larger than the right.
 *
 * ONE LAYOUT, TWO CONSUMERS. `layoutThroughline()` is exported and is
 * the single place display positions are computed. This component uses
 * it for the geometry and the handoff uses it for the DOM markers, so
 * the labels cannot drift off the line — the failure the Phase 3C
 * renderer-agreement check caught the first time round.
 *
 * The model still owns the vertical shape (via pointAt) and the stage
 * data. The renderer owns only how that is presented.
 */

export type ThroughlineLayout = {
  width: number;
  height: number;
  padLeft: number;
  padRight: number;
  /** Exponent on t. 1 = linear, <1 = near field spreads, far compresses. */
  perspective: number;
  /** Vertical exaggeration of the model's shallow y, in px. */
  amplitude: number;
};

export const DEFAULT_LAYOUT: ThroughlineLayout = {
  width: 1200,
  height: 300,
  padLeft: 104,
  padRight: 56,
  perspective: 0.6,
  amplitude: 300,
};

/**
 * Narrow viewports get a different composition, not a smaller one.
 *
 * The desktop box is 4:1. Scaled to a 327px column that is 83px tall —
 * the line becomes a decorative squiggle and the argument is lost. This
 * layout is nearly 3:2, so it keeps real height, and it compresses the
 * far field harder (lower exponent) so Attract and Capture — the two
 * stages the section is actually about — take most of the width. The
 * distant stages still recede; there is simply less room for them, which
 * is the correct thing to sacrifice on a phone.
 */
export const NARROW_LAYOUT: ThroughlineLayout = {
  width: 640,
  height: 400,
  padLeft: 64,
  padRight: 34,
  perspective: 0.48,
  amplitude: 300,
};

/** Display position for a point on the line. The single source. */
export function layoutThroughline(l: ThroughlineLayout = DEFAULT_LAYOUT) {
  const innerW = l.width - l.padLeft - l.padRight;
  /**
   * The horizon sits above centre, not on it. The line lives in the
   * upper half and the labels hang below it, which is what stops the
   * panel having dead space under the composition.
   */
  const cy = l.height * 0.42;

  /** t (canonical) -> x (display). Perspective lives here and nowhere else. */
  const x = (t: number) =>
    l.padLeft + Math.pow(Math.max(0, Math.min(1, t)), l.perspective) * innerW;

  /**
   * t -> y. Shape comes from the model; the presentation converges it.
   *
   * Amplitude is scaled DOWN with display depth, so the near field gets
   * the model's full vertical travel and the far field flattens toward
   * the horizon. Without this the line kept descending as it receded,
   * which reads as a slope rather than as distance and fought the
   * horizontal perspective.
   */
  const y = (t: number) => {
    const depth = Math.pow(Math.max(0, Math.min(1, t)), l.perspective);
    return cy - pointAt(t).y * l.amplitude * (1 - depth * 0.82);
  };

  const point = (t: number) => ({ x: x(t), y: y(t) });

  const stages = THROUGHLINE_STAGES.map((stage) => ({
    stage,
    ...point(stage.t),
    /** 0 at Attract, 1 at Grow — drives the depth falloff. */
    depth: Math.pow(stage.t, l.perspective),
  }));

  return { ...l, innerW, cy, x, y, point, stages };
}

/** Percentage position of a stage, for DOM overlays on the same layout. */
export function stagePercent(stage: ThroughlineStage, l: ThroughlineLayout = DEFAULT_LAYOUT) {
  const { x } = layoutThroughline(l);
  return (x(stage.t) / l.width) * 100;
}

const SEGMENTS = 72;

export function ThroughlineSvg({
  /** How far the opportunity has travelled, 0 → 1 (canonical t). */
  progress = 1,
  /** 0 = handovers open and leaking, 1 = closed. */
  seal = 1,
  /** The stage the composition is about. Everything past it recedes. */
  focusStageIndex = 1,
  layout = DEFAULT_LAYOUT,
  title,
  className,
}: {
  progress?: number;
  seal?: number;
  focusStageIndex?: number;
  layout?: ThroughlineLayout;
  title?: string;
  className?: string;
}) {
  const uid = useId();
  const L = useMemo(() => layoutThroughline(layout), [layout]);
  const p = Math.max(0, Math.min(1, progress));

  const focus = L.stages[focusStageIndex] ?? L.stages[1];

  /**
   * The spine, as tapering segments. Weight and opacity fall away with
   * display depth so the far stages recede instead of ending abruptly.
   */
  const segments = useMemo(() => {
    const out: {
      d: string;
      w: number;
      o: number;
      lit: boolean;
      t: number;
    }[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const t0 = i / SEGMENTS;
      const t1 = (i + 1) / SEGMENTS;
      const a = L.point(t0);
      const b = L.point(t1);
      // Depth in display space, so the falloff matches what is seen.
      const d = Math.pow(t1, L.perspective);
      out.push({
        d: `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`,
        w: 3.2 - d * 2.35,
        o: 1 - d * 0.72,
        lit: t1 <= p,
        t: t1,
      });
    }
    return out;
  }, [L, p]);

  /** Capture activation: 0 until the line arrives, 1 shortly after. */
  const activation = Math.max(
    0,
    Math.min(1, (p - focus.stage.t) / 0.09)
  );

  const decorative = !title;

  return (
    <svg
      viewBox={`0 0 ${L.width} ${L.height}`}
      className={cn("h-auto w-full", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : `${uid}-t`}
      focusable="false"
    >
      {!decorative && <title id={`${uid}-t`}>{title}</title>}

      <defs>
        {/* The one place a gradient is used: the atmospheric pool that
            gathers where the opportunity enters the system. Radial and
            low-opacity — a wash, not a bloom. */}
        <radialGradient id={`${uid}-pool`}>
          <stop offset="0%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="0.30" />
          <stop offset="45%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0.10" />
          <stop offset="100%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0" />
        </radialGradient>
        {/* Lead-in: the opportunity arriving from outside the business. */}
        <linearGradient id={`${uid}-in`} x1="0" x2="1">
          <stop offset="0%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0" />
          <stop offset="100%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0.75" />
        </linearGradient>
        {/* The threshold at Capture. Fades out at both ends so it reads
            as a boundary the line crosses, not as a chart axis. */}
        <linearGradient id={`${uid}-gate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="0" />
          <stop offset="42%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="0.55" />
          <stop offset="58%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="0.55" />
          <stop offset="100%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------- atmosphere: light gathering at the handoff ---------- */}
      <ellipse
        cx={focus.x}
        cy={focus.y}
        rx={300}
        ry={150}
        fill={`url(#${uid}-pool)`}
        opacity={0.35 + activation * 0.65}
      />

      {/* ---------- the incoming signal, from outside the frame -------- */}
      <path
        d={`M0,${L.y(0).toFixed(1)} L${L.x(0).toFixed(1)},${L.y(0).toFixed(1)}`}
        stroke={`url(#${uid}-in)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity={Math.min(1, p * 6)}
      />

      {/* ---------- structure: the whole line, unlit ------------------- */}
      {segments.map((s, i) => (
        <path
          key={`s${i}`}
          d={s.d}
          stroke={THROUGHLINE_COLOURS.idle.hex}
          strokeWidth={s.w}
          strokeLinecap="round"
          fill="none"
          opacity={s.o * 0.85}
        />
      ))}

      {/* ---------- glow: a wider, faint pass under the lit section ----
          A second stroke rather than a blur filter. Filters are the
          expensive way to do this and are hard to keep restrained. */}
      {segments.map((s, i) =>
        s.lit ? (
          <path
            key={`g${i}`}
            d={s.d}
            stroke={THROUGHLINE_COLOURS.flowing.hex}
            strokeWidth={s.w * 3.6}
            strokeLinecap="round"
            fill="none"
            opacity={s.o * 0.1}
          />
        ) : null
      )}

      {/* ---------- energy: the travelled line ------------------------- */}
      {segments.map((s, i) =>
        s.lit ? (
          <path
            key={`e${i}`}
            d={s.d}
            stroke={
              s.t <= focus.stage.t
                ? THROUGHLINE_COLOURS.complete.hex
                : THROUGHLINE_COLOURS.flowing.hex
            }
            strokeWidth={s.w}
            strokeLinecap="round"
            fill="none"
            opacity={Math.min(1, s.o * 1.15)}
          />
        ) : null
      )}

      {/* ---------- gaps ------------------------------------------------ */}
      {L.stages.map((s) =>
        s.stage.kind === "gap" && seal < 0.999 ? (
          <circle
            key={`gap-${s.stage.label}`}
            cx={s.x}
            cy={s.y}
            r={7 * (1 - seal)}
            fill="var(--ink, #0A0E1A)"
          />
        ) : null
      )}

      {/* ---------- nodes ----------------------------------------------- */}
      {L.stages.map((s, i) => {
        const reached = s.stage.t <= p;
        const isFocus = i === focusStageIndex;
        const isFirst = i === 0;
        // Far nodes shrink and dim — the depth cue, from display depth.
        const r = isFocus ? 7 : isFirst ? 5 : Math.max(1.8, 4 - s.depth * 2.6);
        const dim = 1 - s.depth * 0.62;

        return (
          <g key={s.stage.label}>
            {/* Capture: the threshold. A vertical gate the line crosses,
                plus a halo that opens as the opportunity arrives. This
                is the one moment on the page that earns emphasis —
                everything before it is outside the business, everything
                after it is inside the system. */}
            {isFocus && activation > 0 && (
              <>
                <line
                  x1={s.x}
                  x2={s.x}
                  y1={s.y - 86}
                  y2={s.y + 62}
                  stroke={`url(#${uid}-gate)`}
                  strokeWidth="1.25"
                  opacity={activation}
                />
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={15 + activation * 11}
                  fill="none"
                  stroke={THROUGHLINE_COLOURS.complete.hex}
                  strokeWidth="1.1"
                  opacity={0.62 * activation}
                />
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={32 + activation * 20}
                  fill="none"
                  stroke={THROUGHLINE_COLOURS.flowing.hex}
                  strokeWidth="0.85"
                  opacity={0.26 * activation}
                />
                {/* Bright core, so the node reads as lit rather than
                    merely larger than its neighbours. */}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={3}
                  fill="#fff"
                  opacity={0.85 * activation}
                />
              </>
            )}

            {/* Attract: an open ring — arriving, not yet held. */}
            {isFirst ? (
              <circle
                cx={s.x}
                cy={s.y}
                r={r}
                fill="var(--ink, #0A0E1A)"
                stroke={THROUGHLINE_COLOURS.flowing.hex}
                strokeWidth="1.6"
                opacity={reached ? 1 : 0.5}
              />
            ) : (
              <circle
                cx={s.x}
                cy={s.y}
                r={r}
                fill={
                  !reached
                    ? THROUGHLINE_COLOURS.idle.hex
                    : isFocus
                      ? THROUGHLINE_COLOURS.complete.hex
                      : THROUGHLINE_COLOURS.flowing.hex
                }
                opacity={reached ? dim : dim * 0.55}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The stage list as real text.
 *
 * Every visual Throughline is accompanied by this, or by equivalent copy
 * already on the page. No meaning lives only in a graphic — a screen
 * reader, a crawler and a reader with images off all get the same
 * journey, in the same order.
 */
export function ThroughlineStageList({ className }: { className?: string }) {
  return (
    <ol className={cn("space-y-2", className)}>
      {THROUGHLINE_STAGES.map((s) => (
        <li key={s.label} className="flex gap-3 text-body">
          <span className="w-24 flex-none font-mono text-eyebrow uppercase text-blue-soft">
            {s.label}
          </span>
          <span className="text-[color:var(--text-secondary)]">{s.meaning}</span>
        </li>
      ))}
    </ol>
  );
}
