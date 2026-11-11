"use client"

import { Fragment, useState, type PointerEvent } from "react"
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { getAppUrl } from "@/lib/utils"
import { HeroFingerprint } from "./hero-fingerprint"
import { HeroGame } from "./hero-game"
import { SAMPLE_DEALS, formatMoney } from "./hero-data"

const EASE = [0.22, 1, 0.36, 1] as const
const LEAD_WORDS = ["Practise", "buying", "a", "business"]
const ACCENT_WORDS = ["before", "you", "buy", "one."]

const GRAIN_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
}

const FLOAT_CARDS = [
  { deal: SAMPLE_DEALS[1], position: "left-[6%] top-[24%]", delay: 0 },
  { deal: SAMPLE_DEALS[2], position: "right-[6%] top-[32%]", delay: 1.2 },
  { deal: SAMPLE_DEALS[0], position: "left-[10%] bottom-[20%]", delay: 2.4 },
]

function Words({ words, start, still }: { words: string[]; start: number; still: boolean }) {
  return words.map((word, i) => (
    <Fragment key={`${start + i}-${word}`}>
      <motion.span
        className="inline-block"
        initial={still ? false : { opacity: 0, y: "0.45em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 + (start + i) * 0.08, ease: EASE }}
      >
        {word}
      </motion.span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ))
}

function FloatingCards({ still }: { still: boolean }) {
  return FLOAT_CARDS.map(({ deal, position, delay }) => (
    <motion.div
      key={deal.sector}
      aria-hidden
      className={`pointer-events-none absolute z-[5] hidden w-56 rounded-2xl border border-white/15 bg-white/10 p-4 blur-[2px] backdrop-blur-md lg:block ${position}`}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 0.55, y: still ? 0 : [0, -10, 0] }}
      transition={{
        opacity: { duration: 1.2, delay: 0.8 + delay, ease: EASE },
        y: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-300">Sample listing</p>
      <p className="mt-1 text-sm font-semibold text-white">{deal.sector}</p>
      <p className="text-xs text-white/60">{deal.city}</p>
      <p className="mt-3 text-lg font-semibold tabular-nums text-white">{formatMoney(deal.asking)}</p>
    </motion.div>
  ))
}

function Ticker({ still }: { still: boolean }) {
  const items = [...SAMPLE_DEALS, ...SAMPLE_DEALS]
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center overflow-hidden border-t border-white/10 bg-[#0B1A33]/80 backdrop-blur-md">
      <span className="shrink-0 border-r border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-emerald-300">
        Sample deals
      </span>
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex w-max whitespace-nowrap py-3"
          animate={still ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {items.map((deal, i) => (
            <span key={i} className="pr-10 text-sm text-white/70">
              {deal.sector}, {deal.city}{" "}
              <span className="font-semibold tabular-nums text-white">{formatMoney(deal.asking)}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const reduce = useReducedMotion() === true
  const [progress, setProgress] = useState(0)
  const shiftX = useMotionValue(0)
  const shiftY = useMotionValue(0)
  const glowX = useTransform(shiftX, (v) => v * 40)
  const glowY = useTransform(shiftY, (v) => v * 40)

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    shiftX.set((e.clientX - rect.left) / rect.width - 0.5)
    shiftY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    shiftX.set(0)
    shiftY.set(0)
  }

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0B1A33] text-white"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.25),rgba(29,78,216,0.14)_45%,transparent_70%)] blur-3xl"
        style={{ x: glowX, y: glowY }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <HeroFingerprint progress={progress} shiftX={shiftX} shiftY={shiftY} still={reduce} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={GRAIN_STYLE}
      />

      <FloatingCards still={reduce} />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pt-32 pb-40 text-center sm:px-6">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-200 backdrop-blur"
        >
          NextOwner
        </motion.span>

        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
          <Words words={LEAD_WORDS} start={0} still={reduce} />{" "}
          <span className="bg-linear-to-r from-emerald-300 via-emerald-200 to-sky-300 bg-clip-text text-transparent">
            <Words words={ACCENT_WORDS} start={LEAD_WORDS.length} still={reduce} />
          </span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Make the calls a real buyer makes, with sample businesses and no money at stake. Every number here is sample data.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={getAppUrl("/auth/sign-up")}
            className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-400 px-7 py-3.5 text-base font-semibold text-[#06213F] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[300%]"
            />
            <span className="relative">Try the game</span>
            <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#schools"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-white/10"
          >
            For schools
          </a>
        </motion.div>

        <div className="mt-12 w-full max-w-md">
          <HeroGame onProgress={setProgress} />
        </div>
      </div>

      <motion.a
        href="#how-it-works"
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-wider text-white/60 transition-colors hover:text-white sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.a>

      <Ticker still={reduce} />
    </section>
  )
}
