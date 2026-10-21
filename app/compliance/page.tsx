import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { RelatedReading } from "@/components/pages/related-reading";
import { buildMetadata } from "@/lib/seo";
import {
  complianceHero,
  complianceLimits,
  complianceSections,
} from "@/lib/compliance-content";

/**
 * /compliance — the page a clinic's compliance person asks for.
 *
 * WHY IT IS ITS OWN PAGE. "Is this PDPA compliant?" is the question
 * that stops an aesthetic clinic deal, and until now the answer lived
 * in one FAQ line on /contact. A clinic manager who has to justify the
 * decision internally needs something they can forward.
 *
 * WHAT IT DELIBERATELY DOES NOT DO. It claims no certification, no
 * audit and no partner status, because ArkFlow holds none — the
 * "What we are not" block is the most important thing on the page and
 * must not be softened. It is also not legal advice and says so.
 *
 * PRIMARY KEYWORD: "PDPA WhatsApp marketing Singapore".
 */
export const metadata = buildMetadata({
  title: "PDPA & WhatsApp Rules for Clinics",
  description:
    "How automated clinic messaging stays inside Singapore PDPA, Do Not Call rules, WhatsApp policy and MOH advertising provisions. And what we do not claim.",
  path: "/compliance",
});

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow={complianceHero.eyebrow}
        title={complianceHero.title}
        lead={complianceHero.lead}
      />

      {complianceSections.map((section) => (
        <Section key={section.id} id={section.id} className="hairline scroll-mt-28">
          <Container>
            <Reveal>
              <Eyebrow>{section.label}</Eyebrow>
              <h2 className="mt-5 max-w-3xl text-heading font-semibold">
                {section.title}
              </h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {section.body}
              </p>
            </Reveal>

            <dl className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
              {section.points.map((point, i) => (
                <Reveal key={point.term} delay={i * 0.04}>
                  <dt className="border-t border-[color:var(--border-subtle)] pt-5 text-body font-medium text-white">
                    {point.term}
                  </dt>
                  <dd className="mt-3 max-w-prose text-body text-[color:var(--text-secondary)]">
                    {point.detail}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </Section>
      ))}

      {/* The limits. Last, and in a box, because it is the part a
          compliance officer is actually checking for. */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="rounded-card border border-[color:var(--border-strong)] bg-surface/60 p-7 md:p-9">
              <h2 className="text-subheading font-medium text-white">
                {complianceLimits.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {complianceLimits.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body text-[color:var(--text-secondary)]"
                  >
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-warning" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-small text-[color:var(--text-tertiary)]">
              This page summarises how we work. It is not legal advice, and
              the rules it describes change — check the Personal Data
              Protection Commission, MOH and WhatsApp&apos;s own policy for
              the current position. The signed data processing agreement and
              our terms govern the relationship.
            </p>
          </Reveal>
        </Container>
      </Section>

      <RelatedReading
        slugs={["whatsapp-automation-for-business","aesthetic-clinic-lead-follow-up"]}
        title="Related reading"
      />

      <CtaBand
        title="Bring your compliance questions to the audit."
        body="We will walk through how consent, retention and approved wording would work for your clinic specifically, before anything is built."
      />
    </>
  );
}
