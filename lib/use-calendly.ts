"use client";

/**
 * useCalendly — the hook name is kept for backwards-compatibility so every
 * existing "Book Discovery Call" call site keeps working unchanged, but it
 * NO LONGER opens Calendly. It now opens the ArkFlow booking modal, which
 * embeds the GoHighLevel / LeadConnector booking widget.
 *
 * The booking widget URL is the single source of truth in lib/content.ts
 * (contact.call.href). A click dispatches a global event that the
 * <BookingModal /> (mounted once in app/layout.tsx) listens for.
 */

export function useCalendly(url?: string) {
  return (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("arkflow:open-booking", { detail: { url } })
      );
    }
  };
}
