"use client";

import { motion } from "framer-motion";

/**
 * PackageDashboard — stylised, on-brand SVG dashboard illustrations
 * shown inside a laptop frame in the expandable package panel. These
 * are intentionally abstract representations (not photorealistic fakes
 * or screenshots of features that don't yet exist). One theme per tier.
 */

const ease = [0.22, 1, 0.36, 1] as const;

function Frame({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Laptop screen */}
      <div
        className="relative rounded-t-xl border border-white/10 bg-[#0b1120] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: "16 / 10" }}
      >
        <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/10" />
        <div className="mt-2 h-full overflow-hidden rounded-md bg-gradient-to-b from-white/[0.04] to-transparent">
          {children}
        </div>
        {/* ambient tint */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-xl opacity-40"
          style={{ background: `radial-gradient(120% 80% at 50% 0%, ${accent}22, transparent 60%)` }}
        />
      </div>
      {/* Laptop base */}
      <div className="relative mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl border border-t-0 border-white/10 bg-[#0d1526]">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-lg bg-white/10" />
      </div>
    </div>
  );
}

const bar = (accent: string, i: number, w: number) => (
  <motion.div
    key={i}
    className="h-2 rounded-full"
    style={{ background: i === 0 ? accent : "rgba(255,255,255,0.14)", width: `${w}%` }}
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
  />
);

function WhatsAppDash({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-2.5 p-4">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-full" style={{ background: accent }} />
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-20 rounded-full bg-white/20" />
          <div className="h-1.5 w-12 rounded-full bg-white/10" />
        </div>
        <span className="rounded-full px-2 py-0.5 text-[8px] font-medium text-black" style={{ background: accent }}>
          &lt; 90s
        </span>
      </div>
      {/* chat bubbles */}
      <div className="mt-1 space-y-2">
        {[70, 45].map((w, i) => (
          <motion.div
            key={i}
            className="h-6 rounded-lg rounded-tl-sm bg-white/[0.06]"
            style={{ width: `${w}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.12, ease }}
          />
        ))}
        <motion.div
          className="ml-auto h-6 w-[60%] rounded-lg rounded-tr-sm"
          style={{ background: `${accent}33`, border: `1px solid ${accent}55` }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.44, ease }}
        />
      </div>
    </div>
  );
}

function CrmDash({ accent }: { accent: string }) {
  return (
    <div className="flex h-full gap-2 p-4">
      {["New", "Booked", "Paid"].map((col, ci) => (
        <div key={col} className="flex-1 space-y-1.5">
          <div className="mb-1 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ci === 1 ? accent : "rgba(255,255,255,0.3)" }} />
            <div className="h-1 w-8 rounded-full bg-white/15" />
          </div>
          {[0, 1, 2].map((r) => (
            <motion.div
              key={r}
              className="rounded-md border border-white/10 bg-white/[0.04] p-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + ci * 0.1 + r * 0.06, ease }}
            >
              <div className="h-1 w-full rounded-full bg-white/12" />
              <div className="mt-1 h-1 w-2/3 rounded-full" style={{ background: r === 0 && ci === 1 ? accent : "rgba(255,255,255,0.08)" }} />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

function WebsiteDash({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      {/* hero row */}
      <div className="flex gap-2">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-3/4 rounded-full bg-white/20" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
          <div className="mt-1 h-4 w-16 rounded-md" style={{ background: accent }} />
        </div>
        <div className="h-14 w-20 rounded-md border border-white/10 bg-white/[0.05]" />
      </div>
      {/* analytics row */}
      <div className="mt-1 flex items-end gap-1.5">
        {[40, 65, 50, 80, 60, 95].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: i === 5 ? accent : "rgba(255,255,255,0.14)" }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease }}
          />
        ))}
      </div>
    </div>
  );
}

export function PackageDashboard({
  variant,
  accent,
}: {
  variant: "whatsapp" | "crm" | "website";
  accent: string;
}) {
  return (
    <Frame accent={accent}>
      {variant === "whatsapp" && <WhatsAppDash accent={accent} />}
      {variant === "crm" && <CrmDash accent={accent} />}
      {variant === "website" && <WebsiteDash accent={accent} />}
    </Frame>
  );
}
