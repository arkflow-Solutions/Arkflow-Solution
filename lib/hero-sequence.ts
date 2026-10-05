/**
 * The homepage hero sequence — six scenes, one pendulum.
 *
 * THE ARGUMENT. Time is the pressure. An enquiry arrives, nobody
 * answers, the opportunity cools, and the customer goes elsewhere. The
 * pendulum carries that story across the screen: left is leakage,
 * centre is the moment it goes wrong, right is the system. The swing is
 * the transition, which is why it is the one piece of motion given real
 * weight.
 *
 * GOVERNANCE, AND WHAT IS DELIBERATELY NOT HERE.
 *
 *  - NO MONEY COUNTER. A ticking "$1,293 lost" would be a fabricated
 *    performance figure; v1.4 §20 forbids revenue claims and there is no
 *    data behind one. The clock shows time passing, nothing more.
 *  - NO "FIND YOUR REVENUE LEAKS" BUTTON. That was the Revenue Leak
 *    Audit funnel, retired as a public CTA by founder decision on
 *    6 September 2026; verify.mjs check 12a fails the build if any
 *    public file links it again. The canonical conversion is the
 *    booking modal, so the primary action is "Book a Discovery Call".
 *  - NO CLIENT, RESULT OR VOLUME CLAIM. The timeline rows describe a
 *    sequence, not an outcome anyone achieved.
 *
 * COLOUR. Amber appears exactly once, on "Nobody answered" — amber means
 * revenue leaking and nothing else. Everything else is blue (revenue
 * moving) or neutral. Green is reserved for human takeover and is not
 * used here.
 */

export type HeroScene = {
  /** Headline, split so the second half can carry the accent colour. */
  title: string;
  titleAccent: string;
  lead: string;
  /** Pendulum angle in degrees. Negative is left, positive is right. */
  angle: number;
  /** Milliseconds this scene holds before the next one begins. */
  hold: number;
  /** Which side of the story is on screen. */
  side: "problem" | "system";
};

/**
 * Timing. The whole sequence runs about 10.5 seconds, and the swing from
 * centre to right gets the longest hold because it is the moment the
 * page exists to show. Scene 03 pauses on the centre deliberately: the
 * tension has to land before it resolves.
 */
export const heroScenes: HeroScene[] = [
  /* SCENE 01 CARRIES THE COMMERCIAL MESSAGE, NOT THE TEASER.
     The Blueprint's Part 0 audit found that a visitor could not tell in
     five seconds whether this site was for them: the old opening line
     was "Your leads don't wait", which names no audience and makes no
     promise. Scene 01 is also the scene the server renders — so it is
     what a crawler indexes and what someone with JavaScript disabled
     reads — which makes it the only correct place for the H1 the
     Blueprint specifies. The story then runs exactly as before. */
  {
    title: "Every enquiry answered.",
    titleAccent: "Every booking followed up.",
    /* Trimmed by five words from the Blueprint's wording: "reminds the
       customer" is already shown, with a timestamp, in the panel beside
       it. Every word kept here costs a line of reserved height that
       every other scene then has to leave empty. */
    lead: "You paid for the enquiry. ArkFlow sets up and runs the system that replies in minutes — even at 9:41 PM — books the appointment and brings customers back.",
    angle: -28,
    hold: 2600,
    side: "problem",
  },
  {
    title: "A lead",
    titleAccent: "just came in.",
    lead: "Someone is interested in your business right now. The clock starts whether anyone is watching or not.",
    angle: -17,
    hold: 1500,
    side: "problem",
  },
  {
    title: "Nobody",
    titleAccent: "answered.",
    lead: "You paid for that enquiry. Who answered it? Nobody was going to, at 9:41 PM.",
    angle: 0,
    hold: 1900,
    side: "problem",
  },
  {
    title: "Let’s",
    titleAccent: "automate it.",
    lead: "Capture. Respond. Book. Follow up. Nothing falls through.",
    angle: 17,
    hold: 2000,
    side: "system",
  },
  {
    title: "Every channel.",
    titleAccent: "One system.",
    lead: "Every door into your business arrives in the same place, and is answered the same way.",
    angle: 26,
    hold: 2400,
    side: "system",
  },
  {
    title: "Nothing",
    titleAccent: "falls through.",
    lead: "Capture more. Convert more. Retain more. We don’t just build the system — we run it.",
    angle: 28,
    hold: 0,
    side: "system",
  },
];

/** The scene the page settles on, and the one reduced motion starts at. */
export const HERO_FINAL = heroScenes.length - 1;

/** The scene at which the timeline turns over from leak to system. */
export const HERO_TURN = 3;

/**
 * The same four moments, told twice. Left is what happens without a
 * system; right is what the system does instead. They are deliberately
 * the same length and the same shape, so the swap reads as one row
 * turning over rather than as two different lists.
 */
export const heroTimeline = {
  problem: [
    { time: "9:41 PM", label: "New enquiry received", state: "normal" },
    { time: "9:42 PM", label: "Nobody answered", state: "loss" },
    { time: "9:44 PM", label: "Follow-up forgotten", state: "normal" },
    { time: "9:45 PM", label: "Customer moved on", state: "normal" },
  ],
  system: [
    { time: "9:41 PM", label: "Answered instantly", state: "normal" },
    { time: "9:42 PM", label: "Lead qualified", state: "normal" },
    { time: "9:44 PM", label: "Booking confirmed", state: "normal" },
    { time: "9:45 PM", label: "Follow-up scheduled", state: "normal" },
  ],
} as const;

/** The doors an enquiry arrives through. Names from lib/channels. */
export const heroChannels = [
  "Instagram",
  "WhatsApp",
  "Facebook",
  "Website",
  "Email",
  "Phone",
] as const;

/** What the system does once everything arrives in one place. */
export const heroCapabilities = [
  { label: "Answers", note: "Every channel, every hour" },
  { label: "Qualifies", note: "The same questions, every time" },
  { label: "Books", note: "Against real availability" },
  { label: "Follows up", note: "Because the system owes it" },
] as const;

export const heroMeta = {
  /* THE AUDIENCE, FIRST. Growth Blueprint Part 0: a visitor could not
     tell in five seconds whether this site was for them. The eyebrow now
     says so before the headline does. It also replaces "Automate ·
     Optimise · Scale" — one primary tagline, per Part 48, and that one
     is "Capture more. Convert more. Retain more." */
  eyebrow: "For Singapore clinics & appointment-based businesses",
  /** Shown on the resting scene, under the headline. */
  signature: "ArkFlow — a Revenue Operating Company",
  /** The division of labour, held on screen through every scene. */
  aiLine: "AI handles the repetition. Your team handles the relationship.",
  primaryCta: "Get your free Revenue Leak Audit",
  secondaryCta: "See how it works",
  /** The clock starts here and ticks forward. Time, not money. */
  clock: { h: 9, m: 41, s: 3 },
} as const;
