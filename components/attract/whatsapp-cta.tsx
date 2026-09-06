"use client";

import { Button } from "@/components/ui/button";
import { whatsappLink, WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * WhatsApp CTA.
 *
 * Renders nothing if no number is configured, so the button can never
 * ship as a dead link. The prefill exists so the first message carries
 * its own context — an enquiry that says "I'd like a Website Review, my
 * site is X" is worth more than one that says "Hi".
 */
export function WhatsAppCta({
  label,
  prefill,
  location,
  variant = "primary",
  size,
  withArrow = false,
}: {
  label: string;
  prefill?: string;
  /** Analytics context — section name, never PII. */
  location: string;
  variant?: "primary" | "secondary";
  size?: "large";
  withArrow?: boolean;
}) {
  if (!WHATSAPP_URL) return null;

  return (
    <Button
      href={whatsappLink(prefill)}
      variant={variant}
      size={size}
      withArrow={withArrow}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("whatsapp_click", { location });
        track("website_review_click", { location });
      }}
    >
      {label}
    </Button>
  );
}
