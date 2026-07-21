"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Linkedin,
  MapPin,
  Clock,
  Timer,
  Zap,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { GHLContactForm } from "@/components/contact/GHLContactForm";
import { useCalendly } from "@/lib/use-calendly";
import { contact, guarantee, faq } from "@/lib/content";

/* Reuse the proven "living current" R3F field as the hero scene:
   enquiries flowing through intelligent pathways toward ArkFlow. */
const HeroFlow = dynamic(() => import("@/components/three/hero-flow"), {
  ssr: false,
});

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO(founder): replace with the real ArkFlow LinkedIn URL.
const LINKEDIN_URL = "#";

const OUTCOMES = [
  {
    icon: Zap,
    title: "Never lose another lead",
    body: "Every enquiry answered in under 90 seconds, on every channel. The messages you miss today become booked appointments.",
  },
  {
    icon: RefreshCw,
    title: "Your operations run themselves",
    body: "Booking, reminders, invoicing and follow-up happen automatically — your team spends time on clients, not admin.",
  },
  {
    icon: TrendingUp,
    title: "Revenue you already earned, back again",
    body: "Dormant customers reactivated and no-shows recovered — the cheapest revenue any business can win.",
  },
];

const TIMELINE = [
  ["Submit enquiry", "Tell us your numbers in two minutes."],
  ["Discovery Call", "A 30-minute call and a Lead Response Audit on your figures."],
  ["Solution Design", "We map your enquiry-to-payment flow and recommend one package — never a menu."],
  ["Implementation", "We build and test your system against your real service menu."],
  ["Go Live", "Live within 72 hours of intake — from the first message, nothing is missed."],
  ["30-Day Optimisation", "We tune, report, and measure against the guarantee at Day 30."],
];

const BENEFITS: { icon: typeof Zap; text: string }[] = [
  { icon: Zap, text: "A free Lead Response Audit on your real numbers." },
  { icon: TrendingUp, text: "One recommended package — never a menu." },
  { icon: ShieldCheck, text: `Backed by the ${guarantee.name}.` },
];

const styles = `
.cx{position:relative;color:#fff}
.cx-sec{padding:104px 0;border-top:1px solid var(--border-subtle);position:relative}
@media(max-width:640px){.cx-sec{padding:72px 0}}
.cx-eb{font-family:var(--font-mono),monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--blue-soft)}
.cx-h1{font-size:clamp(2.6rem,6vw,4.6rem);line-height:1.02;letter-spacing:-.035em;font-weight:600;color:#fff}
.cx-h2{font-size:clamp(2rem,4vw,3rem);line-height:1.06;letter-spacing:-.03em;font-weight:600;color:#fff}
.cx-h3{font-size:1.3rem;line-height:1.2;letter-spacing:-.02em;font-weight:600;color:#fff}
.cx-sub{font-size:19px;line-height:1.6;color:var(--text-secondary)}
.cx-body{font-size:15.5px;line-height:1.7;color:var(--text-secondary)}
.cx-hero{position:relative;overflow:hidden;padding:168px 0 96px}
@media(max-width:640px){.cx-hero{padding:132px 0 72px}}
.cx-hero-fx{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.92}
.cx-hero-veil{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 60% at 50% 40%,transparent,var(--ink) 82%),linear-gradient(180deg,transparent 60%,var(--ink))}
.cx-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:start}
@media(max-width:940px){.cx-grid{grid-template-columns:1fr;gap:44px}}
.cx-benefit{display:flex;gap:14px;padding:16px 0;border-top:1px solid var(--border-subtle)}
.cx-benefit:first-of-type{border-top:0}
.cx-bic{width:40px;height:40px;flex-shrink:0;border-radius:11px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center}
.cx-contacts{margin-top:34px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.cx-contacts{grid-template-columns:1fr}}
.cx-crow{display:flex;align-items:center;gap:12px;padding:13px 15px;border:1px solid var(--border-subtle);border-radius:12px;background:rgba(15,23,42,.4);text-decoration:none;transition:.22s}
.cx-crow:hover{border-color:var(--border-strong);transform:translateY(-2px)}
.cx-crow .lbl{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-tertiary)}
.cx-crow .val{font-size:14px;color:#fff;font-weight:500}
/* outcome + timeline + faq */
.cx-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px}
@media(max-width:860px){.cx-cards{grid-template-columns:1fr}}
.cx-card{border:1px solid var(--border-subtle);border-radius:18px;background:linear-gradient(180deg,rgba(15,23,42,.55),rgba(15,23,42,.32));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:30px;height:100%}
.cx-card-ic{width:46px;height:46px;border-radius:12px;border:1px solid rgba(26,60,255,.24);background:rgba(26,60,255,.1);display:flex;align-items:center;justify-content:center}
.cx-tl{margin-top:48px;position:relative;padding-left:6px}
.cx-tl-row{display:grid;grid-template-columns:52px 1fr;gap:20px;padding:16px 0;position:relative}
.cx-tl-n{width:52px;height:52px;border-radius:14px;border:1px solid var(--border-subtle);background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono),monospace;font-size:16px;font-weight:600;color:var(--blue-soft);position:relative;z-index:1}
.cx-tl-row:not(:last-child)::before{content:"";position:absolute;left:26px;top:60px;bottom:-8px;width:1px;background:var(--border-subtle)}
.cx-faq{margin-top:44px;border-top:1px solid var(--border-subtle)}
.cx-faq-item{border-bottom:1px solid var(--border-subtle)}
.cx-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 0;background:none;border:none;color:#fff;font-family:inherit;font-size:17px;font-weight:500;text-align:left;cursor:pointer}
.cx-faq-q svg{flex-shrink:0;transition:transform .3s ease;color:var(--text-tertiary)}
.cx-faq-q.open svg{transform:rotate(180deg)}
.cx-faq-a{overflow:hidden}
.cx-faq-a p{padding:0 0 22px;max-width:64ch;font-size:15.5px;line-height:1.7;color:var(--text-secondary)}
.cx-final{text-align:center;max-width:44rem;margin:0 auto}
`;

