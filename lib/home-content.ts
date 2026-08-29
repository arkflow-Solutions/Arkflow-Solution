/**
 * Homepage copy — single source for every section.
 *
 * GOVERNANCE (read before editing):
 *  - Canonical Package Specification v1.0 + AMENDMENTS-v1.1 govern package
 *    scope. No price appears on any public surface (Amendment 2).
 *  - Voice AI is Scale-only (Amendment 1). Never present it as an Operate
 *    add-on or imply every client has it.
 *  - RenewalRadar is Operate and above (Amendment 6). Personalised recall
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

export const hero = {
  eyebrow: "ArkFlow · Singapore",
  title: "Revenue Operations",
  titleAccent: "for Singapore service businesses.",
  lead: "Enquiries, conversations, CRM, bookings, payments and follow-up — connected into one system, built around how your business actually runs.",
  primaryCta: "Get Your Lead Response Audit",
  secondaryCta: "See how ArkFlow works",
  /** Framed as commitments, never as measured performance. */
  commitments: [
    { label: "Designed to reply in", value: "under 90 seconds" },
    { label: "Core system live in", value: "72 hours" },
    { label: "Backed by the", value: "30-Day Response Guarantee" },
  ],
  /**
   * Pre-empts the obvious objection at the point it is raised. These are
   * service commitments; ArkFlow has no client performance data to publish.
   */
  commitmentsNote: "Service commitments, not client results.",
} as const;

/* ---------------------------------------------- 2 · TEN DOORS */

export const tenDoors = {
  eyebrow: "The problem",
  title: "Six tools. One customer. No connection.",
  lead: "A customer finds you on Google, messages on Instagram, moves to WhatsApp, gets a quote by email, books on a calendar and pays by link. To them that is one conversation. To your business it is six systems that have never spoken — and the gaps between them are where enquiries go cold, follow-ups get forgotten and your staff retype what they already have.",
  /** The journey a single customer takes across disconnected tools. */
  path: [
    { step: "Finds you", where: "Google" },
    { step: "Messages", where: "Instagram" },
    { step: "Moves to", where: "WhatsApp" },
    { step: "Gets a quote", where: "Email" },
    { step: "Books", where: "Calendar" },
    { step: "Pays", where: "Payment link" },
    { step: "Comes back", where: "Months later" },
  ],
  /**
   * Absorbed from the retired "You already have the parts" section. The
   * chips carry that idea visually; the six-bullet cost list that used to
   * sit here restated the lead in prose and was cut.
   */
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
  close: "Most businesses are not short of tools. They are short of connection between them.",
} as const;

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

export const engine = {
  eyebrow: "The journey",
  title: "One journey. Six stages. One system.",
  lead: "Not every business uses every step. The point is that all of it runs on one system instead of six.",
  stages: [
    {
      name: "Attract",
      body: "An enquiry arrives, and the source it came from is recorded with it.",
      /* Amendment 8 (v1.4) — website work is the substance of this stage. */
      href: "/attract",
    },
    {
      name: "Engage",
      body: "Answered straight away, in your voice, on the channel they chose.",
    },
    {
      name: "Qualify",
      body: "What they want and how urgent — captured in the conversation, not a callback.",
    },
    {
      name: "Book",
      body: "Availability checked, appointment made, confirmation and reminders sent.",
    },
    {
      name: "Convert",
      body: "Invoice issued on the right trigger, and followed up until it is settled.",
    },
    {
      name: "Retain",
      body: "Follow-up, review request, and an invitation back at the right time.",
    },
  ],
  /**
   * The single surviving line from the retired "Second admin" section.
   * That whole section made one point; this is the point.
   */
  close: "Your people handle people. ArkFlow handles the repetition.",
  /* Amendment 8 (v1.4) — approved supporting line, verbatim. */
  frontDoor: "The front door can be built on its own, or as part of the system.",
  frontDoorHref: "/attract",
} as const;

/* ---------------------------------------------- 6 · UNIFIED INBOX */

