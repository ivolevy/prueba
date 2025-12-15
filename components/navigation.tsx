"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, MessageCircle, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Catálogo", href: "/", icon: Home },
    { name: "Calculadora", href: "/calculadora", icon: Calculator },
    { name: "Contacto", href: "/contacto", icon: MessageCircle },
  ]

  // Don't show navigation on backoffice
  if (pathname?.startsWith("/backoffice")) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8DCC4] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-serif font-normal text-[#2C2416] group-hover:text-[#8B4513] transition-colors">
              TextilPro
            </div>
            <div className="h-6 w-px bg-[#D4C4A8]" />
            <div className="text-xs font-light tracking-wider text-[#6B5B47] uppercase">
              Mayorista
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 relative",
                    isActive
                      ? "text-[#8B4513]"
                      : "text-[#6B5B47] hover:text-[#2C2416]"
                  )}
                >
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#8B4513]" />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#6B5B47] hover:text-[#2C2416] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-[#E8DCC4]">
            <div className="flex flex-col gap-1 mt-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-light transition-colors",
                      isActive
                        ? "text-[#8B4513] bg-[#E8DCC4]/50 border-l-2 border-[#8B4513]"
                        : "text-[#6B5B47] hover:text-[#2C2416] hover:bg-[#F5F1E8]"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

