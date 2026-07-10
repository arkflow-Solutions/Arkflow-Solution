/**
 * ArkFlow homepage content — single source of truth for copy.
 *
 * GOVERNANCE: All package facts (names, pricing, fees, terms, guarantee)
 * are sourced from the Canonical Package Specification v1.0 and must not
 * be edited here without founder sign-off. The spec wins over this file.
 */

export const guarantee = {
  name: "30-Day Response Guarantee",
  // Canonical full text — do not paraphrase in legal contexts.
  fullText:
    "If ArkFlow does not reduce the client's average lead response time to under 90 seconds within the first 30 days after successful onboarding, ArkFlow will refund the client's first monthly subscription fee. This is ArkFlow's only guarantee.",
  summary:
    "Response time not under 90 seconds within 30 days? Your first month is refunded — checked at Day 30, no need to ask.",
};

export const packages = [
  {
    id: "respond",
    name: "Respond",
    headline: "Never lose another lead to a slow reply",
    // Approved website copy — Canonical Package Specification §11
    copy: "Your marketing brings people to your door. ArkFlow makes sure not one of them walks away because no one answered. Every enquiry — midnight, Sunday, mid-treatment — gets a helpful, on-brand reply in under 90 seconds, every day of the year. The lead is qualified, captured, and waiting for you, instead of gone to the clinic down the road.",
    price: "S$688",
    priceNote: "Live in 72 hours. Backed by the 30-Day Response Guarantee.",
    features: [
      "Instant WhatsApp AI response",
      "Lead qualification & CRM pipeline",
      "Monthly performance report",
    ],
    emphasis: false,
    accent: "emerald",
  },
  {
    id: "operate",
    name: "Operate",
    badge: "Most popular",
    headline: "Run your operations on autopilot",
    copy: "The enquiries get answered, the bookings fill themselves in, the reminders go out, and the invoices chase themselves — while you do the work only you can do. No more manual confirmations. No more preventable no-shows. No more chasing payment over WhatsApp.",
    price: "S$988",
    priceNote: "Everything in Respond, plus booking and billing that run themselves.",
    features: [
      "Everything in Respond",
      "Booking automation (BookingBot)",
      "Invoicing & collection (InvoiceFlow)",
    ],
    emphasis: true,
    accent: "violet",
  },
  {
    id: "scale",
    name: "Scale",
    headline: "Your whole business, online and answering 24/7",
    copy: "A website that actually brings in enquiries — not a brochure that just sits there. An AI receptionist that answers every call in two rings, books the appointment, and only interrupts you when it truly matters. And a system quietly bringing your past customers back.",
    price: "S$1,488",
    priceNote: "Website live within 10 business days.",
    features: [
      "Everything in Operate",
      "Professional website & AI Voice Agent",
      "Past-customer reactivation & monthly strategy call",
    ],
    emphasis: false,
    accent: "blue",
  },
] as const;

/* Accent hex per tier — used by the package cards for the coloured
   header rule, price, and tick marks. Applied via inline style so the
   values stay data-driven. Canonical facts unchanged; presentation only. */
export const accents = {
  emerald: { hex: "#34D399", glow: "rgba(52,211,153,0.10)" },
  violet: { hex: "#A78BFA", glow: "rgba(167,139,250,0.12)" },
  blue: { hex: "#3B82F6", glow: "rgba(59,130,246,0.10)" },
} as const;

/* "What's Included" — icon grid replacing dense feature prose.
   Every item uses canonical feature names and canonical tier scope. */
