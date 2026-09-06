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
        className="h-7 w-auto"
        priority
      />
      <span className="text-lg font-bold tracking-tight">
        <span className="text-white">ARK</span>
        <span className="text-blue">FLOW</span>
      </span>
    </Link>
  );
}
