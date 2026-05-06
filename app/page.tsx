import type { Metadata } from "next"
import Hero from "@/components/hero/Hero"

export const metadata: Metadata = {
  title: "C2B Web Design — Premium Web Design Agency",
  description:
    "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
}

export default function HomePage() {
  return <Hero />
}
