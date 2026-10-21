"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The elements Reveal can render as. Deliberately a small, closed set
 * rather than a generic — these are the only parents that care.
 */
const AS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
  /**
   * The element to render.
   *
   * ADDED 21 October 2026, to fix an accessibility defect rather than
   * for styling. Reveal always rendered a <div>, so wrapping list
   * items in it produced <ul><div><li>…</li></div></ul>. That is
   * invalid HTML, and axe reports it twice over — "list element has
   * direct children that are not allowed" and "list item does not
   * have a <ul> or <ol> parent" — because a screen reader walking the
   * list no longer finds the items in it. It cost /aesthetic-clinics
   * twelve accessibility points.
   *
   * Pass as="li" inside a <ul> or <ol>. The <li> then IS the animated
   * element, so there is no extra wrapper to get the nesting wrong.
   */
  as?: keyof typeof AS;
}

/**
 * Reveal — the house scroll animation. Text fades upward, once,
 * gently. Every scroll reveal on the site uses this primitive so
 * motion stays consistent and calm.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = AS[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
