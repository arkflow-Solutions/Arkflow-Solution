"use client";

import {
  Globe,
  Mail,
  Phone,
  Calendar,
  CalendarCheck,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { BRAND_ICONS, CHANNEL_ICON } from "@/lib/channel-icons";
import { cn } from "@/lib/utils";

const LUCIDE = {
  Globe,
  Mail,
  Phone,
  Calendar,
  CalendarCheck,
  CreditCard,
  MessageSquare,
} as const;

/**
 * A single channel glyph. Brand marks render from inlined path data;
 * generic channels use a lucide line icon.
 *
 * Always decorative: the channel name is rendered as text alongside, so
 * the icon is aria-hidden and adds nothing to the accessibility tree.
 */
export function ChannelIcon({
  name,
  size = 16,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const spec = CHANNEL_ICON[name];
  if (!spec) return null;

  if (spec.brand) {
    const icon = BRAND_ICONS[spec.brand];
    if (!icon) return null;
    return (
      <svg
        role="presentation"
        aria-hidden
        focusable="false"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("shrink-0", className)}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Lucide = LUCIDE[spec.lucide as keyof typeof LUCIDE];
  if (!Lucide) return null;
  return (
    <Lucide
      size={size}
      aria-hidden
      className={cn("shrink-0", className)}
      strokeWidth={1.5}
    />
  );
}
