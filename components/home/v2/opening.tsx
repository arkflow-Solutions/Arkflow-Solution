"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/home/v2/shared";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { tenDoors } from "@/lib/home-content";

/* =================================================== 3 · THE PROBLEM
 *
 * Was "Ten doors" + "You already have the parts" — two sections making
 * one point. Merged: the numbered path is the diagram, the chips are the
 * absorbed second section, and the six-bullet cost list was cut because
 * it restated the lead in prose.
 */

export function TheProblem() {
  return (
    <Section className="hairline" id="the-problem">
      <Container>
        <SectionHead
          eyebrow={tenDoors.eyebrow}
          title={tenDoors.title}
          lead={tenDoors.lead}
        />

        <Reveal className="mt-16">
          <ol className="grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
            {tenDoors.path.map((p, i) => (
              <li key={p.step} className="bg-surface/60 p-6">
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-body font-medium text-white">{p.step}</p>
                <p className="mt-1 text-small text-[color:var(--text-secondary)]">
                  {p.where}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-16">
          <ul className="flex flex-wrap gap-3">
            {tenDoors.parts.map((part) => (
              <li
                key={part}
                className="flex items-center gap-2.5 rounded-button border border-[color:var(--border-subtle)] bg-surface/50 px-5 py-3 text-small text-[color:var(--text-secondary)]"
              >
                <ChannelIcon name={part} className="text-blue-soft" />
                {part}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <p className="max-w-2xl text-subheading font-medium leading-snug">
            {tenDoors.close}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

