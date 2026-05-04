import Link from "next/link"

const FOOTER_NAV = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Our Process" },
  { href: "/analyser", label: "Website Analyser" },
  { href: "/contact", label: "Contact" },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-silver-border bg-background-elevated">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand column */}
        <div>
          <span className="text-gold font-display font-bold text-2xl tracking-tight">
            C2B
          </span>
          <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-xs">
            Premium web design and development for UK businesses that demand exceptional results.
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <h3 className="text-text-muted text-xs font-semibold tracking-[0.1em] uppercase mb-4">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-text-muted hover:text-gold text-sm transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-text-muted text-xs font-semibold tracking-[0.1em] uppercase mb-4">
            Get in Touch
          </h3>
          <address className="not-italic flex flex-col gap-2">
            <a
              href="mailto:hello@c2bwebdesign.co.uk"
              className="text-text-muted hover:text-gold text-sm transition-colors duration-150"
            >
              hello@c2bwebdesign.co.uk
            </a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-silver-border">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            © {year} C2B Web Design. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with precision in the UK
          </p>
        </div>
      </div>
    </footer>
  )
}
