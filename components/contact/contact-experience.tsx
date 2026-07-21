"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
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
import { useCalendly } from "@/lib/use-calendly";
import { contact, guarantee, faq } from "@/lib/content";

const HeroFlow = dynamic(() => import("@/components/three/hero-flow"), {
  ssr: false,
});

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO(founder): replace with the real ArkFlow LinkedIn URL.
const LINKEDIN_URL = "#";

const BUSINESS_TYPES = [
  "Aesthetic Clinic",
  "Psychology Clinic",
  "Dental Clinic",
  "Medical Clinic",
  "Property Agency",
  "Professional Services",
  "Other",
];
const VOLUMES = ["Under 50", "50–100", "100–300", "300+"];
const HELP = [
  "AI Receptionist",
  "CRM",
  "WhatsApp Automation",
  "Website",
  "Revenue Operations",
  "Unsure",
];
const PREFERRED = ["WhatsApp", "Email", "Phone"];

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

const STEPS = 6;

type FormState = {
  firstName: string;
  lastName: string;
  business: string;
  businessType: string;
  volume: string;
  help: string[];
  email: string;
  phone: string;
  preferred: string;
  message: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  business: "",
  businessType: "",
  volume: "",
  help: [],
  email: "",
  phone: "",
  preferred: "WhatsApp",
  message: "",
};

