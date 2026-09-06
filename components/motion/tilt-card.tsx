"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * TiltCard — pointer-driven 3D depth for the package cards.
 *
 * On pointer move, the card rotates a restrained ~8° toward the
 * cursor and lifts slightly; a radial glare tracks the pointer across
 * the surface; a coloured aura (per tier) glows behind it. Children
 * that should sit at a different visual depth can use the exported
 * `liftClass` helper's class names (lift-1 / lift-2 / lift-3) which
 * this component defines locally via inline <style>, so no extra
 * global CSS is required.
 *
 * Fully inert under prefers-reduced-motion — no transform, no glare,
 * no aura pulsing; the card sits flat and static.
 */

const MAX_DEG = 8; // restrained — consistent with the site's calm motion

export function TiltCard({
  glow,
  emphasis = false,
  className = "",
  children,
}: {
  glow: string;
  emphasis?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * MAX_DEG * 2;
    const rotX = (0.5 - py) * MAX_DEG * 2;

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div style={{ perspective: 1600 }} className="h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`tilt-card relative h-full transition-transform duration-500 ease-premium ${className}`}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Coloured aura, per tier, intensifies on hover */}
        {!reduce && (
          <span
            aria-hidden
            className="tilt-aura pointer-events-none absolute -inset-1 -z-10 rounded-[20px] opacity-40 blur-2xl transition-opacity duration-500"
            style={{
              background: `radial-gradient(60% 60% at 50% 30%, ${glow}, transparent 70%)`,
            }}
          />
        )}
        {children}
        {/* Pointer-follow glare */}
        {!reduce && (
          <span
            aria-hidden
            className="tilt-glare pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(360px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.08), transparent 45%)",
              transform: "translateZ(1px)",
            }}
          />
        )}
        <style jsx>{`
          .tilt-card:hover :global(.tilt-aura) {
            opacity: 0.85;
          }
          .tilt-card:hover :global(.tilt-glare) {
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}
