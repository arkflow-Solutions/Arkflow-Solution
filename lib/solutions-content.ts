/**
 * /solutions — what happens after someone raises their hand.
 *
 * THE PAGE'S GRAMMAR: one opportunity record, gaining history.
 *
 * This replaced six repeated sections of `name / availability /
 * description` — a feature matrix that asserted "one connected system"
 * and then rendered a list. The connection is now structural: a single
 * record is created when the enquiry arrives and every station writes
 * into the same object. Continuity is proved by the record still being
 * there, not by drawing a line between things.
 *
 * WHY NOT A LINE. The homepage already owns that: scene 09 is the first
 * full view of the ten-stage Throughline, scene 10 is the connected
 * system, and /attract closes on the Attract → Conversion handoff. A
 * fourth line-with-nodes would repeat the homepage, not just /attract.
 * A line is geometry; a record is history.
 *
 * THE STATIONS ARE THE CANONICAL ENGINE, in public wording. /attract
 * owns ATTRACT (the website, stage one), so this page covers what
 * happens next: Enquiry → Response → Qualification → Booking →
 * Conversion → Follow-up → Retention → Reactivation → Growth. The six
 * section ids are contractual — see ANCHORS below.
 *
 * GROWTH WRITES NOTHING. Every other station adds entries to the
 * record. Reporting adds none, because it reads the record rather than
 * producing it. That is what "the instrument panel, not the engine"
 * means, and here it is a fact about the data rather than a claim in a
 * sentence. Do not give the reporting station record entries.
 *
 * ANCHORS — CONTRACTUAL, DO NOT RENAME OR REMOVE:
 *   #inbox #ai #booking #automation #crm #reporting
 * Linked from components/layout/footer.tsx (#inbox, #booking) and
 * lib/insights/articles/why-speed-to-lead-matters.ts (#inbox).
 * Verify check 7 requires every article to keep a working solution link.
 *
 * KNOWN ISSUE, DEFERRED BY DECISION: arriving at /solutions#inbox from
 * another page lands at the top. components/motion/smooth-scroll.tsx
 * has no on-load or hashchange handling — it only intercepts clicks on
 * same-page anchors — and its Lenis instance is local to the effect, so
 * nothing outside that file can drive it. The in-page section nav works
 * correctly. The fix belongs in that shared file and affects every
 * route, so it is a separate scoped task. Do not work around it here.
 *
 * GOVERNANCE — carried forward from the Tier 2A cleanup of 6 September
 * 2026 and still binding:
 *  - No prices, packages, tiers, guarantees or scarcity.
 *  - Nothing above its capability classification. Invoice and payment
 *    automation and the AI Voice Agent are NOT current and must not be
 *    described as included.
 *  - No claim that any advertising platform is managed by ArkFlow.
 *  - Reporting is a supporting capability, not the reason to buy.
 *  - No fabricated proof: no clients, results, traffic, rankings,
 *    revenue, leads or conversion rates. The record below is a worked
 *    example and is labelled as one.
 *  - "Professional website" was removed from this page: /attract now
 *    owns Website as stage one, and listing it here as a sub-item both
 *    duplicated that page and understated it.
 *
 * TWO NOTES ARE MANDATORY and must survive any future edit, verbatim:
 *  - stations[1].note — the clinical safety boundary.
 *  - stations[5].note — ArkFlow does not run or manage paid advertising.
 */

/** Factual capability grouping. NOT a package, tier or plan. */
const CURRENT = "Current capability";
const SCOPED = "Implementation-dependent";

/* ------------------------------------------------------------ HERO */

export const solutionsHero = {
  eyebrow: "The revenue system",
  title: "Someone just raised their hand.",
  titleAccent: "What happens next?",
  lead: "A lead should not have to survive your business process to become a customer.",
  primaryCta: "Book a Discovery Call",
  /* Kept from the previous page. It is the sentence that stops a
     reader filing ArkFlow under software, so it earns its place in
     the opening rather than halfway down. */
  positioning: "None of these is sold as software.",
} as const;

/* --------------------------------------------- THE RECORD OPENS */

export const opening = {
  label: "Opportunity record",
  illustrative: "Worked example",
  who: "J. Tan",
  channel: "WhatsApp",
  opened: "21:41",
  line: "One enquiry. Everything below happens to this record.",
} as const;

/* --------------------------------------------------- THE STATIONS */

export type RecordEntry = {
  /** Public stage label — lib/stage-labels.ts wording, not a key. */
  stage: string;
  at: string;
  text: string;
};

export type Station = {
  /** CONTRACTUAL. See ANCHORS at the head of this file. */
  id: string;
  nav: string;
  /** The business owner's question. This is the dominant line. */
  question: string;
  /** Public stage labels this station covers. */
  stages: string[];
  title: string;
  body: string;
  /** What the record gains here. Empty for Growth, deliberately. */
  entries: RecordEntry[];
  /** What the same record does without the system. Used sparingly. */
  leak?: string;
  capabilities: { name: string; availability: string }[];
  note?: string;
};

