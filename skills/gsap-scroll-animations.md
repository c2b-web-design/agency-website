# GSAP Scroll Animations

GSAP (GreenSock Animation Platform) is the industry standard for high-performance, timeline-based animations. In this project, it is used specifically for complex scroll-driven effects that go beyond what Framer Motion's `whileInView` can handle — particularly parallax scrolling, scrubbed timelines (where animation progress is tied directly to scroll position), and sequences that span multiple elements across a section.

**Use Framer Motion for component-level animations.** Use GSAP when you need precise control over scroll position, multi-element timelines, or parallax depth effects.

---

## Setup

GSAP requires ScrollTrigger for scroll-driven animations. Both must be registered before use.

```bash
npm install gsap
```

```tsx
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
```

Always register plugins once, at module level or in a top-level layout component. Registering multiple times is harmless but unnecessary.

**Always add `"use client"`** — GSAP requires browser APIs (`window`, `document`) and cannot run on the server.

---

## When to Use GSAP vs Framer Motion

| Situation | Use |
|---|---|
| Card fades in on scroll | Framer Motion `whileInView` |
| Heading slides up on scroll | Framer Motion `whileInView` |
| Background layer moves at 0.4x scroll speed (parallax) | GSAP ScrollTrigger |
| Text reveals character by character as user scrolls | GSAP ScrollTrigger scrub |
| Multiple elements animate in a coordinated sequence tied to scroll | GSAP Timeline + ScrollTrigger |
| Pin a section and animate content while the page is "paused" | GSAP ScrollTrigger `pin` |
| Horizontal scroll section | GSAP ScrollTrigger |

---

## Core Concept: ScrollTrigger

ScrollTrigger links animation progress to scroll position. The two main modes are:

**Triggered** — animation plays when the element enters the viewport (similar to `whileInView` but with more control over start/end points).

**Scrubbed** — animation progress is tied directly to how far the user has scrolled. Scrubbing forward plays the animation forward; scrolling back reverses it.

```tsx
// Triggered: plays once when element enters view
gsap.from(element, {
  opacity: 0,
  y: 40,
  duration: 0.8,
  scrollTrigger: {
    trigger: element,
    start: "top 80%", // when element's top hits 80% down the viewport
  },
})

// Scrubbed: animation progress tied directly to scroll position
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: containerElement,
    start: "top top",
    end: "bottom top",
    scrub: true, // links animation progress to scroll progress
  },
})
```

---

## Parallax Scrolling

Parallax creates depth by moving elements at different speeds. Background elements move slowly; foreground elements move at full speed or faster. The effect makes the page feel three-dimensional.

### Basic parallax layer

```tsx
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ParallaxSection() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background moves at 40% of scroll speed — creates depth
      gsap.to(bgRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert() // clean up on unmount
  }, [])

  return (
    <div className="relative overflow-hidden h-screen">
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Hero Heading</h1>
      </div>
    </div>
  )
}
```

`scale-110` on the background prevents the edges from showing as it moves.
`ease: "none"` is correct for scrubbed animations — easing is handled by the scroll speed itself.
`ctx.revert()` in the cleanup tears down all ScrollTriggers created inside that context, preventing memory leaks.

### Floating decorative elements

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Slow-moving orb in the background
    gsap.to(".parallax-orb-slow", {
      y: -60,
      scrollTrigger: { trigger: sectionRef.current, scrub: 1, start: "top bottom", end: "bottom top" },
    })

    // Faster-moving orb in the midground
    gsap.to(".parallax-orb-fast", {
      y: -140,
      scrollTrigger: { trigger: sectionRef.current, scrub: 1, start: "top bottom", end: "bottom top" },
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

Using class selectors inside `gsap.context()` with a scope ref scopes the selector to that component's DOM, preventing conflicts between multiple instances.

---

## Timeline-Based Animations

A GSAP Timeline sequences multiple animations in order. Each animation starts after the previous one finishes (by default), or at precise offset points.

### Sequential entrance animation

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    })

    tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.4 })
      .from(".hero-heading", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2") // starts 200ms before previous ends
      .from(".hero-subheading", { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
      .from(".hero-cta", { opacity: 0, y: 12, duration: 0.4 }, "-=0.1")
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

`"-=0.2"` — overlap with the previous animation by 200ms, making the sequence feel connected rather than staccato.
`"+=0.1"` — delay by 100ms after the previous animation finishes.
`"<"` — start at the same time as the previous animation.

---

## Pinned Sections

Pinning freezes the scroll position while the user continues to scroll, allowing content to animate within a "paused" viewport. Use this for dramatic reveals or horizontal storytelling.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // pin for a scroll distance equal to 2x the viewport height
        pin: true,
        scrub: 1,
      },
    })

    tl.to(".panel-1", { opacity: 0, x: -100 })
      .from(".panel-2", { opacity: 0, x: 100 })
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

---

## Horizontal Scroll Section

A section where content scrolls horizontally as the user scrolls vertically.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".h-panel")

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + containerRef.current!.offsetWidth,
      },
    })
  }, containerRef)

  return () => ctx.revert()
}, [])
```

---

## Text Reveal Effects

### Word-by-word reveal

```tsx
import { SplitText } from "gsap/SplitText" // requires GSAP Club (paid) or use manual split

// Manual word split alternative (free):
useEffect(() => {
  const ctx = gsap.context(() => {
    const words = headingRef.current?.querySelectorAll(".word")

    gsap.from(words, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: "easeOut",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    })
  }, headingRef)

  return () => ctx.revert()
}, [])
```

To use this, wrap each word in a `<span className="word">` in the JSX. For dynamic text, split programmatically:

```tsx
const words = text.split(" ").map((word, i) => (
  <span key={i} className="word inline-block mr-1">{word}</span>
))
```

---

## Cleanup and Memory Leaks

**Always clean up ScrollTriggers when a component unmounts.** Failing to do so causes ScrollTrigger instances to accumulate and fire against elements that no longer exist.

The `gsap.context()` pattern handles this automatically — call `.revert()` in the `useEffect` cleanup:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // all GSAP code here
  }, scopeRef) // pass a ref to scope selector queries

  return () => ctx.revert() // this is the cleanup
}, [])
```

---

## Best Practices

**Use `gsap.context()` always.** It scopes selector queries to a component and makes cleanup trivial. Never create ScrollTriggers without it.

**`ease: "none"` for scrubbed animations.** When scroll position directly controls animation progress, easing makes the motion feel disconnected. Omit it or set `"none"`.

**`scrub: 1` for smooth scrubbing.** `scrub: true` ties animation directly to scroll frames, which can feel jittery. `scrub: 1` adds a 1-second lag that smooths the motion.

**Trigger from a container, animate the children.** Set the `trigger` to a section wrapper, not the element being animated. This gives you more predictable start/end points.

**Refresh on font load.** If ScrollTrigger calculates positions before web fonts have loaded, element heights may be wrong. Call `ScrollTrigger.refresh()` after fonts are ready.

**Test with `markers: true` during development.** Add `markers: true` to any ScrollTrigger to see the start and end trigger points visually in the browser. Remove before shipping.

```tsx
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top 80%",
  markers: true, // shows start/end lines in the browser — remove before shipping
}
```
