import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { CONTACT_EMAIL, COMPANY } from "@/lib/site";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of use",
  description:
    "Terms of use for the ArkFlow website, and a summary of how an ArkFlow engagement works.",
  path: "/terms",
});


/**
 * PLACEHOLDER — summary only. The binding terms are the signed client
 * agreement, not this page. Must be reviewed by a lawyer before the site
 * is promoted. Every commercial fact here is from the Canonical Package
 * Specification as amended by AMENDMENTS-v1.1 (no prices published).
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        lead="What this website is, and how an ArkFlow engagement works. Last reviewed August 2026."
      />
      <Section className="!pt-8">
        <Container>
          <div className="max-w-prose space-y-8 text-body text-[color:var(--text-secondary)]">
            <div>
              <h2 className="text-subheading font-medium text-white">
                This website
              </h2>
              <p className="mt-4">
                The content here describes what {COMPANY.shortName} does and is
                provided for information. It is not an offer, and nothing on
                this site forms a contract. Response times and delivery windows
                described here are service commitments measured from a completed
                intake — they are not claims about past performance.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Pricing
              </h2>
              <p className="mt-4">
                We do not publish a price list. Every system is configured around
                how a particular business operates, so pricing is quoted after a
                discovery call. A quotation is valid for the period stated on it.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Engagements
              </h2>
              <p className="mt-4">
                Engagements run on a six-month minimum term, then month-to-month.
                After the minimum, either party may end the engagement with 30
                days&apos; written notice. Implementation is charged once and is
                non-refundable. Upgrading between levels does not reset the
                minimum term and does not incur a second implementation.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                The 30-Day Response Guarantee
              </h2>
              <p className="mt-4">
                If {COMPANY.shortName} does not reduce a client&apos;s average
                lead response time to under 90 seconds within the first 30 days
                after successful onboarding, we refund the client&apos;s first
                monthly subscription fee. This is our only guarantee. It is
                evaluated at Day 30, and a client never has to ask for a refund
                they are owed. The full conditions are set out in the client
                agreement.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Scope
              </h2>
              <p className="mt-4">
                {COMPANY.shortName} configures and operates proven platforms into
                one connected system. We do not build custom software, we do not
                run paid advertising, and we do not give medical or clinical
                advice. Anything outside the agreed scope is quoted separately
                rather than absorbed.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Contact
              </h2>
              <p className="mt-4">
                Questions about these terms:{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
            <p className="border-t border-[color:var(--border-subtle)] pt-8 text-small text-[color:var(--text-tertiary)]">
              {COMPANY.legalName}, Singapore. This summary is provided for
              clarity and is not legal advice. Where it differs from a signed
              client agreement, the agreement governs.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
