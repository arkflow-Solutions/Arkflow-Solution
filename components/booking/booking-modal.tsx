"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { contact } from "@/lib/content";

/**
 * BookingModal — the ArkFlow booking widget, in a dialog.
 *
 * Mounted once in app/layout.tsx. Every "Book a Discovery Call" CTA calls
 * useBooking() (lib/use-booking.ts), which dispatches
 * "arkflow:open-booking"; this listens and opens with the widget URL from
 * lib/content.ts (contact.call.href → BOOKING_URL → calendar
 * dVmkLzktSpMYKEIXNBpz). Do not introduce a second calendar.
 *
 * THIS IS NOW THE SITE'S ONLY CONVERSION. As of 6 September 2026 the
 * Revenue Leak Audit funnel is no longer the CTA, so every primary action
 * on the website ends here. It is worth more than a bare iframe.
 *
 * ACCESSIBILITY, added with that change:
 *  - focus moves to the close button on open, so a keyboard user is
 *    inside the dialog rather than still behind it;
 *  - Tab is trapped between the close button and the widget, so focus
 *    cannot wander into the page underneath;
 *  - focus returns to whichever CTA opened the modal on close, which is
 *    what makes it usable more than once;
 *  - Escape closes, the backdrop is inert to assistive tech, and the
 *    page behind is scroll-locked.
 *
 * The widget is a cross-origin iframe, so focus INSIDE it belongs to
 * GoHighLevel. The trap deliberately stops at the iframe boundary — from
 * there the browser hands off, and Escape still returns control here.
 *
 * LOADING STATE: the iframe is a third-party request over which we have
 * no speed control. Without a placeholder the dialog opens as a white
 * rectangle and reads as broken. The skeleton holds the frame until the
 * widget paints, and is removed on load.
 *
 * THIRD-PARTY LOADING: the GoHighLevel resize script (form_embed.js) used
 * to load in app/layout.tsx on every page. It is only needed to size this
 * iframe, and this component returns null until the modal is opened — so
 * a visitor who never books never loads GoHighLevel at all. next/script
 * de-duplicates by src, so repeated opens load it once.
 */
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(contact.call.href);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** The CTA that opened the modal, so focus can be handed back. */
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { url?: string } | undefined;
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setUrl(detail?.url || contact.call.href);
      setLoading(true);
      setOpen(true);
    };
    window.addEventListener("arkflow:open-booking", onOpen);
    return () => window.removeEventListener("arkflow:open-booking", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap. Only the close button and the widget are tabbable here, but
      // query rather than hardcode so this survives another control being
      // added later.
      const root = dialogRef.current;
      if (!root) return;
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus the dialog's own control, not the cross-origin widget.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  /* Hand focus back to the CTA that opened this. Runs on close only. */
  useEffect(() => {
    if (open) return;
    const opener = openerRef.current;
    openerRef.current = null;
    opener?.focus?.();
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
        onClick={close}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a discovery call"
        className="relative z-10 flex w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        style={{ height: "min(88vh, 860px)" }}
      >
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Close booking dialog"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink transition-colors hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <X size={18} aria-hidden />
        </button>

        {/* Placeholder while the third-party widget loads. aria-hidden and
            not a live region: the iframe announces itself when it lands,
            and a spinner narrating itself would only add noise. */}
        {loading && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white"
            aria-hidden
          >
            <div className="h-7 w-7 rounded-full border-2 border-black/10 border-t-blue motion-safe:animate-spin" />
            <p className="font-mono text-eyebrow uppercase tracking-wider text-black/40">
              Loading calendar
            </p>
          </div>
        )}

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
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
