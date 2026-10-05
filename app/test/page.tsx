import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { RequestForm } from "@/components/audit/request-form";
import { buildMetadata } from "@/lib/seo";
import { testBoundary, testForm, testHero, testSteps } from "@/lib/audit-content";

import "../audit/audit.css";

/**
 * /test — the After-Hours Enquiry Test.
 *
 * THE LOWER-COMMITMENT WAY IN. Not everyone arriving on this site is
 * ready to give up thirty minutes to a company they met a moment ago.
 * This asks for far less and demonstrates the same thing: it finds out
 * what actually happens to an enquiry after the team goes home.
 *
 * THE ETHICAL BOUNDARY IS ON THE PAGE, NOT IN A COMMENT. A test like
 * this is only defensible if the business being tested would recognise
 * it as fair after the fact, so what it will never do is published
 * alongside what it does: no impersonating a patient, no invented
 * condition, no manufactured urgency, no appointment booked that nobody
 * intends to keep. ArkFlow sends one ordinary enquiry and measures what
 * happens to it.
 */
export const metadata = buildMetadata({
  title: "After-Hours Response Test",
  description:
    "We send your business one genuine enquiry outside working hours, measure what happens to it, and send you the finding. No call required.",
  path: "/test",
});

export default function TestPage() {
  return (
    <>
      <PageHero eyebrow={testHero.eyebrow} title={testHero.title} lead={testHero.lead} />

      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-semibold">How the test works</h2>
          <ol className="af-steps">
            {testSteps.map((s, i) => (
              <li key={s.label} className="af-step">
                <span className="af-step__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="af-step__label">{s.label}</span>
                <span className="af-step__text">{s.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The boundary, stated plainly. A test nobody would defend
          afterwards is not proof of anything. */}
      <Section className="hairline">
        <Container>
          <div className="max-w-2xl rounded-card border border-[color:var(--border-subtle)] bg-surface/60 p-7 md:p-8">
            <h2 className="text-subheading font-medium text-white">
              {testBoundary.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {testBoundary.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-body text-[color:var(--text-secondary)]"
                >
                  <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-blue-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <h2 id="request" className="scroll-mt-28 text-heading font-semibold">
            {testForm.title}
          </h2>
          <RequestForm
            source={testForm.source}
            submitLabel={testForm.submit}
            sendingLabel={testForm.sending}
            note={testForm.note}
            startEvent="test_form_start"
            submitEvent="test_form_submit"
            redirectTo="/audit/thank-you"
          />

          <p className="mt-10 max-w-prose text-body text-[color:var(--text-secondary)]">
            Would rather walk the whole journey with us?{" "}
            <Link
              href="/audit"
              className="text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
            >
              Request the full Revenue Leak Audit
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
