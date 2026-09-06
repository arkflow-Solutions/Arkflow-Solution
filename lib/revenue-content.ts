/**
 * ArkFlow homepage content — v3 (September 2026).
 *
 * SOURCE OF TRUTH: ArkFlow Master Context V2 (September 2026) plus the
 * founder resolutions of 6 September 2026.
 *
 * GOVERNANCE — read before editing:
 *  - The canonical Revenue Engine is TEN stages: Attract, Capture,
 *    Respond, Qualify, Book, Convert, Follow Up, Retain, Reactivate,
 *    Grow. The previous six-stage journey is superseded. Stages are
 *    never added, renamed, dropped or reordered here.
 *  - NO pricing, package names, guarantees or contract terms appear on
 *    any public surface. Respond/Operate/Scale, the 30-Day Response
 *    Guarantee and the six-month minimum are all superseded.
 *  - NO unapproved product names: LeadCapture Pro, BookingBot Pro,
 *    CRM Command Centre, ReviewPilot, InvoiceFlow, RenewalRadar.
 *  - Capabilities listed in `capabilities` are CURRENT only. AI voice
 *    (in development), invoice and payment automation (future) and
 *    marketing attribution (future) do not appear.
 *  - NO invented clients, results, statistics, percentages or counts.
 *    Illustrative material is labelled illustrative.
 *  - Public positioning stays industry-agnostic. Aesthetics is one
 *    vertical among several and never leads.
 *  - House style: no em dashes in visitor-facing copy.
 */

/* ============================================================ 01 HERO */

export const hero = {
  eyebrow: "Revenue Operating Company",
  title: "Your business is",
  titleAccent: "leaking revenue.",
  lead: "Leads go unanswered. Follow-ups get forgotten. Customers buy once and disappear. Opportunities fall through the gaps between the systems you already pay for.",
  leadTwo:
    "ArkFlow builds and operates the AI-powered revenue systems that close those gaps.",
  primaryCta: "Book a Discovery Call",
  secondaryCta: "See how ArkFlow works",
  /**
   * Scroll beats for the pinned 3D story. These are the argument of the
   * site, compressed to three lines. They are commitments about how the
   * system is designed, never claims about achieved performance.
   */
  beats: [
    {
      at: 0,
      kicker: "Every way in",
      line: "Enquiries arrive through a different door every time, and each door is watched by someone different.",
    },
    {
      at: 0.34,
      kicker: "Where it leaks",
      line: "Between those doors sit the handovers nobody owns. That is where the revenue quietly stops.",
    },
    {
      at: 0.66,
      kicker: "One connected system",
      line: "ArkFlow closes the gaps and keeps the journey moving, from first message to repeat customer.",
    },
  ],
} as const;

/* ==================================================== 02 REVENUE LEAK */

export type LeakStage = {
  stage: string;
  drip: string;
  head: string;
  what: string;
  signs: readonly string[];
  fix: string;
};

