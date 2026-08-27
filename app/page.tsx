import { Hero3D } from "@/components/home/v2/hero-3d";
import { TheProblem } from "@/components/home/v2/opening";
import { CarSection } from "@/components/home/car/car-section";
import { EngineJourney, UnifiedInbox } from "@/components/home/v2/middle";
import {
  Packages,
  HowWeWork,
  Faq,
  FinalCta,
} from "@/components/home/v2/closing";
import { InsightsStrip } from "@/components/home/insights-strip";

/**
 * Homepage — nine sections.
 *
 * Reduced from sixteen. The page previously made one argument ("your
 * tools are not connected") five separate times: Ten doors, You already
 * have the parts, The whole car, One connected journey, and Second admin.
 * A reader takes the point at the first. The car survives because the 3D
 * asset carries it and nothing else on the site does that job.
 *
 *  1 Hero                    6 Unified inbox (what it looks like)
 *  2 Commitment strip *      7 Packages + guarantee + Stage 1 focus
 *  3 The problem             8 How we work
 *  4 The whole car           9 FAQ + final CTA
 *  5 Six-stage journey        10 From ArkFlow Intelligence (3 cards)
 *
 *  * renders inside Hero3D.
 *
 * GOVERNANCE — do not reshuffle or remove without founder sign-off:
 *  - The six-stage journey (Attract, Engage, Qualify, Book, Convert,
 *    Retain) is canonical. No stages added, renamed or dropped.
 *  - The Stage 1 disclosure now sits in Packages and the FAQ. It must
 *    appear somewhere on this page.
 *  - No price appears on any public surface.
 *  - Commitments are never restated as achieved performance.
 *
 * MOVED, NOT DELETED: the six-group capability grid, Voice AI, retention
 * and reporting now live on /solutions; the vertical comparison lives on
 * /aesthetic-clinics.
 */
export default function HomePage() {
  return (
    <>
      <Hero3D />
      <TheProblem />
      <CarSection />
      <EngineJourney />
      <UnifiedInbox />
      <Packages />
      <HowWeWork />
      <InsightsStrip />
      <Faq />
      <FinalCta />
    </>
  );
}
