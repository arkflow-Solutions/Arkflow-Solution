"use client";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { track } from "@/lib/analytics";
import { AUDIT_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * AuditButton — the one primary action on the public website.
 *
 * The Revenue Leak Audit is the canonical CTA (founder ruling,
 * 6 Sep 2026) and it lives on a separate funnel, so this is a real
 * outbound link rather than a modal. Every instance is instrumented
 * with the section it fired from.
 */
export function AuditButton({
  children = "Get your Revenue Leak Audit",
  location,
  size = "large",
  variant = "primary",
  className,
}: {
  children?: React.ReactNode;
  /** Section identifier, e.g. 'homepage_hero'. Never PII. */
  location: string;
  size?: "default" | "large";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Button
      href={AUDIT_URL}
      target="_blank"
      size={size}
      variant={variant}
      className={className}
      withArrow
      onClick={() => track("revenue_leak_audit_click", { location })}
    >
      {children}
    </Button>
  );
}

/**
 * SectionHead — eyebrow, heading, optional lead. Identical rhythm to
 * the v2 primitive so the two generations of sections sit together
 * without a visible seam.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
  wide = false,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  wide?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-6 text-heading font-semibold",
          wide ? "max-w-4xl" : "max-w-3xl",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/**
 * StageNumber — mono ordinal. Used only where the content genuinely is
 * a sequence: the ten-stage engine, the leak path, the retention arc.
 */
export function StageNumber({
  n,
  active = false,
  className,
}: {
  n: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-eyebrow uppercase transition-colors duration-300",
        active ? "text-blue-soft" : "text-[color:var(--text-tertiary)]",
        className
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/**
 * IllustrativeTag — the honesty marker. Any interface, dataset or
 * scenario that is representative rather than real carries one of
 * these. Amber is the site's functional warning colour and is used
 * here deliberately so the label reads as a caveat, not a badge.
 */
export function IllustrativeTag({ children = "Illustrative" }: { children?: React.ReactNode }) {
  return (
    <span className="af-illus">{children}</span>
  );
}
