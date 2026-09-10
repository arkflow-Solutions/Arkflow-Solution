"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { BookCallButton } from "@/components/pages/book-call-button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  catalogue,
  restaging,
  environments,
  painPaths,
  capability,
} from "@/lib/attract-content";

/**
 * The Website page's four demonstrations.
 *
 * WHY THESE ARE COMPONENTS AND NOT COPY. The page argues that a website
 * guides a decision rather than storing information. An argument made in
 * paragraphs would be the thing it is arguing against, so each of these
 * shows the behaviour instead: a flat catalogue losing a visitor, the
 * same items re-staged around a decision, four environments that answer
 * one question each, and a path that responds to what the visitor says
 * is wrong.
 *
 * SHARED MACHINERY, READ ONLY. `useViewportProgress` is the same hook the
 * homepage scenes use. Nothing here modifies it, the Throughline, the
 * scene shell, or globals.css — the styles live in app/attract/attract.css,
 * imported by this route alone.
 *
 * REDUCED MOTION. The hook reports `settled` under prefers-reduced-motion.
 * Every component below resolves to its finished composition when it sees
 * that flag, so the CSS media query in attract.css is a second guarantee
 * rather than the only one.
 *
 * COST. No timers, no keyframe loops, no canvas, no WebGL, no new
 * dependency. The hook is rAF-throttled and gated by an intersection
 * observer, so all four cost nothing off screen.
 */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ============================================ 02 + 03 · CATALOGUE */

/** The tile the re-staging brings forward. Index into catalogue.tiles. */
const SURFACED = 1;

/**
 * Two moments in one scroll block, on purpose.
 *
 * The re-staging is a transition, not a section — cutting to a new
 * heading would break the very continuity the page is demonstrating.
 * So the same eight tiles are dimmed, lost, and then re-composed, and
 * the visitor never sees a boundary between the bad site and the good
 * one. They see one site change.
 */
export function CatalogueToJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, settled } = useViewportProgress(ref, 1, 0.01);

  const p = settled ? 1 : progress;

  /* Three overlapping phases of one traversal. The attention point
     crosses the grid, gives up, and only then does the grid re-form. */
  const wander = clamp01((p - 0.14) / 0.22);
  const left = clamp01((p - 0.36) / 0.1);
  const staged = clamp01((p - 0.5) / 0.28);

  /* The exit notice belongs to the failure, so it retires as the
     re-staging takes over rather than sitting under the fixed state. */
  const exitOpacity = left * (1 - staged);

  /* Everything dims when the visitor leaves; the surfaced tile then
     recovers to full while the rest recede. */
  const base = 1 - left * 0.4 * (1 - staged);

  const eyeOpacity = Math.min(wander * 3, 1) * (1 - left);
  const eyeX = lerp(16, 84, wander);
  const eyeY = lerp(38, 76, wander * wander);

  return (
    <div ref={ref}>
      <div className="af-web-frame">
        <div className="af-web-frame__bar" aria-hidden>
          <span className="af-web-frame__dot" />
          <span className="af-web-frame__dot" />
          <span className="af-web-frame__dot" />
          <span className="af-web-frame__url">a typical website</span>
        </div>

        <div className="af-web-cat">
          {/* The fictional site's navigation. Generic by instruction —
              no industry, nothing resembling a real company. */}
          <nav className="af-web-cat__nav" aria-label="Example website navigation">
            {catalogue.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>

          <ul className="af-web-cat__grid">
            {catalogue.tiles.map((t, i) => {
              const isSurfaced = i === SURFACED;
              const opacity = isSurfaced
                ? base + staged * (1 - base)
                : base * (1 - staged * 0.75);
              const scale = isSurfaced
                ? 1 + staged * 0.04
                : 1 - staged * 0.05;
              return (
                <li
                  key={t}
                  className={cn(
                    "af-web-cat__tile",
                    staged > 0.5 && isSurfaced && "is-surfaced"
                  )}
                  style={{ opacity, transform: `scale(${scale})` }}
                >
                  {t}
                </li>
              );
            })}
          </ul>

          {/* Decorative. The visitor's attention, crossing and giving up. */}
          <span
            className="af-web-cat__eye"
            aria-hidden
            style={{
              left: `${eyeX}%`,
              top: `${eyeY}%`,
              opacity: eyeOpacity,
            }}
          />
        </div>
      </div>

      <p className="af-web-cat__exit" style={{ opacity: exitOpacity }}>
        {catalogue.exit}
      </p>

      {/* The re-staging, stated once and briefly. The demonstration is
          above; this is the caption, not the argument. */}
      <p
        className="mt-8 max-w-xl text-lead text-[color:var(--text-secondary)]"
        style={{ opacity: settled ? 1 : staged }}
      >
        {restaging.line}
      </p>
    </div>
  );
}

/* ============================================= 04 · ENVIRONMENTS */

/**
 * The IKEA translation. Four rooms, each answering one question, each
 * surfacing something that was already on the flat page above.
 *
 * The active room is lit and the others recede — you are standing in
 * one environment at a time, which is the whole point of the analogy.
 * Under reduced motion every room is lit at once, because a reader who
 * cannot use the scroll must still get all four.
 */
