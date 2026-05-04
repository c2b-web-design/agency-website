"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled
          ? "bg-background-glass backdrop-blur-[20px] border-b border-silver-border"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-gold font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity duration-150"
          aria-label="C2B Web Design — Home"
        >
          C2B
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-medium tracking-wide group",
                  "transition-colors duration-150",
                  isActive
                    ? "text-gold"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {label}
                <span
                  className={[
                    "absolute -bottom-0.5 left-0 right-0 h-px bg-gold",
                    "transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-text-primary hover:text-gold transition-colors duration-150"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "rotate-45 translate-y-[7px]" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-200",
              menuOpen ? "-rotate-45 -translate-y-[7px]" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-background-glass backdrop-blur-[20px]",
          menuOpen ? "max-h-64 border-b border-silver-border" : "max-h-0",
        ].join(" ")}
      >
        <nav
          className="flex flex-col px-6 py-4 gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "text-base font-medium py-3 border-b border-silver-border last:border-0",
                  "transition-colors duration-150",
                  isActive
                    ? "text-gold"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
