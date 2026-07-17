"use client";

/**
 * Spine — the editorial homepage direction ("The System Spine").
 * Left-aligned, asymmetric, with an animated vertical spine that walks
 * the enquiry -> payment journey. Copy and package facts are sourced
 * from lib/content.ts (Canonical Package Specification v1.0); this file
 * only arranges them. Positioning: Revenue Operations partner — not an
 * agency, not a chatbot. No fabricated proof (Founder Bible honesty rule).
 *
 * Global <Navbar> and <Footer> come from app/layout.tsx, so this
 * component renders page content only.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  MessageSquare,
  MessageCircle,
  Instagram,
  Facebook,
  Music2,
  Send,
  Mail,
  Inbox,
  Cpu,
  Bell,
  Star,
  Share2,
  Users,
  CalendarCheck,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Packages } from "@/components/home/packages";
import { useCalendly } from "@/lib/use-calendly";
import { guarantee, caseStudies, contact } from "@/lib/content";

/* ArkFlow's page-wide living current — ONE persistent WebGL field fixed
   behind the entire homepage, scroll-reactive so the whole page reads as
   a single 3D space. Client-only; never mounted under reduced motion. */
const SpatialField = dynamic(() => import("@/components/three/spatial-field"), {
  ssr: false,
});

/* Hero entrance — a calm, staggered rise. Words in the headline arrive
   one after another; the eyebrow, sub, CTAs and chips follow. */
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Industries the headline types through — clinic-forward first, then the
   adjacent verticals ArkFlow serves. */
const INDUSTRIES = [
  "Aesthetic Clinics",
  "Dental Clinics",
  "Psychology Clinics",
  "Medical Clinics",
  "Insurance Advisors",
  "Professional Services",
  "Small Businesses",
];

