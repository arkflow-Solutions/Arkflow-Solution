import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY, LEGAL_DOCS } from "@/lib/site";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${COMPANY.legalName} collects, uses, discloses, retains and protects personal data under Singapore's Personal Data Protection Act 2012.`,
  path: "/privacy",
});

/**
 * Public Privacy Policy.
 *
 * SOURCE: ArkFlow Privacy Policy (ARK-PRIV, issued 31 August 2026). This
 * page renders that issued document, reconciled against what this website
 * actually does. Nothing has been invented: the retention periods, the
 * transfer position, the rights and the complaints route all come from
 * the issued Policy.
 *
 * RECONCILED AGAINST THE IMPLEMENTATION, 6 September 2026. The previous
 * page described neither cookies, analytics, nor any named processor,
 * while the site loads Google Analytics on every page and sends enquiries
 * to GoHighLevel. Those are now described, because a privacy notice that
 * omits them is inaccurate regardless of what any statute requires.
 *
 * NAMED PROCESSORS. The issued Policy names categories ("cloud hosting,
 * CRM, email, messaging, accounting, payment and analytics providers").
 * The specific providers below are named because they are established
 * from this repository: Google Analytics (components/analytics), the
 * GoHighLevel Contacts API and booking widget (app/api/enquiry,
 * components/booking), and the hosting platform. What is NOT stated
 * anywhere here: their data residency, their sub-processors, their
 * retention behaviour, or the names and lifetimes of any cookie they set.
 * None of that is established by this repository and none is invented.
 *
 * SCOPE BOUNDARY. This Policy covers personal data ArkFlow handles as an
 * organisation in its own right. Data ArkFlow processes on a client's
 * behalf is governed by that client's own notice and by the Data
 * Protection & Confidentiality Agreement — see clause 2. That boundary is
 * from the issued Policy and must not be blurred.
 *
 * ISSUE DATE, not a review date. Nothing here asserts legal review or
 * certification of compliance.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${COMPANY.shortName} collects, uses, discloses and protects personal data under Singapore's Personal Data Protection Act 2012. Issued ${LEGAL_DOCS.privacy.issued}.`}
      />
      <Section className="!pt-8">
        <Container>
          <div className="max-w-prose space-y-10 text-body text-[color:var(--text-secondary)]">
            <p className="border-l-2 border-[color:var(--border-strong)] pl-5">
              <strong className="font-medium text-white">Scope.</strong> This
              Policy covers personal data {COMPANY.shortName} handles as an
              organisation in its own right — enquiries, client and supplier
              contacts, and its own business records. Personal data{" "}
              {COMPANY.shortName} processes on a client&apos;s behalf while
              delivering services is governed by that client&apos;s own privacy
              notice and by the {COMPANY.shortName} Data Protection &amp;
              Confidentiality Agreement, not by this Policy.
            </p>

            <div>
              <h2 className="text-subheading font-medium text-white">
                1. Who we are
              </h2>
              <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-[190px_1fr]">
                <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Organisation
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
                  Data protection contact
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
                  Telephone
                </dt>
                <dd>{CONTACT_PHONE}</dd>
              </dl>
              <p className="mt-6">
                {COMPANY.legalName} has designated an individual responsible for
                personal data protection. Please direct any data protection
                question, request or complaint to the data protection contact
                above rather than to an individual, so that it is received and
                actioned reliably.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                2. Scope
              </h2>
              <p className="mt-4">
                This Policy applies to personal data {COMPANY.shortName} handles
                as an organisation in its own right: enquiries submitted through
                our website, communications with prospective and existing
                clients, records of the individuals we deal with at client
                organisations, supplier and contractor contacts, and job
                applicants.
              </p>
              <p className="mt-4">
                Where {COMPANY.shortName} processes personal data on a
                client&apos;s behalf while delivering the services — for
                example, a clinic&apos;s patient enquiry records held in a
                system {COMPANY.shortName} configures — {COMPANY.shortName} acts
                as a data intermediary. That processing is governed by the
                client&apos;s own privacy notice and by the Data Protection
                &amp; Confidentiality Agreement, not by this Policy. Individuals
                with questions about that data should contact the relevant
                business directly.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                3. What we collect
              </h2>
              <p className="mt-4">
                Through the enquiry form on this website we collect your name,
                business name, business type, indicative monthly enquiry volume,
                what you would like help with, your email address, and
                optionally your phone number, preferred contact channel and any
                message you write.
              </p>
              <p className="mt-4">
                We also hold contact details, enquiry content, client
                relationship records, billing information, technical information
                (IP address, browser type, pages viewed, referring source, and
                campaign parameters in a link you followed) and recruitment
                information, depending on how you deal with us.
              </p>
              <p className="mt-4">
                Booking a call opens a scheduling widget provided by our CRM
                provider. Information you enter there is submitted to that
                provider directly.
              </p>
              <p className="mt-4">
                We do not ask for, and you should not send us, identity document
                copies, payment card numbers, passwords, health information, or
                personal data about third parties, through a website form or
                general email.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                4. Why we use it
              </h2>
              <ul className="mt-4 space-y-2">
                {[
                  "To respond to your enquiry and to contact you about it.",
                  "To prepare proposals, quotations and order forms.",
                  "To provide, support, administer and improve our services.",
                  "To manage the contractual relationship, including invoicing, payment and record-keeping.",
                  "To send service and account communications relating to an existing engagement.",
                  "To send marketing about our services where you have consented or where we are otherwise permitted to do so.",
                  "To operate, secure and improve our website.",
                  "To meet legal, regulatory, accounting and tax obligations.",
                  "To establish, exercise or defend legal claims.",
                  "To assess job applications.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.6em] h-px w-3 flex-none bg-[color:var(--border-strong)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                5. Consent and your choices
              </h2>
              <p className="mt-4">
                We rely on your consent, or on an exception permitted under the
                PDPA, to collect, use and disclose your personal data for the
                purposes above. Where you provide your contact details to make
                an enquiry, we take that as consent to contact you about it.
              </p>
              <p className="mt-4">
                You may withdraw consent at any time by writing to{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                . We will act on your request within a reasonable period and
                tell you the likely consequences — for example, we may no longer
                be able to provide a service or respond to your enquiry.
              </p>
              <p className="mt-4">
                Withdrawing consent does not affect processing carried out
                before withdrawal, or processing we are legally required or
                permitted to continue.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                6. Marketing and the Do Not Call Registry
              </h2>
              <p className="mt-4">
                Before sending marketing messages to Singapore telephone
                numbers, we check the Do Not Call Registry unless a valid
                exemption applies or you have given us clear and unambiguous
                consent in evidential form.
              </p>
              <p className="mt-4">
                Marketing emails and messages include a way to unsubscribe. We
                act on unsubscribe requests within the period required by law.
                You can opt out of marketing at any time without affecting any
                service we already provide to you.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                7. Who we share it with
              </h2>
              <p className="mt-4">
                We share personal data only where necessary, and only with
                service providers who support our operations — including cloud
                hosting, CRM, email, messaging, accounting, payment and
                analytics providers — under obligations of confidentiality and
                data protection; professional advisers such as lawyers,
                accountants and insurers; regulators, law enforcement or other
                authorities where we are legally required to disclose; and a
                purchaser or successor in the event of a merger, acquisition or
                restructuring, subject to appropriate protections.
              </p>
              <p className="mt-4">
                We do not sell or rent personal data, and we do not disclose it
                to third parties for their own unrelated marketing.
              </p>
              <p className="mt-4 text-white">
                The providers currently used by this website are:
              </p>
              <ul className="mt-4 space-y-4">
                <li>
                  <span className="font-medium text-white">
                    GoHighLevel (HighLevel)
                  </span>{" "}
                  — our CRM and scheduling platform. Enquiries submitted through
                  the contact form are sent to it, and the booking widget is
                  provided by it.
                </li>
                <li>
                  <span className="font-medium text-white">
                    Google Analytics
                  </span>{" "}
                  — website analytics. We do not send your name, email address,
                  phone number or message content to it; our analytics code
                  removes those fields before any event is sent.
                </li>
                <li>
                  <span className="font-medium text-white">Vercel</span> — our
                  website hosting provider, which necessarily processes the
                  technical information described in clause 3 in order to serve
                  the site.
                </li>
              </ul>
              <p className="mt-4">
                These providers operate their own infrastructure, terms and
                security arrangements. We do not own or control that
                infrastructure.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                8. Transfers outside Singapore
              </h2>
              <p className="mt-4">
                Some of our service providers operate outside Singapore. Where
                personal data is transferred overseas, we take the steps
                required by the PDPA&apos;s Transfer Limitation Obligation to
                ensure it receives a standard of protection comparable to that
                required in Singapore, through contractual protections or
                another legally recognised mechanism.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                9. Protection
              </h2>
              <p className="mt-4">
                We apply administrative, technical and physical measures
                appropriate to the risk, including access controls, named
                accounts, multi-factor authentication on privileged accounts,
                least-privilege permissions, encryption in transit where
                supported, secure credential handling, and confidentiality
                obligations on our personnel.
              </p>
              <p className="mt-4">
                No system connected to the internet can be guaranteed completely
                secure. If a data breach occurs that is likely to result in
                significant harm or is of significant scale, we will assess it
                and notify the Personal Data Protection Commission and affected
                individuals as required under the PDPA.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                10. How long we keep it
              </h2>
              <p className="mt-4">
                We keep personal data only for as long as it serves the purpose
                it was collected for, or for as long as we are legally or
                contractually required to keep it. Indicative periods:
              </p>
              <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_220px]">
                {[
                  ["Enquiries that do not become engagements", "Up to 12 months from last contact"],
                  ["Client relationship records", "Duration of the engagement plus 6 years"],
                  ["Accounting and tax records", "At least 5 years, as required under Singapore law"],
                  ["Marketing consent and opt-out records", "For as long as we conduct marketing, plus a reasonable period afterwards"],
                  ["Unsuccessful job applications", "Up to 12 months, unless you ask us to keep them longer"],
                  ["Website analytics", "Up to 26 months"],
                ].map(([record, period]) => (
                  <div key={record} className="contents">
                    <dt className="text-white">{record}</dt>
                    <dd className="text-small">{period}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6">
                When personal data is no longer needed, we delete or anonymise
                it, subject to backup cycles and records we are required to
                retain. Where data sits in a third-party provider&apos;s system,
                that provider&apos;s own retention behaviour applies and we
                cannot shorten it beyond what the provider supports.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                11. Your rights
              </h2>
              <p className="mt-4">
                Under the PDPA you may ask us for access to the personal data we
                hold about you and information about how it has been used or
                disclosed in the past year, and you may ask us to correct it if
                it is inaccurate or incomplete.
              </p>
              <p className="mt-4">
                Send requests to{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                . We may ask you to verify your identity. We will respond as
                soon as reasonably possible and in any event within the
                timeframe required by the PDPA, and will tell you if we cannot
                meet it. A reasonable fee may apply to an access request, and we
                will tell you the amount before proceeding. There is no fee for
                a correction request.
              </p>
              <p className="mt-4">
                Certain exceptions apply under the PDPA — for example, where
                disclosure would reveal another individual&apos;s personal data
                or is subject to legal privilege.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                12. Website and cookies
              </h2>
              <p className="mt-4">
                Our website uses cookies and similar technologies to make the
                site work, remember preferences and understand how the site is
                used. You can control cookies through your browser settings.
                Blocking some cookies may affect how parts of the site function.
              </p>
              <p className="mt-4">
                Our{" "}
                <Link
                  href="/cookies"
                  className="text-blue-soft underline underline-offset-4"
                >
                  Cookie Policy
                </Link>{" "}
                explains what is set, by whom and why.
              </p>
              <p className="mt-4">
                Our website may link to third-party sites. We are not
                responsible for their privacy practices, and you should read
                their policies.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                13. Children
              </h2>
              <p className="mt-4">
                Our services are for businesses. We do not knowingly collect
                personal data from children. If you believe a child has provided
                us with personal data, contact us and we will delete it.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                14. Complaints
              </h2>
              <p className="mt-4">
                If you have a concern about how we handle personal data, contact
                us first at{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                so we can try to resolve it. If you remain dissatisfied, you may
                lodge a complaint with the Personal Data Protection Commission
                of Singapore.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                15. Changes
              </h2>
              <p className="mt-4">
                We may update this Policy. The version published on our website
                applies from the date shown on it. Where a change is
                significant, we will take reasonable steps to bring it to your
                attention.
              </p>
            </div>

            <p className="border-t border-[color:var(--border-subtle)] pt-8 text-small text-[color:var(--text-tertiary)]">
              {LEGAL_DOCS.privacy.ref} · issued {LEGAL_DOCS.privacy.issued}.
              This website is operated by {COMPANY.legalName} (UEN{" "}
              {COMPANY.uen}), a company incorporated in Singapore, which is the
              organisation responsible for the personal data described above.
              Post: {COMPANY.address}. This page reproduces the issued Privacy
              Policy; where it differs from the issued document, that document
              governs.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
