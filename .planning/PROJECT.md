# C2B Web Design — Agency Website

## What This Is

The official website for C2B Web Design, a high-end web design agency serving UK small-to-medium businesses. The site serves two purposes simultaneously: it is the agency's primary marketing and lead generation presence, and it is a live demonstration of what the agency can build for clients. Every interaction should make a visitor feel the difference immediately — not just see it.

## Core Value

Convert visitors into paying clients through an unforgettable first impression that proves the agency's quality before a single word is read.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Brand & Foundation**
- [ ] Brand token system (`tokens.ts`) — centralized colors, typography, spacing, animation settings
- [ ] Dark-first color palette — gold primary, deep charcoal/black background, silver/platinum accents
- [ ] Typography system — display font for headings, clean sans-serif for body

**Site Layout**
- [ ] Site navigation — smooth-scroll links, mobile hamburger menu
- [ ] Footer — contact details, social links, agency info
- [ ] SEO meta tags — title, description, Open Graph on all pages

**Hero Section**
- [ ] Background video layer — slow abstract video plays on page load
- [ ] Gold-to-glass logo morph — scroll-triggered, c2b logo transforms from liquid gold to glass and back
- [ ] 2D-to-3D logo emergence — continued scrolling triggers dimensional shift animation
- [ ] Parallax depth layers — background elements move at different speeds for genuine depth

**Video Showcase Gallery**
- [ ] Video grid — displays looping technique demo videos
- [ ] Hover autoplay — videos autoplay on hover with smooth transition
- [ ] Business benefit captions — plain English descriptions, no technical jargon
- [ ] Scroll-triggered stagger entrance — cards cascade in on viewport entry

**Client Website Analyser**
- [ ] URL input form — visitor enters their website URL
- [ ] Anthropic API analysis route — generates improvement report
- [ ] Report display — covers design, performance, conversion potential
- [ ] Progressive loading state — streams result, never shows blank wait

**Contact & Lead Capture**
- [ ] Quick quote form — name, website URL, what they need, budget range
- [ ] Detailed project brief form — for serious enquiries
- [ ] Form validation — clear error states, real-time feedback
- [ ] Premium confirmation state — success message as polished as the rest of the site

### Out of Scope

- **Website Transformation Tool** — deferred to Phase 2 post-launch; requires Browser MCP + full AI pipeline and launches after the core site is live and proven
- **Authentication / user accounts** — marketing site has no login requirement
- **Client portal / dashboard** — internal tooling is a separate future product
- **CMS / blog** — not in scope for v1
- **E-commerce / payment processing** — projects are quoted individually, no online checkout needed

## Context

**Business model:** Project-based pricing (£2,000–£5,000+ per project) plus monthly hosting/maintenance retainers. Target client is a UK business owner who understands their website is their most important sales tool and is willing to invest.

**Differentiator:** Agency uses AI tools (Claude) to move faster and think more creatively than traditional agencies — passed on as better results in less time, not lower prices.

**Deployment:** Live on Vercel, auto-deploys from GitHub main branch. Infrastructure already set up and operational.

**Design direction:** Glassmorphism, dark-first, gold/charcoal palette. Premium feel through generous whitespace, confident typography, and purposeful animation. Nothing cheap, nothing generic.

**Hero approach:** The hero is a scroll-staged sequence — three interconnected concepts play out as the visitor scrolls: (1) abstract background video, (2) gold-to-glass c2b logo morph, (3) 2D-to-3D dimensional logo emergence.

## Constraints

- **Tech stack**: Next.js (latest), TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion, GSAP — locked in, no substitutions
- **AI integration**: Anthropic API (Claude) for the Analyser; Browser MCP reserved for Phase 2 Transformation Tool
- **Performance**: Animations must run at 60fps, no layout shifts, Core Web Vitals in green
- **Mobile-first**: Every layout must work on mobile (minimum 320px) before desktop
- **Accessibility**: Sufficient contrast, keyboard nav, semantic HTML — premium does not mean inaccessible
- **Brand**: Gold primary, charcoal/black background, silver accents — specific hex codes TBD in Phase 1

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Transformation Tool deferred to Phase 2 | Launch core visual showcase first; AI pipeline is meaningful infrastructure that shouldn't block launch | — Pending |
| Hero as scroll-staged sequence | Three interconnected concepts (video → gold-to-glass → 2D/3D) play out progressively on scroll — cinematic, not cluttered | — Pending |
| Glassmorphism + dark-first aesthetic | Premium brand signal; frosted glass on dark backgrounds creates depth and luxury feel that matches £2k-£5k positioning | — Pending |
| No CMS in v1 | Marketing site content is stable; CMS adds complexity without immediate value | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*
