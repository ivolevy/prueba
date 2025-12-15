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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-serif font-light text-white group-hover:text-amber-400 transition-colors">
              TextilPro
            </div>
            <div className="h-6 w-px bg-gray-800" />
            <div className="text-xs font-light tracking-wider text-gray-500 uppercase">
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
                      ? "text-amber-400"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-400" />
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
            className="md:hidden text-gray-400 hover:text-white transition-colors"
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
          <div className="md:hidden pb-6 border-t border-gray-900">
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
                        ? "text-amber-400 bg-amber-900/10 border-l-2 border-amber-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-900/50"
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

