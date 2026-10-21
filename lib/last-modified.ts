import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";

/**
 * The real last-modified date of a route, for the sitemap.
 *
 * WHY. Every URL in the sitemap carried the same `lastmod` — whatever
 * "now" was at build time — which meant every page claimed to change
 * on every deploy. A sitemap that says eighteen pages changed when one
 * did is a sitemap Google learns to discount, and then the one page
 * that genuinely changed gets recrawled no faster than the rest.
 *
 * HOW. `git log -1 --format=%cI` on the files that make up the route:
  * the actual date that page's content last changed, which is the only
 * thing `lastmod` is supposed to mean.
 *
 * FALLBACKS, in order: the newest git commit date across the route's
 * files, then the newest filesystem mtime, then the build time. A
 * shallow CI clone can return nothing from git, and on Vercel the
 * checkout is shallow by default — mtime is wrong but recent, which
 * is better than crashing the build over a sitemap date.
 */

const BUILD_TIME = new Date();

function gitDate(files: string[]): Date | null {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...files],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (!out) return null;
    const d = new Date(out);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function mtime(files: string[]): Date | null {
  let newest: Date | null = null;
  for (const f of files) {
    try {
      const m = statSync(f).mtime;
      if (!newest || m > newest) newest = m;
    } catch {
      /* a path that does not exist contributes nothing */
    }
  }
  return newest;
}

/**
 * @param files repository-relative paths whose changes count as a
 *   change to this route — the page, its content module, its main
 *   component. Order does not matter; the newest wins.
 */
export function lastModified(...files: string[]): Date {
  return gitDate(files) ?? mtime(files) ?? BUILD_TIME;
}
