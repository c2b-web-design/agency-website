---
phase: 1
plan: "01-route-shells"
type: execute
wave: 3
depends_on:
  - "01-brand-tokens"
  - "01-nav-footer"
files_modified:
  - app/page.tsx
  - app/portfolio/page.tsx
  - app/analyser/page.tsx
  - app/process/page.tsx
  - app/contact/page.tsx
autonomous: true
requirements:
  - LAYOUT-03
---

<objective>
Create all five Next.js App Router page shells so the site is fully navigable from day one. Each route gets correct per-page metadata (title, description, OG tags) and a minimal on-brand placeholder content area. Future phases drop their section content into these shells without touching the surrounding structure. After this plan, clicking every nav link leads to a correctly titled, brand-styled page — never a 404.
</objective>

<tasks>

## Task 1: Replace app/page.tsx — Homepage shell

<read_first>
- app/layout.tsx — current state after Plan 02: root layout already wraps all pages with Nav + Footer and `<main className="flex-1 pt-16">`. Homepage page.tsx only needs to return a single child.
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-12 (/ is Hero-only; hero built in Phase 2), D-13 (homepage CTA structural hook for contact modal — modal itself is Phase 5), D-15 (Phase 1 delivers placeholder shells with correct layout + page title)
</read_first>

<action>
Replace the ENTIRE contents of `app/page.tsx` with the following:

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "C2B Web Design — Premium Web Design Agency",
  description:
    "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
}

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 2 — Hero Section
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          <span className="text-gold">C2B</span> Web Design
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The hero section for this page is built in Phase 2.
          Navigation, layout, and brand tokens are fully operational.
        </p>
      </div>
    </section>
  )
}
```
</action>

<acceptance_criteria>
- `app/page.tsx` does NOT contain any Vercel SVG imports or Next.js scaffold links
- File exports `metadata` with `title` containing `"C2B Web Design"`
- File exports a default `HomePage` component
- Component JSX contains `font-display` class (confirms display font slot is working)
- Component JSX contains `text-gold` class (confirms brand token is working)
- `npm run build` exits 0
</acceptance_criteria>

---

## Task 2: Create app/portfolio/page.tsx

<read_first>
- app/layout.tsx — root layout already applies Nav + Footer and `<main className="flex-1 pt-16">`. This page only needs its inner content.
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-12 (/portfolio — gallery and case study videos; built in Phase 3), D-15 (Phase 1 placeholder shell with correct page title)
</read_first>

<action>
Create the directory `app/portfolio/` and file `app/portfolio/page.tsx` with the following content:

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View our work — premium website design and development case studies for UK businesses.",
  openGraph: {
    title: "Portfolio | C2B Web Design",
    description:
      "View our work — premium website design and development case studies for UK businesses.",
  },
}

export default function PortfolioPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 3 — Video Showcase Gallery
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Our <span className="text-gold">Work</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The portfolio gallery is built in Phase 3.
          This page is a navigable shell — structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
```
</action>

<acceptance_criteria>
- `app/portfolio/page.tsx` exists on disk
- File exports `metadata` with `title` equal to `"Portfolio"`
- `metadata.title` is a string (not a `title.default` object) — the root layout template appends the site name automatically
- File exports a default `PortfolioPage` component
- File contains `text-gold` class
- `npm run build` exits 0 with no errors referencing this file
</acceptance_criteria>

---

## Task 3: Create app/analyser/page.tsx

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-12 (/analyser — website analyser interactive tool; built in Phase 4), D-15 (Phase 1 placeholder shell)
</read_first>

<action>
Create `app/analyser/page.tsx` with the following content:

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Analyser",
  description:
    "Get an instant report on your website — design quality, mobile-friendliness, and conversion potential. Free, instant, no signup.",
  openGraph: {
    title: "Website Analyser | C2B Web Design",
    description:
      "Get an instant report on your website — design quality, mobile-friendliness, and conversion potential.",
  },
}

export default function AnalyserPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 4 — Client Website Analyser
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Website <span className="text-gold">Analyser</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The AI-powered website analyser is built in Phase 4.
          This page is a navigable shell — structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
```
</action>

<acceptance_criteria>
- `app/analyser/page.tsx` exists on disk
- File exports `metadata` with `title` equal to `"Website Analyser"`
- File exports a default `AnalyserPage` component
- File contains `text-gold` class
- `npm run build` exits 0 with no errors referencing this file
</acceptance_criteria>

---

## Task 4: Create app/process/page.tsx

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-12 (/process — how the agency works, client journey explanation), D-15 (Phase 1 placeholder shell)
</read_first>

<action>
Create `app/process/page.tsx` with the following content:

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How we work — our structured design and development process that delivers exceptional results on time.",
  openGraph: {
    title: "Our Process | C2B Web Design",
    description:
      "How we work — our structured design and development process that delivers exceptional results on time.",
  },
}

export default function ProcessPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          How We Work
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Our <span className="text-gold">Process</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Our process page content — the client journey from brief to launch — is designed
          and built in a future phase. Structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
```
</action>

