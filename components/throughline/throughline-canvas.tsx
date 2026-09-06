"use client";

import { useEffect, useRef } from "react";
import {
  GAP_STAGE_INDICES,
  THROUGHLINE_COLOURS,
  THROUGHLINE_STAGES,
  gapProximity,
  pointAt,
  projectToBox,
  sampleThroughline,
} from "@/lib/throughline";
import { cn } from "@/lib/utils";

/**
 * ThroughlineCanvas — the Throughline with opportunities moving along it.
 *
 * WHEN TO USE THIS ONE
 * Where the movement IS the argument: opportunities travelling, falling
 * out at a handover, and completing once the gaps close. If the line
 * only needs to be shown rather than watched, use ThroughlineSvg — it
 * costs nothing per frame.
 *
 * RELATIONSHIP TO components/motion/leak-flow.tsx
 * leak-flow is the existing, shipped signature visual of the homepage
 * and is NOT replaced by this. It draws a seven-node abstraction with
 * its own particle system, tuned over several iterations, and it works.
 *
 * This renderer exists so that FUTURE sections can show movement along
 * the same coordinates as the SVG and the 3D scenes, rather than
 * inventing a third path. Whether leak-flow eventually adopts this model
 * is a Phase 3F decision, taken with the canvas in front of us — not
 * something to force now. Two renderers sharing a model is the goal;
 * rewriting a working visual to prove the point is not.
 *
 * PERFORMANCE CONTRACT — matches leak-flow, which is the house standard:
 *  · One 2D context. No WebGL, no textures, no dependency.
 *  · DPR capped at 1.75 (1.25 in lite).
 *  · The loop stops entirely when offscreen or when the tab is hidden.
 *    An unseen canvas must cost nothing.
 *  · Under prefers-reduced-motion the loop never starts: one static
 *    frame is drawn in the resolved state, carrying the same meaning.
 *
 * PALETTE. Locked tokens only, via THROUGHLINE_COLOURS. Blue for
 * opportunities in flight, amber exclusively for loss, green exclusively
 * for a human taking over. Canvas cannot read CSS custom properties per
 * frame, which is why the model carries hex alongside the token name.
 */
export function ThroughlineCanvas({
  /**
   * 0 = every handover open and leaking, 1 = all closed. When supplied
   * by a scroll driver the visitor closes the gaps themselves; when
   * omitted the component runs its own slow cycle.
   */
  seal,
  /** Fewer particles, thinner strokes, lower DPR. Phones and tablets. */
  lite = false,
  className,
}: {
  seal?: number;
  lite?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  /** Read by the loop without restarting it on every scroll tick. */
  const sealRef = useRef(seal ?? 0);
  sealRef.current = seal ?? sealRef.current;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const driven = seal !== undefined;
    const maxParticles = lite ? 22 : 40;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let running = false;

    const dpr = () => Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const r = dpr();
      canvas.width = Math.round(width * r);
      canvas.height = Math.round(height * r);
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };

    type Particle = { t: number; speed: number; offset: number; lost: boolean; fade: number };
    let particles: Particle[] = [];

    const spawn = (): Particle => ({
      t: -Math.random() * 0.25,
      speed: 0.0016 + Math.random() * 0.0022,
      offset: (Math.random() - 0.5) * 6,
      lost: false,
      fade: 1,
    });

    const box = () => ({ width, height, padding: 22 });

    const drawSpine = (sealed: number) => {
      const pts = sampleThroughline(80).map((p) => projectToBox(p, box()));
      ctx.beginPath();
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = THROUGHLINE_COLOURS.idle.hex;
      ctx.lineWidth = lite ? 0.8 : 1;
      ctx.stroke();

      // Gaps: erase a short span at each unattended handover. They close
      // as `sealed` rises — the visual form of the argument.
      const open = 1 - sealed;
      if (open > 0.001) {
        for (const i of GAP_STAGE_INDICES) {
          const p = projectToBox(pointAt(THROUGHLINE_STAGES[i].t), box());
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7 * open, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const step = (sealed: number) => {
      ctx.clearRect(0, 0, width, height);
      drawSpine(sealed);

      for (const p of particles) {
        p.t += p.speed;

        // At a gap, an unsealed handover drops a proportion of the flow.
        if (!p.lost && gapProximity(p.t) > 0.85 && Math.random() < (1 - sealed) * 0.06) {
          p.lost = true;
        }

        if (p.t > 1.05) Object.assign(p, spawn());
        if (p.lost) {
          p.fade -= 0.03;
          if (p.fade <= 0) Object.assign(p, spawn());
        }
        if (p.t < 0) continue;

        const base = projectToBox(pointAt(Math.min(p.t, 1)), box());
        const y = base.y + p.offset * 0.35 + (p.lost ? (1 - p.fade) * 26 : 0);

        ctx.beginPath();
        ctx.arc(base.x, y, lite ? 1.5 : 1.9, 0, Math.PI * 2);
        ctx.fillStyle = p.lost
          ? THROUGHLINE_COLOURS.leaking.hex
          : p.t >= 0.999
            ? THROUGHLINE_COLOURS.complete.hex
            : THROUGHLINE_COLOURS.flowing.hex;
        ctx.globalAlpha = p.lost ? Math.max(0, p.fade) : 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const frame = () => {
      if (!visible) {
        running = false;
        return;
      }
      const sealed = driven
        ? Math.max(0, Math.min(1, sealRef.current))
        : // Self-cycling: open, seal, hold, reset.
          (Math.sin(Date.now() / 4200) + 1) / 2;
      step(sealed);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    particles = Array.from({ length: maxParticles }, spawn);

    if (reduce) {
      // Static, resolved, and still carrying the meaning: gaps closed,
      // flow complete. Never a blank frame.
      particles = particles.map((p, i) => ({
        ...p,
        t: i / maxParticles,
        lost: false,
      }));
      step(1);
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "150px 0px" }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      if (reduce) step(1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [seal, lite]);

  /* Decorative. The stage names and their meanings live in DOM beside
     this, never only here. */
  return <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />;
}
