"use client"

import { ArrowRight, Handshake, ShieldCheck, Compass, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAppUrl } from "@/lib/utils"

const features = [
  {
    icon: Compass,
    title: "A clear path forward",
    description:
      "Break a complex ownership transition into simple, understandable steps.",
  },
  {
    icon: ShieldCheck,
    title: "Discreet by design",
    description:
      "Share what matters with the right people and keep the rest private.",
  },
  {
    icon: Users,
    title: "Thoughtful matches",
    description:
      "Connect with owners and buyers whose goals line up with your own.",
  },
  {
    icon: Handshake,
    title: "Support at every stage",
    description:
      "Get guidance from first conversation through to the handover.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            How NextOwner helps
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            A calmer way to pass a business on
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Selling or transferring a company is a big decision. NextOwner
            keeps the process organized and the people involved informed.
          </p>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col gap-4 rounded-xl border bg-background p-8 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="cursor-pointer"
            nativeButton={false}
            render={<a href={getAppUrl("/auth/sign-up")} />}
          >
            Get Started
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  )
}
