"use client";

import { useId, useMemo } from "react";
import {
  GAP_STAGE_INDICES,
  THROUGHLINE_COLOURS,
  THROUGHLINE_STAGES,
  projectToBox,
  sampleThroughline,
  stagePoints,
  type ThroughlineState,
} from "@/lib/throughline";
import { cn } from "@/lib/utils";

/**
 * ThroughlineSvg — the Throughline as static, resolution-independent
 * vector. The quiet renderer.
 *
 * WHEN TO USE THIS ONE
 * Where the line is a diagram rather than a performance: alongside the
 * Revenue Engine, in a section transition, as the Attract → Capture
 * handoff. It draws once and holds. There is no animation loop, no
 * canvas context and no per-frame cost, so it can appear on a page that
 * already has a WebGL scene without competing for the GPU.
 *
 * Use ThroughlineCanvas instead when opportunities need to be seen
 * MOVING along the line. Use neither when the line would be ambient —
 * rule 4: it is drawn only when it carries meaning.
 *
 * ACCESSIBILITY
 * Decorative by default: aria-hidden, with the meaning living in the
 * DOM beside it. Pass `title` only when this SVG is genuinely the sole
 * carrier of the information, which should be rare — the stage names
 * and their meanings belong in real text, not in a graphic.
 *
 * REDUCED MOTION
 * Nothing here animates, so there is nothing to disable. That is the
 * point of having a static renderer: it is already the reduced-motion
 * answer for every context it appears in.
 */
export function ThroughlineSvg({
  /** How far the opportunity has travelled, 0 → 1. */
  progress = 1,
  /** 0 = handovers open and leaking, 1 = closed. */
  seal = 1,
  /** Draw the stage labels. Off by default — labels usually belong in DOM. */
  showLabels = false,
  /** Accessible name. Omit for decorative use (the default). */
  title,
  className,
  width = 1200,
  height = 260,
}: {
  progress?: number;
  seal?: number;
  showLabels?: boolean;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const uid = useId();
  const box = useMemo(
    () => ({ width, height, padding: 28 }),
    [width, height]
  );

  /** The spine, as an SVG path command. Sampled from the shared model. */
  const spine = useMemo(() => {
    const pts = sampleThroughline(96).map((p) => projectToBox(p, box));
    return pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");
  }, [box]);

  const stages = useMemo(
    () => stagePoints().map((s) => ({ ...s, ...projectToBox(s, box) })),
    [box]
  );

  /**
   * The travelled portion, as a dash offset over the whole spine. Using
   * one path with a dash offset rather than two paths keeps the join
   * seamless — two overlapping strokes show a seam at the boundary on
   * fractional device pixel ratios.
   */
  const clamped = Math.max(0, Math.min(1, progress));

  const decorative = !title;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-auto w-full", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : `${uid}-title`}
      focusable="false"
    >
      {!decorative && <title id={`${uid}-title`}>{title}</title>}

      <defs>
        {/* Soft falloff under the travelled section. Cheaper and calmer
            than a blur filter, which is expensive on mobile. */}
        <linearGradient id={`${uid}-flow`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0.15" />
          <stop offset="60%" stopColor={THROUGHLINE_COLOURS.flowing.hex} stopOpacity="0.9" />
          <stop offset="100%" stopColor={THROUGHLINE_COLOURS.complete.hex} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Structure: the whole line, unlit. Always present — the system
          exists before anything moves through it. */}
      <path
        d={spine}
        fill="none"
        stroke={THROUGHLINE_COLOURS.idle.hex}
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {/* Energy: the travelled portion. */}
      <path
        d={spine}
        fill="none"
        stroke={`url(#${uid}-flow)`}
        strokeWidth="1.75"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={`${clamped} ${1 - clamped}`}
      />

      {/* Gaps: breaks in the line where revenue leaks. They close as
          `seal` rises, which is the whole argument of the leak section. */}
      {GAP_STAGE_INDICES.map((i) => {
        const s = stages[i];
        const open = 1 - Math.max(0, Math.min(1, seal));
        if (open <= 0.001) return null;
        return (
          <g key={`gap-${s.stage.label}`}>
            <line
              x1={s.x - 9}
              x2={s.x + 9}
              y1={s.y}
              y2={s.y}
              stroke="var(--ink, #0A0E1A)"
              strokeWidth="4"
              opacity={open}
            />
            <circle
              cx={s.x}
              cy={s.y}
              r={2.5}
              fill={THROUGHLINE_COLOURS.leaking.hex}
              opacity={open}
            />
          </g>
        );
      })}

      {/* Nodes. A branch gets a second mark for the human handover — the
          one place green is permitted. */}
      {stages.map((s, i) => {
        const reached = s.stage.t <= clamped;
        const state: ThroughlineState = !reached
          ? "idle"
          : s.stage.kind === "branch"
            ? "human"
            : s.stage.kind === "completion"
              ? "complete"
              : "flowing";
        return (
          <g key={s.stage.label}>
            <circle
              cx={s.x}
              cy={s.y}
              r={s.stage.kind === "completion" ? 4 : 3}
              fill={THROUGHLINE_COLOURS[state].hex}
              opacity={reached ? 1 : 0.45}
            />
            {s.stage.kind === "branch" && reached && (
              <line
                x1={s.x}
                x2={s.x + 14}
                y1={s.y}
                y2={s.y - 16}
                stroke={THROUGHLINE_COLOURS.human.hex}
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.8"
              />
            )}
            {showLabels && (
              <text
                x={s.x}
                y={s.y + (i % 2 === 0 ? -14 : 22)}
                textAnchor="middle"
                fill="var(--text-tertiary, rgba(209,213,219,0.6))"
                fontSize="10"
                fontFamily="var(--font-mono), ui-monospace, monospace"
                letterSpacing="1.2"
              >
                {s.stage.label.toUpperCase()}
              </text>
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
 * Every visual Throughline should be accompanied by this, or by
 * equivalent copy already on the page. The rule is that no meaning lives
 * only in a graphic — a screen reader, a crawler and a reader with
 * images disabled all get the same journey.
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
