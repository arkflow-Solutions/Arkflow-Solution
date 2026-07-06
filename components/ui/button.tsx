import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "large";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  /** Primary CTAs earn an arrow that slides on hover. */
  withArrow?: boolean;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-button font-medium " +
  "transition-all duration-200 ease-premium " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-soft " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // One blue button per view. Blue creates emphasis; scarcity keeps it powerful.
  primary: "bg-blue text-white hover:bg-blue-soft active:scale-[0.98]",
  secondary:
    "border border-[color:var(--border-strong)] bg-transparent text-white " +
    "hover:border-white/30 hover:bg-white/[0.04] active:scale-[0.98]",
  ghost: "text-platinum hover:text-white",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-5 text-small",
  large: "h-[3.25rem] px-7 text-body",
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  href,
  withArrow = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          size={16}
          aria-hidden
          className="transition-transform duration-200 ease-premium group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
