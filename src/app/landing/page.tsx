"use client"

import type React from "react"
import { LandingNavbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import { CTASection } from "./components/cta-section"
import { ContactSection } from "./components/contact-section"
import { FaqSection } from "./components/faq-section"
import { LandingFooter } from "./components/footer"
import { AboutSection } from "./components/about-section"

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
        <AboutSection />
        <FeaturesSection />
        <FaqSection />
        <CTASection />
        <ContactSection />
      </main>

      <LandingFooter />
    </div>
  )
}