export const stations: Station[] = [
  {
    id: "inbox",
    nav: "Where it arrives",
    question: "Did we actually capture the enquiry?",
    stages: ["Enquiry"],
    title: "Every way in, one place to look.",
    body: "Whatever door it came through, it becomes a record the moment it lands — and the door it came through is recorded with it.",
    entries: [
      { stage: "Enquiry", at: "21:41", text: "Message received · WhatsApp" },
      { stage: "Enquiry", at: "21:41", text: "Source recorded with the enquiry" },
    ],
    capabilities: [
      { name: "Unified inbox", availability: CURRENT },
      { name: "Lead source captured", availability: CURRENT },
    ],
  },
  {
    id: "ai",
    nav: "Who answers",
    question: "Did someone respond, and do we know what they need?",
    stages: ["Response", "Qualification"],
    title: "Answered straight away, handed over when it matters.",
    body: "The assistant answers what it has been configured to answer and collects what the business needs to know. Where judgement is required, a person takes over with the record already in front of them.",
    entries: [
      { stage: "Response", at: "21:42", text: "Replied · availability confirmed" },
      { stage: "Qualification", at: "21:45", text: "First visit · weekday preference" },
      { stage: "Response", at: "21:47", text: "Health question · passed to a person" },
    ],
    capabilities: [
      { name: "Digital assistant", availability: CURRENT },
      { name: "Lead qualification", availability: CURRENT },
      { name: "Escalation to a person", availability: CURRENT },
    ],
    /* v1.4 clinical safety boundary. Mandatory, verbatim. */
    note: "In a clinical setting the assistant never gives medical advice, never makes outcome claims and never quotes outside your approved price list.",
  },
  {
    id: "booking",
    nav: "Getting to the appointment",
    question: "Did they take the next step?",
    stages: ["Booking"],
    title: "The booking gets made, without anyone chasing it.",
    body: "The appointment is offered, held and confirmed inside the same conversation, against the diary the business already keeps.",
    entries: [
      { stage: "Booking", at: "21:52", text: "Thursday 10:30 held · confirmation sent" },
    ],
    capabilities: [
      { name: "Appointment booking and scheduling", availability: CURRENT },
    ],
  },
  {
    id: "automation",
    nav: "What keeps moving",
    question: "What happens when they go quiet?",
    stages: ["Conversion", "Follow-up"],
    title: "The follow-up that does not depend on memory.",
    body: "Reminders, no-show recovery and the nudge after the appointment all run from the record, so nothing waits for someone to remember it.",
    entries: [
      { stage: "Follow-up", at: "Wed 09:00", text: "Reminder sent · 24 hours before" },
      { stage: "Conversion", at: "Thu 10:30", text: "Attended" },
      { stage: "Follow-up", at: "Thu 14:00", text: "Review request sent" },
    ],
    leak: "Without it, the record stops at the booking. Nothing after that is anyone's job.",
    capabilities: [
      { name: "Follow-up sequences", availability: CURRENT },
      { name: "Reminders and no-show recovery", availability: CURRENT },
      { name: "Review requests", availability: CURRENT },
    ],
  },
  {
    id: "crm",
    nav: "What is remembered",
    question: "Do we remember them, and can we bring them back?",
    stages: ["Retention", "Reactivation"],
    title: "One record per customer, for as long as they are a customer.",
    body: "The same record carries on past the first visit. When someone goes quiet, they are surfaced while there is still a relationship to continue.",
    entries: [
      { stage: "Retention", at: "+6 weeks", text: "Return window opens" },
      { stage: "Reactivation", at: "+5 months", text: "Quiet since March · surfaced" },
    ],
    leak: "Without it, a quiet customer is indistinguishable from a customer who never existed.",
    capabilities: [
      { name: "CRM and pipeline", availability: CURRENT },
      { name: "Customer journey", availability: CURRENT },
      { name: "Smart lists", availability: CURRENT },
    ],
  },
  {
    id: "reporting",
    nav: "What you can see",
    question: "Can we see where the system is leaking?",
    stages: ["Growth"],
    title: "Reporting is the instrument panel, not the engine.",
    /* NO ENTRIES, ON PURPOSE. Every other station writes to the
       record; this one reads it. The absence is the argument. */
    body: "Everything above is what reporting reads. It tells you which stage is losing people — it is not the thing that moves them.",
    entries: [],
    capabilities: [
      { name: "Monthly performance report", availability: CURRENT },
      { name: "Ad source tracking", availability: SCOPED },
      { name: "Monthly strategy call", availability: CURRENT },
    ],
    /* v1.4 advertising boundary. Mandatory, verbatim. */
    note: "What each platform reports back varies, and ArkFlow connects what they expose rather than replacing the native ad managers. ArkFlow does not run or manage paid advertising — it shows you which of yours is working.",
  },
];

/* ----------------------------------------------------- THE PAYOFF */

export const payoff = {
  eyebrow: "One record",
  title: "Nothing was connected. It was the same record the whole time.",
  body: "No handover between tools, because there was no handover. The opportunity never had to survive the gap between one step and the next.",
} as const;

/* -------------------------------------------------------- ACTION */

export const solutionsCta = {
  title: "Where is your revenue actually leaking?",
  body: "A discovery call maps your enquiry-to-payment flow against these stages and shows you which one is losing people.",
  primary: "Book a Discovery Call",
  /* Secondary diagnostic path only. The canonical CTA is the call —
     founder decision, 6 September 2026. */
  secondaryLabel: "See the Revenue Leak Audit",
  secondaryHref: "/#revenue-leak-audit",
} as const;
