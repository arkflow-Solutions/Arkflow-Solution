import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { PackagesCardsInteractive } from "@/components/pages/packages-cards-interactive";
import { BookCallButton } from "@/components/pages/book-call-button";
import {
  packageTerms,
  guarantee,
  matrix,
  upgradeRules,
  boundaries,
  pricingPolicy,
} from "@/lib/content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Packages: Respond, Operate, Scale",
  description:
    "Three levels, one system underneath. What each ArkFlow package is designed to solve, what it includes, and how the 30-Day Response Guarantee works.",
  path: "/packages",
});


/**
 * All scope on this page comes from the Canonical Package Specification
 * v1.0 as amended by docs/CANONICAL-SPEC-AMENDMENTS-v1.1.md.
 * AMENDMENT 2: no price, implementation fee or discount is published.
 * AMENDMENT 1: AI Voice Agent is Scale-only.
 * The spec wins over this file.
 */
export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Three packages. One system. Pick your stage."
        lead="Levels are organised by where your business is right now, not by feature lists. Each builds on the one before it — nothing is taken away as you grow, and upgrading carries no second implementation."
      />

      {/* Full package cards with approved copy */}
      <Section className="hairline !pt-16">
        <Container>
          <PackagesCardsInteractive />
          <Reveal delay={0.2}>
            <p className="mt-10 text-center font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              {packageTerms.minimumTerm}&ensp;·&ensp;{packageTerms.support}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Quotation model — replaces the published price list (Amendment 2) */}
      <Section className="hairline !py-16">
        <Container>
          <Reveal>
            <div className="rounded-card border border-blue/40 bg-surface/60 p-8 md:p-10">
              <h2 className="max-w-2xl text-subheading font-medium leading-snug">
                Every ArkFlow system is configured around how your business
                actually operates.
              </h2>
              <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                That is why we quote rather than publish a price list. The
                discovery call establishes what you actually need; the
                quotation follows from it.
              </p>
              <div className="mt-8">
                <BookCallButton size="large" withArrow>
                  Request a personalised quotation
                </BookCallButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The definitive comparison */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>The definitive comparison</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">
              Everything, side by side
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  ArkFlow package comparison: Respond, Operate and Scale
                </caption>
                <thead>
                  <tr className="border-b border-[color:var(--border-strong)]">
                    <th scope="col" className="py-4 pr-4 text-small font-medium text-[color:var(--text-tertiary)]">
                      &nbsp;
                    </th>
                    {matrix.columns.map((c) => (
                      <th key={c} scope="col" className="px-4 py-4">
                        <span className="font-mono text-eyebrow uppercase text-blue-soft">{c}</span>
                        {c === matrix.defaultColumn && (
                          <span className="ml-2 rounded-full bg-blue px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                            Default
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.rows.map((row) => (
                    <tr key={row.label} className="border-b border-[color:var(--border-subtle)]">
                      <th scope="row" className="py-4 pr-4 text-small font-normal text-[color:var(--text-secondary)]">
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-4 py-4 text-small">
                          {v === true ? (
                            <Check
                              size={16}
                              role="img"
                              aria-label="Included"
                              className="text-success"
                            />
                          ) : v === false ? (
                            <Minus
                              size={16}
                              role="img"
                              aria-label="Not included"
                              className="text-[color:var(--text-tertiary)]"
                            />
                          ) : (
                            <span className={i === 1 ? "text-white" : "text-[color:var(--text-secondary)]"}>{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The guarantee — full canonical text */}
      <Section className="hairline">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <Eyebrow>The only guarantee</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">{guarantee.name}</h2>
            <p className="mt-6 text-lead text-[color:var(--text-secondary)]">
              &ldquo;{guarantee.fullText}&rdquo;
            </p>
            <p className="mt-6 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              Evaluated proactively at Day 30 — you never have to ask
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Upgrade rules */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>Upgrades</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-heading font-semibold">
              Evidence-triggered, never calendar-triggered
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {upgradeRules.intro}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                What stays the same
              </h3>
              <ul className="mt-5 space-y-4">
                {upgradeRules.stays.map((s) => (
                  <li key={s} className="flex gap-3 text-body text-[color:var(--text-secondary)]">
                    <Check size={16} className="mt-1.5 shrink-0 text-success" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                What changes
              </h3>
              <ul className="mt-5 space-y-4">
                {upgradeRules.changes.map((s) => (
                  <li key={s} className="flex gap-3 text-body text-[color:var(--text-secondary)]">
                    <Check size={16} className="mt-1.5 shrink-0 text-blue-soft" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-prose text-body font-medium text-white">
              {upgradeRules.noFee}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Boundaries */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>Boundaries</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-heading font-semibold">
              What ArkFlow is — and is not
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              Clear boundaries keep delivery consistent. Anything outside a
              tier&apos;s scope is an upgrade or a priced add-on, stated in
              advance — never an unpriced inclusion, never a surprise invoice.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">Included</h3>
              <ul className="mt-5 space-y-4">
                {boundaries.includes.map((s) => (
                  <li key={s} className="flex gap-3 text-body text-[color:var(--text-secondary)]">
                    <Check size={16} className="mt-1.5 shrink-0 text-success" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">Not included</h3>
              <ul className="mt-5 space-y-4">
                {boundaries.excludes.map((s) => (
                  <li key={s} className="flex gap-3 text-body text-[color:var(--text-secondary)]">
                    <Minus size={16} className="mt-1.5 shrink-0 text-[color:var(--text-tertiary)]" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Pricing policy */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>Terms, plainly</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">Pricing policy</h2>
          </Reveal>
          <dl className="mt-12">
            {pricingPolicy.map((p, i) => (
              <Reveal key={p.term} delay={Math.min(i * 0.05, 0.2)}>
                <div className="grid gap-2 border-t border-[color:var(--border-subtle)] py-6 md:grid-cols-[200px_1fr] md:gap-8">
                  <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {p.term}
                  </dt>
                  <dd className="text-body text-[color:var(--text-secondary)]">{p.detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand title="Not sure which package fits?" body="That's what the discovery call is for. We map your enquiry-to-payment flow against your own numbers and recommend one tier — never a menu." />
    </>
  );
}