export const revenueLeak = {
  eyebrow: "Where revenue disappears",
  title: "The leak is not always obvious.",
  lead: "When revenue is soft, the instinct is to buy more attention. More ads, more leads, more staff, another location. But the enquiries already arriving have to survive a long journey before they become revenue, and every handover is somewhere they can quietly stop.",
  hint: "Select a stage to see what typically goes wrong there.",
  stages: [
    {
      stage: "Traffic",
      drip: "Arrives",
      head: "Attention arrives and nothing is watching it.",
      what: "Spend brings people to a website, a listing or a profile. What happens in the next few seconds decides whether any of it becomes a record you can act on.",
      signs: [
        "Visitors leave without a way to be contacted",
        "Enquiry paths differ by channel",
        "Nobody can say where enquiries actually came from",
      ],
      fix: "Every channel points into one capture path, so attention becomes a record instead of a statistic.",
    },
    {
      stage: "Lead",
      drip: "Captured",
      head: "An enquiry exists but lives in the wrong place.",
      what: "The enquiry lands in a personal phone, a shared inbox, a form notification or a dashboard nobody has open. It is technically captured and practically invisible.",
      signs: [
        "Enquiries sit in an app only one person checks",
        "No single list of who is waiting",
        "Details get retyped between systems",
      ],
      fix: "One record per person, holding every channel, every message and the next action.",
    },
    {
      stage: "Response",
      drip: "Delayed",
      head: "The reply comes after the decision was made.",
      what: "Interest has a short half-life. An enquiry sent at 9 PM and answered at 11 AM is competing against whoever answered at 9:01 PM.",
      signs: [
        "Nights, weekends and busy hours go uncovered",
        "Response depends on who is on shift",
        "The same questions answered from scratch",
      ],
      fix: "An immediate, accurate first response on the channel the person used, at any hour.",
    },
    {
      stage: "Qualification",
      drip: "Skipped",
      head: "Time is spent before anyone knows if it fits.",
      what: "Without a consistent set of questions, the team either interrogates people or discovers halfway through a consultation that it was never the right service.",
      signs: [
        "Consultations that were never going to convert",
        "Key information missing at the appointment",
        "Every staff member asks differently",
      ],
      fix: "The same qualifying questions every time, collected in conversation and attached to the record.",
    },
    {
      stage: "Booking",
      drip: "Abandoned",
      head: "Interest exists but never becomes an appointment.",
      what: "The gap between wanting to book and actually booking is where a great deal of revenue quietly stops. Availability is not clear, or booking needs another message tomorrow.",
      signs: [
        "Interested enquiries never book",
        "Booking requires a call in office hours",
        "Availability lives in someone's head",
      ],
      fix: "Live availability offered inside the conversation, confirmed into one calendar.",
    },
    {
      stage: "Attendance",
      drip: "No-show",
      head: "The slot is held. Nobody arrives.",
      what: "A no-show costs the appointment, the time held for it, and the customer who could have taken the slot instead.",
      signs: [
        "Reminders sent manually, or not at all",
        "No process when someone does not arrive",
        "Cancellations never get refilled",
      ],
      fix: "Confirmation, reminders and a recovery path that turns a change of plan into a new booking.",
    },
    {
      stage: "Purchase",
      drip: "Stalls",
      head: "The quote was sent. Then nothing.",
      what: "A proposal or treatment plan goes out and follow-up depends on someone remembering, on a day when something more urgent happened.",
      signs: [
        "Quotes with no recorded outcome",
        "Follow-up depends on individual diligence",
        "Nobody knows what is still open",
      ],
      fix: "Every open opportunity carries a scheduled next action instead of a hope.",
    },
    {
      stage: "Follow-up",
      drip: "Forgotten",
      head: "After the service, the system goes quiet.",
      what: "The moment right after a good experience is the most valuable one in the whole journey, and it is the one most often left unattended.",
      signs: [
        "No structured post-service contact",
        "Reviews requested inconsistently",
        "Rebooking depends entirely on the customer",
      ],
      fix: "A defined sequence after the appointment: check in, ask once, offer the next step.",
    },
    {
      stage: "Repeat",
      drip: "Lost",
      head: "One purchase, then silence.",
      what: "A customer who has already paid you is a fundamentally different asset from a cold lead. Most businesses treat both the same way, which is to say they wait.",
      signs: [
        "No rebooking process",
        "Repeat business is accidental",
        "Nobody notices when a regular stops coming",
      ],
      fix: "Retention runs as a workflow rather than as an intention.",
    },
    {
      stage: "Retention",
      drip: "Drifts",
      head: "Regulars go quiet and nobody notices.",
      what: "There is rarely a moment where a customer decides to leave. They just stop, and without a signal nobody sees it happen.",
      signs: [
        "No view of who is going quiet",
        "No trigger when a cycle is missed",
        "Attrition only shows up much later",
      ],
      fix: "Rules that surface customers who are slipping, while there is still a relationship to save.",
    },
    {
      stage: "Reactivation",
      drip: "Dormant",
      head: "The database is full of people who already chose you.",
      what: "Years of past customers sit in a system nobody opens. They know the business, they have paid before, and no one has contacted them since.",
      signs: [
        "No dormant segment defined",
        "Past customers never contacted",
        "The database is a record, not an asset",
      ],
      fix: "Dormant customers segmented and re-engaged with a message the business writes and approves.",
    },
  ] satisfies readonly LeakStage[],
} as const;

/* ================================================= 03 FRAGMENTATION */

export const fragmentation = {
  eyebrow: "The fragmentation problem",
  title: "Your customers are connected. Your systems are not.",
  lead: "Nobody follows one path any more. One enquiry starts on a search, the next on a social message, the next on a call after closing. Each one lands somewhere different, owned by someone different, checked at a different time.",
  doors: {
    heading: "How enquiries actually arrive",
    sub: "Different places. Different owners. Different response times.",
    items: [
      "Website",
      "WhatsApp",
      "Instagram",
      "Facebook",
      "Phone",
      "Email",
      "SMS",
      "Google",
    ],
    note: "One customer. Many front doors. No single record of what happened.",
  },
  cost: {
    heading: "What that costs, operationally",
    sub: "Not dramatic failures. Small, repeated, invisible ones.",
    items: [
      "Enquiries seen late",
      "Questions answered twice",
      "Follow-up depends on memory",
      "Bookings in two calendars",
      "History split across apps",
      "No view of what happened",
      "Admin lands on senior staff",
      "Past customers never contacted",
    ],
    note: "The problem is rarely a shortage of leads. It is that the journey breaks between the tools.",
  },
} as const;

