# ArkFlow — arkflow.sg

The digital headquarters of ArkFlow Solutions: a Revenue Operations
partner for Singapore clinics and service businesses.

## Stack

Next.js 14 (App Router, fully static) · React 18 · TypeScript ·
Tailwind CSS · Framer Motion · React Three Fiber · Lenis · Lucide.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes static)
npm run lint
```

## Governance — read before editing

- **All package facts** (names, pricing, fees, terms, guarantee wording)
  live in `lib/content.ts` and are sourced verbatim from the
  **Canonical Package Specification v1.0**. The spec wins over this
  repository. Do not edit package facts here without founder sign-off.
- The design system is documented in `DESIGN-SYSTEM.md` and previewed
  at `/styleguide` (excluded from search indexing).
- The palette is locked by Founder Bible Ch. 2.13.
- The blue rule: one electric-blue (#1A3CFF) element per viewport.
- The 3D budget: exactly three particle scenes (hero, problem, journey),
  all on the home page. Do not add scenes.

## Structure

```
app/                  Routes (all static) + sitemap, robots, OG image
components/home/      Home page sections
components/pages/     Shared inner-page primitives (PageHero, CtaBand)
components/three/     The three particle scenes (viewport-gated)
components/motion/    Reveal, Tilt, SmoothScroll, IntroVeil
components/ui/        Design-system primitives
components/seo/       JSON-LD structured data
lib/content.ts        ALL copy and canonical package facts
lib/use-in-view.ts    Canvas gating hook
```

## Launch checklist — placeholders to replace

| Where | Placeholder | Replace with |
|---|---|---|
| `lib/content.ts` → `contact.call.href` | `#booking` | Live GHL booking-calendar URL |
| `lib/content.ts` → `contact.whatsapp.href` | `wa.me/6500000000` | Live WhatsApp Business number |
| `lib/content.ts` → `contact.email.address` | `hello@arkflow.sg` | Confirmed inbox |
| `app/layout.tsx` + `app/sitemap.ts` + `components/seo/json-ld.tsx` | `https://arkflow.sg` | Confirmed production domain |
| `components/layout/wordmark.tsx` | Text wordmark | Exported SVG logo asset |
| `components/home/trust.tsx` | Logo slot comment | Client logos as case studies publish |

## Performance & accessibility posture

- Every 3D canvas mounts only near the viewport and unmounts when far
  (`lib/use-in-view.ts`); DPR capped at 1.8; `powerPreference: low-power`.
- `prefers-reduced-motion` removes all canvases, the intro veil, Lenis,
  and every animation. The static page is fully legible.
- Skip link, visible focus rings, semantic landmarks, `aria-current`
  nav states, Escape-to-close mobile menu with scroll lock,
  accessible comparison table with row/column headers.
- three.js is lazy-chunked and never blocks first paint.
