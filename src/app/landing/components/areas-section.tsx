"use client"

import { BookOpen, LayoutDashboard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const areas = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Short lessons that explain each part of buying a business.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "See your progress, your choices, and what to do next.",
  },
]

export function AreasSection() {
  return (
    <section id="areas" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Two areas
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Learn the basics, then track your progress
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {areas.map((area) => (
            <Card key={area.title} className="shadow-xs">
              <CardHeader className="p-8">
                <div className="mb-6 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <area.icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{area.title}</CardTitle>
                <CardDescription className="mt-3 leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
