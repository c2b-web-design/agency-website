---
phase: 1
plan: "01-brand-tokens"
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - lib/tokens.ts
  - app/globals.css
  - app/layout.tsx
autonomous: true
requirements:
  - BRAND-01
  - BRAND-02
  - BRAND-03
---

<objective>
Install Framer Motion, create the complete brand token system (TypeScript module + Tailwind v4 CSS theme), and configure brand typography (Fraunces display font + Inter body font via next/font/google). After this plan executes, the site renders with the dark charcoal background (#111108), gold accent (#C9A84C), and brand typography with no flash of unstyled content.
</objective>

<tasks>

## Task 1: Install Framer Motion

<read_first>
- package.json — current dependencies (Next.js 16.2.4, React 19.2.4, Tailwind CSS v4)
</read_first>

<action>
Run the following command from the project root:

```
npm install framer-motion
```

This adds framer-motion to the `dependencies` field in package.json.
</action>

<acceptance_criteria>
- package.json contains `"framer-motion"` as a key in `dependencies`
- `node_modules/framer-motion/` directory exists on disk
- `npm run build` does not error due to framer-motion
</acceptance_criteria>

---

## Task 2: Create lib/tokens.ts

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-01 (gold #C9A84C), D-02 (background #111108), D-03 (silver ~#A8A090 area), D-04 (font slot architecture), D-05 (typographic scale)
</read_first>

<action>
Create the directory `lib/` and file `lib/tokens.ts` with the following exact content:

```typescript
export const colors = {
  gold: '#C9A84C',
  goldLight: '#D4B96B',
  goldDark: '#A07832',
  goldSubtle: 'rgba(201, 168, 76, 0.12)',
  goldBorder: 'rgba(201, 168, 76, 0.25)',

  background: '#111108',
  backgroundElevated: '#1A1A14',
  backgroundGlass: 'rgba(17, 17, 8, 0.75)',

  silver: '#A49F8F',
  silverMuted: '#6B6658',
  silverBorder: 'rgba(164, 159, 143, 0.15)',

  textPrimary: '#F5F3EE',
  textSecondary: '#A49F8F',
  textMuted: '#6B6658',
} as const

export const fonts = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
} as const

export const typescale = {
  hero: 'clamp(3.5rem, 8vw, 7rem)',
  h1: 'clamp(2.5rem, 5vw, 4.5rem)',
  h2: 'clamp(2rem, 4vw, 3rem)',
  h3: 'clamp(1.5rem, 2.5vw, 2rem)',
  h4: 'clamp(1.25rem, 2vw, 1.5rem)',
  body: '1rem',
  small: '0.875rem',
} as const

export const letterSpacing = {
  tight: '-0.04em',
  display: '-0.03em',
  normal: '0',
  wide: '0.05em',
} as const

export const spacing = {
  section: 'clamp(4rem, 8vw, 8rem)',
  container: '1280px',
} as const

export const animation = {
  fast: '150ms',
  base: '300ms',
  slow: '600ms',
  verySlow: '1200ms',
  easeSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
} as const

export const blur = {
  nav: '20px',
  glass: '24px',
} as const
```
</action>

<acceptance_criteria>
- `lib/tokens.ts` exists on disk
- File contains `export const colors`
- File contains `gold: '#C9A84C'` (exact hex value from D-01)
- File contains `background: '#111108'` (exact hex value from D-02)
- File contains `silver: '#A49F8F'` (warm silver in #A8A090 area from D-03)
- File contains `export const fonts`
- File contains `export const typescale`
- File contains `export const animation`
- File compiles without TypeScript errors (`npx tsc --noEmit`)
</acceptance_criteria>

---

## Task 3: Rewrite app/globals.css with brand tokens

<read_first>
- app/globals.css — current content (Tailwind v4 @import + default scaffold @theme block with white background)
- lib/tokens.ts — brand token values (CSS variables in @theme must use the same hex values)
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-04 (font slots: --font-display maps to --font-fraunces; --font-body maps to --font-inter)
</read_first>

<action>
Replace the ENTIRE contents of `app/globals.css` with the following. Do not preserve any of the old scaffold content:

```css
@import "tailwindcss";

@theme inline {
  /* Brand colors */
  --color-gold: #C9A84C;
  --color-gold-light: #D4B96B;
  --color-gold-dark: #A07832;
  --color-gold-subtle: rgba(201, 168, 76, 0.12);
  --color-gold-border: rgba(201, 168, 76, 0.25);

  --color-background: #111108;
  --color-background-elevated: #1A1A14;
  --color-background-glass: rgba(17, 17, 8, 0.75);

  --color-silver: #A49F8F;
  --color-silver-muted: #6B6658;
  --color-silver-border: rgba(164, 159, 143, 0.15);

  --color-text-primary: #F5F3EE;
  --color-text-secondary: #A49F8F;
  --color-text-muted: #6B6658;

  /* Typography — font slots mapped from next/font/google CSS variables */
  --font-display: var(--font-fraunces);
  --font-body: var(--font-inter);
  --font-sans: var(--font-inter);

  /* Spacing */
  --spacing-section: clamp(4rem, 8vw, 8rem);

  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* Blur */
  --blur-nav: 20px;
  --blur-glass: 24px;
}

/* Base reset and brand defaults */
html {
  scroll-behavior: smooth;
}

body {
  background-color: #111108;
  color: #F5F3EE;
  font-family: var(--font-body, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Text selection — gold tint */
::selection {
  background-color: rgba(201, 168, 76, 0.25);
  color: #F5F3EE;
}

/* Scrollbar styling (WebKit only) */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #111108;
}

::-webkit-scrollbar-thumb {
  background: #6B6658;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A49F8F;
}
```
</action>

<acceptance_criteria>
- `app/globals.css` starts with `@import "tailwindcss"` on line 1
- File contains `@theme inline {`
- File contains `--color-gold: #C9A84C`
- File contains `--color-background: #111108`
- File contains `--font-display: var(--font-fraunces)`
- File contains `--font-body: var(--font-inter)`
- File does NOT contain `--background: #ffffff` (old scaffold removed)
- File does NOT contain `prefers-color-scheme: dark` (dark-first design; no light mode toggle)
- `npm run build` exits with no CSS compilation errors
</acceptance_criteria>

---

## Task 4: Update app/layout.tsx — brand fonts and site metadata

<read_first>
- app/layout.tsx — current content (Geist Sans/Mono imports, default "Create Next App" metadata)
- app/globals.css — just updated; expects --font-fraunces and --font-inter CSS variables to be set on the html element
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-04 (Fraunces for display, Inter for body)
</read_first>

<action>
Replace the ENTIRE contents of `app/layout.tsx` with the following:

```typescript
import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "C2B Web Design — Premium Web Design Agency",
    template: "%s | C2B Web Design",
  },
  description:
    "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
  keywords: ["web design", "web development", "UK", "agency", "premium"],
  authors: [{ name: "C2B Web Design" }],
  creator: "C2B Web Design",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "C2B Web Design",
    title: "C2B Web Design — Premium Web Design Agency",
    description:
      "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  )
}
```

NOTE: Nav and Footer are added in Plan 02 (Wave 2). This plan only establishes fonts and metadata.
</action>

<acceptance_criteria>
- `app/layout.tsx` imports `Fraunces` and `Inter` from `"next/font/google"`
- File does NOT import Geist or Geist_Mono
- File contains `variable: "--font-fraunces"`
- File contains `variable: "--font-inter"`
- `export const metadata` exists with `title.default` containing `"C2B Web Design"`
- `metadata.openGraph.locale` equals `"en_GB"`
- `metadata.title.template` equals `"%s | C2B Web Design"`
- `npm run build` exits 0
</acceptance_criteria>

</tasks>

<verification>
1. `npm run build` — must exit 0 with no TypeScript, CSS, or font errors
2. `npm run dev` — open browser at localhost:3000; verify body background is dark (#111108), not white
3. Open browser DevTools → Elements → inspect `<html>` element: must have class attributes including `__variable_fraunces` or similar next/font CSS variable class
4. Open DevTools → Computed Styles on body: `background-color` must resolve to the dark charcoal (rgb(17, 17, 8)), not white
5. Verify `lib/tokens.ts` can be imported: create a temporary test import in any tsx file, confirm TypeScript doesn't error on `import { colors } from "@/lib/tokens"`
</verification>

<success_criteria>
- [ ] `lib/tokens.ts` exists and exports colors, fonts, typescale, letterSpacing, spacing, animation, blur
- [ ] `app/globals.css` @theme block defines all brand CSS custom properties
- [ ] `app/globals.css` does NOT contain the old #ffffff scaffold background
- [ ] `app/layout.tsx` uses Fraunces + Inter via next/font/google
- [ ] Site renders dark (#111108) background on first load — not white
- [ ] `npm run build` exits 0
</success_criteria>

<must_haves>
  <truths>
    - Tailwind v4 uses CSS-first @theme blocks in globals.css — NOT tailwind.config.js. Token variables defined inside @theme inline {} become Tailwind utility classes automatically.
    - Font CSS variables (--font-fraunces, --font-inter) are injected on the html element by next/font/google at build time. The @theme inline block maps them to --font-display and --font-body so Tailwind's font-display and font-body classes work.
    - tokens.ts TypeScript values and globals.css CSS variables must use the same hex codes — they are two representations of the same design system.
    - Body background-color is set directly in CSS (body { background-color: #111108 }) to ensure no flash of white before Tailwind classes hydrate.
    - display: "swap" on both fonts prevents FOIT (flash of invisible text) during font loading.
  </truths>
</must_haves>
