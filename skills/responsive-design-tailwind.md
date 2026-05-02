# Responsive Design with Tailwind CSS

This project uses a mobile-first approach throughout. Every layout is designed to work on a phone first, then enhanced for larger screens. This is not just a best practice — it is the correct way to use Tailwind's responsive prefix system.

---

## Mobile-First: What It Means

In Tailwind, every unprefixed utility class applies at all screen sizes. Prefixed classes (`sm:`, `md:`, `lg:`, `xl:`) apply only at that breakpoint and above.

```tsx
// This text is small on mobile, large on desktop
<h1 className="text-2xl md:text-4xl lg:text-6xl">Heading</h1>

// This column layout is 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

The mental model: start with the smallest screen. Add prefixed classes to override as the screen gets larger. Never start with desktop and try to shrink down — that is the wrong direction in Tailwind.

---

## Breakpoints

| Prefix | Min-width | Typical target |
|---|---|---|
| (none) | 0px | Mobile phones (≤640px) |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets, small laptops |
| `lg:` | 1024px | Laptops, desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Very large screens |

In practice, most layouts only need three breakpoints: the base (mobile), `md:` (tablet), and `lg:` (desktop). Reaching for `sm:` and `xl:` is usually unnecessary.

---

## Typography

Scale type up from mobile to desktop. Mobile headings should be readable but compact. Desktop headings should be bold and commanding.

```tsx
// Hero heading
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
  Premium Web Design
</h1>

// Section heading
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Our Services
</h2>

// Body text (same size across breakpoints is usually fine)
<p className="text-base md:text-lg text-white/70 leading-relaxed">
  Description text here.
</p>
```

**Leading (line height):** Use `leading-tight` on large display headings (they look better compressed). Use `leading-relaxed` or `leading-loose` on body text for readability.

---

## Layout Patterns

### Single column to grid

The most common pattern. Stack vertically on mobile, arrange in a grid on larger screens.

```tsx
// 1 col → 2 col → 3 col
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  <Card />
  <Card />
  <Card />
</div>

// 1 col → 2 col (for feature sections with icon + text pairs)
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <Feature />
  <Feature />
  <Feature />
  <Feature />
</div>
```

### Side-by-side with flex

For sections with an image/visual on one side and text on the other:

```tsx
<div className="flex flex-col lg:flex-row gap-12 items-center">
  {/* On mobile: stacks vertically. On desktop: sits side by side */}
  <div className="w-full lg:w-1/2">
    <img src="/showcase.jpg" className="rounded-2xl w-full" />
  </div>
  <div className="w-full lg:w-1/2">
    <h2 className="text-3xl lg:text-5xl font-bold">Heading</h2>
    <p className="mt-4 text-white/70">Description</p>
  </div>
</div>
```

`flex-col` stacks items on mobile. `lg:flex-row` places them side by side at the `lg` breakpoint.

### Full-width to contained

Section content should be contained to a max-width on large screens but full-width on mobile.

```tsx
// The section itself can be full-width with a coloured/gradient background
<section className="bg-gray-900 py-20 md:py-32">
  {/* The content is contained and centred */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    Section content here
  </div>
</section>
```

This pattern is used on every section. The section tag handles background and vertical padding. The inner div handles horizontal containment and padding.

**Standard container:** `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- `max-w-6xl` — 72rem (1152px) max width
- `mx-auto` — centres it
- `px-4 sm:px-6 lg:px-8` — 16px padding on mobile, 24px on tablet, 32px on desktop

---

## Spacing

Use larger padding and margin on desktop. Mobile layouts need less breathing room because the viewport is narrow — generous padding on mobile eats into usable content width.

```tsx
// Vertical section padding
<section className="py-16 md:py-24 lg:py-32">

// Component padding
<div className="p-4 md:p-6 lg:p-8">

// Gap between grid items
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

---

## Navigation

Mobile navigation requires special handling — the full desktop nav cannot fit horizontally on a phone.

```tsx
"use client"

import { useState } from "react"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — visible at all sizes */}
          <span className="text-xl font-bold text-white">C2B</span>

          {/* Desktop nav — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a>
            <a href="#work" className="text-white/70 hover:text-white transition-colors">Work</a>
            <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Mobile menu button — hidden on desktop */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown — only visible when open */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#services" className="text-white/70 hover:text-white">Services</a>
            <a href="#work" className="text-white/70 hover:text-white">Work</a>
            <a href="#contact" className="text-white/70 hover:text-white">Contact</a>
          </div>
        )}
      </div>
    </nav>
  )
}
```

`hidden md:flex` — hides the desktop nav on mobile, shows it at `md` and above.
`md:hidden` — shows the mobile button below `md`, hides it at `md` and above.

---

## Images

Always make images responsive. An image with a fixed pixel width will overflow on mobile.

```tsx
// Always full-width within its container, maintaining aspect ratio
<img src="/image.jpg" alt="Description" className="w-full h-auto rounded-2xl" />