export function ContactExperience() {
  const reduce = useReducedMotion();
  const openCalendly = useCalendly(contact.call.href);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = faq.slice(0, 6);

  return (
    <div className="cx">
      <style>{styles}</style>

      {/* HERO */}
      <section className="cx-hero">
        {!reduce && (
          <div className="cx-hero-fx" aria-hidden>
            <HeroFlow />
          </div>
        )}
        <div className="cx-hero-veil" aria-hidden />
        <Container className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="cx-eb">Let&apos;s talk</p>
            <h1 className="cx-h1" style={{ marginTop: 20, maxWidth: "16ch" }}>
              Every great automation starts with one conversation.
            </h1>
            <p className="cx-sub" style={{ marginTop: 24, maxWidth: "48ch" }}>
              Tell us where enquiries slip through today. In two minutes you&apos;ll
              be in the queue for a Lead Response Audit on your own numbers —
              useful whether or not you work with us.
            </p>
            <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Button onClick={openCalendly} size="large" withArrow>
                Book Discovery Call
              </Button>
              <Button href="#enquiry" variant="secondary" size="large">
                Start an enquiry
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* MAIN — two columns */}
      <section className="cx-sec" id="enquiry">
        <Container>
          <div className="cx-grid">
            {/* LEFT */}
            <Reveal>
              <p className="cx-eb">Why reach out</p>
              <h2 className="cx-h2" style={{ marginTop: 16, maxWidth: "15ch" }}>
                Thirty minutes. Your numbers. A straight answer.
              </h2>
              <p className="cx-body" style={{ marginTop: 16, maxWidth: "46ch" }}>
                No pitch until the numbers justify it. We map your
                enquiry-to-payment flow, put a figure on what the gaps cost, and
                only then recommend one package.
              </p>

              <div style={{ marginTop: 30 }}>
                {BENEFITS.map(({ icon: Icon, text }, i) => (
                  <div className="cx-benefit" key={i}>
                    <span className="cx-bic">
                      <Icon size={18} className="text-blue-soft" aria-hidden />
                    </span>
                    <p className="cx-body" style={{ alignSelf: "center", color: "#fff" }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cx-contacts">
                <a className="cx-crow" href={contact.whatsapp.href}>
                  <MessageCircle size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">WhatsApp</span>
                    <br />
                    <span className="val">Message us</span>
                  </span>
                </a>
                <a className="cx-crow" href={`mailto:${contact.email.address}`}>
                  <Mail size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">Email</span>
                    <br />
                    <span className="val">{contact.email.address}</span>
                  </span>
                </a>
                <a className="cx-crow" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <Linkedin size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">LinkedIn</span>
                    <br />
                    <span className="val">Follow ArkFlow</span>
                  </span>
                </a>
                <div className="cx-crow" style={{ cursor: "default" }}>
                  <MapPin size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">Based in</span>
                    <br />
                    <span className="val">Singapore</span>
                  </span>
                </div>
                <div className="cx-crow" style={{ cursor: "default" }}>
                  <Clock size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">Hours</span>
                    <br />
                    <span className="val">SGT business hours</span>
                  </span>
                </div>
                <div className="cx-crow" style={{ cursor: "default" }}>
                  <Timer size={18} className="text-blue-soft" aria-hidden />
                  <span>
                    <span className="lbl">Response</span>
                    <br />
                    <span className="val">Within 4 hours</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — GoHighLevel survey. Submissions handled entirely by GHL. */}
            <Reveal delay={0.1}>
              <GHLContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHY — outcome cards */}
      <section className="cx-sec">
        <Container>
          <Reveal>
            <p className="cx-eb">Why work with ArkFlow</p>
            <h2 className="cx-h2" style={{ marginTop: 16, maxWidth: "18ch" }}>
              Outcomes, not features.
            </h2>
          </Reveal>
          <div className="cx-cards">
            {OUTCOMES.map((o, i) => {
              const Icon = o.icon;
              return (
                <Reveal key={o.title} delay={i * 0.08}>
                  <TiltCard glow="rgba(26,60,255,0.16)">
                    <div className="cx-card">
                      <span className="cx-card-ic">
                        <Icon size={20} className="text-blue-soft" aria-hidden />
                      </span>
                      <h3 className="cx-h3" style={{ marginTop: 20 }}>
                        {o.title}
                      </h3>
                      <p className="cx-body" style={{ marginTop: 10 }}>
                        {o.body}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHAT HAPPENS NEXT — timeline */}
      <section className="cx-sec">
        <Container>
          <Reveal>
            <p className="cx-eb">What happens next</p>
            <h2 className="cx-h2" style={{ marginTop: 16 }}>
              From enquiry to live in six steps.
            </h2>
          </Reveal>
          <div className="cx-tl">
            {TIMELINE.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="cx-tl-row">
                  <span className="cx-tl-n">{i + 1}</span>
                  <div style={{ paddingTop: 6 }}>
                    <h3 className="cx-h3" style={{ fontSize: "1.2rem" }}>
                      {title}
                    </h3>
                    <p className="cx-body" style={{ marginTop: 6, maxWidth: "52ch" }}>
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cx-sec">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="cx-eb">Questions</p>
            <h2 className="cx-h2" style={{ marginTop: 16 }}>
              Straight answers.
            </h2>
          </Reveal>
          <div className="cx-faq">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div className="cx-faq-item" key={item.q}>
                  <button
                    className={`cx-faq-q${open ? " open" : ""}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <ChevronDown size={20} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="cx-faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="cx-sec">
        <Container>
          <Reveal>
            <div className="cx-final">
              <h2 className="cx-h2">Ready to stop losing revenue?</h2>
              <p className="cx-sub" style={{ marginTop: 18 }}>
                A 30-minute call. We map your enquiry-to-payment flow and show
                you exactly where revenue is slipping through.
              </p>
              <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
                <Button onClick={openCalendly} size="large" withArrow>
                  Book Your Free Discovery Call
                </Button>
              </div>
              <p
                className="cx-eb"
                style={{ marginTop: 22, color: "var(--text-tertiary)" }}
              >
                No obligation · 30 minutes · Singapore business hours
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
