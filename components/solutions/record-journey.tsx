"use client";

import { useEffect, useRef, useState } from "react";
import { opening, stations, payoff } from "@/lib/solutions-content";

/**
 * The opportunity record, gaining history.
 *
 * ONE OBJECT, NOT A DIAGRAM. Every station writes into the same record.
 * Nothing is drawn between the stations because nothing needs to be:
 * the record still being there, three screens later and fuller than it
 * was, is the connection. A line is geometry; a record is history.
 *
 * WHY AN OBSERVER AND NOT useViewportProgress. The hook reports a
 * continuous 0→1 for one element; what this needs is a discrete "which
 * station have we reached", across six of them. That is what
 * IntersectionObserver is for, and it is the same pattern
 * CustomerJourney already uses on the homepage.
 *
 * THE RECORD DOES NOT REWIND. `reached` only ever advances. Scrolling
 * back up does not un-write history, because that is not what records
 * do — and it means there is no reverse state to get wrong.
 *
 * TWO COPIES, ONE VISIBLE. Below 1024px each station carries its own
 * entries inline; at 1024px and up those are hidden by CSS and the
 * entries collect into the sticky record instead. The sticky copy is
 * aria-hidden, so a screen reader is given the station-inline copy
 * once and never hears the same entry twice. The inline copy is the
 * authoritative one: it renders without JavaScript and is what a
 * crawler reads.
 *
 * COST. One observer, no timers, no keyframe loops, no canvas, no
 * WebGL, no new dependency. No analytics event — there is no
 * interaction here to report.
 */

type Written = { stage: string; at: string; text: string };

/** Entries from every station up to and including `upTo`. */
function entriesUpTo(upTo: number): Written[] {
  const out: Written[] = [];
  for (let i = 0; i <= upTo && i < stations.length; i++) {
    out.push(...stations[i].entries);
  }
  return out;
}

const allEntries = entriesUpTo(stations.length - 1);
const TOTAL_ENTRIES = allEntries.length;

