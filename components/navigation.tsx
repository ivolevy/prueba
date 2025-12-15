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
    { name: "Estimar Costos", href: "/calculadora", icon: Calculator },
    { name: "Contacto", href: "/contacto", icon: MessageCircle },
  ]

  // Don't show navigation on backoffice
  if (pathname?.startsWith("/backoffice")) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors tracking-tight">
              TextilPro
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
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
                    "flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-200 relative rounded-lg",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100"
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
          <div className="md:hidden pb-5 border-t border-slate-200">
            <div className="flex flex-col gap-1 mt-3">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors rounded-lg",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

