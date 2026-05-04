---
plan: "01-brand-tokens"
phase: 1
status: complete
started: "2026-05-04T00:00:00Z"
completed: "2026-05-04T00:00:00Z"
requirements: [BRAND-01, BRAND-02, BRAND-03]
---

## Summary

Brand token system established. Framer Motion installed. Site now renders with dark charcoal background (#111108), gold accent (#C9A84C), Fraunces display font, and Inter body font — no FOUC.

## What Was Built

- **`lib/tokens.ts`** — TypeScript brand token module exporting: `colors` (gold, background, silver, text), `fonts` (display/body slots), `typescale` (hero → small), `letterSpacing`, `spacing`, `animation`, `blur`. Available for import by any component or animation library.
- **`app/globals.css`** — Rewrote with Tailwind v4 `@theme inline {}` block defining all brand CSS custom properties. Dark charcoal background set directly on `body` (no flash of white). Gold text selection, branded scrollbar, `::selection` tint. Removed all light/dark mode toggle and old scaffold.
- **`app/layout.tsx`** — Replaced Geist Sans/Mono with Fraunces (`--font-fraunces`, display) and Inter (`--font-inter`, body) via `next/font/google`. Full C2B metadata: title template `%s | C2B Web Design`, `en_GB` locale, OG tags.
- **`package.json`** — Added `framer-motion` dependency.

## Key Files

key-files.created:
  - lib/tokens.ts
  - app/globals.css (modified)
  - app/layout.tsx (modified)

## Commits

- `feat(01-01): install framer-motion`
- `feat(01-01): create lib/tokens.ts with brand design tokens`
- `feat(01-01): rewrite globals.css with brand @theme tokens`
- `feat(01-01): replace layout.tsx with Fraunces/Inter fonts and C2B metadata`

## Self-Check: PASSED

- [x] `lib/tokens.ts` exists, exports colors/fonts/typescale/animation
- [x] `globals.css` @theme block defines all brand CSS custom properties
- [x] `globals.css` does NOT contain `#ffffff` scaffold background
- [x] `layout.tsx` imports Fraunces and Inter, NOT Geist
- [x] `npm run build` exits 0
- [x] TypeScript clean (`npx tsc --noEmit` exits 0)
