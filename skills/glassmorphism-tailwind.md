# Glassmorphism with Tailwind CSS

Glassmorphism is the primary visual style for this project. It creates a layered, frosted-glass aesthetic where UI elements appear translucent — you can see blurred colour and shape through them. Done well, it feels premium, modern, and spatial. Done poorly, it feels muddy and unreadable.

This document covers how to implement glassmorphism correctly using Tailwind CSS utility classes.

---

## The Four Properties of Glassmorphism

Every glassmorphism element relies on these four properties working together:

1. **Semi-transparent background** — `bg-white/10` or `bg-black/20` (white or black with low opacity)
2. **Backdrop blur** — `backdrop-blur-md` or stronger — blurs whatever is behind the element
3. **Subtle border** — `border border-white/20` — a faint light border that catches light and defines the edge
4. **Background richness** — the element behind the glass panel must have colour and depth, otherwise the effect is invisible

Without a colourful, rich background behind it, a glass element just looks like a slightly foggy white card. Always design glass elements in context of what sits behind them.

---

## Base Glass Card

This is the standard glass card used throughout the project:

```tsx
<div className="
  rounded-2xl
  bg-white/5
  backdrop-blur-md
  border border-white/10
  p-6
  shadow-lg shadow-black/20
">
  Card content
</div>
```

Breakdown:
- `bg-white/5` — extremely subtle white tint, 5% opacity. Enough to catch the blur, not enough to obscure it.
- `backdrop-blur-md` — `blur(12px)`. The core effect. Blurs everything behind the card.
- `border border-white/10` — a faint white border at 10% opacity. Defines the card edge without being visible.
- `shadow-lg shadow-black/20` — a soft shadow below the card, reinforcing the floating/lifted feeling.

---

## Variant: Stronger Glass

For cards that need more presence — hero cards, featured sections, modals:

```tsx
<div className="
  rounded-2xl
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  p-8
  shadow-2xl shadow-black/40
">
  Featured content
</div>
```

- `bg-white/10` — slightly more opaque (10%), gives more body to the glass
- `backdrop-blur-xl` — `blur(24px)`, stronger blur
- `border-white/20` — more visible border for a card with more presence
- `shadow-2xl shadow-black/40` — deeper shadow for more lift

---

## Variant: Dark Glass (on light backgrounds)

If you ever use glass elements on a lighter background:

```tsx
<div className="
  rounded-2xl
  bg-black/20
  backdrop-blur-md
  border border-black/10
  p-6
">
  Content
</div>
```

---

## Gradient Glass Borders

A more polished technique: instead of a uniform border, use a gradient border that catches light at angles.

```tsx
// Approach 1: using a wrapper with gradient background
<div className="rounded-2xl p-px bg-gradient-to-br from-white/30 via-white/5 to-white/10">
  <div className="rounded-2xl bg-gray-900/80 backdrop-blur-md p-6">
    Card content
  </div>
</div>
```

The outer div creates a 1px (`p-px`) gradient border. The inner div is the actual card. The gradient border simulates light hitting the glass edge at different angles.

---

## Glass Navigation Bar

```tsx
<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-black/30
  backdrop-blur-lg
  border-b border-white/10
  px-6 py-4
">
  Navigation content
</nav>
```

- `fixed top-0` — stays at the top as the user scrolls
- `bg-black/30` — dark tint so the nav is readable against any page background
- `backdrop-blur-lg` — blurs the page content scrolling behind the nav
- `border-b border-white/10` — subtle bottom edge line

---

## Glass Modal / Overlay

```tsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

{/* Modal */}
<div className="
  fixed inset-0 flex items-center justify-center z-50 p-4
">
  <div className="
    w-full max-w-lg
    rounded-3xl
    bg-white/10
    backdrop-blur-xl
    border border-white/20
    shadow-2xl shadow-black/50
    p-8
  ">
    Modal content
  </div>
</div>
```

The backdrop uses `backdrop-blur-sm` to slightly blur the entire page, making the modal feel even more elevated.

---

## Glass Button

```tsx
<button className="
  px-6 py-3
  rounded-xl
  bg-white/10
  hover:bg-white/20
  backdrop-blur-sm
  border border-white/20
  hover:border-white/40
  text-white
  font-medium
  transition-all duration-200
">
  Get Started
</button>
```

The `transition-all` handles the hover state change smoothly without Framer Motion, which is appropriate for simple colour transitions.

---

## Frosted Glass Input Field

```tsx
<input
  type="text"
  placeholder="Your website URL"
  className="
    w-full px-4 py-3
    rounded-xl
    bg-white/5
    backdrop-blur-sm
    border border-white/10
    focus:border-white/30
    focus:bg-white/10
    text-white
    placeholder-white/40
    outline-none
    transition-all duration-200
  "
/>
```

`focus:border-white/30` and `focus:bg-white/10` give clear visual feedback when the field is active without breaking the glass aesthetic.

---

## Tailwind Backdrop Blur Reference

| Class | Blur Amount | Use for |
|---|---|---|
| `backdrop-blur-sm` | 4px | Subtle hints, overlays |
| `backdrop-blur` | 8px | Input fields, small elements |
| `backdrop-blur-md` | 12px | Standard cards |
| `backdrop-blur-lg` | 16px | Navigation bars |
| `backdrop-blur-xl` | 24px | Featured cards, modals |
| `backdrop-blur-2xl` | 40px | Full-screen overlays |
| `backdrop-blur-3xl` | 64px | Maximum effect |

---

## Background Setup: Making Glass Work

Glass needs a rich background to look good. The most common approach is layered gradient orbs:

```tsx
<div className="relative min-h-screen bg-gray-950 overflow-hidden">
  {/* Background colour orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />

  {/* Page content with glass elements sits here */}
  <div className="relative z-10">
    {/* Glass cards here will have rich colour behind them */}
  </div>
</div>
```

- `blur-3xl` on the orbs creates soft colour blobs
- `bg-violet-600/30` at 30% opacity keeps them subtle
- The `relative z-10` content layer sits above the orbs
- Glass elements in the content layer will show the orb colours blurred through them

---

## Common Mistakes

**Glass with a plain white or grey background.** Glass needs colour and depth behind it. On a flat grey background, backdrop blur has nothing interesting to blur and the element just looks faded.

**Too much opacity.** `bg-white/40` is too opaque — it obscures the background and loses the glass effect entirely. Keep backgrounds at 5–15% opacity.

**No border.** Without the faint border, glass cards lose their edge definition and look like floating blurs. Always include `border border-white/10` at minimum.

**Blur too strong on small elements.** Heavy backdrop blur on small elements (like tags or badges) looks excessive. Use `backdrop-blur-sm` or `backdrop-blur` for small UI elements.

**Forgetting `overflow-hidden` on the page wrapper.** Gradient orbs extend beyond the viewport. Without `overflow-hidden` on the page wrapper, they create horizontal scroll.

---

## Browser Support

`backdrop-filter` (which powers `backdrop-blur`) is supported in all modern browsers. Safari requires the `-webkit-` prefix, but Tailwind handles this automatically. There is no need to write custom CSS for cross-browser support when using Tailwind's utilities.
