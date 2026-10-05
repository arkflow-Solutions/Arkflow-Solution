import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { RequestForm } from "@/components/audit/request-form";
import { buildMetadata } from "@/lib/seo";
import { auditFaq, auditForm, auditHero, auditSteps } from "@/lib/audit-content";

import "./audit.css";

/**
 * /audit — the Revenue Leak Audit. The primary public conversion.
 *
 * ON-SITE BY DESIGN. The audit used to live at go.arkflowsolutions.com,
 * and was retired as a public CTA in September precisely because it sent
 * the visitor off the domain at the moment of highest intent. The Growth
 * Blueprint reinstates the audit as the primary action; this page is how
 * both things stay true at once. verify.mjs check 12a still fails the
 * build if the external funnel is ever linked from public source.
 *
 * NO PRICE, NO PROMISE. The page says what happens, how long it takes and
 * what it costs the visitor (nothing). It does not say what the audit
 * will find, because that would be a claim about a business nobody has
 * looked at yet.
 */
export const metadata = buildMetadata({
  title: "Revenue Leak Audit",
  description:
    "A free 30-minute Revenue Leak Audit for Singapore clinics and appointment-based businesses: where enquiries arrive, how fast they are answered, and where bookings are being lost.",
  path: "/audit",
});

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow={auditHero.eyebrow}
        title={auditHero.title}
        lead={auditHero.lead}
      />

      {/* ------------------------------------------- what happens */}
      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-semibold">What happens on the call</h2>
          <ol className="af-steps">
            {auditSteps.map((s, i) => (
              <li key={s.label} className="af-step">
                <span className="af-step__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="af-step__label">{s.label}</span>
                <span className="af-step__text">{s.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ------------------------------------------------ the form */}
      <Section className="hairline">
        <Container>
          <h2 id="request" className="scroll-mt-28 text-heading font-semibold">
            {auditForm.title}
          </h2>
          <RequestForm
            source={auditForm.source}
            submitLabel={auditForm.submit}
            sendingLabel={auditForm.sending}
            note={auditForm.note}
            startEvent="audit_form_start"
            submitEvent="audit_form_submit"
            redirectTo="/audit/thank-you"
          />
        </Container>
      </Section>

      {/* ------------------------------------------------- answers */}
      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-semibold">Before you ask</h2>
          <dl className="mt-8 grid max-w-3xl gap-8">
            {auditFaq.map((f) => (
              <div key={f.q}>
                <dt className="text-body font-medium text-white">{f.q}</dt>
                <dd className="mt-2 text-body text-[color:var(--text-secondary)]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          {/* The lower-commitment way in, for anyone not ready to book
              thirty minutes. Same journey, shallower end. */}
          <p className="mt-10 max-w-prose text-body text-[color:var(--text-secondary)]">
            Not ready for a call?{" "}
            <Link
              href="/test"
              className="text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
            >
              Ask us to test your after-hours response instead
            </Link>{" "}
            — no call required.
          </p>
        </Container>
      </Section>
    </>
  );
}
