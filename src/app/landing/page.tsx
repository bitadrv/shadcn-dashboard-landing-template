"use client"

import { HowItWorksSection } from "./components/how-it-works-section"
import { HeroSection } from "./components/hero-section"
import { AreasSection } from "./components/areas-section"
import { SchoolsSection } from "./components/schools-section"
import { FaqSection } from "./components/faq-section"
import { LandingNavbar } from "./components/navbar"
import { LandingFooter } from "./components/footer"
import type React from "react"

const nextOwnerPalette = {
  "--background": "#FFFFFF",
  "--foreground": "#0F1F3F",
  "--muted": "#F4F6FA",
  "--muted-foreground": "#5B6B85",
  "--border": "#E3E8F0",
  "--input": "#E3E8F0",
  "--ring": "#1D4ED8",
  "--primary": "#1D4ED8",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#0F1F3F",
  "--secondary-foreground": "#FFFFFF",
  "--success": "#10B981",
  "--success-foreground": "#FFFFFF",
  "--info": "#1D4ED8",
  "--info-foreground": "#FFFFFF",
} as React.CSSProperties

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={nextOwnerPalette}
    >
      <LandingNavbar />

      <main>
        <HeroSection />
        <HowItWorksSection />
        <AreasSection />
        <SchoolsSection />
        <FaqSection />
      </main>

      <LandingFooter />
    </div>
  )
}
