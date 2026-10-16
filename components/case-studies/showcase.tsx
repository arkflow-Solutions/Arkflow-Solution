"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { track } from "@/lib/analytics";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Showcase — the proof, shown rather than described.
 *
 * THE WHOLE ARGUMENT OF THIS PAGE IS AN IMAGE. A visitor deciding
 * whether ArkFlow can build is not going to be convinced by a list of
 * deliverables; they want to see the thing and then go and poke at it
 * themselves. So the work is presented at the size it deserves, inside
 * a browser frame whose address bar carries the real host, with a
 * single outbound link that invites exactly that poking.
 *
 * THE CONTRAST IS THE DESIGN. ArkFlow's site is near-black. The site
 * being shown is warm and near-white. Set one inside the other and the
 * screenshot lights up on its own — no decoration required beyond a
 * soft blue bloom behind it, which stays inside the locked palette
 * (Tailwind config: "do not add colours outside this palette").
 *
 * TWO DEVICES, BECAUSE THE PHONE IS THE REAL ONE. Most of this
 * client's visitors are on a phone at the moment they decide to ask
 * about a date. Showing the desktop alone would be showing the less
 * important half.
 *
 * MOTION IS A DRIFT, NOT AN EFFECT. The two frames travel at slightly
 * different rates as the section passes, which reads as depth. Under
 * prefers-reduced-motion both are pinned and nothing moves — the
 * composition does not depend on it.
 */
export function Showcase({ study }: { study: CaseStudy }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  const inView = useInView(ref, { once: true, margin: "-120px" });
  if (inView && !seen.current) {
    seen.current = true;
    track("case_study_view", { slug: study.slug, location: "case_studies" });
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* Small numbers on purpose, and the phone's is small for a second
     reason: its travel is a live offset on top of its layout
     position, so anything sitting below the frame has to clear the
     overhang PLUS the full amplitude. At an earlier ±64 the "Open
     khaivisuals.com" link measured 18px *behind* the phone on a
     1440px viewport. The amplitude is part of this layout, not a
     decoration that can be tuned independently of it — see the
     clearance note on .af-cs-visit. */
  const frameY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section className="af-cs-showcase" ref={ref}>
      <Container>
        <motion.div className="af-cs-stage" style={reduce ? undefined : { y: frameY }}>
          <div aria-hidden className="af-cs-bloom" />

          {/* The browser. The chrome is drawn, not screenshotted, so the
              address bar states the live host in real text — selectable,
              readable to a screen reader, and correct at any zoom. */}
          <figure className="af-cs-browser">
            <div className="af-cs-chrome">
              <span aria-hidden className="af-cs-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="af-cs-url">{study.host}</span>
            </div>
            <Image
              src={study.shots.desktop.src}
              alt={study.shots.desktop.alt}
              width={study.shots.desktop.width}
              height={study.shots.desktop.height}
              sizes="(max-width: 1024px) 100vw, 1100px"
              priority
              className="af-cs-screen"
            />
          </figure>

          <motion.figure
            className="af-cs-phone"
            style={reduce ? undefined : { y: phoneY }}
          >
            <Image
              src={study.shots.mobile.src}
              alt={study.shots.mobile.alt}
              width={study.shots.mobile.width}
              height={study.shots.mobile.height}
              sizes="(max-width: 1024px) 34vw, 220px"
              className="af-cs-screen"
            />
          </motion.figure>
        </motion.div>

        {/* The invitation to check. An outbound link on a proof page is
            not a leak — it is the proof. */}
        <div className="af-cs-visit">
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="af-cs-visit__link"
            onClick={() =>
              track("case_study_visit_click", {
                slug: study.slug,
                location: "case_studies_showcase",
              })
            }
          >
            Open {study.host}
            <ArrowUpRight size={18} aria-hidden />
          </a>
          <p className="af-cs-visit__note">
            Live site, in a new tab. Everything on this page can be
            checked there.
          </p>
        </div>
      </Container>
    </section>
  );
}
