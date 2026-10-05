import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { BookCallButton } from "@/components/pages/book-call-button";
import { buildMetadata } from "@/lib/seo";
import { auditThanks } from "@/lib/audit-content";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

import "../audit.css";

/**
 * /audit/thank-you — the page after the audit request.
 *
 * NOT A REDIRECT TO THE HOMEPAGE. Sending someone back to the front door
 * at the moment they have just raised their hand is how intent gets
 * thrown away: they have told us something, and the page has to
 * acknowledge it, say what happens next, and offer the next step.
 *
 * THIS IS WHERE THE BOOKING MODAL BELONGS. The modal is the scheduling
 * mechanism, not a competing funnel — it appears only after the visitor
 * has expressed intent, which is exactly the distinction the Growth
 * Blueprint draws.
 *
 * NOINDEX. A thank-you page has no business in search results, and an
 * indexed one invites people to land on a confirmation for something
 * they never submitted.
 */
export const metadata = buildMetadata({
  title: "Your Revenue Leak Audit request is in",
  description:
    "We have your Revenue Leak Audit request. Here is what happens next, and how to book your 30-minute slot.",
  path: "/audit/thank-you",
  noIndex: true,
});

export default function AuditThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow={auditThanks.eyebrow}
        title={auditThanks.title}
        lead={auditThanks.lead}
      />

      <Section className="hairline">
        <Container>
          <ol className="af-steps">
            {auditThanks.next.map((s, i) => (
              <li key={s.label} className="af-step">
                <span className="af-step__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="af-step__label">{s.label}</span>
                <span className="af-step__text">{s.text}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookCallButton size="large" withArrow location="audit_thank_you">
              {auditThanks.bookLabel}
            </BookCallButton>
            <p className="max-w-sm text-small text-[color:var(--text-tertiary)]">
              {auditThanks.bookNote}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-semibold">If you need us sooner</h2>
          <dl className="mt-6 grid max-w-xl gap-3 text-body text-[color:var(--text-secondary)]">
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-[color:var(--text-tertiary)]">Email</dt>
              <dd>
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-[color:var(--text-tertiary)]">Phone</dt>
              <dd>{CONTACT_PHONE}</dd>
            </div>
          </dl>

          <p className="mt-8 text-body text-[color:var(--text-secondary)]">
            While you wait,{" "}
            <Link
              href="/how-it-works"
              className="text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
            >
              see how ArkFlow works
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
