"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { CarBlueprint } from "@/components/home/car/car-blueprint";
import { useSceneGate } from "@/lib/use-scene-gate";
import { carParts, carSection, journeyStages } from "@/lib/car-content";
import type { CarPartId } from "@/lib/car-content";
import { cn } from "@/lib/utils";

const CarScene = dynamic(() => import("@/components/three/car-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * "ArkFlow is the whole car" — the signature section.
 *
 * Two renderings of one idea, chosen by useSceneGate:
 *   3D  — the procedural vehicle, camera moves, shell separation
 *   2D  — the blueprint elevation, retained as the mobile and
 *         reduced-motion path (it is good work and it still explains
 *         the thing; it is not a downgrade banner)
 *
 * The interaction model, copy, part list and accessibility tree are
 * identical either way.
 */
export function CarSection() {
  const ref = useRef<HTMLElement>(null);
  const { use3d, lite, inView } = useSceneGate(ref);
  const [active, setActive] = useState<CarPartId>("engine");

  return (
    <Section className="hairline" id="the-car" ref={ref}>
      <Container>
        <Reveal>
          <Eyebrow>{carSection.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-display font-semibold">
            {carSection.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {carSection.lead}
          </p>
        </Reveal>

        <DesktopCar
          active={active}
          setActive={setActive}
          use3d={use3d}
          inView={inView}
          lite={lite}
        />
        <MobileCar
          active={active}
          setActive={setActive}
          use3d={use3d}
          inView={inView}
          lite={lite}
        />

        <Reveal>
          <p className="mt-16 max-w-2xl text-subheading font-medium leading-snug">
            {carSection.close}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function DesktopCar({
  active,
  setActive,
  use3d,
  inView,
  lite,
}: {
  active: CarPartId;
  setActive: (id: CarPartId) => void;
  use3d: boolean;
  inView: boolean;
  lite: boolean;
}) {
  const ids = carParts.map((p) => p.id);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = ids.indexOf(active);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive(ids[(i + 1) % ids.length]);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(ids[(i - 1 + ids.length) % ids.length]);
    }
  };

  return (
    <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:items-center">
      <div role="tablist" aria-label="ArkFlow architecture" onKeyDown={onKeyDown}>
        {carParts.map((p) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              id={`car-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`car-panel-${p.id}`}
              tabIndex={on ? 0 : -1}
              onFocus={() => setActive(p.id)}
              onMouseEnter={() => setActive(p.id)}
              onClick={() => setActive(p.id)}
              className={cn("bp-row group", on && "bp-row--on")}
            >
              <span
                className={cn(
                  "font-mono text-eyebrow uppercase transition-colors",
                  on ? "text-blue-soft" : "text-[color:var(--text-tertiary)]"
                )}
              >
                {p.label}
              </span>
              <span
                className={cn(
                  "mt-1.5 block text-body transition-colors",
                  on ? "text-white" : "text-[color:var(--text-secondary)]"
                )}
              >
                {p.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div>
        {use3d ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-ink/60">
            <CarScene part={active} active={inView} lite={lite} />
            <p className="pointer-events-none absolute left-5 top-4 font-mono text-[0.625rem] uppercase tracking-wider text-[color:var(--text-tertiary)]">
              ArkFlow architecture · schematic
            </p>
          </div>
        ) : (
          <CarBlueprint active={active} />
        )}

        {carParts.map((p) => (
          <div
            key={p.id}
            role="tabpanel"
            id={`car-panel-${p.id}`}
            aria-labelledby={`car-tab-${p.id}`}
            hidden={p.id !== active}
            className="mt-6 min-h-[112px] border-t border-[color:var(--border-subtle)] pt-6"
          >
            <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
              {p.body}
            </p>
            {p.id === "destination" && <JourneyChain />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MobileCar({
  active,
  setActive,
  use3d,
  inView,
  lite,
}: {
  active: CarPartId;
  setActive: (id: CarPartId) => void;
  use3d: boolean;
  inView: boolean;
  lite: boolean;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const id = (hit.target as HTMLElement).dataset.part as CarPartId;
        if (id) setActive(id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [setActive]);

  return (
    <div className="mt-12 lg:hidden">
      <div className="sticky top-16 z-10 -mx-6 bg-ink/92 px-6 py-4 backdrop-blur-sm">
        {use3d ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-ink/60">
            <CarScene part={active} active={inView} lite={lite} />
          </div>
        ) : (
          <CarBlueprint active={active} />
        )}
      </div>

      <div className="mt-6">
        {carParts.map((p, i) => (
          <div
            key={p.id}
            data-part={p.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex min-h-[58vh] flex-col justify-center border-t border-[color:var(--border-subtle)] py-10"
          >
            <p
              className={cn(
                "font-mono text-eyebrow uppercase transition-colors",
                p.id === active
                  ? "text-blue-soft"
                  : "text-[color:var(--text-tertiary)]"
              )}
            >
              {p.label}
            </p>
            <p className="mt-3 text-subheading font-medium leading-snug">
              {p.summary}
            </p>
            <p className="mt-4 text-body text-[color:var(--text-secondary)]">
              {p.body}
            </p>
            {p.id === "destination" && <JourneyChain />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function JourneyChain() {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
      {journeyStages.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span className="font-mono text-eyebrow uppercase text-[color:var(--text-secondary)]">
            {s}
          </span>
          {i < journeyStages.length - 1 && (
            <span aria-hidden className="text-blue-soft">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
