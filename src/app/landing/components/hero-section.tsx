"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DotPattern } from "@/components/dot-pattern"
import { getAppUrl } from "@/lib/utils"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background pt-24 pb-24 sm:pt-32 sm:pb-32"
    >
      <div className="absolute inset-0 opacity-50">
        <DotPattern size="md" fadeStyle="ellipse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-8 px-4 py-2">
            Business succession, handled with care
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Find the next owner for your{" "}
            <span className="text-primary">business</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            NextOwner connects business owners who are ready to step back with
            people ready to take the next step, so the work you built keeps
            going.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="text-base cursor-pointer"
              nativeButton={false}
              render={<a href={getAppUrl("/auth/sign-up")} />}
            >
              Get Started
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base cursor-pointer"
              nativeButton={false}
              render={<a href="#about" />}
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
