"use client";

import Link from "next/link";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { BookingButton, SectionHead } from "@/components/home/v2/shared";
import { packages, howWeWork, faq, finalCta } from "@/lib/home-content";
import { PackageCards } from "@/components/home/package-cards";
import { cn } from "@/lib/utils";

/* ======================================================= 13 · PACKAGES
 * AMENDMENT 2: no price, no implementation fee, no discount appears on
 * this surface. Scope stays faithful to the Canonical Package Spec.
 * AMENDMENT 1: Voice AI appears under Scale only.
 * ------------------------------------------------------------------ */

const accentRing: Record<string, string> = {
  emerald: "before:bg-tier-emerald",
  violet: "before:bg-tier-violet",
  blue: "before:bg-tier-blue",
};

export function Packages() {
  return (
    <Section className="hairline" id="packages">
      <Container>
        <SectionHead
          eyebrow={packages.eyebrow}
          title={packages.title}
          lead={packages.lead}
        />

        <PackageCards />

        <Reveal className="mt-8">
          <p className="text-small text-[color:var(--text-tertiary)]">
            {packages.terms}
          </p>
        </Reveal>

        {/* Quotation model — replaces the published price list */}
        <Reveal className="mt-14">
          <div className="rounded-card border border-[color:var(--border-subtle)] bg-surface/60 p-8 md:p-10">
            <h3 className="max-w-2xl text-subheading font-medium leading-snug">
              {packages.quotation.title}
            </h3>
            <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
              {packages.quotation.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookingButton>{packages.quotation.cta}</BookingButton>
              <Button href="/packages" variant="secondary" size="large">
                Compare the levels
              </Button>
            </div>
          </div>
        </Reveal>

        {/* The single guarantee. 90 seconds appears here as its condition. */}
        <Reveal className="mt-6">
          <div className="rounded-card border border-blue/30 p-8">
            <p className="font-mono text-eyebrow uppercase text-blue-soft">
              {packages.guarantee.name}
            </p>
            <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
              {packages.guarantee.body}
            </p>
            <p className="mt-3 text-small text-[color:var(--text-tertiary)]">
              {packages.guarantee.note}
            </p>
          </div>
        </Reveal>

        {/*
          STAGE 1 DISCLOSURE. Relocated from the retired "One architecture"
          section, which is where it used to live. Governance-required —
          Founder Bible §1.5, §1.11. Do not remove when editing this section.
        */}
        {/* Amendment 8 (v1.4) — à-la-carte reference. No price, and
            deliberately not styled as a fourth tier. */}
        <Reveal className="mt-10">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body text-[color:var(--text-secondary)]">
            {packages.alaCarte.line}
            <Link
              href={packages.alaCarte.href}
              className="text-blue-soft underline underline-offset-4 hover:text-white"
            >
              {packages.alaCarte.cta} &rarr;
            </Link>
          </p>
        </Reveal>

        <Reveal className="mt-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body text-[color:var(--text-secondary)]">
            {packages.focus.line}
            <Link
              href={packages.focus.href}
              className="text-blue-soft underline underline-offset-4 hover:text-white"
            >
              {packages.focus.cta} &rarr;
            </Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ==================================================== 14 · HOW WE WORK */

export function HowWeWork() {
  return (
    <Section className="hairline" id="how-we-work">
      <Container>
        <SectionHead eyebrow={howWeWork.eyebrow} title={howWeWork.title} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] md:grid-cols-2 lg:grid-cols-5">
          {howWeWork.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04} className="bg-surface/60">
              <li className="h-full p-7">
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-body font-medium text-white">
                  {s.name}
                </h3>
                <p className="mt-3 text-small text-[color:var(--text-secondary)]">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ============================================================== FAQ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="hairline" id="faq">
      <Container>
        <SectionHead eyebrow={faq.eyebrow} title={faq.title} />

        <div className="mt-14 border-t border-[color:var(--border-subtle)]">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-b border-[color:var(--border-subtle)]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-body font-medium text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden
                      className={cn(
                        "shrink-0 text-[color:var(--text-tertiary)] transition-transform duration-300 ease-premium",
                        isOpen && "rotate-180 text-blue-soft"
                      )}
                    />
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!isOpen}>
                  <p className="max-w-prose pb-7 text-body text-[color:var(--text-secondary)]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ====================================================== 15 · FINAL CTA */

export function FinalCta() {
  return (
    <Section className="hairline">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-display font-semibold">
            {finalCta.title}
            <br />
            <span className="text-[color:var(--text-tertiary)]">
              {finalCta.titleAccent}
            </span>
          </h2>
          <p className="mt-8 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {finalCta.body}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <BookingButton>{finalCta.primaryCta}</BookingButton>
            <Button href="/contact" variant="secondary" size="large">
              {finalCta.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
