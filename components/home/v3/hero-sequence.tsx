"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { AuditButton } from "@/components/home/v3/shared";
import { INTRO_DONE } from "@/components/motion/intro-veil";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  HERO_FINAL,
  HERO_TURN,
  heroCapabilities,
  heroChannels,
  heroMeta,
  heroScenes,
  heroTimeline,
} from "@/lib/hero-sequence";

import "@/app/hero-sequence.css";

/**
 * The homepage hero, as a six-scene cinematic sequence.
 *
 * THE DEVICE. One pendulum, hung from above the viewport, carrying the
 * ArkFlow emblem. It starts left (an enquiry arriving into nothing),
 * pauses dead centre on "Nobody answered" — the tension — then swings
 * right, and the whole story turns over with it: the leak timeline
 * becomes the system timeline. The swing IS the transition, so it is
 * the only motion given real weight.
 *
 * WHY FRAMER MOTION AND NOT GSAP. The brief suggested GSAP; the project
 * forbids it and already ships Framer Motion, whose spring solver gives
 * exactly what a pendulum needs — mass, overshoot and a small secondary
 * oscillation — with no new dependency. The spring below is tuned low
 * and under-damped on purpose: it settles in about a second and wobbles
 * once, the way a weighted thing does.
 *
 * WHAT IT REPLACED. The pinned 340vh WebGL scroll story (hero.tsx, which
 * still exists and still compiles). That hero spent three viewport
 * heights of scrolling to make its point and showed nothing at all
 * until the visitor scrolled. This one tells the whole story in about
 * ten seconds, on load, in one screen.
 *
 * NO SCROLL-JACKING. The section is a normal 100svh block. The sequence
 * plays on a timer, and the first sign that the visitor would rather get
 * on with it — a scroll, a tap, a key — resolves it immediately to the
 * final state. Nobody is ever held inside the hero.
 *
 * REDUCED MOTION. The component starts at the final scene, the pendulum
 * is placed rather than swung, and the background drift is stopped in
 * CSS. The visitor gets the resolved composition, not a faster version
 * of the animation.
 *
 * ACCESSIBILITY. The headline is one <h1> whose text changes with the
 * scene; the server renders scene 01, so crawlers and no-JS visitors get
 * a complete, meaningful hero. The timeline is decorative narration and
 * is hidden from assistive tech — the same four moments are stated in
 * prose further down the page — and the CTAs never move or re-mount, so
 * they are keyboard-reachable from the first frame to the last.
 */
