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
          className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-amber-600/50 transition-all duration-500 overflow-hidden"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="p-8 relative z-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-serif font-light text-white group-hover:text-amber-400 transition-colors">
                  {fabric.name}
                </h3>
                <span className={`px-3 py-1 text-xs font-light tracking-wider uppercase border ${
                  fabric.type === "deportivo" 
                    ? "border-amber-600/50 text-amber-400 bg-amber-900/20" 
                    : "border-gray-700 text-gray-400 bg-gray-800/50"
                }`}>
                  {fabric.type}
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-serif font-light text-amber-400">${fabric.pricePerMeter}</span>
                <span className="text-sm text-gray-500 font-light">/ metro</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6" />

            {/* Colors */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-amber-400/70" />
                <p className="text-xs font-light tracking-wider uppercase text-gray-400">Colores disponibles</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {fabric.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1.5 text-xs font-light border border-gray-700 text-gray-300 hover:border-amber-600/50 hover:text-amber-400 transition-colors"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-xs font-light tracking-wider uppercase text-gray-500">Stock</span>
                </div>
                <span className={`text-lg font-serif font-light ${
                  fabric.stock < 200 
                    ? "text-red-400" 
                    : fabric.stock < 500
                    ? "text-amber-400"
                    : "text-green-400"
                }`}>
                  {fabric.stock.toLocaleString()} m
                </span>
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
