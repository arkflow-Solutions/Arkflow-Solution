"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { PackagePanel } from "@/components/home/package-panel";
import { packages, accents, packageDetails } from "@/lib/content";

type DetailId = keyof typeof packageDetails;

/**
 * PackagesCardsInteractive — the /packages page's tier cards, wired to
 * the SAME shared-stage detail panel used on the homepage
 * (components/home/package-panel.tsx). No duplicated accordion: this
 * reuses openPackage's scroll-and-expand behaviour so "Start with X"
 * on this page does exactly what "Explore X" does on the homepage,
 * instead of forwarding straight to /contact.
 *
 * Pulled into its own client component because app/packages/page.tsx
 * exports `metadata` and must stay a server component for SEO.
 */
export function PackagesCardsInteractive() {
  const [openId, setOpenId] = useState<DetailId | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);

  const openPackage = useCallback(
    (id: DetailId) => {
      if (openId === id) {
        setOpenId(null);
        return;
      }
      shouldScrollRef.current = true;
      setOpenId(id);
    },
    [openId]
  );

  useEffect(() => {
    if (!openId || !shouldScrollRef.current) return;
    shouldScrollRef.current = false;

    const NAV_OFFSET = 88;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = stageRef.current;
        if (!el) return;
        const top =
          el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({
          top,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [openId]);

  return (
    <>
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {packages.map((pkg, i) => {
          const accent = accents[pkg.accent as keyof typeof accents];
          const isOpen = openId === pkg.id;
          const dimmed = openId !== null && !isOpen;
          return (
            <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
              <TiltCard
                glow={accent.glow}
                emphasis={pkg.emphasis}
                className={pkg.emphasis ? "lg:-mt-2" : ""}
              >
                <div
                  id={pkg.id}
                  className={`relative flex h-full flex-col overflow-hidden rounded-card border bg-surface p-8 shadow-card transition-all duration-300 ease-premium ${
                    dimmed ? "opacity-45" : "opacity-100"
                  }`}
                  style={{
                    borderColor: isOpen
                      ? accent.hex
                      : pkg.emphasis
                      ? accent.hex
                      : "var(--border-subtle)",
                    boxShadow: isOpen
                      ? `0 0 0 1px ${accent.hex}, 0 20px 60px -20px ${accent.hex}66`
                      : undefined,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-card"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.hex}, transparent)`,
                      transform: "translateZ(2px)",
                    }}
                  />
                  {pkg.emphasis && <span aria-hidden className="shimmer-sweep" />}
                  <div
                    className="lift-1 flex items-center justify-between"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <p
                      className="font-mono text-eyebrow uppercase"
                      style={{ color: accent.hex }}
                    >
                      {pkg.name}
                    </p>
                    {"badge" in pkg && pkg.badge && (
                      <span
                        className="rounded-full px-3 py-1 font-mono text-eyebrow uppercase text-ink"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="lift-1 mt-4 text-subheading font-medium">
                    {pkg.headline}
                  </h2>
                  <p className="lift-2 mt-5 flex items-baseline gap-2">
                    <span className="text-heading font-semibold">
                      {pkg.price}
                    </span>
                    <span className="text-small text-[color:var(--text-tertiary)]">
                      /month
                    </span>
                  </p>
                  {/* Approved copy — Canonical Package Specification §11 */}
                  <p className="lift-1 mt-5 text-body text-[color:var(--text-secondary)]">
                    {pkg.copy}
                  </p>
                  <p className="lift-1 mt-4 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {pkg.priceNote}
                  </p>
                  <div className="lift-3 mt-auto pt-7">
                    <Button
                      onClick={() => openPackage(pkg.id as DetailId)}
                      variant={isOpen || pkg.emphasis ? "primary" : "secondary"}
                      className="w-full"
                      withArrow={pkg.emphasis && !isOpen}
                    >
                      {isOpen ? `Close ${pkg.name}` : `Start with ${pkg.name}`}
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <div ref={stageRef} className="scroll-mt-24">
        <PackagePanel
          openId={openId}
          onClose={() => setOpenId(null)}
          onSwitch={(id) => setOpenId(id)}
        />
      </div>
    </>
  );
}
