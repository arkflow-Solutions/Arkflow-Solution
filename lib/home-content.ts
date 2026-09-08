/**
 * SUPERSEDED AND ORPHANED EXPORTS REMOVED — 6 September 2026.
 *
 * Only `howWeWork` survives; it is still used by /how-it-works. The v2
 * homepage exports (`hero`, `tenDoors`, `inbox`, `faq`, `finalCta`) went
 * with the v2 homepage components. Homepage copy now lives in
 * lib/revenue-content.ts.
 *
 *   `packages`  Respond / Operate / Scale tier copy and the 30-Day
 *               Response Guarantee. Package names, guarantees and
 *               contract terms are not for public use.
 *   `engine`    The six-stage journey (Attract, Engage, Qualify, Book,
 *               Convert, Retain). Superseded by the canonical ten-stage
 *               Revenue Engine in lib/revenue-content.ts.
 *
 * Do not reinstate either. scripts/verify.mjs blocks both.
 */

/**
 * Homepage copy — single source for every section.
 *
 * GOVERNANCE (read before editing):
 *  - Canonical Package Specification v1.0 + AMENDMENTS-v1.1 govern package
 *    scope. No price appears on any public surface (Amendment 2).
 *  - Voice AI is Scale-only (Amendment 1). Never present it as an Operate
 *    add-on or imply every client has it.
 *  - Reactivation and recall are described functionally, never by
 *    product name, and never with a tier label. Personalised recall
 *    and ad-source tracking are on every level (Amendments 5, 7).
 *  - Ad-source tracking covers Meta, Google and TikTok only. LinkedIn is
 *    not claimed. No attribution figure, rate or result may be stated.
 *  - Founder Bible §1.5/§1.11/§1.13: Stage 1 commercial focus is Singapore
 *    aesthetic clinics. Broad service-business language describes the
 *    ARCHITECTURE only. Pet groomer and car detailer are conceptual
 *    demonstrations, never claimed clients or verticals served.
 *  - No client counts, testimonials, logos, case studies, results, ad
 *    integrations or capabilities beyond the source documents.
 *  - "Under 90 seconds" appears only as the guarantee condition or a design
 *    commitment. Never as achieved performance.
 */

/* ---------------------------------------------- 1 · HERO */



/* ---------------------------------------------- 2 · TEN DOORS */



/* ------------------------------------------------- RETIRED SECTIONS
 *
 * theParts, secondAdmin, provides, voice, retention, reporting and
 * industries no longer render on the homepage. Their content is kept
 * here (unexported) rather than deleted so nothing is lost, and so the
 * copy can be lifted onto /solutions and /aesthetic-clinics.
 *
 *   theParts     -> absorbed into tenDoors.parts
 *   secondAdmin  -> one line, engine.close
 *   provides     -> /solutions (all six layers already covered there)
 *   voice        -> Scale tier + /solutions#ai
 *   retention    -> /solutions#automation
 *   reporting    -> /solutions#reporting
 *   industries   -> /aesthetic-clinics; the Stage 1 disclosure moved to
 *                   packages.focus and the FAQ (governance-required)
 */

const theParts_RETIRED = {
  eyebrow: "What you already have",
  title: "You already have the parts.",
  lead: "Almost none of them are connected. Every one of these does its own job well and then stops at its own edge — which is exactly where the work falls on your staff.",
  parts: [
    "Website",
    "Instagram",
    "TikTok",
    "Facebook",
    "WhatsApp",
    "Google",
    "Email",
    "Phone",
    "Calendar",
    "Payments",
  ],
  close: "That is where ArkFlow comes in.",
} as const;

/* ---------------------------------------------- 5 · ENGINE / JOURNEY */



/* ---------------------------------------------- 6 · UNIFIED INBOX */



/* ---------------------------------------------- 7 · SECOND ADMIN */

const secondAdmin_RETIRED = {
  eyebrow: "In plain terms",
  title: "Think of ArkFlow as a second admin.",
  lead: "Not to replace your people. To take the repetitive work off them, so the hours they do have go to the parts of the job that actually need a person.",
  handled: [
    "Answering the same question for the fiftieth time",
    "Checking what's free and sending the booking link",
    "Sending confirmations and reminders",
    "Handling reschedules and cancellations",
    "Chasing an invoice that is eight days late",
    "Following up on a quote nobody replied to",
    "Asking for a review at the right moment",
    "Getting back in touch with someone who hasn't been in for months",
  ],
  human: [
    "The customer in front of them",
    "The conversation that needs judgement",
    "The complaint that needs care",
    "The service itself",
  ],
} as const;