/* =============================================== 04 WHAT ARKFLOW IS */

export const whatArkflow = {
  eyebrow: "What ArkFlow is",
  title: "One connected revenue operating layer.",
  lead: "ArkFlow is a Revenue Operating Company. We do not sell a tool and leave you to configure it. We design the customer journey, build the system that runs it, and keep operating it as the business changes.",
  layers: [
    {
      label: "Software",
      body: "The infrastructure holding customer records, conversations, pipelines and calendars in one place.",
    },
    {
      label: "AI",
      body: "Structured handling of repetitive conversations: responding, answering common questions, qualifying, moving toward a booking.",
    },
    {
      label: "Automation",
      body: "The follow-up, reminders and internal workflows that would otherwise depend on someone remembering.",
    },
    {
      label: "Implementation",
      body: "Understanding how your business actually operates, then configuring the system around it rather than around a template.",
    },
    {
      label: "Operations",
      body: "Ongoing responsibility for the system. It gets reviewed, adjusted and improved instead of decaying quietly.",
    },
  ],
  close: "Capture more. Convert more. Retain more.",
} as const;

/* ============================================== 05 REVENUE ENGINE */

export type EngineStage = {
  key: string;
  head: string;
  body: string;
  leak: string;
  flow: readonly { title: string; body: string }[];
};

export const revenueEngine = {
  eyebrow: "The ArkFlow Revenue Engine",
  title: "Most businesses run parts of this. ArkFlow connects it.",
  lead: "Ten stages between a stranger noticing you and a customer coming back. Most businesses have a tool for two or three of them. The revenue is lost in the handovers.",
  hint: "Use the arrow keys to move through the engine.",
  note: "Not every business needs every stage. The journey is designed around how yours actually runs.",
  stages: [
    {
      key: "Attract",
      head: "Be findable, and make the front door obvious.",
      body: "ArkFlow does not run your advertising and does not generate demand. It makes sure the attention you already earn has somewhere to land, and that the path from interest to enquiry is short.",
      leak: "Attention arrives and there is no clear, immediate way to become an enquiry.",
      flow: [
        { title: "Channel", body: "Someone finds the business through search, social, referral or a campaign" },
        { title: "Entry point", body: "A route to enquire that works on the channel they are already using" },
        { title: "Handover", body: "The enquiry becomes a record instead of a notification" },
      ],
    },
    {
      key: "Capture",
      head: "Every enquiry becomes a record, whatever door it came through.",
      body: "Forms, messages, calls and social enquiries stop living in separate places. One person becomes one record, with their history attached.",
      leak: "An enquiry lands somewhere only one person checks, and nobody else knows it exists.",
      flow: [
        { title: "Enquiry received", body: "Channel, message and contact details captured together" },
        { title: "Record created", body: "Matched to an existing customer, or created new" },
        { title: "Assigned", body: "Given an owner and a next action from the moment it arrives" },
      ],
    },
    {
      key: "Respond",
      head: "An answer in seconds, not when someone next checks.",
      body: "The first response is where most of the loss happens. ArkFlow makes it immediate and accurate, in the voice the business has approved, on the channel the person used.",
      leak: "The reply arrives after the person has already contacted someone else.",
      flow: [
        { title: "Instant acknowledgement", body: "The enquiry is answered, not queued" },
        { title: "Question handled", body: "Common questions answered from approved information" },
        { title: "Context kept", body: "Everything attaches to the same customer record" },
      ],
    },
    {
      key: "Qualify",
      head: "Ask the right questions before anyone spends time.",
      body: "The same information, collected the same way, every time. The team knows what they are walking into, and nobody sits through a consultation that was never a fit.",
      leak: "Time is spent on enquiries that were never appropriate, and the appointment starts with information missing.",
      flow: [
        { title: "Structured questions", body: "Consistent, conversational, configured per business" },
        { title: "Suitability", body: "Routed to the right service, person or location" },
        { title: "Escalation", body: "Anything sensitive or complex goes to a human immediately" },
      ],
    },
    {
      key: "Book",
      head: "Interest becomes an appointment inside the conversation.",
      body: "Live availability, offered where the person already is, confirmed into one calendar regardless of where the booking started.",
      leak: "Someone wants to book, and booking requires another message, another call or office hours.",
      flow: [
        { title: "Availability checked", body: "Against the real calendar, not a guess" },
        { title: "Slot offered", body: "Right service, right duration, right resource" },
        { title: "Confirmed", body: "Calendar updated, team notified, record updated" },
      ],
    },
    {
      key: "Convert",
      head: "Protect the appointment you have already won.",
      body: "Confirmation, reminders and a recovery path. A change of plan becomes a new appointment instead of a lost one.",
      leak: "The slot is held, the customer does not arrive, and nothing happens next.",
      flow: [
        { title: "Confirmation", body: "Sent the moment the booking is made" },
        { title: "Reminders", body: "Ahead of the appointment, on the right channel" },
        { title: "Recovery", body: "A no-show enters a defined follow-up, not a gap" },
      ],
    },
    {
      key: "Follow Up",
      head: "Nothing depends on someone remembering.",
      body: "Open quotes, unanswered messages, post-appointment check-ins. Every open opportunity carries a scheduled next action.",
      leak: "A lead disappears because a human employee had a busy week.",
      flow: [
        { title: "Next action set", body: "Every open record has one, with a date" },
        { title: "Sequence runs", body: "Follow-up continues until there is an outcome" },
        { title: "Outcome recorded", body: "Won, lost or paused, never simply forgotten" },
      ],
    },
    {
      key: "Retain",
      head: "The sale is not the end.",
      body: "What happens after the service is where repeat revenue is made or lost. Check-ins, review requests, rebooking and recall run as workflows rather than intentions.",
      leak: "A first-time customer has a good experience and is never contacted again.",
      flow: [
        { title: "Post-service contact", body: "A check-in at the point it is actually useful" },
        { title: "Review request", body: "Asked once, at the right moment" },
        { title: "Rebooking", body: "The next visit offered before the customer drifts" },
      ],
    },
    {
      key: "Reactivate",
      head: "Bring back the customers you already earned.",
      body: "Dormant customers are segmented by rules the business sets, and re-engaged with messages the business writes and approves.",
      leak: "Years of past customers sit in a database nobody opens.",
      flow: [
        { title: "Segment", body: "Who has gone quiet, and for how long" },
        { title: "Re-engage", body: "A personalised, approved message on their channel" },
        { title: "Return", body: "Straight back into the same booking flow and record" },
      ],
    },
    {
      key: "Grow",
      head: "See what is actually happening, and adjust.",
      body: "With the journey connected end to end, the business can finally see where enquiries stop, and the system gets adjusted rather than left to decay.",
      leak: "Decisions get made on impressions because nobody can see the journey.",
      flow: [
        { title: "Visibility", body: "Where enquiries enter, stall and convert" },
        { title: "Review", body: "The system examined against how the business now runs" },
        { title: "Adjust", body: "Workflows change as the business changes" },
      ],
    },
  ] satisfies readonly EngineStage[],
} as const;

