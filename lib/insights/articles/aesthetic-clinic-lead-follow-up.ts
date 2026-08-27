import type { Article } from "@/lib/insights/types";

export const article: Article = {
  slug: "aesthetic-clinic-lead-follow-up",
  title: "How Aesthetic Clinics Lose Enquiries Before the First Consultation",
  description:
    "Where Singapore aesthetic clinics lose revenue between the first enquiry and the treatment chair — and the follow-up structure that closes each gap.",
  category: "aesthetic-clinics",
  level: "intent",
  published: "2026-08-27",
  authorId: "khai",
  standfirst:
    "A clinic's revenue is decided in the gaps: between the enquiry and the reply, the consultation and the treatment, the treatment and the visit after that.",
  blocks: [
    {
      type: "p",
      text: "An aesthetic clinic has an unusual sales cycle. The enquiry is emotional, often private, and frequently arrives late at night. The consultation is the actual sale. The treatment may be weeks after that. And the real economics sit in the visits that follow — the ones that only happen if somebody remembers to invite the patient back.",
    },
    {
      type: "p",
      text: "Every one of those transitions is a place where a patient can quietly stop. Below is where the losses tend to concentrate, in the order a patient encounters them.",
    },
    {
      type: "h2",
      id: "gap-one",
      text: "Gap one — the enquiry that arrives after hours",
    },
    {
      type: "p",
      text: "Aesthetic enquiries skew heavily towards evenings and weekends. People research treatments in their own time, not during office hours, and they message when they have privacy to do it. Which means the highest-intent moment routinely lands when the clinic is closed.",
    },
    {
      type: "p",
      text: "By Monday morning the patient has often messaged two other clinics. The reply is no longer arriving into curiosity; it is arriving into a comparison already in progress.",
    },
    {
      type: "callout",
      title: "What helps",
      text: "An immediate reply that answers the question actually asked — indicative pricing bands, whether the concern is treatable, what a consultation involves — and offers a specific time. Not a promise to get back to them.",
    },
    {
      type: "h2",
      id: "gap-two",
      text: "Gap two — the question the clinic will not answer in writing",
    },
    {
      type: "p",
      text: "Most first messages are some version of: how much does it cost. Many clinics decline to answer, on the reasonable grounds that pricing depends on assessment. The patient hears something different: that the clinic is being evasive.",
    },
    {
      type: "p",
      text: "The clinics that convert best do not publish a price list. They give a defensible range with the reason attached — a band, what moves a case within it, and an invitation to be assessed properly. It respects the clinical reality while giving the patient something concrete to hold.",
    },
    {
      type: "compare",
      caption:
        "The same enquiry, the same clinic, the same treatment. The difference is entirely in what happens in the first ten minutes.",
      left: {
        title: "What usually happens",
        tone: "loss",
        items: [
          "Message arrives at 10pm and is seen the next morning",
          "Reply asks the patient to call during opening hours",
          "The price question is deflected entirely",
          "No booking offered, so nothing is scheduled",
          "No second message if the patient goes quiet",
        ],
      },
      right: {
        title: "What converts",
        items: [
          "Answered within minutes, on the channel they used",
          "The specific concern acknowledged by name",
          "An honest range, with what moves a case within it",
          "Two concrete consultation times offered",
          "A follow-up if there is no reply in 48 hours",
        ],
      },
    },
    {
      type: "h2",
      id: "gap-three",
      text: "Gap three — the consultation that is booked but not confirmed",
    },
    {
      type: "p",
      text: "Consultation no-shows are the most expensive slot in the diary, because the clinical time was reserved and cannot be resold at short notice. They are also the most preventable.",
    },
    {
      type: "ul",
      items: [
        "A confirmation at the moment of booking, on the channel the patient used.",
        "A reminder far enough ahead that rescheduling is still easy, not the night before.",
        "A short reminder on the day, with the location and what to bring or avoid.",
        "A same-day path back if they miss it — silence after a no-show reads as judgement.",
      ],
    },
    {
      type: "p",
      text: "This is not a persuasion problem. It is a scheduling-hygiene problem, and it is entirely mechanical.",
    },
    {
      type: "h2",
      id: "gap-four",
      text: "Gap four — the consultation that did not convert on the day",
    },
    {
      type: "p",
      text: "A patient who consults and does not book has not said no. They have usually said not yet — they want to think about cost, timing, or downtime around a specific event. This is the single largest recoverable pool in most clinics, and the one most often left alone.",
    },
    {
      type: "p",
      text: "What is required is not pressure. It is a short, useful sequence over the following fortnight: the information relevant to what they hesitated about, an answer to the objection they actually raised, and one clear invitation to proceed.",
    },
    {
      type: "h2",
      id: "gap-five",
      text: "Gap five — the patient who never comes back",
    },
    {
      type: "p",
      text: "Most aesthetic treatments have a natural interval. Injectables fade on a schedule. Laser courses have a recommended spacing. Facials work on a cycle. The clinical interval is known — which makes the recall entirely predictable.",
    },
    {
      type: "p",
      text: "Yet recall is usually the first thing to lapse when the clinic is busy, because it is nobody's specific job and it is never urgent. A dormant patient list is not a marketing problem. It is a diary that was never scheduled.",
    },
    {
      type: "table",
      head: ["Gap", "What it costs", "What closes it"],
      rows: [
        [
          "After-hours enquiry",
          "The enquiry goes to a faster clinic",
          "Immediate, substantive first reply",
        ],
        [
          "Unanswered price question",
          "Reads as evasion, patient disengages",
          "Defensible range with the reason attached",
        ],
        [
          "Consultation no-show",
          "Unsellable clinical time",
          "Confirmation plus staged reminders",
        ],
        [
          "Consult without booking",
          "The largest recoverable pool",
          "A short, specific follow-up sequence",
        ],
        [
          "No recall",
          "Repeat revenue that simply stops",
          "Treatment-interval invitations",
        ],
      ],
    },
    {
      type: "h2",
      id: "sequence",
      text: "The order to fix them in",
    },
    {
      type: "p",
      text: "Start with the first reply, because it determines how many patients reach any of the later gaps at all. Then reminders, because no-shows are the cheapest problem to solve and the saving is immediate. Then post-consultation follow-up. Recall last — it is the highest-value fix, but it depends on having a clean, current patient record to work from.",
    },
    {
      type: "p",
      text: "None of this changes clinical practice, and none of it should sound automated to the patient. The aim is that the administrative layer stops depending on somebody remembering, so the clinical team can spend its attention on the person in the room.",
    },
  ],
  faq: [
    {
      q: "Does automated follow-up feel impersonal for aesthetic patients?",
      a: "It does when it is generic. Follow-up that references the specific treatment discussed and the concern the patient raised reads as attentiveness. The tone is a content decision, not a technology one.",
    },
    {
      q: "How does this work with PDPA obligations?",
      a: "Patient contact for care and recall relies on consent captured at the point of enquiry or visit, with a clear opt-out on every message. The consent record matters as much as the message itself.",
    },
    {
      q: "Where should a clinic start if it can only fix one thing?",
      a: "First-reply speed. It sits upstream of everything else — every later improvement only applies to patients who got a reply in the first place.",
    },
  ],
  solution: {
    label: "See how this works for a clinic",
    href: "/aesthetic-clinics",
    note: "Enquiry to consultation to treatment to recall, running as one system.",
  },
  related: ["why-speed-to-lead-matters", "what-is-an-ai-voice-agent"],
};
