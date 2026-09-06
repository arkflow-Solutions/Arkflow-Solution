import { Hero } from "@/components/home/v3/hero";
import { RevenueLeak, Fragmentation, WhatArkflow } from "@/components/home/v3/problem";
import { CarSection } from "@/components/home/car/car-section";
import { RevenueEngine } from "@/components/home/v3/engine";
import { AiConversation, CustomerJourney } from "@/components/home/v3/demo";
import { BeforeAfter, Capabilities, HumanAndAi } from "@/components/home/v3/system";
import { Retention, Reactivation, MultiLocation } from "@/components/home/v3/lifecycle";
import { Industries, ProductUi } from "@/components/home/v3/reach";
import { WhyArkflow, AuditSection, FinalCta } from "@/components/home/v3/close";
import { InsightsStrip } from "@/components/home/insights-strip";

/**
 * Homepage — eighteen sections, one continuous argument.
 *
 * THE STORY, in order:
 *   01  Hero               Your business is leaking revenue
 *   02  Revenue leak       Where it disappears, stage by stage
 *   03  Fragmentation      Why: the systems are not connected
 *   04  What ArkFlow is    One connected revenue operating layer
 *   04b The whole car      The same idea as an analogy (preserved)
 *   05  Revenue engine     The canonical ten stages, interactive
 *   06  AI conversation    The system demonstrated, including its limits
 *   07  Customer journey   One person, end to end
 *   08  Before / after     The transformation, performed
 *   09  Capabilities       What ArkFlow brings together
 *   10  Human + AI         Where the machine stops
 *   11  Retention          The sale is not the end
 *   12  Reactivation       Dormant customers are unfinished business
 *   13  Multi-location     One system across a growing business
 *   14  Industries         One architecture, many business models
 *   15  Product UI         Real infrastructure (screenshot slot)
 *   16  Why ArkFlow        Software is easy, operating it is not
 *   17  Audit              The Revenue Leak Audit, the one conversion
 *   18  Final CTA          The closing question
 *
 * GOVERNANCE — do not change without founder sign-off:
 *  - The ten-stage Revenue Engine is canonical. The previous six-stage
 *    journey (Attract, Engage, Qualify, Book, Convert, Retain) is
 *    SUPERSEDED and must not be reintroduced anywhere.
 *  - No pricing, package names, guarantees or contract terms appear on
 *    any public surface. The Packages section that used to sit between
 *    the unified inbox and How we work is removed for that reason.
 *  - The Revenue Leak Audit is the only primary CTA. It links out to
 *    go.arkflowsolutions.com/audit and is never recreated inline.
 *  - Positioning stays industry-agnostic. Aesthetics is one vertical in
 *    the Industries selector and never leads.
 *  - No invented clients, results, statistics or testimonials. Anything
 *    representative is labelled illustrative in the UI itself.
 *
 * PERFORMANCE: two 3D scenes on this page, hero and car, exactly as
 * before. Both are viewport-gated and both have a real 2D path. No
 * third scene may be added (AMENDMENTS-v1.2 scene budget).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <RevenueLeak />
      <Fragmentation />
      <WhatArkflow />
      <CarSection />
      <RevenueEngine />
      <AiConversation />
      <CustomerJourney />
      <BeforeAfter />
      <Capabilities />
      <HumanAndAi />
      <Retention />
      <Reactivation />
      <MultiLocation />
      <Industries />
      <ProductUi />
      <WhyArkflow />
      <InsightsStrip />
      <AuditSection />
      <FinalCta />
    </>
  );
}
