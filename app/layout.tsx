import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import Nav from "@/components/nav/Nav"
import Footer from "@/components/footer/Footer"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "C2B Web Design — Premium Web Design Agency",
    template: "%s | C2B Web Design",
  },
  description:
    "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
  keywords: ["web design", "web development", "UK", "agency", "premium"],
  authors: [{ name: "C2B Web Design" }],
  creator: "C2B Web Design",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "C2B Web Design",
    title: "C2B Web Design — Premium Web Design Agency",
    description:
      "High-end web design and development for UK businesses. We build websites that convert visitors into clients.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <Nav />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
