"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * LeakFlow — the signature visual of the site.
 *
 * MEANING (Amendment 3: motion that carries meaning is permitted;
 * motion that performs is not). Opportunities travel along the customer
 * journey. At the handovers nobody owns, a proportion falls out and
 * fades in warning amber. As `seal` rises, those gaps close and the
 * same flow reaches the end in blue. The animation IS the argument of
 * the page, not decoration around it.
 *
 * COST. One 2D canvas, no WebGL, no textures, no dependency. Device
 * pixel ratio capped at 1.75. The loop stops entirely when the element
 * is offscreen or the tab is hidden, so an unseen canvas costs nothing.
 * Under prefers-reduced-motion nothing animates: a single static frame
 * is drawn showing the sealed state, which is still legible and still
 * carries the meaning.
 *
 * PALETTE. Locked tokens only. Blue #3B82F6 for opportunities in
 * flight, warning amber #D97706 exclusively for loss. Amber is a
 * functional state on this site and never appears decoratively.
 */

type LeakFlowProps = {
  /**
   * 0 = every handover open and leaking, 1 = every handover closed.
   * When omitted the component runs its own slow cycle, which is what
   * the hero fallback uses. When supplied by a scroll driver, the
   * visitor closes the gaps themselves by scrolling.
   */
  seal?: number;
  /** Fewer particles, thinner strokes. Phones and tablets. */
  lite?: boolean;
  className?: string;
};

const NODE_COUNT = 7;
const GAP_INDICES = [1, 3, 5];

export function LeakFlow({ seal, lite = false, className }: LeakFlowProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  // Read by the animation loop without restarting it on every scroll tick.
  const sealRef = useRef(seal ?? 0);
  sealRef.current = seal ?? sealRef.current;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const driven = seal !== undefined;
    const maxParticles = lite ? 26 : 46;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let last = 0;
    let phase = 0;

    type P = {
      x: number;
      y: number;
      vy: number;
      leaked: boolean;
      speed: number;
      size: number;
      alpha: number;
      passed: boolean[];
    };
    let particles: P[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /** A shallow curve biased right, so headline copy on the left stays legible. */
    function pathY(x: number) {
      const t = x / Math.max(width, 1);
      return height * 0.56 + Math.sin(t * Math.PI * 1.15) * (height * 0.1) - t * (height * 0.06);
    }
    function nodeX(i: number) {
      return width * 0.3 + (width * 0.74 - width * 0.3) * (i / (NODE_COUNT - 1)) + width * 0.06;
    }

    function spawn() {
      particles.push({
        x: width * 0.16 + Math.random() * width * 0.04,
        y: 0,
        vy: 0,
        leaked: false,
        speed: 42 + Math.random() * 26,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0,
        passed: [false, false, false],
      });
    }

    function currentSeal() {
      if (driven) return Math.max(0, Math.min(1, sealRef.current));
      // Self-cycling: open, seal, hold, reset.
      if (phase < 5.5) return 0;
      if (phase < 7) return (phase - 5.5) / 1.5;
      if (phase < 12.5) return 1;
      phase = 0;
      return 0;
    }

    function step(dt: number) {
      phase += dt;
      const s = currentSeal();

      if (particles.length < maxParticles && Math.random() < dt * 13) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.leaked) {
          p.vy += 210 * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 1.25;
          if (p.alpha <= 0) particles.splice(i, 1);
          continue;
        }

        p.x += p.speed * dt;
        p.y = pathY(p.x);
        p.alpha = Math.min(1, p.alpha + dt * 2.4);

        for (let g = 0; g < GAP_INDICES.length; g++) {
          if (!p.passed[g] && p.x > nodeX(GAP_INDICES[g])) {
            p.passed[g] = true;
            // At seal 0 roughly a sixth is lost per open handover.
            // At seal 1 the handover is closed and nothing is lost.
            if (Math.random() > s * 0.97 + 0.16) {
              p.leaked = true;
              p.vy = 8;
            }
          }
        }

        if (p.x > width * 1.05) particles.splice(i, 1);
      }
    }

    function draw() {
      const s = currentSeal();
      ctx!.clearRect(0, 0, width, height);

      // The journey path itself.
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let x = width * 0.12; x <= width * 0.98; x += 6) {
        const y = pathY(x);
        if (x === width * 0.12) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = "rgba(255,255,255,0.07)";
      ctx!.stroke();

      // Structural nodes. Gaps read amber while open, blue as they close.
      for (let i = 0; i < NODE_COUNT; i++) {
        const nx = nodeX(i);
        const ny = pathY(nx);
        const isGap = GAP_INDICES.indexOf(i) > -1;

        if (isGap) {
          ctx!.beginPath();
          ctx!.arc(nx, ny, 4.2, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(217,119,6,${0.28 + (1 - s) * 0.62})`;
          ctx!.lineWidth = 1.4;
          ctx!.stroke();
          if (s > 0.02) {
            ctx!.beginPath();
            ctx!.arc(nx, ny, 4.2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * s);
            ctx!.strokeStyle = `rgba(59,130,246,${0.45 + s * 0.5})`;
            ctx!.lineWidth = 1.8;
            ctx!.stroke();
          }
        } else {
          ctx!.beginPath();
          ctx!.arc(nx, ny, 2.6, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(209,213,219,0.24)";
          ctx!.fill();
        }
      }

      // Opportunities.
      for (const p of particles) {
        const a = Math.max(0, p.alpha);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size + 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = p.leaked
          ? `rgba(217,119,6,${a * 0.85})`
          : `rgba(59,130,246,${a * 0.92})`;
        ctx!.fill();

        if (!p.leaked) {
          ctx!.beginPath();
          ctx!.moveTo(p.x - 11, p.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(59,130,246,${a * 0.2})`;
          ctx!.lineWidth = p.size * 0.8;
          ctx!.stroke();
        }
      }
    }

    /** Reduced motion: one static frame of the sealed, working system. */
    function drawStatic() {
      resize();
      particles = [];
      for (let i = 0; i < 16; i++) {
        const x = width * (0.18 + i * 0.05);
        particles.push({
          x,
          y: pathY(x),
          vy: 0,
          leaked: false,
          speed: 0,
          size: 1.4,
          alpha: 1,
          passed: [true, true, true],
        });
      }
      sealRef.current = 1;
      phase = 8;
      draw();
    }

    function loop(t: number) {
      if (!running) return;
      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();

    if (reduce) {
      drawStatic();
      const onResizeStatic = () => drawStatic();
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { rootMargin: "120px 0px" }
          )
        : null;
    io?.observe(canvas);
    if (!io) start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // `seal` is read through sealRef so scroll updates never restart the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite, seal === undefined]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}
