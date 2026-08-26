# Canonical Package Specification — v1.2 Amendment Note

**Amends:** AMENDMENTS-v1.1, Amendment 3 (Website design and motion rules)
**Status:** Founder-approved · 15 August 2026
**Owner:** Founder (never delegated)
**Scope:** One amendment. Amendments 1 and 2 (Voice AI placement, public quotation pricing) are unaffected and remain in force.

---

## Amendment 4 — 3D and WebGL, permitted where explanatory

### What v1.1 said

Amendment 3 listed under **not permitted**: *"excessive parallax, bouncing elements, unnecessary autoplay effects, distracting loops, WebGL of any kind."*

It also recorded the consequence: *"Three.js, `@react-three/fiber` and `@types/three` are removed from the project."*

### Why that rule existed

The WebGL in the project at the time — six scenes, including the page-wide particle field — was **decorative background ambience**. It shipped roughly 600KB gzipped and explained nothing. Against a mobile-performance requirement, ambience that carries no meaning is a straight loss.

That reasoning was sound for what was being judged. It does not extend to what is now proposed.

### What v1.2 says

**3D and WebGL are permitted where they materially contribute to explaining ArkFlow's product, architecture or customer journey.**

**Decorative 3D remains prohibited.** The test is not "does this look impressive" — it is "does a visitor understand ArkFlow better because this exists." A scene that fails that test is removed, not optimised.

This is the same principle Amendment 3 already established for motion — *motion that carries meaning is permitted; motion that performs is not* — applied consistently to geometry.

### Principles retained in full

- No visual clutter
- No excessive parallax
- No distracting loops
- No gratuitous animation
- No cyberpunk or sci-fi gimmickry
- No performance cost without clear user value
- `prefers-reduced-motion` honoured throughout
- Heavy scenes load progressively
- Multiple heavy scenes never render simultaneously

### Implementation constraints

Dynamic import and Suspense boundaries on every 3D scene. Rendering paused when a scene is out of viewport. Resources disposed on unmount. Geometry procedural and low-poly; textures avoided rather than compressed. A meaningful mobile path and a meaningful reduced-motion path — a simplified experience, never a removed one.

### Colour and typography

Unchanged from Amendment 3. `#0A0E1A` background, `#1A3CFF` accent, `#D1D5DB` secondary text, Inter with JetBrains Mono for system labels. The "one electric-blue element per viewport" rule now yields to the 3D sections, which are the deliberate exception by design rather than by oversight.

### The vehicle asset

The ArkFlow vehicle is **procedural — generated in code**. No purchased model, no scanned asset, no manufacturer likeness. This is a deliberate art-direction choice, not a budget compromise: the brief calls for a *conceptual digital operating vehicle*, not a car advertisement, and a photoreal consumer vehicle would be the wrong object regardless of cost.

The consequence is recorded honestly: there is no modelled cockpit or engine bay to fly a camera into. Interior reveals are achieved by **shell separation** — the vehicle opens and the relevant subsystem resolves inside the volume — rather than by simulating mechanical interiors the model does not have.

---

## Standing record of amendments

| # | Subject | Spec sections | Status |
|---|---|---|---|
| 1 | Voice AI is Scale-only | §04, §06, §09, §10 | In force (v1.1) |
| 2 | No public pricing; quotation model | §09, §11, §12 | In force (v1.1) |
| 3 | Website design tokens and motion | §12 | In force (v1.1), superseded in part by 4 |
| 4 | 3D/WebGL permitted where explanatory | §12 | In force (v1.2) |

Nothing else in Canonical Package Specification v1.0 is amended. Package names, scope, stacking, upgrade rules, boundaries, implementation timeline, the 30-Day Response Guarantee and all internal commercial terms stand as written.
