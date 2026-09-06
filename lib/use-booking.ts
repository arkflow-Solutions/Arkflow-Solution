"use client";

/**
 * useBooking — opens the ArkFlow booking modal, which embeds the
 * GoHighLevel / LeadConnector booking widget. Calendly is retired; no
 * Calendly code, dependency or naming remains in the project.
 *
 * The booking widget URL is the single source of truth in lib/content.ts
 * (contact.call.href). A click dispatches a global event that the
 * <BookingModal /> (mounted once in app/layout.tsx) listens for.
 */

export function useBooking(url?: string) {
  return (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("arkflow:open-booking", { detail: { url } })
      );
    }
  };
}