export const packageIncludes = [
  { icon: "MessageSquare", name: "Instant Response", tier: "All", body: "Every WhatsApp enquiry answered in under 90 seconds, in your voice." },
  { icon: "Users", name: "CRM & Pipeline", tier: "All", body: "Every contact on one pipeline — no lead lives in a phone." },
  { icon: "BarChart3", name: "Performance Reporting", tier: "All", body: "A monthly report on what the system captured and converted." },
  { icon: "CalendarCheck", name: "BookingBot", tier: "Operate+", body: "Booking, reschedules and reminders, synced to your calendar." },
  { icon: "Receipt", name: "InvoiceFlow", tier: "Operate+", body: "Invoices sent and chased automatically until paid." },
  { icon: "Globe", name: "Professional Website", tier: "Scale", body: "A credible site that feeds enquiries into the same system." },
  { icon: "Phone", name: "AI Voice Agent", tier: "Scale", body: "Every call answered in two rings; only the real ones reach you." },
  { icon: "RefreshCw", name: "Reactivation", tier: "Scale", body: "Past customers brought back — revenue already earned once." },
  { icon: "UserCheck", name: "Strategy Call", tier: "Scale", body: "A monthly 30-minute working session on your numbers." },
];

/* Reassurance strip — canonical facts, stated as four quiet promises. */
export const packageAssurances = [
  { icon: "ArrowUpRight", title: "Upgrade anytime", body: "Start anywhere, move up as you grow — no second setup fee." },
  { icon: "Wrench", title: "One-time setup", body: "S$888 covers building and testing your system, once." },
  { icon: "Unlock", title: "No long lock-in", body: "6-month minimum, then month-to-month on 30 days' notice." },
  { icon: "Timer", title: "30-Day Response Guarantee", body: "Under 90 seconds within 30 days, or your first month is refunded." },
];

export const packageTerms = {
  implementationFee: "S$888 one-time implementation fee",
  minimumTerm: "6-month minimum, then month-to-month",
  support: "WhatsApp-first support, 4-hour business-hours response",
};

export const problems = [
  {
    title: "Slow response",
    body: "Answered tomorrow morning is booked elsewhere tonight. Speed is the first filter — before price, before reviews.",
  },
  {
    title: "Missed enquiries",
    body: "9pm, Sundays, mid-treatment. The messages nobody sees never reach a report — they just vanish.",
  },
  {
    title: "Manual admin",
    body: "Confirmations typed by hand. Reminders sent when someone remembers. Hours lost to work a system should run silently.",
  },
  {
    title: "Poor follow-up",
    body: "No-shows a reminder would have caught. Leads one message would have closed. Follow-up fails when it runs on memory.",
  },
  {
    title: "Disconnected systems",
    body: "Calendar, CRM, invoicing — none of them talking. Every gap between tools is where revenue falls through.",
  },
];

export const journey = [
  { stage: "Lead", body: "An enquiry arrives — WhatsApp, web, or phone." },
  { stage: "Respond", body: "Answered in under 90 seconds, in your clinic's voice." },
  { stage: "Book", body: "Qualified, booked into your calendar, reminders set." },
  { stage: "Operate", body: "No-show recovery, invoicing and follow-up run themselves." },
  { stage: "Scale", body: "Website, voice agent and reactivation compound the results." },
];

export const industries = {
  primary: {
    name: "Aesthetic Clinics",
    body: "Built first for Singapore aesthetic clinics: HSA-conscious messaging, treatment-aware booking, deposit-friendly billing. Never gives medical advice — anything clinical goes straight to your team.",
  },
  secondary: [
    { name: "Psychology Clinics", body: "Sensitive, discreet intake and scheduling." },
    { name: "Dental Clinics", body: "Recall, reminders and treatment-plan follow-up." },
    { name: "Medical Clinics", body: "High-volume enquiry triage and booking." },
    { name: "Property Agencies", body: "Instant response for time-critical listings." },
    { name: "Professional Services", body: "Consult booking and invoice collection." },
  ],
};

export const howItWorks = [
  {
    step: "Discovery",
    body: "A 30-minute call. We map your enquiry-to-payment flow and confirm the right package.",
  },
  {
    step: "Implementation",
    body: "We build it: WhatsApp AI trained on your services and tone, calendar, pipeline and billing configured.",
  },
  {
    step: "Testing",
    body: "Every flow is tested end-to-end against your real service menu before a single patient sees it.",
  },
  {
    step: "Go Live",
    body: "Live within 72 hours of intake. From the first message, every enquiry is captured.",
  },
  {
    step: "30-Day Optimisation",
    body: "We monitor, tune, report. At Day 30 we measure response time against the guarantee — proactively.",
  },
];

