"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useInView } from "@/lib/use-in-view";

const HeroFlow = dynamic(() => import("@/components/three/hero-flow"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

function MaskedLine({
  children,
  delay,
  reduce,
}: {
  children: React.ReactNode;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

type Capture = { id: number; x: number; y: number };

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: gateRef, inView } = useInView<HTMLDivElement>();
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [interacted, setInteracted] = useState(false);
  const captureId = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], [0.9, 0]);

  // "captured" caption at the drop point, gone in 1.4s
  const onCapture = useCallback((x: number, y: number) => {
    setInteracted(true);
    const id = captureId.current++;
    setCaptures((c) => [...c.slice(-3), { id, x, y }]);
    setTimeout(() => setCaptures((c) => c.filter((k) => k.id !== id)), 1400);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-28 pt-40 md:pb-36 md:pt-48"
    >
      {/* THE LIVING CURRENT — order follows the pointer; a click drops a
          lead the current catches. The interaction layer sits behind the
          copy but above the vignette, so the field is touchable in the
          space around the text. */}
      <motion.div
        ref={gateRef}
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: fieldY, opacity: fieldOpacity }}
      >
        {!reduce && inView && <HeroFlow onCapture={onCapture} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0e1a_78%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </motion.div>

      {/* Capture captions */}
      <AnimatePresence>
        {captures.map((c) => (
          <motion.span
            key={c.id}
            className="pointer-events-none fixed z-10 font-mono text-eyebrow uppercase text-blue-soft"
            style={{ left: c.x + 10, top: c.y - 22 }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -6 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease }}
          >
            captured
          </motion.span>
        ))}
      </AnimatePresence>

      <Container className="pointer-events-none">
        <motion.div style={reduce ? undefined : { y: textY }}>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <Eyebrow>Revenue Operations · Singapore</Eyebrow>
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-display-xl font-semibold">
            <MaskedLine delay={0.1} reduce={reduce}>
              Never lose another
            </MaskedLine>
            <MaskedLine delay={0.22} reduce={reduce}>
              lead, booking, or invoice.
            </MaskedLine>
          </h1>

          <motion.p
            className="mt-7 max-w-prose text-lead text-[color:var(--text-secondary)]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease }}
          >
            ArkFlow is a Revenue Operations partner for Singapore clinics and
            service businesses. We build and manage the AI systems that answer
            every enquiry in under 90 seconds, keep your calendar full, and
            collect payment without chasing.
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease }}
          >
            <Button href="/contact" size="large" withArrow>
              Book Discovery Call
            </Button>
            <Button href="#packages" variant="secondary" size="large">
              See Packages
            </Button>
          </motion.div>

          <motion.p
            className="mt-14 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            Response &lt; 90 sec&ensp;·&ensp;Live in 72 hours&ensp;·&ensp;30-Day
            Response Guarantee
          </motion.p>

          {/* Affordance hint — appears once, retires after first catch */}
          {!reduce && (
            <AnimatePresence>
              {!interacted && (
                <motion.p
                  className="mt-4 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                >
                  Click the current — drop a lead in. Watch it get caught.
                </motion.p>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
