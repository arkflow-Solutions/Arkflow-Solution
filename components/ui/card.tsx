import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Highlighted cards (e.g. the Operate package) get a blue hairline. */
  emphasis?: boolean;
}

/**
 * Card — surface with a light-catch ring: when wrapped in <Tilt>, the
 * 1px border brightens exactly where the pointer is, as if the hairline
 * were catching a light the visitor carries. Subtle reflection, no glow.
 */
export function Card({
  className,
  emphasis = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-card border bg-surface p-8 shadow-card transition-all duration-300 ease-premium",
        "hover:-translate-y-1 hover:shadow-card-hover",
        emphasis
          ? "border-blue/60"
          : "border-[color:var(--border-subtle)] hover:border-[color:var(--border-strong)]",
        className
      )}
      {...props}
    >
      <span aria-hidden className="light-ring" />
      {children}
    </div>
  );
}
