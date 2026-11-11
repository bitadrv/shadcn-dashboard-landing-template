"use client"

import { ArrowRight, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAppUrl } from "@/lib/utils"

export function SchoolsSection() {
  return (
    <section id="schools" className="py-24 sm:py-32 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            For schools
          </Badge>
          <div className="mx-auto mb-6 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            An instructor view for your class
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-10">
            Teachers can follow how each student works through the steps and
            see where they need help.
          </p>
          <Button
            size="lg"
            className="cursor-pointer"
            nativeButton={false}
            render={<a href={getAppUrl("/auth/sign-up")} />}
          >
            Start a pilot
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
