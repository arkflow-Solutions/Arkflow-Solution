"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Volume2, VolumeX } from "lucide-react";

/**
 * IntroVeil — the ArkFlow OS boot sequence.
 *
 * A cinematic power-on: a neural-particle field grows from a seed, the
 * logo assembles and glows, an AI boot log types out with green checks,
 * READY flashes, then the particles disperse and the black dissolves —
 * revealing the hero (whose own particle field continues the motion) with
 * no hard cut. ALWAYS plays on every load/refresh/new tab (no session or
 * local storage). Mute/unmute for best-effort synth audio (browsers block
 * autoplay, so visuals never depend on sound). Simplified under
 * prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGS = [
  "Initializing ArkFlow OS",
  "Neural Engine online",
  "AI Agents activated",
  "CRM connected",
  "WhatsApp connected",
  "Automation Engine ready",
  "Calendar synced",
  "Revenue pipeline online",
  "Security verified",
];

/* Lightweight WebAudio synth — hum, ticks, chime. All guarded; audio is
   optional and never blocks the animation. */
function makeAudio() {
  let ctx: AudioContext | null = null;
  let hum: { osc: OscillatorNode; gain: GainNode } | null = null;
  const ensure = () => {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      try {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      } catch {
        return null;
      }
    }
    return ctx;
  };
  return {
    start() {
      const c = ensure();
      if (!c) return;
      c.resume().catch(() => {});
      if (!hum) {
        try {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = "sine";
          osc.frequency.value = 52;
          gain.gain.value = 0;
          osc.connect(gain).connect(c.destination);
          osc.start();
          gain.gain.linearRampToValueAtTime(0.05, c.currentTime + 0.6);
          hum = { osc, gain };
        } catch {
          /* ignore */
        }
      }
    },
    stop() {
      try {
        if (hum && ctx)
          hum.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      } catch {
        /* ignore */
      }
    },
    tick(freq = 600) {
      if (!ctx) return;
      try {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = freq;
        o.connect(g).connect(ctx.destination);
        const t = ctx.currentTime;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.04, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        o.start(t);
        o.stop(t + 0.13);
      } catch {
        /* ignore */
      }
    },
    chime() {
      if (!ctx) return;
      [523.25, 659.25, 783.99].forEach((f, i) => {
        try {
          const o = ctx!.createOscillator();
          const g = ctx!.createGain();
          o.type = "sine";
          o.frequency.value = f;
          o.connect(g).connect(ctx!.destination);
          const t = ctx!.currentTime + i * 0.05;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.05, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
          o.start(t);
          o.stop(t + 0.75);
        } catch {
          /* ignore */
        }
      });
    },
    dispose() {
      try {
        hum?.osc.stop();
        ctx?.close();
      } catch {
        /* ignore */
      }
    },
  };
}

