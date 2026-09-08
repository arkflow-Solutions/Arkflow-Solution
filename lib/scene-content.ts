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
 * Dialogue is NOT written here. Scene 03 reuses beats from the approved
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

/* ======================================== 02 · EVERY CHANNEL, ONE INBOX */

/**
 * PHASE 3G — the Unified Inbox, as a scene.
 *
 * WHY IT EXISTS. The 18-section to 10-scene compression dropped the
 * omnichannel concept entirely. Measured on the homepage before this
 * scene: not one channel was named anywhere, except a single WhatsApp
 * badge on the closing composition's record card. The capability
 * survived on /solutions, /packages, /how-it-works and /attract — every
 * surface except the one most visitors actually see.
 *
 * THE COUNT, AND WHY THERE IS NO NUMBER IN THE COPY. The approved lead
 * on /solutions says "six apps". That is rhetorical, not an inventory:
 * the same content set says "six inboxes and a notebook", "four tabs
 * and a spreadsheet" and "ten notifications", none of which count
 * anything. The real approved inventory is EIGHT. A number is harmless
 * beside a paragraph and a liability beside a row of glyphs a visitor
 * can count, so the copy carries none and the row shows all eight.
 *
 * WHAT MUST NEVER APPEAR HERE. The previous live site's inbox panel
 * carried a "4 UNREAD" counter and "answered in under 90 seconds".
 * Neither renders anywhere in v3 and neither may be added. No counter,
 * no unread dot, no timestamp, no response time, no metric, no KPI, no
 * chart, and no real person's data.
 *
 * THIS IS A CAPABILITY SCENE, NOT A LEAK SCENE. It is lit above 1 and
 * its Capture handover closes rather than leaking. Scenes 03 to 06 are
 * the problem block; this one is the recognition that precedes it.
 */

export const sceneInbox = {
  title: "Every channel. One inbox.",
  lead: "A customer picks the channel. Your team should not have to follow them from channel to channel to keep up.",
  /**
   * The approved inventory, in full. These are the eight named in
   * lib/solutions-content.ts and lib/packages-content.ts. Do not add a
   * ninth for visual density and do not drop one to round a number.
   *
   * Website is last and is treated differently everywhere it appears:
   * it arrives as an enquiry form, not as a chat, and it must never be
   * dressed as a messaging app.
   */
  doors: [
    "WhatsApp",
    "Instagram",
    "Messenger",
    "TikTok",
    "Telegram",
    "SMS",
    "Email",
    "Website",
  ],
  /** Matches the approved `arkflow · revenue pipeline` convention. */
  frameLabel: "arkflow · inbox",
  problemLabel: "Separate conversations",
  resolvedLabel: "One inbox, one history",
  /**
   * Five arrivals. `handle` is what a fragmented setup shows you — an
   * account, a number, a form — and `who` is what the same enquiry
   * looks like once every channel lands against one record.
   *
   * THE TWO J. TAN ROWS ARE THE POINT. Two conversations that looked
   * like two strangers are one customer, and the page can say so in
   * plain text rather than by colour or motion.
   *
   * TIKTOK STAYS UNRESOLVED, DELIBERATELY. It is a first contact from
   * someone the business has never dealt with, so there is nothing to
   * match it to. Resolving all five would claim something the system
   * cannot do, and leaving one open is what makes the J. Tan pairing
   * read as a real match rather than decoration.
   *
   * Names and metas are the site's existing illustrative placeholders,
   * recovered from `productUi` in lib/revenue-content.ts. Its relative
   * timestamps are deliberately NOT carried across: "2 min ago" beside
   * an inbox reads as a response-time claim.
   */
  arrivals: [
    {
      channel: "Instagram",
      handle: "@jt.tan",
      who: "J. Tan",
      meta: "Asked about availability",
    },
    {
      channel: "WhatsApp",
      handle: "••• 4021",
      who: "J. Tan",
      meta: "Asked again",
    },
    {
      channel: "Messenger",
      handle: "m.lim.94",
      who: "M. Lim",
      meta: "First visit",
    },
    {
      channel: "TikTok",
      handle: "tiktok_user_88",
      who: "tiktok_user_88",
      meta: "New enquiry",
    },
    {
      channel: "Website",
      handle: "Enquiry form",
      who: "R. Kaur",
      meta: "Submitted",
    },
  ],
} as const;

/* ======================================= 03 · THE UNANSWERED ENQUIRY */

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

