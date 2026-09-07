import { Hero } from "@/components/home/v3/hero";
import { SceneUnanswered } from "@/components/home/scenes/unanswered";
import { SceneDays } from "@/components/home/scenes/days";
import { Reactivation } from "@/components/home/v3/lifecycle";
import { SceneDesk } from "@/components/home/scenes/desk";
import { SceneTransformation } from "@/components/home/scenes/transformation";
import { AiConversation } from "@/components/home/v3/demo";
import { HumanAndAi } from "@/components/home/v3/system";
import { SceneJourney } from "@/components/home/scenes/journey";
import { SystemAndClose } from "@/components/home/v3/close";
import { InsightsStrip } from "@/components/home/insights-strip";

/**
 * Homepage — ten scenes, one continuous story (Phase 3E).
 *
 * WHAT CHANGED, AND WHY.
 *
 * The previous homepage was eighteen sections and ~2,945 rendered words
 * — roughly fifteen minutes of reading — and it explained ArkFlow in
 * vocabulary the visitor has no reason to know: revenue operations,
 * pipelines, qualification, integrations. The structure was right. The
 * mechanism was not: every section led with a heading and a lead
 * paragraph, and the visual illustrated an argument the prose was
 * carrying.
 *
 * This page inverts that. The visitor is a business owner who may know
 * nothing about AI, CRM or automation, and who will read perhaps a
 * quarter of the text. So each scene shows a familiar business moment
 * failing, then shows the same moment working, and the copy only names
 * what is already on screen.
 *
 * THE TEST every scene had to pass:
 *   If the visitor only watches the animation and reads the headline,
 *   do they understand what problem ArkFlow is solving?
 *
 * THE ORDER, and the feeling it is built to produce:
 *   01  Opening          Something is wrong
 *   02  Unanswered       That's my business
 *   03  The days pass    That's another problem I have
 *   04  Disappearing     My customers do that too
 *   05  The desk         My staff are doing this by hand
 *   06  Transformation   Wait — these are all the same problem
 *   07  Conversation     Show me how it actually works
 *   08  Human + AI       It knows when to stop
 *   09  The journey      I can see the whole thing
 *   10  System + close   Who you are, and what to do next
 *
 * ONE THROUGHLINE. Scenes 02, 03, 05 and 06 are lit by the Phase 3D
 * luminance system, keyed to the canonical stage each one is about, so
 * the environment moves through the Revenue Engine as the visitor
 * scrolls. Scene 06 seals it. Scene 09 shows the whole line. They are
 * views of one system, not ten animations.
 *
 * ────────────────────────────────────────────────────────────────
 * SECTIONS REMOVED FROM THIS PAGE — COMPONENTS DEPRECATED, NOT DELETED
 *
 * Every one of these still exists and still compiles. They are off the
 * homepage for focus, words and performance budget, and are available
 * for /how-it-works, /solutions or a future experience:
 *
 *   CarSection      the analogy. 365 words and one of only two WebGL
 *                   scenes, spent explaining rather than showing.
 *                   Removing it is what pays for the new scenes.
 *                   PRESERVED for /how-it-works — founder instruction.
 *   RevenueLeak     the pinned canvas lives on in the hero; the
 *                   eight-stage tab list belongs on /how-it-works.
 *   Fragmentation   its channel chips became the hero's doors.
 *   WhatArkflow     folded into the closing scene.
 *   RevenueEngine   superseded by SceneJourney, which shows the same
 *                   canonical ten stages in plain English.
 *   CustomerJourney merged into SceneJourney.
 *   BeforeAfter     became SceneTransformation.
 *   Capabilities    folded into the closing scene.
 *   Retention       folded into scene 04.
 *   MultiLocation   a growth-stage concern; belongs on /solutions.
 *   Industries      belongs on /solutions. Verified safe to move: the
 *                   governance-required Stage 1 commercial-focus
 *                   disclosure lives on /aesthetic-clinics, not here.
 *   ProductUi       folded into the closing scene.
 *   WhyArkflow      six rows compressed to three ideas in the close.
 *   AuditSection    its recognition list survives inside the close;
 *                   the duplicate CTA block does not.
 *   FinalCta        merged into the close.
 * ────────────────────────────────────────────────────────────────
 *
 * GOVERNANCE — unchanged and still enforced by scripts/verify.mjs:
 *  - The canonical ten-stage Revenue Engine is intact. Scene 09 shows
 *    PUBLIC LABELS from lib/stage-labels.ts (Website, Enquiry, …); the
 *    keys are untouched and check 4 asserts them.
 *  - "Book a Discovery Call" is the only primary CTA. It opens the
 *    booking modal. The Revenue Leak Audit funnel must NOT be linked —
 *    check 12 fails the build if it reappears.
 *  - No pricing, package names, guarantees or contract terms.
 *  - No invented clients, results, statistics or testimonials, and no
 *    guaranteed outcome anywhere: scene 03 ends on a CONFIRMED
 *    appointment, never on an attended one.
 *
 * PERFORMANCE: ONE 3D scene on this page — the hero. The car scene is
 * gone, and every new scene is DOM/SVG/CSS. One Canvas 2D loop, the
 * hero's LeakFlow fallback. No new dependencies.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SceneUnanswered />
      <SceneDays />
      <Reactivation />
      <SceneDesk />
      <SceneTransformation />
      <AiConversation />
      <HumanAndAi />
      <SceneJourney />
      <SystemAndClose />
      {/* After the close, deliberately: internal links to the insights
          library are worth keeping for SEO, but they are not part of
          the story and must not interrupt it. */}
      <InsightsStrip />
    </>
  );
}
