import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Section — the vertical rhythm unit of every page.
 * Generous whitespace is a design decision, not a gap to fill.
 */
export const Section = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Section({ className, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn("py-24 md:py-32 lg:py-36", className)}
        {...props}
      />
    );
  }
);
