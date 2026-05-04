---
phase: 1
plan: "01-nav-footer"
type: execute
wave: 2
depends_on:
  - "01-brand-tokens"
files_modified:
  - components/nav/Nav.tsx
  - components/footer/Footer.tsx
  - app/layout.tsx
autonomous: true
requirements:
  - LAYOUT-01
  - LAYOUT-02
---

<objective>
Create the sticky navigation header (transparent → frosted glass on scroll, logo left + links right, hamburger on mobile) and the agency footer (contact info + navigation links). Update the root layout to inject these components on every page. After this plan, every route shows the sticky nav and footer, the nav responds to scroll with a glassmorphism effect, and mobile visitors see a functional hamburger menu.
</objective>

<tasks>

## Task 1: Create components/nav/Nav.tsx

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-06 (sticky), D-07 (transparent at top → frosted glass on scroll; smooth transition), D-08 (links: Home, Portfolio, Process, Contact — exactly these 4), D-09 (logo left, links right), D-10 (hamburger on mobile), D-11 (gold underline or subtle glow hover states)
- app/globals.css — brand CSS custom properties now available: --color-gold, --color-background-glass, --color-silver-border, --color-text-primary, --color-text-secondary, --duration-base, --blur-nav
- lib/tokens.ts — reference for token values
</read_first>

<action>
Create the directory `components/nav/` and file `components/nav/Nav.tsx` with the following exact content:

```typescript
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled
          ? "bg-background-glass backdrop-blur-[20px] border-b border-silver-border"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-gold font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity duration-150"
          aria-label="C2B Web Design — Home"
        >
          C2B
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-medium tracking-wide group",
                  "transition-colors duration-150",
                  isActive
                    ? "text-gold"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {label}
                <span
                  className={[
                    "absolute -bottom-0.5 left-0 right-0 h-px bg-gold",
                    "transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-text-primary hover:text-gold transition-colors duration-150"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "rotate-45 translate-y-[7px]" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "-rotate-45 -translate-y-[7px]" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-background-glass backdrop-blur-[20px]",
          menuOpen ? "max-h-64 border-b border-silver-border" : "max-h-0",
        ].join(" ")}
      >
        <nav
          className="flex flex-col px-6 py-4 gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "text-base font-medium py-3 border-b border-silver-border last:border-0",
                  "transition-colors duration-150",
                  isActive
                    ? "text-gold"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
```
</action>

<acceptance_criteria>
- `components/nav/Nav.tsx` exists on disk
- File starts with `"use client"` directive on line 1
- File contains `window.addEventListener("scroll"` (scroll listener for glass effect)
- File contains `setScrolled` toggling between transparent and frosted glass classes
- File contains `backdrop-blur-[20px]` (glassmorphism blur on scroll)
- File contains exactly 4 NAV_LINKS entries: Home, Portfolio, Process, Contact
- File contains `aria-label` on the hamburger `<button>` element
- File contains `aria-expanded={menuOpen}` on the hamburger button (accessibility)
- File contains `id="mobile-menu"` on the mobile menu panel
- `npx tsc --noEmit` exits without errors referencing this file
</acceptance_criteria>

---

## Task 2: Create components/footer/Footer.tsx

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — LAYOUT-02 requirement (footer displays agency contact information and relevant links)
- app/globals.css — CSS custom properties: --color-gold, --color-text-muted, --color-text-secondary, --color-silver-border, --color-background-elevated
</read_first>

<action>
Create `components/footer/Footer.tsx` with the following exact content:

```typescript
import Link from "next/link"

const FOOTER_NAV = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Our Process" },
  { href: "/analyser", label: "Website Analyser" },
  { href: "/contact", label: "Contact" },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-silver-border bg-background-elevated">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand column */}
        <div>
          <span className="text-gold font-display font-bold text-2xl tracking-tight">
            C2B
          </span>
          <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-xs">
            Premium web design and development for UK businesses that demand exceptional results.
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <h3 className="text-text-muted text-xs font-semibold tracking-[0.1em] uppercase mb-4">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-text-muted hover:text-gold text-sm transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-text-muted text-xs font-semibold tracking-[0.1em] uppercase mb-4">
            Get in Touch
          </h3>
          <address className="not-italic flex flex-col gap-2">
            <a
              href="mailto:hello@c2bwebdesign.co.uk"
              className="text-text-muted hover:text-gold text-sm transition-colors duration-150"
            >
              hello@c2bwebdesign.co.uk
            </a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-silver-border">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            © {year} C2B Web Design. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with precision in the UK
          </p>
        </div>
      </div>
    </footer>
  )
}
```
</action>

