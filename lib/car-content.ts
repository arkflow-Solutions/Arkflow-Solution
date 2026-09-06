/**
 * "ArkFlow is the whole car" - the signature analogy section.
 *
 * PRESERVED from the previous homepage. The section is strong work and
 * its argument (most vendors sell one component; a business needs the
 * whole thing to move) is exactly the current positioning, so it is
 * kept rather than rebuilt.
 *
 * GOVERNANCE, updated 6 September 2026:
 *  - The DRIVER entry no longer references Voice AI or the Scale tier.
 *    Package tiers are superseded and AI voice is in development, so
 *    neither may appear on a public surface.
 *  - The WHEELS entry no longer references invoice chasing. Invoice and
 *    payment automation is classified future and exploratory.
 *  - journeyStages is now the canonical TEN-stage Revenue Engine. The
 *    previous six-stage journey is superseded.
 *  - House style: no em dashes in visitor-facing copy.
 */

export type CarPartId =
  | "doors"
  | "engine"
  | "driver"
  | "wheels"
  | "boot"
  | "dashboard"
  | "destination";

export type CarPart = {
  id: CarPartId;
  label: string;
  /** One line, shown in the index. */
  summary: string;
  /** Expanded copy, shown when the part is active. */
  body: string;
};

export const carParts: CarPart[] = [
  {
    id: "doors",
    label: "Doors",
    summary: "Where customers arrive.",
    body: "Every way a customer can reach you, and today each one opens into a different room.",
  },
  {
    id: "engine",
    label: "Engine",
    summary: "What connects everything.",
    body: "The connections that turn an enquiry into a conversation, a booking, then a payment.",
  },
  {
    id: "driver",
    label: "Driver",
    summary: "Who answers when nobody is free.",
    body: "A digital assistant that responds, answers routine questions, qualifies and books, then hands to a person the moment judgement is needed.",
  },
  {
    id: "wheels",
    label: "Wheels",
    summary: "What keeps things moving.",
    body: "Confirmations, reminders, follow-ups, rebooking and recall, running on schedule instead of on memory.",
  },
  {
    id: "boot",
    label: "Boot",
    summary: "Where everything is kept.",
    body: "One customer record instead of six inboxes and a notebook.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    summary: "What is actually working.",
    body: "Where enquiries came from, what converted, and where the business is quietly leaking.",
  },
  {
    id: "destination",
    label: "Destination",
    summary: "First enquiry to repeat customer.",
    body: "First message to repeat customer, carried the whole way by one system.",
  },
];

/**
 * The canonical ten-stage Revenue Engine, drawn along the road when
 * DESTINATION is active. Matches lib/revenue-content.ts exactly. Stages
 * are never added, renamed, dropped or reordered.
 */
export const journeyStages = [
  "Attract",
  "Capture",
  "Respond",
  "Qualify",
  "Book",
  "Convert",
  "Follow Up",
  "Retain",
  "Reactivate",
  "Grow",
] as const;

export const carSection = {
  eyebrow: "The analogy",
  title: "ArkFlow is the whole car.",
  lead: "An analogy, not a product. Most vendors sell one component: a chatbot, a booking tool, a CRM. A business does not need another part in a box. It needs the whole thing to move.",
  close:
    "We are not selling the individual parts. We build and operate the whole car.",
} as const;
