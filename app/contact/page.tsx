import type { Metadata } from "next";
import { MessageCircle, Mail, CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { contact, guarantee } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute discovery call with ArkFlow, or reach us on WhatsApp — the same channel we build on.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Thirty minutes. Your numbers. A straight answer."
        lead={contact.call.body}
      />

      <Section className="hairline !pt-16">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            <Reveal>
              <Card emphasis className="flex h-full flex-col">
                <CalendarCheck size={22} className="text-blue-soft" aria-hidden />
                <h2 className="mt-5 text-subheading font-medium">{contact.call.title}</h2>
                <p className="mt-3 text-body text-[color:var(--text-secondary)]">
                  Pick a slot that suits you. The call includes a Lead Response
                  Audit on your current numbers.
                </p>
                <div className="mt-auto pt-7">
                  {/* CURRENT IMPLEMENTATION — VERIFY BEFORE ACTING:
                      replace href with the live GHL booking-calendar link */}
                  <Button href={contact.call.href} className="w-full" withArrow>
                    Book Discovery Call
                  </Button>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card className="flex h-full flex-col">
                <MessageCircle size={22} className="text-platinum" aria-hidden />
                <h2 className="mt-5 text-subheading font-medium">{contact.whatsapp.title}</h2>
                <p className="mt-3 text-body text-[color:var(--text-secondary)]">
                  {contact.whatsapp.body}
                </p>
                <div className="mt-auto pt-7">
                  {/* CURRENT IMPLEMENTATION — replace with the live wa.me link */}
                  <Button href={contact.whatsapp.href} variant="secondary" className="w-full">
                    Message on WhatsApp
                  </Button>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.16}>
              <Card className="flex h-full flex-col">
                <Mail size={22} className="text-platinum" aria-hidden />
                <h2 className="mt-5 text-subheading font-medium">{contact.email.title}</h2>
                <p className="mt-3 text-body text-[color:var(--text-secondary)]">
                  For anything longer-form — proposals, partnerships, press.
                </p>
                <div className="mt-auto pt-7">
                  <Button
                    href={`mailto:${contact.email.address}`}
                    variant="secondary"
                    className="w-full"
                  >
                    {contact.email.address}
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 text-center font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              {contact.base}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* What happens on the call */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>What happens on the call</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">No pitch until the numbers say so</h2>
            <div className="mt-8 space-y-6 text-body text-[color:var(--text-secondary)]">
              <p>
                First twenty minutes: your enquiry-to-payment flow, mapped —
                where enquiries arrive, how fast they&apos;re answered today,
                what happens to bookings and invoices after.
              </p>
              <p>
                Last ten minutes: what the gaps are costing, in your own SGD
                figures — and, only if the numbers justify it, which single
                package we&apos;d recommend. If they don&apos;t, we&apos;ll say
                so and you keep the audit.
              </p>
              <p className="font-medium text-white">
                Every engagement is backed by the {guarantee.name}.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