export function Environments() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, settled } = useViewportProgress(ref, 1, 0.01);

  const n = environments.rooms.length;
  const span = clamp01((progress - 0.16) / 0.62) * n;
  const active = Math.min(n - 1, Math.max(0, Math.floor(span)));

  return (
    <div ref={ref}>
      <ul className="af-web-rooms">
        {environments.rooms.map((r, i) => {
          const here = settled || i === active;
          return (
            <li
              key={r.question}
              className={cn("af-web-room", here && "is-here")}
              style={{ opacity: here ? 1 : 0.38 }}
            >
              <p className="af-web-room__q">{r.question}</p>
              <div className="af-web-room__aside">
                <span className="af-web-room__surfaces">{r.surfaces}</span>
                <p className="af-web-room__body">{r.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================= 05 · ONE PAIN, FOLLOWED */

/**
 * The page's single real interaction.
 *
 * SEMANTICS. Three toggle buttons and one live region, rather than a
 * tab widget. A tablist wants a selected tab at all times; this question
 * deliberately starts unanswered, because being asked is part of the
 * demonstration. `aria-pressed` says "this is the one I chose", the
 * panel is announced politely when it changes, and Tab plus Enter or
 * Space is all the keyboard support it needs — no roving tabindex to
 * get wrong.
 *
 * DOM AUTHORITY. All three paths are always in the markup. The choice
 * reveals one, it never fetches one, so the page is complete without
 * JavaScript and complete to a crawler.
 *
 * ANALYTICS. The existing `demo_interaction` event, once per path. The
 * closed ArkFlowEvent union is not widened, and `view` already means
 * "which side of a comparison is shown".
 */
export function PainPaths() {
  const [chosen, setChosen] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const choose = (id: string) => {
    setChosen(id);
    if (!seen.current.has(id)) {
      seen.current.add(id);
      track("demo_interaction", { location: "attract_pain_path", view: id });
    }
  };

  return (
    <div>
      <p className="text-lead text-[color:var(--text-secondary)]">
        {painPaths.prompt}
      </p>

      <div className="af-web-pick">
        {painPaths.paths.map((path) => (
          <button
            key={path.id}
            type="button"
            className="af-web-pick__btn"
            aria-pressed={chosen === path.id}
            aria-controls="af-web-path"
            onClick={() => choose(path.id)}
          >
            {path.pain}
          </button>
        ))}
      </div>

      <div id="af-web-path" className="af-web-path" aria-live="polite">
        {painPaths.paths.map((path) => {
          /* Reduced motion resolves the interaction: every path is
             expanded at once, so nothing is left behind a gesture the
             reader has asked not to be required to make. */
          const open = reduced || chosen === path.id;

          const beats = [
            { label: painPaths.steps[0], text: path.pain, mod: "pain" },
            { label: painPaths.steps[1], text: path.understanding, mod: "" },
            { label: painPaths.steps[2], text: path.solution, mod: "" },
          ];

          return (
            <div key={path.id} hidden={!open}>
              <ol className="af-web-path__list">
                {beats.map((b, i) => (
                  <li
                    key={b.label}
                    className={cn(
                      "af-web-beat",
                      b.mod === "pain" && "af-web-beat--pain"
                    )}
                    style={
                      reduced
                        ? undefined
                        : { animationDelay: `${i * 110}ms` }
                    }
                  >
                    <span className="af-web-beat__label">{b.label}</span>
                    <p className="af-web-beat__text">{b.text}</p>
                  </li>
                ))}

                <li
                  className="af-web-beat af-web-beat--action"
                  style={reduced ? undefined : { animationDelay: "330ms" }}
                >
                  <span className="af-web-beat__label">
                    {painPaths.steps[3]}
                  </span>
                  <p className="af-web-beat__text">
                    {path.action.href ? (
                      <Link
                        href={path.action.href}
                        className="text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
                      >
                        {path.action.label} &rarr;
                      </Link>
                    ) : (
                      /* This path's next step IS the canonical action, so
                         it has to be the real button. A guided journey
                         that ends in a sentence rather than a door would
                         contradict the page. */
                      <BookCallButton withArrow>
                        {path.action.label}
                      </BookCallButton>
                    )}
                  </p>
                </li>
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ 06 · THE SURFACE, AND WHAT IS UNDERNEATH IT */

/**
 * A cross-section, not a timeline.
 *
 * WHAT THIS REPLACED. Strategy → Journey → UX → Design → Development →
 * Conversion, drawn as a rail with six nodes. Two problems, both real.
 * It made the page's biggest moment a diagram of ArkFlow's method, on
 * a page arguing that a website should guide a customer — the visitor
 * was meant to think "now I see why this works", not "here are six
 * service phases". And on a phone it was the same composition as the
 * guided path in environment 05, so the page's own vocabulary had
 * started repeating, which is the failure mode environment 02 is about.
 *
 * WHAT IT IS NOW. The page reads down as depth rather than sequence.
 * Above the ground line: one environment moving through one decision —
 * the question becomes dominant, the relevant information comes
 * forward, the rest recedes, the next step becomes obvious. Below it:
 * the same six phases, still fully legible, sitting where they
 * actually sit. The method did not get cut. It got put underneath.
 *
 * NOT MAPPED ONE-TO-ONE. Five states above, six phases below, and no
 * lines drawn between them — all six are underneath all five, and a
 * tidier diagram would be a false one.
 *
 * The branch below is the confidence mechanism, unchanged. v1.4 §20
 * forbids clients, results, traffic, rankings, revenue, leads,
 * conversion rates and project volume, so there is no proof of
 * outcomes here and there must never be. What is shown instead is the
 * system declining a sale, which is the one claim this page can make
 * and keep.
 */
export function Capability() {
  /* THE REF IS ON THE CROSS-SECTION, NOT THE WHOLE SECTION.
     It first sat on the outer element, which also contains the honest
     branch and the boundary — a much taller block. Progress was
     therefore measured against something four times the height of the
     thing being animated, and the environment reached its ACTION state
     long after the panel had left the top of the viewport: the moment
     the next step becomes obvious was happening off screen, which is
     the one moment this environment exists to show. */
  const ref = useRef<HTMLDivElement>(null);
  const { progress, settled } = useViewportProgress(ref, 1, 0.01);

  const states = capability.surface.states;
  const phases = capability.substrate.phases;

  /* One traversal drives both layers. The surface steps through its
     five states; the substrate fills underneath it, finishing a little
     later so the build layer reads as supporting the experience rather
     than racing it. */
  const walk = clamp01((progress - 0.12) / 0.42) * states.length;
  const active = Math.min(states.length - 1, Math.max(0, Math.floor(walk)));
  const under = clamp01((progress - 0.16) / 0.46) * phases.length;

  /* The action resolves as the environment reaches ACTION — not after
     it. When the customer's state is "there is one obvious thing to do
     next", the obvious thing has to already be unmistakable. */
  const actLit = settled
    ? 1
    : lerp(0.35, 1, clamp01((walk - (states.length - 1.5)) / 0.5));

  return (
    <div>
      <div ref={ref}>
      {/* ---- above the line: what the customer experiences ---- */}
      <div className="af-web-stage">
        <span className="af-web-stage__label">{capability.surface.label}</span>

        <div className="af-web-lines">
          {states.map((s, i) => (
            <div
              key={s.key}
              className="af-web-line"
              style={{
                opacity: settled ? 1 : i === active ? 1 : 0,
                transform:
                  settled || i === active ? "none" : "translateY(6px)",
              }}
              /* Only the state being shown is announced. Under reduced
                 motion every state is visible, so none are hidden. */
              aria-hidden={settled ? undefined : i !== active}
            >
              <span className="af-web-line__key">{s.key}</span>
              <p className="af-web-line__text">{s.line}</p>
            </div>
          ))}
        </div>

        {/* The information in the environment. One forward, rest back —
            the eight-tiles-become-one move from environment 02, played
            at the scale of a single screen. */}
        <ul className="af-web-chips">
          {states.map((s, i) => {
            const forward = settled || i === active;
            return (
              <li
                key={s.forward}
                className={cn("af-web-chip", forward && "is-forward")}
                /* Opacity only. A scale on the inactive items nudged the
                   wrapped row's line breaks around as the marker moved,
                   which is exactly the fidgeting a showroom does not do. */
                style={{ opacity: forward ? 1 : 0.45 }}
              >
                {s.forward}
              </li>
            );
          })}
        </ul>

        <div className="af-web-act" style={{ opacity: actLit }}>
          <BookCallButton withArrow>{capability.surface.action}</BookCallButton>
        </div>
      </div>

      {/* ---- the ground the environment stands on ---- */}
      <div className="af-web-ground" aria-hidden />

      {/* ---- below the line: what we build so that happens ---- */}
      <div className="af-web-substrate">
        <span className="af-web-substrate__label">
          {capability.substrate.label}
        </span>
        <ul className="af-web-phases">
          {phases.map((p, i) => (
            <li
              key={p}
              className={cn("af-web-phase", (settled || under > i) && "is-on")}
              style={{ opacity: settled ? 1 : lerp(0.4, 1, clamp01(under - i)) }}
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="af-web-substrate__note">{capability.substrate.note}</p>
      </div>
      </div>

      {/* v1.4 §3. Mandatory, and deliberately not behind an interaction. */}
      <div className="af-web-branch">
        <p className="af-web-branch__title">{capability.honesty.title}</p>
        <p className="af-web-branch__body">{capability.honesty.body}</p>
        <Link
          href={capability.honesty.href}
          className="mt-5 inline-block text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
        >
          {capability.honesty.ctaLabel} &rarr;
        </Link>
      </div>

      {/* v1.4 §19. Rendered text, never a comment. */}
      <p className="af-web-boundary">{capability.boundary}</p>
    </div>
  );
}
