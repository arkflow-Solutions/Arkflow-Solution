"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Tilt — restrained pointer depth (max ±2.5°, soft spring) plus the
 * light-follow: it writes --mx/--my custom properties so the card's
 * hairline ring can catch the light where the pointer is. Disabled for
 * touch and reduced motion.
 */
export function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    ref.current.style.setProperty("--mx", `${mx}px`);
    ref.current.style.setProperty("--my", `${my}px`);
    ref.current.style.setProperty("--ring", "1");
    if (reduce) return;
    const px = mx / r.width - 0.5;
    const py = my / r.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    ref.current?.style.setProperty("--ring", "0");
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}
