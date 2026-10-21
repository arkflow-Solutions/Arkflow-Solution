import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { BookCallButton } from "@/components/pages/book-call-button";
import { AuditButton } from "@/components/home/v3/shared";
import { RelatedReading } from "@/components/pages/related-reading";
import { Magnetic } from "@/components/motion/magnetic";
import { RecordJourney } from "@/components/solutions/record-journey";
import { buildMetadata } from "@/lib/seo";
import {
  solutionsHero,
  stations,
  solutionsCta,
} from "@/lib/solutions-content";

import "./solutions.css";

/**
 * /solutions — what happens after someone raises their hand.
 *
 * THE THREE PAGES, KEPT DISTINCT:
 *   /attract   how a website should guide a decision  (owns ATTRACT)
 *   /solutions what the system does with what it produces (stages 2–10)
 *   /packages  what a client actually buys
 *
 * The grammar here is one opportunity record gaining history, chosen
 * because the homepage already owns the ten-stage line three times
 * over — scene 09, scene 10, and the Attract → Conversion handoff at
 * the foot of /attract. Drawing a fourth would repeat the homepage.
 *
 * Governance for every claim, the contractual anchors, and the
 * deferred cross-page hash issue are documented at the head of
 * lib/solutions-content.ts.
 *
 * SCOPE. Styles are route-scoped in ./solutions.css, so app/globals.css
 * — where the locked homepage scenes live — is not touched.
 */
export const metadata = buildMetadata({
  title: "Customer Reactivation for Clinics Singapore",
  description:
    "Bring dormant patients back and keep active ones booking. One record follows each customer from first enquiry through repeat visits, on WhatsApp and email.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={solutionsHero.eyebrow}
        title={`${solutionsHero.title} ${solutionsHero.titleAccent}`}
        lead={solutionsHero.lead}
      />

      <Container>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pb-4">
          <Magnetic>
            <BookCallButton size="large" withArrow>
              {solutionsHero.primaryCta}
            </BookCallButton>
          </Magnetic>
          <p className="text-small text-[color:var(--text-tertiary)]">
            {solutionsHero.positioning}
          </p>
        </div>
      </Container>

      {/* ------------------------------- THE STATIONS + THE RECORD
          Six contractual anchors (#inbox #ai #booking #automation
          #crm #reporting), each answering a business question, each
          writing into the same record — except Growth, which reads it. */}
      <Section className="hairline">
        <Container>
          <RecordJourney />
        </Container>
      </Section>

      {/* ------------------------------------------ SECTION INDEX
          Kept after the journey rather than before it: the labels mean
          something once the reader has been through them. These are
          the same six anchors, so in-page navigation still works. */}
      <Section className="hairline !py-12">
        <Container>
          <nav
            aria-label="Sections"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {stations.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)] transition-colors hover:text-blue-soft"
              >
                {s.nav}
              </Link>
            ))}
          </nav>
        </Container>
      </Section>

      {/* ------------------------------------------------- ACTION
          Canonical CTA first. The audit stays as the secondary
          diagnostic path, not the closing recommendation. */}
      <RelatedReading
        slugs={["whatsapp-automation-for-business","why-speed-to-lead-matters","aesthetic-clinic-lead-follow-up"]}
        title="The thinking behind the system"
        lead="What follow-up and reactivation look like when they are run properly, and the evidence we built the sequence on."
      />

      <Section className="hairline">
        <Container>
          <div className="rounded-card border border-blue/30 bg-blue/[0.04] p-8 md:p-12">
            <h2 className="max-w-2xl text-heading font-semibold">
              {solutionsCta.title}
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {solutionsCta.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <AuditButton location="solutions_close" size="large">
                    {solutionsCta.primary}
                  </AuditButton>
              </Magnetic>
              <Link
                href={solutionsCta.secondaryHref}
                className="text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
              >
                {solutionsCta.secondaryLabel} &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