/* ============================================ 06 AI CONVERSATION */

export type ChatBeat =
  | { kind: "msg"; from: "them" | "ai" | "human"; text: string; wait: number }
  | { kind: "sys"; text: string; wait: number; human?: boolean };

export const aiDemo = {
  eyebrow: "AI conversation, demonstrated",
  title: "This is not magic. It is structured work, done consistently.",
  lead: "An enquiry arrives outside business hours. Watch what the system does, and watch exactly where it stops and hands over to a person.",
  note: "AI handles the repetition. Humans handle the relationship. The system answers what it has been configured to answer, collects what the business needs to know, and escalates the moment a conversation needs judgement.",
} as const;

/**
 * The demonstration script.
 *
 * Typed explicitly rather than declared `as const`: a const assertion
 * produces a union in which the beats that omit `human` have no such
 * key at all, and reading `beat.human` then fails to compile. The
 * annotation gives every `sys` beat the optional property.
 */
export const aiDemoScript: readonly ChatBeat[] = [
  { kind: "msg", from: "them", wait: 900, text: "Hi, is anyone there? I saw your page and wanted to ask about availability." },
  { kind: "sys", wait: 260, text: "Enquiry received · messaging channel · 21:41" },
  { kind: "sys", wait: 520, text: "No existing record matched · new record created" },
  { kind: "msg", from: "ai", wait: 900, text: "Hi Jamie, thanks for getting in touch. Yes, we have availability this week. Can I ask what you are looking to book, so I point you to the right person?" },
  { kind: "msg", from: "them", wait: 1600, text: "Not totally sure yet. It is my first time. I have a few questions about what is involved and how long it takes." },
  { kind: "sys", wait: 320, text: "Intent classified · information request, pre-booking" },
  { kind: "msg", from: "ai", wait: 1300, text: "Completely fine, and a good place to start. A first appointment runs about 45 minutes and is mostly a consultation. We talk through what you are after before anything is scheduled." },
  { kind: "msg", from: "ai", wait: 900, text: "Two quick things so I can check the right diary: weekday or weekend, and have you been to us before?" },
  { kind: "msg", from: "them", wait: 1700, text: "Weekday works. First time. Also, I have a health condition. Does that rule me out?" },
  { kind: "sys", wait: 320, text: "Qualifying data captured · new customer · weekday preference" },
  { kind: "sys", wait: 460, human: true, text: "Escalation rule triggered · health question · outside AI scope" },
  { kind: "sys", wait: 460, human: true, text: "Assigned to duty specialist · notified · record flagged" },
  { kind: "msg", from: "ai", wait: 1200, text: "That is a question I will pass to a member of the team rather than answer myself. They will come back to you on this thread. In the meantime, shall I hold a weekday slot so it is not gone by then?" },
  { kind: "msg", from: "them", wait: 1500, text: "Yes please, Thursday morning if you have it." },
  { kind: "sys", wait: 320, text: "Availability checked · Thursday 10:30 offered" },
  { kind: "msg", from: "ai", wait: 1100, text: "Thursday 10:30 is open. I have held it for you and sent a confirmation. If the team's answer changes anything, we will move it with no fuss." },
  { kind: "sys", wait: 320, text: "Appointment held · calendar updated · confirmation sent" },
  { kind: "sys", wait: 320, text: "Reminders scheduled · 24h and morning of" },
  { kind: "msg", from: "human", wait: 1400, text: "Hi Jamie, Priya here from the team. Happy to talk through your question properly before Thursday. Is a quick call this afternoon okay?" },
  { kind: "sys", wait: 320, human: true, text: "Human took over conversation · 21:47" },
  
];

