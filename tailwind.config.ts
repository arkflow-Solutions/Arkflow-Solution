import type { Config } from "tailwindcss";

/**
 * ArkFlow Design System — Tailwind configuration
 * Source of truth: Founder Bible Ch. 2.13 (Brand Assets).
 * Do not add colours outside this palette without founder sign-off.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canonical brand palette — locked
        ink: "#0A0E1A",        // Primary dark — page background, hero
        surface: "#0F172A",    // Slate navy — cards, header bars
        blue: {
          DEFAULT: "#1A3CFF",  // Electric blue — primary accent, used sparingly
          soft: "#3B82F6",     // Standard blue — hovers, secondary accents, icons
        },
        platinum: "#D1D5DB",   // Secondary text, dividers
        // Functional (internal UI states only — never decorative)
        success: "#059669",
        warning: "#D97706",
        critical: "#DC2626",
        // Tier accents — per-package identity on the pricing surface only
        // (founder-approved, packages section). Not for general use.
        tier: {
          emerald: "#34D399",
          violet: "#A78BFA",
          blue: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Editorial type scale — typography carries the design
        "display-xl": ["clamp(3rem, 6.5vw, 5.25rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.028em" }],
        "heading": ["clamp(1.875rem, 3.2vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.022em" }],
        "subheading": ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "lead": ["1.1875rem", { lineHeight: "1.65" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "small": ["0.875rem", { lineHeight: "1.6" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        container: "72rem",   // 1152px — page container
        prose: "42rem",       // Comfortable reading width
      },
      borderRadius: {
        card: "1rem",
        button: "0.625rem",
      },
      boxShadow: {
        // Soft, expensive shadows — never harsh
        card: "0 1px 2px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.28)",
        "card-hover": "0 1px 2px rgba(0,0,0,0.25), 0 16px 48px rgba(0,0,0,0.4)",
        glowline: "0 0 24px rgba(26,60,255,0.35)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