export const inbox = {
  eyebrow: "Unified inbox",
  title: "Every channel. One inbox.",
  /**
   * CLAIM NOTE: the previous version of this copy read "...and gets
   * answered in under 90 seconds", which states performance ArkFlow has
   * no client data for. Per the C-2 ruling, 90 seconds appears only as
   * the guarantee's condition or as a design commitment. Do not revert.
   */
  lead: "WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS and email — every enquiry from every platform lands in one Team Inbox, designed to be answered in under 90 seconds. Your team never switches tabs, and no lead sits waiting because nobody saw it.",
  channels: [
    "WhatsApp",
    "Instagram",
    "Messenger",
    "TikTok",
    "Telegram",
    "SMS",
    "Email",
  ],
  /**
   * Illustrative inbox contents. Not real customers, not real enquiries.
   * The panel is labelled as an illustration in the UI — keep that label.
   */
  panel: {
    title: "Team Inbox",
    badge: "4 unread",
    conversations: [
      {
        from: "Jasmine L.",
        channel: "Instagram",
        preview: "Hi! Do you have availability this Friday?",
        unread: true,
      },
      {
        from: "+65 8•••• 4021",
        channel: "WhatsApp",
        preview: "Can I reschedule my appointment?",
        unread: false,
      },
      {
        from: "m•••@gmail.com",
        channel: "Email",
        preview: "Following up on the quote you sent",
        unread: false,
      },
      {
        from: "tiktok_user_88",
        channel: "TikTok",
        preview: "Saw your video — how much for the...",
        unread: false,
      },
    ],
  },
  close: "One customer. One history. One place to look.",
} as const;

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
  close: "Let your people handle people. Let ArkFlow handle the repetition.",
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
   * AMENDMENT 7 (v1.3) — personalised recall, all levels.
   * AMENDMENT 6 (v1.3) — RenewalRadar now Operate and above.
   * The two must stay visibly distinct: recall fires on a rule the
   * business sets; RenewalRadar fires on engagement signals.
   */
  systems: [
    {
      name: "Personalised recall",
      tier: "Every level",
      body: "A message on a customer's birthday, or once a set interval has passed since their last visit. You write it, you set the interval, and you decide whether it carries an offer. It goes out on time whether or not anyone remembered.",
    },
    {
      name: "RenewalRadar",
      tier: "Operate and above",
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

export const packages = {
  eyebrow: "Packages",
  title: "Three levels. One system underneath.",
  lead: "Each level is the one before it, plus more. Nothing is taken away as you move up — capability is only ever added.",
  tiers: [
    {
      name: "Respond",
      accent: "emerald" as const,
      promise: "Never lose another lead to a slow reply.",
      body: "Capture, organise and respond to enquiries. Every enquiry answered, qualified and recorded — including the ones that arrive at 11pm on a Sunday.",
      includes: [
        "Instant messaging response",
        "Automatic qualification and follow-up",
        "CRM and pipeline",
        "Personalised birthday and recall messages",
        "Ad source tracking and reporting",
      ],
      detail: {
        who: "Businesses whose enquiries arrive faster than anyone can answer them — evenings, weekends, and mid-appointment.",
        problem: "Enquiries land across six channels and get answered whenever somebody is free. The ones that arrive at the wrong moment go cold before anyone sees them.",
        system: "Every channel lands in one inbox. The first reply goes out immediately, qualifies the enquiry and records it against a customer. Follow-up runs on a schedule rather than on memory.",
        changes: "Nobody is watching six inboxes. The question \"did anyone reply to that?\" stops being asked.",
      },
    },
    {
      name: "Operate",
      accent: "violet" as const,
      badge: "Most common",
      promise: "Run your operations on autopilot.",
      body: "Everything in Respond, plus booking and invoicing that run themselves — and a system that brings past customers back. Confirmations, reminders, no-show follow-up and payment chasing stop being anyone's job.",
      includes: [
        "Everything in Respond",
        "Booking, rescheduling and reminders",
        "Invoicing and payment follow-up",
        "Past-customer reactivation (RenewalRadar)",
      ],
      detail: {
        who: "Businesses that are getting the leads but losing the hours — where admin has quietly become somebody's full-time job.",
        problem: "Confirmations, reminders, no-show follow-up, invoice chasing and rebooking all depend on a person remembering. When the week is busy, they are the first things to slip.",
        system: "Booking and rescheduling run against a live calendar with staged reminders. Invoices issue on the right trigger and chase themselves. Past customers are invited back on their own interval.",
        changes: "The administrative layer stops competing with the customer in the room for your team's attention.",
      },
    },
    {
      name: "Scale",
      accent: "blue" as const,
      promise: "Online, answering and winning customers back.",
      body: "Everything in Operate, plus a professional website and an AI Voice Agent that answers inbound calls when your team is busy.",
      includes: [
        "Everything in Operate",
        "Professional website",
        "AI Voice Agent",
        "Monthly strategy call",
      ],
      detail: {
        who: "Businesses ready to run the whole acquisition and retention system on one architecture, including the phone.",
        problem: "Calls go unanswered while the team is on other calls or with customers, and the website is a brochure rather than an entry point into the system.",
        system: "Everything in Operate, plus a website built as part of the system and a voice agent that answers, qualifies and books — handing over to a person the moment it should.",
        changes: "Every entry point — search, social, message and phone — ends up in the same place, and a monthly strategy call turns the reporting into decisions.",
      },
    },
  ],
  terms: "Six-month minimum on every level, then month-to-month. One implementation, whichever level you start on.",
  quotation: {
    title: "Every ArkFlow system is configured around how your business actually operates.",
    body: "That is why we quote rather than publish a price list. The discovery call establishes what you actually need; the quotation follows from it.",
    cta: "Request a personalised quotation",
  },
  /**
   * STAGE 1 DISCLOSURE — relocated from the retired "One architecture"
   * section. This is a governance-required honesty statement, not a
   * marketing block: it must appear on the homepage in some form.
   * Founder Bible §1.5, §1.11. Do not remove.
   */
  /* Amendment 8 (v1.4) — one line, no pricing, no fourth tier implied. */
  alaCarte: {
    line: "Website design and revamp work is also available on its own, separate from the packages.",
    cta: "See website work",
    href: "/attract",
  },
  focus: {
    line: "Currently working with Singapore aesthetic clinics.",
    cta: "How it works for clinics",
    href: "/aesthetic-clinics",
  },
  guarantee: {
    name: "30-Day Response Guarantee",
    body: "If ArkFlow does not reduce your average lead response time to under 90 seconds within the first 30 days after onboarding, we refund your first monthly subscription fee. It is checked at Day 30 — you never have to ask.",
    note: "This is ArkFlow's only guarantee.",
  },
} as const;

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
      body: "A Lead Response Audit on your own numbers, then the call about what the gap is costing.",
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
      body: "Core system live within 72 hours of a completed intake. We monitor it from there.",
    },
    {
      name: "30-Day Optimisation",
      body: "Baseline at day zero, guarantee checkpoint at Day 30, then monthly reporting.",
    },
  ],
} as const;

