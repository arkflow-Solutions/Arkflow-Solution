"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section className="hairline">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-heading font-semibold">
            Asked by every clinic owner. Answered plainly.
          </h2>
        </Reveal>

        <div className="mt-14">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className="border-b border-[color:var(--border-subtle)]">
                  <button
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-body font-medium">{item.q}</span>
                    <Plus
                      size={18}
                      aria-hidden
                      className={`shrink-0 text-platinum transition-transform duration-300 ease-premium ${
                        isOpen ? "rotate-45 text-blue-soft" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose pb-7 text-body text-[color:var(--text-secondary)]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
