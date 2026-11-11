"use client"

import { useState } from "react"
import { Menu, LayoutDashboard, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { getAppUrl } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "@/hooks/use-theme"

const navigationItems = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Areas", href: "#areas" },
  { name: "For schools", href: "#schools" },
  { name: "FAQ", href: "#faq" },
]

const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith("#")) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
}

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 cursor-pointer">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#0F1F3F] text-sm font-bold text-white">
            N
          </span>
          <span className="text-base font-semibold tracking-tight text-[#0F1F3F]">
            NextOwner
          </span>
        </a>

        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#1D4ED8] focus:text-[#1D4ED8] focus:outline-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    smoothScrollTo(item.href)
                  }}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden xl:flex items-center gap-2">
          <ModeToggle variant="ghost" />
          <Button
            variant="outline"
            className="cursor-pointer"
            nativeButton={false}
            render={
              <a
                href={getAppUrl("/dashboard")}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <LayoutDashboard data-icon="inline-start" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            nativeButton={false}
            render={<a href={getAppUrl("/auth/sign-in")} />}
          >
            Sign In
          </Button>
          <Button
            className="cursor-pointer bg-[#1D4ED8] text-white hover:bg-[#1E40AF]"
            nativeButton={false}
            render={<a href={getAppUrl("/auth/sign-up")} />}
          >
            Get Started
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="xl:hidden"
            render={
              <Button variant="ghost" size="icon" className="cursor-pointer" />
            }
          >
            <Menu className="size-5" data-icon="inline-start" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-full sm:w-[400px] p-0 gap-0 overflow-hidden flex flex-col"
          >
            <div className="flex flex-col h-full">
              <SheetHeader className="gap-0 p-4 pb-2 border-b">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-[#0F1F3F] text-sm font-bold text-white">
                    N
                  </span>
                  <SheetTitle className="text-lg font-semibold text-[#0F1F3F]">
                    NextOwner
                  </SheetTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                      className="cursor-pointer size-8"
                    >
                      <Moon
                        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        data-icon="inline-start"
                      />
                      <Sun
                        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        data-icon="inline-end"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer size-8"
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col p-6 gap-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={(e) => {
                        setIsOpen(false)
                        e.preventDefault()
                        setTimeout(() => smoothScrollTo(item.href), 100)
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col border-t p-6 gap-4">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full cursor-pointer"
                    nativeButton={false}
                    render={<a href={getAppUrl("/dashboard")} />}
                  >
                    <LayoutDashboard data-icon="inline-start" />
                    Dashboard
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="cursor-pointer"
                      nativeButton={false}
                      render={<a href={getAppUrl("/auth/sign-in")} />}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      className="cursor-pointer bg-[#1D4ED8] text-white hover:bg-[#1E40AF]"
                      nativeButton={false}
                      render={<a href={getAppUrl("/auth/sign-up")} />}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
