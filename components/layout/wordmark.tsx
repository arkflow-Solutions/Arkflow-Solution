import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The ArkFlow wordmark: ARK in white, FLOW in electric blue.
 * Replace the text treatment with the SVG logo asset when exported.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ArkFlow — home"
      className={cn("select-none text-lg font-bold tracking-tight", className)}
    >
      <span className="text-white">ARK</span>
      <span className="text-blue">FLOW</span>
    </Link>
  );
}
