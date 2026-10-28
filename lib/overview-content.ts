/**
 * /overview — the "ArkFlow for Every Business" deck as a web page.
 *
 * SOURCE: ArkFlow_for_Every_Business.pdf, 16 slides, supplied by the
 * founder 28 October 2026. The wording here is the deck's own, lightly
 * joined into sentences where a slide broke a line for layout. Nothing
 * has been added to it: no figure, claim, capability or commercial
 * term that is not on a slide.
 *
 * THE ILLUSTRATIVE LABELS ARE LOAD-BEARING. Slides 4, 5, 6, 8, 9, 10
 * and 12 carry an "Illustrative" marker and a footnote, because the
 * interfaces and the channel table are examples rather than client
 * data. Those markers travel with the content — a number that is
 * labelled on a slide and unlabelled on a web page has been turned
 * into a claim.
 *
 * TWO THINGS IN THE DECK ARE DELIBERATELY NOT REPRODUCED:
 *
 *  1. The link to go.arkflowsolutions.com/assessment-page. It returns
 *     404 (checked 28 Oct 2026, plain request and in a browser), as
 *     does the current AUDIT_URL. A dead link is worse on a page you
 *     send to a prospect than no link, so the page's single action is
 *     the booking modal, which was verified working the same day.
 *
 *  2. The contact email printed on slide 16 (the Gmail address). The
 *     page reads CONTACT_EMAIL instead, so it stays in step with the
 *     rest of the site.
 */

export const overviewHero = {
  eyebrow: "For service businesses in Singapore",
  title: "Turn more enquiries into booked customers.",
  lines: [
    "Answer every enquiry.",
    "Follow up automatically.",
    "Keep every lead moving toward a booking.",
  ],
};

export const challenge = {
  eyebrow: "The challenge",
  title: "Where enquiries slip away.",
  lead: "Most businesses don't lack interest. Opportunities leak between the first message and the booking.",
  items: [
    {
      title: "Enquiries in too many apps",
      body: "WhatsApp, Instagram, Facebook, TikTok, email and the website, each checked separately.",
    },
    {
      title: "Replies that wait",
      body: "After-hours messages sit until someone is free, often the next morning.",
    },
    {
      title: "Bookings never made",
      body: "The interest is there, but nobody locks in a time.",
    },
    {
      title: "Leads that go quiet",
      body: "They ask about the price, stop replying, and nobody follows up.",
    },
    {
      title: "The same questions, by hand",
      body: "Hours, process and availability, typed out again and again.",
    },
    {
      title: "Past customers forgotten",
      body: "No check-in when they may be ready to return, upgrade or refer a friend.",
    },
  ],
  close:
    "None of these feels like a crisis. Together, they cost you customers. ArkFlow closes these gaps with one connected system.",
};

export const optimise = {
  eyebrow: "What we optimise",
  title: "Six areas we can optimise for your business.",
  lead: "From the first enquiry to the repeat visit, in one connected system.",
  items: [
    {
      title: "Enquiry management",
      body: "Capture and reply to every enquiry, day or night.",
    },
    {
      title: "Customer CRM",
      body: "Every customer's stage, owner and next step in one record.",
    },
    {
      title: "Bookings & reminders",
      body: "Booking, confirmations and reminders, handled for you.",
    },
    {
      title: "Follow-up & re-engagement",
      body: "Quiet enquiries re-engaged, and past customers reminded at the right time.",
    },
    {
      title: "Social media publishing",
      body: "Post to Instagram, Facebook, TikTok and LinkedIn from one place.",
    },
    {
      title: "Ads tracking & reporting",
      body: "See which channels and ads bring in bookings, in one place.",
    },
  ],
  note: "Every system is designed around how your business already works, and you approve every message, template and post.",
};

export const connected = {
  eyebrow: "One connected system",
  items: [
    {
      title: "All your enquiries in one place.",
      body: "Every channel lands in one inbox, and every conversation stays attached to the customer.",
      note: "Illustrative interface. Which channels connect, including WhatsApp, depends on each business's setup.",
    },
    {
      title: "A full CRM for every customer.",
      body: "Every customer, conversation and appointment in one record, moving through clear stages.",
      note: "Illustrative. Customer data is handled under the PDPA, with a data protection agreement in place.",
    },
    {
      title: "Your outreach and ads, in the same system.",
      body: "Publish to every platform from one place, and see which channels bring in enquiries and bookings.",
      note: "Illustrative figures, not client results. Industry advertising rules apply to every post and ad; you approve what's published.",
    },
  ],
};

/**
 * The customer pipeline stages shown on slide 5. Labels only — the
 * names and counts on that slide are illustrative, so no number
 * travels with them.
 */
export const pipelineStages = [
  "New enquiry",
  "Booked",
  "Attended",
  "In progress",
  "Repeat due",
];

export const agent = {
  eyebrow: "The AI conversation agent",
  title: "The chat is only the front end.",
  lead: "The real value is the system behind it.",
  chain: [
    "Customer message",
    "AI understands the request",
    "AI responds",
    "Workflow triggered",
    "Appointment booked",
    "Customer record updated",
  ],
  note: "Every reply the customer sees is backed by your records, your approved answers and your team, working together.",
};