export function RecordJourney() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* Reduced motion resolves the whole record at once: a reader who
       has asked for no motion still gets the complete history rather
       than an empty column. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReached(stations.length - 1);
      return;
    }

    const items = Array.from(
      host.querySelectorAll<HTMLElement>("[data-station]")
    );
    if (typeof IntersectionObserver === "undefined") {
      setReached(stations.length - 1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.station);
          setReached((prev) => (i > prev ? i : prev));
        });
      },
      /* A band across the middle of the viewport, so a station writes
         to the record when the reader is actually at it rather than
         when its first pixel appears. */
      { rootMargin: "-30% 0px -40% 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const written = entriesUpTo(reached);

  /* The list is a fixed window, so the newest line has to be brought
     into it — otherwise the record keeps writing below the fold of its
     own page. Same behaviour as the system log on the homepage. */
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = Math.max(
      0,
      /* Stop just under the newest entry rather than at the very
         bottom, so the ruled lines still to come stay visible and the
         record reads as unfinished. */
      written.length * 69 - el.clientHeight + 40
    );
  }, [written.length]);

  return (
    <div ref={hostRef} className="af-sol-grid">
      {/* ------------------------------------------- the stations */}
      <div>
        {/* ONE RECORD, NOT TWO. The opening line used to sit in its own
            section above this grid, beside a second, separate copy of
            the record. That split the identity of the very object the
            page is about: the reader met one record, scrolled, and met
            another. The line now opens this column, so the record on
            the right is the only one there has ever been. */}
        <p className="af-sol-open">{opening.line}</p>

        {stations.map((s, i) => (
          <section
            key={s.id}
            /* CONTRACTUAL ANCHOR. Renaming any of these breaks the
               footer links and a published article — see the note at
               the head of lib/solutions-content.ts. */
            id={s.id}
            data-station={i}
            className="af-sol-station scroll-mt-24"
          >
            <p className="af-sol-station__stages">
              {s.stages.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </p>

            {/* The business owner's question is the dominant line on
                every station. The capability is the answer underneath
                it, never the opening. */}
            <h2 className="af-sol-station__q">{s.question}</h2>

            <p className="af-sol-station__title">{s.title}</p>
            <p className="af-sol-station__body">{s.body}</p>

            {/* What the record gains here. Authoritative copy: always
                rendered, no JavaScript required. Hidden at 1024px and
                up, where the sticky record shows the same entries. */}
            {s.entries.length > 0 && (
              <div className="af-sol-delta">
                <p className="af-sol-delta__label">Added to the record</p>
                <ol className="af-sol-record__list">
                  {s.entries.map((e) => (
                    <li key={e.at + e.text} className="af-sol-entry">
                      <span className="af-sol-entry__at">{e.at}</span>
                      <span className="af-sol-entry__stage">{e.stage}</span>
                      <p className="af-sol-entry__text">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {s.leak && <p className="af-sol-leak">{s.leak}</p>}

            <ul className="af-sol-caps">
              {s.capabilities.map((c) => (
                <li key={c.name} className="af-sol-cap">
                  <b>{c.name}</b> <span>{c.availability}</span>
                </li>
              ))}
            </ul>

            {s.note && <p className="af-sol-note">{s.note}</p>}
          </section>
        ))}

        {/* ----------------------------------------- the payoff */}
        <section className="af-sol-station">
          <div className="af-sol-payoff">
            <p className="af-sol-station__stages">
              <span>{payoff.eyebrow}</span>
            </p>
            <h2 className="af-sol-payoff__title">{payoff.title}</h2>
            <p className="af-sol-payoff__body">{payoff.body}</p>
            <p className="af-sol-record__open">
              {opening.who} · {TOTAL_ENTRIES} entries · still open
            </p>
          </div>
        </section>
      </div>

      {/* --------------------------------------- the sticky record
          Decorative duplicate of the entries above, so it is hidden
          from assistive technology. Below 1024px CSS removes it. */}
      <aside
        className="af-sol-record af-sol-record--sticky"
        aria-hidden="true"
      >
        <div className="af-sol-record__head">
          <span className="af-sol-record__label">{opening.label}</span>
          <span className="af-sol-mark">{opening.illustrative}</span>
        </div>

        <p className="af-sol-record__id">{opening.who}</p>
        <p className="af-sol-record__meta">
          {opening.channel} · opened {opening.opened}
        </p>

        {/* RULED LINES, RESERVED FROM THE START.
            The record used to render only what had been written, so at
            the first station it was a 121px sliver in a 336px column
            beside 670px of text — technically present, visually an
            empty gutter, which is the opposite of the point. It now
            reserves every line it will eventually hold, like a ledger
            page: the object is full-size and obviously a record from
            the moment it appears, and the reader can see how much
            history is still to come. Unwritten lines carry no text, so
            nothing is given away early. */}
        <ol ref={listRef} className="af-sol-record__list">
          {allEntries.map((e, i) => {
            const isWritten = i < written.length;
            if (!isWritten) {
              return (
                <li
                  key={`empty-${i}`}
                  className="af-sol-entry af-sol-entry--empty"
                />
              );
            }
            return (
              <li
                key={e.at + e.text}
                className="af-sol-entry"
                /* The newest entry arrives slightly under strength and
                   comes up as the next one lands. The `< TOTAL_ENTRIES`
                   guard matters: without it the final line of a
                   finished record stays dimmer than every line above it
                   forever, which reads as an error, not an arrival. */
                style={{
                  opacity:
                    i === written.length - 1 && written.length < TOTAL_ENTRIES
                      ? 0.85
                      : 1,
                }}
              >
                <span className="af-sol-entry__at">{e.at}</span>
                <span className="af-sol-entry__stage">{e.stage}</span>
                <p className="af-sol-entry__text">{e.text}</p>
              </li>
            );
          })}
        </ol>

        <p className="af-sol-record__open">
          {written.length === 0
            ? "Record open · nothing yet"
            : `${written.length} of ${TOTAL_ENTRIES} · still open`}
        </p>
      </aside>
    </div>
  );
}
