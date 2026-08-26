/**
 * "ArkFlow is the whole car" — the signature homepage section.
 *
 * GOVERNANCE: copy is sourced from the ArkFlow Partner & Investor Briefing
 * §04. The DRIVER entry carries the founder-approved correction (C-6):
 * Voice AI is a Scale capability, so the analogy must not imply that every
 * client has it. Do not add capabilities here that are not in the Briefing
 * or the Canonical Package Specification.
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
    body: "Every way a customer can reach you — and today each one opens into a different room.",
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
    summary: "Digital assistants on every system. Voice AI at Scale.",
    body: "A digital assistant that answers, qualifies and books. On Scale, it answers calls too.",
  },
  {
    id: "wheels",
    label: "Wheels",
    summary: "What keeps things moving.",
    body: "Confirmations, reminders, follow-ups, invoice chasing and rebooking — on schedule.",
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

/** The six-stage journey drawn along the road when DESTINATION is active. */
export const journeyStages = [
  "Attract",
  "Engage",
  "Qualify",
  "Book",
  "Convert",
  "Retain",
] as const;

export const carSection = {
  eyebrow: "The analogy",
  title: "ArkFlow is the whole car.",
  lead: "An analogy, not a product. Most vendors sell one component — a chatbot, a booking tool, a CRM. A business does not need another part in a box. It needs the whole thing to move.",
  close:
    "We are not selling the individual parts. We build and operate the whole car.",
} as const;
