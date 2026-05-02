@AGENTS.md

---

# C2B Web Design — Agency Website

## Project Overview & Business Goals

This is the official website for **C2B Web Design**, a high-end web design agency. The site serves two purposes simultaneously: it is both the agency's marketing presence and a live demonstration of what the agency can build for clients.

The core business goal is to convert visitors into paying clients by making an unforgettable first impression. Every scroll, hover, animation, and interaction should communicate one thing clearly: *this agency produces exceptional, premium work*. Visitors who land here should feel the difference immediately — not just see it.

Secondary goals:
- Showcase real client work in a way that builds instant credibility
- Provide an interactive tool that analyses a prospect's existing website and shows what C2B could do instead
- Make it trivially easy for interested clients to get in touch
- Demonstrate technical capability through the sophistication of the site itself

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components, file-based routing, built-in optimisation |
| Language | TypeScript | Catches errors before they reach the browser |
| Styling | Tailwind CSS | Utility-first, fast to iterate, easy to keep consistent |
| Animations | Framer Motion | Smooth, physics-based animations with scroll triggers |
| AI Integration | Anthropic API (Claude) | Powers the website transformation and analysis tools |
| Browser Automation | Browser MCP | Enables the live website screenshot and analysis feature |
| Deployment | Vercel | Zero-config deploys, edge network, preview URLs per branch |

**Important — Next.js version note:** This project uses Next.js 16, which has breaking changes from older versions. Before writing any Next.js code, read the relevant guide inside `node_modules/next/dist/docs/`. Do not assume API behaviour from training data — check the docs first.

---

## Working Preferences

These preferences apply throughout every conversation and every piece of work:

**Plain English first.** Before writing any code, explain what you are about to do in plain English. Describe the feature, why it works the way it does, and what the user will see or experience. No jargon without explanation.

**Step by step.** Break every task into numbered steps. Complete one step, confirm it works, then move to the next. Never skip ahead or bundle multiple unrelated changes into one block.

**Explain before you code.** If I ask for a new feature or a change, first describe your approach. Tell me what files will change, what the change will do, and what it will look like. Then write the code.

**Ask when uncertain.** If a requirement is ambiguous, ask a clarifying question rather than guessing. A 30-second question is better than 30 minutes of rework.

**No unexplained decisions.** If you make a design or architecture choice, explain why you made it. "I used a `useEffect` here because..." is always better than silently dropping code in.

**Keep it real.** If something is genuinely complex or will take multiple steps, say so upfront. Do not understate effort or complexity.

---

## Design Philosophy

The visual identity of this site must feel **premium, modern, and alive**. It should feel like it belongs in a design award showcase, not on a template marketplace.

### Core Aesthetic

- **Glassmorphism** — frosted glass panels, translucent backgrounds with backdrop blur, layered depth. Cards and UI elements should feel like they float above a rich background, not sit flat on a white page.
- **Dark-first design** — the default palette is dark (deep blacks, dark greys, near-blacks with subtle warm or cool undertones). Accent colours should pop against darkness, not compete with a white background.
- **Rich gradients** — use gradients that feel hand-crafted, not generic. Subtle colour shifts across sections, gradient text for headings, gradient borders on glass cards.

### Motion & Animation

Every animation must serve a purpose — either guiding attention, rewarding interaction, or communicating quality.

- **Parallax scrolling** — background layers, floating elements, and decorative shapes should move at different speeds as the user scrolls, creating genuine depth.
- **Scroll-triggered animations** — elements should animate into view as they enter the viewport. Fade up, scale in, slide in from the side. Never dump everything on screen at once.
- **Micro-animations** — buttons should respond on hover with subtle scale or glow changes. Links should have thoughtful underline animations. Form fields should have smooth focus states. These small moments add up to a feeling of quality.
- **Staggered entrances** — when multiple items appear together (a grid of cards, a list of services), stagger their entrance so they cascade in rather than popping up simultaneously.
- **Smooth transitions** — page transitions, state changes, and loading states should all be smooth. Nothing should snap or jump.

### Typography

- Use large, confident heading sizes. Headlines should feel bold and owning of the space.
- Pair a display font for headings with a clean sans-serif for body text.
- Gradient text on key headings to add visual interest without adding noise.

### Spacing & Layout

- Generous whitespace — premium brands do not crowd their layouts.
- Sections should breathe. Give content room to exist.
- Use a consistent grid but allow hero sections and showcase areas to break the grid intentionally for drama.

---

## Key Features

### 1. Website Transformation Tool