export function IntroVeil() {
  const reduce = useReducedMotion();
  const audio = useMemo(makeAudio, []);
  const [done, setDone] = useState(false);
  const [logCount, setLogCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [dissolve, setDissolve] = useState(false);
  const [muted, setMuted] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const mutedRef = useRef(true);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // Hide the native cursor and lock scroll while booting.
  useEffect(() => {
    if (done) return;
    document.body.style.cursor = "none";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.cursor = "";
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Timeline.
  useEffect(() => {
    if (reduce) {
      const a = setTimeout(() => setLogCount(LOGS.length), 350);
      const b = setTimeout(() => setReady(true), 900);
      const c = setTimeout(() => setDissolve(true), 1500);
      const d = setTimeout(() => setDone(true), 1900);
      return () => [a, b, c, d].forEach(clearTimeout);
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= LOGS.length; i++) {
      timers.push(
        setTimeout(() => {
          setLogCount(i);
          if (!mutedRef.current) audio.tick(540 + i * 34);
        }, 1700 + i * 150)
      );
    }
    timers.push(
      setTimeout(() => {
        setReady(true);
        if (!mutedRef.current) audio.chime();
      }, 3350)
    );
    timers.push(setTimeout(() => setDissolve(true), 3650));
    timers.push(setTimeout(() => setDone(true), 4050));
    return () => timers.forEach(clearTimeout);
  }, [reduce, audio]);

  useEffect(() => () => audio.dispose(), [audio]);

  // Neural particle field.
  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const N = Math.min(
      120,
      Math.max(46, Math.floor((window.innerWidth * window.innerHeight) / 16000))
    );
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: (Math.random() - 0.5) * 0.15 * dpr,
      r: (Math.random() * 1.4 + 0.6) * dpr,
    }));

    const start = performance.now();
    const D = 132 * dpr;

    const frame = (now: number) => {
      const el = (now - start) / 1000;
      const grow = Math.min(1, Math.max(0, (el - 0.3) / 0.6));
      const conv = Math.min(1, Math.max(0, (el - 3.0) / 0.65));
      const disp = Math.min(1, Math.max(0, (el - 3.65) / 0.5));
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (conv > 0 && disp === 0) {
          p.x += (cx - p.x) * 0.02 * conv;
          p.y += (cy - p.y) * 0.02 * conv;
        }
        if (disp > 0) {
          p.x += (p.x - cx) * 0.06 * disp;
          p.y += (p.y - cy) * 0.06 * disp;
        }
        const mx = mouse.current.x * dpr;
        const my = mouse.current.y * dpr;
        if (mx > -999) {
          const dx = mx - p.x;
          const dy = my - p.y;
          if (dx * dx + dy * dy < (160 * dpr) ** 2) {
            p.x += dx * 0.006;
            p.y += dy * 0.006;
          }
        }
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      ctx.lineWidth = 1 * dpr;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < D) {
            const al = (1 - d / D) * 0.5 * grow * (1 - disp);
            if (al <= 0.001) continue;
            ctx.strokeStyle = `rgba(59,130,246,${al})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 8 * dpr;
      ctx.shadowColor = "rgba(59,130,246,0.9)";
      const nodeA = 0.85 * grow * (1 - disp * 0.5);
      for (const p of ps) {
        ctx.fillStyle = `rgba(184,206,255,${nodeA})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (!next) audio.start();
    else audio.stop();
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
          initial={{ backgroundColor: "rgba(0,0,0,1)" }}
          animate={{ backgroundColor: dissolve ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          role="status"
          aria-label="Booting ArkFlow"
        >
          <style>{`
            .af-type{display:inline-block;overflow:hidden;white-space:nowrap;animation:af-type .34s steps(24,end) both}
            @keyframes af-type{from{max-width:0}to{max-width:100%}}
            .af-cur{display:inline-block;width:7px;height:13px;background:#3b82f6;margin-left:1px;vertical-align:middle;animation:af-blink 1s steps(1) infinite}
            @keyframes af-blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
          `}</style>

          {!reduce && (
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            />
          )}
          {/* soft central bloom */}
          <div
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(26,60,255,0.18), transparent 62%)",
            }}
            aria-hidden
          />

          {/* mute / unmute */}
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:text-white"
          >
            {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
          </button>

          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={
              dissolve
                ? { opacity: 0, scale: 1.12, filter: "blur(4px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* logo assembles */}
            <motion.div
              className="flex items-center gap-3"
              initial={reduce ? false : { opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: reduce ? 1 : [0.8, 1, 1.05, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: reduce ? 0.5 : 1.0,
                delay: reduce ? 0 : 0.8,
                ease: EASE,
                scale: reduce
                  ? undefined
                  : { times: [0, 0.55, 0.78, 1], duration: 1.0, delay: 0.8 },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/arkflow-icon.png" alt="" aria-hidden className="h-10 w-auto" />
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-white">ARK</span>
                <span className="text-blue">FLOW</span>
              </span>
            </motion.div>

            {/* AI boot log */}
            <div className="mt-8 w-[320px] max-w-[86vw]">
              {LOGS.slice(0, logCount).map((line, i) => (
                <motion.div
                  key={line}
                  className="flex items-center gap-2 py-[3px] font-mono text-[12px]"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.32, duration: 0.2, ease: EASE }}
                    className="flex h-4 w-4 items-center justify-center"
                  >
                    <Check size={13} className="text-emerald-400" aria-hidden />
                  </motion.span>
                  <span
                    className="af-type text-white/65"
                    style={{ animationDelay: i === logCount - 1 ? "0s" : "0s" }}
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
              {!ready && logCount < LOGS.length && (
                <div className="py-[3px] pl-6">
                  <span className="af-cur" aria-hidden />
                </div>
              )}
            </div>

            {/* READY */}
            <AnimatePresence>
              {ready && (
                <motion.p
                  className="mt-7 font-mono text-sm font-medium text-blue-soft"
                  initial={{ opacity: 0, letterSpacing: "0.2em", scale: 0.96 }}
                  animate={{ opacity: 1, letterSpacing: "0.5em", scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  READY
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