/* ---------------------------------------------- 8 · WHAT WE PROVIDE */

const provides_RETIRED = {
  eyebrow: "What ArkFlow provides",
  title: "Grouped by what it does for the business.",
  lead: "Not a feature list. What changes, at each point in the journey.",
  groups: [
    {
      name: "Bring them in",
      body: "Enquiries arrive from every channel and land in one place, with the source attached so you know what brought them.",
      items: [
        "Connected website (Scale)",
        "Enquiry capture from every channel",
        "Lead source recorded per enquiry",
      ],
    },
    {
      name: "Answer and qualify",
      body: "Every enquiry gets a helpful reply, day or night, and arrives at your team already understood.",
      items: [
        "Unified customer inbox",
        "Digital assistant that answers and qualifies",
        "Adaptive follow-up when there's no reply",
        "Escalation to a person when it matters",
      ],
    },
    {
      name: "Book and convert",
      body: "The appointment gets made, confirmed and remembered — and the invoice chases itself.",
      items: [
        "Booking, rescheduling and cancellation (Operate)",
        "Confirmations and reminders",
        "No-show follow-up",
        "Invoicing and payment reminders (Operate)",
      ],
    },
    {
      name: "Retain and grow",
      body: "The visit after this one is planned before this one is finished.",
      items: [
        "Follow-up after the appointment",
        "Review requests",
        "Past-customer reactivation (Operate and above)",
        "Repeat booking invitations",
      ],
    },
    {
      name: "See what's happening",
      body: "Where enquiries came from, what happened to them, and where the business is leaking.",
      items: [
        "CRM and pipeline",
        "Customer journey tracking",
        "Ad source connected — Meta, Google, TikTok",
        "Monthly performance report",
      ],
    },
    {
      name: "Operate",
      body: "The system is run for you. That is the part most vendors leave out.",
      items: [
        "Ongoing management and monitoring",
        "Updates and optimisation",
        "WhatsApp-first support, four-hour response in business hours",
        "Monthly reporting",
      ],
    },
  ],
  close: "We do not hand you software and wish you luck. We build it, connect it, operate it and keep improving it.",
} as const;

/* ---------------------------------------------- 9 · VOICE AI */

const voice_RETIRED = {
  eyebrow: "Voice AI · included with Scale",
  title: "Not every call needs a human.",
  lead: "A voice assistant picks up when your team is with a customer — and hands the call over the moment it stops being routine.",
  handles: [
    "Opening hours and location",
    "Common questions about your services",
    "Making a booking",
    "Rescheduling or cancelling",
    "Basic qualification before a callback",
  ],
  escalates: [
    "Anything requiring judgement",
    "Anything sensitive",
    "Anything the caller wants a person for",
  ],
  note: "Voice AI is part of ArkFlow Scale. It is not a replacement for your team — it is what stops a simple question from interrupting them.",
  /** Design commitment per Spec §05. Never framed as measured performance. */
  commitment: "Designed to answer within two rings.",
} as const;

/* ---------------------------------------------- 10 · RETENTION */

const retention_RETIRED = {
  eyebrow: "Retention",
  title: "Getting the customer once is not the finish line.",
  lead: "The cheapest customer you will ever win is the one who already came in. Most businesses lose them quietly, to nothing more than silence.",
  chain: ["First visit", "Follow-up", "Review", "Recall", "Rebook", "Repeat customer"],
  /**
   * DENAMED, 6 September 2026. Both workflows previously carried
   * product names and tier labels. Product names are unapproved for
   * public use and package tiers are superseded, so both are described
   * functionally instead. The distinction still has to read clearly:
   * recall fires on a rule the business sets, re-engagement fires on
   * engagement signals.
   */
  systems: [
    {
      name: "Personalised recall",
      tier: "Fires on a rule you set",
      body: "A message on a customer's birthday, or once a set interval has passed since their last visit. You write it, you set the interval, and you decide whether it carries an offer. It goes out on time whether or not anyone remembered.",
    },
    {
      name: "Re-engagement",
      tier: "Fires on engagement signals",
      body: "The other half of the problem: not who is due, but who is quietly slipping away. Engagement signals identify customers going cold, so they can be reached before they are gone rather than after.",
    },
  ],
  examples: [
    {
      kind: "Aesthetic clinic",
      text: "\"It's been a while since your last visit — would you like to come in for a review?\"",
    },
    {
      kind: "Salon",
      text: "\"Ready for your next appointment? Here's what's free this week.\"",
    },
    {
      kind: "Pet groomer",
      text: "\"Your dog's last groom was six weeks ago. Shall we book the next one?\"",
    },
  ],
  note: "Every message is written and approved by the business, and sent on the business's own rules. ArkFlow does not write clinical advice or recommend treatment.",
} as const;

