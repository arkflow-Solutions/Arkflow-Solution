"use client";

/**
 * useCalendly — opens the Calendly popup scheduling widget.
 *
 * The Calendly script (assets.calendly.com/assets/external/widget.js)
 * is loaded once, globally, from app/layout.tsx. This hook just returns
 * a click handler that calls window.Calendly.initPopupWidget with the
 * canonical booking link, defined once in lib/content.ts.
 *
 * CURRENT IMPLEMENTATION: the Calendly account/link is
 * https://calendly.com/kn-khairulnaim/new-meeting — replace in
 * lib/content.ts (contact.call.calendlyUrl) if the scheduling link
 * ever changes; every "Book Discovery Call" button site-wide reads
 * from that single source.
 */

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function useCalendly(url: string) {
  return (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      // Script not yet loaded (e.g. slow network) — fall back to a
      // direct navigation so the CTA never silently fails.
      window.open(url, "_blank");
    }
  };
}
