"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="pb-16 pt-36 md:pb-20 md:pt-44">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-display font-semibold">{title}</h1>
          {lead && (
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {lead}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
