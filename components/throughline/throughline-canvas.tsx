"use client";

import { useEffect, useRef } from "react";
import {
  GAP_STAGE_INDICES,
  THROUGHLINE_COLOURS,
  THROUGHLINE_STAGES,
  gapProximity,
  pointAt,
  projectToBox,
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
  /**
   * Canonical t of the stage the page is currently about.
   *
   * PHASE 3F.2a — this is what turns the line from a drawn path into an
   * object with a location. Without it the whole line was stroked
   * uniformly, which reads as background: nothing on it was more
   * important than anything else, so nothing on it was the subject.
   *
   * With it, the line has a READABLE CORE around the active stage and
   * recedes away from it, and the opportunity sits in that neighbourhood
   * rather than anywhere. When the page moves to the next scene this
   * value changes, the bright region slides along the line and the
   * opportunity travels with it — which is the entire argument: the
   * same opportunity, moving through the business.
   *
   * Omit it and the line draws uniformly, which is correct for the
   * self-cycling use.
   */
  focus,
  /** Fewer followers, thinner strokes, lower DPR. Phones and tablets. */
  lite = false,
  className,
}: {
  seal?: number;
  focus?: number;
  lite?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  /** Read by the loop without restarting it on every scroll tick. */
  const sealRef = useRef(seal ?? 0);
  sealRef.current = seal ?? sealRef.current;
  /** Target. The loop eases toward it so scene changes travel. */
  const focusRef = useRef<number | undefined>(focus);
  focusRef.current = focus;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const driven = seal !== undefined;
    const maxParticles = lite ? 8 : 16;

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

    /**
     * How present the line is at a point, given where the page is.
     *
     * 1 at the active stage, falling to a floor away from it. The floor
     * is deliberately not zero: the rest of the journey should still be
     * sensed, so the visitor understands the active stage is part of
     * something longer. Distant portions recede to roughly a tenth of
     * the near ones, which is what stops the line competing with the
     * scene content in front of it.
     */
    const FALLOFF = 0.3;
    const FLOOR = 0.11;
    const presenceAt = (t: number, f: number | undefined) => {
      if (f === undefined) return 1;
      const d = Math.abs(t - f);
      const near = Math.max(0, 1 - d / FALLOFF);
      // Smoothstep, so the bright region has no hard edge.
      const eased = near * near * (3 - 2 * near);
      return FLOOR + (1 - FLOOR) * eased;
    };

    const drawSpine = (sealed: number, f: number | undefined) => {
      /* Stroked in segments rather than as one path, so presence can
         vary ALONG the line. This is still one line — not an underlay,
         not a halo, not a second decorative stroke. Segments below the
         visibility threshold are skipped entirely, which costs less
         than the single full-length stroke it replaces. */
      const STEPS = lite ? 44 : 64;
      const pts: { x: number; y: number; t: number }[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const p = projectToBox(pointAt(t), box());
        pts.push({ x: p.x, y: p.y, t });
      }

      ctx.strokeStyle = THROUGHLINE_COLOURS.idle.hex;
      ctx.lineCap = "round";
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const pres = presenceAt((a.t + b.t) / 2, f);
        if (pres < 0.05) continue;
        ctx.globalAlpha = pres;
        // The core thickens where the page is looking. A hair either
        // way — the difference should be felt, not measured.
        ctx.lineWidth = (lite ? 0.8 : 1) * (0.75 + pres * 0.75);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

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

    /**
     * THE OPPORTUNITY.
     *
     * Forty identical dots read as "flow", or worse as "particles" —
     * plural, ambient, decorative. The brief is that the visitor should
     * recognise ONE thing progressing through the system, so there is
     * now one lead marker that is unmistakably the subject, and a much
     * smaller number of faint followers behind it that give the line a
     * sense of traffic without competing for identity.
     *
     * This is a REDUCTION, not an addition: fewer moving elements than
     * before, one of which is legible.
     *
     * The lead does not run the whole line. It works the neighbourhood
     * of the active stage, so wherever the page is, the opportunity is
     * there — and when the stage changes the eased focus carries it
     * along the line to the next one.
     */
    let leadT = 0;
    const drawLead = (t: number, sealed: number, f: number | undefined) => {
      const p = projectToBox(pointAt(Math.max(0, Math.min(1, t))), box());
      const pres = presenceAt(t, f);
      // At an open handover the opportunity is the thing being lost, so
      // it carries the leak colour. Amber still only ever means loss.
      const atGap = gapProximity(t) > 0.8 && sealed < 0.5;
      const r = lite ? 2.6 : 3.2;

      ctx.globalAlpha = Math.min(1, 0.35 + pres * 0.65);
      ctx.fillStyle = atGap
        ? THROUGHLINE_COLOURS.leaking.hex
        : t >= 0.995
          ? THROUGHLINE_COLOURS.complete.hex
          : THROUGHLINE_COLOURS.flowing.hex;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      /* A single thin ring. Not a glow and not a bloom — one stroked
         circle, which is what makes the marker read as an object with
         an edge rather than a blurred dot of light. */
      ctx.globalAlpha = Math.min(1, 0.18 + pres * 0.4);
      ctx.lineWidth = 1;
      ctx.strokeStyle = ctx.fillStyle as string;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + (lite ? 2.4 : 3.2), 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const step = (sealed: number, f: number | undefined) => {
      ctx.clearRect(0, 0, width, height);
      drawSpine(sealed, f);

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
        ctx.arc(base.x, y, lite ? 1.1 : 1.4, 0, Math.PI * 2);
        ctx.fillStyle = p.lost
          ? THROUGHLINE_COLOURS.leaking.hex
          : p.t >= 0.999
            ? THROUGHLINE_COLOURS.complete.hex
            : THROUGHLINE_COLOURS.flowing.hex;
        /* Followers are subordinate to both the lead and the active
           region: they fade with distance from focus so the far end of
           the line never pulls the eye away from the scene. */
        const pres = presenceAt(p.t, f);
        ctx.globalAlpha = (p.lost ? Math.max(0, p.fade) : 0.55) * pres;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      drawLead(leadT, sealed, f);
    };

    /* Eased, not snapped. When the page moves to the next scene the
       focus target jumps to that stage; easing it means the bright
       region and the opportunity TRAVEL there along the line instead of
       teleporting. That journey between scenes is the whole point —
       it is the moment the visitor sees that it is the same thing. */
    let eased = focusRef.current ?? 0;

    const frame = () => {
      if (!visible) {
        running = false;
        return;
      }
      const sealed = driven
        ? Math.max(0, Math.min(1, sealRef.current))
        : // Self-cycling: open, seal, hold, reset.
          (Math.sin(Date.now() / 4200) + 1) / 2;

      const target = focusRef.current;
      let f: number | undefined;
      if (target !== undefined) {
        eased += (target - eased) * 0.035;
        f = eased;

        /* The opportunity works the stretch just before the active
           stage and passes through it, so it is always arriving at the
           thing the scene is about rather than sitting on it. */
        const from = Math.max(0, f - 0.16);
        const span = Math.max(0.08, f + 0.06 - from);
        leadT = from + ((Date.now() / 5200) % 1) * span;
      }

      step(sealed, f);
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
      leadT = focusRef.current ?? 0.6;
      step(1, focusRef.current);
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
      if (reduce) step(1, focusRef.current);
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
