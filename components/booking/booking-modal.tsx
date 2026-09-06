"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { contact } from "@/lib/content";

/**
 * BookingModal — a site-wide modal that embeds the GoHighLevel /
 * LeadConnector booking widget. Mounted once in app/layout.tsx.
 *
 * Every "Book Discovery Call" CTA calls useBooking() (see
 * lib/use-booking.ts), which dispatches "arkflow:open-booking". This
 * modal listens for that event and opens with the booking widget URL
 * from lib/content.ts (contact.call.href).
 *
 * THIRD-PARTY LOADING, changed 6 September 2026. The GoHighLevel resize
 * script (form_embed.js) previously loaded in app/layout.tsx on every
 * page. It is only needed to size this iframe, and this component
 * returns null until a visitor actually opens the modal — so both the
 * script and the iframe now load at that moment and not before.
 *
 * A visitor who never books never loads GoHighLevel at all. next/script
 * de-duplicates by src, so opening the modal repeatedly loads it once.
 */
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(contact.call.href);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { url?: string } | undefined;
      setUrl(detail?.url || contact.call.href);
      setOpen(true);
    };
    window.addEventListener("arkflow:open-booking", onOpen);
    return () => window.removeEventListener("arkflow:open-booking", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Loaded only now that the modal is open. Served from the
          white-label domain so the booking widget and its resize script
          share an origin. */}
      <Script
        src="https://link.arkflowsolutions.com/js/form_embed.js"
        strategy="lazyOnload"
      />
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a discovery call"
        className="relative z-10 flex w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        style={{ height: "min(88vh, 860px)" }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink transition-colors hover:bg-black/10"
        >
          <X size={18} aria-hidden />
        </button>
        {/* iframe fills the fixed-height card and scrolls its own content,
            so the whole booking form (incl. the submit button) is reachable
            regardless of GHL's internal height. */}
        <iframe
          key={url}
          id="arkflow-booking-iframe"
          src={url}
          title="ArkFlow — Book a discovery call"
          className="w-full flex-1"
          style={{ border: 0, minHeight: 0 }}
        />
      </div>
    </div>
  );
}
