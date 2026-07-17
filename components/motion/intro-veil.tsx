"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * IntroVeil — the cinematic startup sequence.
 *
 * Black screen → a glowing particle → a neural network grows from it →
 * the network resolves into the ArkFlow logo, which pulses once → fade
 * into the site. Sequential status lines run underneath. ~2.2s, capped
 * under 3s. Shown once per session (repeat visitors skip); click or
 * Escape skips; never shown under prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const MESSAGES = [
  "Initializing AI systems",
  "Connecting workflows",
  "Training AI agents",
  "Optimising processes",
  "Ready",
];

// Constellation node positions (viewBox 200×200, centre at 100,100).
const NODES: [number, number][] = [
  [100, 28],
  [160, 60],
  [168, 134],
  [110, 174],
  [42, 152],
  [32, 72],
];

export function IntroVeil() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("af-intro-v2")) return;
      sessionStorage.setItem("af-intro-v2", "1");
    } catch {
      /* storage unavailable — show once anyway */
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!show) return;
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(i + 1, MESSAGES.length - 1);
      setMsg(i);
      if (i === MESSAGES.length - 1) clearInterval(id);
    }, 330);
    return () => clearInterval(id);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  const dot = { transformBox: "fill-box" as const, transformOrigin: "center" };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          onClick={() => setShow(false)}
          role="status"
          aria-label="Loading ArkFlow"
        >
          {/* soft ambient glow */}
          <div
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(26,60,255,0.16), transparent 65%)",
            }}
          />

          <div className="relative flex h-[220px] w-[220px] items-center justify-center">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              {/* centre → node links */}
              {NODES.map(([x, y], i) => (
                <motion.line
                  key={`l${i}`}
                  x1={100}
                  y1={100}
                  x2={x}
                  y2={y}
                  stroke="#3b82f6"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: EASE }}
                />
              ))}
              {/* ring links */}
              {NODES.map(([x, y], i) => {
                const [nx, ny] = NODES[(i + 1) % NODES.length];
                return (
                  <motion.line
                    key={`r${i}`}
                    x1={x}
                    y1={y}
                    x2={nx}
                    y2={ny}
                    stroke="#1a3cff"
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.26 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.05, ease: EASE }}
                  />
                );
              })}
              {/* nodes */}
              {NODES.map(([x, y], i) => (
                <motion.circle
                  key={`n${i}`}
                  cx={x}
                  cy={y}
                  r={2.4}
                  fill="#8ab0ff"
                  style={dot}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: EASE }}
                />
              ))}
              {/* central particle — the seed */}
              <motion.circle
                cx={100}
                cy={100}
                r={3}
                fill="#ffffff"
                style={{ ...dot, filter: "drop-shadow(0 0 6px rgba(59,130,246,0.9))" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.7, 1], opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </svg>

            {/* the logo resolves out of the network and pulses once */}
            <motion.div
              className="relative z-10 flex items-center gap-2.5"
              initial={{ opacity: 0, scale: 0.86, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                scale: [0.86, 1, 1.06, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.0,
                delay: 1.0,
                ease: EASE,
                scale: { times: [0, 0.55, 0.78, 1], duration: 1.0, delay: 1.0 },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/arkflow-icon.png"
                alt=""
                aria-hidden
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">ARK</span>
                <span className="text-blue">FLOW</span>
              </span>
            </motion.div>
          </div>

          {/* sequential status line */}
          <div className="mt-7 flex h-5 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={msg}
                className="select-none font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {MESSAGES[msg]}
                {msg < MESSAGES.length - 1 ? "…" : "."}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
