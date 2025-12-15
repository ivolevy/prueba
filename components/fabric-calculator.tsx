"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Fabric } from "@/lib/fabric-data"
import { Calculator, Package, DollarSign, CheckCircle, XCircle } from "lucide-react"

export function FabricCalculator() {
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [selectedFabricId, setSelectedFabricId] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("10")
  const [metersPerShort, setMetersPerShort] = useState<number>(0.75)

  useEffect(() => {
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => {
        setFabrics(data)
        if (data.length > 0) {
          setSelectedFabricId(data[0].id)
        }
      })
      .catch((err) => console.error("Error loading fabrics:", err))

    fetch("/api/settings/calculator")
      .then((res) => res.json())
      .then((data) => setMetersPerShort(data.metersPerShort))
      .catch((err) => console.error("Error loading calculator settings:", err))
  }, [])

  const selectedFabric = fabrics.find((f) => f.id === selectedFabricId)
  const quantityNum = Number.parseInt(quantity) || 0
  const metersNeeded = quantityNum * metersPerShort
  const totalCost = selectedFabric ? metersNeeded * selectedFabric.pricePerMeter : 0
  const hasEnoughStock = selectedFabric ? metersNeeded <= selectedFabric.stock : false

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-800/50 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-light text-white">Calcular Costo de Producción</h2>
            <p className="text-gray-400 font-light text-sm mt-1">
              Cada short requiere aproximadamente {metersPerShort} metros de tela
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="fabric" className="text-gray-300 font-light text-sm uppercase tracking-wider">
              Seleccionar Tela
            </Label>
            <Select value={selectedFabricId} onValueChange={setSelectedFabricId}>
              <SelectTrigger 
                id="fabric" 
                className="bg-black border-gray-800 text-white h-12 hover:border-amber-600/50 focus:border-amber-600"
              >
                <SelectValue placeholder="Elige una tela" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-800">
                {fabrics.map((fabric) => (
                  <SelectItem 
                    key={fabric.id} 
                    value={fabric.id}
                    className="text-white hover:bg-gray-900 focus:bg-gray-900"
                  >
                    {fabric.name} - ${fabric.pricePerMeter}/m
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="quantity" className="text-gray-300 font-light text-sm uppercase tracking-wider">
              Cantidad de Shorts
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ej: 100"
              className="bg-black border-gray-800 text-white h-12 hover:border-amber-600/50 focus:border-amber-600"
            />
          </div>

          {selectedFabric && (
            <div className="border-t border-gray-800 pt-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="h-5 w-5 text-amber-400" />
                    <p className="text-xs font-light tracking-wider uppercase text-gray-400">Metros necesarios</p>
                  </div>
                  <p className="text-4xl font-serif font-light text-white">{metersNeeded.toFixed(2)}m</p>
                </div>
                
                <div className="bg-black border border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-5 w-5 text-amber-400" />
                    <p className="text-xs font-light tracking-wider uppercase text-gray-400">Costo total</p>
                  </div>
                  <p className="text-4xl font-serif font-light text-amber-400">${totalCost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="bg-black border border-gray-800 p-6">
                <p className="text-sm font-light tracking-wider uppercase text-gray-400 mb-4">Desglose</p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Tela</span>
                    <span className="text-white font-light">{selectedFabric.name}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Precio por metro</span>
                    <span className="text-white font-light">${selectedFabric.pricePerMeter}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Cantidad de shorts</span>
                    <span className="text-white font-light">{quantityNum}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-light">Consumo total</span>
                    <span className="text-white font-light">{metersNeeded.toFixed(2)} metros</span>
                  </li>
                  <li className="flex items-center justify-between text-sm pt-3 border-t border-gray-800">
                    <span className="text-gray-400 font-light flex items-center gap-2">
                      Stock disponible
                      {hasEnoughStock ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </span>
                    <span className={hasEnoughStock ? "text-green-400 font-light" : "text-red-400 font-light"}>
                      {selectedFabric.stock.toLocaleString()}m {hasEnoughStock ? "(Suficiente)" : "(Insuficiente)"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
