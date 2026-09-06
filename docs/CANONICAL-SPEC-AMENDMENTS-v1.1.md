# Canonical Package Specification — v1.1 Amendment Notes

**Amends:** ArkFlow Canonical Package Specification v1.0 (4 July 2026)
**Status:** Founder-approved · 15 August 2026
**Owner:** Founder (never delegated)
**Scope:** Three amendments only. The Founder Bible is not rewritten. All other v1.0 content stands unchanged.

---

## Why this document exists

Spec v1.0 §00 states that where any downstream surface disagrees with the specification, **the specification wins and the other surface is corrected — not the reverse.**

Three founder decisions taken after 4 July 2026 conflict with v1.0 as written. Rather than let the website silently contradict the locked source of truth, each conflict is recorded here with the v1.0 text it supersedes, so the resolution is transparent and auditable.

Until v1.1 of the specification is issued, **this document governs those three points.** Everything else in v1.0 remains canonical.

---

## Amendment 1 — Voice AI placement

**Ruling: AI Voice Agent is included in Scale only. It is not an Operate add-on.**

### v1.0 text superseded

| Location | v1.0 says | Status |
|---|---|---|
| §04 Operate — Upgrade path | *"Optionally add the AI Voice Agent (+S$400/month) without moving to Scale."* | ❌ Superseded |
| §04 Operate — Limitations | *"AI Voice Agent is not included — available as an add-on, or included in Scale."* | ⚠️ Amended — the add-on clause is removed; "available in Scale" stands |
| §06 Upgrade Rules | The row *"Add-on (no tier change) — An Operate client with high call volume can add the AI Voice Agent (+S$400/month) without moving to Scale."* | ❌ Row deleted |
| §09 Pricing Policy | *"Optional add-ons: AI Voice Agent +S$400/month; additional website pages S$150 each."* | ⚠️ Amended — Voice Agent add-on removed; the S$150 per-page add-on stands |
| §10 Package Matrix | Operate row for AI Voice Agent reads **"Add-on +S$400"** | ❌ Becomes **"—"** |

### Corrected position

| Package | AI Voice Agent |
|---|---|
| Respond | Not included |
| Operate | Not included |
| **Scale** | **Included** |

### What does not change

Scale's voice scope is unchanged: answers inbound calls within two rings, provides service information, books appointments, qualifies lead type, hands off to a human for complex or sensitive conversations, AI call classification, post-call CRM update, voice-to-booking. Spec §05 stands in full.

No other package scope is altered by this amendment.

### Rationale

Voice is the capability that most clearly distinguishes Scale from Operate. Selling it as a bolt-on erodes the tier ladder and gives an Operate client most of Scale's differentiation without the tier. The three packages are defined by stage of business maturity (§01), and an add-on that crosses tiers works against that organising principle.

---

## Amendment 2 — Public quotation-based pricing

**Ruling: ArkFlow moves to personalised quotation. No pricing is published on the public website.**

### v1.0 text superseded

| Location | v1.0 says | Status |
|---|---|---|
| §11 Website Copy | Titled *"Premium copy, ready to publish"* and described as *"the approved language for each package card on the ArkFlow website."* Each card closes with a price: *"From S$688/month"*, *"From S$988/month"*, *"From S$1,488/month."* | ⚠️ Amended — prose retained, price lines removed |
| §12 Design Notes — Visual hierarchy | *"Outcome first, price second, features third."* | ⚠️ Amended for the public website — becomes outcome → capability → CTA |
| §12 Design Notes — Card layout | *"eyebrow → outcome headline → price → short feature list → single CTA"* | ⚠️ Amended for the public website — the price row is removed |
| §12 Design Notes — Call-to-action | *"Start with Respond", "Get Operate", "Talk to us about Scale"* | ⚠️ Amended — single CTA, *"Request a personalised quotation"* |

### What stays internal and canonical

**All of §02, §09 and §10 remain the internal source of truth and are unchanged as commercial architecture.** Respond S$688 · Operate S$988 · Scale S$1,488 · implementation S$888 · 6-month minimum · payment terms · late-payment ladder · upgrade pricing · discount definitions · downgrade rules · price-change policy · cancellation. None of it changes. It simply stops being published.

