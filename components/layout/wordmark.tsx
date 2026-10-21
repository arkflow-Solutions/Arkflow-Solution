import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The ArkFlow wordmark: the brand mark (icon) plus the ARK/FLOW
 * type treatment. The icon is the exported PNG at
 * public/brand/arkflow-icon.png (transparent background, keyed from
 * the approved brand file). "large" swaps in the full lockup image
 * for contexts with room to spare, like the footer.
 */
export function Wordmark({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "large";
}) {
  if (size === "large") {
    return (
      <Link
        href="/"
        aria-label="ArkFlow Solutions — home"
        className={cn("inline-block select-none", className)}
      >
        <Image
          src="/brand/arkflow-logo-lockup.png"
          alt="ArkFlow Solutions"
          width={500}
          height={272}
          className="h-12 w-auto"
          priority={false}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="ArkFlow Solutions — home"
      className={cn(
        "inline-flex select-none items-center gap-2.5",
        className
      )}
    >
      <Image
        src="/brand/arkflow-icon.png"
        alt=""
        aria-hidden
        width={320}
        height={200}
        /* 45px is what a 320x200 source occupies at h-7. Without it
           next/image generated a srcset up to 640w and preloaded it at
           high priority on every page, so a 28px-tall navbar logo was
           competing with the headline and the webfonts for the first
           bytes. */
        sizes="45px"
        className="h-7 w-auto"
        /* NOT priority. This is the navigation, not the hero. The rule
           is one priority image per page and the hero owns it. */
        priority={false}
      />
      {/* "FLOW" was --blue (#1a3cff), which measures 2.87:1 against
          the ink background. That fails WCAG AA at any size: large
          text needs 3:1 and this is right underneath it. It is the
          wordmark, so it is on every page, and it was the only
          contrast failure on the site.

          --blue-soft (#3b82f6) is already in the locked palette and
          measures about 5.3:1. Same hue family, same brand, legible.
          The electric blue stays everywhere it passes — buttons, which
          are blue-on-white, and accents at larger sizes. */}
      <span className="text-lg font-bold tracking-tight">
        <span className="text-white">ARK</span>
        <span className="text-blue-soft">FLOW</span>
      </span>
    </Link>
  );
}
