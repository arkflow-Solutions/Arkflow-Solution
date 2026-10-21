import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";
import { categories, categoryBySlug } from "@/lib/insights/categories";

/* Category pillar card. */
export const runtime = "edge";
export const alt = "An ArkFlow Insights category";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default function Image({ params }: { params: { category: string } }) {
  const category = categoryBySlug(params.category);
  return ogCard({
    title: category?.title ?? "ArkFlow Insights",
    eyebrow: "Insights",
  });
}
