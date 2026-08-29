"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";
import { track } from "@/lib/analytics";

/**
 * BookCallButton — opens the ArkFlow booking modal (GoHighLevel
 * booking widget). Kept as its own client component so server-rendered
 * pages (like /contact, which exports `metadata` and must stay a server
 * component) can still trigger it.
 */
export function BookCallButton({
  className,
  size,
  variant,
  withArrow,
  children = "Book Discovery Call",
}: {
  className?: string;
  size?: "default" | "large";
  /** Secondary where another CTA already owns the primary emphasis. */
  variant?: "primary" | "secondary";
  withArrow?: boolean;
  children?: React.ReactNode;
}) {
  const openBooking = useBooking(contact.call.href);
  return (
    <Button
      onClick={() => {
        track("discovery_call_click", { location: "book_call_button" });
        openBooking();
      }}
      className={className}
      size={size}
      variant={variant}
      withArrow={withArrow}
    >
      {children}
    </Button>
  );
}
