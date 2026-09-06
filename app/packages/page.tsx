import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { BookCallButton } from "@/components/pages/book-call-button";
import { Button } from "@/components/ui/button";
import {
  packagesHero,
  packageLayers,
  packageBoundaries,
  packageTerms,
  packagesCta,
} from "@/lib/packages-content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What we build",
  description:
    "The range of what ArkFlow builds and operates — the website and digital experience, the infrastructure that captures and answers enquiries, and the operations that follow up, retain and reactivate customers.",
  path: "/packages",
});

/**
 * /packages — restored 7 September 2026, rebuilt rather than recovered.
 *
 * The original route published the Respond / Operate / Scale ladder and
 * the 30-Day Response Guarantee, and was deleted in the v3 build for that
 * reason. What returns is the structure — layers, explicit boundaries,
 * plain terms — with current content and no commercial claims.
 *
 * NO PRICING, NO TIERS, NO GUARANTEE, NO CONTRACT TERMS, NO DELIVERY
 * COMMITMENTS. The three layers are conceptual groupings of the canonical
 * engine stages, not products to choose between. Constraints are
 * documented at the head of lib/packages-content.ts and the relevant ones
 * are enforced by scripts/verify.mjs.
 *
 * Deliberately built from existing primitives — PageHero, Section,
 * Container, Eyebrow, Reveal, Button — so it belongs to the current
 * design system. The cinematic pass is Phase 3; this page must not
 * introduce a visual language ahead of it.
 */
export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow={packagesHero.eyebrow}
        title={packagesHero.title}
        lead={packagesHero.lead}
      />

      <Container>
        <div className="flex flex-wrap items-center gap-4 pb-4">
          <BookCallButton size="large" withArrow>
            {packagesCta.primary}
          </BookCallButton>
          <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
            {packagesHero.note}
          </p>
        </div>
      </Container>

      {/* ------------------------------------------------ THE LAYERS */}
      {packageLayers.map((layer) => (
        <Section key={layer.id} id={layer.id} className="hairline scroll-mt-24">
          <Container>
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {layer.index}
                </span>
                <Eyebrow>{layer.name}</Eyebrow>
              </div>
              <h2 className="mt-6 max-w-3xl text-heading font-semibold">
                {layer.promise}
              </h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {layer.lead}
              </p>

              {/* Which canonical stages this layer covers. The engine is
                  the spine of the page — reproduced verbatim, never
                  reworded to make a layer read more neatly. */}
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Revenue Engine stages covered">
                {layer.stages.map((stage) => (
                  <li
                    key={stage}
                    className="rounded-button border border-[color:var(--border-subtle)] bg-surface/60 px-3 py-1.5 font-mono text-eyebrow uppercase text-blue-soft"
                  >
                    {stage}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] md:grid-cols-2">
              {layer.includes.map((item, i) => (
                <Reveal key={item} delay={i * 0.03} className="bg-surface/60">
                  <p className="p-6 text-body text-[color:var(--text-secondary)] md:p-7">
                    {item}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
                {layer.note}
              </p>
              <Link
                href={layer.href}
                className="mt-4 inline-block text-small text-blue-soft underline-offset-4 hover:underline"
              >
                {layer.hrefLabel} &rarr;
              </Link>
            </Reveal>
          </Container>
        </Section>
      ))}

      {/* ------------------------------------------------- BOUNDARIES */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{packageBoundaries.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              {packageBoundaries.title}
            </h2>
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {packageBoundaries.lead}
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {packageBoundaries.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <dt className="text-body font-medium text-white">
                  {item.title}
                </dt>
                <dd className="mt-2 max-w-prose text-body text-[color:var(--text-secondary)]">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ------------------------------------------------------ TERMS */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{packageTerms.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              {packageTerms.title}
            </h2>
          </Reveal>

          <ol className="mt-14 space-y-px overflow-hidden rounded-card border border-[color:var(--border-subtle)]">
            {packageTerms.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05} className="bg-surface/60">
                <li className="grid gap-6 p-8 md:grid-cols-[140px_1fr] md:p-10">
                  <div>
                    <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-subheading font-medium">
                      {s.name}
                    </h3>
                  </div>
                  <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
              {packageTerms.note}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- CTA */}
      <Section className="hairline">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="text-heading font-semibold">{packagesCta.title}</h2>
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {packagesCta.lead}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BookCallButton size="large" withArrow>
                {packagesCta.primary}
              </BookCallButton>
              <Button
                href={packagesCta.secondaryHref}
                variant="secondary"
                size="large"
              >
                {packagesCta.secondary}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
