"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useInView } from "@/lib/use-in-view";
import { problems } from "@/lib/content";

const LeakField = dynamic(() => import("@/components/three/leak-field"), {
  ssr: false,
});

export function Problem() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Section className="hairline relative overflow-hidden">
      {/* 3D state two: the current, leaking. Particles break from the
          stream and fall away — revenue leaving quietly. */}
      <div ref={ref} className="absolute inset-0 -z-10" aria-hidden>
        {!reduce && inView && <LeakField />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0e1a_72%)]" />
      </div>

      <Container>
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-heading font-semibold">
            Revenue rarely leaves loudly. It leaks quietly.
          </h2>
          <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
            Most service businesses don&apos;t have a demand problem. They have
            five small operational gaps, each costing hours every week and
            thousands every month.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="border-t border-[color:var(--border-subtle)] pt-6">
                <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-subheading font-medium">{p.title}</h3>
                <p className="mt-3 text-body text-[color:var(--text-secondary)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
