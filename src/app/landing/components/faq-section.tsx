"use client"

import { Circle as CircleHelp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

type FaqItem = {
  value: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    value: "item-1",
    question: "What is NextOwner?",
    answer:
      "NextOwner is a practice platform. You learn how buying a business works and try the steps before you make a real purchase.",
  },
  {
    value: "item-2",
    question: "Who is it for?",
    answer:
      "It is for people who want to buy a business one day, and for schools that teach business skills.",
  },
  {
    value: "item-3",
    question: "Do I need experience to start?",
    answer:
      "No. The lessons start with the basics, and you can move through the steps at your own pace.",
  },
  {
    value: "item-4",
    question: "Is this real money or a real business?",
    answer:
      "No. The game is a practice space. Nothing you do there is a real purchase or a real deal.",
  },
  {
    value: "item-5",
    question: "How do schools use NextOwner?",
    answer:
      "Teachers use an instructor view to follow how each student works through the six steps. Schools can start with a pilot.",
  },
]

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion className="gap-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="rounded-lg border! bg-background"
              >
                <AccordionTrigger className="cursor-pointer items-center gap-4 rounded-none bg-transparent py-3 ps-4 pe-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                      <CircleHelp className="size-5" />
                    </div>
                    <span className="text-start font-semibold text-foreground">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <Button
              className="cursor-pointer"
              nativeButton={false}
              render={<a href="#schools" />}
            >
              For schools
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