// With a fixed aspect ratio container (useful for thumbnails)
<div className="aspect-video relative overflow-hidden rounded-2xl">
  <img src="/thumbnail.jpg" alt="Description" className="w-full h-full object-cover" />
</div>

// Next.js Image component (preferred — handles optimisation automatically)
import Image from "next/image"

<div className="relative aspect-video rounded-2xl overflow-hidden">
  <Image
    src="/image.jpg"
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

---

## Hiding and Showing Elements

Show different content or layouts at different breakpoints:

```tsx
// Only visible on mobile
<div className="block md:hidden">Mobile-only content</div>

// Only visible on desktop
<div className="hidden md:block">Desktop-only content</div>

// Visible on mobile and desktop, hidden only on tablet
<div className="block md:hidden lg:block">Mobile and desktop</div>
```

Use sparingly. Maintaining duplicate content for different breakpoints increases maintenance burden. Prefer responsive layout classes over hiding/showing.

---

## Touch Targets

On mobile, interactive elements must be large enough to tap reliably. The minimum touch target size is 44×44px.

```tsx
// A link that looks like text but has a generous tap target
<a
  href="#contact"
  className="text-white/70 hover:text-white py-3 px-1 block"
  // py-3 adds 12px top and bottom padding, making the tap target ~44px tall
>
  Contact
</a>

// A small icon button with a large tap target
<button className="p-3 text-white/70 hover:text-white" aria-label="Close">
  <XIcon className="w-5 h-5" />
  {/* p-3 ensures the tap area is 44px even though the icon is only 20px */}
</button>
```

---

## Common Mistakes

**Starting with desktop classes and trying to override for mobile.** Tailwind is mobile-first. `text-6xl` applies on all sizes including mobile. `text-2xl md:text-6xl` gives you small text on mobile and large on desktop. Think small → large.

**Fixed pixel widths.** `w-96` is `384px` — fine on desktop, overflows on a 375px phone. Use `w-full`, percentages (`w-1/2`), or max-widths (`max-w-sm`) instead.

**Forgetting horizontal padding on mobile.** Without `px-4` on containers, content sits flush against the screen edge on mobile. Always include at least `px-4` on any full-width container.

**Tiny tap targets.** Links and buttons that are just text height are nearly impossible to tap on mobile. Always pad interactive elements to at least 44px in the interactive dimension.

**Not testing on an actual device.** The browser's device simulation in DevTools is a starting point, not a substitute. Test on a real phone — hover effects that look fine in DevTools do not exist on touchscreens.

---

## Testing Checklist

Before marking any component or section as done, check:

- [ ] Renders correctly at 375px wide (iPhone SE — the smallest common phone)
- [ ] Renders correctly at 768px wide (tablet)
- [ ] Renders correctly at 1280px wide (desktop)
- [ ] Text is readable at every breakpoint
- [ ] Images do not overflow or distort
- [ ] Interactive elements have adequate tap targets on mobile
- [ ] Navigation works on mobile (hamburger menu or equivalent)
- [ ] No horizontal scroll at any breakpoint