/* ---------------------------------------------- FAQ */

export const faq = {
  eyebrow: "Questions",
  title: "The things people actually ask.",
  items: [
    {
      q: "What does ArkFlow actually do?",
      a: "We connect the tools your business already uses into one system, then operate it for you — enquiry, conversation, booking, payment, follow-up and the visit after that.",
    },
    {
      q: "How long until it's running?",
      a: "The core system is live within 72 hours of a completed intake. On Scale, the professional website follows on a parallel track within 10 business days.",
    },
    {
      q: "Do I need to replace the software I already use?",
      a: "Usually not. Some tools get connected, some get replaced by something that talks to the rest. The audit establishes which is which — before you commit to anything.",
    },
    {
      q: "How does pricing work?",
      a: "Every system is configured around how a particular business runs, so we quote rather than publish a list. The audit and discovery call establish scope; the quotation follows from that.",
    },
    {
      q: "What happens to my customer data?",
      a: "It stays yours. How it is stored, who can access it, how long it is kept and what happens on exit is set out in full on our Trust & security page.",
    },
    {
      q: "Is ArkFlow suitable for my business?",
      a: "Our commercial focus today is Singapore aesthetic clinics. The architecture suits most service businesses that take enquiries and bookings — and the audit will tell you honestly either way.",
    },
    {
      q: "What happens after the audit?",
      a: "You get the numbers whether or not you engage us. If there is a fit, we recommend one package against your data — never a menu.",
    },
  ],
} as const;

/* ---------------------------------------------- 15 · FINAL CTA */

export const finalCta = {
  title: "Your business already has the parts.",
  titleAccent: "Let's connect them.",
  body: "Start with a Lead Response Audit. Free, thirty minutes, and it ends with a number: how fast enquiries to your business actually get answered.",
  primaryCta: "Get Your Lead Response Audit",
  secondaryCta: "Book a discovery call",
} as const;
