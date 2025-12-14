"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Catálogo", href: "/", icon: Home },
    { name: "Calculadora", href: "/calculadora", icon: Calculator },
    { name: "Contacto", href: "/contacto", icon: MessageCircle },
  ]

  return (
    <div className="flex flex-col w-64 border-r border-border bg-card h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">TextilPro</h1>
        <p className="text-sm text-muted-foreground">Mayorista de Telas</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">© 2025 TextilPro</p>
      </div>
    </div>
  )
}