<acceptance_criteria>
- `app/process/page.tsx` exists on disk
- File exports `metadata` with `title` equal to `"Our Process"`
- File exports a default `ProcessPage` component
- File contains `text-gold` class
- `npm run build` exits 0 with no errors referencing this file
</acceptance_criteria>

---

## Task 5: Create app/contact/page.tsx

<read_first>
- .planning/phases/01-foundation-layout-shell/01-CONTEXT.md — D-12 (/contact — dedicated contact page; forms built in Phase 5), D-13 (a homepage contact modal entry point is Phase 5 scope; Phase 1 only needs the structural hook), D-15 (Phase 1 placeholder shell)
</read_first>

<action>
Create `app/contact/page.tsx` with the following content:

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation — get a quote for your next website project or submit a detailed project brief.",
  openGraph: {
    title: "Contact | C2B Web Design",
    description:
      "Start a conversation — get a quote for your next website project or submit a detailed project brief.",
  },
}

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 5 — Contact & Lead Capture
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Get in <span className="text-gold">Touch</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Contact forms and the lead capture flow are built in Phase 5.
          This page is a navigable shell — structure and metadata are complete.
        </p>
        <p className="mt-6 text-text-muted text-sm">
          In the meantime:{" "}
          <a
            href="mailto:hello@c2bwebdesign.co.uk"
            className="text-gold hover:opacity-80 transition-opacity duration-150"
          >
            hello@c2bwebdesign.co.uk
          </a>
        </p>
      </div>
    </section>
  )
}
```
</action>

<acceptance_criteria>
- `app/contact/page.tsx` exists on disk
- File exports `metadata` with `title` equal to `"Contact"`
- File exports a default `ContactPage` component
- File contains `text-gold` class
- File contains `hello@c2bwebdesign.co.uk` email link
- `npm run build` exits 0 with no errors referencing this file
</acceptance_criteria>

</tasks>

<verification>
1. `npm run build` — must exit 0. All 5 pages must compile without TypeScript errors.
2. `npm run dev` — open localhost:3000 and click every nav link in sequence:
   - Home (/) — dark background, "C2B Web Design" heading in gold
   - Portfolio (/portfolio) — "Our Work" heading, "Portfolio | C2B Web Design" in browser tab
   - Process (/process) — "Our Process" heading, correct tab title
   - Contact (/contact) — "Get in Touch" heading, email link visible, correct tab title
3. Navigate to localhost:3000/analyser directly — "Website Analyser" heading, correct tab title
4. Verify no page throws a 404 — all routes defined and reachable
5. Verify the browser tab title follows the template from root layout: e.g. Portfolio page shows "Portfolio | C2B Web Design"
6. Verify no horizontal overflow on any page at 375px mobile viewport width
</verification>

<success_criteria>
- [ ] `app/page.tsx` — homepage shell, no Vercel scaffold content, brand-styled
- [ ] `app/portfolio/page.tsx` — Portfolio shell with correct metadata
- [ ] `app/analyser/page.tsx` — Analyser shell with correct metadata
- [ ] `app/process/page.tsx` — Process shell with correct metadata
- [ ] `app/contact/page.tsx` — Contact shell with correct metadata and email fallback
- [ ] Every nav link navigates to a correctly titled, brand-styled page — no 404s
- [ ] Browser tab titles follow `"[Page] | C2B Web Design"` template (set in root layout)
- [ ] `npm run build` exits 0
</success_criteria>

<must_haves>
  <truths>
    - Each page exports `metadata.title` as a plain string (e.g. `"Portfolio"`). The root layout's `metadata.title.template` (`"%s | C2B Web Design"`) automatically appends the site name — no need to repeat it in every page file.
    - The homepage (`/`) is the ONLY page that uses a full title string (`"C2B Web Design — Premium Web Design Agency"`) to override the template — this is intentional for SEO.
    - The root layout's `<main className="flex-1 pt-16">` wraps all page content. Pages do NOT need to add their own padding-top — it is inherited from the layout.
    - `min-h-[calc(100vh-4rem)]` on each page's root section ensures the placeholder fills the viewport minus the 64px fixed nav height, so the footer never floats mid-screen on a mostly-empty page.
    - Phase 1 pages intentionally have no real content — they are structural scaffolding only. Do not add hero imagery, animations, or form fields; those are Phase 2–5 scope.
  </truths>
</must_haves>