<acceptance_criteria>
- `components/footer/Footer.tsx` exists on disk
- File imports `Link` from `"next/link"`
- File contains `hello@c2bwebdesign.co.uk`
- File contains `new Date().getFullYear()` for dynamic copyright year
- File contains `border-t border-silver-border` (footer top border)
- File contains all 4 navigation links: Portfolio, Our Process, Website Analyser, Contact
- `npx tsc --noEmit` exits without errors referencing this file
</acceptance_criteria>

---

## Task 3: Update app/layout.tsx — add Nav and Footer wrappers

<read_first>
- app/layout.tsx — current state after Plan 01: has Fraunces/Inter fonts and C2B metadata, but no Nav or Footer yet
- components/nav/Nav.tsx — just created; default export is Nav
- components/footer/Footer.tsx — just created; default export is Footer
</read_first>

<action>
Update `app/layout.tsx`. Add imports for Nav and Footer, wrap children in `<main className="flex-1 pt-16">` (pt-16 = 64px padding-top to clear the fixed nav height), and render Nav above and Footer below. The complete file content must be:

```typescript
import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import Nav from "@/components/nav/Nav"
import Footer from "@/components/footer/Footer"
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
        <Nav />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```
</action>

<acceptance_criteria>
- `app/layout.tsx` imports `Nav` from `"@/components/nav/Nav"`
- `app/layout.tsx` imports `Footer` from `"@/components/footer/Footer"`
- Layout JSX contains `<Nav />` immediately inside `<body>`, before `<main>`
- Layout JSX contains `<Footer />` after `<main>`
- `<main>` element has class `pt-16` (padding-top clears 64px fixed nav)
- `<main>` element has class `flex-1` (main fills available vertical space)
- `npm run build` exits 0
</acceptance_criteria>

</tasks>

<verification>
1. `npm run build` — must exit 0
2. `npm run dev` — open localhost:3000:
   - Nav bar visible at top with "C2B" logo and Home/Portfolio/Process/Contact links
   - Body background is dark (#111108)
   - Page content not hidden behind the fixed nav (visible below the nav bar)
3. Scroll down on any page: nav background transitions from transparent to frosted glass (backdrop-blur visible, dark semi-transparent background)
4. Resize to < 768px mobile breakpoint: desktop links hidden, hamburger icon appears
5. Tap hamburger: mobile menu opens/closes with animation; all 4 links visible
6. Footer visible at bottom: agency name, nav links, contact email
7. Hover over desktop nav links: gold underline animation slides in from left
8. Hover nav links in footer: color transitions to gold
</verification>

<success_criteria>
- [ ] `components/nav/Nav.tsx` exists with sticky header, scroll-triggered glassmorphism, and hamburger
- [ ] `components/footer/Footer.tsx` exists with agency info, nav links, and contact email
- [ ] `app/layout.tsx` includes Nav and Footer wrapping all page content
- [ ] Nav is visible at the top of every page and does not obscure page content
- [ ] Desktop: nav links visible; Mobile: hamburger visible with functional menu
- [ ] `npm run build` exits 0
</success_criteria>

<must_haves>
  <truths>
    - Nav uses "use client" — scroll listener requires browser APIs unavailable in React Server Components
    - The fixed nav is 64px tall (h-16 Tailwind class); main content needs pt-16 to avoid being hidden behind it
    - The transparent → frosted glass transition uses Tailwind's transition-all + CSS backdrop-filter; this does NOT use Framer Motion
    - bg-background-glass (rgba(17,17,8,0.75)) + backdrop-blur-[20px] implements the D-07 glassmorphism effect
    - All nav links use Next.js <Link> — no anchor href= to prevent full page reloads (D-14)
    - The scroll listener calls onScroll() immediately on mount so the nav is correctly styled if the user reloads mid-page
    - Footer is a Server Component (no "use client") — it has no interactive state
  </truths>
</must_haves>
