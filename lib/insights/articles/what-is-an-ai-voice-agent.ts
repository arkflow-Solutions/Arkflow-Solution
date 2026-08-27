import type { Article } from "@/lib/insights/types";

export const article: Article = {
  slug: "what-is-an-ai-voice-agent",
  title: "What Is an AI Voice Agent — and When Is It Actually Worth Buying?",
  description:
    "How AI voice agents handle calls, qualification and booking, where they work well, where they do not, and how to tell whether your business needs one.",
  category: "ai-voice-agents",
  level: "discovery",
  published: "2026-08-27",
  authorId: "khai",
  standfirst:
    "A voice agent is a tool, not a strategy. It earns its place when calls are being missed — and not much otherwise.",
  blocks: [
    {
      type: "p",
      text: "An AI voice agent answers your phone. It holds a spoken conversation with the caller, works out what they want, and does something useful with that — books an appointment, takes details, answers a common question, or passes the call to a person. It is not a phone menu, and it is not a recorded message.",
    },
    {
      type: "p",
      text: "The technology is genuinely capable now, which is exactly why it is worth being careful about it. A capable tool aimed at a problem you do not have is still money spent.",
    },
    {
      type: "h2",
      id: "how-it-works",
      text: "How one actually works",
    },
    {
      type: "steps",
      items: [
        {
          label: "It answers",
          text: "The call is picked up on the first or second ring, at any hour, whether or not the line is already busy with another call.",
        },
        {
          label: "It listens and transcribes",
          text: "Speech becomes text in near real time. This is the part that has improved most — accents and background noise are far less of a problem than they were.",
        },
        {
          label: "It works out intent",
          text: "New enquiry, existing appointment, supplier, or something it cannot handle. That classification decides everything after it.",
        },
        {
          label: "It acts",
          text: "Checks live availability and books, captures details into the CRM, answers a question it has been given a verified answer to, or escalates.",
        },
        {
          label: "It hands over cleanly",
          text: "When it should not continue, it transfers to a person or takes a callback — with the conversation so far already recorded, so nobody starts from nothing.",
        },
      ],
    },
    {
      type: "callout",
      title: "The part that matters most",
      text: "The handover. An agent that transfers well is useful. One that traps a caller who needed a person does more damage than the missed call would have.",
    },
    {
      type: "h2",
      id: "where-it-works",
      text: "Where it works well",
    },
    {
      type: "ul",
      items: [
        "High call volume with repetitive content — opening hours, location, availability, whether you offer a service.",
        "Calls arriving while the team is genuinely unavailable, mid-appointment or after hours.",
        "Overflow, when the line is already engaged and the alternative is a voicemail nobody returns.",
        "Booking against a live calendar, where the whole job is checking a slot and confirming it.",
      ],
    },
    {
      type: "h2",
      id: "where-it-doesnt",
      text: "Where it does not",
    },
    {
      type: "ul",
      items: [
        "Clinical, legal or financial advice. The agent should collect and route, never assess.",
        "Distressed or complaining callers, who need a person immediately and can tell they are not talking to one.",
        "Complex negotiation, where the value is in reading the other side.",
        "Businesses whose calls are already answered promptly. If nothing is being missed, there is nothing here to recover.",
      ],
    },
    {
      type: "p",
      text: "That last one deserves emphasis, because it is the case most often talked past. A voice agent does not create demand. It stops you losing demand you already have. If your phone is answered within a few rings during the hours your customers call, the honest answer is that you do not need one yet.",
    },
    {
      type: "h2",
      id: "is-it-worth-it",
      text: "A straightforward way to decide",
    },
    {
      type: "p",
      text: "Look at your call log for the last month and answer three questions.",
    },
    {
      type: "ol",
      items: [
        "How many inbound calls went unanswered, including those that rang out while the line was engaged?",
        "Of those, how many were new enquiries rather than existing customers or suppliers?",
        "What is a new customer worth to you on average, and what proportion of new enquiries normally convert?",
      ],
    },
    {
      type: "p",
      text: "Missed new-enquiry calls, multiplied by your normal conversion rate, multiplied by customer value, gives you the size of the problem. Compare that with what a voice agent costs to run. If the numbers are close, the answer is no — the return has to be obvious to be worth the operational complexity.",
    },
    {
      type: "callout",
      title: "The question underneath the question",
      text: "Most businesses asking about voice agents are really asking why enquiries are not turning into bookings. The phone is sometimes the cause. More often it is one symptom of a follow-up problem that spans every channel.",
    },
    {
      type: "h2",
      id: "in-context",
      text: "Where it fits in a wider system",
    },
    {
      type: "p",
      text: "A voice agent that books into a calendar nobody else can see, or captures details into a record the follow-up sequence never reads, has moved the problem rather than solved it. The call is one entry point among several — website, WhatsApp, Instagram, walk-in — and all of them end up in the same place or none of it compounds.",
    },
    {
      type: "p",
      text: "Judged that way, the voice agent stops being the product. It becomes one door into a system whose actual job is making sure that no enquiry, from any channel, quietly stops.",
    },
  ],
  faq: [
    {
      q: "Can callers tell they are speaking to an AI?",
      a: "Often yes, and it matters less than people expect provided the call is handled well and a person is reachable when needed. Trying to disguise it tends to backfire.",
    },
    {
      q: "What happens if it cannot understand the caller?",
      a: "A well-configured agent escalates after one failed clarification rather than looping. Repeated misunderstanding is worse for the caller than a straight transfer.",
    },
    {
      q: "Does it replace a receptionist?",
      a: "It covers the calls a receptionist cannot — the ones during other calls, and outside opening hours. Businesses that use one well usually redeploy attention rather than remove a role.",
    },
  ],
  solution: {
    label: "See where a voice agent fits",
    href: "/packages#scale",
    note: "ArkFlow includes a voice agent at Scale, as one entry point into the wider system — not as a standalone product.",
  },
  related: ["why-speed-to-lead-matters", "aesthetic-clinic-lead-follow-up"],
};