/* =========================================== 07 CUSTOMER JOURNEY */

export const customerJourney = {
  eyebrow: "One customer, end to end",
  title: "The customer never feels the handovers.",
  lead: "One person, one continuous record. The channel they arrived on stops mattering after the first message.",
  note: "Illustrative journey. Timings and stages are configured per business. This is the shape of a connected journey, not a promise about any specific outcome.",
  steps: [
    { time: "9:41 PM", title: "Discovered", body: "Jamie finds the business through a social post, long after closing time.", by: "system" },
    { time: "9:41 PM", title: "Enquired", body: "One message, on the channel she was already using.", by: "system" },
    { time: "9:41 PM", title: "Answered", body: "A reply in seconds, in the approved voice, attached to a new record.", by: "system" },
    { time: "9:44 PM", title: "Qualified", body: "The right questions asked once. First visit, weekday preference, service identified.", by: "system" },
    { time: "9:45 PM", title: "Escalated", body: "A health question falls outside what the AI answers. It stops and hands to a specialist.", by: "human" },
    { time: "9:46 PM", title: "Booked", body: "Live availability offered in the same conversation. Thursday 10:30 held and confirmed.", by: "system" },
    { time: "9:47 PM", title: "Taken over", body: "A senior team member picks up the thread with full context. She never repeats herself.", by: "human" },
    { time: "Wednesday", title: "Reminded", body: "A reminder ahead of the appointment, on the same channel.", by: "system" },
    { time: "Thursday", title: "Attended", body: "The team sees the whole history before she walks in.", by: "human" },
    { time: "Thursday + 2", title: "Followed up", body: "A check-in, and a single review request at the point it is actually useful.", by: "system" },
    { time: "Later", title: "Recalled", body: "When her interval is due, she is offered the next appointment before she drifts.", by: "system" },
    { time: "If quiet", title: "Reactivated", body: "If she goes quiet, she surfaces in a dormant segment rather than disappearing.", by: "system" },
  ],
} as const;

/* ================================================ 08 BEFORE/AFTER */

export const beforeAfter = {
  eyebrow: "The shift",
  title: "From scattered tools to one revenue system.",
  lead: "Nothing is added to your team's workload. Work is taken off it.",
  before: {
    label: "Before ArkFlow",
    items: [
      "Instagram DMs on a personal phone",
      "WhatsApp on a shared handset",
      "Calls missed when the room is busy",
      "Website enquiries read at 6 PM",
      "Bookings across two calendars",
      "Customer notes in a spreadsheet",
      "Follow-ups on a sticky note",
      "Quotes with no recorded outcome",
      "Past customers never contacted",
      "Reporting is a guess",
    ],
    caption:
      "Nothing here is broken exactly. It is simply nobody's job, all of the time, and it depends on people remembering on their worst day.",
  },
  after: {
    label: "With ArkFlow",
    items: [
      "Every channel in one workspace",
      "One record with the full history",
      "Answered in seconds, any hour",
      "One calendar, whatever the source",
      "Confirmations and reminders automatic",
      "No-shows enter a recovery flow",
      "Every open opportunity has a next action",
      "Post-service follow-up runs itself",
      "Dormant customers surfaced by rule",
      "The journey is visible, not assumed",
    ],
    caption:
      "Same team. Same customers. The difference is that the journey no longer depends on anyone remembering.",
  },
} as const;

