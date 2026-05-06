"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HeroLogoMorphProps {
  triggerRef: React.RefObject<HTMLElement | null>
}

interface Particle {
  sx: number; sy: number   // source position (C2B logo)
  tx: number; ty: number   // target position (Logo_Morph)
  ox: number; oy: number   // scatter offset — rightward bias
  sr: number; sg: number; sb: number  // source colour (gold)
  mr: number; mg: number; mb: number  // mid-scatter colour
  tr: number; tg: number; tb: number; ta: number  // target pixel colour
}

// Brand gold from globals.css: #C9A84C
const GOLD_R = 201
const GOLD_G = 168
const GOLD_B = 76

// Glass particle colours per brief: cobalt blue, deep red, emerald green
const SCATTER_COLORS = [
  [30, 100, 230],
  [180, 25, 25],
  [20, 160, 100],
] as const

const CANVAS_PX = 480
const STEP = 3  // sample every 3px — ~3 000–6 000 particles

function sampleImage(img: HTMLImageElement) {
  const off = document.createElement("canvas")
  off.width = CANVAS_PX
  off.height = CANVAS_PX
  const ctx = off.getContext("2d")!
  ctx.drawImage(img, 0, 0, CANVAS_PX, CANVAS_PX)
  const { data } = ctx.getImageData(0, 0, CANVAS_PX, CANVAS_PX)
  const pixels: { x: number; y: number; r: number; g: number; b: number; a: number }[] = []
  for (let y = 0; y < CANVAS_PX; y += STEP) {
    for (let x = 0; x < CANVAS_PX; x += STEP) {
      const i = (y * CANVAS_PX + x) * 4
      if (data[i + 3] > 50) {
        pixels.push({ x, y, r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] / 255 })
      }
    }
  }
  return pixels
}

// Easing implementations matching the brief
function easeExpoOut(t: number): number {
  return t === 0 ? 0 : 1 - Math.pow(2, -10 * t)
}

function easeBackOut(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export default function HeroLogoMorph({ triggerRef }: HeroLogoMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let st: ReturnType<typeof ScrollTrigger.create> | null = null
    let rafId = 0
    let progress = 0

    const srcImg = new Image()
    const tgtImg = new Image()
    let loaded = 0

    function build() {
      const srcPixels = sampleImage(srcImg)
      const tgtPixels = sampleImage(tgtImg)

      // Sort by spatial position so nearby pixels pair together
      const key = (p: { x: number; y: number }) => p.y * CANVAS_PX + p.x
      srcPixels.sort((a, b) => key(a) - key(b))
      tgtPixels.sort((a, b) => key(a) - key(b))

      const N = Math.min(srcPixels.length, tgtPixels.length)
      const particles: Particle[] = new Array(N)

      for (let i = 0; i < N; i++) {
        const s = srcPixels[i]
        const t = tgtPixels[i]
        const [mr, mg, mb] = SCATTER_COLORS[Math.floor(Math.random() * SCATTER_COLORS.length)]
        particles[i] = {
          sx: s.x, sy: s.y,
          tx: t.x, ty: t.y,
          // Rightward burst (80–280px) with moderate vertical scatter
          ox: 80 + Math.random() * 200,
          oy: (Math.random() - 0.5) * 160,
          sr: GOLD_R, sg: GOLD_G, sb: GOLD_B,
          mr, mg, mb,
          tr: t.r, tg: t.g, tb: t.b, ta: t.a,
        }
      }

      const trigger = triggerRef.current ?? canvas
      st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "+=40%",   // 40vh of extra scroll drives the full animation
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          progress = self.progress
        },
      })

      function render() {
        ctx!.clearRect(0, 0, CANVAS_PX, CANVAS_PX)
        const prog = progress

        for (let i = 0; i < N; i++) {
          const p = particles[i]
          let x: number, y: number
          let r: number, g: number, b: number, a: number, size: number

          if (prog <= 0.5) {
            // Dissolution: source → scatter  (Expo.easeOut)
            const t = easeExpoOut(Math.min(prog * 2, 1))
            x = lerp(p.sx, p.sx + p.ox, t)
            y = lerp(p.sy, p.sy + p.oy, t)
            r = lerp(p.sr, p.mr, t)
            g = lerp(p.sg, p.mg, t)
            b = lerp(p.sb, p.mb, t)
            a = lerp(1, 0.65, t)
            size = lerp(2, 3.5, t)
          } else {
            // Reformation: scatter → target  (Back.easeOut)
            const t = easeBackOut(Math.min((prog - 0.5) * 2, 1))
            x = lerp(p.sx + p.ox, p.tx, t)
            y = lerp(p.sy + p.oy, p.ty, t)
            r = lerp(p.mr, p.tr, t)
            g = lerp(p.mg, p.tg, t)
            b = lerp(p.mb, p.tb, t)
            a = lerp(0.65, p.ta, t)
            size = lerp(3.5, 2, t)
          }

          ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a.toFixed(2)})`
          ctx!.fillRect(x - size * 0.5, y - size * 0.5, size, size)
        }

        rafId = requestAnimationFrame(render)
      }

      render()
    }

    function onLoad() {
      if (++loaded === 2) build()
    }

    srcImg.onload = onLoad
    tgtImg.onload = onLoad
    srcImg.src = "/C2B-LogoTranspatent.png"
    tgtImg.src = "/Logo_Morph.png"

    return () => {
      cancelAnimationFrame(rafId)
      st?.kill()
    }
  }, [triggerRef])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_PX}
      height={CANVAS_PX}
      className="w-full max-w-[480px] h-auto"
      aria-hidden="true"
    />
  )
}
