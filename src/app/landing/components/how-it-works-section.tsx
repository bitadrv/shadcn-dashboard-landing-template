"use client"

import { Badge } from "@/components/ui/badge"

const steps = [
  {
    title: "Identity",
    description: "Choose who you are and what kind of buyer you want to be.",
  },
  {
    title: "Learn and play",
    description: "Pick up the basics of buying a business through short lessons and play.",
  },
  {
    title: "Market Floor",
    description: "Look at businesses for sale and compare them side by side.",
  },
  {
    title: "Simulation",
    description: "Run a practice purchase and see how your choices play out.",
  },
  {
    title: "Deal room",
    description: "Work through the terms of a deal with a practice seller.",
  },
  {
    title: "Legacy",
    description: "Review what you learned and plan for life after the purchase.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            How it works
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Six steps from first choice to final deal
          </h2>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-xl border bg-background p-8 shadow-xs"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
