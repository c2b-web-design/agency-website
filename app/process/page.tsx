import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How we work — our structured design and development process that delivers exceptional results on time.",
  openGraph: {
    title: "Our Process | C2B Web Design",
    description:
      "How we work — our structured design and development process that delivers exceptional results on time.",
  },
}

export default function ProcessPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          How We Work
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Our <span className="text-gold">Process</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Our process page content — the client journey from brief to launch — is designed
          and built in a future phase. Structure and metadata are complete.
        </p>
      </div>
    </section>
  )
}
