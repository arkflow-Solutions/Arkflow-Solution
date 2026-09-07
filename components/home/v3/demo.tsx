"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHead, IllustrativeTag } from "@/components/home/v3/shared";
import { useInView } from "@/lib/use-in-view";
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

export function AiConversation() {
  const { ref, inView } = useInView<HTMLDivElement>("-120px");
  const atmosRef = useRef<HTMLDivElement>(null);
  const { progress: atmos } = useViewportProgress(atmosRef, 1, 0.02);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<null | "ai" | "human">(null);
  const [state, setState] = useState<"ready" | "running" | "complete">("ready");

  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);
  const sysRef = useRef<HTMLUListElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    clearTimers();
    setShown(0);
    setTyping(null);
    setState("running");
    track("ai_demo_play", { location: "homepage_ai_demo" });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let elapsed = 0;

    SCRIPT.forEach((beat, i) => {
      elapsed += reduce ? 70 : beat.wait;

      // System-side messages are preceded by a typing indicator, so the
      // reply reads as composed rather than pasted.
      if (!reduce && beat.kind === "msg" && beat.from !== "them") {
        const from = beat.from;
        timers.current.push(
          window.setTimeout(() => setTyping(from), elapsed)
        );
        elapsed += 620;
      }

      timers.current.push(
        window.setTimeout(() => {
          setTyping(null);
          setShown(i + 1);
        }, elapsed)
      );
    });

    timers.current.push(
      window.setTimeout(() => {
        setState("complete");
        track("ai_demo_complete", { location: "homepage_ai_demo" });
      }, elapsed + 600)
    );
  }, [clearTimers]);

  // Autoplay once, when the section is genuinely on screen. Playing it
  // on page load would spend the demonstration on someone not watching.
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      run();
    }
  }, [inView, run]);

  useEffect(() => clearTimers, [clearTimers]);

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
    <Section className="hairline" id="ai-conversation">
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
                <span className="af-phone__ch">Messaging channel</span>
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

              <div className="af-phone__foot">
                <Button
                  variant="secondary"
                  size="default"
                  onClick={run}
                  aria-label={state === "ready" ? "Play the conversation" : "Replay the conversation"}
                >
                  {state === "ready" ? "Play the conversation" : "Replay"}
                </Button>
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {state === "ready" ? "Ready" : state === "running" ? "Running" : "Complete"}
                </span>
              </div>
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
    </Section>
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
