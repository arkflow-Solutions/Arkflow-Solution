import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Trust strip — honest by design. ArkFlow is earning its track record
 * through the founding-clinic programme and a guarantee that puts the
 * risk on ArkFlow. Client logos slot in here as case studies publish.
 */
export function Trust() {
  return (
    <section className="hairline py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <p className="max-w-2xl text-body text-[color:var(--text-secondary)]">
              We put our own revenue behind yours. Every ArkFlow system is
              backed by the 30-Day Response Guarantee — measured proactively,
              refunded without being asked. Founding clinics receive waived
              implementation in exchange for a published case study.
            </p>
            {/* Client logos publish here as founding case studies complete. */}
            <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              Founding cohort · Now open
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
