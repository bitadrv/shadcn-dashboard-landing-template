"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardDecorator } from "@/components/ui/card-decorator"
import { HeartHandshake, Scale, Sprout } from "lucide-react"

const values = [
  {
    icon: Sprout,
    title: "Continuity",
    description:
      "A business is more than its balance sheet. We care about what happens to its customers, its team, and its community.",
  },
  {
    icon: Scale,
    title: "Fairness",
    description:
      "Owners and buyers both deserve clear information and an honest process.",
  },
  {
    icon: HeartHandshake,
    title: "Respect",
    description:
      "Every conversation is handled with discretion and care for the people involved.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About NextOwner
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Every business deserves a next owner
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            NextOwner exists so that businesses built over years do not end
            when their founders retire. We bring owners and successors together
            so the work continues.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {values.map((value) => (
            <Card key={value.title} className="shadow-xs">
              <CardHeader className="items-center p-8 text-center">
                <CardDecorator>
                  <value.icon className="size-6" aria-hidden />
                </CardDecorator>
                <CardTitle className="mt-6 text-balance">
                  {value.title}
                </CardTitle>
                <CardDescription className="mt-3 leading-relaxed">
                  {value.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="cursor-pointer"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  )
}