/* ================================================ 09 CAPABILITIES */

export const capabilities = {
  eyebrow: "What ArkFlow brings together",
  title: "Components are easy to buy. Connection is the hard part.",
  lead: "These are the areas an ArkFlow system is built around. Which of them your business needs, and how deep each one goes, is decided by how you actually operate.",
  note: "Scope is defined per implementation. We do not claim capability that has not been configured and verified for your business.",
  /** CURRENT capability areas only. Nothing in development or future. */
  items: [
    { title: "Lead capture", body: "Enquiries from your website, forms, messaging, social and campaign channels arrive as one record instead of ten notifications.", icon: "capture" },
    { title: "AI conversation", body: "Immediate, accurate responses to routine enquiries in the voice your business approves, with a defined point where a human takes over.", icon: "conversation" },
    { title: "Qualification", body: "The same questions asked the same way, collected in conversation and attached to the customer record.", icon: "qualify" },
    { title: "Booking", body: "Appointment conversations, availability, confirmation and rescheduling, resolving into a single calendar.", icon: "book" },
    { title: "CRM and customer data", body: "Profiles, pipelines, conversation history, lifecycle stage and next action, held in one place the whole team can see.", icon: "crm" },
    { title: "Follow-up", body: "Sequences for new enquiries, unanswered messages, open quotes, appointments and post-service contact.", icon: "followup" },
    { title: "Retention", body: "Rebooking, check-ins, review requests and recall workflows that run after the first transaction rather than stopping at it.", icon: "retain" },
    { title: "Reactivation", body: "Dormant customers segmented by your rules and re-engaged with messages your business writes and approves.", icon: "reactivate" },
    { title: "Operational automation", body: "Internal notifications, task creation, record updates and the repetitive admin that currently lands on people.", icon: "ops" },
    { title: "Website build", body: "A website designed as the front door of the revenue system rather than a brochure that sits next to it.", icon: "web" },
  ],
} as const;

/* =================================================== 10 HUMAN + AI */

export const humanAi = {
  eyebrow: "Humans and AI",
  title: "AI does not replace the team. It gives the team their time back.",
  lead: "The division is not about what AI is technically capable of. It is about where a person actually changes the outcome.",
  close:
    "A system that answers instantly at 9:41 PM is not replacing anyone. Nobody was going to answer at 9:41 PM.",
  ai: {
    tag: "Handled by the system",
    title: "Repetition, at any hour",
    items: [
      "First response to an enquiry",
      "Frequently asked questions",
      "Collecting qualifying information",
      "Appointment conversations and reminders",
      "Routine follow-up sequences",
      "Moving information between systems",
      "Internal notifications and task creation",
    ],
  },
  human: {
    tag: "Handled by your people",
    title: "Judgement, and the relationship",
    items: [
      "Complex or sensitive conversations",
      "High-value and long-standing customers",
      "Exceptions the system should not decide",
      "Commercial and professional judgement",
      "The actual service delivery",
      "Anything requiring discretion or care",
      "The decisions that shape the business",
    ],
  },
} as const;

/* ============================================ 11/12 RETAIN + REACTIVATE */

export const retention = {
  eyebrow: "Retention",
  title: "The sale is not the end.",
  lead: "A customer who already knows you, has paid you and had a good experience is a fundamentally different asset from a cold lead. Most systems stop paying attention at exactly the point that asset is created.",
  close:
    "Retention is not a campaign. It is whether anything happens after the transaction, reliably, without depending on someone remembering.",
  arc: [
    { title: "Customer", body: "They chose you once. Right now that is all it means." },
    { title: "Returning customer", body: "A second visit is where a transaction starts becoming a relationship." },
    { title: "Long-term customer", body: "Predictable, lower-cost revenue that no longer depends on winning attention." },
    { title: "Growth", body: "Referrals, reviews and repeat value compounding from customers you already have." },
  ],
} as const;

export const reactivation = {
  eyebrow: "Reactivation",
  title: "Your old customers are not old leads.",
  lead: "They are people who already chose you once. Most businesses are sitting on a database of them and have no process for ever contacting them again.",
  note: "Conceptual illustration of a reactivation workflow. ArkFlow makes no claim about how many dormant customers any business will recover. That depends entirely on the database, the offer and the business.",
  legend: [
    { label: "Inactive record", tone: "idle" },
    { label: "Matches a re-engagement rule", tone: "warm" },
    { label: "Entered a follow-up workflow", tone: "wake" },
  ],
  workflow: [
    { title: "Segment", body: "Identify who has gone quiet, by the rules the business sets." },
    { title: "Reach out", body: "A personalised message, written and approved by the business." },
    { title: "Converse", body: "Reply, answer questions, move toward a booking where appropriate." },
    { title: "Return", body: "Back into the same calendar and the same customer record." },
  ],
} as const;