### What must not appear on any public surface

S$688 · S$988 · S$1,488 · S$888 implementation fee · S$400 Voice AI add-on (also removed by Amendment 1) · S$150 per additional page · 8% annual prepayment discount · 15% multi-location discount.

This applies to visible copy, package cards, package pages, page metadata, OpenGraph tags, JSON-LD, `Product` schema, `Offer` schema, and raw page source.

### Approved public presentation

**RESPOND** — Capture, organise and respond to enquiries.
**OPERATE** — Connect conversations, bookings, payments and operational workflows.
**SCALE** — Build a deeper revenue and retention system, including the professional website, AI Voice Agent and past-customer reactivation.

Closing line: *"Every ArkFlow system is configured around how your business actually operates."*
CTA: **Request a personalised quotation.**

### What is unaffected

The 6-month minimum commitment may still be stated publicly (§02, §09, §10 all confirm it for all three tiers). The 30-Day Response Guarantee is unchanged and is published in full. Package names, order, scope and the additive stacking principle are unchanged.

### Rationale

Spec §01 already establishes that packages are matched to a business's stage rather than compared as feature lists, and Founder Bible §1.9 records that the pricing is *"a validated hypothesis, not an immutable truth"* which has *"NOT yet been confirmed by real clients."* A published price invites comparison before the diagnosis; a quotation follows the Lead Response Audit, which is where the value is actually established.

---

## Amendment 3 — Website design and motion rules

**Ruling: the approved website design direction governs the public website. Spec §12 governs proposal, deck and print surfaces.**

### v1.0 text superseded — for the public website only

§12 specifies a light-background presentation system: secondary text `#5B6472`, hairlines `#E7E9EE`, monochrome base, success green `#0B8457` for included-ticks. These are light-mode tokens and do not govern the public website.

### Public website tokens (canonical for arkflow.sg)

| Token | Hex | Use |
|---|---|---|
| Background | `#0A0E1A` | Page background |
| Surface | `#0F172A` | Cards, panels, header bars |
| Accent | `#1A3CFF` | Primary accent — used sparingly |
| Accent (soft) | `#3B82F6` | Hover and secondary states only |
| Secondary text | `#D1D5DB` | Body and secondary copy |
| Primary text | `#FFFFFF` | Headings and primary copy |

Typography: **Inter** for display and body; **JetBrains Mono** for eyebrows, metrics and system labels. Unchanged from Founder Bible Ch2 §2.13.

`#1A3CFF` as the single accent is the one point where §12 and the website direction already agree, and it is preserved. The "one electric-blue element per viewport" rule stands, with the car section as the single deliberate exception.

### Motion

§12 states: *"No parallax, no autoplay, no bounce. Motion confirms an action; it never performs."* The intent of that rule is upheld. Its literal application is amended for the website.

**Permitted:** SVG path animation, hover and focus interaction, scroll-based progression, subtle reveals, restrained transitions.

**Not permitted:** excessive parallax, bouncing elements, unnecessary autoplay effects, distracting loops, WebGL of any kind.

**The car section's ambient animation is expressly permitted.** It is not decoration — the light travelling from doors through engine to wheels to road *is* the explanation of connected architecture, which is the section's entire argument. Motion that carries meaning is permitted; motion that performs is not.

`prefers-reduced-motion` is honoured throughout.

### Consequence

Three.js, `@react-three/fiber` and `@types/three` are removed from the project, including `components/three/spatial-field.tsx`, notwithstanding its role in the previous V2 homepage.

---

## Amendments summary

| # | Subject | Sections touched | Effect |
|---|---|---|---|
| 1 | Voice AI placement | §04, §06, §09, §10 | Scale only; Operate add-on removed |
| 2 | Public quotation pricing | §09, §11, §12 | Pricing stays internal; public site shows none |
| 3 | Website design & motion | §12 | Dark tokens govern the website; meaningful motion permitted |

**Nothing else in Canonical Package Specification v1.0 is amended.** Package names, scope, stacking, upgrade rules, boundaries, implementation timeline, the 30-Day Response Guarantee, and all internal commercial terms stand as written.

If implementation surfaces any further contradiction between the website and the specification, it is flagged and recorded here — never resolved silently.
