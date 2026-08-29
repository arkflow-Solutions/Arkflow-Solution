#!/usr/bin/env node
/**
 * Pre-deploy verification. Run before every push: `npm run verify`.
 *
 * Exists because two failures shipped that a typecheck alone did not stop:
 *
 *  1. A test stub for `lib/fonts.ts` was committed in place of the real
 *     Google Fonts loader. It compiled and built cleanly — it would simply
 *     have deployed the site with no typography.
 *  2. `components/home/v2/capabilities.tsx` was deleted locally but not in
 *     the GitHub repo (uploading files through the web UI adds and
 *     overwrites, it never deletes). The stale file imported four exports
 *     that no longer exist and broke the Vercel build.
 *
 * Checks 3 and 4 guard the governance rules that must never regress.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const fail = [];
const ok = (m) => console.log(`  ok   ${m}`);
const bad = (m) => {
  fail.push(m);
  console.log(`  FAIL ${m}`);
};

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(".");
const source = files.filter((f) => /\.(ts|tsx)$/.test(f));
const read = (f) => readFileSync(f, "utf8");

/* 1 — the real font loader is in place, not a build stub */
console.log("\n[1] fonts");
const fonts = read("lib/fonts.ts");
if (fonts.includes("stub") || !fonts.includes("next/font/google")) {
  bad("lib/fonts.ts is a stub — restore the Inter / JetBrains_Mono loader");
} else ok("real Google Fonts loader present");

/* 2 — no source file imports a name its module no longer exports */
console.log("\n[2] orphaned imports from lib/home-content");
const exported = new Set(
  [...read("lib/home-content.ts").matchAll(/export const (\w+)/g)].map((m) => m[1])
);
let orphans = 0;
for (const f of source) {
  const m = read(f).match(/import \{([^}]+)\} from "@\/lib\/home-content"/);
  if (!m) continue;
  for (const name of m[1].split(",").map((s) => s.trim()).filter(Boolean)) {
    if (!exported.has(name)) {
      bad(`${f} imports "${name}" which home-content no longer exports`);
      orphans++;
    }
  }
}
if (!orphans) ok("every home-content import resolves");

/* 3 — no price on any public surface (Amendment 2) */
console.log("\n[3] governance: no published pricing");
const PRICE = /\bS?\$\s?(688|988|1,?488|888)\b|\b(688|988|1,?488)\s*(\/|per\s)?\s*(month|mo)\b/i;
let leaks = 0;
for (const f of source.filter((f) => !f.startsWith("scripts/"))) {
  if (PRICE.test(read(f))) {
    bad(`${f} appears to contain a published price`);
    leaks++;
  }
}
if (!leaks) ok("no price found in any source file");

