"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead, IllustrativeTag } from "@/components/home/v3/shared";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { track } from "@/lib/analytics";
import { aiDemo, aiDemoScript, customerJourney } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* ================================================ 06 · AI CONVERSATION
 *
 * A demonstration, not a claim. Two synchronised columns: the customer's
 * view of the conversation, and the system log of what is actually
 * happening behind it.
 *
 * The escalation is the point of the section. Partway through, a health
 * question trips a rule, the AI declines to answer it, the log turns
 * green, and a person takes the thread over with full context. Showing
 * where the system stops is what makes the rest of it credible.
 */

const SCRIPT = aiDemoScript;

/**
 * THE AUTHORED PACING, TURNED INTO A MAP.
 *
 * Every beat already carries a `wait` — 900ms for a quick reply, 1700ms
 * for a customer thinking about a health question. Those values are the
 * script's rhythm and they are not being rewritten; they are simply
 * being measured against scroll instead of against a clock.
 *
 * `marks[i]` is the cumulative time at which beat i has landed, so a
 * position anywhere in the timeline resolves to "how many beats have
 * happened" with one comparison, and a long pause occupies
 * proportionally more scroll than a short one.
 */
const TIMELINE = (() => {
  const marks: number[] = [];
  let t = 0;
  for (const b of SCRIPT) {
    t += b.wait;
    marks.push(t);
  }
  return { marks, total: t };
})();

/* WHERE THE CONVERSATION RUNS, IN PIXELS OF SCROLL.
 *
 * This used to be a fixed pair of fractions of the block's traversal.
 * The block is two columns and 555px tall on a desktop but a stacked
 * 958px on a phone, so one pair of fractions meant two completely
 * different scenes: on mobile the sequence finished with the block top
 * 338px above the viewport, which put the phone card behind the global
 * header exactly as the human takeover landed. The escalation and the
 * takeover — the point of the whole scene — could not be seen together.
 *
 * The window is measured instead. Two rules, the same at every width:
 *
 *   FINISH where the system log's last line sits just above the fold,
 *   and never lower than HEADER_CLEAR, so the payoff is always clear of
 *   the fixed header. On a phone that frames the tail of the
 *   conversation and the whole log together; on a desktop the block is
 *   short enough that the rule frames all of it.
 *
 *   START one RUN of scroll earlier. A fixed pixel distance means the
 *   conversation costs the same amount of scrolling on every device
 *   rather than scaling with a layout that happens to be taller.
 */
const RUN = 440;
const HEADER_CLEAR = 96;
const TAIL_CLEAR = 24;

/* Used until the first measurement lands — the previous constants, so
   a server render and the first paint behave as they did before. */
const DEFAULT_WINDOW = { from: 0.3, to: 0.65 };

/* Finer than the shared 0.02, and finer than the pivot's 0.01. Twenty
   beats across a 440px window need more commits than beats or two will
   land on the same step and read as a jump; 0.004 gives about three
   steps per beat. The hook is rAF-throttled and gated by the
   intersection observer, so it costs nothing off screen. */
