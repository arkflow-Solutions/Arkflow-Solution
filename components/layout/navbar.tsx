"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/layout/wordmark";
import { useCalendly } from "@/lib/use-calendly";
import { contact } from "@/lib/content";

const links = [
  { label: "Solutions", href: "/solutions" },
  { label: "Packages", href: "/packages" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openCalendly = useCalendly(contact.call.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu; body scroll locks while it's open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium",
        scrolled || open
          ? "border-b border-[color:var(--border-subtle)] bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link text-small transition-colors duration-200",
                  active ? "text-white" : "text-platinum hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button onClick={openCalendly}>Book Discovery Call</Button>
        </div>

        <button
          className="rounded-button p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary mobile"
          className="border-t border-[color:var(--border-subtle)] bg-ink lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-button px-3 py-3 text-body text-platinum hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 pb-2 pt-3">
              <Button
                onClick={(e) => {
                  setOpen(false);
                  openCalendly(e);
                }}
                className="w-full"
              >
                Book Discovery Call
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
