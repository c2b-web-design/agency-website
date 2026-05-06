"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useRef } from "react"

// ssr: false — GSAP ScrollTrigger requires browser APIs
const HeroLogoMorph = dynamic(() => import("./HeroLogoMorph"), { ssr: false })

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-[1280px] mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left: text content */}
        <div>
          <p className="text-silver-muted text-sm tracking-[0.15em] uppercase mb-4">
            Premium Web Design Agency
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight leading-[1.05]">
            Websites that{" "}
            <span className="text-gold">convert</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md">
            High-end design and development for UK businesses ready to invest
            in their most powerful sales tool.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-gold-light transition-colors duration-150"
            >
              Get a Quote
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 border border-silver-border text-text-primary rounded-lg hover:border-gold hover:text-gold transition-colors duration-150"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Right: particle logo morph */}
        <div className="flex justify-center items-center">
          <HeroLogoMorph triggerRef={sectionRef} />
        </div>

      </div>
    </section>
  )
}
