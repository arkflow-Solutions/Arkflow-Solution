import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import {
  packages,
  packageTerms,
  guarantee,
  matrix,
  upgradeRules,
  boundaries,
  pricingPolicy,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "ArkFlow Respond, Operate and Scale — three packages, one system. Pricing, guarantee and terms from the Canonical Package Specification.",
};

/** All facts on this page are verbatim from the Canonical Package
 *  Specification v1.0. The spec wins over this file. */
export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Three packages. One system. Pick your stage."
        lead="Packages are organised by where your business is right now, not by feature lists. Each builds on the one before it — nothing is ever taken away as you grow, and upgrades carry no second implementation fee."
      />

      {/* Full package cards with approved copy */}
      <Section className="hairline !pt-16">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08}>
                <Tilt>
                  <Card
                    id={pkg.id}
                    emphasis={pkg.emphasis}
                    className={pkg.emphasis ? "lg:-mt-2" : ""}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-eyebrow uppercase text-blue-soft">
                        {pkg.name}
                      </p>
                      {"badge" in pkg && pkg.badge && (
                        <span className="rounded-full bg-blue px-3 py-1 font-mono text-eyebrow uppercase text-white">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 text-subheading font-medium">
                      {pkg.headline}
                    </h2>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="text-heading font-semibold">{pkg.price}</span>
                      <span className="text-small text-[color:var(--text-tertiary)]">/month</span>
                    </p>
                    {/* Approved copy — Canonical Package Specification §11 */}
                    <p className="mt-5 text-body text-[color:var(--text-secondary)]">
                      {pkg.copy}
                    </p>
                    <p className="mt-4 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      {pkg.priceNote}
                    </p>
                    <div className="mt-7">
                      <Button
                        href="/contact"
                        variant={pkg.emphasis ? "primary" : "secondary"}
                        className="w-full"
                        withArrow={pkg.emphasis}
                      >
                        Start with {pkg.name}
                      </Button>
                    </div>
                  </Card>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              {packageTerms.implementationFee}&ensp;·&ensp;{packageTerms.minimumTerm}&ensp;·&ensp;{packageTerms.support}
            </p>
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
                            <Check size={16} className="text-success" aria-label="Included" />
                          ) : v === false ? (
                            <Minus size={16} className="text-[color:var(--text-tertiary)]" aria-label="Not included" />
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