/* ============================================== 13 MULTI-LOCATION */

export const multiLocation = {
  eyebrow: "Growing businesses",
  title: "More locations should not mean more chaos.",
  lead: "Each site has its own customers, staff, calendar and conversations. Growth usually means each one also invents its own way of working, and the owner loses the ability to see what is actually happening.",
  leadTwo:
    "One system, configured per location, gives consistency at the front and a connected view at the back.",
  note: "Structure is designed per business. We do not make claims about technical limits or volumes that have not been verified for your setup.",
  caption: "One connected operational view",
} as const;

/* ================================================== 14 INDUSTRIES */

export const industries = {
  eyebrow: "Industries",
  title: "One revenue architecture. Many business models.",
  lead: "The engine does not change. The workflows inside it do. Choose a business type to see how the same ten stages get configured differently.",
  fixed:
    "The ten stages do not change: Attract, Capture, Respond, Qualify, Book, Convert, Follow Up, Retain, Reactivate, Grow. What changes is what happens inside them.",
  items: [
    {
      key: "Healthcare and medical",
      lead: "Appointment-driven, high trust, heavily regulated. The system handles the routine and stops firmly short of clinical judgement.",
      rows: [
        { stage: "Capture", body: "Enquiries from search, website, phone and messaging into one patient record" },
        { stage: "Respond", body: "Practical questions answered, anything clinical escalates immediately" },
        { stage: "Book", body: "Right practitioner, right duration, into one clinical diary" },
        { stage: "Retain", body: "Recall intervals and follow-up that keep continuity of care" },
      ],
    },
    {
      key: "Fitness and wellness",
      lead: "High volume, high churn, and revenue that lives almost entirely in whether people come back.",
      rows: [
        { stage: "Capture", body: "Trial enquiries and class interest captured from every channel" },
        { stage: "Convert", body: "Reminders and recovery that protect first sessions" },
        { stage: "Retain", body: "Attendance patterns surface members going quiet" },
        { stage: "Reactivate", body: "Lapsed members re-engaged before they are gone for good" },
      ],
    },
    {
      key: "Automotive",
      lead: "Service intervals are predictable, which makes missed recall one of the most measurable leaks there is.",
      rows: [
        { stage: "Capture", body: "Enquiries and quote requests into one customer and vehicle record" },
        { stage: "Qualify", body: "Vehicle, service type and urgency established up front" },
        { stage: "Book", body: "Workshop capacity offered inside the conversation" },
        { stage: "Retain", body: "Service intervals and reminders triggered by rule, not memory" },
      ],
    },
    {
      key: "Professional services",
      lead: "Long consideration, high value, and enquiries that die quietly between the first email and the second.",
      rows: [
        { stage: "Respond", body: "Immediate acknowledgement while the enquiry is still warm" },
        { stage: "Qualify", body: "Scope and fit established before anyone's time is committed" },
        { stage: "Follow Up", body: "Open proposals carry a scheduled next action" },
        { stage: "Grow", body: "Visibility over what stalled, and where" },
      ],
    },
    {
      key: "Home services",
      lead: "Job-led, quote-heavy, and usually run from a phone between site visits.",
      rows: [
        { stage: "Capture", body: "Enquiries from search, calls and forms in one place" },
        { stage: "Respond", body: "Answered from the field, or automatically while on a job" },
        { stage: "Book", body: "Site visits and jobs scheduled without a second diary" },
        { stage: "Retain", body: "Maintenance intervals and repeat work prompted automatically" },
      ],
    },
    {
      key: "Aesthetics and beauty",
      lead: "Repeat visits, treatment cycles and after-hours enquiries, with a hard line where anything clinical begins.",
      rows: [
        { stage: "Respond", body: "After-hours enquiries answered, medical questions escalate" },
        { stage: "Book", body: "Right treatment, right practitioner, right room" },
        { stage: "Retain", body: "Treatment cycles and rebooking prompted at the right interval" },
        { stage: "Reactivate", body: "Past clients segmented and re-engaged with approved messaging" },
      ],
    },
    {
      key: "Pet services",
      lead: "Recurring, seasonal and relationship-led. Most of the value is in the customers you already have.",
      rows: [
        { stage: "Capture", body: "Booking enquiries across every channel into one record" },
        { stage: "Book", body: "Service, duration and handler matched correctly" },
        { stage: "Retain", body: "Recurring appointments prompted on a natural cycle" },
        { stage: "Reactivate", body: "Owners who stopped coming surfaced by rule" },
      ],
    },
    {
      key: "Education and training",
      lead: "Enquiry-heavy at intake, then almost silent, which is exactly where the follow-up leak sits.",
      rows: [
        { stage: "Capture", body: "Course enquiries from every channel into one record" },
        { stage: "Qualify", body: "Suitability, level and intake established early" },
        { stage: "Follow Up", body: "Sequences that run across a long decision window" },
        { stage: "Retain", body: "Progression to the next course offered before interest cools" },
      ],
    },
  ],
} as const;

