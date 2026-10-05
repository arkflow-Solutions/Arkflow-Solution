/**
 * The Revenue Leak Audit and the After-Hours Test — the two public entry
 * points into ArkFlow, per the Growth Blueprint 2026–2028 (6 Oct 2026),
 * Parts 15, 23 and 50.
 *
 * WHAT CHANGED, AND WHY THE EARLIER DECISION WAS REVERSED. On 6 September
 * the Revenue Leak Audit was retired as a public CTA because it sent the
 * visitor off arkflowsolutions.com into a separate funnel at the moment
 * of highest intent. The Blueprint reinstates the audit as the primary
 * conversion — decision 3, "entered through a free after-hours test and
 * Revenue Leak Audit" — and the original objection is answered by
 * building it here: /audit is an ArkFlow page on the ArkFlow domain, and
 * the external funnel is still never linked. scripts/verify.mjs check
 * 12a continues to fail the build if it ever is.
 *
 * TWO ENTRY POINTS, ONE FUNNEL. The audit is the primary action. The
 * after-hours test is the lower-commitment way in for a visitor who is
 * not ready to book thirty minutes, and it ends by offering the audit.
 * They are the same journey at two depths — not two competing funnels.
 *
 * GOVERNANCE. No price, no guarantee, no client, no result, no
 * percentage, and no claim about what the audit will find. Every number
 * on these pages is a duration or a count of steps.
 */

export const auditHero = {
  eyebrow: "Free · 30 minutes · No obligation",
  title: "Find out where your enquiries are leaking.",
  lead: "A Revenue Leak Audit walks your actual enquiry journey — from the moment someone messages you to the moment they book, or quietly don’t — and shows you where the gaps are.",
} as const;

/** What actually happens, so nobody has to guess before booking. */
export const auditSteps = [
  {
    label: "We review your current enquiry journey",
    text: "Where enquiries arrive, who answers them, how fast, and what happens after hours.",
  },
  {
    label: "We identify where revenue may be leaking",
    text: "Slow replies, missed messages, forgotten follow-up, no-shows, customers nobody contacted again.",
  },
  {
    label: "We show you the biggest gaps",
    text: "Named and ordered, using your own numbers rather than a benchmark.",
  },
  {
    label: "We give you practical recommendations",
    text: "What to fix first, and what you can do without us.",
  },
  {
    label: "If ArkFlow is a fit, we show you what we would build",
    text: "And if it isn’t, we say so. You keep the findings either way.",
  },
] as const;

export const auditForm = {
  title: "Request your Revenue Leak Audit",
  note: "We’ll come back to arrange a 30-minute call. No sales deck.",
  /** Tag applied to the GoHighLevel contact created by this form. */
  source: "arkflow-revenue-leak-audit",
  submit: "Request my Revenue Leak Audit",
  sending: "Sending…",
} as const;

export const auditFaq = [
  {
    q: "What does it cost?",
    a: "The audit is free and takes about thirty minutes. Projects after it are quoted based on your business, systems and requirements — there is no fixed package price.",
  },
  {
    q: "Do I have to buy anything?",
    a: "No. You keep the findings whether or not you work with us, and if we don’t think ArkFlow is the right fit we will tell you.",
  },
  {
    q: "What do I need to prepare?",
    a: "Nothing formal. It helps if you know roughly how many enquiries you get a month and which channels they arrive through.",
  },
] as const;

/* ------------------------------------------------ the after-hours test */

export const testHero = {
  eyebrow: "Lower commitment · No call required",
  title: "We’ll test your after-hours response.",
  lead: "Most businesses know how many enquiries they receive. Very few know what happens to those enquiries after the team goes home.",
} as const;

/**
 * THE ETHICAL BOUNDARY, STATED ON THE PAGE RATHER THAN ASSUMED.
 * The test sends one genuine enquiry from ArkFlow and measures what the
 * business does with it. It does not impersonate a patient, invent a
 * medical complaint, manufacture urgency or book an appointment that
 * nobody intends to keep.
 */
export const testSteps = [
  {
    label: "We send one genuine enquiry",
    text: "One message, outside your working hours, through a channel you already publish.",
  },
  {
    label: "We record what happens",
    text: "Whether it was answered, by what, and how long it took.",
  },
  {
    label: "We measure response and follow-up",
    text: "First reply, any qualification, and whether anything followed the next day.",
  },
  {
    label: "We send you the finding",
    text: "A short, factual write-up of what actually happened. No scorecard theatre.",
  },
  {
    label: "If there is a meaningful gap, you can request the full audit",
    text: "Entirely your call. The test stands on its own.",
  },
] as const;

export const testBoundary = {
  title: "What this test will never do",
  items: [
    "Pretend to be a patient, or describe a medical condition",
    "Invent an emergency or manufacture urgency",
    "Book an appointment we do not intend to keep",
    "Occupy your staff beyond a single ordinary enquiry",
    "Misrepresent who we are if you ask",
  ],
} as const;

export const testForm = {
  title: "Request your after-hours test",
  note: "Tell us where to send the enquiry. We’ll run it once, outside your working hours.",
  source: "arkflow-after-hours-test",
  submit: "Request my after-hours test",
  sending: "Sending…",
} as const;

/* ------------------------------------------------------- thank you */

export const auditThanks = {
  eyebrow: "Received",
  title: "Your Revenue Leak Audit request is in.",
  lead: "We read every one of these ourselves. Here is exactly what happens next.",
  next: [
    {
      label: "We reply to arrange the call",
      text: "Usually within one business day, from a person rather than an autoresponder.",
    },
    {
      label: "Thirty minutes, booked at a time that suits you",
      text: "You can pick a slot now using the button below, or wait for our reply.",
    },
    {
      label: "We walk your enquiry journey together",
      text: "Bring a rough sense of your monthly enquiry volume and the channels they arrive through.",
    },
  ],
  bookLabel: "Book the 30-minute slot now",
  /** The scheduling mechanism, after intent — not a competing funnel. */
  bookNote: "Prefer to choose a time yourself? This opens our booking calendar.",
} as const;
