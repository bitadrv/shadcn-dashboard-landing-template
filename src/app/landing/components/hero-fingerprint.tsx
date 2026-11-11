import { motion, type MotionValue, useTransform } from "motion/react"

const RING_COUNT = 8
const SAMPLES = 28

type Point = { x: number; y: number }

function smoothClosedPath(points: Point[]) {
  const n = points.length
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return `${d} Z`
}

function buildRing(index: number) {
  const base = 64 + index * 36
  const amp = 5 + index * 0.9
  const offsetX = Math.sin(index * 1.3) * 7
  const offsetY = Math.cos(index * 0.7) * 6
  const points: Point[] = []
  for (let k = 0; k < SAMPLES; k++) {
    const t = (k / SAMPLES) * Math.PI * 2
    const wobble =
      Math.sin(3 * t + index * 1.7) * 0.5 +
      Math.sin(5 * t + index * 0.9) * 0.35 +
      Math.sin(7 * t + index * 2.3) * 0.15
    const r = base + amp * wobble
    points.push({
      x: offsetX + Math.cos(t) * r,
      y: offsetY + Math.sin(t) * r,
    })
  }
  return smoothClosedPath(points)
}

const RINGS = Array.from({ length: RING_COUNT }, (_, i) => buildRing(i))

type HeroFingerprintProps = {
  progress: number
  shiftX: MotionValue<number>
  shiftY: MotionValue<number>
  still: boolean
}

export function HeroFingerprint({ progress, shiftX, shiftY, still }: HeroFingerprintProps) {
  const x = useTransform(shiftX, (v) => v * -18)
  const y = useTransform(shiftY, (v) => v * -18)

  return (
    <motion.svg
      aria-hidden
      viewBox="-400 -400 800 800"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ x, y }}
    >
      <motion.g
        animate={still ? undefined : { scale: [1, 1.018, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "0px 0px" }}
      >
        {RINGS.map((d, i) => {
          const filled = progress > i / RING_COUNT
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                strokeWidth={1.25}
                strokeLinecap="round"
                initial={still ? false : { pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  stroke: filled ? "#34D399" : "#60A5FA",
                  strokeOpacity: filled ? 0.9 : 0.35,
                }}
                transition={{
                  pathLength: { duration: 1.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.6, delay: 0.15 + i * 0.12 },
                  stroke: { duration: 0.8, ease: "easeOut" },
                  strokeOpacity: { duration: 0.8, ease: "easeOut" },
                }}
              />
              <motion.path
                d={d}
                fill="#10B981"
                initial={false}
                animate={{ fillOpacity: filled ? 0.07 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </g>
          )
        })}
      </motion.g>
    </motion.svg>
  )
}
