"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";
import { packages } from "@/lib/home-content";
import { track } from "@/lib/analytics";

type Tier = (typeof packages.tiers)[number];

/** One accent hue per tier. No cycling — the colour is an identifier. */
const ledHue: Record<string, string> = {
  emerald: "var(--success, #34d399)",
  violet: "#a78bfa",
  blue: "var(--blue)",
};

const tierId = (name: string) => name.toLowerCase();

export function PackageCards() {
  const [openTier, setOpenTier] = useState<Tier | null>(null);

  return (
    <>
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {packages.tiers.map((tier) => {
          const featured = "badge" in tier;
          return (
            <button
              key={tier.name}
              type="button"
              onClick={() => {
                setOpenTier(tier);
                track("package_expand", {
                  tier: tierId(tier.name) as "respond" | "operate" | "scale",
                  location: "homepage",
                });
              }}
              data-featured={featured}
              style={{ ["--af-led-hue" as string]: ledHue[tier.accent] }}
              className={cn(
                "af-led group h-full rounded-card border bg-surface/60 p-8 text-left",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                featured
                  ? "border-blue/40"
                  : "border-[color:var(--border-subtle)]"
              )}
              aria-haspopup="dialog"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-subheading font-medium">{tier.name}</h3>
                {featured && (
                  <span className="rounded-button border border-blue/50 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-blue-soft">
                    {tier.badge}
                  </span>
                )}
              </div>

              <p className="mt-4 text-body font-medium text-white">
                {tier.promise}
              </p>
              <p className="mt-3 text-small text-[color:var(--text-secondary)]">
                {tier.body}
              </p>

              <ul className="mt-8 space-y-2.5">
                {tier.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex gap-3 text-small text-[color:var(--text-tertiary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-blue-soft"
                    />
                    {inc}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-block font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
                What this looks like &rarr;
              </span>
            </button>
          );
        })}
      </div>

      <TierDialog tier={openTier} onClose={() => setOpenTier(null)} />
    </>
  );
}

/**
 * Expansion panel. A real dialog: focus is moved in, Escape closes,
 * background scroll is locked, focus returns to the card on close.
 *
 * GOVERNANCE: no price appears here. The panel explains what the level
 * is designed to accomplish and routes to the audit — which is where
 * scope, and therefore price, is actually established.
 */
function TierDialog({
  tier,
  onClose,
}: {
  tier: Tier | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openBooking = useBooking(contact.call.href);

  useEffect(() => {
    if (!tier) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [tier, onClose]);

  if (!tier) return null;
  const detail = "detail" in tier ? tier.detail : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${tier.name} — what this level is designed to do`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ ["--af-led-hue" as string]: ledHue[tier.accent] }}
        className="af-led max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-card border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] p-8 focus:outline-none md:rounded-card md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
              ArkFlow {tier.name}
            </p>
            <h3 className="mt-3 text-heading font-medium leading-tight text-white">
              {tier.promise}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-button border border-[color:var(--border-subtle)] p-2 text-[color:var(--text-tertiary)] transition-colors hover:text-white"
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        {detail && (
          <dl className="mt-8 space-y-6">
            {[
              ["Who it is for", detail.who],
              ["The core problem", detail.problem],
              ["What the system does", detail.system],
              ["What changes operationally", detail.changes],
            ].map(([label, text]) => (
              <div key={label}>
                <dt className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {label}
                </dt>
                <dd className="mt-2 text-body leading-relaxed text-[color:var(--text-secondary)]">
                  {text}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 border-t border-[color:var(--border-subtle)] pt-6">
          <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Includes
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {tier.includes.map((inc) => (
              <li
                key={inc}
                className="flex gap-3 text-small text-[color:var(--text-secondary)]"
              >
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-blue-soft" />
                {inc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            onClick={() => {
              track("lead_response_audit_click", {
                location: "package_dialog",
                tier: tierId(tier.name) as "respond" | "operate" | "scale",
              });
              openBooking();
            }}
          >
            Get Your Lead Response Audit
          </Button>
          <Button
            variant="secondary"
            href={`/packages#${tierId(tier.name)}`}
          >
            Compare all levels
          </Button>
        </div>
      </div>
    </div>
  );
}
