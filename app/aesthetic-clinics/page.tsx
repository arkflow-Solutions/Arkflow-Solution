import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ArkFlow for Singapore aesthetic clinics",
  description:
    "Enquiry response, consultation booking, deposits, follow-up and repeat visits — run as one connected system, built around how a Singapore clinic operates.",
  path: "/aesthetic-clinics",
});


/**
 * The ONLY dedicated vertical page at Stage 1 (Founder Bible §1.5,
 * §1.11). No client names, counts, logos or results — there are none
 * yet, and inventing them is prohibited.
 */

const pains = [
  {
    title: "Enquiries arrive when the clinic is closed",
    body: "Evenings, weekends and mid-treatment. By the time someone opens the inbox the next morning, a competitor has often already replied.",
  },
  {
    title: "The consultation is the conversion point",
    body: "Everything before it exists to get someone into the chair. A consultation that quietly no-shows is marketing spend already gone.",
  },
  {
    title: "The value is in the visit after this one",
    body: "Aesthetic treatment is rarely a single appointment. Clinics that do not systematically bring people back leave most of the revenue behind.",
  },
  {
    title: "Advertising rules are not optional",
    body: "A generic chatbot that improvises about treatments or outcomes is a liability. Messaging has to stay inside what the clinic has approved.",
  },
];

const journey = [
  { stage: "Enquiry", body: "Answered on the channel the patient used, at any hour, in the clinic's own voice." },
  { stage: "Consultation", body: "Qualified, booked, confirmed, and reminded — so the consultation actually happens." },
  { stage: "Deposit", body: "Requested and collected on the clinic's own rules, without anyone chasing it personally." },
  { stage: "Treatment", body: "Appointment reminders, preparation notes and rescheduling handled automatically." },
  { stage: "Follow-up", body: "A check-in afterwards, and a review request at the moment it is most likely to be given." },
  { stage: "Repeat visit", body: "An invitation back when the clinic's own interval says it is time — not when someone remembers." },
];

const boundaries = [
  "Never gives medical or clinical advice — anything clinical goes straight to the clinic team.",
  "Never makes outcome or efficacy claims of any kind.",
  "Never quotes outside the clinic's own approved price list.",
  "Sends only messages the clinic has written and approved, on the clinic's own rules.",
];

export default function AestheticClinicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Current commercial focus"
        title="Built first for Singapore aesthetic clinics."
        lead="The architecture behind ArkFlow is designed for service businesses generally. This is the one we have chosen to be genuinely good at first."
      />

      <Section className="hairline !pt-16">
        <Container>
          <Reveal>
            <Eyebrow>Why this vertical</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              Four problems that show up in almost every clinic.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] md:grid-cols-2">
            {pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="bg-surface/60">
                <div className="h-full p-8">
                  <h3 className="text-subheading font-medium">{p.title}</h3>
                  <p className="mt-4 text-body text-[color:var(--text-secondary)]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>The journey</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              Enquiry to repeat visit, on one system.
            </h2>
          </Reveal>

          <ol className="mt-14 space-y-px overflow-hidden rounded-card border border-[color:var(--border-subtle)]">
            {journey.map((j, i) => (
              <Reveal key={j.stage} delay={i * 0.04} className="bg-surface/60">
                <li className="grid gap-5 p-7 md:grid-cols-[180px_1fr] md:p-8">
                  <p className="font-mono text-eyebrow uppercase text-blue-soft">
                    {j.stage}
                  </p>
                  <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
                    {j.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>What it will not do</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              Configured to stay inside the lines.
            </h2>
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              In a clinical setting the constraints matter more than the
              capabilities. These are built in, not bolted on.
            </p>
            <ul className="mt-10 space-y-3">
              {boundaries.map((b) => (
                <li
                  key={b}
                  className="flex gap-4 border-t border-[color:var(--border-subtle)] pt-4 text-body text-[color:var(--text-secondary)]"
                >
                  <span
                    aria-hidden
                    className="mt-3 h-px w-4 shrink-0 bg-blue-soft"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
              ArkFlow is an early company and does not yet publish client
              results. When there are case studies, they will appear with the
              client&apos;s sign-off and not before.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Start with a Lead Response Audit."
        body="We measure how fast enquiries to your clinic actually get answered — nights, weekends, mid-treatment — and put a number on the gap. Free, and useful whether or not you work with us."
      />
    </>
  );
}
