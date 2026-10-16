"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { BuildFact } from "@/lib/case-studies";

/**
 * BuildFacts — four counts, each of which can be re-measured.
 *
 * THE HEADING ON THE PAGE SAYS "WHAT WAS BUILT", NOT "RESULTS", AND
 * THAT WORDING IS LOAD-BEARING. A row of large numerals on an agency
 * site is read as performance by default. These are not performance:
 * they are the size and construction of the thing delivered. Each one
 * carries the method underneath it in small type so a sceptical reader
 * can go and count it themselves, which is the only kind of number
 * this site is allowed to print.
 *
 * THE COUNT-UP IS CAPPED AT 1.1 SECONDS and runs once. It exists
 * because a numeral that arrives rather than appears is read; it is
 * not a progress bar and must never imply growth over time. Under
 * prefers-reduced-motion the final value is rendered immediately.
 */
function useCountUp(target: number, run: boolean, reduce: boolean) {
  const [value, setValue] = useState(() => (reduce ? target : 0));

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!run) return;
    /* A zero has nothing to count to, and animating it looks broken. */
    if (target === 0) {
      setValue(0);
      return;
    }

    const DURATION = 1100;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutCubic — fast first, settling rather than stopping.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduce]);

  return value;
}

function Fact({ fact, run }: { fact: BuildFact; run: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const value = useCountUp(fact.value, run, reduce);

  return (
    <li className="af-cs-fact">
      {/* The true value is in the DOM for assistive technology and for
          anyone who lands mid-animation; the counting numeral is
          decorative and hidden from the accessibility tree. */}
      <span className="sr-only">
        {fact.value.toLocaleString("en-SG")} {fact.label}
      </span>
      <span aria-hidden className="af-cs-fact__value">
        {value.toLocaleString("en-SG")}
      </span>
      <span aria-hidden className="af-cs-fact__label">
        {fact.label}
      </span>
      <span className="af-cs-fact__source">{fact.source}</span>
    </li>
  );
}

export function BuildFacts({ facts }: { facts: BuildFact[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <ul className="af-cs-facts" ref={ref}>
      {facts.map((f) => (
        <Fact key={f.label} fact={f} run={inView} />
      ))}
    </ul>
  );
}
