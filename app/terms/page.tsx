import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY, LEGAL_DOCS } from "@/lib/site";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Terms of Service",
  description:
    "Terms of service for the ArkFlow website and its enquiry forms. Client engagements are governed by separate signed agreements.",
  path: "/terms",
});

/**
 * Public Website Terms of Service.
 *
 * SOURCE: ArkFlow Website Terms of Service (ARK-WTOS, issued 31 August
 * 2026). This page is a faithful web rendering of that issued document.
 * Every clause below traces to it. No provision has been invented, and
 * no liability cap, governing-law clause, dispute mechanism, refund term
 * or contract duration appears here that is not in the source.
 *
 * REPLACED, 6 September 2026 — the previous version of this page
 * published the 30-Day Response Guarantee and a six-month minimum term.
 * Neither is currently offered (founder decision), and neither appears
 * in ARK-WTOS. They are removed rather than restated.
 *
 * SCOPE BOUNDARY, and the whole point of this page: these Terms govern
 * the WEBSITE only. Client engagements are governed by the Master
 * Service Agreement, the Data Protection & Confidentiality Agreement and
 * the applicable Order Form, which prevail. Nothing here may be written
 * so that a reader could mistake it for the commercial contract.
 *
 * GOVERNANCE: no pricing, no packages, no tiers, no guarantee, no
 * response-time or delivery commitment. The entity name and UEN come
 * from COMPANY in lib/site.ts and must never be typed inline.
 *
 * ISSUE DATE, not a review date. Nothing on this page asserts that a
 * lawyer reviewed it.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Website Terms of Service"
        lead={`These Terms govern use of the ArkFlow website and its enquiry forms. Client engagements are governed by separate signed agreements. Issued ${LEGAL_DOCS.websiteTerms.issued}.`}
      />
      <Section className="!pt-8">
        <Container>
          <div className="max-w-prose space-y-10 text-body text-[color:var(--text-secondary)]">
            <p className="border-l-2 border-[color:var(--border-strong)] pl-5">
              <strong className="font-medium text-white">Scope.</strong> These
              Terms govern use of the {COMPANY.shortName} website and its
              enquiry forms only. Client engagements are governed exclusively
              by the {COMPANY.shortName} Master Service Agreement, the{" "}
              {COMPANY.shortName} Data Protection &amp; Confidentiality
              Agreement and the applicable Order Form.
            </p>

            <div>
              <h2 className="text-subheading font-medium text-white">
                1. These Terms
              </h2>
              <p className="mt-4">
                These Terms of Service govern your use of the website operated
                by {COMPANY.legalName} (UEN {COMPANY.uen}) at
                www.arkflowsolutions.com and any enquiry, booking or contact
                form on it.
              </p>
              <p className="mt-4">
                By using the website you agree to these Terms. If you do not
                agree, please do not use the website.
              </p>
              <p className="mt-4">
                These Terms do not govern the services {COMPANY.shortName}{" "}
                provides to clients. Those services are governed by the{" "}
                {COMPANY.shortName} Master Service Agreement, the Data
                Protection &amp; Confidentiality Agreement and the applicable
                Order Form. Where a client engagement exists, those documents
                prevail over these Terms in all respects.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                2. Nothing here is an offer
              </h2>
              <p className="mt-4">
                Information on the website is provided for general information
                only. It is not an offer capable of acceptance, a quotation, or
                advice on which you should rely.
              </p>
              <p className="mt-4">
                {COMPANY.shortName} uses personalised quotation-based pricing.
                Any indicative description on the website does not constitute a
                price or a commitment. Fees are stated only in an Order Form.
              </p>
              <p className="mt-4">
                Descriptions of features, integrations, delivery times and
                capabilities are general and may not reflect what is included
                in any particular engagement.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                3. Enquiries and information you submit
              </h2>
              <p className="mt-4">
                When you submit an enquiry, you consent to {COMPANY.shortName}{" "}
                contacting you about it by the channels you provide.
              </p>
              <p className="mt-4">
                You should not submit confidential or sensitive information, or
                personal information about third parties, through a website
                form. Do not submit health information, identity-document
                details, payment card numbers or credentials.
              </p>
              <p className="mt-4">
                {COMPANY.shortName} handles personal data submitted through the
                website in accordance with the Personal Data Protection Act
                2012 and the{" "}
                <Link
                  href="/privacy"
                  className="text-blue-soft underline underline-offset-4"
                >
                  {COMPANY.shortName} Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-4">
                You may withdraw consent to being contacted at any time by
                writing to{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                4. Acceptable use
              </h2>
              <p className="mt-4">
                You must not use the website to break the law, infringe
                anyone&apos;s rights, distribute malware, attempt unauthorised
                access, scrape or harvest data, submit false or misleading
                information, impersonate another person, or interfere with the
                website&apos;s operation or security.
              </p>
              <p className="mt-4">
                {COMPANY.shortName} may restrict or block access where
                reasonably necessary to protect the website, its users or its
                systems.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                5. Intellectual property
              </h2>
              <p className="mt-4">
                The website, its content, design, text, graphics, logos and
                underlying code are owned by {COMPANY.shortName} or its
                licensors and are protected by intellectual property law.
              </p>
              <p className="mt-4">
                You may view and print pages for your own information. You must
                not copy, republish, distribute or commercially exploit any part
                of the website without {COMPANY.shortName}&apos;s written
                permission.
              </p>
              <p className="mt-4">
                Third-party names and marks appearing on the website belong to
                their respective owners.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                6. Availability and third-party links
              </h2>
              <p className="mt-4">
                {COMPANY.shortName} uses reasonable efforts to keep the website
                available but does not guarantee uninterrupted or error-free
                access. The website may be suspended for maintenance or for
                reasons outside {COMPANY.shortName}&apos;s reasonable control.
              </p>
              <p className="mt-4">
                The website may link to third-party sites. {COMPANY.shortName}{" "}
                does not control them and is not responsible for their content,
                policies or practices.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                7. Disclaimer and liability
              </h2>
              <p className="mt-4">
                The website is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. To the extent permitted by law,{" "}
                {COMPANY.shortName} gives no warranty that the content is
                accurate, complete or current.
              </p>
              <p className="mt-4">
                Nothing in these Terms excludes or limits liability for death or
                personal injury caused by negligence, for fraud or fraudulent
                misrepresentation, or for any other liability that cannot
                lawfully be excluded under Singapore law.
              </p>
              <p className="mt-4">
                Subject to the paragraph above and to the extent permitted by
                law, {COMPANY.shortName} is not liable for any loss arising from
                your use of or reliance on the website, including indirect or
                consequential loss and loss of profit, revenue, goodwill or
                data.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                8. Changes
              </h2>
              <p className="mt-4">
                {COMPANY.shortName} may update these Terms from time to time.
                The version published on the website applies to your use of it
                from the date it is published.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                9. Governing law
              </h2>
              <p className="mt-4">
                These Terms are governed by the laws of the Republic of
                Singapore, and the courts of Singapore have exclusive
                jurisdiction.
              </p>
              <p className="mt-4">
                A person who is not a party to these Terms has no right under
                the Contracts (Rights of Third Parties) Act 2001 to enforce any
                of them.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                10. Contact
              </h2>
              <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-[160px_1fr]">
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Company
                </dt>
                <dd className="text-white">{COMPANY.legalName}</dd>
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  UEN
                </dt>
                <dd>{COMPANY.uen}</dd>
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Registered address
                </dt>
                <dd>{COMPANY.address}</dd>
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Email
                </dt>
                <dd>
                  <a
                    className="text-blue-soft underline underline-offset-4"
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Phone
                </dt>
                <dd>{CONTACT_PHONE}</dd>
              </dl>
            </div>

            <p className="border-t border-[color:var(--border-subtle)] pt-8 text-small text-[color:var(--text-tertiary)]">
              {LEGAL_DOCS.websiteTerms.ref} · issued{" "}
              {LEGAL_DOCS.websiteTerms.issued}. This website is operated by{" "}
              {COMPANY.legalName} (UEN {COMPANY.uen}), a company incorporated in
              Singapore. This page reproduces the issued Website Terms of
              Service; where it differs from the issued document, that document
              governs. Client engagements are governed by the applicable signed
              agreements, not by this page.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
