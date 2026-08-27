"use client";

import Link from "next/link";
import type { Article } from "@/lib/insights/types";
import { readingMinutes } from "@/lib/insights/types";
import { categoryBySlug } from "@/lib/insights/categories";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/use-booking";
import { contact } from "@/lib/content";
import { track } from "@/lib/analytics";

export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const category = categoryBySlug(article.category);
  return (
    <Link
      href={`/insights/${article.category}/${article.slug}`}
      onClick={() =>
        track("article_card_click", { location: compact ? "related" : "index" })
      }
      className="group flex h-full flex-col rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-7 transition-colors hover:border-blue/40"
    >
      <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
        {category?.name}
      </p>
      <h3 className="mt-4 text-subheading font-medium leading-snug text-white">
        {article.title}
      </h3>
      {!compact && (
        <p className="mt-3 text-small leading-relaxed text-[color:var(--text-secondary)]">
          {article.description}
        </p>
      )}
      <p className="mt-auto pt-6 font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
        {readingMinutes(article.blocks)} min read
      </p>
    </Link>
  );
}

/**
 * End-of-article CTA.
 *
 * The CTA is chosen by funnel level rather than being identical
 * everywhere (brief §21). A reader on a "what is X" article is not ready
 * for an audit; a reader on an intent article usually is. The primary
 * conversion stays the Lead Response Audit in every case — only the
 * framing and the secondary action change.
 */
export function ArticleCta({ article }: { article: Article }) {
  const openBooking = useBooking(contact.call.href);

  const copy = {
    discovery: {
      title: "Wondering how much of this applies to your business?",
      body: "The Lead Response Audit measures how quickly enquiries to your business actually get answered — using your own numbers, not a benchmark.",
    },
    problem: {
      title: "If you're wondering where your own business is losing enquiries…",
      body: "The Lead Response Audit puts a number on it. Free, thirty minutes, and you keep the findings whether or not you work with us.",
    },
    intent: {
      title: "Ready to see where your business is losing opportunities?",
      body: "Start with the Lead Response Audit. We measure your actual response times across every channel, then recommend one package against what we find.",
    },
  }[article.level];

  return (
    <section className="mt-20 rounded-card border border-blue/30 bg-blue/[0.04] p-8 md:p-10">
      <h2 className="max-w-2xl text-subheading font-medium leading-snug text-white">
        {copy.title}
      </h2>
      <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
        {copy.body}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          onClick={() => {
            track("lead_response_audit_click", { location: "article_cta" });
            openBooking();
          }}
        >
          Get Your Lead Response Audit
        </Button>
        <Button
          variant="secondary"
          href="/how-it-works"
          onClick={() => track("cta_secondary_click", { location: "article_cta" })}
        >
          See How ArkFlow Works
        </Button>
      </div>
    </section>
  );
}

/** The article's onward path into the product. Required on every article. */
export function ArticleSolutionLink({ article }: { article: Article }) {
  return (
    <section className="mt-16 rounded-card border border-[color:var(--border-subtle)] bg-surface/60 p-7">
      <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
        See what ArkFlow can automate
      </p>
      <p className="mt-3 text-body text-[color:var(--text-secondary)]">
        {article.solution.note}
      </p>
      <Link
        href={article.solution.href}
        onClick={() => track("solution_view", { location: "article" })}
        className="mt-5 inline-block text-body text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
      >
        {article.solution.label} &rarr;
      </Link>
    </section>
  );
}

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  return (
    <section className="mt-20">
      <h2 className="text-heading font-medium text-white">Continue exploring</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} compact />
        ))}
      </div>
    </section>
  );
}