/* ---------------------------------------------- 11 · REPORTING */

const reporting_RETIRED = {
  eyebrow: "Reporting and visibility",
  title: "Reporting doesn't run the business. It shows you where it's leaking.",
  lead: "Every platform already has its own reporting. The problem is that seeing the whole picture means opening all of them and doing the joining in your head.",
  metrics: [
    "Where enquiries came from",
    "How many arrived",
    "How fast they were answered",
    "How many booked",
    "How many didn't show",
    "What was collected",
    "Who came back",
  ],
  /**
   * AMENDMENT 5 (v1.3): ArkFlow connects ad lead-source data from these
   * four platforms into the customer record, on all three levels.
   * LinkedIn is deliberately NOT claimed. No figure, rate or result may
   * be stated — there is no client data.
   */
  attribution: {
    title: "Follow the ad all the way to the revenue",
    body: "The useful question was never how many people saw the ad. It is which channels actually produced customers. Connect your Facebook, Instagram, Google Ads and TikTok accounts and the lead source travels with the customer — into the same record as the conversation, the booking and the payment. One dashboard instead of four tabs and a spreadsheet.",
    platforms: ["Facebook", "Instagram", "Google", "TikTok"],
    chain: ["Ad", "Enquiry", "Customer", "Booking", "Revenue"],
    caveat: "What each platform reports back varies, and ArkFlow connects what they expose rather than replacing the native ad managers. ArkFlow does not run or manage paid advertising.",
    tier: "Every level",
  },
} as const;

/* ---------------------------------------------- 12 · INDUSTRIES */

const industries_RETIRED = {
  eyebrow: "One architecture",
  title: "The architecture travels. The commercial focus does not.",
  lead: "Underneath, the system is the same. What changes is the knowledge base, the services, the timings and the follow-up intervals — configured to how a particular business actually runs.",
  examples: [
    {
      name: "Aesthetic clinic",
      status: "flagship",
      journey: [
        "Enquiry",
        "Consultation",
        "Deposit",
        "Appointment",
        "Treatment",
        "Follow-up",
        "Repeat visit",
      ],
      body: "Enquiries arrive at all hours and go cold fast. The consultation is the conversion point, and the repeat visit is where the value is.",
    },
    {
      name: "Pet groomer",
      status: "conceptual",
      journey: [
        "Enquiry",
        "Availability",
        "Booking",
        "Reminder",
        "Groom",
        "Review",
        "Rebook",
      ],
      body: "A short, predictable cycle. The whole business depends on the customer coming back on schedule rather than when they remember.",
    },
    {
      name: "Car detailer",
      status: "conceptual",
      journey: [
        "Enquiry",
        "Vehicle details",
        "Quotation",
        "Booking",
        "Service",
        "Payment",
        "Maintenance rebook",
      ],
      body: "Every job needs qualifying before it can be quoted. Most of the loss happens between the quote and the booking.",
    },
  ],
  /** The Option B statement. Required. Do not soften or remove. */
  focus: {
    title: "Today, ArkFlow's commercial focus is Singapore aesthetic clinics.",
    body: "The pet groomer and car detailer above are illustrations of how the same architecture adapts — not industries we currently serve. We would rather be genuinely good at one thing first than passably useful at ten.",
  },
} as const;

/* ---------------------------------------------- 13 · PACKAGES */



/* ---------------------------------------------- 14 · HOW WE WORK */

/**
 * Step names follow Canonical Package Specification §08.
 * GOVERNANCE NOTE: the previous names (Discover / Build / Test / Operate /
 * Optimise) diverged from the spec. Aligned to the spec per the escalation
 * rule — the site follows the canonical document, not the reverse.
 */
export const howWeWork = {
  eyebrow: "How we work",
  title: "Five steps, and we run the system afterwards.",
  steps: [
    {
      name: "Discovery",
      body: "A Revenue Leak Audit on your own numbers, then the call about what the gap is costing.",
    },
    {
      name: "Setup",
      body: "CRM, pipeline, templates, booking rules and billing logic configured to your business.",
    },
    {
      name: "Testing",
      body: "The whole flow tested on real devices before anything is switched on for a customer.",
    },
    {
      name: "Go Live",
      body: "The system starts working on your real enquiries. We monitor it from there.",
    },
    {
      name: "Optimisation",
      body: "Baseline at day zero, then tuning and monthly reporting as the system settles into how your team works.",
    },
  ],
} as const;

/* ---------------------------------------------- FAQ */



/* ---------------------------------------------- 15 · FINAL CTA */


