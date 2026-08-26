"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";

/**
 * BookCallButton — opens the ArkFlow booking modal (GoHighLevel
 * booking widget). Kept as its own client component so server-rendered
 * pages (like /contact, which exports `metadata` and must stay a server
 * component) can still trigger it.
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
  const openBooking = useBooking(contact.call.href);
  return (
    <Button onClick={openBooking} className={className} size={size} withArrow={withArrow}>
      {children}
    </Button>
  );
}