const styles = `
.spine-home{--sp-line:var(--border-subtle);--sp-line2:var(--border-strong);overflow-x:hidden}
.spine-home *{box-sizing:border-box}
/* page-wide 3D field layers */
.sp-bg{position:fixed;inset:0;z-index:0;pointer-events:none}
.sp-bg-veil{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,14,26,.35),transparent 20%,transparent 72%,rgba(10,14,26,.55))}
.sp-content{position:relative;z-index:1}
.sp-herowrap{position:relative;overflow:hidden}
.sp-aura{position:absolute;inset:-140px -80px auto -80px;height:580px;background:radial-gradient(50% 50% at 32% 34%,rgba(26,60,255,.16),transparent 70%);pointer-events:none;z-index:0;will-change:transform;animation:sp-drift 15s ease-in-out infinite alternate}
@keyframes sp-drift{0%{transform:translate3d(0,0,0) scale(1);opacity:.8}100%{transform:translate3d(7%,5%,0) scale(1.12);opacity:1}}
/* Living-current 3D field + legibility veil */
.sp-flow{position:absolute;inset:0;z-index:0;pointer-events:none}
.sp-flow-veil{position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(90deg,var(--ink) 0%,rgba(10,14,26,.5) 40%,transparent 68%),radial-gradient(ellipse 72% 62% at 52% 44%,transparent 42%,var(--ink) 96%)}
.sp-word{display:inline-block;margin-right:.26em}
.sp-wrap{max-width:80rem;margin:0 auto;padding:0 24px}
@media(min-width:768px){.sp-wrap{padding:0 40px}}
.sp-eb{font-family:var(--font-mono),monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--blue-soft)}
.sp-dim{color:var(--text-tertiary)}
.sp-sec{padding:112px 0;border-top:1px solid var(--sp-line)}
@media(max-width:640px){.sp-sec{padding:78px 0}}
.sp-kicker{font-size:clamp(2.9rem,7.2vw,5.6rem);line-height:1;letter-spacing:-.035em;font-weight:600;color:#fff}
.sp-h2{font-size:clamp(2rem,4.4vw,3.25rem);line-height:1.05;letter-spacing:-.03em;font-weight:600;color:#fff}
.sp-h3{font-size:1.3rem;line-height:1.15;letter-spacing:-.02em;font-weight:600;color:#fff}
.sp-sub{font-size:19px;line-height:1.6;color:var(--text-secondary)}
.sp-body{font-size:15.5px;line-height:1.7;color:var(--text-secondary)}
.sp-sm{font-size:13.5px;line-height:1.55;color:var(--text-secondary)}
.sp-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;height:52px;padding:0 26px;border-radius:11px;font-weight:500;font-size:15.5px;cursor:pointer;border:none;font-family:inherit;color:#fff;transition:.2s;text-decoration:none}
.sp-btn-p{background:var(--blue)}.sp-btn-p:hover{background:var(--blue-soft);transform:translateY(-1px)}
.sp-btn-s{background:transparent;border:1px solid var(--sp-line2);color:#fff}.sp-btn-s:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.3)}
.sp-hero{position:relative;z-index:1;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center;padding:150px 0 96px}
@media(max-width:900px){.sp-hero{grid-template-columns:1fr;gap:40px;padding:128px 0 72px}}
.sp-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:34px}
.sp-tag{border:1px solid var(--sp-line);border-radius:8px;padding:7px 13px;font-size:13px;color:var(--text-secondary);background:rgba(255,255,255,.02)}
.sp-spine{border:1px solid var(--sp-line);border-radius:20px;background:linear-gradient(180deg,rgba(15,23,42,.62),rgba(15,23,42,.4));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:24px 24px 18px;position:relative;overflow:hidden}
.sp-spine::before{content:"";position:absolute;left:47px;top:60px;bottom:32px;width:2px;background:linear-gradient(180deg,var(--blue-soft),rgba(59,130,246,.12))}
.sp-node{display:flex;align-items:center;gap:16px;position:relative;padding:10px 0}
.sp-badge{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid var(--sp-line2);background:var(--surface);flex-shrink:0;position:relative;z-index:1;transition:.4s}
.sp-node.on .sp-badge{border-color:var(--blue-soft);background:rgba(26,60,255,.16);box-shadow:0 0 20px rgba(26,60,255,.3)}
.sp-nlabel{font-weight:500;font-size:15px;color:#fff}
.sp-ndesc{font-size:12.5px;color:var(--text-tertiary);margin-top:1px}
.sp-pulse{margin-left:auto;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-soft)}
.sp-band{font-size:clamp(1.9rem,4.4vw,3.35rem);line-height:1.12;letter-spacing:-.03em;font-weight:600;max-width:22ch;color:#fff}
.sp-band b{color:var(--text-tertiary);font-weight:600}
.sp-row{display:grid;grid-template-columns:46px 1fr auto;gap:22px;align-items:start;padding:28px 0;border-top:1px solid var(--sp-line);transition:.25s}
.sp-row:hover{background:linear-gradient(90deg,rgba(26,60,255,.05),transparent)}
.sp-ic{width:46px;height:46px;border-radius:12px;border:1px solid var(--sp-line);display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.02);transition:.25s}
.sp-row:hover .sp-ic{border-color:var(--blue-soft)}
.sp-tier{font-family:var(--font-mono),monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-tertiary);align-self:center;white-space:nowrap}
/* Unified Inbox showcase */
.sp-omni{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
@media(max-width:900px){.sp-omni{grid-template-columns:1fr;gap:36px}}
.sp-chips{display:flex;flex-wrap:wrap;gap:11px;margin-top:28px}
.sp-chan{display:inline-flex;align-items:center;gap:9px;padding:9px 14px;border-radius:12px;border:1px solid var(--sp-line);background:rgba(15,23,42,.5);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-size:14px;font-weight:500;color:#fff;transition:.25s}
.sp-chan:hover{transform:translateY(-2px);border-color:var(--sp-line2)}
.sp-chan-ic{display:flex;width:26px;height:26px;border-radius:7px;align-items:center;justify-content:center;flex-shrink:0}
.sp-inbox{border:1px solid var(--sp-line2);border-radius:18px;background:linear-gradient(180deg,rgba(15,23,42,.75),rgba(15,23,42,.52));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);overflow:hidden;box-shadow:0 30px 80px -30px rgba(0,0,0,.7)}
.sp-inbox-hd{display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-bottom:1px solid var(--sp-line)}
.sp-inbox-title{display:flex;align-items:center;gap:9px;font-weight:600;font-size:15px;color:#fff}
.sp-badge-n{font-family:var(--font-mono),monospace;font-size:11px;letter-spacing:.1em;color:var(--blue-soft);border:1px solid rgba(59,130,246,.4);border-radius:999px;padding:3px 9px}
.sp-conv{display:flex;align-items:center;gap:13px;padding:14px 18px;border-bottom:1px solid var(--sp-line);transition:background .4s}
.sp-conv:last-child{border-bottom:0}
.sp-conv.on{background:rgba(26,60,255,.1)}
.sp-conv-av{position:relative;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid var(--sp-line2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sp-conv-ch{position:absolute;right:-4px;bottom:-4px;width:19px;height:19px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface)}
.sp-conv-main{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.sp-conv-nm{display:block;font-size:14px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sp-conv-pv{display:block;font-size:13px;color:var(--text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sp-conv-dot{width:8px;height:8px;border-radius:50%;background:var(--blue);flex-shrink:0;box-shadow:0 0 10px rgba(26,60,255,.8)}
.sp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:760px){.sp-steps{grid-template-columns:1fr}}
.sp-step{background:linear-gradient(180deg,rgba(15,23,42,.58),rgba(15,23,42,.36));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid var(--sp-line);border-radius:16px;padding:34px 30px;height:100%}
.sp-stepn{font-family:var(--font-mono),monospace;font-size:13px;color:var(--blue-soft)}
.sp-pk{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:820px){.sp-pk{grid-template-columns:1fr}}
.sp-card{border:1px solid var(--sp-line);border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.006));padding:30px;position:relative;transition:.3s;display:flex;flex-direction:column;height:100%}
.sp-card:hover{transform:translateY(-4px);border-color:var(--sp-line2)}
.sp-card.feat{border-color:rgba(167,139,250,.5);background:linear-gradient(180deg,rgba(167,139,250,.09),rgba(255,255,255,.01))}
.sp-pbadge{position:absolute;top:-11px;left:30px;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#0b0620;padding:4px 11px;border-radius:999px;font-weight:600}
.sp-tname{font-family:var(--font-mono),monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.sp-price{font-size:2.6rem;font-weight:600;letter-spacing:-.03em;color:#fff}
.sp-plist{margin:20px 0 24px;display:flex;flex-direction:column;gap:11px}
.sp-pli{display:flex;gap:10px;font-size:14px;color:var(--text-secondary);align-items:flex-start}
.sp-guar{border:1px solid var(--sp-line);border-radius:18px;padding:34px 36px;display:flex;gap:26px;align-items:center;background:linear-gradient(120deg,rgba(26,60,255,.18),rgba(15,23,42,.42));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
@media(max-width:680px){.sp-guar{flex-direction:column;text-align:center}}
.sp-seal{width:62px;height:62px;border-radius:16px;border:1px solid var(--sp-line);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sp-foot{margin-top:88px;padding-top:28px;border-top:1px solid var(--sp-line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px}
/* Final-CTA 3D convergence field */
.sp-ctawrap{position:relative;overflow:hidden}
.sp-ctafx{position:absolute;inset:0;z-index:0;opacity:.85;pointer-events:none}
.sp-ctafx-veil{position:absolute;inset:0;background:radial-gradient(ellipse 62% 60% at 50% 46%,transparent 8%,var(--ink) 80%)}
.sp-center{text-align:center}
.sp-mx{margin-left:auto;margin-right:auto}
/* Phase 2 — typewriter headline + live automation flow */
.sp-type{display:inline-block;min-height:1.05em}
.sp-caret{display:inline-block;width:3px;height:.8em;margin-left:5px;background:var(--blue-soft);border-radius:1px;vertical-align:middle;animation:sp-blink 1s steps(1) infinite}
@keyframes sp-blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
.sp-flow-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.sp-flow-live{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-soft)}
.sp-live-dot{width:7px;height:7px;border-radius:50%;background:var(--blue-soft);box-shadow:0 0 8px var(--blue-soft);animation:sp-livedot 1.4s ease-in-out infinite}
@keyframes sp-livedot{0%,100%{opacity:1}50%{opacity:.3}}
.sp-flow-done{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#34d399}
.sp-spine-pulse{position:absolute;left:49px;top:58px;width:2px;height:42px;border-radius:2px;background:linear-gradient(180deg,transparent,var(--blue-soft),transparent);box-shadow:0 0 10px rgba(59,130,246,.7);pointer-events:none;z-index:0;animation:sp-flowdown 2.6s linear infinite}
@keyframes sp-flowdown{0%{transform:translateY(0);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translateY(400px);opacity:0}}
.sp-node.on .sp-badge::after{content:"";position:absolute;inset:-4px;border-radius:14px;border:1px solid rgba(59,130,246,.5);animation:sp-ping 1.4s ease-out infinite;pointer-events:none}
@keyframes sp-ping{0%{transform:scale(.9);opacity:.8}100%{transform:scale(1.3);opacity:0}}
/* Phase 3 — living workflow band */
.sp-wf-wrap{margin-top:52px;position:relative}
.sp-wf{position:relative;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;overflow-x:auto;padding:6px 2px 4px;scrollbar-width:none}
.sp-wf::-webkit-scrollbar{display:none}
.sp-wf-rail{position:absolute;left:26px;right:26px;top:32px;height:2px;background:var(--sp-line2);overflow:hidden;border-radius:2px}
.sp-wf-rail::after{content:"";position:absolute;top:0;left:0;height:100%;width:20%;background:linear-gradient(90deg,transparent,var(--blue-soft),transparent);animation:sp-rail 2.8s linear infinite}
@keyframes sp-rail{0%{transform:translateX(-120%)}100%{transform:translateX(560%)}}
.sp-wf-node{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:11px;min-width:70px;flex:1}
.sp-wf-ic{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;border:1px solid var(--sp-line);background:var(--surface);transition:border-color .35s,background .35s,box-shadow .35s,transform .35s}
.sp-wf-node.lit .sp-wf-ic{border-color:var(--blue-soft);background:rgba(26,60,255,.12)}
.sp-wf-node.on .sp-wf-ic{border-color:var(--blue-soft);background:rgba(26,60,255,.2);box-shadow:0 0 22px rgba(26,60,255,.42);transform:translateY(-3px)}
.sp-wf-lb{font-size:12.5px;color:var(--text-tertiary);text-align:center;white-space:nowrap;transition:color .35s}
.sp-wf-node.lit .sp-wf-lb{color:#fff}
.sp-wf-done{display:inline-flex;align-items:center;gap:8px;margin-top:30px;padding:9px 16px;border-radius:999px;border:1px solid rgba(52,211,153,.4);background:rgba(52,211,153,.08);font-family:var(--font-mono),monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#34d399}
`;

