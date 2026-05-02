# Framer Motion Animations

Framer Motion is the animation library for this project. It handles component transitions, hover effects, entrance animations, and scroll-driven motion. It integrates directly with React and works naturally inside Next.js client components.

**Always add `"use client"` at the top of any file that uses Framer Motion** — it relies on browser APIs and cannot run on the server.

---

## When to Use Framer Motion

- Animating a component when it mounts or unmounts
- Hover and tap interactions on buttons, cards, and links
- Staggered list or grid entrances
- Page or section transitions
- Any animation that needs to respond to React state

Use GSAP (see `gsap-scroll-animations.md`) for complex scroll-timeline work. Use Framer Motion for everything component-level.

---

## Core Concepts

### `motion` components

Wrap any HTML element with `motion.` to make it animatable.

```tsx
import { motion } from "framer-motion"

// A div that fades in when it mounts
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello
</motion.div>
```

`initial` — the starting state before the animation runs
`animate` — the target state to animate toward
`transition` — how to get there (duration, easing, delay, spring physics)

---

## Entrance Animations

### Fade up (most common entrance)

Elements appear from slightly below and fade in. Use this as the default entrance for cards, headings, and sections.

```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content here
</motion.div>
```

### Fade in from the side

Good for feature lists, testimonials, and two-column layouts where left and right panels animate in from their respective sides.

```tsx
// Slides in from the left
<motion.div
  initial={{ opacity: 0, x: -48 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>

// Slides in from the right
<motion.div
  initial={{ opacity: 0, x: 48 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

### Scale in

Good for modals, tooltips, and elements that should feel like they pop into existence.

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.92 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
/>
```

---

## Scroll-Triggered Entrances with `whileInView`

`whileInView` triggers the animation when the element scrolls into the viewport. This is the correct way to handle scroll-triggered entrances in Framer Motion.

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Animates in when scrolled into view
</motion.div>
```

`once: true` — only animates in once, does not replay on scroll back up
`margin: "-80px"` — triggers slightly before the element fully enters the viewport so it feels natural

---

## Staggered Entrances

When multiple items appear together — cards in a grid, items in a list — stagger their entrances so they cascade in sequentially rather than all appearing at once.

```tsx
import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // each child starts 100ms after the previous
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

function ServiceGrid({ services }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {services.map((service) => (
        <motion.li key={service.id} variants={itemVariants}>
          {service.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

The parent handles the stagger timing. Each child just declares its own `hidden` and `visible` states. Framer Motion wires them together automatically.

---

## Hover Effects

### Button hover with scale and glow

```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
  className="px-6 py-3 bg-violet-600 rounded-lg text-white"
>
  Get Started
</motion.button>
```

`whileHover` — applies while the cursor is over the element
`whileTap` — applies while the element is being pressed
Spring transitions feel more physical than duration-based ones for interactions

### Card hover with lift

Cards should feel like they lift off the surface when hovered.

```tsx
<motion.div
  whileHover={{ y: -6, scale: 1.01 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10"
>
  Card content
</motion.div>
```

### Link hover with underline animation

Do this in CSS with Tailwind for simple underlines. Use Framer Motion only if the underline itself needs to animate (e.g. wiping in from left to right) — that requires a `motion.span` with `scaleX`.

---

## Exit Animations with `AnimatePresence`

When a component is removed from the React tree, Framer Motion normally cannot animate it out because it is already gone. `AnimatePresence` solves this — it holds the component in the DOM long enough to finish its exit animation.

```tsx
import { AnimatePresence, motion } from "framer-motion"

function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center"
        >
          Modal content
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

`exit` — the state to animate toward before the element is removed
`key` — required on the animated child so Framer Motion can track it

---

## Transition Types

| Type | Use for | Example |
|---|---|---|
| `duration` + `ease` | Entrance/exit animations | `{ duration: 0.5, ease: "easeOut" }` |
| `spring` | Hover, tap, interactive motion | `{ type: "spring", stiffness: 300, damping: 20 }` |
| `tween` | Explicit eased motion | `{ type: "tween", duration: 0.4 }` |

**Common easing values:**
- `"easeOut"` — fast start, slow end. Good for entrances.
- `"easeIn"` — slow start, fast end. Good for exits.
- `"easeInOut"` — slow start and end. Good for looping or contained motion.
- Custom cubic bezier: `[0.16, 1, 0.3, 1]` — snappy ease-out with slight overshoot feel.

---

## Best Practices

**Keep motion values small.** A `y` shift of 24–40px feels intentional. 100px feels cheap. A `scale` of 1.04 feels premium. 1.15 feels broken.

**Use `once: true` on scroll animations.** Replaying animations every time the user scrolls up and back down is distracting.

**Prefer spring for interactions, duration for entrances.** Springs feel responsive to the user because they simulate physics. Duration-based easing is better for deliberate, choreographed entrances.

**Do not animate layout properties.** Never animate `width`, `height`, `padding`, or `margin` — they cause layout recalculations and will jank. Animate `transform` (via `x`, `y`, `scale`) and `opacity` only.

**Wrap `AnimatePresence` high in the tree.** It needs to be present before the conditional render, not inside it.

**Test on a mid-range phone.** Animations that are smooth on a MacBook Pro may stutter on an Android phone. Keep durations short and avoid animating too many elements simultaneously.
