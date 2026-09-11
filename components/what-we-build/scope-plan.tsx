"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { cn } from "@/lib/utils";
import { plan } from "@/lib/what-we-build-content";

/**
 * The scope plan — one engagement, drawn from above.
 *
 * WHAT IT SHOWS. A boundary with three zones inside it and five
 * annotations standing outside it. Inside is what ArkFlow builds and
 * then keeps operating; outside is what it does not do. Every zone is
 * written in two registers — BUILD, in a dashed draft line, and
 * OPERATE, in a solid accent line — because the operating relationship
 * is the most differentiated thing ArkFlow offers and it used to be a
 * footnote under the third layer of a feature list.
 *
 * NOT A NEIGHBOUR'S DEVICE. No path (the homepage's Throughline), no
 * rooms walked in sequence (/attract), no record accumulating over time
 * (/solutions). One area, seen whole, with an edge.
 *
 * TWO LIGHT DRIVERS. One useViewportProgress reads the plan's position
 * and draws the one object that is genuinely single — the boundary,
 * tracing itself clockwise. One IntersectionObserver lights everything
 * the reader actually reads — six registers and five annotations —
 * each as the reader reaches it (see below). The previous /packages
 * page ran about forty separate Reveal animations; this runs one
 * measurement and one observer.
 *
 * DOM AUTHORITY. Every word is rendered at all times. Motion changes
 * opacity and colour, never whether something exists, so the page is
 * complete without JavaScript and complete to a crawler.
 *
 * REDUCED MOTION. The hook reports `settled`; the plan then resolves
 * drawn, built and operating in one frame. The media rules in
 * what-we-build.css are the second guarantee.
 */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function ScopePlan() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, settled } = useViewportProgress(ref, 1, 0.01);

  const p = settled ? 1 : progress;

  /* The boundary is one object, so it is drawn from the plan's position
     as a whole. The annotations outside it are lit individually by the
     observer below, for the same reason the registers are: at a normal
     900px desktop viewport they sit below the plan, and a plan-wide
     phase left them partly dim at the moment they were first read. */
  const drawn = clamp01((p - 0.1) / 0.24);

  /* Clockwise trace: top, right, bottom, left, a quarter each. */
  const edge = (i: number) => clamp01(drawn * 4 - i);

  /* THE REGISTERS ARE WATCHED ONE BY ONE, NOT AS A PLAN.
     They were first driven by the plan's overall position, which works
     on a desktop — three zones on one row, all in view at once — and
     fails on a phone, where the plan is a 1,259px column and the three
     zones stack. There, OPERATE went live when zone 01 was already
     426px above the top of the screen: the reader passed the front door
     in its unfinished state and never saw it start running.

     Observing each register individually gives the right behaviour at
     both widths with one mechanism. On a desktop the registers share a
     row, so all three go live together and the plan reads as one
     system changing state. On a phone each zone goes live as the reader
     reaches it, BUILD before OPERATE, because that is the order they
     sit in.

     A register does not un-light on the way back up. A system that is
     running does not stop because someone scrolled. */
  const [lit, setLit] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    if (settled) return;
    const host = ref.current;
    if (!host || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const key = (e.target as HTMLElement).dataset.reg;
          if (!key) return;
          setLit((prev) => {
            if (prev.has(key)) return prev;
            const next = new Set(prev);
            next.add(key);
            return next;
          });
        });
      },
      /* A band across the middle of the viewport, so a register lights
         when the reader is at it rather than when its first pixel
         appears at the bottom edge. */
      { rootMargin: "-30% 0px -30% 0px" }
    );

    host
      .querySelectorAll<HTMLElement>("[data-reg]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [settled]);

  const isLit = (key: string) => settled || lit.has(key);

  return (
    <div ref={ref}>
      {/* ------------------------------------------------ the legend */}
      <div className="af-wwb-legend">
        <p className="af-wwb-legend__item">
          <span aria-hidden className="af-wwb-legend__swatch" />
          <span>
            <span className="af-wwb-legend__label">
              {plan.legend.build.label}
            </span>{" "}
            {plan.legend.build.body}
          </span>
        </p>
        <p className="af-wwb-legend__item">
          <span
            aria-hidden
            className="af-wwb-legend__swatch af-wwb-legend__swatch--operate"
          />
          <span>
            <span className="af-wwb-legend__label">
              {plan.legend.operate.label}
            </span>{" "}
            {plan.legend.operate.body}
          </span>
        </p>
      </div>

      {/* -------------------------------------------------- the plan */}
      <div className="af-wwb-plan">
        {/* The line drawing itself. Decorative — the neutral border
            beneath it carries the boundary without JavaScript. */}
        <span
          aria-hidden
          className="af-wwb-edge af-wwb-edge--t"
          style={{ transform: `scaleX(${edge(0)})` }}
        />
        <span
          aria-hidden
          className="af-wwb-edge af-wwb-edge--r"
          style={{ transform: `scaleY(${edge(1)})` }}
        />
        <span
          aria-hidden
          className="af-wwb-edge af-wwb-edge--b"
          style={{ transform: `scaleX(${edge(2)})` }}
        />
        <span
          aria-hidden
          className="af-wwb-edge af-wwb-edge--l"
          style={{ transform: `scaleY(${edge(3)})` }}
        />

        <span className="af-wwb-dim">{plan.boundaryLabel}</span>

        <div className="af-wwb-zones">
          {plan.zones.map((z) => (
            <section key={z.index} className="af-wwb-zone" aria-labelledby={`zone-${z.index}`}>
              <p>
                <span className="af-wwb-zone__index">{z.index}</span>
                <span className="af-wwb-zone__name">{z.name}</span>
              </p>
              <h3 id={`zone-${z.index}`} className="af-wwb-zone__title">
                {z.title}
              </h3>

              <div
                data-reg={`${z.index}-build`}
                className="af-wwb-reg"
                style={{ opacity: isLit(`${z.index}-build`) ? 1 : 0.3 }}
              >
                <p className="af-wwb-reg__label">{plan.legend.build.label}</p>
                <p className="af-wwb-reg__body">{z.build}</p>
              </div>

              <div
                data-reg={`${z.index}-operate`}
                className={cn(
                  "af-wwb-reg af-wwb-reg--operate",
                  isLit(`${z.index}-operate`) && "is-live"
                )}
                style={{ opacity: isLit(`${z.index}-operate`) ? 1 : 0.3 }}
              >
                <p className="af-wwb-reg__label">
                  {plan.legend.operate.label}
                </p>
                <p className="af-wwb-reg__body">{z.operate}</p>
              </div>

              <Link href={z.href} className="af-wwb-zone__link">
                {z.hrefLabel} &rarr;
              </Link>
            </section>
          ))}
        </div>
      </div>

      {/* ----------------------------------------- outside the line */}
      <div className="af-wwb-outside">
        <p className="af-wwb-outside__label">{plan.outsideLabel}</p>
        <ul className="af-wwb-outside__list">
          {plan.outside.map((o, i) => (
            <li
              key={o.name}
              data-reg={`out-${i}`}
              className="af-wwb-note"
              style={{ opacity: isLit(`out-${i}`) ? 1 : 0.35 }}
            >
              <p className="af-wwb-note__name">{o.name}</p>
              <p className="af-wwb-note__body">{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