const spine = [
  { icon: Inbox, label: "New lead received", desc: "WhatsApp · IG · web" },
  { icon: Cpu, label: "AI reads the enquiry", desc: "Intent + urgency scored" },
  { icon: Users, label: "CRM updated", desc: "Lead captured & tagged" },
  { icon: MessageCircle, label: "WhatsApp reply sent", desc: "In under 90 seconds" },
  { icon: CalendarCheck, label: "Appointment booked", desc: "BookingBot" },
  { icon: Receipt, label: "Invoice prepared", desc: "InvoiceFlow" },
  { icon: Bell, label: "Follow-up scheduled", desc: "RenewalRadar" },
];

const systems = [
  {
    icon: Inbox,
    title: "Unified Inbox",
    tier: "All packages",
    body: "Every enquiry from every channel — WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS and email — in one Team Inbox, answered in under 90 seconds and escalated to a human the moment it matters.",
  },
  {
    icon: Users,
    title: "CRM & Pipeline",
    tier: "All packages",
    body: "Every contact on one pipeline, from first message to treatment. No lead lives only in someone's phone.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & Billing",
    tier: "Operate and above",
    body: "BookingBot fills your calendar and recovers no-shows; InvoiceFlow sends and chases invoices until they're paid — without a single reminder typed by hand.",
  },
  {
    icon: Globe,
    title: "Website & Voice Agent",
    tier: "Scale",
    body: "A professional site that feeds enquiries into the same system, plus an AI Voice Agent that answers every call in two rings — only the real ones reach you.",
  },
];

