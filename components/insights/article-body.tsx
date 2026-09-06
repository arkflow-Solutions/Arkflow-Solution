import Link from "next/link";
import type { Article, Block } from "@/lib/insights/types";
import { toc } from "@/lib/insights/types";
import { authors, categoryBySlug } from "@/lib/insights/categories";
import {
  FlowDiagram,
  CompareDiagram,
  MetricsDiagram,
  ArticleImage,
} from "@/components/insights/diagrams";

/** Renders one content block. Deliberately plain — reading comfort over effect. */
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-body leading-relaxed text-[color:var(--text-secondary)]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-16 scroll-mt-28 text-heading font-medium leading-tight text-white"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 text-subheading font-medium text-white">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-body text-[color:var(--text-secondary)]"
            >
              <span
                aria-hidden
                className="mt-3 h-px w-3 shrink-0 bg-blue-soft"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 text-body text-[color:var(--text-secondary)]"
            >
              <span className="font-mono text-small text-blue-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="mt-8 space-y-6">
          {block.items.map((item, i) => (
            <li key={item.label} className="flex gap-5">
              <span className="mt-1 font-mono text-small text-blue-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-body font-medium text-white">{item.label}</p>
                <p className="mt-1.5 text-body text-[color:var(--text-secondary)]">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="mt-10 rounded-card border border-blue/30 bg-blue/[0.04] p-6 md:p-8">
          {block.title && (
            <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
              {block.title}
            </p>
          )}
          <p className="mt-3 text-body leading-relaxed text-white">
            {block.text}
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-blue-soft pl-6 text-subheading font-medium leading-snug text-white">
          {block.text}
        </blockquote>
      );
    case "table":
      return (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-small">
            <thead>
              <tr className="hairline border-b">
                {block.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-3 pr-6 font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row.join("|")}
                  className="border-b border-[color:var(--border-subtle)]"
                >
                  {row.map((cell, i) => (
                    <td
                      key={cell}
                      className={
                        i === 0
                          ? "py-4 pr-6 align-top font-medium text-white"
                          : "py-4 pr-6 align-top text-[color:var(--text-secondary)]"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "flow":
      return <FlowDiagram block={block} />;
    case "compare":
      return <CompareDiagram block={block} />;
    case "metrics":
      return <MetricsDiagram block={block} />;
    case "image":
      return <ArticleImage block={block} />;
  }
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="mx-auto max-w-[68ch]">
      {article.blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  );
}

export function ArticleToc({ article }: { article: Article }) {
  const items = toc(article.blocks);
  if (items.length < 3) return null;
  return (
    <nav
      aria-label="On this page"
      className="mt-12 rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-6"
    >
      <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
        On this page
      </p>
      <ol className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-small text-platinum transition-colors hover:text-white"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  const author = authors[article.authorId];
  const category = categoryBySlug(article.category);
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-[color:var(--text-tertiary)]">
      {category && (
        <Link
          href={`/insights/${category.slug}`}
          className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft transition-colors hover:text-white"
        >
          {category.name}
        </Link>
      )}
      {author && (
        <span>
          <span className="text-platinum">{author.name}</span> · {author.role}
        </span>
      )}
      <time dateTime={article.published}>{fmt(article.published)}</time>
      {article.updated && <span>Updated {fmt(article.updated)}</span>}
    </div>
  );
}
