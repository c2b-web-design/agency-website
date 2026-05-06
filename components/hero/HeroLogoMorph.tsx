"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HeroLogoMorphProps {
  triggerRef: React.RefObject<HTMLElement | null>
}

const CANVAS_PX = 512
const HALF = CANVAS_PX / 2
const STEP = 2

// ─── Simplex 3D noise — Stefan Gustavson (public domain) ──────────────────
// Embedded so there is no extra npm dependency and it compiles at shader link time.
const SIMPLEX_GLSL = /* glsl */ `
  vec3 mod289_3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289_4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute4(vec4 x)  { return mod289_4(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt4(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289_3(i);
    vec4 p = permute4(permute4(permute4(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt4(vec4(
      dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(
      dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(
      dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

// ─── Vertex shader ─────────────────────────────────────────────────────────
const VERT = SIMPLEX_GLSL + /* glsl */ `
  uniform float uProgress;

  // aTarget  — world-space position in the glass logo
  // aColor   — glass logo pixel colour (sampled from PNG)
  // aStartColor — gold logo pixel colour (sampled from PNG)
  // aOffset  — per-particle random seed for noise variety
  attribute vec3 aTarget;
  attribute vec3 aColor;
  attribute vec3 aStartColor;
  attribute vec3 aOffset;

  varying vec3 vColor;

  void main() {
    float u = clamp(uProgress, 0.0, 1.0);

    // ── 1. Straight-line base path (start → target) ──────────────────────
    vec3 base = mix(position, aTarget, u);

    // ── 2. Turbulence envelope — bell curve peaking at u = 0.5 ──────────
    // Ramps up 0.1→0.4, holds, ramps down 0.6→0.9
    float env = smoothstep(0.1, 0.4, u) * smoothstep(0.9, 0.6, u);

    // ── 3. Rightward drift during mid-flight ─────────────────────────────
    vec3 drift = vec3(u * 90.0 * env, 0.0, 0.0);

    // ── 4. Simplex noise displacement (3 independent samples for X/Y/Z) ──
    // Seed varies per particle via aOffset so each travels a unique path
    vec3 noiseIn = base * 0.008 + aOffset * 10.0 + vec3(u * 6.0);
    float nx = snoise(noiseIn);
    float ny = snoise(noiseIn + vec3(17.3,  0.0, 0.0));
    float nz = snoise(noiseIn + vec3( 0.0, 31.7, 0.0));
    vec3 noiseDisp = vec3(nx, ny, nz) * 130.0 * env;

    // ── 5. Final world position ───────────────────────────────────────────
    vec3 pos = base + drift + noiseDisp;

    // ── 6. Colour: gold → glass logo, slightly ahead of position morph ───
    vColor = mix(aStartColor, aColor, clamp(u * 1.2, 0.0, 1.0));

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = 2.5;
  }
