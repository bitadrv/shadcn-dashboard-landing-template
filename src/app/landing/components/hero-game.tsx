"use client"

import { useState } from "react"
import { ArrowRight, CircleCheck as CheckCircle2, Circle as XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAppUrl } from "@/lib/utils"

const SAMPLE_BAKERY = {
  name: "Corner Bakery",
  town: "Sample town",
  price: "$285,000",
  yearlyRevenue: "$540,000",
  yearlyProfit: "$82,000",
}

type Question = {
  prompt: string
  choices: string[]
  correct: number
  explanation: string
}

const QUESTIONS: Question[] = [
  {
    prompt: "The price is $285,000 and yearly profit is $82,000. About how many years of profit would pay the price back?",
    choices: ["About 1 year", "About 3.5 years", "About 10 years"],
    correct: 1,
    explanation: "$285,000 divided by $82,000 is about 3.5 years.",
  },
  {
    prompt: "The owner runs every recipe and knows every supplier. What worries you most?",
    choices: [
      "The recipes and supplier links leave with the owner",
      "The bakery sells too many cakes",
      "Nothing, the price is fine",
    ],
    correct: 0,
    explanation: "Much of the value can be in knowledge the owner holds alone.",
  },
  {
    prompt: "Yearly revenue is $540,000, but yearly profit is only $82,000. What should you check first?",
    choices: [
      "Where the money goes: rent, wages and ingredients",
      "Nothing, the revenue is high enough",
      "How many years the oven has left",
    ],
    correct: 0,
    explanation: "Most of the revenue is spent on costs. Those costs decide the profit.",
  },
]

function getResult(score: number) {
  if (score === QUESTIONS.length) {
    return { title: "Sharp eye.", text: "You spotted the key risks. Sign up to practise with more businesses." }
  }
  if (score >= 1) {
    return { title: "Good start.", text: "You caught some of the risks. Sign up to learn the ones you missed." }
  }
  return { title: "Keep practising.", text: "Buying a business has hidden risks. Sign up to learn how to spot them." }
}

export function HeroGame() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const finished = step >= QUESTIONS.length
  const question = QUESTIONS[step]

  function choose(index: number) {
    if (selected !== null) return
    setSelected(index)
    if (index === question.correct) setScore((s) => s + 1)
  }

  function next() {
    setSelected(null)
    setStep((s) => s + 1)
  }

  function restart() {
    setStep(0)
    setSelected(null)
    setScore(0)
  }

  return (
    <Card className="mx-auto w-full max-w-xl text-left shadow-sm">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">Sample business</Badge>
          <span className="text-xs text-muted-foreground">Mock data only</span>
        </div>
        <CardTitle className="pt-2 text-lg">
          This bakery is for sale. Would you buy it?
        </CardTitle>
        <CardDescription>
          {SAMPLE_BAKERY.name}, {SAMPLE_BAKERY.town}
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-3 border-b pb-4 text-center">
        <Stat label="Price" value={SAMPLE_BAKERY.price} />
        <Stat label="Yearly revenue" value={SAMPLE_BAKERY.yearlyRevenue} />
        <Stat label="Yearly profit" value={SAMPLE_BAKERY.yearlyProfit} />
      </CardContent>

      <CardContent className="pt-4">
        {!finished ? (
          <div key={step} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-medium text-muted-foreground">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <p className="mt-2 text-base font-medium text-foreground">{question.prompt}</p>

            <div className="mt-4 flex flex-col gap-2">
              {question.choices.map((choice, index) => {
                const isCorrect = index === question.correct
                const isChosen = index === selected
                const answered = selected !== null
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => choose(index)}
                    disabled={answered}
                    className={[
                      "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      "disabled:cursor-default",
                      answered && isCorrect
                        ? "border-green-600 bg-green-50 text-green-900"
                        : answered && isChosen
                          ? "border-red-600 bg-red-50 text-red-900"
                          : "border-border bg-background text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    <span>{choice}</span>
                    {answered && isCorrect && <CheckCircle2 className="size-4 shrink-0 text-green-700" />}
                    {answered && isChosen && !isCorrect && <XCircle className="size-4 shrink-0 text-red-700" />}
                  </button>
                )
              })}
            </div>

            {selected !== null && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
                <Button size="sm" className="shrink-0 cursor-pointer" onClick={next}>
                  {step + 1 === QUESTIONS.length ? "See result" : "Next"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-medium text-muted-foreground">
              You got {score} of {QUESTIONS.length} right
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">{getResult(score).title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{getResult(score).text}</p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="cursor-pointer text-base"
                nativeButton={false}
                render={<a href={getAppUrl("/auth/sign-up")} />}
              >
                Sign up
                <ArrowRight data-icon="inline-end" />
              </Button>
              <button
                type="button"
                onClick={restart}
                className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Play again
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
