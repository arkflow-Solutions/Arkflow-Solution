/**
 * SCENE COPY — the visual-first homepage (Phase 3E).
 *
 * GOVERNING RULE, and the reason this file is short:
 *
 *   The visual carries the meaning. Text clarifies what is already
 *   visible. If a scene needs a paragraph to be understood, the scene
 *   is wrong — fix the scene, not the copy.
 *
 * The previous homepage rendered ~2,945 words and held ~4,374 authored,
 * most of it explaining concepts a business owner has no reason to know
 * (revenue operations, pipelines, qualification, integrations). This
 * file is the whole scene corpus and is deliberately a fraction of that.
 * Every headline here is meant to be readable in under two seconds.
 *
 * WHAT MAY NOT APPEAR HERE — every one of these has bitten this project
 * or is explicitly forbidden by governance:
 *  · No metric, rate, percentage, count, or time saved. Not one.
 *  · No guaranteed outcome. ArkFlow sends a reminder; it cannot deliver
 *    an attendance, a sale or a returning customer.
 *  · No capability above its classification (verify.mjs check 13).
 *  · No superseded package, guarantee or product name (check 11).
 *  · No invented client, testimonial or result.
 *
 * Dialogue is NOT written here. Scene 02 reuses beats from the approved
 * `aiDemoScript` in lib/revenue-content.ts verbatim, because inventing
 * customer dialogue is inventing a product demonstration.
 */

/* ==================================================== 01 · THE OPENING */

export const sceneOpening = {
  /**
   * The eyebrow no longer says "Revenue Operating Company".
   *
   * Not because the positioning changed — it has not — but because it
   * was the first three words on the site and it is the phrase a
   * business owner is least equipped to decode. The positioning now
   * lands in the closing scene, once they know what the company does.
   * See sceneClose.positioning.
   */
  title: "Your business is",
  titleAccent: "leaking revenue.",
  /** One line. The visual is doing the rest. */
  lead: "Opportunities arrive. Some of them quietly never go anywhere.",
  primaryCta: "Book a Discovery Call",
  secondaryCta: "See where",
  /** Labels on the entry points. Recognisable objects, not channels. */
  doors: ["Website", "Messaging", "Phone", "Social"],
  /** Scroll beats for the pinned story. Plain English, no jargon. */
  beats: [
    { at: 0, line: "Enquiries arrive from everywhere." },
    { at: 0.34, line: "Between the steps, nobody is watching." },
    { at: 0.66, line: "That is where they stop." },
  ],
} as const;

/* ======================================= 02 · THE UNANSWERED ENQUIRY */

export const sceneUnanswered = {
  title: "Nobody answered.",
  lead: "An enquiry at 9:41 PM is competing with whoever replies first.",
  problemLabel: "What usually happens",
  resolvedLabel: "With ArkFlow",
  /** Shown against the dead thread as the clock runs. */
  problemNote: "Read the next morning. She had already booked elsewhere.",
  resolvedNote: "Answered, understood, and moving — on the channel she used.",
  /** Clock readouts for the two states. Time, not duration claims. */
  problemClock: ["9:41 PM", "11:20 PM", "2:14 AM", "Next morning"],
  resolvedClock: ["9:41 PM", "9:41 PM", "9:42 PM", "9:44 PM"],
} as const;

/* ============================================== 03 · THE DAYS PASS */

export const sceneDays = {
  title: "“I’ll follow up later.”",
  lead: "Later is not a system. It is a note that stays where it was written.",
  note: "follow up Tuesday",
  problemLabel: "The week nothing happens",
  resolvedLabel: "The week the system runs",
  /**
   * The resolved chain ENDS at a confirmed appointment on the calendar.
   * It does not show anyone arriving, because attendance is not
   * something ArkFlow can deliver and implying otherwise would be a
   * claim we cannot support. This is the highest claim-risk frame on
   * the homepage — read the comment in components/home/scenes/days.tsx
   * before changing a word of it.
   */
  problemChain: ["Interested", "Note written", "Nothing", "Gone quiet"],
  resolvedChain: ["Interested", "Next action set", "Booked", "Confirmed"],
  resolvedNote: "The appointment is confirmed and live on the calendar.",
} as const;

/* ================================== 04 · THE CUSTOMER WHO DISAPPEARS */

export const sceneDisappearing = {
  title: "They bought once. Then nothing.",
  lead: "A customer who already chose you is not a cold lead. Most businesses have no way of ever contacting them again.",
  /** The opening frame: one record, cooling. */
  lifecycle: [
    { label: "New customer", tone: "on" },
    { label: "Bought", tone: "on" },
    { label: "Months pass", tone: "fade" },
    { label: "Inactive", tone: "off" },
  ],
} as const;

