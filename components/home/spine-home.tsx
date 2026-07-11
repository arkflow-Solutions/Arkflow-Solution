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
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  MessageSquare,
  Users,
  CalendarCheck,
  Receipt,
  Heart,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Packages } from "@/components/home/packages";
import { useCalendly } from "@/lib/use-calendly";
import { guarantee, caseStudies, contact } from "@/lib/content";

/* Hero entrance — a calm, staggered rise. Words in the headline arrive
   one after another; the eyebrow, sub, CTAs and chips follow. */
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const heroWords = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const headlineWords: [string, boolean][] = [
  ["Turn", false],
  ["enquiries", false],
  ["into", false],
  ["paying", true],
  ["patients.", true],
];

const styles = `
.spine-home{--sp-line:var(--border-subtle);--sp-line2:var(--border-strong);overflow-x:hidden}
.spine-home *{box-sizing:border-box}
.sp-herowrap{position:relative}
.sp-aura{position:absolute;inset:-140px -80px auto -80px;height:580px;background:radial-gradient(50% 50% at 32% 34%,rgba(26,60,255,.16),transparent 70%);pointer-events:none;z-index:0;will-change:transform;animation:sp-drift 15s ease-in-out infinite alternate}
@keyframes sp-drift{0%{transform:translate3d(0,0,0) scale(1);opacity:.8}100%{transform:translate3d(7%,5%,0) scale(1.12);opacity:1}}
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
.sp-spine{border:1px solid var(--sp-line);border-radius:20px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008));padding:24px 24px 18px;position:relative;overflow:hidden}
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
.sp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--sp-line);border:1px solid var(--sp-line);border-radius:18px;overflow:hidden}
@media(max-width:760px){.sp-steps{grid-template-columns:1fr}}
.sp-step{background:var(--ink);padding:36px 30px}
.sp-step:hover{background:var(--surface)}
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
.sp-guar{border:1px solid var(--sp-line);border-radius:18px;padding:34px 36px;display:flex;gap:26px;align-items:center;background:linear-gradient(120deg,rgba(26,60,255,.08),rgba(255,255,255,.01))}
@media(max-width:680px){.sp-guar{flex-direction:column;text-align:center}}
.sp-seal{width:62px;height:62px;border-radius:16px;border:1px solid var(--sp-line);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sp-foot{margin-top:88px;padding-top:28px;border-top:1px solid var(--sp-line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px}
.sp-center{text-align:center}
.sp-mx{margin-left:auto;margin-right:auto}
`;

const spine = [
  { icon: Globe, label: "Website", desc: "A visitor lands" },
  { icon: MessageSquare, label: "Instant Response", desc: "Answered under 90 seconds" },
  { icon: Users, label: "CRM", desc: "Lead captured & qualified" },
  { icon: CalendarCheck, label: "BookingBot", desc: "Appointment booked" },
  { icon: Receipt, label: "InvoiceFlow", desc: "Payment collected" },
  { icon: Heart, label: "Patient", desc: "Booked & paying" },
];

const systems = [
  {
    icon: MessageSquare,
    title: "Instant Response",
    tier: "All packages",
    body: "Every WhatsApp enquiry answered in under 90 seconds, in your clinic's voice — qualified, captured, and escalated to a human the moment it matters.",
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
  { n: "02", title: "Build & Test", body: "We configure your WhatsApp AI, calendar, pipeline and billing, then test every flow against your real service menu — live within 72 hours of intake." },
  { n: "03", title: "Optimise", body: "We monitor, tune and report, then measure response time against the guarantee at Day 30 — proactively." },
];

export function SpineHome() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const openCalendly = useCalendly(contact.call.href);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % spine.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="spine-home">
      <style>{styles}</style>

      {/* HERO */}
      <header className="sp-wrap sp-herowrap">
        <div className="sp-aura" aria-hidden />
        <div className="sp-hero">
          <motion.div
            variants={heroStagger}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.p variants={rise} className="sp-eb">
              Revenue Operations · Singapore
            </motion.p>
            <motion.h1 variants={heroWords} className="sp-kicker" style={{ marginTop: 22 }}>
              {headlineWords.map(([word, accent], idx) => (
                <motion.span
                  key={idx}
                  variants={rise}
                  className="sp-word"
                  style={accent ? { color: "var(--blue-soft)" } : undefined}
                >
                  {word}
                </motion.span>
              ))}
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

          <Reveal className="sp-spine">
            <p className="sp-eb sp-dim" style={{ marginBottom: 8, color: "var(--text-tertiary)" }}>
              The path, automated
            </p>
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
            {steps.map((s) => (
              <div key={s.title} className="sp-step">
                <span className="sp-stepn">{s.n}</span>
                <h3 className="sp-h3" style={{ marginTop: 18, fontSize: "1.4rem" }}>
                  {s.title}
                </h3>
                <p className="sp-body" style={{ marginTop: 12 }}>
                  {s.body}
                </p>
              </div>
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

      {/* FINAL CTA */}
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
  );
}
