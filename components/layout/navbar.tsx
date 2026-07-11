"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, BookOpen, Star, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/layout/wordmark";
import { useCalendly } from "@/lib/use-calendly";
import { contact } from "@/lib/content";

/** Top-level primary navigation. */
const links = [
  { label: "Solutions", href: "/solutions" },
  { label: "Packages", href: "/packages" },
  { label: "Industries", href: "/industries" },
];

/** "Company" grouping — surfaced as a dropdown on desktop and an
 *  indented sub-group inside the mobile menu. Testimonials points to
 *  /case-studies, which holds the honest "earned with founding clinics,
 *  published with sign-off" content (no fabricated proof). About &
 *  Contact are combined into one entry pointing to /about. */
const companyLinks = [
  { label: "Resources", href: "/resources", icon: BookOpen, desc: "Guides, field notes & client knowledge" },
  { label: "Testimonials", href: "/case-studies", icon: Star, desc: "Client stories — earned with sign-off" },
  { label: "About & Contact", href: "/about", icon: Building2, desc: "Who we are and how to reach us" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const openCalendly = useCalendly(contact.call.href);

  const companyActive = companyLinks.some((l) => l.href === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setCompany(false);
  }, [pathname]);

  // Escape closes the mobile menu; body scroll locks while it's open
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

  // Close the desktop Company dropdown on outside click or Escape
  useEffect(() => {
    if (!company) return;
    const onDown = (e: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompany(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCompany(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [company]);

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

          {/* Company dropdown */}
          <div
            ref={companyRef}
            className="relative"
            onMouseEnter={() => setCompany(true)}
            onMouseLeave={() => setCompany(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={company}
              onClick={() => setCompany((c) => !c)}
              className={cn(
                "nav-link flex items-center gap-1 text-small transition-colors duration-200",
                company || companyActive ? "text-white" : "text-platinum hover:text-white"
              )}
            >
              Company
              <ChevronDown
                size={15}
                aria-hidden
                className={cn(
                  "transition-transform duration-200 ease-premium",
                  company && "rotate-180"
                )}
              />
            </button>

            {/* pt-3 keeps a hover bridge between the button and panel */}
            <div
              className={cn(
                "absolute right-0 top-full pt-3 transition-all duration-200 ease-premium",
                company
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              )}
            >
              <div
                role="menu"
                aria-label="Company"
                className="w-[268px] rounded-card border border-[color:var(--border-strong)] bg-surface/95 p-2 shadow-2xl backdrop-blur-xl"
              >
                {companyLinks.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      aria-current={active ? "page" : undefined}
                      className="flex items-start gap-3 rounded-button px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-button border border-[color:var(--border-subtle)] bg-white/[0.03]">
                        <Icon size={17} className="text-blue-soft" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-small font-medium",
                            active ? "text-white" : "text-platinum"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-platinum/55">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
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

            {/* Company group */}
            <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-[0.16em] text-platinum/45">
              Company
            </p>
            {companyLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-button px-3 py-3 text-body text-platinum hover:bg-white/[0.04] hover:text-white"
                >
                  <Icon size={18} className="text-blue-soft" aria-hidden />
                  {item.label}
                </Link>
              );
            })}

            <div className="px-3 pb-2 pt-4">
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
