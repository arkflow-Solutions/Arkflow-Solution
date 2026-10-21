# Keyword map

One primary keyword per page. Two pages must never target the same
one — that is cannibalisation, and it means Google picks which of our
own pages to rank and usually picks the weaker.

Written 21 October 2026. If you add a page, add a row here first.

## The rule about "Revenue Operating Company"

It is an invented category. Nobody searches for it, and a title built
on it ranks for nothing. It stays as a brand idea in the body copy,
explained in one sentence on first use. It does not appear in a title
tag, an H1, or a meta description.

## Primary keywords

| Page | Primary keyword | Secondary |
|---|---|---|
| `/` | WhatsApp automation Singapore | AI enquiry response, clinic enquiries |
| `/aesthetic-clinics` | AI chatbot for aesthetic clinics Singapore | clinic enquiry response, MOH advertising rules |
| `/how-it-works` | clinic appointment booking automation Singapore | enquiry to booking flow |
| `/contact` | lead follow-up automation | Singapore, enquiry follow-up |
| `/solutions` | customer reactivation for clinics | repeat appointments, dormant patients |
| `/what-we-build` | WhatsApp Business API Singapore | managed automation setup |
| `/attract` | clinic website design Singapore | website enquiry capture |
| `/case-studies` | (none — brand/proof page) | — |
| `/about` | (none — brand page) | — |
| `/test` | after-hours enquiry response test | response time measurement |
| `/compliance` | PDPA WhatsApp marketing Singapore | DNC registry, opt-in |

## Insights articles

Articles target long-tail questions and must not compete with the
service page they link to. Each one links to its service page with
descriptive anchor text, and each service page links back to its best
two or three articles.

| Article | Long-tail target |
|---|---|
| `why-speed-to-lead-matters` | how fast should you reply to a lead |
| `aesthetic-clinic-lead-follow-up` | aesthetic clinic lead follow up |
| `what-is-an-ai-voice-agent` | what is an AI voice agent |
| `how-to-implement-ai-in-your-business` | how to implement AI in your business |
| `whatsapp-automation-singapore-clinics` | WhatsApp automation for clinics Singapore |

Ten more are drafted in [content-plan.md](./content-plan.md).

## Title and description rules

- Title ≤ 60 characters including ` | ArkFlow`. Topic first, brand last.
- Description ≤ 155 characters. A reason to click, not a keyword list.
- The brand appears once per title. `buildMetadata` strips a trailing
  "ArkFlow" from the topic so it cannot be doubled by accident.
- No price, no client count, no performance claim — enforced by
  `scripts/verify.mjs`.
