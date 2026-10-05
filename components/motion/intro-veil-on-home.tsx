"use client";

import { usePathname } from "next/navigation";
import { IntroVeil } from "@/components/motion/intro-veil";

/**
 * Renders the intro veil on the homepage and nowhere else.
 *
 * WHY. The veil is mounted in the root layout, so it played on every
 * route — including /audit. Someone arriving there from an ad, an email
 * or a direct link waited ~4.6 seconds in front of a full-screen
 * animation before they could read the page they came to act on. That is
 * the single most expensive place on the site to put a delay.
 *
 * The homepage is different: it is the front door, the animation is part
 * of the first impression, and the hero sequence is timed to begin when
 * the veil ends. So the veil stays exactly as it is, where it belongs.
 *
 * A separate client component because the root layout is a server
 * component and usePathname needs the client. The veil's own code is
 * untouched.
 */
export function IntroVeilOnHome() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <IntroVeil />;
}
