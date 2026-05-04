import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation — get a quote for your next website project or submit a detailed project brief.",
  openGraph: {
    title: "Contact | C2B Web Design",
    description:
      "Start a conversation — get a quote for your next website project or submit a detailed project brief.",
  },
}

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
          Phase 5 — Contact & Lead Capture
        </p>
        <h1 className="font-display text-5xl font-bold text-text-primary mb-6 tracking-tight">
          Get in <span className="text-gold">Touch</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Contact forms and the lead capture flow are built in Phase 5.
          This page is a navigable shell — structure and metadata are complete.
        </p>
        <p className="mt-6 text-text-muted text-sm">
          In the meantime:{" "}
          <a
            href="mailto:hello@c2bwebdesign.co.uk"
            className="text-gold hover:opacity-80 transition-opacity duration-150"
          >
            hello@c2bwebdesign.co.uk
          </a>
        </p>
      </div>
    </section>
  )
}
