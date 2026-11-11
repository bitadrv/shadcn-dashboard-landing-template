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
      "NextOwner helps business owners who are ready to step back find someone to carry their business forward, and helps buyers and successors find established businesses to take over.",
  },
  {
    value: "item-2",
    question: "Who is NextOwner for?",
    answer:
      "It is designed for owners preparing for a sale or transfer, and for people looking to acquire or take over an existing business.",
  },
  {
    value: "item-3",
    question: "How is my information handled?",
    answer:
      "Business details are shared only with the people you choose. Contact us for more detail on how we protect confidential information.",
  },
  {
    value: "item-4",
    question: "How do I get started?",
    answer:
      "Select Get Started to create an account, or send us a message and our team will reply to discuss your situation.",
  },
  {
    value: "item-5",
    question: "What does it cost?",
    answer:
      "Pricing details will be shared once they are confirmed. Contact us for the most current information.",
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
          <p className="text-lg leading-relaxed text-muted-foreground">
            Answers to the questions we hear most often. If yours is not here,
            we are happy to help.
          </p>
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
            <p className="text-muted-foreground mb-4">
              Still have a question? We are here to help.
            </p>
            <Button
              className="cursor-pointer"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