const STEP = 0.004;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function AiConversation() {
  const ref = useRef<HTMLDivElement>(null);
  const atmosRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const sysRef = useRef<HTMLUListElement>(null);
  const completed = useRef(false);
  const { progress: atmos } = useViewportProgress(atmosRef, 1, 0.02);

  /* The measured window, as progress values the hook can be compared
     against. `useViewportProgress` reports (vh - top) / (height + vh),
     so a wanted top position converts straight into a threshold. */
  const [win, setWin] = useState(DEFAULT_WINDOW);

  useEffect(() => {
    const block = ref.current;
    const items = sysRef.current;
    if (!block || !items) return;

    const measure = () => {
      const vh = window.innerHeight || 1;
      const rect = block.getBoundingClientRect();
      const height = rect.height;
      if (!height) return;

      const itemsBottom = items.getBoundingClientRect().bottom - rect.top;
      const endTop = Math.min(vh - itemsBottom - TAIL_CLEAR, HEADER_CLEAR);
      const startTop = endTop + RUN;
      const span = height + vh;

      const to = (vh - endTop) / span;
      const from = (vh - startTop) / span;

      setWin((prev) =>
        Math.abs(prev.from - from) < 0.001 && Math.abs(prev.to - to) < 0.001
          ? prev
          : { from, to }
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* SCROLL IS THE DRIVER.
     This used to be a setTimeout timeline that autoplayed once behind a
     `started` guard. It could not be scrolled backwards, it replayed
     for nobody, and a visitor who scrolled past quickly got an empty
     thread and a button. The homepage is a scroll narrative and the
     pivot before this one is scroll-driven; this now behaves the same
     way. No timers, no autoplay, nothing to press. */
  const { progress, settled } = useViewportProgress(ref, 1, STEP);
  const played = settled
    ? 1
    : clamp01((progress - win.from) / Math.max(0.01, win.to - win.from));

  /* The first beat is always on screen. The window spans from the
     customer's opening message to the end, so the scene is never an
     empty chat waiting to be started — the thing a visitor sees first
     is the enquiry itself, which is the point of the scene. */
  const elapsed =
    TIMELINE.marks[0] + played * (TIMELINE.total - TIMELINE.marks[0]);

  let shown = 0;
  while (shown < TIMELINE.marks.length && TIMELINE.marks[shown] <= elapsed) {
    shown++;
  }

  /* The typing indicator is derived, not scheduled: if the next beat is
     a reply from the system or a person, it shows once the visitor is
     most of the way through that beat's own wait. Reversing the scroll
     reverses it too, because it is a function of position and nothing
     else. */
  let typing: null | "ai" | "human" = null;
  if (!settled && shown < SCRIPT.length) {
    const next = SCRIPT[shown];
    if (next.kind === "msg" && next.from !== "them") {
      const start = shown === 0 ? 0 : TIMELINE.marks[shown - 1];
      const span = TIMELINE.marks[shown] - start;
      if (span > 0 && (elapsed - start) / span > 0.45) typing = next.from;
    }
  }

  /* The one surviving event. `ai_demo_play` went with the button it was
     attached to — inventing a scroll equivalent would report something
     the visitor never did. No new events, and the analytics union is
     untouched. */
  useEffect(() => {
    if (shown >= SCRIPT.length && !completed.current) {
      completed.current = true;
      track("ai_demo_complete", { location: "homepage_ai_demo" });
    }
  }, [shown]);

  // Keep both columns pinned to their newest entry.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    if (sysRef.current) sysRef.current.scrollTop = sysRef.current.scrollHeight;
  }, [shown, typing]);

  const revealed = SCRIPT.slice(0, shown);
  const messages = revealed.filter((b) => b.kind === "msg");
  const systemLines = revealed.filter((b) => b.kind === "sys");

  const who = (from: "them" | "ai" | "human") =>
    from === "them" ? "Customer" : from === "ai" ? "ArkFlow AI" : "Priya · team";

  return (
    <section id="ai-conversation" className="af-scene">
      {/* PHASE 3E CONTINUITY. Scenes 01–06 and 09–10 all carry the
          Phase 3D atmosphere, keyed to the canonical stage they are
          about; this section and Human + AI did not, so the light went
          flat for two scenes in the middle of the page and the rhythm
          broke exactly where the argument turns to proof.

          Lit as Book — the stage this conversation is travelling
          toward — so the environment reads as a magnified moment inside
          the same journey rather than a separate demonstration. No copy
          and no markup inside the section changed. */}
      <div ref={atmosRef}>
        <SceneAtmosphere
          progress={atmos}
          seal={1}
          focusT={THROUGHLINE_STAGES[4].t}
          vignette={false}
          /* PHASE 3F.1 — shared vertical rhythm, replacing the legacy
             <Section> padding. See the note in system.tsx. */
          className="af-scene__atmos"
        >
      <Container className="relative z-[1]">
        <SectionHead
          eyebrow={aiDemo.eyebrow}
          title={aiDemo.title}
          lead={aiDemo.lead}
          wide
        />

        <div ref={ref} className="mt-16 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          {/* --- conversation --- */}
          <Reveal>
            <div className="af-phone">
              <div className="af-phone__bar">
                <span className="af-phone__av" aria-hidden>JT</span>
                <span className="af-phone__who">
                  <b>New enquiry</b>
                  <span>First contact · 9:41 PM</span>
                </span>
                {/* PHASE 3G — a named channel rather than "Messaging
                    channel", so this thread visibly belongs to the same
                    world as scene 02's arrivals and scene 11's record
                    card, all three of which say WhatsApp. The glyph is
                    decorative; the name is real text. Nothing about the
                    conversation itself changes. */}
                <span className="af-phone__ch">
                  <ChannelIcon name="WhatsApp" size={11} />
                  WhatsApp
                </span>
              </div>

              <div
                ref={logRef}
                className="af-phone__log"
                aria-live="polite"
                aria-label="Illustrative customer conversation"
              >
                {messages.map((m, i) =>
                  m.kind === "msg" ? (
                    <div key={i} className={cn("af-msg", `af-msg--${m.from}`)}>
                      <span className="af-msg__by">{who(m.from)}</span>
                      {m.text}
                    </div>
                  ) : null
                )}

                {typing && (
                  <div className={cn("af-typing", typing === "human" && "af-typing--human")} aria-hidden>
                    <i /><i /><i />
                  </div>
                )}
              </div>

              {/* The footer and its Play button are gone. A button said
                  "this happens when you click"; the conversation now
                  happens because you scroll, and a control that no
                  longer controls anything is worse than none. Nothing
                  replaces it — the messages arriving as the visitor
                  moves is the affordance. */}
            </div>
          </Reveal>

          {/* --- system log --- */}
          <Reveal delay={0.08}>
            <div className="af-syslog">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  What the system is doing
                </span>
                <IllustrativeTag />
              </div>

              <ul ref={sysRef} className="af-syslog__items" aria-live="polite">
                {systemLines.map((l, i) =>
                  l.kind === "sys" ? (
                    <li key={i} className={cn(l.human && "is-human")}>
                      <b>{l.human ? "HUMAN" : "SYS"}</b>
                      <span>{l.text}</span>
                    </li>
                  ) : null
                )}
                {systemLines.length === 0 && (
                  <li className="af-syslog__empty">
                    <span>System actions appear here as the conversation runs.</span>
                  </li>
                )}
              </ul>

              <p className="af-syslog__note">
                <strong>AI handles the repetition. Humans handle the relationship.</strong>{" "}
                {aiDemo.note.replace(
                  "AI handles the repetition. Humans handle the relationship. ",
                  ""
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
        </SceneAtmosphere>
      </div>
    </section>
  );
}

/* ================================================ 07 · CUSTOMER JOURNEY
 *
 * One person, twelve moments, one record. Steps light individually as
 * they enter the viewport so the journey is travelled rather than read.
 * Human-handled moments are marked distinctly: the visitor should be
 * able to see, at a glance, that people are still in this.
 */

export function CustomerJourney() {
  const [seen, setSeen] = useState<number[]>([]);
  const hostRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(host.querySelectorAll<HTMLElement>("[data-step]"));

    if (reduce || typeof IntersectionObserver === "undefined") {
      setSeen(items.map((_, i) => i));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.step);
          setSeen((prev) => (prev.includes(i) ? prev : [...prev, i]));
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.35 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section className="hairline" id="customer-journey">
      <Container>
        <SectionHead
          eyebrow={customerJourney.eyebrow}
          title={customerJourney.title}
          lead={customerJourney.lead}
        />

        <ol ref={hostRef} className="af-journey mt-16">
          {customerJourney.steps.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              className={cn(
                "af-jstep",
                s.by === "human" && "af-jstep--human",
                seen.includes(i) && "af-jstep--on"
              )}
            >
              <span className="af-jstep__time">{s.time}</span>
              <div className="af-jstep__body">
                <b>{s.title}</b>
                <p>{s.body}</p>
                <span className="af-jstep__tag">
                  {s.by === "human" ? "Human" : "Automated"}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-10 max-w-prose text-small text-[color:var(--text-tertiary)]">
            {customerJourney.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