export function HeroSequence() {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(0);
  /* True once the story's closing swing has settled and the pendulum has
     taken over on its own. */
  const [idle, setIdle] = useState(false);
  const [clock, setClock] = useState<{ h: number; m: number; s: number }>(heroMeta.clock);
  const done = useRef(false);

  /* THE SEQUENCE WAITS FOR THE INTRO VEIL.
     Measured: the veil covers the page for about 4.6 seconds. Starting
     the timeline on mount meant the story played underneath it — by the
     time the visitor could see anything, the pendulum was already at
     "Nobody answered" and the first two scenes had been performed to a
     covered screen. It now starts when the veil says it is done, with a
     timeout as the fallback in case the veil is ever removed. */
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const start = () => setArmed(true);
    window.addEventListener(INTRO_DONE, start);
    const fallback = setTimeout(start, 5200);
    return () => {
      window.removeEventListener(INTRO_DONE, start);
      clearTimeout(fallback);
    };
  }, [reduced]);

  /* Reduced motion resolves the whole sequence before the first paint
     the visitor sees. */
  useEffect(() => {
    if (reduced) {
      done.current = true;
      setScene(HERO_FINAL);
    }
  }, [reduced]);

  /* The sequence. One timeout per scene, cleared on unmount, and it
     stops at the final scene rather than looping — a hero that keeps
     restarting is a hero nobody can read. */
  useEffect(() => {
    if (reduced || !armed || done.current || scene >= HERO_FINAL) return;
    const t = setTimeout(() => setScene((s) => Math.min(s + 1, HERO_FINAL)), heroScenes[scene].hold);
    return () => clearTimeout(t);
  }, [scene, reduced, armed]);

  /* Any intent to move on ends the sequence immediately. */
  useEffect(() => {
    if (reduced) return;
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setScene(HERO_FINAL);
    };
    const opts = { passive: true } as const;
    window.addEventListener("wheel", finish, opts);
    window.addEventListener("touchmove", finish, opts);
    window.addEventListener("keydown", finish);
    return () => {
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [reduced]);


  /* Time passing — the pressure the whole scene is about. Deliberately
     a clock and not a money counter: a ticking currency figure would be
     a performance claim with nothing behind it. */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setClock((c) => {
        const s = c.s + 1;
        if (s < 60) return { ...c, s };
        const m = c.m + 1;
        return m < 60 ? { ...c, m, s: 0 } : { h: c.h + 1, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [reduced]);

  /* A NARROWER ARC ON SMALL SCREENS, NOT A SHORTER PENDULUM.
     Travel is the arm length times the sine of the angle, so the full
     28° arc throws the emblem 372px sideways — right off a 390px
     screen; measured at -177px, entirely outside the viewport. The
     obvious fix is a shorter arm, but a short arm reads as a swinging
     badge rather than something hanging from above. So the wire keeps
     its length and the arc is scaled instead: the same left → centre →
     right story, drawn narrower. */
  const [arc, setArc] = useState(1);

  useEffect(() => {
    /* Measured, not guessed: at 320px the full phone arc still carried
       the emblem's right edge to 328px — eight pixels outside the
       viewport. The narrowest screens get the narrowest arc. */
    const sync = () => {
      const w = window.innerWidth;
      setArc(w >= 1024 ? 1 : w < 380 ? 0.26 : 0.38);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  /* ONE MOTION VALUE DRIVES THE WHOLE PENDULUM.
     The arm reads it, the emblem counter-rotates from it, and the sweep
     brightens from it. Driving three separate animations off the same
     timings would leave them free to drift apart over an endless loop;
     derived values cannot. It also means no component re-render per
     frame and no requestAnimationFrame of our own — Framer's single
     frameloop does the work. */
  const rot = useMotionValue(-heroScenes[0].angle);

  /* The emblem hangs level whatever the arm is doing. */
  const counter = useTransform(rot, (v) => -v);

  /* Brightest as it passes through the centre, which is also where it is
     travelling fastest. The sweep therefore tracks speed without
     anything having to measure speed. */
  const sweepOpacity = useTransform(rot, (v) => {
    const span = 28 * arc || 1;
    const nearCentre = 1 - Math.min(1, Math.abs(v) / span);
    return 0.16 + nearCentre * 0.52;
  });

  /* THE STORY SWING. One spring per scene, stopped if the scene changes
     under it. Low stiffness, light damping: it arrives with weight and
     overshoots once. */
  useEffect(() => {
    const target = -heroScenes[scene].angle * arc;
    if (reduced) {
      rot.set(target);
      return;
    }
    if (idle) return; // the loop owns the value from here
    let live = true;
    const controls = animate(rot, target, {
      type: "spring",
      stiffness: 24,
      damping: 11,
      mass: 1.15,
    });
    /* THE HANDOVER, AND WHY IT IS INVISIBLE. The idle loop begins only
       once this final spring has actually settled, and its first
       keyframe is exactly where the spring stopped — so there is no
       snap, no pause and no restart. The pendulum simply carries on. */
    if (scene >= HERO_FINAL) {
      controls.then(() => {
        if (live) setIdle(true);
      });
    }
    return () => {
      live = false;
      controls.stop();
    };
  }, [scene, arc, reduced, idle, rot]);

  /* THE PENDULUM KEEPS LIVING.
     Simple harmonic motion is what a pendulum actually does: fastest
     through the centre, momentarily still at each extreme. That is a
     sine ease — the cubic bezier below is its standard approximation —
     and `mirror` reverses it each half-period, so the motion is
     symmetrical and never resets. Amplitude equals the final story
     angle, so the loop starts exactly where the story stopped, and it
     scales with the same arc the small screens use. */
  useEffect(() => {
    if (reduced || !idle) return;
    const amplitude = 28 * arc;
    const controls = animate(rot, [-amplitude, amplitude], {
      duration: 5.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: [0.37, 0, 0.63, 1],
    });
    return () => controls.stop();
  }, [idle, arc, reduced, rot]);

  const current = heroScenes[scene];
  const pad = (n: number) => String(n).padStart(2, "0");
  const showSystem = scene >= HERO_TURN;
  const showChannels = scene >= HERO_TURN + 1;

  /* How much of the leak timeline has happened yet. */
  const problemLit = scene === 0 ? 0 : scene === 1 ? 1 : heroTimeline.problem.length;

  const fade = reduced
    ? { duration: 0 }
    : ({ duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const);

  return (
    <section className="af-hs" aria-label="ArkFlow, a Revenue Operating Company">
      {/* ------------------------------------------- environment */}
      <div className="af-hs-sky" aria-hidden />
      <div className="af-hs-trails" aria-hidden />
      <div className="af-hs-horizon" aria-hidden />

      {/* --------------------------------------------- pendulum */}
      <div className="af-hs-pend" aria-hidden>
        {/* NEGATED ON PURPOSE, in the effects above. Screen Y runs
            downward, so a positive CSS rotation swings the bottom of the
            arm to the LEFT. The scene data reads the way a person would
            describe it — negative is left — and the sign is flipped
            once, where the value is set. */}
        <motion.div className="af-hs-arm" style={{ rotate: rot }}>
          <span className="af-hs-wire" />
          <motion.span className="af-hs-sweep" style={{ opacity: sweepOpacity }} />
          <span className="af-hs-bob">
            {/* Counter-rotated by exactly what the arm is doing, so the
                emblem hangs level through the whole arc. The brand mark
                has an orientation and a tilted logo reads as a mistake,
                not as physics. */}
            <motion.span className="af-hs-bob__in" style={{ rotate: counter }}>
              <Image
                src="/brand/arkflow-icon.png"
                alt=""
                width={96}
                height={60}
                priority
              />
            </motion.span>
          </span>
        </motion.div>
      </div>

      <div className="af-hs-veil" aria-hidden />

      {/* ------------------------------------------------ stage */}
      <Container className="relative">
        <div className="af-hs-grid">
          <div>
            <p className="af-hs-eyebrow">{heroMeta.eyebrow}</p>

            <div className="af-hs-headline">
              <AnimatePresence initial={false} mode="wait">
                <motion.h1
                  key={scene}
                  className="af-hs-line"
                  initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? undefined : { opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={fade}
                >
                  {current.title}{" "}
                  <span className="af-hs-accent">{current.titleAccent}</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="af-hs-lead">
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={scene}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={fade}
                >
                  {current.lead}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* The category name arrives only once the story has been
                told — the same rule the previous hero followed. */}
            <motion.p
              className="af-hs-sig"
              initial={false}
              animate={{ opacity: scene === HERO_FINAL ? 1 : 0 }}
              transition={fade}
            >
              {heroMeta.signature}
            </motion.p>

            {/* The division of labour. Held through every scene rather
                than animated, because it is a standing claim about how
                ArkFlow works, not a beat in the story. */}
            <p className="af-hs-ai">{heroMeta.aiLine}</p>

            {/* Never re-mounted, never moved: the action is reachable
                from the first frame. */}
            <div className="af-hs-actions">
              <AuditButton location="homepage_hero">
                {heroMeta.primaryCta}
              </AuditButton>
              <Button
                href="/how-it-works"
                variant="secondary"
                size="large"
                onClick={() => track("cta_secondary_click", { location: "homepage_hero" })}
              >
                {heroMeta.secondaryCta}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------- panel */}
          <div className="af-hs-panel" aria-hidden>
            <div className="af-hs-clock">
              <span>Tonight</span>
              <span className="af-hs-clock__time">
                {pad(clock.h)}:{pad(clock.m)}:{pad(clock.s)}
              </span>
            </div>

            <div className="af-hs-rows">
              {/* What happens without a system. */}
              <motion.div
                className="af-hs-stack"
                initial={false}
                animate={{
                  opacity: showSystem ? 0 : 1,
                  x: showSystem ? -24 : 0,
                  transitionEnd: { visibility: showSystem ? "hidden" : "visible" },
                }}
                transition={fade}
                style={{ pointerEvents: "none" }}
              >
                {heroTimeline.problem.map((row, i) => (
                  <div
                    key={row.label}
                    className={cn(
                      "af-hs-row",
                      i < problemLit && "is-on",
                      i < problemLit && row.state === "loss" && "is-loss"
                    )}
                  >
                    <span className="af-hs-dot" />
                    <span>{row.label}</span>
                    <span className="af-hs-time">{row.time}</span>
                  </div>
                ))}
              </motion.div>

              {/* What the system does instead. */}
              <motion.div
                className="af-hs-stack"
                initial={false}
                animate={{
                  opacity: showSystem && !showChannels ? 1 : 0,
                  x: showSystem ? 0 : 24,
                  transitionEnd: {
                    visibility: showSystem && !showChannels ? "visible" : "hidden",
                  },
                }}
                transition={fade}
                style={{ pointerEvents: "none" }}
              >
                {heroTimeline.system.map((row, i) => (
                  <motion.div
                    key={row.label}
                    className="af-hs-row is-on"
                    initial={false}
                    animate={{ opacity: showSystem ? 1 : 0 }}
                    transition={
                      reduced ? { duration: 0 } : { ...fade, delay: showSystem ? i * 0.1 : 0 }
                    }
                  >
                    <span className="af-hs-dot" />
                    <span>{row.label}</span>
                    <span className="af-hs-time">{row.time}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Every channel, one system. */}
              <motion.div
                className="af-hs-stack"
                initial={false}
                animate={{
                  opacity: showChannels ? 1 : 0,
                  transitionEnd: { visibility: showChannels ? "visible" : "hidden" },
                }}
                transition={fade}
                style={{ pointerEvents: "none" }}
              >
                <div className="af-hs-caps">
                  {heroCapabilities.map((cap, i) => (
                    <motion.p
                      key={cap.label}
                      className="af-hs-cap"
                      initial={false}
                      animate={{ opacity: showChannels ? 1 : 0, x: showChannels ? 0 : 10 }}
                      transition={
                        reduced ? { duration: 0 } : { ...fade, delay: showChannels ? i * 0.1 : 0 }
                      }
                    >
                      <span className="af-hs-cap__label">{cap.label}</span>
                      <span className="af-hs-cap__note">{cap.note}</span>
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="af-hs-channels"
              initial={false}
              animate={{ opacity: showChannels ? 1 : 0 }}
              transition={fade}
            >
              {heroChannels.map((name, i) => (
                <motion.span
                  key={name}
                  className="af-hs-channel"
                  initial={false}
                  animate={{ opacity: showChannels ? 1 : 0, y: showChannels ? 0 : 6 }}
                  transition={
                    reduced ? { duration: 0 } : { ...fade, delay: showChannels ? i * 0.06 : 0 }
                  }
                >
                  <ChannelIcon name={name} className="text-blue-soft" />
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
