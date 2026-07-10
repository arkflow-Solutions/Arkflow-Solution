"use client";

import { Button } from "@/components/ui/button";
import { useCalendly } from "@/lib/use-calendly";
import { contact } from "@/lib/content";

/**
 * BookCallButton — the one place that actually opens the Calendly
 * popup. Pulled into its own client component so server-rendered pages
 * (like /contact, which exports `metadata` and must stay a server
 * component) can still trigger the widget.
 */
export function BookCallButton({
  className,
  size,
  withArrow,
  children = "Book Discovery Call",
}: {
  className?: string;
  size?: "default" | "large";
  withArrow?: boolean;
  children?: React.ReactNode;
}) {
  const openCalendly = useCalendly(contact.call.href);
  return (
    <Button onClick={openCalendly} className={className} size={size} withArrow={withArrow}>
      {children}
    </Button>
  );
}
