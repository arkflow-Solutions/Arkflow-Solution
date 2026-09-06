# ArkFlow website — Phase 1 & 2

## Phase 1 — technical correctness

**Canonical domain.** `lib/site.ts` fallback changed from
`https://ark-flow-sg.vercel.app` to `https://www.arkflowsolutions.com`.
This was the whole bug: one constant resolved every canonical, OG URL,
sitemap entry and JSON-LD url. Verified — zero `ark-flow-sg` references
remain in rendered output.

> **REQUIRED IN VERCEL:** set `www.arkflowsolutions.com` as the PRIMARY
> domain so the `.vercel.app` origin 301s. Without it there are still two
> indexable copies of every page. Then resubmit the sitemap in Search
> Console; canonical consolidation takes 2–4 weeks.

**Per-page metadata.** New `lib/seo.ts` exports `buildMetadata()`. Pages
previously exported only `title` and `description`, so Next.js merged the
root layout's `openGraph` — every page shared the homepage's og:title and
og:url. A link to /packages shared on WhatsApp previewed as the homepage.
All 9 sub-pages now emit their own canonical, og:title, og:description,
og:url and twitter card.

`/contact` also had a hardcoded `url: "https://arkflow.sg/contact"` —
a domain that does not serve this site. Removed.

**Contact email.** `CONTACT_EMAIL` was `hello@arkflow.sg`. arkflow.sg is
not the production domain, so that address had no deliverable mailbox — a
live contact address that bounces. Aligned to the address recorded in
governance (`arkflowsg@gmail.com`). One line to change if a mailbox now
exists on the production domain.

**Comparison table.** My earlier audit called this out as inaccessible.
That was wrong — it already had `sr-only` caption, `scope="col"` and
`scope="row"`. The real (smaller) gap: `aria-label` on a bare `<svg>` is
not reliably announced. Added `role="img"`. 23 included / 9 not-included
cells now readable.

**Analytics.** New `lib/analytics.ts` — full event taxonomy, vendor
agnostic, with a PII filter enforced in code. No email, phone, name or
free-text field value can enter a payload. Not yet wired to handlers.

**JSON-LD.** Added logo, postal country and a contactPoint. Still no
Product/Offer block — emitting `price` would publish the price list in
page source.

## Phase 2 — homepage, 16 sections to 9

The page argued "your tools are not connected" five times: Ten doors,
You already have the parts, The whole car, One connected journey, Second
admin. Merged to one.

| Section | Change |
|---|---|
| Hero | Rewritten. "Revenue Operations for Singapore service businesses." Primary CTA now the Lead Response Audit. |
| Commitments | Kept. Added *"Service commitments, not client results."* |
| The problem | Ten doors + The parts merged into one section. Six-bullet cost list cut. |
| The whole car | Kept. Seven part descriptions cut to one line each; duplicated Engine paragraph removed. |
| Six-stage journey | Canonical, unchanged. One line per stage. Second admin survives as one closing line. |
| Unified inbox | Kept. |
| Packages | Kept. Stage 1 disclosure relocated here. |
| How we work | Step names aligned to Canonical Spec §08. |
| FAQ + CTA | Rewritten to 7 questions. |

Removed from the homepage, **not deleted** — retained unexported in
`home-content.ts` with routing notes: `theParts`, `secondAdmin`,
`provides`, `voice`, `retention`, `reporting`, `industries`.
`components/home/v2/capabilities.tsx` deleted; /solutions already covers
all six layers in more depth.

**Result:** 936 words removed, 1,117 retained — 46% reduction, before
counting in-place shortening of the hero, problem, journey, car parts,
process and final CTA.

## Governance applied

- No price on any public surface. Verified: no 688 / 988 / 1,488 / 888.
- Six-stage journey unchanged. No ™. No second framework.
- Stage 1 disclosure preserved (packages + FAQ) — it must stay on the page.
- No invented proof. Commitments never restated as performance.
- Process step names follow the canonical spec, not the live site.
- "Lead Response Audit" used throughout, not "Revenue Leak Audit".

## Open

- Founder Bible Ch1 §1.9 still says "90-day money-back / first month
  free". Live site is correct. Bible needs correction — site not touched.
- WhatsApp number still `null`; every WhatsApp affordance stays hidden.
- Trust page, founder section, ROI calculator: Phase 3–4, blocked on inputs.
