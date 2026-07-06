# ArkFlow Design System — v1.0 (Phase 1)

Source of truth: Founder Bible Ch. 2.13 (Brand Assets). The palette below is
canonical and locked. Any deviation requires founder sign-off.

## Colour

| Token | Hex | Usage |
|---|---|---|
| ink | #0A0E1A | Page background, hero sections |
| surface | #0F172A | Cards, header bars, secondary backgrounds |
| blue (electric) | #1A3CFF | Primary accent — buttons, links, logo accent. **Use sparingly.** |
| blue-soft | #3B82F6 | Hover states, secondary accents, icons |
| platinum | #D1D5DB | Secondary text, dividers |
| white | #FFFFFF | Primary text on dark |
| success / warning / critical | #059669 / #D97706 / #DC2626 | Functional states only — never decorative |

**The blue rule:** one electric-blue element per viewport. Blue creates
emphasis; scarcity keeps it powerful.

## Typography

- **Sans (display + body):** Inter, falling back to Helvetica Neue / system.
- **Mono (utility):** JetBrains Mono — eyebrows, metrics, system labels.
  This is the operational voice: ArkFlow runs namespaced automations
  (ARK-, WF-) and its typography carries that same precision.

Scale (fluid): display-xl → display → heading → subheading → lead → body →
small → eyebrow. Tight negative tracking on display sizes. Reading width
capped at 42rem.

## Layout

- Container: 72rem max, 24/40px gutters.
- Section rhythm: 96–144px vertical padding. Whitespace is a decision.
- Borders: 1px hairlines at white/8% (white/14% on hover).
- Radius: 16px cards, 10px buttons.
- Shadows: soft, layered, never harsh.

## Motion (Framer Motion)

- One primitive: `<Reveal>` — fade up 24px, 0.7s, cubic-bezier(0.22,1,0.36,1),
  triggers once at -80px viewport margin.
- Cards lift 4px on hover. Buttons scale 0.98 on press.
- `prefers-reduced-motion` respected globally.

## Signature element

**The flow line** — a 1px vertical gradient connector with a glowing blue
node, drawn from the logo swoosh and the Lead → Respond → Book → Operate →
Scale journey. Used in section transitions and process diagrams. One per view.

## Accessibility floor

Visible focus rings (blue-soft, 2px, offset 3px), skip link, semantic
landmarks, reduced-motion support, AA contrast throughout.
