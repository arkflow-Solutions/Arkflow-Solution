import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppCta } from "@/components/attract/whatsapp-cta";
import { BookCallButton } from "@/components/pages/book-call-button";
import { buildMetadata } from "@/lib/seo";
import {
  attractHero,
  attractProblem,
  attractFork,
  websiteBuild,
  websiteRevamp,
  websiteReview,
  selectedWork,
  websiteProcess,
  attractContinuity,
  attractEligibility,
  attractCta,
} from "@/lib/attract-content";

/**
 * /attract — Canonical Package Specification v1.4, Amendment 8.
 *
 * Constraints are documented at the head of lib/attract-content.ts and
 * enforced by scripts/verify.mjs. In short: no pricing, no SEO service,
 * no weakening of Scale, no capacity scarcity, no fabricated proof, no
 * new framework.
 */
export const metadata = buildMetadata({
  title: "Websites — the front door of your revenue system",
  description:
    "ArkFlow builds and rebuilds websites for Singapore service businesses — designed around how customers decide, and built to connect to the system behind them.",
  path: "/attract",
});

export default function AttractPage() {
  return (
    <>
      <PageHero
        eyebrow={attractHero.eyebrow}
        title={`${attractHero.title} ${attractHero.titleAccent}`}
        lead={attractHero.lead}
      />

      <Container>
        <div className="flex flex-wrap gap-4 pb-4">
          <WhatsAppCta
            label={attractHero.primaryCta}
            prefill={attractCta.whatsappPrefill}
            location="attract_hero"
            size="large"
            withArrow
          />
          <BookCallButton variant="secondary" size="large">
            {attractHero.secondaryCta}
          </BookCallButton>
        </div>
      </Container>

      {/* ------------------------------------------------- 1 · PROBLEM */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {attractProblem.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {attractProblem.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {attractProblem.lead}
          </p>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {attractProblem.symptoms.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-button border border-[color:var(--border-subtle)] bg-surface/40 p-5 text-small text-[color:var(--text-secondary)]"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-3 shrink-0 bg-[color:var(--text-tertiary)]"
                />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-subheading font-medium leading-snug">
            {attractProblem.close}
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------- 2 · FORK */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {attractFork.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {attractFork.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {attractFork.lead}
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {attractFork.options.map((o) => (
              <Reveal key={o.id}>
                <div
                  className={
                    o.id === "scale"
                      ? "h-full rounded-card border border-blue/40 bg-blue/[0.05] p-8"
                      : "h-full rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-8"
                  }
                >
                  <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
                    {o.label}
                  </p>
                  <p className="mt-4 text-subheading font-medium text-white">
                    {o.promise}
                  </p>
                  <p className="mt-4 text-body text-[color:var(--text-secondary)]">
                    {o.body}
                  </p>
                  <p className="mt-6 border-t border-[color:var(--border-subtle)] pt-5 text-small text-[color:var(--text-tertiary)]">
                    {o.note}
                  </p>
                  {"href" in o && o.href && (
                    <Link
                      href={o.href}
                      className="mt-5 inline-block text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
                    >
                      {o.hrefLabel} &rarr;
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- 3 · BUILD */}
      <Section className="hairline" id="website-build">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {websiteBuild.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {websiteBuild.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {websiteBuild.lead}
          </p>

          <dl className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {websiteBuild.includes.map((i) => (
              <div key={i.label}>
                <dt className="text-body font-medium text-white">{i.label}</dt>
                <dd className="mt-2 text-small leading-relaxed text-[color:var(--text-secondary)]">
                  {i.body}
                </dd>
              </div>
            ))}
          </dl>

          {/* v1.4 §19 — properties of a well-built site, never a service. */}
          <Reveal className="mt-14">
            <div className="rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-8">
              <p className="text-subheading font-medium text-white">
                {websiteBuild.foundations.title}
              </p>
              <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                {websiteBuild.foundations.body}
              </p>
              <p className="mt-5 border-t border-[color:var(--border-subtle)] pt-5 text-small text-[color:var(--text-tertiary)]">
                {websiteBuild.foundations.boundary}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------- 4 · REVAMP */}
      <Section className="hairline" id="website-revamp">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {websiteRevamp.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {websiteRevamp.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {websiteRevamp.lead}
          </p>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {websiteRevamp.verdicts.map((v, i) => (
              <li
                key={v.name}
                className="rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-7"
              >
                <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-subheading font-medium text-white">
                  {v.name}
                </p>
                <p className="mt-3 text-small leading-relaxed text-[color:var(--text-secondary)]">
                  {v.body}
                </p>
              </li>
            ))}
          </ol>

          {/* v1.4 §3 mandatory finding — governance, do not soften. */}
          <Reveal className="mt-10">
            <div className="rounded-card border border-blue/30 bg-blue/[0.04] p-8">
              <p className="text-subheading font-medium text-white">
                {websiteRevamp.honesty.title}
              </p>
              <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                {websiteRevamp.honesty.body}
              </p>
              <Link
                href={websiteRevamp.honesty.href}
                className="mt-5 inline-block text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
              >
                {websiteRevamp.honesty.ctaLabel} &rarr;
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------- 5 · REVIEW */}
      <Section className="hairline" id="website-review">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {websiteReview.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {websiteReview.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {websiteReview.lead}
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {websiteReview.examines.map((e) => (
              <li
                key={e}
                className="rounded-button border border-[color:var(--border-subtle)] bg-surface/50 px-5 py-3 text-small text-[color:var(--text-secondary)]"
              >
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-prose space-y-4">
            <p className="text-body text-[color:var(--text-secondary)]">
              {websiteReview.output}
            </p>
            <p className="text-body text-[color:var(--text-secondary)]">
              {websiteReview.credit}
            </p>
            <p className="text-small text-[color:var(--text-tertiary)]">
              {websiteReview.distinction}
            </p>
          </div>

          <div className="mt-10">
            <WhatsAppCta
              label="Send us your website"
              prefill={attractCta.whatsappPrefill}
              location="attract_review"
              withArrow
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- 6 · PROCESS */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {websiteProcess.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {websiteProcess.title}
          </h2>

          <ol className="mt-14">
            {websiteProcess.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04}>
                <li className="af-stage">
                  <div className="af-stage__marker" aria-hidden>
                    <span className="af-stage__dot" />
                    {i < websiteProcess.steps.length - 1 && (
                      <span className="af-stage__line" />
                    )}
                  </div>
                  <div className="pb-12">
                    <p className="font-mono text-eyebrow uppercase text-blue-soft">
                      {s.name}
                    </p>
                    <p className="mt-3 max-w-prose text-body text-[color:var(--text-secondary)]">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
            {websiteProcess.commitment}
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------- 7 · CONTINUITY */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {attractContinuity.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {attractContinuity.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {attractContinuity.body}
          </p>

          {/* Canonical six-stage journey. Attract highlighted, not renamed. */}
          <ol className="mt-12 flex flex-wrap items-center gap-2">
            {attractContinuity.journey.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <span
                  className={
                    i === 0
                      ? "rounded-button border border-blue/40 bg-blue/[0.08] px-4 py-2 font-mono text-eyebrow uppercase tracking-wider text-blue-soft"
                      : "rounded-button border border-[color:var(--border-subtle)] px-4 py-2 font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]"
                  }
                >
                  {stage}
                </span>
                {i < attractContinuity.journey.length - 1 && (
                  <span aria-hidden className="font-mono text-[color:var(--text-tertiary)]">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-small text-[color:var(--text-tertiary)]">
            {attractContinuity.journeyNote}
          </p>
        </Container>
      </Section>

      {/* -------------------------------------------- 8 · SELECTED WORK */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {selectedWork.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-heading font-semibold">
            {selectedWork.title}
          </h2>
          <p className="mt-6 max-w-prose text-body text-[color:var(--text-secondary)]">
            {selectedWork.body}
          </p>
        </Container>
      </Section>

      {/* ------------------------------------------- 9 · ELIGIBILITY + CTA */}
      <Section className="hairline">
        <Container>
          <div className="max-w-prose">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
              {attractEligibility.title}
            </p>
            <p className="mt-4 text-body text-[color:var(--text-secondary)]">
              {attractEligibility.body}
            </p>
          </div>

          <div className="mt-16 rounded-card border border-blue/30 bg-blue/[0.04] p-8 md:p-12">
            <h2 className="max-w-2xl text-heading font-semibold">
              {attractCta.title}
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {attractCta.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <WhatsAppCta
                label={attractCta.primary}
                prefill={attractCta.whatsappPrefill}
                location="attract_final_cta"
                size="large"
                withArrow
              />
              <BookCallButton variant="secondary" size="large">
                {attractCta.secondary}
              </BookCallButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
