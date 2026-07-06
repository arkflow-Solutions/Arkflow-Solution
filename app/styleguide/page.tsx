import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Internal styleguide — /styleguide
 * The living reference for every visual decision on the site.
 * Not linked from public navigation.
 */

const swatches = [
  { name: "Ink", hex: "#0A0E1A", usage: "Page background, hero" },
  { name: "Surface", hex: "#0F172A", usage: "Cards, header bars" },
  { name: "Electric Blue", hex: "#1A3CFF", usage: "Primary accent — sparingly" },
  { name: "Blue Soft", hex: "#3B82F6", usage: "Hovers, icons" },
  { name: "Platinum", hex: "#D1D5DB", usage: "Secondary text, dividers" },
  { name: "White", hex: "#FFFFFF", usage: "Primary text" },
];

export default function StyleguidePage() {
  return (
    <div className="pt-24">
      <Section>
        <Container>
          <Eyebrow>Design System · v1.0</Eyebrow>
          <h1 className="mt-4 text-display font-semibold">Styleguide</h1>

          {/* Colours */}
          <h2 className="mt-20 text-subheading font-medium">Colour</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((s) => (
              <div
                key={s.hex}
                className="rounded-card border border-[color:var(--border-subtle)] p-5"
              >
                <div
                  className="h-16 rounded-button border border-[color:var(--border-subtle)]"
                  style={{ background: s.hex }}
                />
                <p className="mt-4 text-small font-medium">{s.name}</p>
                <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {s.hex}
                </p>
                <p className="mt-1 text-small text-[color:var(--text-tertiary)]">
                  {s.usage}
                </p>
              </div>
            ))}
          </div>

          {/* Typography */}
          <h2 className="mt-24 text-subheading font-medium">Typography</h2>
          <div className="mt-8 space-y-10">
            <p className="text-display-xl font-semibold">Revenue, operated.</p>
            <p className="text-display font-semibold">Display — section heroes</p>
            <p className="text-heading font-semibold">Heading — section titles</p>
            <p className="text-subheading font-medium">Subheading — card titles</p>
            <p className="max-w-prose text-lead text-[color:var(--text-secondary)]">
              Lead — introductory paragraphs. Comfortable reading width, calm
              rhythm, high contrast.
            </p>
            <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
              Body — the workhorse. Every sentence written like an experienced
              operator: plain, confident, no hype.
            </p>
            <Eyebrow>Eyebrow — Mono utility voice</Eyebrow>
          </div>

          {/* Buttons */}
          <h2 className="mt-24 text-subheading font-medium">Buttons</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button>Book Discovery Call</Button>
            <Button variant="secondary">See Packages</Button>
            <Button variant="ghost">Learn more</Button>
            <Button size="large">Book Discovery Call</Button>
          </div>

          {/* Cards */}
          <h2 className="mt-24 text-subheading font-medium">Cards</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <Eyebrow>Standard</Eyebrow>
              <h3 className="mt-3 text-subheading font-medium">Quiet by default</h3>
              <p className="mt-3 text-small text-[color:var(--text-secondary)]">
                Hairline border, soft shadow, gentle lift on hover.
              </p>
            </Card>
            <Card emphasis>
              <Eyebrow>Emphasis</Eyebrow>
              <h3 className="mt-3 text-subheading font-medium">Blue hairline</h3>
              <p className="mt-3 text-small text-[color:var(--text-secondary)]">
                Reserved for the highlighted package (Operate) and key moments.
              </p>
            </Card>
          </div>

          {/* Signature */}
          <h2 className="mt-24 text-subheading font-medium">
            Signature — the flow line
          </h2>
          <div className="mt-8 flex flex-col items-center gap-2 py-6">
            <p className="font-mono text-eyebrow uppercase text-platinum">Lead</p>
            <div className="flow-line h-16" />
            <p className="font-mono text-eyebrow uppercase text-platinum">Respond</p>
            <div className="flow-line h-16" />
            <p className="font-mono text-eyebrow uppercase text-platinum">Book</p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
