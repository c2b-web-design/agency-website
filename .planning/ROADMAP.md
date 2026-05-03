# Roadmap — C2B Web Design Agency Website

**6 phases** | **25 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|-----------------|
| 1 | Foundation + Layout Shell | Brand tokens and site skeleton all other phases build on | BRAND-01 to 03, LAYOUT-01 to 03 | 3 |
| 2 | Hero Section | Scroll-staged cinematic hero that makes an immediate premium impression | HERO-01 to 04 | 4 |
| 3 | Video Showcase Gallery | Cinematic gallery that demonstrates techniques and builds instant credibility | GALLERY-01 to 04 | 4 |
| 4 | Client Website Analyser | Interactive AI tool that demonstrates expertise and creates urgency | ANALYSER-01 to 04 | 4 |
| 5 | Contact & Lead Capture | Premium touchpoints for serious enquiries | CONTACT-01 to 04 | 4 |
| 6 | Polish, Performance & Launch | Production-ready quality across all devices | PERF-01 to 03 | 3 |

---

## Phase 1: Foundation + Layout Shell

**Goal:** Establish the brand token system and site layout structure that every subsequent phase builds on. Nothing visual ships in phases 2–6 without this foundation.

**Requirements:** BRAND-01, BRAND-02, BRAND-03, LAYOUT-01, LAYOUT-02, LAYOUT-03

**UI hint**: yes

**Success criteria:**
1. `tokens.ts` exports all brand tokens (colors, fonts, spacing, animation durations) and is imported by Tailwind config
2. Visiting the site shows the dark background, gold accent, and correct typography with no flash of unstyled content
3. Navigation is visible and functional on both desktop and mobile (hamburger menu on small screens)

---

## Phase 2: Hero Section

**Goal:** A scroll-staged hero sequence that makes visitors feel the difference within 5 seconds of landing — not just see it.

**Requirements:** HERO-01, HERO-02, HERO-03, HERO-04

**UI hint**: yes

**Success criteria:**
1. Background video plays automatically and loops seamlessly on page load
2. Scrolling from 0–40% of the hero triggers the gold-to-glass logo morph, tied precisely to scroll position
3. Scrolling from 40–100% of the hero triggers the 2D-to-3D logo emergence animation
4. Background parallax layers are visibly moving at different speeds — depth is perceptible

---

## Phase 3: Video Showcase Gallery

**Goal:** A cinematic gallery section that shows prospective clients what's possible and builds trust through demonstration rather than description.

**Requirements:** GALLERY-01, GALLERY-02, GALLERY-03, GALLERY-04

**UI hint**: yes

**Success criteria:**
1. Gallery displays a minimum of 6 video cards in a responsive grid
2. Hovering any card autoplays its video within 200ms; leaving the card pauses and resets it
3. Every card has a plain-English caption — zero technical terms visible to the visitor
4. Scrolling to the gallery section causes cards to stagger-animate into view one by one

---

## Phase 4: Client Website Analyser

**Goal:** An interactive AI feature that turns curiosity into urgency — a prospect enters their URL and sees exactly what's holding their current site back.

**Requirements:** ANALYSER-01, ANALYSER-02, ANALYSER-03, ANALYSER-04

**UI hint**: yes

**Success criteria:**
1. Visitor can type a URL and submit; the form prevents submission of an obviously invalid URL
2. A structured analysis result appears within 10 seconds of submission
3. Result includes at minimum three graded sections: design quality, mobile-friendliness, conversion potential
4. A premium animated loading state plays from submission until the result appears — no blank screen at any point

---

## Phase 5: Contact & Lead Capture

**Goal:** Multiple premium touchpoints that make it effortless for a serious prospect to start a conversation.

**Requirements:** CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04

**UI hint**: yes

**Success criteria:**
1. Short quote form submits successfully and shows a confirmation message
2. Long project brief form captures all required fields and submits
3. Submitting either form with missing or invalid data shows specific, helpful error messages (not generic "please fill in this field")
4. The success confirmation state looks as visually polished as the hero section — not a plain text message

---

## Phase 6: Polish, Performance & Launch

**Goal:** Verify the site is production-ready — fast, smooth on mobile, and meeting quality standards — before pointing traffic at it.

**Requirements:** PERF-01, PERF-02, PERF-03

**Success criteria:**
1. All sections render correctly on a 320px mobile viewport with no horizontal overflow or overlapping elements
2. All scroll and hover animations run at 60fps when tested on Chrome DevTools with CPU throttling set to 4x slowdown
3. Vercel production deployment achieves LCP < 2.5s and CLS < 0.1 on Google PageSpeed Insights

---

## Phase Dependency Notes

- **Phase 1 must complete before any other phase** — tokens.ts and global styles are required by all components
- **Phases 2–5 can execute in any order** after Phase 1, but building sequentially (hero → gallery → analyser → contact) mirrors the natural scroll order of the finished page
- **Phase 6 runs last** — it audits the complete assembled site

---

## v2 Backlog (Post-Launch)

| Feature | Requirements | Notes |
|---------|-------------|-------|
| Website Transformation Tool | TRANSFORM-01, 02, 03 | Full AI + Browser MCP pipeline; builds on Analyser infrastructure from Phase 4 |
