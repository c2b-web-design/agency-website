import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Analyser",
  description:
    "Get an instant report on your website — design quality, mobile-friendliness, and conversion potential. Free, instant, no signup.",
  openGraph: {
    title: "Website Analyser | C2B Web Design",
    description:
      "Get an instant report on your website — design quality, mobile-friendliness, and conversion potential.",
  },
}

export default function AnalyserPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 4 — Client Website Analyser
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Website <span className="text-gold">Analyser</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          The AI-powered website analyser is built in Phase 4.
          This page is a navigable shell — structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