`

// ─── Fragment shader ───────────────────────────────────────────────────────
const FRAG = /* glsl */ `
  varying vec3 vColor;

  void main() {
    // Discard fragment corners — renders each point as a filled circle
    vec2 uv = gl_PointCoord - 0.5;
    if (length(uv) > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`

// ─── Pixel sampling ────────────────────────────────────────────────────────

interface Pixel { x: number; y: number; r: number; g: number; b: number }

function samplePixels(img: HTMLImageElement): Pixel[] {
  const off = document.createElement("canvas")
  off.width = CANVAS_PX
  off.height = CANVAS_PX
  const ctx = off.getContext("2d")!
  ctx.drawImage(img, 0, 0, CANVAS_PX, CANVAS_PX)
  const { data } = ctx.getImageData(0, 0, CANVAS_PX, CANVAS_PX)
  const out: Pixel[] = []
  for (let y = 0; y < CANVAS_PX; y += STEP) {
    for (let x = 0; x < CANVAS_PX; x += STEP) {
      const i = (y * CANVAS_PX + x) * 4
      if (data[i + 3] > 128) {
        out.push({ x, y, r: data[i] / 255, g: data[i + 1] / 255, b: data[i + 2] / 255 })
      }
    }
  }
  return out
}

// Canvas pixel coords → Three.js world (centred at origin, Y flipped)
function toWorld(px: number, py: number): [number, number] {
  return [px - HALF, -(py - HALF)]
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function HeroLogoMorph({ triggerRef }: HeroLogoMorphProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let rafId = 0
    let st: ReturnType<typeof ScrollTrigger.create> | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let geo: THREE.BufferGeometry | null = null
    let mat: THREE.ShaderMaterial | null = null

    const srcImg = new Image()
    const tgtImg = new Image()
    let loaded = 0

    function build() {
      const srcPixels = samplePixels(srcImg)
      const tgtPixels = samplePixels(tgtImg)

      // Spatial sort so nearby source pixels pair with nearby target pixels
      const key = (p: Pixel) => p.y * CANVAS_PX + p.x
      srcPixels.sort((a, b) => key(a) - key(b))
      tgtPixels.sort((a, b) => key(a) - key(b))

      const N = Math.min(srcPixels.length, tgtPixels.length)

      // ── GPU attribute arrays ──────────────────────────────────────────
      const posArr        = new Float32Array(N * 3)  // source positions (= Three.js `position`)
      const aTargetArr    = new Float32Array(N * 3)  // target positions
      const aColorArr     = new Float32Array(N * 3)  // target colours  (glass logo)
      const aStartColorArr = new Float32Array(N * 3) // source colours  (gold logo)
      const aOffsetArr    = new Float32Array(N * 3)  // per-particle noise seed

      for (let i = 0; i < N; i++) {
        const s = srcPixels[i]
        const t = tgtPixels[i]
        const [sx, sy] = toWorld(s.x, s.y)
        const [tx, ty] = toWorld(t.x, t.y)

        posArr[i * 3]     = sx; posArr[i * 3 + 1]     = sy; posArr[i * 3 + 2]     = 0
        aTargetArr[i * 3] = tx; aTargetArr[i * 3 + 1] = ty; aTargetArr[i * 3 + 2] = 0

        // Source colour — sampled from the gold logo PNG
        aStartColorArr[i * 3]     = s.r
        aStartColorArr[i * 3 + 1] = s.g
        aStartColorArr[i * 3 + 2] = s.b

        // Target colour — sampled from the glass logo PNG (cobalt, red, emerald)
        aColorArr[i * 3]     = t.r
        aColorArr[i * 3 + 1] = t.g
        aColorArr[i * 3 + 2] = t.b

        // Random per-particle seed — drives unique noise path for each particle
        aOffsetArr[i * 3]     = Math.random()
        aOffsetArr[i * 3 + 1] = Math.random()
        aOffsetArr[i * 3 + 2] = Math.random()
      }

      // ── Three.js scene ────────────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(CANVAS_PX, CANVAS_PX)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      Object.assign(renderer.domElement.style, {
        position: "absolute", inset: "0", width: "100%", height: "100%",
      })
      mount.appendChild(renderer.domElement)

      // Orthographic camera — frustum matches the CANVAS_PX world-space grid
      const camera = new THREE.OrthographicCamera(-HALF, HALF, HALF, -HALF, 0.1, 1000)
      camera.position.z = 500

      const scene = new THREE.Scene()

      geo = new THREE.BufferGeometry()
      geo.setAttribute("position",     new THREE.BufferAttribute(posArr,         3))
      geo.setAttribute("aTarget",      new THREE.BufferAttribute(aTargetArr,     3))
      geo.setAttribute("aColor",       new THREE.BufferAttribute(aColorArr,      3))
      geo.setAttribute("aStartColor",  new THREE.BufferAttribute(aStartColorArr, 3))
      geo.setAttribute("aOffset",      new THREE.BufferAttribute(aOffsetArr,     3))

      const uniforms = { uProgress: { value: 0 } }

      mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
      })

      const points = new THREE.Points(geo, mat)
      points.frustumCulled = false
      scene.add(points)

      // ── GSAP ScrollTrigger ────────────────────────────────────────────
      const trigger = triggerRef.current ?? mount
      st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "+=40%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          uniforms.uProgress.value = self.progress
        },
      })

      // ── Render loop ───────────────────────────────────────────────────
      function render() {
        rafId = requestAnimationFrame(render)
        renderer!.render(scene, camera)
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
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [triggerRef])

  return (
    <div
      ref={mountRef}
      className="w-full max-w-[480px] aspect-square relative"
      aria-hidden="true"
    />
  )
}
