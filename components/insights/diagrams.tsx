import Image from "next/image";
import type { Block } from "@/lib/insights/types";

/**
 * Article diagrams.
 *
 * Rendered as components rather than image files: they stay sharp at any
 * size, inherit the design system, cost no bandwidth, and can be edited
 * as text. No stock photography anywhere — a generic photo of a clinic
 * implies a client relationship that does not exist.
 */

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <figcaption className="mt-4 text-small text-[color:var(--text-tertiary)]">
      {text}
    </figcaption>
  );
}

/** Process chain. Row on desktop, stack on mobile. */
export function FlowDiagram({
  block,
}: {
  block: Extract<Block, { type: "flow" }>;
}) {
  return (
    <figure className="mt-10">
      <div className="rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-6 md:p-8">
        <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
          {block.steps.map((step, i) => (
            <li key={step.label} className="flex flex-1 items-stretch gap-2">
              <div
                className={[
                  "flex-1 rounded-button border p-4",
                  step.state === "loss"
                    ? "border-dashed border-[color:var(--text-tertiary)]/40 bg-transparent"
                    : "border-blue/30 bg-blue/[0.05]",
                ].join(" ")}
              >
                <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={[
                    "mt-2 text-small font-medium leading-snug",
                    step.state === "loss"
                      ? "text-[color:var(--text-tertiary)] line-through decoration-1"
                      : "text-white",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                {step.note && (
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-[color:var(--text-secondary)]">
                    {step.note}
                  </p>
                )}
              </div>
              {i < block.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden shrink-0 self-center font-mono text-blue-soft md:block"
                >
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

/** Two-column comparison. */
export function CompareDiagram({
  block,
}: {
  block: Extract<Block, { type: "compare" }>;
}) {
  const column = (side: typeof block.left) => (
    <div
      className={[
        "rounded-card border p-6",
        side.tone === "loss"
          ? "border-[color:var(--border-subtle)] bg-transparent"
          : "border-blue/30 bg-blue/[0.04]",
      ].join(" ")}
    >
      <p
        className={[
          "font-mono text-eyebrow uppercase tracking-wider",
          side.tone === "loss"
            ? "text-[color:var(--text-tertiary)]"
            : "text-blue-soft",
        ].join(" ")}
      >
        {side.title}
      </p>
      <ul className="mt-5 space-y-3">
        {side.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-small leading-relaxed text-[color:var(--text-secondary)]"
          >
            <span
              aria-hidden
              className={[
                "mt-2 h-px w-3 shrink-0",
                side.tone === "loss"
                  ? "bg-[color:var(--text-tertiary)]"
                  : "bg-blue-soft",
              ].join(" ")}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <figure className="mt-10">
      <div className="grid gap-4 md:grid-cols-2">
        {column(block.left)}
        {column(block.right)}
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

/**
 * Figures at display size.
 *
 * The provenance note renders directly beneath and cannot be omitted —
 * the type requires it. A large number without a source line is how a
 * planning assumption turns into an implied client result.
 */
export function MetricsDiagram({
  block,
}: {
  block: Extract<Block, { type: "metrics" }>;
}) {
  return (
    <figure className="mt-10">
      <div className="rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-6 md:p-8">
        <dl className="grid gap-8 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label}>
              <dd className="text-heading font-semibold leading-none text-white">
                {item.value}
              </dd>
              <dt className="mt-3 text-small leading-snug text-[color:var(--text-secondary)]">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-8 border-t border-[color:var(--border-subtle)] pt-4 font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
          {block.note}
        </p>
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

/**
 * Real image. Lazy-loaded and explicitly sized so the page does not shift
 * as it loads. Put files in /public/insights/.
 */
export function ArticleImage({
  block,
}: {
  block: Extract<Block, { type: "image" }>;
}) {
  return (
    <figure className="mt-10">
      <div className="overflow-hidden rounded-card border border-[color:var(--border-subtle)]">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 720px"
          className="h-auto w-full"
        />
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}