/* 4 — the Stage 1 disclosure still renders on the homepage */
console.log("\n[4] governance: Stage 1 disclosure");
const hc = read("lib/home-content.ts");
if (!/focus:\s*\{[\s\S]{0,200}aesthetic clinics/i.test(hc)) {
  bad("packages.focus (Stage 1 disclosure) is missing from home-content");
} else ok("Stage 1 disclosure present");

/* 5 — canonical origin is the production domain */
console.log("\n[5] canonical origin");
const site = read("lib/site.ts")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  // line comments only — the "//" inside "https://" must survive
  .replace(/(^|[^:])\/\/.*$/gm, "$1");
if (site.includes("ark-flow-sg.vercel.app")) {
  bad("lib/site.ts still falls back to the Vercel preview origin");
} else if (!site.includes("www.arkflowsolutions.com")) {
  bad("lib/site.ts does not point at www.arkflowsolutions.com");
} else ok("SITE_URL resolves to the production domain");

/* 6 — no unverified social URL is rendered */
console.log("\n[6] social profiles");
const social = read("lib/social.ts");
const hardcoded = source
  .filter((f) => !f.includes("lib/social.ts") && !f.startsWith("scripts/"))
  .filter((f) => /facebook\.com|instagram\.com/.test(read(f)));
if (hardcoded.length) {
  for (const f of hardcoded)
    bad(`${f} hardcodes a social URL — route it through lib/social.ts`);
} else ok("social URLs come only from lib/social.ts");
if (/id: "facebook"[\s\S]{0,200}url: "/.test(social)) {
  ok("Facebook URL supplied");
} else {
  console.log("  note Facebook URL still pending — link is hidden, not broken");
}

/* 7 — every article routes somewhere */
console.log("\n[7] articles have an onward path");
const articleFiles = source.filter((f) => f.includes("lib/insights/articles/"));
let dead = 0;
for (const f of articleFiles) {
  const a = read(f);
  if (!/solution:\s*\{[\s\S]{0,400}href:/.test(a)) {
    bad(`${f} has no solution link — articles must not dead-end`);
    dead++;
  }
}
if (!dead)
  ok(`${articleFiles.length} article(s), all with an onward destination`);

/* 8 — no stock photography or unlabelled figures in articles */
console.log("\n[8] article visuals");
let visualIssues = 0;
for (const f of source.filter((f) => f.includes("lib/insights/articles/"))) {
  const a = read(f);
  // Every metrics block must carry its provenance note. The type system
  // requires the field; this catches it being filled with nothing.
  for (const m of a.matchAll(/type: "metrics"[\s\S]{0,200}?note:\s*"([^"]*)"/g)) {
    if (m[1].trim().length < 10) {
      bad(`${f} has a metrics block with no meaningful provenance note`);
      visualIssues++;
    }
  }
  // Images must not be sourced from stock libraries.
  if (/unsplash|pexels|shutterstock|gettyimages|istockphoto/i.test(a)) {
    bad(`${f} references a stock photo library`);
    visualIssues++;
  }
}
if (!visualIssues) ok("figures labelled, no stock imagery referenced");

/* 9 — v1.4 Amendment 8 constraints on the website line */
console.log("\n[9] v1.4 Amendment 8");
const publicSrc = source.filter((f) => !f.startsWith("scripts/"));

/**
 * Scan rendered content only. Governance comments legitimately quote the
 * very strings these checks look for — the prohibited price list, the
 * prohibited Scale adjectives — so scanning raw source produces false
 * positives on the documentation that exists to prevent the violation.
 */
const body = (f) =>
  read(f)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

// 9a — no à-la-carte pricing anywhere public
const ALACARTE = /\b(2,?880|4,?880|S?\$\s?288|S?\$\s?188|S?\$\s?380)\b/;
let priced = 0;
for (const f of publicSrc) {
  if (ALACARTE.test(body(f))) {
    bad(`${f} appears to contain à-la-carte pricing (v1.4 §5 prohibits it)`);
    priced++;
  }
}
if (!priced) ok("no à-la-carte pricing in any public file");

// 9b — SEO must never be offered as a service
const SEO_SERVICE =
  /\b(SEO (services?|packages?|retainers?|management)|local SEO|keyword research (service|package)|Google Business Profile optimisation|ranking guarantee)\b/i;
let seo = 0;
for (const f of publicSrc) {
  if (SEO_SERVICE.test(body(f))) {
    bad(`${f} offers SEO as a service (v1.4 §19 — SEO is ON HOLD)`);
    seo++;
  }
}
if (!seo) ok("no SEO service claims");

// 9c — Scale must not be undercut by the standalone offer
const WEAKENS = /standalone[^.]{0,80}\b(starter|entry-level|lite|cheaper|trial)\b/i;
let weak = 0;
for (const f of publicSrc) {
  if (WEAKENS.test(body(f))) {
    bad(`${f} frames the standalone website as a lesser Scale (v1.4 §15)`);
    weak++;
  }
}
if (!weak) ok("Scale positioning intact");

// 9d — internal capacity constraint must not surface as scarcity
const SCARCITY =
  /\b(only \d+ slots?|slots? (left|remaining)|spaces? left|book before we'?re full)\b/i;
let scarce = 0;
for (const f of publicSrc) {
  if (SCARCITY.test(body(f))) {
    bad(`${f} exposes the internal capacity constraint as scarcity (v1.4 §13)`);
    scarce++;
  }
}
if (!scarce) ok("no artificial scarcity");

console.log(
  fail.length
    ? `\n${fail.length} check(s) failed — do not deploy.\n`
    : "\nAll checks passed.\n"
);
process.exit(fail.length ? 1 : 0);
