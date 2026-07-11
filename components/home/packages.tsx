"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MessageSquare,
  Users,
  BarChart3,
  CalendarCheck,
  Receipt,
  Globe,
  Phone,
  RefreshCw,
  UserCheck,
  ArrowUpRight,
  Wrench,
  Unlock,
  Timer,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { PackagePanel } from "@/components/home/package-panel";
import {
  packages,
  packageTerms,
  accents,
  packageIncludes,
  packageAssurances,
  packageDetails,
} from "@/lib/content";

/**
 * Package preview — facts and pricing verbatim from the Canonical
 * Package Specification v1.0. Presentation: each tier carries its own
 * accent colour (emerald / violet / blue) plus pointer-driven 3D depth
 * via TiltCard — a restrained ~8° tilt with parallax layers, a
 * coloured aura, and a glare that follows the cursor. The feature
 * detail lives in a scannable icon grid rather than dense prose.
 */

const iconMap = {
  MessageSquare, Users, BarChart3, CalendarCheck, Receipt,
  Globe, Phone, RefreshCw, UserCheck,
  ArrowUpRight, Wrench, Unlock, Timer,
} as const;

type DetailId = keyof typeof packageDetails;

export function Packages() {
  const [openId, setOpenId] = useState<DetailId | null>(null);
  // Ref to the shared detail panel's anchor, so we can scroll to it
  // *after* the accordion has expanded.
  const stageRef = useRef<HTMLDivElement>(null);
  // Tracks whether the last open was triggered by an Explore click
  // (which should scroll) versus a tier-switch inside the panel (which
  // should not yank the viewport around).
  const shouldScrollRef = useRef(false);

  /**
   * openPackage — single reusable entry point for the Explore buttons.
   * Updates the active package (which expands that accordion and, via
   * the single-openId model, collapses the others), then flags that a
   * scroll should follow once the DOM has updated.
   */
  const openPackage = useCallback(
    (id: DetailId) => {
      // Clicking the already-open card's button closes it (toggle),
      // and shouldn't scroll.
      if (openId === id) {
        setOpenId(null);
        return;
      }
      shouldScrollRef.current = true;
      setOpenId(id);
    },
    [openId]
  );

  // After openId changes and the panel has rendered/expanded, smoothly
  // scroll the panel into view with an offset for the sticky navbar.
  // rAF waits one frame so layout reflects the expanded accordion
  // before we measure and scroll — no jump, no double animation.
  useEffect(() => {
    if (!openId || !shouldScrollRef.current) return;
    shouldScrollRef.current = false;

    const NAV_OFFSET = 88; // sticky nav height + breathing room

    const raf = requestAnimationFrame(() => {
      // second frame: the expand animation has begun and heights are
      // resolving; scroll to the panel's top, offset for the nav.
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
    <Section id="packages" className="hairline relative overflow-hidden">
      <Container>
        <Reveal className="text-center">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-heading font-semibold">
            Three packages. One system. Pick your stage.
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
            Every package builds on the one before it — nothing is taken away
            as you grow, and upgrades carry no second setup fee.
          </p>
        </Reveal>

        {/* Tier cards — coloured, with pointer-driven 3D depth.
            When a panel is open, the unselected cards dim to focus
            attention on the shared stage below. */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const accent = accents[pkg.accent as keyof typeof accents];
            const isOpen = openId === pkg.id;
            const dimmed = openId !== null && !isOpen;
            return (
              <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
                <TiltCard
                  glow={accent.glow}
                  emphasis={pkg.emphasis}
                  className={pkg.emphasis ? "lg:-mt-4" : ""}
                >
                  <div
                    id={pkg.id}
                    className={`relative flex h-full flex-col overflow-hidden rounded-card border bg-surface p-8 shadow-card transition-all duration-300 ease-premium ${
                      pkg.emphasis ? "lg:pb-10" : ""
                    } ${dimmed ? "opacity-45" : "opacity-100"}`}
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
                    {pkg.emphasis && (
                      <span aria-hidden className="shimmer-sweep" />
                    )}

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

                    <h3 className="lift-1 mt-4 text-subheading font-medium">
                      {pkg.headline}
                    </h3>

                    <p className="lift-2 mt-5 flex items-baseline gap-2">
                      <span className="text-heading font-semibold">
                        {pkg.price}
                      </span>
                      <span className="text-small text-[color:var(--text-tertiary)]">
                        /month
                      </span>
                    </p>
                    <p className="lift-1 mt-2 text-small text-[color:var(--text-tertiary)]">
                      {pkg.priceNote}
                    </p>

                    <ul className="lift-1 mt-7 space-y-3">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-3 text-small text-[color:var(--text-secondary)]"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: accent.hex }}
                            aria-hidden
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="lift-3 mt-auto pt-8">
                      <Button
                        onClick={() => openPackage(pkg.id as DetailId)}
                        variant={
                          isOpen || pkg.emphasis ? "primary" : "secondary"
                        }
                        className="w-full"
                        withArrow={pkg.emphasis && !isOpen}
                      >
                        {isOpen ? `Close ${pkg.name}` : `Explore ${pkg.name}`}
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Shared stage — the in-place detail panel opens here, directly
            beneath the row of cards. Switching tiers cross-fades inside
            it without collapsing. The ref is the scroll target for the
            Explore buttons; scroll-mt gives a sticky-nav offset. */}
        <div ref={stageRef} className="scroll-mt-24">
          <PackagePanel
            openId={openId}
            onClose={() => setOpenId(null)}
            onSwitch={(id) => setOpenId(id)}
          />
        </div>

        {/* Terms line, "What's included" grid and the assurance strip
            collapse away while a detail panel is open — the panel
            carries its own feature grid, so showing both would
            duplicate. They animate back when the panel closes. */}
        <AnimatePresence initial={false}>
          {openId === null && (
            <motion.div
              key="overview-extras"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Terms line */}
              <p className="mt-10 text-center font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                {packageTerms.implementationFee}&ensp;·&ensp;{packageTerms.minimumTerm}
              </p>

              {/* What's included — icon grid */}
              <div className="mt-24">
                <Eyebrow>What&apos;s included</Eyebrow>
                <h3 className="mt-4 max-w-2xl text-subheading font-medium">
                  One connected system, switched on by tier
                </h3>
              </div>
              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {packageIncludes.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div key={item.name} className="group flex gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[color:var(--border-subtle)] bg-white/[0.02] transition-transform duration-300 ease-premium group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-white/20">
                        <Icon size={18} className="text-blue-soft" aria-hidden />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-body font-medium text-white">
                            {item.name}
                          </h4>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                            {item.tier}
                          </span>
                        </div>
                        <p className="mt-1 text-small text-[color:var(--text-secondary)]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Assurance strip */}
              <div className="mt-20 grid gap-x-8 gap-y-8 border-t border-[color:var(--border-subtle)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
                {packageAssurances.map((a) => {
                  const Icon = iconMap[a.icon as keyof typeof iconMap];
                  return (
                    <div key={a.title}>
                      <Icon size={20} className="text-blue-soft" aria-hidden />
                      <h4 className="mt-4 text-body font-medium text-white">
                        {a.title}
                      </h4>
                      <p className="mt-2 text-small text-[color:var(--text-secondary)]">
                        {a.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