/* ================================================== 15 PRODUCT UI */

export const productUi = {
  eyebrow: "The system",
  title: "There is real infrastructure behind this.",
  lead: "Every enquiry becomes a record. Every conversation stays attached to it. Every stage of the journey is visible instead of assumed.",
  note: "Representative interface, built to show the structure of an ArkFlow system rather than any specific client's data. Live product screenshots replace this view once supplied.",
  frameLabel: "arkflow · revenue pipeline",
  /**
   * PLACEHOLDER DATA. Illustrative names and states only. There is no
   * client data here and none may be added without written consent.
   */
  columns: [
    {
      heading: "New enquiry",
      records: [
        { name: "J. Tan", meta: "Asked about availability · 2 min ago", channel: "WhatsApp" },
        { name: "R. Kaur", meta: "Form submission · 14 min ago", channel: "Website" },
        { name: "Unknown caller", meta: "Missed call · returned by system", channel: "Phone" },
      ],
    },
    {
      heading: "Qualified",
      records: [
        { name: "M. Lim", meta: "First visit · weekday preference", channel: "Instagram" },
        { name: "A. Osei", meta: "Returning customer · service identified", channel: "Facebook" },
      ],
    },
    {
      heading: "Booked",
      records: [
        { name: "J. Tan", meta: "Thu 10:30 · confirmed · reminders set", channel: "WhatsApp" },
        { name: "P. Silva", meta: "Fri 15:00 · confirmed", channel: "Website" },
        { name: "D. Wong", meta: "Mon 09:15 · rescheduled once", channel: "Phone" },
      ],
    },
    {
      heading: "Follow-up due",
      records: [
        { name: "K. Ahmad", meta: "Post-appointment check-in scheduled", channel: "SMS" },
        { name: "S. Ng", meta: "Quote open · next action Thursday", channel: "Email" },
        { name: "L. Chen", meta: "Dormant 9 months · in re-engagement", channel: "Email" },
      ],
    },
  ],
} as const;

/* ================================================= 16 WHY ARKFLOW */

export const whyArkflow = {
  eyebrow: "Why ArkFlow",
  title: "Software is the easy part. Operating it is the difference.",
  lead: "Plenty of companies will sell you automation. Fewer will take responsibility for whether it still works in six months.",
  rows: [
    { title: "Revenue first", body: "Automation is only worth doing when it changes the commercial outcome. The question is never what could be automated. It is where revenue is being lost." },
    { title: "The whole journey", body: "Most providers stop at lead capture. The stages after the sale, follow-up, retention and reactivation, are where the compounding value sits and where almost nobody is operating." },
    { title: "Built, not handed over", body: "You are not given a login and a training video. The journey is designed around how your business actually runs, then configured, tested and put into service." },
    { title: "Operated, not abandoned", body: "Systems decay. Staff change, services change, the business changes. ArkFlow stays responsible for the system rather than treating go-live as the finish line." },
    { title: "Honest about scope", body: "AI does the repetition. People do the judgement. Anything needing discretion escalates by design, and we will not claim capability that has not been configured for you." },
    { title: "Infrastructure is not the product", body: "ArkFlow builds on established infrastructure rather than reinventing it. The value is in the design, the implementation and the operation around it." },
  ],
} as const;

/* ============================================ 17/18 AUDIT + CLOSE */

export const auditCta = {
  eyebrow: "The next step",
  title: "Where is your business leaking revenue?",
  lead: "The Revenue Leak Audit is a structured look at your customer journey. What happens to an enquiry from the moment it arrives to the moment a customer comes back, and where that journey currently depends on someone remembering.",
  note: "It is a diagnosis, not a contact form. You get a view of where the gaps are, whether or not you work with us.",
  areasLabel: "Areas the audit looks at",
  areas: [
    "Lead response",
    "Lead handling",
    "Qualification",
    "Booking",
    "Attendance",
    "Follow-up",
    "Retention",
    "Reactivation",
    "Operational workload",
    "Customer experience",
  ],
  cta: "Book a Discovery Call",
} as const;

export const finalCta = {
  title:
    "Your business already has the customers. The question is how many are falling through the gaps.",
  lead: "Build the system that keeps opportunities moving.",
  primary: "Book a Discovery Call",
  secondary: "Explore how ArkFlow works",
} as const;