/* ==================================================== 05 · THE DESK */

export const sceneDesk = {
  title: "Someone is doing this by hand.",
  lead: "Not because it is difficult. Because nothing is connected, so a person has to be the connection.",
  /**
   * From the approved `secondAdmin_RETIRED` block in lib/home-content.ts,
   * recovered rather than rewritten.
   *
   * THE INVOICE LINE IS DELIBERATELY OMITTED. The original list included
   * chasing a late invoice; invoicing and payment reminders are not in
   * the ten current capability areas in revenue-content.ts, and
   * verify.mjs check 13 blocks the phrase outright. Founder decision,
   * 7 September 2026: do not reinstate it here.
   */
  handled: [
    "Answering the same question for the fiftieth time",
    "Checking what’s free and sending the booking link",
    "Sending confirmations and reminders",
    "Following up on a quote nobody replied to",
    "Copying the same details between systems",
  ],
  human: [
    "The customer in front of them",
    "The conversation that needs judgement",
    "The complaint that needs care",
    "The service itself",
  ],
  handledLabel: "Repetition",
  humanLabel: "Your people",
  /** No hours, no counts, no productivity claim. Ever. */
  close: "Let your people handle people.",
} as const;

/* ============================================ 06 · THE TRANSFORMATION */

export const sceneTransformation = {
  title: "Same business.",
  titleAccent: "Nothing falls through.",
  lead: "These were never four separate problems. They were one broken journey.",
  problemLabel: "Where it stops",
  resolvedLabel: "One connected journey",
  /** Thumbnails of what the visitor has already watched break. */
  moments: [
    { label: "The enquiry", broken: "Unanswered", whole: "Answered" },
    { label: "The follow-up", broken: "Forgotten", whole: "Scheduled" },
    { label: "The appointment", broken: "Unconfirmed", whole: "Confirmed" },
    { label: "The customer", broken: "Gone quiet", whole: "Reached" },
  ],
} as const;

/* =============================================== 09 · THE WHOLE JOURNEY */

export const sceneJourney = {
  title: "One opportunity, all the way through.",
  lead: "The same journey, from the moment someone finds you to the moment they come back.",
  /**
   * Stage one is the website, and ArkFlow builds it.
   *
   * The capability was nearly invisible to a visitor who never opened
   * the navigation — one line in the closing scene. It belongs here,
   * because this is the moment the visitor is looking at "Website" as
   * the first step of their own customer journey. Supported by
   * capabilities.items[9] ("Website build"), and it links to /attract
   * where the capability is set out in full rather than restating it.
   */
  buildLink: "ArkFlow builds this",
  /** Reveals the canonical engineering names for anyone who wants them. */
  technicalToggle: "Show the technical stage names",
  technicalNote:
    "The ten stages above are the canonical ArkFlow Revenue Engine. The names on the left are the plain-English versions of the same model.",
} as const;

/* ============================================ 10 · THE SYSTEM + CLOSE */

export const sceneClose = {
  systemTitle: "One connected system.",
  systemLead: "Every enquiry becomes a record. Every conversation stays attached to it. Nothing depends on someone remembering.",
  /** The surfaces, in the order an opportunity touches them. */
  surfaces: [
    { name: "Website", body: "The front door, built as part of the system." },
    { name: "Conversation", body: "Every channel, one thread." },
    { name: "Customer record", body: "One place, whole history." },
    { name: "Calendar", body: "Booked inside the conversation." },
    { name: "Follow-up", body: "A next action that fires on its own." },
    { name: "Retention", body: "The relationship continues after the sale." },
  ],
  /**
   * THE POSITIONING LANDS HERE.
   *
   * "Revenue Operating Company" was removed from the hero because it
   * asked the visitor to decode a category before they understood their
   * own problem. It was not removed from the site. By this point they
   * have watched the system work and the term finally means something.
   */
  positioning: {
    name: "ArkFlow Solutions",
    line: "A Revenue Operating Company.",
    body: "We design the customer journey, build the system that runs it, and keep operating it as the business changes.",
  },
  /** Why ArkFlow, compressed from six rows to three ideas. */
  pillars: [
    {
      name: "Connected",
      body: "The value is in the joins between the moments, not in any one tool.",
    },
    {
      name: "Operated",
      body: "You are not handed a login and a training video. We run the system.",
    },
    {
      name: "Human",
      body: "AI handles the repetition. People handle the relationship.",
    },
  ],
  ctaTitle: "Where is your business leaking revenue?",
  ctaLead: "A structured look at what happens to an enquiry, from the moment it arrives to the moment a customer comes back.",
  ctaNote: "It is a diagnosis, not a contact form.",
  cta: "Book a Discovery Call",
  areasLabel: "What we look at",
} as const;
