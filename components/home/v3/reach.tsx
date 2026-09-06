"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { SectionHead, IllustrativeTag } from "@/components/home/v3/shared";
import { track } from "@/lib/analytics";
import { industries, productUi } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* ===================================================== 14 · INDUSTRIES
 *
 * INDUSTRY-AGNOSTIC BY CONSTRUCTION. The engine is fixed and stated as
 * fixed; only the workflows inside it change per vertical. Aesthetics
 * appears as one option among eight and never first. Do not reorder
 * this list to lead with a vertical.
 */

export function Industries() {
  const [active, setActive] = useState(0);
  const industry = industries.items[active];

  const select = (i: number) => {
    setActive(i);
    track("industry_select", { industry: industries.items[i].key });
  };

  return (
    <Section className="hairline" id="industries">
      <Container>
        <SectionHead
          eyebrow={industries.eyebrow}
          title={industries.title}
          lead={industries.lead}
          wide
        />

        <Reveal className="mt-12">
          <div className="af-chips" role="tablist" aria-label="Choose a business type">
            {industries.items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`ind-tab-${i}`}
                aria-selected={i === active}
                aria-controls="ind-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  const last = industries.items.length - 1;
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    select(active === last ? 0 : active + 1);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    select(active === 0 ? last : active - 1);
                  }
                }}
                className={cn("af-chip-btn", i === active && "af-chip-btn--on")}
              >
                {item.key}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8" delay={0.06}>
          <div
            className="af-ind-panel"
            id="ind-panel"
            role="tabpanel"
            aria-labelledby={`ind-tab-${active}`}
          >
            <div>
              <Eyebrow>Same engine · different workflows</Eyebrow>
              <h3 className="mt-5 text-subheading font-semibold">{industry.key}</h3>
              <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                {industry.lead}
              </p>
              <p className="af-ind-fixed">{industries.fixed}</p>
            </div>

            <div className="af-ind-rows">
              {industry.rows.map((row) => (
                <div key={row.stage} className="af-ind-row">
                  <b>{row.stage}</b>
                  <p>{row.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ==================================================== 15 · PRODUCT UI
 *
 * SCREENSHOT SLOT. This section is built to receive the real ArkFlow /
 * GoHighLevel screenshots. Until they are supplied it renders a
 * representative pipeline, framed as a browser window and labelled
 * illustrative.
 *
 * TO INSERT A REAL SCREENSHOT:
 *   1. Drop the file in /public/product/ (e.g. pipeline.png)
 *   2. Return { src, width, height, alt } from currentShot() below
 *   3. The illustrative pipeline is replaced automatically and the
 *      "Illustrative interface" tag is swapped for the frame label.
 *
 * The frame, the browser chrome and the caption are deliberately
 * ArkFlow's own. A raw GoHighLevel screenshot pasted flat would make
 * ArkFlow look like a reseller; presented inside ArkFlow's own frame
 * with ArkFlow's own annotation, the infrastructure stays infrastructure.
 */

type Shot = { src: string; width: number; height: number; alt: string } | null;

/**
 * Returned from a function rather than declared as a const: a const
 * initialised to null is narrowed to null by control-flow analysis, and
 * the screenshot branch below would then be flagged as unreachable.
 * Set the return value here when the real screenshot lands.
 */
function currentShot(): Shot {
  return null;
}

export function ProductUi() {
  const shot = currentShot();

  return (
    <Section className="hairline" id="the-system">
      <Container>
        <SectionHead
          eyebrow={productUi.eyebrow}
          title={productUi.title}
          lead={productUi.lead}
        />

        <Reveal className="mt-16">
          <div className="af-frame">
            <div className="af-frame__bar">
              <i aria-hidden /><i aria-hidden /><i aria-hidden />
              <span className="af-frame__url">{productUi.frameLabel}</span>
            </div>

            <div className="af-frame__body">
              {shot ? (
                <Image
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt}
                  className="h-auto w-full"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              ) : (
                <div className="af-board">
                  {productUi.columns.map((col) => (
                    <div key={col.heading} className="af-board__col">
                      <div className="af-board__head">
                        <b>{col.heading}</b>
                        <span>{col.records.length}</span>
                      </div>
                      {col.records.map((r) => (
                        <div key={`${col.heading}-${r.name}-${r.meta}`} className="af-rec">
                          <b>{r.name}</b>
                          <span>{r.meta}</span>
                          <span className="af-rec__ch">
                            <ChannelIcon name={r.channel} size={11} />
                            {r.channel}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
              {productUi.note}
            </p>
            {!shot && <IllustrativeTag>Illustrative interface</IllustrativeTag>}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
