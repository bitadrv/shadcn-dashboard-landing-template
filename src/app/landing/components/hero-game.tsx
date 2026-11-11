"use client"

import { useEffect, useState, type PointerEvent, type ReactNode } from "react"
import { animate, motion, useReducedMotion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, Check, RotateCcw, X } from "lucide-react"
import { getAppUrl } from "@/lib/utils"
import {
  PROFIT_HISTORY,
  QUESTIONS,
  SAMPLE_BAKERY,
  formatMoney,
} from "./hero-data"

type HeroGameProps = {
  onProgress: (fraction: number) => void
}

const GLASS =
  "rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl"

function getResult(score: number) {
  if (score === QUESTIONS.length) return "Sharp eye."
  if (score >= 2) return "Good start."
  return "Keep practising."
}

function CountUp({ value, format }: { value: number; format: (v: number) => string }) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [value, reduce])

  return <>{format(display)}</>
}

function ProfitChart() {
  const max = Math.max(...PROFIT_HISTORY)
  const reduce = useReducedMotion()
  return (
    <div className="flex h-16 items-end gap-2">
      {PROFIT_HISTORY.map((value, i) => (
        <motion.div
          key={i}
          className="flex-1 origin-bottom rounded-sm bg-linear-to-t from-emerald-500/60 to-emerald-300"
          style={{ height: `${(value / max) * 100}%` }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

function useTilt(pointerX: MotionValue<number>, pointerY: MotionValue<number>) {
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 })
  return { rotateX, rotateY }
}

export function HeroGame({ onProgress }: HeroGameProps) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const { rotateX, rotateY } = useTilt(pointerX, pointerY)

  const question = QUESTIONS[step]
  const answered = picked !== null

  const choose = (index: number) => {
    if (answered) return
    setPicked(index)
    if (question.choices[index].correct) setCorrect((c) => c + 1)
    onProgress((step + 1) / QUESTIONS.length)
  }

  const next = () => {
    if (step + 1 >= QUESTIONS.length) {
      setFinished(true)
      return
    }
    setStep((s) => s + 1)
    setPicked(null)
  }

  const playAgain = () => {
    setStep(0)
    setPicked(null)
    setCorrect(0)
    setFinished(false)
    onProgress(0)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className="w-full"
    >
      <div className="relative [transform-style:preserve-3d]">
        <motion.div
          className="relative [transform-style:preserve-3d]"
          animate={{ rotateY: finished ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={GLASS + " p-6 text-white [backface-visibility:hidden]"}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
                  Sample listing
                </p>
                <h3 className="mt-1 text-lg font-semibold">{SAMPLE_BAKERY.name}</h3>
                <p className="text-sm text-white/60">{SAMPLE_BAKERY.location}</p>
              </div>
              <span className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80">
                Question {Math.min(step + 1, QUESTIONS.length)} of {QUESTIONS.length}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <Stat label="Asking price">
                <CountUp value={SAMPLE_BAKERY.price} format={formatMoney} />
              </Stat>
              <Stat label="Revenue / yr">
                <CountUp value={SAMPLE_BAKERY.yearlyRevenue} format={formatMoney} />
              </Stat>
              <Stat label="Profit / yr">
                <CountUp value={SAMPLE_BAKERY.yearlyProfit} format={formatMoney} />
              </Stat>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-white/60">
                <span>Profit, last five years</span>
                <span>Sample data</span>
              </div>
              <ProfitChart />
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">{question.prompt}</p>
              <div className="mt-3 flex flex-col gap-2">
                {question.choices.map((choice, i) => {
                  const isPicked = picked === i
                  const showCorrect = answered && choice.correct
                  const showWrong = isPicked && !choice.correct
                  return (
                    <button
                      key={choice.text}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={answered}
                      className={[
                        "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors duration-200 cursor-pointer disabled:cursor-default",
                        showCorrect
                          ? "border-emerald-400/70 bg-emerald-400/15 text-white"
                          : showWrong
                            ? "border-rose-400/70 bg-rose-400/15 text-white"
                            : "border-white/15 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <span>{choice.text}</span>
                      {showCorrect && <Check className="size-4 shrink-0 text-emerald-300" />}
                      {showWrong && <X className="size-4 shrink-0 text-rose-300" />}
                    </button>
                  )
                })}
              </div>
              {picked !== null && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-end justify-between gap-3"
                >
                  <p className="text-sm text-white/75">{question.choices[picked].note}</p>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1F3F] transition-transform hover:-translate-y-0.5"
                  >
                    {step + 1 >= QUESTIONS.length ? "See result" : "Next"}
                    <ArrowRight className="size-3.5" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${GLASS}`}>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">Your result</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">{getResult(correct)}</p>
            <p className="mt-2 text-sm text-white/70">
              You spotted {correct} of {QUESTIONS.length} sensible checks.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <a
                href={getAppUrl("/auth/sign-up")}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#06213F] transition-transform hover:-translate-y-0.5"
              >
                Sign up to practise for real
                <ArrowRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={playAgain}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <RotateCcw className="size-4" />
                Play again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] uppercase tracking-wider text-white/55">{label}</p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-white sm:text-base">{children}</p>
    </div>
  )
}
