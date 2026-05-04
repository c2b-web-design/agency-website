---
plan: "01-route-shells"
phase: 1
status: complete
started: "2026-05-04T00:00:00Z"
completed: "2026-05-04T00:00:00Z"
requirements: [LAYOUT-03]
---

## Summary

All 5 Next.js App Router page shells created. Every nav link now resolves to a correctly titled, brand-styled page. No 404s. Browser tab titles follow the `%s | C2B Web Design` template from root layout.

## What Was Built

- **`app/page.tsx`** — Homepage shell replaced. Removed all Vercel scaffold content. Brand-styled with `font-display`, `text-gold`, `text-text-primary` classes. Metadata overrides template with full title.
- **`app/portfolio/page.tsx`** — Portfolio shell. title: "Portfolio", full OG tags.
- **`app/analyser/page.tsx`** — Website Analyser shell. title: "Website Analyser", full OG tags.
- **`app/process/page.tsx`** — Our Process shell. title: "Our Process", full OG tags.
- **`app/contact/page.tsx`** — Contact shell. title: "Contact", email fallback link to `hello@c2bwebdesign.co.uk`, full OG tags.

Each page: `min-h-[calc(100vh-4rem)]` fills viewport minus nav, placeholder heading with gold accent, brand-consistent typography.

## Key Files

key-files.created:
  - app/page.tsx (modified)
  - app/portfolio/page.tsx
  - app/analyser/page.tsx
  - app/process/page.tsx
  - app/contact/page.tsx

## Commits

- `feat(01-03): replace home page scaffold with brand-styled shell`
- `feat(01-03): create all route shells with per-page SEO metadata`

## Self-Check: PASSED

- [x] All 5 pages exist on disk
- [x] `app/page.tsx` has no Vercel SVG imports or scaffold links
- [x] Each page exports `metadata` with correct title
- [x] `npm run build` shows all 5 routes (/, /analyser, /contact, /portfolio, /process) pre-rendered as static
- [x] TypeScript clean
