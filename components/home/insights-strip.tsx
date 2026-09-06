import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/home/v2/shared";
import { ArticleCard } from "@/components/insights/article-cta";
import { latestArticles } from "@/lib/insights";

/**
 * "From ArkFlow Intelligence" — three articles, nothing more.
 *
 * The homepage was deliberately cut to nine sections; a blog feed is
 * exactly the kind of thing that quietly undoes that. Three cards and a
 * link out (brief §34). Renders nothing when no articles are published,
 * so the section cannot appear empty.
 */
export function InsightsStrip() {
  const articles = latestArticles(3);
  if (!articles.length) return null;

  return (
    <Section className="hairline">
      <Container>
        <SectionHead
          eyebrow="ArkFlow Intelligence"
          title="How service businesses make and lose money."
          lead="Practical writing on the gaps between an enquiry arriving and a customer coming back."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} compact />
          ))}
        </div>
        <Link
          href="/insights"
          className="mt-10 inline-block text-body text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
        >
          Explore ArkFlow Intelligence &rarr;
        </Link>
      </Container>
    </Section>
  );
}
