"use client";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { track } from "@/lib/analytics";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * DiscoveryCallButton — the one primary action on the public website.
 *
 * REPLACES AuditButton, 6 September 2026 (founder decision). The Revenue
 * Leak Audit funnel is no longer the canonical website conversion. It was
 * an outbound link to go.arkflowsolutions.com/audit, which sent every
 * visitor off the site at the moment of highest intent.
 *
 * The canonical conversion is now "Book a Discovery Call", which keeps the
 * visitor on arkflowsolutions.com and opens the existing booking modal:
 *
 *   useBooking(contact.call.href)
 *     -> dispatches "arkflow:open-booking"
 *     -> <BookingModal /> (mounted once in app/layout.tsx)
 *     -> GHL calendar widget, ID dVmkLzktSpMYKEIXNBpz
 *
 * The calendar configuration is unchanged and comes from lib/site.ts via
 * lib/content.ts. Do not introduce a second calendar.
 *
 * The audit itself still exists as a separate system, and the site still
 * describes it as something that happens ON a discovery call. What it is
 * no longer is a button that leaves the website.
 *
 * Every instance is instrumented with the section it fired from.
 * scripts/verify.mjs check 12 enforces all of this.
 */
export function DiscoveryCallButton({
  children = "Book a Discovery Call",
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
  const openBooking = useBooking(contact.call.href);
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      withArrow
      onClick={() => {
        track("discovery_call_click", { location });
        openBooking();
      }}
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
