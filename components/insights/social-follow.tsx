"use client";

import { useEffect, useRef } from "react";
import { activeSocials } from "@/lib/social";
import { track } from "@/lib/analytics";

/**
 * Secondary social prompt.
 *
 * Deliberately quiet and placed after the audit CTA (brief §19): social
 * follow is not the conversion. Renders nothing when no profile has a
 * verified URL, so the Facebook link simply does not exist until its URL
 * is supplied rather than appearing as a dead link.
 */
export function SocialFollow() {
  if (!activeSocials.length) return null;

  return (
    <aside className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[color:var(--border-subtle)] pt-8">
      <p className="text-small text-[color:var(--text-tertiary)]">
        More practical automation notes:
      </p>
      {activeSocials.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track(s.id === "instagram" ? "instagram_click" : "facebook_click", {
              location: "article_footer",
            })
          }
          className="text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
        >
          {s.label}
        </a>
      ))}
    </aside>
  );
}

/**
 * Scroll-depth tracking for articles. Fires article_view on mount, then
 * article_50_percent and article_complete once each. Uses a passive
 * listener and unhooks itself after the final milestone.
 */
export function ArticleTracking({
  slug,
  category,
  level,
}: {
  slug: string;
  category: string;
  level: string;
}) {
  const fired = useRef({ half: false, done: false });

  useEffect(() => {
    track("article_view", { slug, category, level });

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = window.scrollY / scrollable;

      if (pct >= 0.5 && !fired.current.half) {
        fired.current.half = true;
        track("article_50_percent", { slug, category, level });
      }
      if (pct >= 0.9 && !fired.current.done) {
        fired.current.done = true;
        track("article_complete", { slug, category, level });
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, category, level]);

  return null;
}
