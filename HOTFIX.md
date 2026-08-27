# Hotfix — Vercel build failure

## What broke

Vercel reported 4 errors. All four were the same cause:

```
components/home/v2/capabilities.tsx
  Module "@/lib/home-content" has no exported member 'voice'
  ... 'retention'
  ... 'reporting'
  ... 'industries'
```

Phase 2 deleted `capabilities.tsx` (Voice AI, Retention, Reporting and
Industries moved to /solutions and /aesthetic-clinics) and retired those
four exports. **GitHub's "Add files via upload" adds and overwrites — it
never deletes.** So the stale file survived in the repo, still importing
four names that no longer exist.

## Fix — 30 seconds

In GitHub, open `components/home/v2/capabilities.tsx` → "..." → **Delete
file** → commit to `main`. Vercel redeploys automatically.

## Second defect — mine

`lib/fonts.ts` shipped as a two-line test stub instead of the real
Inter / JetBrains Mono loader. My restore ran in a command that was
killed, so the stub was committed. It compiles and builds cleanly — the
site would simply have deployed with no typography. **Fixed in this drop.
Re-upload `lib/fonts.ts` even if you only hand-delete the file above.**

## Guard against both

New `scripts/verify.mjs`, wired to `prebuild` so it runs before every
build, local or on Vercel. Five checks:

1. `lib/fonts.ts` is the real loader, not a stub
2. No file imports a name `home-content` no longer exports
3. No published price in any source file (Amendment 2)
4. The Stage 1 disclosure is still present
5. `SITE_URL` resolves to the production domain, not Vercel

Verified against both regressions: reintroducing them produces 6 failures
and blocks the build.

```
npm run verify
```

## Use git, not the upload button

The upload button cannot delete, so every future deletion will strip a
component but leave the file behind — the same failure again.

```
git checkout -b phase-1-2
# copy this drop over the working tree
git add -A
git commit -m "Phase 1-2: canonical fix, per-page metadata, homepage 16->9"
git push -u origin phase-1-2
```

Note the repo Vercel builds from is `arkflow-Solutions/Arkflow-Solution`
(branch `main`), which is not the repo name I had on record.
