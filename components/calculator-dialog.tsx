"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Fabric } from "@/lib/fabric-data"
import { Calculator, Package, DollarSign, CheckCircle, XCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalculatorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFabricId?: string
}

export function CalculatorDialog({ open, onOpenChange, initialFabricId }: CalculatorDialogProps) {
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [selectedFabricId, setSelectedFabricId] = useState<string>(initialFabricId || "")
  const [quantity, setQuantity] = useState<string>("10")
  const [metersPerShort, setMetersPerShort] = useState<number>(0.75)

  useEffect(() => {
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => {
        setFabrics(data)
        if (initialFabricId && data.find((f: Fabric) => f.id === initialFabricId)) {
          setSelectedFabricId(initialFabricId)
        } else if (data.length > 0) {
          setSelectedFabricId(data[0].id)
        }
      })
      .catch((err) => console.error("Error loading fabrics:", err))

    fetch("/api/settings/calculator")
      .then((res) => res.json())
      .then((data) => setMetersPerShort(data.metersPerShort))
      .catch((err) => console.error("Error loading calculator settings:", err))
  }, [initialFabricId])

  // Update selected fabric when initialFabricId changes
  useEffect(() => {
    if (initialFabricId && fabrics.length > 0) {
      setSelectedFabricId(initialFabricId)
    }
  }, [initialFabricId, fabrics])

  const selectedFabric = fabrics.find((f) => f.id === selectedFabricId)
  const quantityNum = Number.parseInt(quantity) || 0
  const metersNeeded = quantityNum * metersPerShort
  const totalCost = selectedFabric ? metersNeeded * selectedFabric.pricePerMeter : 0
  const hasEnoughStock = selectedFabric ? metersNeeded <= selectedFabric.stock : false

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-slate-200">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900">Estimar Costo de Producción</DialogTitle>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  Cada short requiere {metersPerShort} metros de tela
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label htmlFor="fabric-dialog" className="text-slate-600 font-semibold text-sm uppercase tracking-wider">
              Seleccionar Tela
            </Label>
            <Select value={selectedFabricId} onValueChange={setSelectedFabricId}>
              <SelectTrigger 
                id="fabric-dialog" 
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
            <Label htmlFor="quantity-dialog" className="text-slate-600 font-semibold text-sm uppercase tracking-wider">
              Cantidad de Shorts
            </Label>
            <Input
              id="quantity-dialog"
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
      </DialogContent>
    </Dialog>
  )
}