/* ============================================== 04 · THE DAYS PASS */

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

/* ================================== 05 · THE CUSTOMER WHO DISAPPEARS */

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

/* ==================================================== 06 · THE DESK */

/**
 * PHASE 3F.3B — one detail, four places.
 *
 * One appointment, and the four places it has to be written when nobody
 * has connected them. Three disagree and one is blank, which is the
 * whole argument — readable as text, with no dependence on colour.
 *
 * THE HUMAN-VERSUS-SYSTEM ARGUMENT BELONGS TO SCENE 08 AND IS NOT MADE
 * HERE. Any list of what the system handles against what people handle
 * duplicates it. Do not reintroduce one.
 *
 * NOTHING HERE IS A METRIC. No hours, no counts, no productivity claim,
 * no outcome. What changes is where the information lives. How much
 * that is worth is a conversation, not a number on a homepage.
 */
export const sceneDesk = {
  title: "Someone is doing this by hand.",
  /** Salvaged verbatim from the approved lead's second sentence. */
  lead: "Nothing is connected, so a person has to be the connection.",
  /** The appointment itself. The site's existing placeholder identity. */
  detail: "J. Tan · Thu 10:30",
  problemLabel: "By hand",
  resolvedLabel: "Entered once",
  /**
   * The same appointment, as four surfaces hold it while a person is
   * carrying it between them. `was: null` is the record nobody updated.
   *
   * These are four PLACES, not four capabilities, and the scene must
   * never imply otherwise — no invoicing, no payments, no voice agent,
   * no integration that is not in the classified capability set.
   */
  places: [
    { name: "Conversation", was: "thurs 10.30am" },
    { name: "Calendar", was: "Thu 10:30" },
    { name: "Customer record", was: null },
    { name: "Follow-up", was: "Thu 10am?" },
  ],
  /** What all four read once it is entered in one place. */
  agreed: "Thu 10:30",
  /** For the blank row. Shown as an em dash, announced as this. */
  blank: "Nothing recorded",
  close: "It only has to be entered once.",
} as const;

/* ============================================ 07 · THE TRANSFORMATION */

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

/* =============================================== 10 · THE WHOLE JOURNEY */

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

/* ============================================ 11 · THE SYSTEM + CLOSE */

export const sceneClose = {
  systemTitle: "One connected system.",
  systemLead: "Every enquiry becomes a record. Every conversation stays attached to it. Nothing depends on someone remembering.",
  /**
   * PHASE 3F SCENE 10 — the surfaces became the composition.
   *
   * This was a six-item list of name + sentence. The sentences are gone
   * because the artefact says the same thing better: a record card with
   * a name, a channel and a line of history IS "one place, whole
   * history", and reading that sentence beside it was the scene
   * explaining what it was already showing.
   *
   * Website and Retention were dropped rather than shrunk. Both are also
   * PUBLIC STAGE LABELS, so putting them on the line would have restated
   * scene 09 a third time — the same duplication that took the audit
   * areas out. Website already has its own route from scene 09's stage
   * one, which is the better placement.
   *
   * The four names now live in components/home/scenes/system-composition
   * as labels on the composition. Kept here as the record of what was
   * approved, and unexported so nothing renders them as a list again.
   */
  humanLabel: "Human",
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
  /**
   * Three ideas, three words.
   *
   * The bodies are gone: the composition above demonstrates each one.
   * CONNECTED is the line with everything attached to it. OPERATED is
   * the positioning statement that follows. HUMAN is the green mark on
   * the line at Respond — which scene 08 has already explained in full,
   * so repeating "AI handles the repetition, people handle the
   * relationship" here would be the third telling of it.
   */
  pillars: ["Connected", "Operated", "Human"],
  ctaTitle: "Where is your business leaking revenue?",
  /* `ctaLead` REMOVED — it described the audit as a process in 24 words
     while ctaTitle asks the question and ctaNote answers the only
     objection. Nothing about the offer is lost. */
  ctaNote: "It is a diagnosis, not a contact form.",
  cta: "Book a Discovery Call",
  /* `areasLabel` and the ten audit areas REMOVED. Five of those ten were
     word-for-word the public stage labels from scene 09 — Qualification,
     Booking, Follow-up, Retention, Reactivation — and two more were
     RevOps phrasing for stages already shown. The close was restating
     the journey one scene later in more abstract language, which made
     the journey feel like it had not landed. Founder decision, 8
     September 2026: delete rather than reword. */
} as const;
