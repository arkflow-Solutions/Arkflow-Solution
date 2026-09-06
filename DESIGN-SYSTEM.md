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
node, drawn from the logo swoosh and the canonical Revenue Engine:
Attract → Capture → Respond → Qualify → Book → Convert → Follow Up →
Retain → Reactivate → Grow. Used in section transitions and process
diagrams. One per view.

CORRECTED 6 September 2026: this previously named the "Lead → Respond →
Book → Operate → Scale" journey. Those are superseded tier names, not
stages, and the six-stage journey they belonged to is explicitly barred
by `scripts/verify.mjs` check 4. The ten stages above are canonical and
live in `lib/revenue-content.ts`.

## Accessibility floor

Visible focus rings (blue-soft, 2px, offset 3px), skip link, semantic
landmarks, reduced-motion support, AA contrast throughout.

---

# Cinematic layer — v2.0 (Phase 3)

Added 7 September 2026. Practical rules for the cinematic evolution.
Everything above still applies; this does not replace it.

## Colour semantics

The palette is unchanged. What is new is that three colours now **mean**
something specific, and are not available for decoration.

| Colour | Token | Means | Permitted where |
|---|---|---|---|
| Electric blue | `--blue` `#1A3CFF` | Revenue moving | One element per viewport |
| Soft blue | `--blue-soft` `#3B82F6` | Interaction, hover, focus | Anywhere interactive |
| Amber | `--warning` `#D97706` | **Revenue leaking** | Only at a gap |
| Green | `--success` `#059669` | **A human took over** | Only at a branch |

Every amber pixel means revenue is being lost. Every green pixel means a
person took over from the system. If a design needs a warm accent for
any other reason, it does not get one.

No purple. No new hues. Depth comes from luminance and atmosphere.

## The Throughline

One opportunity moving through the ArkFlow system, shown at different
levels of magnification. The model is `lib/throughline.ts`; every
renderer samples it so a node at `t = 0.4` is the same point in the story
whether drawn in SVG, canvas or 3D.

**Vocabulary** — these describe events, not decoration:

| Term | Meaning | Stages |
|---|---|---|
| Line | Opportunity moving | — |
| Node | A decision or event | Attract, Qualify, Convert |
| Gap | An unattended handover where revenue leaks | Capture, Book, Follow Up |
| Branch | A person takes over from the system | Respond |
| Return | The line comes back rather than ending | Retain, Reactivate |
| Completion | The journey compounds | Grow |

**The five rules:**

1. One Throughline per page or scene. Never two competing paths.
2. It changes state, never identity. The same line throughout.
3. Direction follows reading order — left to right, or top to bottom.
4. It is drawn only when carrying meaning. Never ambient.
5. Reduced motion resolves to the final state, with the same information
   present. The meaning never lives in the animation.

**Renderers:** `ThroughlineSvg` (static, no per-frame cost),
`ThroughlineCanvas` (movement is the argument), and eventually R3F using
`projectToWorld()`. Pick by whether the visitor needs to *watch* it.

## Depth — four planes

| Plane | z | Contents | Motion |
|---|---|---|---|
| Atmosphere | 0 | Gradients, ambient falloff | ≤ 0.1× scroll |
| Structure | 10 | Throughline, geometry, canvas | Scroll-driven |
| Surface | 20 | Glass panels, controls | Enters on view |
| Content | 30 | Text, CTAs | Reveal only |

Content is always the top plane and is never occluded. Depth is a
reading aid, not decoration.

## Glass

Glass means one thing: **a surface the system renders information onto.**

| Permitted | Forbidden |
|---|---|
| Live system state | Prose containers |
| Floating controls over a scene | Marketing cards |
| The booking modal | Whole sections |
| Data readouts | Navigation |

- `backdrop-blur` **maximum 12px**
- Background **maximum 8% white**
- **Always** a hairline border
- **Never** two overlapping glass layers

If the reader has to work to read it, it is not glass, it is fog.

## Motion

Three durations. One curve.

| Duration | Use |
|---|---|
| **200ms** | Micro — hover, focus, button press |
| **400ms** | Reveal — content entering the viewport |
| **700ms** | Scene — transitions between sections |

Easing is `ease-premium` — `cubic-bezier(0.22, 1, 0.36, 1)` — everywhere.
No second curve, no bounce, no spring overshoot.

Nothing loops without meaning. Motion confirms or explains; it never
performs. Scroll is native, smoothed by Lenis, never hijacked. Maximum
**two pinned sections site-wide**, and a pin is only justified when the
scrolling *is* the interaction.

## Performance contract

Hard limits. These are design constraints, not QA targets.

| Constraint | Limit |
|---|---|
| Simultaneous WebGL contexts | **1** — never two |
| Total WebGL scenes | **2** (hero, car) |
| Active Canvas 2D loops | **1**, stopped offscreen and on tab hide |
| First Load JS on `/` | **≤ 190 kB** |
| Texture files | **0** — runtime canvas gradients only |
| Shadow maps | none |
| Post-processing | none |
| New dependencies | **0** without explicit justification |

Every scene uses `useSceneGate` and `frameloop="demand"`. The gate
already returns `none` for reduced motion, missing WebGL2, or ≤ 2 cores.

No GSAP. Framer Motion, Lenis, `useScrollProgress` and R3F `useFrame`
cover the planned experience; a second scroll-animation authority would
create competing timelines.

## Accessibility

- **No information exclusively in WebGL or canvas.** Every scene has a
  DOM equivalent.
- Decorative canvases and SVGs are `aria-hidden`; labels live in DOM.
- Reduced motion resolves to the **final state**, never a blank frame.
- Contrast is maintained over atmospheric backgrounds — text over a
  gradient is the risk point.
- Keyboard reaches everything. No scroll-only or hover-only affordances.

## Mobile

Re-framed, not shrunk.

| | Desktop | Mobile |
|---|---|---|
| DPR | 1.6 | 1.25 |
| Antialias | on | off |
| GPU hint | high-performance | default |
| Camera | fov 28 | fov 36, pulled back |
| Pointer parallax | on | off |

Phones get a real scene with fewer elements, not a flat substitute.
