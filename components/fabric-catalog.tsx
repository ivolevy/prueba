"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Fabric } from "@/lib/fabric-data"
import { Palette, Calculator } from "lucide-react"
import { CalculatorDialog } from "./calculator-dialog"
import { Button } from "@/components/ui/button"

export function FabricCatalog() {
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [selectedFabricForCalc, setSelectedFabricForCalc] = useState<string | null>(null)
  const [calcDialogOpen, setCalcDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch fabrics from API
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => setFabrics(data))
      .catch((err) => console.error("Error loading fabrics:", err))
  }, [])

  const handleEstimateCost = (fabricId: string) => {
    setSelectedFabricForCalc(fabricId)
    setCalcDialogOpen(true)
  }

  const getFabricImage = () => {
    // Misma imagen para todos los productos
    return "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=600&fit=crop&q=80"
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fabrics.map((fabric) => (
          <div
            key={fabric.id}
            className="group relative bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col h-full"
          >
            {/* Top accent bar */}
            <div className={`h-1 ${fabric.type === "deportivo" ? "bg-slate-900" : "bg-slate-400"}`} />
            
            {/* Image */}
            <div className="relative h-56 bg-slate-100 overflow-hidden">
              <Image
                src={getFabricImage()}
                alt={fabric.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <div className={`px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full backdrop-blur-sm ${
                  fabric.type === "deportivo" 
                    ? "bg-slate-900/90 text-white" 
                    : "bg-white/90 text-slate-700"
                }`}>
                  {fabric.type === "deportivo" ? "Deportivo" : "Soft"}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight flex-1">
                    {fabric.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 flex-shrink-0">
                    <span className="text-3xl font-bold text-slate-900">${fabric.pricePerMeter}</span>
                    <span className="text-sm text-slate-500 font-medium">/ metro</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200 mb-6" />

              {/* Colors */}
              <div className="mb-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="h-4 w-4 text-slate-600" />
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-600">Colores disponibles</p>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                  {fabric.colors.map((color) => (
                    <span
                      key={color}
                      className="px-2.5 py-1 text-xs font-medium border border-slate-200 text-slate-700 rounded bg-slate-50 hover:border-slate-400 hover:bg-slate-100 transition-colors"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimate Cost Button */}
              <Button
                onClick={() => handleEstimateCost(fabric.id)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-auto"
              >
                <Calculator className="h-4 w-4" />
                Estimar Costo
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CalculatorDialog
        open={calcDialogOpen}
        onOpenChange={setCalcDialogOpen}
        initialFabricId={selectedFabricForCalc || undefined}
      />
    </>
  )
}
