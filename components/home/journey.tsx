"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { useInView } from "@/lib/use-in-view";
import { journey } from "@/lib/content";

const JourneyCurrent = dynamic(
  () => import("@/components/three/journey-current"),
  { ssr: false }
);

/**
 * The Revenue Journey — 3D state three: the current, ordered.
 * The same particles that leaked in the Problem section now run in a
 * disciplined stream down the section's spine, driven by scroll. The
 * flow-line connectors still draw between stages; the current gives
 * them depth.
 */
export function Journey() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: gateRef, inView } = useInView<HTMLDivElement>();

  // Scroll progress through the section drives how far the current has
  // descended — the system completes as the story does.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useRef(0);
  useEffect(
    () => scrollYProgress.on("change", (v) => (progress.current = v)),
    [scrollYProgress]
  );

  return (
    <Section ref={sectionRef as never} className="hairline relative overflow-hidden">
      <div ref={gateRef} className="absolute inset-0 -z-10" aria-hidden>
        {!reduce && inView && <JourneyCurrent progress={progress} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0e1a_74%)]" />
      </div>

      <Container>
        <Reveal className="text-center">
          <Eyebrow>The revenue journey</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-heading font-semibold">
            One system, from first message to paid invoice
          </h2>
        </Reveal>

        <div className="mx-auto mt-20 max-w-2xl">
          {journey.map((item, i) => (
            <div key={item.stage} className="flex flex-col items-center">
              <Reveal delay={0.05} className="w-full">
                <div className="grid items-baseline gap-2 text-center md:grid-cols-[1fr_auto_1fr] md:gap-8 md:text-left">
                  <p
                    className={`font-mono text-eyebrow uppercase md:text-right ${
                      item.stage === "Operate"
                        ? "text-blue-soft"
                        : "text-platinum"
                    }`}
                  >
                    {item.stage}
                  </p>
                  <span className="hidden h-1.5 w-1.5 rounded-full bg-[color:var(--border-strong)] md:block" />
                  <p className="text-body text-[color:var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>

              {i < journey.length - 1 && (
                <motion.div
                  className="flow-line my-4 h-20"
                  initial={reduce ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top" }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
