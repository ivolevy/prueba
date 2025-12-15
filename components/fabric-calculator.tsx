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
    <div className="w-full">
      <div className="bg-white p-6 md:p-8 shadow-sm rounded-lg border border-slate-200">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="fabric" className="text-slate-600 font-semibold text-sm uppercase tracking-wider">
              Seleccionar Tela
            </Label>
            <Select value={selectedFabricId} onValueChange={setSelectedFabricId}>
              <SelectTrigger
                id="fabric"
                className="bg-white border-slate-300 text-slate-900 h-12 hover:border-slate-400 focus:border-slate-900"
              >
                <SelectValue placeholder="Elige una tela" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {fabrics.map((fabric) => (
                  <SelectItem
                    key={fabric.id}
                    value={fabric.id}
                    className="text-slate-900 hover:bg-slate-50 focus:bg-slate-50"
                  >
                    {fabric.name} - ${fabric.pricePerMeter}/m
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="quantity" className="text-slate-600 font-semibold text-sm uppercase tracking-wider">
              Cantidad de Shorts
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ej: 100"
              className="bg-white border-slate-300 text-slate-900 h-12 hover:border-slate-400 focus:border-slate-900"
            />
          </div>

          {selectedFabric && (
            <div className="border-t border-slate-200 pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="h-5 w-5 text-slate-700" />
                    <p className="text-xs font-semibold tracking-wider uppercase text-slate-600">Metros necesarios</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{metersNeeded.toFixed(2)}m</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-5 w-5 text-slate-700" />
                    <p className="text-xs font-semibold tracking-wider uppercase text-slate-600">Costo total</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">${totalCost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
                <p className="text-sm font-semibold tracking-wider uppercase text-slate-600 mb-4">Desglose</p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Tela</span>
                    <span className="text-slate-900 font-medium">{selectedFabric.name}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Precio por metro</span>
                    <span className="text-slate-900 font-medium">${selectedFabric.pricePerMeter}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Cantidad de shorts</span>
                    <span className="text-slate-900 font-medium">{quantityNum}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Consumo total</span>
                    <span className="text-slate-900 font-medium">{metersNeeded.toFixed(2)} metros</span>
                  </li>
                  <li className="flex items-center justify-between text-sm pt-3 border-t border-slate-200">
                    <span className="text-slate-600 font-medium flex items-center gap-2">
                      Stock disponible
                      {hasEnoughStock ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </span>
                    <span className={hasEnoughStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
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
