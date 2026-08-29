import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { CONTACT_EMAIL, COMPANY } from "@/lib/site";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "How Arkflow Solutions Pte Ltd collects, uses, discloses and retains personal data, consistent with Singapore's Personal Data Protection Act.",
  path: "/privacy",
});


/**
 * PLACEHOLDER — plain-language summary only. This has NOT been reviewed
 * by a lawyer and must be before the site is promoted. Nothing here
 * describes a practice ArkFlow does not actually follow.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        lead="A plain-language summary of what we collect and why. Last reviewed August 2026."
      />
      <Section className="!pt-8">
        <Container>
          <div className="max-w-prose space-y-8 text-body text-[color:var(--text-secondary)]">
            <div>
              <h2 className="text-subheading font-medium text-white">
                What we collect
              </h2>
              <p className="mt-4">
                When you book a call or send an enquiry through this site, we
                collect the details you give us — typically your name, business
                name, email address, phone number and what you are asking about.
                We do not collect anything you have not typed in.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Why we hold it
              </h2>
              <p className="mt-4">
                To reply to you, to prepare for a call, and to keep a record of
                the conversation. If you are not an aesthetic clinic, we keep
                your enquiry on file so we can contact you if and when we open
                to other kinds of business. We will tell you that at the time
                rather than quietly adding you to a list.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Who else sees it
              </h2>
              <p className="mt-4">
                Enquiries are stored in the platform that runs our own customer
                system, and bookings are handled by our scheduling provider. We
                do not sell personal data, and we do not share it for
                advertising.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Clients&apos; own customer data
              </h2>
              <p className="mt-4">
                Where {COMPANY.shortName} operates a system on behalf of a
                client, that client&apos;s customer data stays inside the
                client&apos;s own platform account. We sign a data processing
                agreement with every client, consistent with the Singapore
                Personal Data Protection Act. We do not store or access clinical
                records.
              </p>
            </div>
            <div>
              <h2 className="text-subheading font-medium text-white">
                Asking us to delete it
              </h2>
              <p className="mt-4">
                Email{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will remove your details. You do not have to give a
                reason.
              </p>
            </div>
            {/* Data controller identification. A privacy notice should
                name the entity responsible for the data, not just the brand. */}
            <p className="border-t border-[color:var(--border-subtle)] pt-8 text-small text-[color:var(--text-tertiary)]">
              This website is operated by {COMPANY.legalName} (UEN{" "}
              {COMPANY.uen}), a company incorporated in Singapore, which is the
              organisation responsible for the personal data described above.
              This summary is provided for clarity and is not legal advice.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