export const conversations = {
  eyebrow: "What the agent does",
  title: "Three conversations it handles on its own.",
  items: [
    {
      label: "New enquiry to appointment",
      headline: "The AI doesn't just answer. It moves the conversation forward.",
      steps: [
        "Lead captured",
        "Enquiry details recorded",
        "Customer added to CRM",
        "Booking request",
        "Appointment confirmed",
        "Team member notified",
      ],
      note: "Illustrative. Services, prices and slots come from the business's own data; WhatsApp depends on setup.",
    },
    {
      label: "Automated follow-up",
      headline: "The conversation doesn't end when the customer goes quiet.",
      steps: [
        "Previously inactive",
        "Follow-up triggered",
        "AI re-engagement",
        "Customer responds",
        "Lead reactivated",
        "Booking opportunity",
      ],
      note: "Illustrative. Timing is set per business, and follow-up stops if a customer asks not to be contacted.",
    },
    {
      label: "Objection handling",
      headline:
        "When the customer says, “A bit expensive leh.” The conversation doesn't have to end there.",
      steps: [
        "Objection",
        "Understand the reason",
        "Ask a question",
        "Share what's included",
        "Keep them engaged",
        "Offer the next step",
      ],
      note: "Illustrative. No pressure tactics, invented urgency or outcome claims; answers use approved information.",
    },
  ],
};

export const split = {
  eyebrow: "AI and your team",
  title: "AI handles the repetitive work. Your team handles the relationship.",
  ai: {
    title: "Handled by the AI",
    items: [
      "First replies, day or night",
      "FAQs: hours, location, process",
      "Qualification and information gathering",
      "Appointment booking",
      "Reminders and confirmations",
      "Follow-up and re-engagement",
      "Basic concerns, with approved answers",
    ],
  },
  team: {
    title: "Handled by your team",
    items: [
      "Pricing, quotes and exceptions",
      "Negotiation and final closing",
      "Complex or high-value conversations",
      "Complaints and sensitive conversations",
      "Advice that needs professional judgement",
      "Relationships with customers",
      "Anything needing judgement",
    ],
  },
  note: "The AI never pretends to be a person. When judgement is needed, it brings in your team.",
};

export const handover = {
  eyebrow: "Human handover",
  title: "Knowing when to hand over.",
  lead: "Pricing, quotes and sensitive questions go to your team, with the full conversation attached.",
  steps: [
    "AI conversation",
    "Customer asks a complex question",
    "AI identifies the need for a human",
    "Team member notified, customer details captured",
    "Human takes over, with the full conversation",
  ],
  note: "The AI never quotes a price or gives advice it can't verify. Hand-over rules are agreed with each business.",
};

export const care = {
  eyebrow: "Built with care",
  title: "Designed around your rules.",
  lead: "Every industry has its own advertising, professional and data rules. The system is set up to respect them.",
  items: [
    {
      title: "You approve the words",
      body: "Message templates, AI answers and social posts are approved by your business before use.",
    },
    {
      title: "Approved answers only",
      body: "The AI shares only information you've approved. Anything else goes to your team.",
    },
    {
      title: "Customer data protected",
      body: "A data protection agreement under the PDPA. Your data stays yours, and you can export it at any time.",
    },
    {
      title: "Safety first",
      body: "Messages that signal risk or distress are flagged, urgent contacts shared, your team alerted and automated messages paused.",
    },
  ],
  note: "Your business remains responsible for its industry's rules. We build the system so it's easier to stay within them.",
};

export const summary = {
  eyebrow: "In summary",
  title: "One AI agent. Multiple front-desk functions.",
  items: [
    { title: "Respond", body: "Reply to new enquiries quickly, day or night." },
    { title: "Qualify", body: "Understand what each customer needs and is interested in." },
    { title: "Book", body: "Help customers move toward appointments and bookings." },
    { title: "Follow up", body: "Re-engage leads that have gone quiet." },
    { title: "Hand over", body: "Handle common questions and concerns, and bring in your team when it matters." },
  ],
  note: "The goal is not to replace your team. The goal is fewer missed opportunities and fewer empty slots.",
};

export const working = {
  eyebrow: "Working together",
  title: "How we'd set this up for your business.",
  lead: "No pressure and no hard sell. Here's how it usually works.",
  steps: [
    {
      title: "A short conversation",
      body: "15–20 minutes on how enquiries, bookings and follow-up work today.",
    },
    {
      title: "Revenue assessment",
      body: "A structured look at where your customer journey is leaking.",
    },
    {
      title: "Design",
      body: "Channels, booking rules, templates and hand-over rules, approved by you.",
    },
    {
      title: "Build & test",
      body: "Inbox, CRM, workflows, AI, social and ads tracking set up and tested.",
    },
    {
      title: "One-month pilot",
      body: "30 days live in your business with no ArkFlow setup or subscription fee.",
    },
  ],
  notes: [
    "During the pilot, your business covers its own messaging, email and AI provider usage. You'll get a written estimate before anything goes live.",
    "After the pilot, you decide. Nothing is charged automatically.",
  ],
};

export const close = {
  eyebrow: "Would you be open to a short meeting?",
  title: "Let's explore how this can work for your business.",
  lead: "I'd be happy to walk you through how ArkFlow could support your team and operations, using examples from your own enquiries.",
  points: ["Quick and focused", "Tailored to your business", "No commitment"],
  pilot:
    "One-month pilot available: no ArkFlow setup or subscription fee for the pilot month.",
  signature: "Khairul Naim · Founder, ArkFlow Solutions",
};