export const faq = [
  {
    q: "What exactly does the 30-Day Response Guarantee cover?",
    a: "One thing, stated plainly: if we don't reduce your average lead response time to under 90 seconds within the first 30 days after onboarding, we refund your first monthly subscription fee. It's our only guarantee, and we evaluate it proactively at Day 30 — you never have to ask for a refund you're owed.",
  },
  {
    q: "What's the minimum commitment?",
    a: "Six months on every package, then month-to-month with 30 days' notice. There's a one-time S$888 implementation fee that covers the real work of building and testing your system — it's never a profit centre, and it's waived when you upgrade between packages.",
  },
  {
    q: "How fast can we go live?",
    a: "Your system goes live within 72 hours of your completed intake form. On Scale, your website is live within 10 business days.",
  },
  {
    q: "We already have a marketing agency. Do we still need this?",
    a: "Keep them — they're bringing people to your door. We make sure nobody who reaches your door walks away because no one answered. It's a different job entirely, and the two work better together.",
  },
  {
    q: "We tried a chatbot before and it was a disaster.",
    a: "What you tried was almost certainly a generic tool you had to configure and maintain yourselves. ArkFlow is managed: we build the system specifically for your services and tone, and we monitor it every week. If something is off, we find out before your patients do.",
  },
  {
    q: "What happens to our patients' data?",
    a: "Your data stays inside the platform your system runs on, and we sign a data processing agreement with every client, consistent with Singapore PDPA. We never store or access patient clinical records — only the enquiry and booking information needed to run the system, deleted within an agreed period if the relationship ends.",
  },
  {
    q: "Is this appropriate for a medical setting?",
    a: "Yes, and we take it seriously. The system never gives medical advice, never makes outcome claims, and never quotes outside your approved price list. Anything clinical is handed to your team immediately. This is configured to stay inside HSA advertising guidelines from day one — it's built in, not bolted on.",
  },
  {
    q: "Will it feel impersonal to our patients?",
    a: "A helpful reply in 60 seconds at 9pm is the personal touch — the alternative is silence until the next morning. The system buys your team time to be personal where it matters most: in the room with the patient, not on their phones.",
  },
];

/* ================= Phase 3 — page content ================= */

export const matrix = {
  columns: ["Respond", "Operate", "Scale"],
  defaultColumn: "Operate",
  rows: [
    { label: "Monthly price", values: ["S$688", "S$988", "S$1,488"] },
    { label: "Implementation fee", values: ["S$888", "S$888", "S$888"] },
    { label: "Minimum commitment", values: ["6 months", "6 months", "6 months"] },
    { label: "Instant WhatsApp AI response", values: [true, true, true] },
    { label: "Lead qualification & CRM pipeline", values: [true, true, true] },
    { label: "Booking automation (BookingBot)", values: [false, true, true] },
    { label: "Invoicing & collection (InvoiceFlow)", values: [false, true, true] },
    { label: "Professional website", values: [false, false, true] },
    { label: "AI Voice Agent", values: [false, "Add-on +S$400", true] },
    { label: "Past-customer reactivation", values: [false, false, true] },
    { label: "Monthly performance report", values: [true, true, true] },
    { label: "Monthly strategy call", values: [false, false, "30 min"] },
    { label: "Support", values: ["WhatsApp · 4-hr", "WhatsApp · 4-hr", "WhatsApp · 4-hr"] },
    { label: "Guarantee", values: ["30-Day Response", "30-Day Response", "30-Day Response"] },
  ],
} as const;

export const upgradeRules = {
  intro:
    "Upgrades are evidence-triggered, never calendar-triggered. When your own numbers show the next layer would pay for itself, we present the case — one tier or add-on per proposal, against your data, in SGD outcomes.",
  stays: [
    "Everything already built keeps running — the CRM, pipeline and automations are extended, not rebuilt.",
    "The guarantee, the support model, and the WhatsApp-first relationship are unchanged.",
    "The 6-month minimum is not reset by an upgrade.",
  ],
  changes: [
    "The monthly price moves to the new tier from the next billing cycle.",
    "The new tier's capabilities switch on — booking and invoicing for Operate; website, voice and reactivation for Scale.",
    "Reporting expands to cover the new systems.",
  ],
  noFee: "No new implementation fee is ever charged on an upgrade, and there is no re-onboarding.",
};

