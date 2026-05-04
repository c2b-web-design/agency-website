import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "C2B Web Design — Premium Web Design Agency",
  description:
    "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
}

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 2 — Hero Section
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          <span className="text-gold">C2B</span> Web Design
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The hero section for this page is built in Phase 2.
          Navigation, layout, and brand tokens are fully operational.
        </p>
      </div>
    </section>
  )
}
