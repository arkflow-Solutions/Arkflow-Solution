# ArkFlow — www.arkflowsolutions.com

The digital headquarters of Arkflow Solutions Pte Ltd: a Revenue
Operating Company. Public positioning is industry-agnostic — aesthetics
is one vertical among several and never leads.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS ·
Framer Motion · React Three Fiber · Lenis · Lucide.

Every page route is statically rendered. Two routes are not:
`app/api/enquiry` (Node runtime) and `app/opengraph-image.tsx` (edge
runtime). The site therefore needs a Node-capable host, not a static
bucket.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run verify     # governance checks + tsc --noEmit
npm run build      # also runs the governance checks via prebuild
npm run lint
```

`npm run verify` is the gate. `scripts/verify.mjs` runs on `prebuild`,
so a governance violation fails the build rather than shipping.

## Environment

See `.env.example` for every variable the code reads. One is worth
repeating here: with no `GHL_*` variable set, `/api/enquiry` returns
success and only logs. **The contact form appears to work and creates
no contact.** Configure it before promoting the site.

## Governance — read before editing

- **The specification wins over this repository.** Amendments live in
  `docs/`. Where a surface disagrees with the spec, the surface is
  corrected — never the reverse.
- The current public truth: ArkFlow is a Revenue Operating Company; the
  canonical engine is the ten stages in `lib/revenue-content.ts`; the
  Revenue Leak Audit is the only primary CTA. Superseded package and
  tier names, the previous guarantee and contract term, and unapproved
  product names must not appear on any public surface.
- No pricing on any public surface — visible copy, metadata, OG tags or
  JSON-LD.
- No invented clients, results, statistics or testimonials. Anything
  representative is labelled illustrative in the UI itself.
- The design system is documented in `DESIGN-SYSTEM.md`. The `/styleguide`
  route is retired.
- The palette is locked by Founder Bible Ch. 2.13.
- The blue rule: one electric-blue (#1A3CFF) element per viewport. The
  3D sections are the deliberate exception (AMENDMENTS-v1.2).
- The 3D budget: exactly two scenes — the hero and the car — both on the
  home page, both dynamically imported with `ssr: false`. Do not add a
  third (AMENDMENTS-v1.2).

## Structure

```
app/                  Routes + sitemap, robots, OG image, /api/enquiry
components/home/v3/   The current homepage — 18 sections
components/home/car/  The "whole car" section
components/pages/     Shared inner-page primitives (PageHero, CtaBand)
components/three/     The two 3D scenes (viewport-gated)
components/motion/    Reveal, Tilt, SmoothScroll, IntroVeil, leak-flow
components/ui/        Design-system primitives
components/seo/       JSON-LD structured data
lib/revenue-content.ts  The canonical ten-stage engine
lib/home-content.ts     Homepage copy
lib/content.ts          Copy for /about, /case-studies, /contact
lib/site.ts             Origin, company identity, verified URLs
lib/use-scene-gate.ts   3D scene mount gating
lib/use-in-view.ts      Canvas gating hook
scripts/verify.mjs      The governance checks
```

## Outstanding before launch

| Where | What | Status |
|---|---|---|
| Vercel dashboard | Set `www.arkflowsolutions.com` as PRIMARY so the `.vercel.app` origin 301s to it | Not verified — see `lib/site.ts` |
| `/terms`, `/privacy` | Both carry `PLACEHOLDER — not reviewed by a lawyer` | Legal review owed |
| Privacy page | No cookie disclosure, named DPO, withdrawal-of-consent or third-party list, while GA and GoHighLevel both receive personal data | Outstanding |
| `app/layout.tsx` | Google Analytics loads with no consent gate | Decision owed |
| `components/home/v3/reach.tsx` | Product screenshots — drop into `/public/product/` and return them from `currentShot()`; the illustrative pipeline and its tag swap out automatically | Awaiting assets |
| CI | `verify.mjs` runs only at build. No PR-time gate | Optional |

Deploy with git, not the upload button — the web UI adds and overwrites
but never deletes, which is the exact failure `HOTFIX.md` records.

## Performance & accessibility posture

- Both 3D scenes mount only near the viewport and unmount when far
  (`lib/use-scene-gate.ts`, `lib/use-in-view.ts`); DPR capped at 1.6,
  and 1.25 on the phone profile; `powerPreference: low-power`.
- The leak canvas is plain Canvas 2D, DPR-capped, and stops its loop
  entirely when offscreen or the tab is hidden.
- `prefers-reduced-motion` removes the canvases, the intro veil, Lenis
  and every animation, and forces each progressive state on. The static
  page is fully legible.
- Skip link, visible focus rings, semantic landmarks, one `<h1>` per
  route, `aria-current` nav states, Escape-to-close mobile menu with
  scroll lock, and four keyboard-driven ARIA tab patterns (revenue
  engine, leak stages, industries, car section) with arrow, Home and
  End keys.
- three.js is lazy-chunked and never blocks first paint.
