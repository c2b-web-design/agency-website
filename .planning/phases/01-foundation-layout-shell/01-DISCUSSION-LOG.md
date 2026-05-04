# Phase 1: Foundation + Layout Shell — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 01-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-04
**Phase:** 1-Foundation + Layout Shell
**Areas discussed:** Color palette, Font pairing, Navigation style, Site structure

---

## Color Palette

### Gold shade

| Option | Description | Selected |
|--------|-------------|----------|
| Warm liquid gold | #C9A84C — rich, amber-warm gold. Feels like molten metal, classic luxury | ✓ |
| Champagne gold | #D4AF37 — slightly cooler, more jewellery-refined. Sophisticated over flashy | |
| Deep amber gold | #B8860B — darker, more muted. Expensive-looking, restrained | |

**User's choice:** Warm liquid gold — #C9A84C
**Notes:** None additional.

### Background

| Option | Description | Selected |
|--------|-------------|----------|
| Pure near-black | #0A0A0A — very deep, almost black. Maximum contrast, stark and bold | |
| Warm charcoal | #111108 — near-black with a subtle warm undertone that echoes the gold | ✓ |
| Cool dark grey | #0D0D12 — near-black with a slight cool/blue undertone. More techy, futuristic | |

**User's choice:** Warm charcoal — #111108
**Notes:** The subtle amber undertone in the background cohesively echoes the gold primary.

### Silver/platinum accent prominence

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle silver | Used sparingly for borders, dividers, metadata text — accent without competing | |
| Platinum as secondary | A proper second accent color for card surfaces, icon fills, secondary buttons | |
| You decide | Use silver where it makes sense visually | ✓ |

**User's choice:** Deferred to Claude's discretion.
**Notes:** Silver should not compete with gold. Used for borders and secondary text.

---

## Font Pairing

### Display font

| Option | Description | Selected |
|--------|-------------|----------|
| Cormorant Garamond | Elegant serif, fashion/luxury editorial, dramatic contrast at large sizes | |
| Playfair Display | Classic high-contrast serif, rich and premium, more approachable | |
| Bebas Neue | Bold all-caps sans-serif, modern, strong, architectural | |
| Something else | User has different font in mind | |

**User's choice:** Choose later — "I will choose later. Placeholders for headings use bold fonts. For paragraphs and UI text use placeholders clean body fonts."
**Notes:** Font slots reserved in tokens.ts with named variables. Specific fonts are TBD. Placeholder fonts should be strong and premium-feeling.

---

## Navigation Style

### Nav behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Transparent → frosted glass | Starts transparent over hero, transitions to frosted glass on scroll | |
| Always frosted glass | Consistent dark glass background from the start | |
| You decide | Whatever makes the hero look most premium | |

**User's choice (free text):** "Modern minimal navigation with smooth animations and subtle motion effects. Sticky header, essential links only (Home, Portfolio, Process, Contact). Hover states with refined transitions that echo the brand aesthetic. No dropdowns or clutter."
**Notes:** User provided full description unprompted — captured verbatim as the navigation brief.

### Nav visual style (follow-up)

| Option | Description | Selected |
|--------|-------------|----------|
| Transparent → frosted glass | Starts transparent over hero, transitions to frosted glass on scroll | ✓ |
| Always frosted glass | Dark glass background consistently from the start | |
| You decide | Whatever makes the hero most premium | |

**User's choice:** Transparent frosted glass that becomes frosted glass on scroll.
**Notes:** Confirmed the cinematic scroll transition approach.

### Nav layout

| Option | Description | Selected |
|--------|-------------|----------|
| Logo left, links right | c2b logo on left, 4 links on right. Standard premium agency layout | ✓ |
| Logo centered, links either side | Links split around a centered logo. More editorial, fashion feel | |
| You decide | Whichever layout is strongest for this brand | |

**User's choice:** Logo left, links right.
**Notes:** None additional.

---

## Site Structure

### Page structure

| Option | Description | Selected |
|--------|-------------|----------|
| Single scrolling page | All sections on one page, nav links smooth-scroll to each section | |
| Multi-page routes | Each section gets its own URL | |
| Hybrid | Main sections on home page, Contact gets its own /contact route | |

**User's choice (free text):** "Homepage contains Hero section only. Portfolio/Gallery has its own route with case study details and videos. Website Analyzer tool is a separate interactive page. Contact form accessible both via homepage modal and dedicated contact page route."
**Notes:** More granular than the hybrid option presented — each section has its own route, not just contact. Homepage is hero-only.

### Process page

| Option | Description | Selected |
|--------|-------------|----------|
| How the agency works | Page explaining the client journey: discovery → design → build → launch | ✓ |
| Skip for now | Placeholder or not included in Phase 1 | |
| Something else | Different concept for that page | |

**User's choice:** How the agency works.
**Notes:** Process page shows the client journey and builds trust/expectation-setting.

---

## Claude's Discretion

- **Silver/platinum exact value:** Planner to choose a warm muted silver that harmonises with warm charcoal background and gold accent. Around #A8A090 area.
- **Placeholder font selection:** Planner to choose premium-feeling placeholder fonts for display and body slots. Should be Google Fonts for easy swapping.
- **Gold tint variations:** Define light/dark tints of #C9A84C for hover states and gradients.
- **Animation library install timing:** Framer Motion can be installed in Phase 1 if nav transition requires it; GSAP can defer to Phase 2.

## Deferred Ideas

- **Contact modal component** — Homepage CTA triggers a contact modal but the modal UI itself is Phase 5 scope.
- **Process page content** — Route scaffolded in Phase 1 but content design is a later-phase concern.
