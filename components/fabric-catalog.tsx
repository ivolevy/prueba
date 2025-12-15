"use client"

import { useState, useEffect } from "react"
import type { Fabric } from "@/lib/fabric-data"
import { Palette, Package } from "lucide-react"

export function FabricCatalog() {
  const [fabrics, setFabrics] = useState<Fabric[]>([])

  useEffect(() => {
    // Fetch fabrics from API
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => setFabrics(data))
      .catch((err) => console.error("Error loading fabrics:", err))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fabrics.map((fabric) => (
        <div
          key={fabric.id}
          className="group relative bg-white border-2 border-[#E8DCC4] hover:border-[#8B4513] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B4513]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="p-8 relative z-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-serif font-normal text-[#2C2416] group-hover:text-[#8B4513] transition-colors">
                  {fabric.name}
                </h3>
                <span className={`px-3 py-1 text-xs font-light tracking-wider uppercase border ${
                  fabric.type === "deportivo" 
                    ? "border-[#8B4513] text-[#8B4513] bg-[#E8DCC4]" 
                    : "border-[#D4C4A8] text-[#6B5B47] bg-[#F5F1E8]"
                }`}>
                  {fabric.type}
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-serif font-normal text-[#8B4513]">${fabric.pricePerMeter}</span>
                <span className="text-sm text-[#6B5B47] font-light">/ metro</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8DCC4] to-transparent mb-6" />

            {/* Colors */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-[#8B4513]/70" />
                <p className="text-xs font-light tracking-wider uppercase text-[#6B5B47]">Colores disponibles</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {fabric.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1.5 text-xs font-light border border-[#D4C4A8] text-[#5C4A37] hover:border-[#8B4513] hover:text-[#8B4513] transition-colors bg-[#FAF8F3]"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="pt-6 border-t border-[#E8DCC4]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#6B5B47]" />
                  <span className="text-xs font-light tracking-wider uppercase text-[#6B5B47]">Stock</span>
                </div>
                <span className={`text-lg font-serif font-normal ${
                  fabric.stock < 200 
                    ? "text-red-700" 
                    : fabric.stock < 500
                    ? "text-[#B8860B]"
                    : "text-green-700"
                }`}>
                  {fabric.stock.toLocaleString()} m
                </span>
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
