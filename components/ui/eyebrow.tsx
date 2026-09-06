import { cn } from "@/lib/utils";

/**
 * Eyebrow — mono utility label above headings.
 * The operational voice: precise, uppercase, quietly technical.
 */
export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow uppercase text-blue-soft",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
