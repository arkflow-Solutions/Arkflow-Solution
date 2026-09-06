import type { Category, Author } from "@/lib/insights/types";

/**
 * AUTHORS — name and role only.
 *
 * GOVERNANCE: `bio` is deliberately unset. E-E-A-T is built on
 * verifiable authorship; inventing a credential to fill the field would
 * defeat the purpose of having it. Supply real biographical detail and
 * it renders automatically wherever the byline appears.
 */
export const authors: Record<string, Author> = {
  khai: {
    id: "khai",
    name: "Khairul Naim",
    role: "Founder, ArkFlow Solutions",
  },
};

export type CategoryMeta = {
  slug: Category;
  name: string;
  /** Pillar page H1. */
  title: string;
  description: string;
  /** Pillar page standfirst. */
  standfirst: string;
};

/**
 * CATEGORIES — the pillar architecture.
 *
 * GOVERNANCE NOTE on the three AI categories. ArkFlow is not an AI
 * agency (Founder Bible §1.2), but business owners genuinely search
 * these terms. The resolution is answer framing, not avoidance: each AI
 * pillar explains what the technology is, when it is worth buying, and
 * what it does not fix — then routes to the operations argument. That is
 * why every AI category description ends on an operations note.
 *
 * "AI automation agency Singapore" was dropped as a target term. It is
 * not demand capture; ranking for it asserts an identity ArkFlow has
 * explicitly rejected.
 */
export const categories: CategoryMeta[] = [
  {
    slug: "revenue-operations",
    name: "Revenue Operations",
    title: "Revenue Operations",
    description:
      "What Revenue Operations means for a service business: where enquiries turn into revenue, where they quietly stop, and what to fix first.",
    standfirst:
      "Most service businesses do not have a marketing problem. They have a handover problem — between channels, between tools, and between the people meant to follow up.",
  },
  {
    slug: "lead-response",
    name: "Lead Response",
    title: "Lead response and follow-up",
    description:
      "How quickly a business answers a new enquiry, why it decides more revenue than most owners expect, and how to measure your own response time honestly.",
    standfirst:
      "The gap between an enquiry arriving and someone answering it is the single most measurable revenue leak in a service business.",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    title: "WhatsApp automation",
    description:
      "How service businesses in Singapore handle WhatsApp enquiries at volume without losing the personal tone customers expect from the channel.",
    standfirst:
      "In Singapore, WhatsApp is not a marketing channel. It is where the sale actually happens — which is exactly why it is the worst place to be slow.",
  },
  {
    /**
     * EDUCATIONAL PILLAR — not a product page.
     *
     * TIER 2A, 6 September 2026. This pillar was named "AI Voice
     * Agents" and read as an ArkFlow product line. Voice is IN
     * DEVELOPMENT / VALIDATION, not shipped, so the name and copy were
     * reframed to what this pillar actually is: an explainer about a
     * category of technology, written for someone deciding whether they
     * need it at all.
     *
     * The SLUG IS DELIBERATELY UNCHANGED. It carries the published
     * route /insights/ai-voice-agents and the article
     * `what-is-an-ai-voice-agent`. Removing the category would orphan
     * that article and break a live URL, so it was retained — the
     * fallback Tier 2A explicitly allows.
     *
     * Nothing here may imply ArkFlow currently sells a voice agent.
     */
    slug: "ai-voice-agents",
    name: "Voice AI",
    title: "Voice AI, explained",
    description:
      "What voice AI actually does, where it works well, where it does not, and how to judge whether your business needs it — written to help you decide, not to sell you one.",
    standfirst:
      "Voice is a tool, not a strategy. It is worth looking at when calls are genuinely being missed — and worth skipping when they are not. ArkFlow does not currently sell a voice agent; this pillar exists because the question keeps coming up.",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    title: "AI automation",
    description:
      "A practical view of AI automation for Singapore service businesses: what is genuinely useful today, what is oversold, and what to automate first.",
    standfirst:
      "The interesting question is not what AI can automate. It is which parts of your business are losing money because nobody has time to do them consistently.",
  },
  {
    slug: "aesthetic-clinics",
    name: "Aesthetic Clinics",
    title: "Aesthetic clinics",
    description:
      "Enquiry handling, consultation booking, no-shows, follow-up and recall for Singapore aesthetic clinics — one of the verticals ArkFlow works in.",
    standfirst:
      "A clinic's revenue is decided in the gaps: between the enquiry and the reply, the consultation and the treatment, the treatment and the next visit.",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
