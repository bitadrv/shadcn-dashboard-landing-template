import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Areas", href: "#areas" },
  { name: "For schools", href: "#schools" },
  { name: "FAQ", href: "#faq" },
]

export function LandingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 grid-cols-4 lg:grid-cols-6">
          <div className="col-span-4 lg:col-span-2 max-w-2xl">
            <a href="#hero" className="flex items-center gap-2 mb-4 cursor-pointer max-lg:justify-center">
              <span className="flex size-8 items-center justify-center rounded-md bg-[#0F1F3F] text-sm font-bold text-white">
                N
              </span>
              <span className="text-lg font-semibold tracking-tight text-[#0F1F3F]">
                NextOwner
              </span>
            </a>
            <p className="text-slate-600 italic max-lg:text-center">
              Every business deserves a next owner.
            </p>
          </div>

          <div className="max-md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NextOwner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