The flagship interactive feature. A visitor enters their existing website URL. The tool:
1. Uses Browser MCP to capture a screenshot of the current site
2. Sends the screenshot and URL to Claude via the Anthropic API
3. Claude analyses the site's design, UX, and technical weaknesses
4. Generates a detailed written breakdown of what could be improved
5. Produces a vision of what C2B would build instead

This feature exists to make the abstract concrete — prospects stop wondering "what would they do for me?" and start seeing it.

### 2. Video Showcase Gallery

A premium gallery of video case studies showing before/after transformations of client websites. Videos autoplay on hover, have smooth loading states, and are presented in a cinematic layout. The gallery should feel like a film reel, not a photo album.

### 3. Client Website Analyser

A lighter version of the transformation tool — focused on generating an instant report card for a prospect's website. Grades it on design, performance, mobile-friendliness, and conversion potential. Designed to create urgency and demonstrate expertise in a single interaction.

### 4. Contact Forms

Multiple touch points for getting in touch:
- A short "get a quote" form (name, website, what they need, budget range)
- A detailed project brief form for serious enquiries
- Both forms should have smooth validation, clear feedback, and a confirmation state that feels as premium as the rest of the site

---

## Business Model

**Primary revenue:** Custom website design and development for small-to-medium businesses. Project-based pricing, not hourly.

**Secondary revenue:** Website maintenance retainers, monthly hosting and support packages.

**Target client:** Business owners who understand that their website is their most important sales tool and are willing to invest in doing it properly. Not budget seekers — value seekers.

**Differentiator:** The agency uses AI tools to move faster and think more creatively than traditional agencies, passing that efficiency on as better results in less time, not just as lower prices.

---

## Current Progress

The project is being built in numbered steps. Current status: **through Step 10**.

Steps completed so far establish the project foundation: repository setup, Next.js initialisation, TypeScript and Tailwind configuration, basic routing structure, and initial component scaffolding. Detailed step history is tracked in conversation context.

When continuing work, always ask which step we are on before writing any code, to ensure continuity.

---

## Error Handling & Self-Improvement

When something goes wrong — a build error, a layout that looks wrong, a feature that does not work as expected — handle it this way:

1. **Acknowledge the mistake clearly.** Do not gloss over it or bury it. "That did not work because..." is the right opening.
2. **Explain what went wrong.** Give a plain-English explanation of the root cause. Not just what the error message says — why the error happened.
3. **Propose the fix before applying it.** Describe what you are going to change and why it will solve the problem.
4. **Apply the fix.**
5. **Confirm it worked.** Do not assume the fix worked — verify it and say so.

No defensiveness. Mistakes happen in development. What matters is understanding them and fixing them cleanly. A clear explanation of a mistake is more valuable than pretending it did not happen.

If a fix does not work on the first attempt, repeat the process. Do not spiral into increasingly speculative changes — stop, re-read the error, and reason from first principles.

---

## Visual Feedback & Learning

When making visual changes, always show the reasoning:

- **Before and after.** When changing a component's appearance, describe what it looked like before and what it will look like after. If possible, point to the specific lines that changed.
- **Explain design decisions.** "I increased the padding here because the text was sitting too close to the card edge and it felt cramped" is more useful than silently changing a number.
- **Break complex features into understandable pieces.** If a feature involves multiple components, multiple files, or multiple concepts, explain each piece before combining them. Build understanding alongside the code.
- **Name things clearly.** Component names, variable names, and CSS class names should describe what they are and what they do. Avoid abbreviations and clever shorthand.

---

## Performance & Polish

Every element on this site should feel intentional, smooth, and premium. This means:

- **No layout shifts.** Reserve space for images and dynamic content before it loads. Nothing should jump or reflow after the page appears.
- **Smooth at 60fps.** Animations must not cause jank. Use CSS transforms and opacity for animations — not layout properties like `width`, `height`, or `margin`.
- **Fast first load.** Use Next.js image optimisation, lazy loading for below-the-fold content, and code splitting. The site should feel instant.
- **Mobile-first.** Every layout must work on a phone before it works on a desktop. Design mobile layouts first, then enhance for larger screens.
- **Accessible.** Sufficient colour contrast, keyboard navigability, proper semantic HTML, and ARIA labels where needed. Premium does not mean inaccessible.
- **No half-finished states.** Loading states, empty states, error states — all of them need designs. A blank white box while content loads is not acceptable on a premium agency site.

Polish is not optional. Polish is what separates a good site from a great one, and great is the only standard here.
