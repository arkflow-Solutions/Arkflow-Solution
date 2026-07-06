import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { packages, packageTerms, guarantee } from "@/lib/content";

/**
 * Package preview — copy and facts verbatim from the Canonical Package
 * Specification v1.0 (§10 matrix, §11 website copy). Operate is the
 * visually emphasised default: raised, blue hairline, and a faint
 * ambient light behind it — depth, not glow.
 */
export function Packages() {
  return (
    <Section id="packages" className="hairline relative overflow-hidden">
      {/* Ambient light pooled behind the emphasised card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,60,255,0.07)_0%,transparent_65%)]"
      />

      <Container>
        <Reveal className="text-center">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-heading font-semibold">
            Three packages. One system. Pick your stage.
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
            Every package builds on the one before it — nothing is ever taken
            away as you grow, and upgrades carry no second implementation fee.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08}>
              <Tilt>
                <Card
                  emphasis={pkg.emphasis}
                  className={pkg.emphasis ? "lg:-mt-4 lg:pb-10" : ""}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-eyebrow uppercase text-blue-soft">
                      {pkg.name}
                    </p>
                    {"badge" in pkg && pkg.badge && (
                      <span className="rounded-full bg-blue px-3 py-1 font-mono text-eyebrow uppercase text-white">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-subheading font-medium">
                    {pkg.headline}
                  </h3>

                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-heading font-semibold">
                      {pkg.price}
                    </span>
                    <span className="text-small text-[color:var(--text-tertiary)]">
                      /month
                    </span>
                  </p>
                  <p className="mt-2 text-small text-[color:var(--text-tertiary)]">
                    {pkg.priceNote}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-small text-[color:var(--text-secondary)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-success"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      href={`/packages#${pkg.id}`}
                      variant={pkg.emphasis ? "primary" : "secondary"}
                      className="w-full"
                      withArrow={pkg.emphasis}
                    >
                      Explore {pkg.name}
                    </Button>
                  </div>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-2 text-center">
            <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              {packageTerms.implementationFee}&ensp;·&ensp;
              {packageTerms.minimumTerm}
            </p>
            <p className="mt-3 max-w-prose text-small text-[color:var(--text-secondary)]">
              Every package is backed by the {guarantee.name}: {guarantee.summary}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