export const boundaries = {
  includes: [
    "Managed Revenue Operations: capturing, converting and retaining the revenue you already generate",
    "Configuration and ongoing management of proven platforms into one outcome",
    "Instant WhatsApp AI response and lead qualification on every tier",
    "Booking and invoicing automation from Operate",
    "A professional website, AI voice agent and reactivation on Scale",
    "Monthly performance reporting and monthly optimisation",
    "Vertical-specific configuration within a fixed tier scope",
  ],
  excludes: [
    "Demand generation — no paid ads, no media buying (keep your marketing agency; we make their spend convert)",
    "Medical or clinical advice of any kind — anything clinical is handed to your team immediately",
    "Custom software development outside the tier scope",
    "Staffing or reception replacement — the system buys your team time; it doesn't replace them",
    "Unpriced additions — anything outside a tier's scope is an upgrade or a priced add-on, stated in advance",
  ],
};

export const pricingPolicy = [
  { term: "Payment", detail: "Monthly subscription in advance via Stripe. The implementation fee is invoiced once, before configuration begins — payment is acceptance." },
  { term: "Minimum term", detail: "Six months on every package, then month-to-month." },
  { term: "Cancellation", detail: "After the minimum, either party may end the engagement with 30 days' written notice. Your data is handled per the data processing agreement on exit." },
  { term: "Implementation fee", detail: "S$888, one-time, non-refundable — it covers the real work of building and testing your system, and is never a profit centre. Waived on upgrades." },
  { term: "Upgrades", detail: "New tier price applies from the next billing cycle. No new fee, no re-onboarding, minimum term not reset." },
];

export const solutions = [
  { name: "Instant Response", tier: "All packages", body: "Every WhatsApp enquiry answered in under 90 seconds, day or night, in your clinic's voice — qualified, captured, and escalated to a human the moment it matters." },
  { name: "CRM & Pipeline", tier: "All packages", body: "Every contact visible on one pipeline, from first message to treatment. No lead exists only in someone's phone." },
  { name: "BookingBot", tier: "Operate and above", body: "Booking, rescheduling and cancellation over WhatsApp, synced to your calendar — with confirmations, 24-hour and 2-hour reminders, and a no-show recovery sequence." },
  { name: "InvoiceFlow", tier: "Operate and above", body: "Invoices generated and delivered automatically on trigger, a three-message reminder chain, and an escalation to you at Day 15 — payment collected without a single chasing message from your team." },
  { name: "Professional Website", tier: "Scale", body: "A fast, credible website built to produce enquiries and feed them straight into the same system — live within 10 business days." },
  { name: "AI Voice Agent", tier: "Scale · add-on for Operate", body: "Every call answered in two rings, questions handled, appointments booked — and only the calls that truly need you reach you. Available to Operate as a +S$400/month add-on." },
  { name: "Reactivation", tier: "Scale", body: "A system quietly bringing past customers back — the cheapest revenue any business can win, because it was already earned once." },
];

export const industryDetails = [
  {
    name: "Aesthetic Clinics", primary: true,
    pains: ["Enquiries arrive on WhatsApp at all hours — each new patient is worth thousands over time", "No-shows on consultations quietly erase marketing spend", "HSA advertising guidelines make generic chatbots a liability"],
    fit: "Our first and deepest vertical. HSA-conscious conversation design, treatment-menu-aware booking, deposit-friendly billing. The system never gives medical advice, never makes outcome claims, and hands anything clinical to your team immediately.",
  },
  { name: "Psychology Clinics", primary: false, pains: ["Sensitive first contact", "Discreet scheduling"], fit: "Careful, private intake with human escalation as the default posture." },
  { name: "Dental Clinics", primary: false, pains: ["Recall discipline", "Treatment-plan follow-up"], fit: "Recall, reminders and plan follow-up that run without front-desk effort." },
  { name: "Medical Clinics", primary: false, pains: ["High enquiry volume", "Triage load"], fit: "High-volume enquiry triage and booking without a bigger front desk." },
  { name: "Property Agencies", primary: false, pains: ["Time-critical listings", "Response speed wins mandates"], fit: "Instant response when minutes decide which agent gets the viewing." },
  { name: "Professional Services", primary: false, pains: ["Consult scheduling", "Invoice chasing"], fit: "Consult booking and collection for firms that bill for their time." },
];

