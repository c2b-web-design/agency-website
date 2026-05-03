# Requirements — C2B Web Design Agency Website

## v1 Requirements

### Brand & Foundation

- [ ] **BRAND-01**: Developer can import all design tokens (colors, typography, spacing, animation durations) from a single `tokens.ts` file
- [ ] **BRAND-02**: Site renders with dark-first palette — deep charcoal/near-black background, gold primary accent, silver/platinum secondary accents
- [ ] **BRAND-03**: Headings use a premium display font; body copy uses a clean sans-serif; font sizes follow a defined typographic scale

### Layout & Navigation

- [ ] **LAYOUT-01**: Visitor can navigate to any section via a top navigation bar that stays readable on scroll; on mobile, navigation collapses to a hamburger menu
- [ ] **LAYOUT-02**: Footer displays agency contact information and relevant links
- [ ] **LAYOUT-03**: Each page has unique title, meta description, and Open Graph tags for SEO and link sharing

### Hero Section

- [ ] **HERO-01**: Visitor sees a slow-moving abstract video playing as the hero background when the page loads
- [ ] **HERO-02**: As visitor scrolls into the hero, the c2b logo animates from liquid gold to glass (and responds back); the morph is triggered by scroll position, not a timer
- [ ] **HERO-03**: As visitor continues scrolling, the logo shifts from 2D into a 3D-style dimensional emergence, creating a sense of the logo entering physical space
- [ ] **HERO-04**: Background layers (video, decorative shapes, gradient) move at different scroll speeds to create parallax depth

### Video Showcase Gallery

- [ ] **GALLERY-01**: Visitor sees a grid of at least 6 video cards, each showing a looping technique demonstration
- [ ] **GALLERY-02**: Hovering a card causes its video to autoplay within 200ms; moving away pauses it and returns to the poster frame
- [ ] **GALLERY-03**: Each card displays a plain-English caption explaining the business benefit (no technical jargon)
- [ ] **GALLERY-04**: Gallery cards animate into view with a staggered entrance as visitor scrolls to the section

### Client Website Analyser

- [ ] **ANALYSER-01**: Visitor can enter a URL into a clearly labelled input field and submit it for analysis
- [ ] **ANALYSER-02**: Submission triggers a server-side Anthropic API call that returns a structured analysis of the provided website
- [ ] **ANALYSER-03**: Result displays a report covering at minimum: design quality, mobile-friendliness, and conversion potential — each with a grade and written commentary
- [ ] **ANALYSER-04**: While analysis runs, visitor sees a progressive loading state (streamed or animated) that never shows a blank screen

### Contact & Lead Capture

- [ ] **CONTACT-01**: Visitor can fill in and submit a short quote request form (name, website URL, project description, budget range)
- [ ] **CONTACT-02**: Visitor who wants to provide full project details can fill in a longer brief form with additional fields
- [ ] **CONTACT-03**: Both forms validate inputs and display clear, specific error messages for any invalid fields
- [ ] **CONTACT-04**: Successful form submission shows a confirmation state that matches the premium aesthetic of the site

### Performance & Quality

- [ ] **PERF-01**: All page layouts are fully functional on mobile viewports from 320px width upward (mobile-first)
- [ ] **PERF-02**: All scroll and hover animations run at 60fps with no visible jank on a mid-range device
- [ ] **PERF-03**: Site achieves green Core Web Vitals (LCP < 2.5s, CLS < 0.1) on Vercel production

---

## v2 Requirements (Deferred — Post-Launch)

### Website Transformation Tool

- [ ] **TRANSFORM-01**: Visitor can enter a URL; Browser MCP visits the live site and captures a screenshot
- [ ] **TRANSFORM-02**: Screenshot and URL are sent to Anthropic API, which generates a detailed written analysis of weaknesses and a redesign vision
- [ ] **TRANSFORM-03**: Redesign vision renders progressively (incremental streaming), showing the site being "built" in real time

---

## Out of Scope

| Item | Reason |
|------|--------|
| Website Transformation Tool (v1) | Requires Browser MCP + full AI pipeline; blocked until core site is live and proven |
| User authentication / accounts | Marketing site has no login requirement |
| Client portal / project dashboard | Future product; separate build |
| CMS / blog | Content is stable; CMS adds complexity without immediate value |
| E-commerce / payment processing | Projects quoted individually; no online checkout needed |
| Multi-language support | UK market focus for v1 |

---

## Traceability

| REQ-ID | Phase |
|--------|-------|
| BRAND-01 | Phase 1 |
| BRAND-02 | Phase 1 |
| BRAND-03 | Phase 1 |
| LAYOUT-01 | Phase 1 |
| LAYOUT-02 | Phase 1 |
| LAYOUT-03 | Phase 1 |
| HERO-01 | Phase 2 |
| HERO-02 | Phase 2 |
| HERO-03 | Phase 2 |
| HERO-04 | Phase 2 |
| GALLERY-01 | Phase 3 |
| GALLERY-02 | Phase 3 |
| GALLERY-03 | Phase 3 |
| GALLERY-04 | Phase 3 |
| ANALYSER-01 | Phase 4 |
| ANALYSER-02 | Phase 4 |
| ANALYSER-03 | Phase 4 |
| ANALYSER-04 | Phase 4 |
| CONTACT-01 | Phase 5 |
| CONTACT-02 | Phase 5 |
| CONTACT-03 | Phase 5 |
| CONTACT-04 | Phase 5 |
| PERF-01 | Phase 6 |
| PERF-02 | Phase 6 |
| PERF-03 | Phase 6 |
