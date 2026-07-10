"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { useCalendly } from "@/lib/use-calendly";
import { contact } from "@/lib/content";

const CtaFocus = dynamic(() => import("@/components/three/cta-focus"), {
  ssr: false,
});

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const openCalendly = useCalendly(contact.call.href);
  const reduce = useReducedMotion();
  const near = useInView(ref, { margin: "600px 0px" });

  return (
    <Section ref={ref} className="hairline relative overflow-hidden">
      {/* The closing 3D moment: everything converges on one point */}
      {!reduce && near && (
        <div className="absolute inset-0 -z-10 opacity-80">
          <CtaFocus />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0a0e1a_80%)]" />
        </div>
      )}

      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-display font-semibold">
            Find out what your business is leaking.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            A 30-minute discovery call. We map your enquiry-to-payment flow and
            show you exactly where revenue is slipping through — useful whether
            or not you work with us.
          </p>
          <div className="mt-10">
            <Button onClick={openCalendly} size="large">
              Book Discovery Call
            </Button>
          </div>
          <p className="mt-8 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
            No obligation · 30 minutes · Singapore business hours
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
