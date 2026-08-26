"use client";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useBooking } from "@/lib/use-booking";
import { GHL_CALENDAR_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Opens the GoHighLevel booking widget. The one primary action on the site. */
export function BookingButton({
  children,
  size = "large",
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  size?: "default" | "large";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const open = useBooking(GHL_CALENDAR_URL);
  return (
    <Button onClick={open} size={size} variant={variant} className={className} withArrow>
      {children}
    </Button>
  );
}

/** Section header. Eyebrow, heading, optional lead — consistent everywhere. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
  wide = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  wide?: boolean;
}) {
  return (
    <Reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-6 text-heading font-semibold",
          wide ? "max-w-4xl" : "max-w-3xl"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/**
 * Rail — a hairline with a travelling light. Used between sections where
 * one idea feeds the next. Motion carries meaning (Amendment 3): the
 * light is the connection the whole site argues for.
 */
export function Rail({ className }: { className?: string }) {
  return (
    <div className={cn("af-rail", className)} aria-hidden>
      <span className="af-rail__pulse" />
    </div>
  );
}