const steps = [
  { n: "01", title: "Discover", body: "A 30-minute call to map your enquiry-to-payment flow and confirm the right package." },
  { n: "02", title: "Build & Test", body: "We connect your channels into one inbox and configure your AI, calendar, pipeline and billing, then test every flow against your real service menu — live within 72 hours of intake." },
  { n: "03", title: "Optimise", body: "We monitor, tune and report, then measure response time against the guarantee at Day 30 — proactively." },
];

/* Channels that feed the Unified Inbox. Generic glyphs + brand tint +
   name (no logo reproductions). TikTok/Telegram included per founder
   direction — trim any that aren't connected yet. */
type Glyph = typeof MessageCircle;
const channels: [string, string, Glyph][] = [
  ["WhatsApp", "#25D366", MessageCircle],
  ["Instagram", "#E4405F", Instagram],
  ["Messenger", "#0084FF", Facebook],
  ["TikTok", "#FE2C55", Music2],
  ["Telegram", "#229ED9", Send],
  ["SMS", "#8B93A7", MessageSquare],
  ["Email", "#A78BFA", Mail],
];

/* Illustrative Team Inbox rows — anonymised UI mock, not real clients. */
const inboxRows: [string, string, string, Glyph][] = [
  ["Jasmine L.", "Hi! Do you have availability this Friday?", "#E4405F", Instagram],
  ["+65 8•••• 4021", "Can I reschedule my appointment?", "#25D366", MessageCircle],
  ["m•••@gmail.com", "Following up on the quote you sent", "#A78BFA", Mail],
  ["tiktok_user_88", "Saw your video — how much for the…", "#FE2C55", Music2],
];

