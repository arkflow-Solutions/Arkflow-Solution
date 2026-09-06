"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useInView — mounts 3D scenes only when near the viewport and unmounts
 * them when far away. No canvas ever renders offscreen; GPU cost is
 * paid only for what the visitor can see.
 */
export function useInView<T extends HTMLElement>(rootMargin = "240px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
