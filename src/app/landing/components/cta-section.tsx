"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
          <Badge
            variant="outline"
            className="border-primary-foreground/40 text-primary-foreground"
          >
            Every business deserves a next owner.
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight text-balance text-primary-foreground sm:text-5xl">
            Ready to take the next step?
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Start your account or send us a message and we will help you
            understand your options.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer px-8 py-6 text-base font-medium"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Contact us
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-primary-foreground/40 bg-transparent px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              nativeButton={false}
              render={<a href="#faq" />}
            >
              Read the FAQ
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
