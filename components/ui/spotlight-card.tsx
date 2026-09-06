"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  emphasis?: boolean;
}

/**
 * SpotlightCard — a Card whose surface answers the pointer with a
 * soft radial light. The light is blue-tinted but far below the
 * blue-scarcity threshold; it reads as sheen, not accent.
 */
export function SpotlightCard({
  className,
  emphasis = false,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-card border bg-surface p-8 shadow-card",
        "transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover",
        emphasis
          ? "border-blue/60 hover:border-blue/80"
          : "border-[color:var(--border-subtle)] hover:border-[color:var(--border-strong)]",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.09), transparent 45%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
