"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";

export function CtaBand({
  title = "Find out what your business is leaking.",
  body = "A 30-minute discovery call. We map your enquiry-to-payment flow and show you exactly where revenue is slipping through — useful whether or not you work with us.",
}: {
  title?: string;
  body?: string;
}) {
  const openBooking = useBooking(contact.call.href);
  return (
    <Section className="hairline">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-heading font-semibold">{title}</h2>
          <p className="mx-auto mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {body}
          </p>
          <div className="mt-9">
            <Button onClick={openBooking} size="large" withArrow>
              Book Discovery Call
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
