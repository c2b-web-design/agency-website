import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View our work — premium website design and development case studies for UK businesses.",
  openGraph: {
    title: "Portfolio | C2B Web Design",
    description:
      "View our work — premium website design and development case studies for UK businesses.",
  },
}

export default function PortfolioPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 3 — Video Showcase Gallery
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Our <span className="text-gold">Work</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The portfolio gallery is built in Phase 3.
          This page is a navigable shell — structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