export const about = {
  mission:
    "ArkFlow exists to protect and grow the revenue that Singapore service businesses are quietly losing every day to slow replies, missed messages, no-shows and dormant follow-up.",
  positioning:
    "Read the verbs in that mission: protect, grow, convert, reactivate. They are revenue verbs, not technology verbs. ArkFlow is a Revenue Operations company, not an AI automation company — automation is how we deliver the outcome; revenue is the outcome. We never lead with the technology. We lead with the money the clinic keeps.",
  vision:
    "Depth first. ArkFlow doesn't begin as a platform — it begins as the best operations partner Singapore aesthetic clinics have ever had, and earns the right to expand one vertical at a time. Breadth is earned.",
  honesty: [
    { title: "We mark our claims", body: "Internally, every claim ArkFlow makes carries an evidence tag: proven principle, reasoned recommendation, or validated standard. We know exactly which of our promises are proven and which are being earned — and we price the risk of the unproven ones into our guarantee, not into your fees." },
    { title: "The risk sits with us", body: "We're a young company, and we won't pretend otherwise. That's why the 30-Day Response Guarantee exists: if your response time isn't under 90 seconds within 30 days, your first month is refunded — measured proactively, so you never have to ask." },
    { title: "Fees track effort", body: "The implementation fee is never a profit centre. It covers the real work of building and testing your system, is reviewed as our delivery gets more efficient, and is waived entirely on upgrades." },
  ],
};

export const contact = {
  call: {
    title: "Book a discovery call",
    body: "Thirty minutes, no obligation. We map your enquiry-to-payment flow, run a Lead Response Audit on your current numbers, and show you exactly where revenue is slipping through — useful whether or not you work with us.",
    // Live Calendly scheduling link — every "Book Discovery Call" CTA
    // site-wide opens this via the Calendly popup widget (see
    // lib/use-calendly.ts and app/layout.tsx for the script loader).
    href: "https://calendly.com/kn-khairulnaim/new-meeting",
  },
  whatsapp: {
    title: "WhatsApp us",
    body: "The fastest way to reach us — the same channel we build on. Business-hours replies within 4 hours.",
    // CURRENT IMPLEMENTATION — replace with the live wa.me number
    href: "https://wa.me/6500000000",
  },
  email: { title: "Email", address: "hello@arkflow.sg" },
  base: "Singapore · SGT business hours",
};

export const resources = {
  flagship: {
    name: "The Lead Response Audit",
    body: "Free, and the most useful thirty minutes we offer. We measure how fast enquiries to your business actually get answered — nights, weekends, mid-treatment — and put a number on what the gap is costing you, using your own figures. Anonymised findings from these audits are published as field notes below.",
    cta: "Request an audit",
  },
  fieldNotesIntro:
    "Short, specific observations from the field — anonymised numbers from real audits and deployments, published as they're earned. No filler, no thought leadership.",
  planned: [
    "What Singapore aesthetic clinic response times actually look like after 9pm",
    "The real cost of a no-show, calculated from clinic numbers",
    "HSA advertising guidelines and AI messaging: what compliant configuration means",
  ],
};

export const caseStudies = {
  statement:
    "Our first case studies are being earned right now, with founding clinics — implementation waived in exchange for the right to publish their results.",
  promise: [
    "Real response-time numbers, before and after",
    "Show-rate and collection improvements, measured from the client's own data",
    "Published with the clinic's sign-off, or not at all",
  ],
};

/* ================= Expandable package detail panel =================
   Drives the in-place "Explore" experience. One component consumes
   this per tier. All facts canonical (Canonical Package Specification
   v1.0); feature blurbs are outcome-focused one-liners, no invented
   capabilities. `dashboard` selects the themed laptop illustration. */