async function submitEnquiry(payload: FormState) {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      help: payload.help.join(", "),
      source: "arkflow-contact",
    }),
  });
  if (!res.ok) throw new Error("submit failed");
  return res.json().catch(() => ({}));
}

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
/* glass form */
.cx-form{position:relative;border:1px solid var(--border-strong);border-radius:22px;background:linear-gradient(180deg,rgba(15,23,42,.72),rgba(15,23,42,.5));backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:30px;box-shadow:0 40px 120px -40px rgba(0,0,0,.8);overflow:hidden;min-height:460px;display:flex;flex-direction:column}
.cx-form::before{content:"";position:absolute;inset:0 0 auto 0;height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.6),transparent)}
.cx-prog{display:flex;align-items:center;gap:8px;margin-bottom:22px}
.cx-dot{height:4px;flex:1;border-radius:2px;background:rgba(255,255,255,.1);overflow:hidden}
.cx-dot span{display:block;height:100%;width:100%;background:var(--blue-soft);border-radius:2px;transform-origin:left;transition:transform .4s ease}
.cx-q{font-size:1.35rem;font-weight:600;letter-spacing:-.02em;color:#fff;line-height:1.2}
.cx-qs{font-size:13px;color:var(--text-tertiary);margin-top:6px}
.cx-input{width:100%;margin-top:18px;height:52px;border-radius:12px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.03);padding:0 16px;color:#fff;font-size:16px;font-family:inherit;outline:none;transition:.2s}
.cx-input::placeholder{color:var(--text-tertiary)}
.cx-input:focus{border-color:var(--blue-soft);box-shadow:0 0 0 3px rgba(59,130,246,.16);background:rgba(255,255,255,.05)}
textarea.cx-input{height:auto;min-height:96px;padding:14px 16px;resize:vertical;line-height:1.5}
.cx-opts{margin-top:18px;display:flex;flex-direction:column;gap:10px}
.cx-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:14px 16px;border-radius:12px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.02);color:var(--text-secondary);font-size:15px;font-family:inherit;cursor:pointer;transition:.18s}
.cx-opt:hover{border-color:var(--border-strong);color:#fff;transform:translateX(2px)}
.cx-opt.sel{border-color:var(--blue-soft);background:rgba(26,60,255,.14);color:#fff}
.cx-opt-box{width:20px;height:20px;border-radius:6px;border:1px solid var(--border-strong);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.18s}
.cx-opt.sel .cx-opt-box{background:var(--blue-soft);border-color:var(--blue-soft)}
.cx-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}
@media(max-width:520px){.cx-grid2{grid-template-columns:1fr}}
.cx-seg{display:flex;gap:8px;margin-top:10px}
.cx-seg button{flex:1;padding:10px;border-radius:10px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.02);color:var(--text-secondary);font-size:13px;font-family:inherit;cursor:pointer;transition:.18s}
.cx-seg button.sel{border-color:var(--blue-soft);background:rgba(26,60,255,.14);color:#fff}
.cx-nav{margin-top:auto;padding-top:24px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.cx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:50px;padding:0 24px;border-radius:11px;font-weight:500;font-size:15px;font-family:inherit;cursor:pointer;border:none;color:#fff;transition:.2s}
.cx-btn-p{background:var(--blue);flex:1}.cx-btn-p:hover{background:var(--blue-soft)}
.cx-btn-p:disabled{opacity:.4;cursor:not-allowed}
.cx-btn-g{background:transparent;border:1px solid var(--border-strong);color:var(--text-secondary);width:50px;padding:0}
.cx-btn-g:hover{color:#fff;border-color:rgba(255,255,255,.3)}
.cx-lbl{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-tertiary);margin:16px 0 0}
/* success */
.cx-done{text-align:center;margin:auto;padding:20px 0}
.cx-ring{width:84px;height:84px;margin:0 auto;border-radius:50%;border:1px solid rgba(59,130,246,.4);display:flex;align-items:center;justify-content:center;background:rgba(26,60,255,.12);box-shadow:0 0 40px rgba(26,60,255,.4)}
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
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const toggleHelp = (item: string) =>
    setForm((f) => ({
      ...f,
      help: f.help.includes(item)
        ? f.help.filter((h) => h !== item)
        : [...f.help, item],
    }));

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return form.firstName.trim().length > 0 && form.lastName.trim().length > 0;
      case 1:
        return form.business.trim().length > 0;
      case 2:
        return form.businessType !== "";
      case 3:
        return form.volume !== "";
      case 4:
        return form.help.length > 0;
      case 5:
        return /\S+@\S+\.\S+/.test(form.email);
      default:
        return true;
    }
  }, [step, form]);

  const next = async () => {
    if (!canProceed) return;
    if (step < STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitEnquiry(form);
      setStep(STEPS);
    } catch {
      setError("Something went wrong sending that. Please try again, or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

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

            {/* RIGHT — multi-step glass form → GoHighLevel */}
            <Reveal delay={0.1}>
              <TiltCard glow="rgba(26,60,255,0.2)">
                <div className="cx-form">
                  {step < STEPS && (
                    <div className="cx-prog" aria-hidden>
                      {Array.from({ length: STEPS }).map((_, i) => (
                        <span className="cx-dot" key={i}>
                          <span
                            style={{
                              transform: `scaleX(${i < step ? 1 : i === step ? 0.5 : 0})`,
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      style={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      {step === 0 && (
                        <div>
                          <p className="cx-q">What&apos;s your name?</p>
                          <p className="cx-qs">So we know who we&apos;re speaking with.</p>
                          <div className="cx-grid2">
                            <input
                              className="cx-input"
                              style={{ marginTop: 0 }}
                              placeholder="First name *"
                              value={form.firstName}
                              autoFocus
                              onChange={(e) => set({ firstName: e.target.value })}
                              onKeyDown={(e) => e.key === "Enter" && next()}
                            />
                            <input
                              className="cx-input"
                              style={{ marginTop: 0 }}
                              placeholder="Last name *"
                              value={form.lastName}
                              onChange={(e) => set({ lastName: e.target.value })}
                              onKeyDown={(e) => e.key === "Enter" && next()}
                            />
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="cx-q">What&apos;s your business called?</p>
                          <p className="cx-qs">The name above the door.</p>
                          <input
                            className="cx-input"
                            placeholder="Radiance Aesthetics"
                            value={form.business}
                            autoFocus
                            onChange={(e) => set({ business: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && next()}
                          />
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <p className="cx-q">What kind of business is it?</p>
                          <p className="cx-qs">Pick the closest fit.</p>
                          <div className="cx-opts">
                            {BUSINESS_TYPES.map((t) => (
                              <button
                                key={t}
                                type="button"
                                className={`cx-opt${form.businessType === t ? " sel" : ""}`}
                                onClick={() => set({ businessType: t })}
                              >
                                <span className="cx-opt-box">
                                  {form.businessType === t && <Check size={13} color="#fff" />}
                                </span>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <p className="cx-q">How many enquiries a month?</p>
                          <p className="cx-qs">A rough number is fine.</p>
                          <div className="cx-opts">
                            {VOLUMES.map((v) => (
                              <button
                                key={v}
                                type="button"
                                className={`cx-opt${form.volume === v ? " sel" : ""}`}
                                onClick={() => set({ volume: v })}
                              >
                                <span className="cx-opt-box">
                                  {form.volume === v && <Check size={13} color="#fff" />}
                                </span>
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <p className="cx-q">What would you like help with?</p>
                          <p className="cx-qs">Choose as many as apply.</p>
                          <div className="cx-opts">
                            {HELP.map((h) => {
                              const on = form.help.includes(h);
                              return (
                                <button
                                  key={h}
                                  type="button"
                                  className={`cx-opt${on ? " sel" : ""}`}
                                  onClick={() => toggleHelp(h)}
                                >
                                  <span className="cx-opt-box">
                                    {on && <Check size={13} color="#fff" />}
                                  </span>
                                  {h}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div>
                          <p className="cx-q">Where should we reach you?</p>
                          <p className="cx-qs">We&apos;ll follow up within 4 hours.</p>
                          <div className="cx-grid2">
                            <input
                              className="cx-input"
                              style={{ marginTop: 0 }}
                              placeholder="Email *"
                              type="email"
                              value={form.email}
                              onChange={(e) => set({ email: e.target.value })}
                            />
                            <input
                              className="cx-input"
                              style={{ marginTop: 0 }}
                              placeholder="Phone"
                              value={form.phone}
                              onChange={(e) => set({ phone: e.target.value })}
                            />
                          </div>
                          <p className="cx-lbl">Preferred contact</p>
                          <div className="cx-seg">
                            {PREFERRED.map((p) => (
                              <button
                                key={p}
                                type="button"
                                className={form.preferred === p ? "sel" : ""}
                                onClick={() => set({ preferred: p })}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                          <textarea
                            className="cx-input"
                            placeholder="Anything you'd like us to know? (optional)"
                            value={form.message}
                            onChange={(e) => set({ message: e.target.value })}
                          />
                          {error && (
                            <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>
                              {error}
                            </p>
                          )}
                        </div>
                      )}

                      {step === STEPS && (
                        <div className="cx-done">
                          <motion.div
                            className="cx-ring"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: EASE }}
                          >
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
                            >
                              <Check size={34} className="text-blue-soft" />
                            </motion.span>
                          </motion.div>
                          <h3 className="cx-h3" style={{ marginTop: 22 }}>
                            Thank you.
                          </h3>
                          <p
                            className="cx-body"
                            style={{ marginTop: 10, maxWidth: "34ch", marginInline: "auto" }}
                          >
                            Your enquiry has entered the ArkFlow Revenue Engine.
                            We&apos;ll be in touch shortly.
                          </p>
                          <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                            <Button onClick={openCalendly} withArrow>
                              Book your call now
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {step < STEPS && (
                    <div className="cx-nav">
                      {step > 0 ? (
                        <button className="cx-btn cx-btn-g" onClick={back} aria-label="Back">
                          <ArrowLeft size={18} aria-hidden />
                        </button>
                      ) : (
                        <span />
                      )}
                      <button
                        className="cx-btn cx-btn-p"
                        onClick={next}
                        disabled={!canProceed || submitting}
                      >
                        {submitting
                          ? "Sending…"
                          : step === STEPS - 1
                          ? "Submit enquiry"
                          : "Continue"}
                        {!submitting &&
                          (step === STEPS - 1 ? (
                            <Send size={17} aria-hidden />
                          ) : (
                            <ArrowRight size={17} aria-hidden />
                          ))}
                      </button>
                    </div>
                  )}
                </div>
              </TiltCard>
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
              <p className="cx-eb" style={{ marginTop: 22, color: "var(--text-tertiary)" }}>
                No obligation · 30 minutes · Singapore business hours
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