/* End-to-end living workflow — the whole automated pipeline, first
   touch to referral. */
const workflow: [string, Glyph][] = [
  ["Website", Globe],
  ["Lead", Inbox],
  ["AI Agent", Cpu],
  ["CRM", Users],
  ["Calendar", CalendarCheck],
  ["WhatsApp", MessageCircle],
  ["Invoice", Receipt],
  ["Review", Star],
  ["Referral", Share2],
];

export function SpineHome() {
  const [active, setActive] = useState(0);
  const [ibx, setIbx] = useState(0);
  const [wf, setWf] = useState(0);
  const [tw, setTw] = useState(0);
  const [typed, setTyped] = useState("");
  const [del, setDel] = useState(false);
  const reduce = useReducedMotion();
  const openCalendly = useCalendly(contact.call.href);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % spine.length), 1400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIbx((n) => (n + 1) % inboxRows.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Living workflow — advances one node at a time, holds on "complete",
  // then loops.
  useEffect(() => {
    const t = setInterval(
      () => setWf((w) => (w >= workflow.length ? 0 : w + 1)),
      620
    );
    return () => clearInterval(t);
  }, []);

  // Headline typewriter — types an industry, holds, deletes, advances.
  useEffect(() => {
    if (reduce) {
      setTyped(INDUSTRIES[0]);
      return;
    }
    const full = INDUSTRIES[tw];
    let t: ReturnType<typeof setTimeout>;
    if (!del) {
      if (typed.length < full.length) {
        t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 55);
      } else {
        t = setTimeout(() => setDel(true), 1400);
      }
    } else if (typed.length > 0) {
      t = setTimeout(() => setTyped(full.slice(0, typed.length - 1)), 30);
    } else {
      setDel(false);
      setTw((n) => (n + 1) % INDUSTRIES.length);
      return;
    }
    return () => clearTimeout(t);
  }, [typed, del, tw, reduce]);

  return (
    <div className="spine-home">
      <style>{styles}</style>

      {/* PAGE-WIDE 3D FIELD — fixed behind everything, evolves with scroll */}
      {!reduce && (
        <div className="sp-bg" aria-hidden>
          <SpatialField />
        </div>
      )}
      <div className="sp-bg-veil" aria-hidden />

      <div className="sp-content">
        {/* HERO */}
        <header className="sp-herowrap">
          <div className="sp-aura" aria-hidden />
          <div className="sp-flow-veil" aria-hidden />
          <div className="sp-wrap sp-hero">
          <motion.div
            variants={heroStagger}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.p variants={rise} className="sp-eb">
              Revenue Operations · Singapore
            </motion.p>
            <motion.h1 variants={rise} className="sp-kicker" style={{ marginTop: 22 }}>
              Revenue systems for
              <br />
              <span className="sp-type">
                <span style={{ color: "var(--blue-soft)" }}>{typed}</span>
                <span className="sp-caret" aria-hidden />
              </span>
            </motion.h1>
            <motion.p variants={rise} className="sp-sub" style={{ marginTop: 26, maxWidth: "38ch" }}>
              ArkFlow is the Revenue Operations partner for growing clinics. One
              managed system captures every enquiry, books it, and collects
              payment — so nothing slips through.
            </motion.p>
            <motion.div variants={rise} style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="sp-btn sp-btn-p" onClick={openCalendly}>
                Book Discovery Call <ArrowRight size={17} aria-hidden />
              </button>
              <Link className="sp-btn sp-btn-s" href="#packages">
                See Packages
              </Link>
            </motion.div>
            <motion.div variants={rise} className="sp-tags">
              {["Response < 90 sec", "Live in 72 hours", "30-Day Response Guarantee"].map((t) => (
                <span key={t} className="sp-tag">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <Reveal>
            <TiltCard glow="rgba(26,60,255,0.18)">
              <div className="sp-spine">
                <span className="sp-spine-pulse" aria-hidden />
                <div className="sp-flow-hd">
                  <span className="sp-eb sp-dim" style={{ color: "var(--text-tertiary)" }}>
                    Live automation
                  </span>
                  {active === spine.length - 1 ? (
                    <span className="sp-flow-done">Automation complete ✓</span>
                  ) : (
                    <span className="sp-flow-live">
                      <span className="sp-live-dot" />
                      Running
                    </span>
                  )}
                </div>
            {spine.map((node, i) => {
              const Icon = node.icon;
              const on = i === active;
              return (
                <div key={node.label} className={`sp-node${on ? " on" : ""}`}>
                  <span className="sp-badge">
                    <Icon
                      size={20}
                      aria-hidden
                      color={on ? "var(--blue-soft)" : "var(--platinum)"}
                    />
                  </span>
                  <div>
                    <div className="sp-nlabel">{node.label}</div>
                    <div className="sp-ndesc">{node.desc}</div>
                  </div>
                  {on && <span className="sp-pulse">live</span>}
                </div>
              );
            })}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </header>

      {/* STATEMENT BAND */}
      <section className="sp-sec">
        <div className="sp-wrap">
          <Reveal>
            <p className="sp-band">
              <b>Not an agency. Not a chatbot.</b> A Revenue Operations partner
              that runs the system between your first enquiry and the paid
              invoice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* UNIFIED INBOX SHOWCASE — every channel converges into one inbox */}
      <section className="sp-sec" id="unified-inbox">
        <div className="sp-wrap">
          <div className="sp-omni">
            <Reveal>
              <p className="sp-eb">Unified Inbox</p>
              <h2 className="sp-h2" style={{ marginTop: 16, maxWidth: "15ch" }}>
                Every channel. One inbox.
              </h2>
              <p className="sp-sub" style={{ marginTop: 18, maxWidth: "46ch" }}>
                WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS and email —
                every enquiry from every platform lands in one Team Inbox and gets
                answered in under 90 seconds. Your team never switches tabs, and no
                lead is ever missed.
              </p>
              <div className="sp-chips">
                {channels.map(([name, color, Ic]) => (
                  <span key={name} className="sp-chan">
                    <span className="sp-chan-ic" style={{ background: `${color}22` }}>
                      <Ic size={16} color={color} aria-hidden />
                    </span>
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <TiltCard glow="rgba(26,60,255,0.16)">
                <div className="sp-inbox">
                  <div className="sp-inbox-hd">
                    <span className="sp-inbox-title">
                      <Inbox size={18} color="var(--blue-soft)" aria-hidden /> Team Inbox
                    </span>
                    <span className="sp-badge-n">4 UNREAD</span>
                  </div>
                  {inboxRows.map(([nm, pv, color, Ic], i) => (
                    <div key={nm} className={`sp-conv${i === ibx ? " on" : ""}`}>
                      <span className="sp-conv-av">
                        <MessageSquare size={16} color="var(--text-tertiary)" aria-hidden />
                        <span className="sp-conv-ch" style={{ background: color }}>
                          <Ic size={10} color="#fff" aria-hidden />
                        </span>
                      </span>
                      <span className="sp-conv-main">
                        <span className="sp-conv-nm">{nm}</span>
                        <span className="sp-conv-pv">{pv}</span>
                      </span>
                      {i === ibx && <span className="sp-conv-dot" />}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="sp-sec" id="systems">
        <div className="sp-wrap">
          <Reveal>
            <p className="sp-eb">What we run</p>
            <h2 className="sp-h2" style={{ marginTop: 16, maxWidth: "16ch" }}>
              Four systems. One connected engine.
            </h2>
          </Reveal>
          <div style={{ marginTop: 40 }}>
            {systems.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="sp-row">
                    <span className="sp-ic">
                      <Icon size={20} color="var(--blue-soft)" aria-hidden />
                    </span>
                    <div>
                      <h3 className="sp-h3">{s.title}</h3>
                      <p className="sp-body" style={{ marginTop: 8, maxWidth: "62ch" }}>
                        {s.body}
                      </p>
                    </div>
                    <span className="sp-tier">{s.tier}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIVING WORKFLOW — the full pipeline, data flowing through it */}
      <section className="sp-sec" id="workflow">
        <div className="sp-wrap">
          <Reveal>
            <p className="sp-eb">The engine</p>
            <h2 className="sp-h2" style={{ marginTop: 16, maxWidth: "17ch" }}>
              One workflow, end to end.
            </h2>
            <p className="sp-sub" style={{ marginTop: 14, maxWidth: "50ch" }}>
              From first touch to referral, every step runs on the same connected
              system — automatically, and without a task falling through.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sp-wf-wrap">
              <div className="sp-wf">
                <span className="sp-wf-rail" aria-hidden />
                {workflow.map(([label, Ic], i) => {
                  const lit = i < wf;
                  const on = i === wf - 1;
                  return (
                    <div
                      key={label}
                      className={`sp-wf-node${lit ? " lit" : ""}${on ? " on" : ""}`}
                    >
                      <span className="sp-wf-ic">
                        <Ic
                          size={22}
                          aria-hidden
                          color={lit ? "var(--blue-soft)" : "var(--platinum)"}
                        />
                      </span>
                      <span className="sp-wf-lb">{label}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: "center" }}>
                <span
                  className="sp-wf-done"
                  style={{
                    opacity: wf >= workflow.length ? 1 : 0,
                    transition: "opacity .4s",
                  }}
                >
                  ✓ Automation complete
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sp-sec" id="how">
        <div className="sp-wrap">
          <Reveal>
            <p className="sp-eb">How it works</p>
            <h2 className="sp-h2" style={{ marginTop: 16 }}>
              From call to live in 72 hours.
            </h2>
          </Reveal>
          <div className="sp-steps" style={{ marginTop: 44 }}>
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard glow="rgba(26,60,255,0.12)">
                  <div className="sp-step">
                    <span className="sp-stepn">{s.n}</span>
                    <h3 className="sp-h3" style={{ marginTop: 18, fontSize: "1.4rem" }}>
                      {s.title}
                    </h3>
                    <p className="sp-body" style={{ marginTop: 12 }}>
                      {s.body}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES — the interactive shared-stage panel, in place.
          Clicking Explore expands the detail panel right here on the
          homepage (3D tilt cards + cross-fading tier panel), no page
          hop. Self-contained canonical component from the packages page. */}
      <Packages />

      {/* GUARANTEE */}
      <section className="sp-sec">
        <div className="sp-wrap">
          <Reveal>
            <TiltCard glow="rgba(26,60,255,0.16)">
              <div className="sp-guar">
                <span className="sp-seal">
                  <ShieldCheck size={30} color="var(--blue-soft)" aria-hidden />
                </span>
                <div>
                  <h3 className="sp-h3" style={{ fontSize: "1.5rem" }}>
                    The {guarantee.name}.
                  </h3>
                  <p className="sp-body" style={{ marginTop: 8, maxWidth: "62ch" }}>
                    {guarantee.summary}
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* FOUNDING PARTNERS (honest — no fabricated proof) */}
      <section className="sp-sec">
        <div className="sp-wrap">
          <Reveal>
            <p className="sp-eb">Founding partners</p>
            <h2 className="sp-h2" style={{ marginTop: 16, maxWidth: "20ch" }}>
              Building our first success stories.
            </h2>
            <p className="sp-sub" style={{ marginTop: 18, maxWidth: "58ch" }}>
              {caseStudies.statement} We won&apos;t show testimonials or numbers
              until they&apos;re genuinely earned and signed off.
            </p>
            <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="sp-btn sp-btn-s" onClick={openCalendly}>
                Become a founding partner
              </button>
              <Link className="sp-btn sp-btn-s" href="/case-studies">
                Our promise
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA — the field converges here as you arrive */}
      <section className="sp-sec" id="book">
        <div className="sp-wrap sp-center">
          <Reveal>
            <p className="sp-eb sp-mx" style={{ display: "block" }}>
              Book a discovery call
            </p>
            <h2 className="sp-h2 sp-mx" style={{ marginTop: 16, maxWidth: "20ch" }}>
              See exactly where revenue is slipping through.
            </h2>
            <p className="sp-sub sp-mx" style={{ marginTop: 18, maxWidth: "44ch" }}>
              {contact.call.body}
            </p>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <button className="sp-btn sp-btn-p" onClick={openCalendly}>
                Book Discovery Call <ArrowRight size={17} aria-hidden />
              </button>
            </div>
            <p className="sp-eb sp-dim sp-mx" style={{ marginTop: 24, color: "var(--text-tertiary)" }}>
              No obligation · 30 minutes · Singapore business hours
            </p>
          </Reveal>
          <div className="sp-foot">
            <span className="sp-sm" style={{ color: "#fff" }}>
              ArkFlow Solutions Pte Ltd
            </span>
            <span className="sp-sm sp-dim">
              <Phone size={13} aria-hidden style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
              Revenue Operations · Singapore
            </span>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