export const packageDetails = {
  respond: {
    id: "respond",
    name: "ArkFlow Respond",
    accent: "emerald",
    headline: "Never lose another lead to a slow reply",
    description:
      "Every enquiry answered in under 90 seconds, day or night — qualified, captured, and waiting for you instead of gone to the clinic down the road.",
    price: "S$688",
    priceUnit: "/month",
    implementationFee: "S$888 one-time implementation",
    minimumTerm: "6-month minimum, then month-to-month",
    guaranteeShort: "30-Day Response Guarantee",
    coreOutcome: "Be found. Answer instantly. Never miss a lead.",
    dashboard: "whatsapp",
    features: [
      { icon: "MessageSquare", title: "AI Receptionist", body: "Answers every WhatsApp enquiry instantly, in your clinic's voice." },
      { icon: "Filter", title: "Lead Qualification", body: "Sorts and scores each enquiry before your team even opens it." },
      { icon: "Users", title: "CRM Pipeline", body: "Every contact on one board — no lead trapped in a phone." },
      { icon: "Clock", title: "Under 90 Seconds", body: "Replies land in seconds, any hour, every day of the year." },
      { icon: "BarChart3", title: "Performance Report", body: "A monthly read on what came in and what converted." },
      { icon: "ShieldCheck", title: "HSA-Aware", body: "Never gives medical advice; anything clinical goes to your team." },
    ],
  },
  operate: {
    id: "operate",
    name: "ArkFlow Operate",
    accent: "violet",
    badge: "Most popular",
    headline: "Run your operations on autopilot",
    description:
      "Enquiries answered, bookings filled, reminders sent, invoices chased — the daily admin runs itself while you do the work only you can do.",
    price: "S$988",
    priceUnit: "/month",
    implementationFee: "S$888 one-time implementation",
    minimumTerm: "6-month minimum, then month-to-month",
    guaranteeShort: "30-Day Response Guarantee",
    coreOutcome: "Automate the admin. Convert more. Save hours a week.",
    dashboard: "crm",
    features: [
      { icon: "MessageSquare", title: "Everything in Respond", body: "The full instant-response and CRM foundation, included." },
      { icon: "CalendarCheck", title: "BookingBot", body: "Booking, reschedules and reminders, synced to your calendar." },
      { icon: "Receipt", title: "InvoiceFlow", body: "Invoices sent and chased automatically until they're paid." },
      { icon: "BellRing", title: "No-Show Recovery", body: "Reminders and win-backs that quietly protect your calendar." },
      { icon: "Workflow", title: "Connected Systems", body: "Enquiry, booking and billing talking to each other, not past each other." },
      { icon: "BarChart3", title: "Monthly Reporting", body: "One clear view of response, bookings and collections." },
    ],
  },
  scale: {
    id: "scale",
    name: "ArkFlow Scale",
    accent: "blue",
    headline: "Your whole business, online and answering 24/7",
    description:
      "A website that brings in enquiries, an AI receptionist that answers every call, and a system quietly bringing past customers back.",
    price: "S$1,488",
    priceUnit: "/month",
    implementationFee: "S$888 one-time implementation",
    minimumTerm: "6-month minimum, then month-to-month",
    guaranteeShort: "30-Day Response Guarantee",
    coreOutcome: "Systemise everything. Scale without chaos.",
    dashboard: "website",
    features: [
      { icon: "Workflow", title: "Everything in Operate", body: "The full automation stack, carried forward." },
      { icon: "Globe", title: "Professional Website", body: "A credible site that feeds enquiries into the same system." },
      { icon: "Phone", title: "AI Voice Agent", body: "Every call answered in two rings; only the real ones reach you." },
      { icon: "RefreshCw", title: "Reactivation", body: "Past customers brought back — revenue already earned once." },
      { icon: "BarChart3", title: "Analytics Dashboard", body: "See enquiries, bookings and revenue in one place." },
      { icon: "UserCheck", title: "Monthly Strategy Call", body: "A 30-minute working session on your numbers." },
    ],
  },
} as const;

export const packageDetailOrder = ["respond", "operate", "scale"] as const;
