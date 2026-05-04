# Phase 1: Foundation + Layout Shell — Context

**Gathered:** 2026-05-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the brand token system, global styles, site-wide layout (navigation + footer), multi-route page scaffolding, and SEO meta configuration. This phase creates the visual and structural foundation that every subsequent phase builds on.

**In scope:** tokens.ts, globals.css brand tokens, root layout, sticky nav component, footer component, all page route shells (/, /portfolio, /analyser, /process, /contact), SEO metadata config.

**Out of scope:** Any section content beyond nav and footer — hero, gallery, analyser tool, contact forms, and process page content are all built in their own phases. Animation libraries (Framer Motion, GSAP) are installed here if needed for nav transitions but the complex animation sequences begin in Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Color Palette

- **D-01:** Primary gold is `#C9A84C` — warm liquid gold with amber undertone. This is the definitive brand accent color used for key highlights, logo treatment, and premium UI moments.
- **D-02:** Background is `#111108` — warm charcoal near-black with a subtle amber undertone that cohesively echoes the gold. Not pure black.
- **D-03:** Silver/platinum is used sparingly — borders, dividers, and secondary/muted text only. It is NOT a prominent second accent. Planner has discretion on specific hex value (a desaturated warm silver around `#A8A090` area would suit the warm palette).

### Typography

- **D-04:** Font architecture uses named slots in `tokens.ts` — one variable for `--font-display` (headings, hero, prominent text) and one for `--font-body` (paragraphs, UI labels, navigation links). Specific font families are TBD — use strong, bold placeholder fonts that can be swapped in one place when the final pairing is chosen.
- **D-05:** A typographic scale is defined in tokens (heading sizes h1–h4, body sizes, line heights, letter spacing for display text). Headings should feel bold and confident — large sizes, tight letter-spacing for display use.

### Navigation

- **D-06:** Sticky header — fixed at the top of the viewport on all pages and at all scroll positions.
- **D-07:** Visual transition: starts fully transparent when the visitor is at the top of any page; smoothly transitions to a dark frosted glass panel (glassmorphism — backdrop-blur + semi-transparent dark background) as the user scrolls down. Transition should be smooth, not instant.
- **D-08:** Links: **Home, Portfolio, Process, Contact** — exactly these 4, in this order, no dropdowns, no sub-menus.
- **D-09:** Layout: c2b logo (left) — nav links (right). Standard premium agency arrangement.
- **D-10:** Mobile breakpoint: hamburger menu icon replaces the link list; menu opens as a full-width or slide-in panel with the same 4 links.
- **D-11:** Hover states on nav links should use refined transitions that echo the brand — a gold underline animation, subtle gold glow, or smooth opacity shift. No aggressive effects.

### Site Structure (Routes)

- **D-12:** Multi-route architecture using Next.js App Router:
  - `/` — Home page, hero content only (shell in Phase 1, hero built in Phase 2)
  - `/portfolio` — Gallery and case study videos (shell in Phase 1, built in Phase 3)
  - `/analyser` — Website analyser interactive tool (shell in Phase 1, built in Phase 4)
  - `/process` — How the agency works, client journey explanation
  - `/contact` — Dedicated contact page (shell in Phase 1, forms built in Phase 5)
- **D-13:** A homepage contact modal entry point exists (button or CTA that opens a contact modal overlay). The modal component itself is Phase 5 scope; Phase 1 only needs the structural hook.
- **D-14:** Navigation uses Next.js `<Link>` for all inter-route navigation. No full page reloads.
- **D-15:** Phase 1 delivers all routes as placeholder shells — correct layout (nav + footer), correct page title, empty main content area — so the site is navigable immediately and future phases can drop content in.

### Claude's Discretion

- **Silver/platinum exact value:** Choose a warm-toned muted silver that harmonises with `#111108` background and `#C9A84C` gold. Around `#A8A090` or similar. Goal is elegant secondary detail, not a competing accent.
- **Placeholder font selection:** Choose a bold sans-serif for `--font-display` and a clean legible sans-serif for `--font-body`. These should be Google Fonts for easy swapping. Avoid anything too generic (not Arial/Roboto). Suggested placeholders: DM Serif Display + Inter, or Fraunces + Figtree — planner should choose what best echoes the luxury/premium intent.
- **Gold tint variations:** Define light and dark tints of the gold (`#C9A84C`) in tokens for use in hover states, card borders, gradient endpoints. Planner has discretion on values.
- **Animation library install:** If Framer Motion is needed for the nav scroll transition, install it in this phase. GSAP install can defer to Phase 2 (hero animations).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — brand direction, design philosophy, business context, constraints
- `.planning/REQUIREMENTS.md` — BRAND-01–03 and LAYOUT-01–03 (the 6 requirements this phase delivers)
- `.planning/ROADMAP.md` — Phase 1 success criteria and phase dependency notes

### Existing Codebase
- `app/layout.tsx` — current root layout (will be significantly reworked)
- `app/globals.css` — Tailwind v4 CSS config file (critical: token variables go in the `@theme` block here, NOT in a `tailwind.config.js`)
- `package.json` — current dependencies (Next.js 16.2.4, React 19.2.4, Tailwind CSS v4, TypeScript 5 — Framer Motion, GSAP, Shadcn/UI not yet installed)

No external ADRs or specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx` — root layout pattern exists and is the right place for the nav and footer; will be rebuilt with brand tokens
- `app/globals.css` — Tailwind v4 `@theme inline {}` block already set up; this is where all CSS custom properties (design tokens) are defined — NOT a separate config file

### Established Patterns
- **Tailwind v4 CSS-first tokens:** Design token variables must be defined inside `@theme` blocks in CSS, not in a `tailwind.config.ts`. The `tokens.ts` file holds TypeScript-accessible values (for Framer Motion, GSAP, and JS logic); CSS vars in `globals.css @theme` expose them to Tailwind utility classes. These two sources of truth must stay in sync.
- **Next.js App Router:** Project uses `app/` directory. Route files are `app/portfolio/page.tsx`, `app/contact/page.tsx` etc. Layouts at `app/layout.tsx` apply globally.
- **No component directory yet** — Phase 1 creates `components/` for the first time (Nav, Footer at minimum).

### Integration Points
- All subsequent phases drop their section content into the existing page shells created here
- The nav component created here is consumed unchanged by every page in Phases 2–5
- tokens.ts values are imported by any component needing brand colors, spacing, or animation durations

</code_context>

<specifics>
## Specific Ideas

- The c2b logo appears in the nav (left position). The full gold-to-glass morph animation is Phase 2 scope — Phase 1 uses a static or subtly refined version of the logo in the nav.
- The "liquid gold" motif is a recurring theme — the gold color should feel rich and warm, never flat or neon. Design decisions should reinforce depth and materiality.
- The frosted glass nav effect (when scrolled) aligns with the glassmorphism design philosophy locked in PROJECT.md — `backdrop-filter: blur()` on a semi-transparent dark background.
- Navigation hover states should feel refined and deliberate — a thin gold underline that slides in, or a very subtle gold glow — never a jarring color change.

</specifics>

<deferred>
## Deferred Ideas

- **Contact modal component** — A homepage CTA will trigger a contact modal. The modal UI itself is Phase 5 scope. Phase 1 only establishes the structural hook (button/CTA) and knows the modal will exist.
- **Process page content** — The `/process` page route is scaffolded in Phase 1 but its content (client journey steps, visuals) is not defined in this phase. That content design belongs in a dedicated phase or as part of the Phase 5 contact/conversion phase.

</deferred>

---

*Phase: 1-Foundation + Layout Shell*
*Context gathered: 2026-05-04*
