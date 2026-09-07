"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — gentle scroll inertia site-wide. Skipped entirely
 * under prefers-reduced-motion so native scrolling is untouched.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12 });
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /**
     * IN-PAGE ANCHORS.
     *
     * Lenis takes ownership of scrolling, which silently breaks native
     * hash navigation: with it running, setting location.hash moves the
     * page by exactly 0px. Every in-page anchor on the site was
     * therefore dead — the hero's "See where", #enquiry on /contact,
     * and /solutions' link to /#revenue-leak-audit.
     *
     * Lenis has to perform the jump itself. The offset matches the
     * `scroll-padding-top` on <html> (5.5rem = 88px) so the target
     * lands clear of the 64px fixed navigation rather than under it,
     * and the two stay consistent: the CSS covers the reduced-motion
     * path below, where Lenis never starts and the browser does it.
     */
    const NAV_OFFSET = 88;
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -NAV_OFFSET });
      // Keep the URL honest without triggering a second jump.
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
