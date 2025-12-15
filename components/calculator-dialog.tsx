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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FEFCF8] border-[#D4B896]">
        <DialogHeader className="border-b border-[#E8D4B8] pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B4513] flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-[#3D2817]">Estimar Costo</DialogTitle>
                <p className="text-sm text-[#6B5B47] font-normal mt-1">
                  Cada short requiere {metersPerShort} metros de tela
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-[#6B5B47] hover:text-[#3D2817] hover:bg-[#F5E6D3]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="fabric-dialog" className="text-[#5C4A37] font-semibold text-sm">
              Seleccionar Tela
            </Label>
            <Select value={selectedFabricId} onValueChange={setSelectedFabricId}>
              <SelectTrigger 
                id="fabric-dialog" 
                className="bg-white border-2 border-[#D4B896] text-[#3D2817] h-11 hover:border-[#8B4513] focus:border-[#8B4513] font-medium"
              >
                <SelectValue placeholder="Elige una tela" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#D4B896]">
                {fabrics.map((fabric) => (
                  <SelectItem 
                    key={fabric.id} 
                    value={fabric.id}
                    className="text-[#3D2817] hover:bg-[#F5E6D3] focus:bg-[#F5E6D3] font-medium"
                  >
                    {fabric.name} - ${fabric.pricePerMeter}/m
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity-dialog" className="text-[#5C4A37] font-semibold text-sm">
              Cantidad de Shorts
            </Label>
            <Input
              id="quantity-dialog"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ej: 100"
              className="bg-white border-2 border-[#D4B896] text-[#3D2817] h-11 hover:border-[#8B4513] focus:border-[#8B4513] font-medium"
            />
          </div>

          {selectedFabric && (
            <div className="border-t-2 border-[#E8D4B8] pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] border-2 border-[#D4B896] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-[#8B4513]" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B5B47]">Metros necesarios</p>
                  </div>
                  <p className="text-3xl font-bold text-[#3D2817]">{metersNeeded.toFixed(2)}m</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] border-2 border-[#D4B896] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-[#8B4513]" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B5B47]">Costo total</p>
                  </div>
                  <p className="text-3xl font-bold text-[#8B4513]">${totalCost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="bg-white border-2 border-[#D4B896] rounded-lg p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-[#5C4A37] mb-4">Desglose</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E8D4B8]">
                    <span className="text-[#6B5B47] font-medium">Tela</span>
                    <span className="text-[#3D2817] font-semibold">{selectedFabric.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E8D4B8]">
                    <span className="text-[#6B5B47] font-medium">Precio por metro</span>
                    <span className="text-[#3D2817] font-semibold">${selectedFabric.pricePerMeter}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E8D4B8]">
                    <span className="text-[#6B5B47] font-medium">Cantidad de shorts</span>
                    <span className="text-[#3D2817] font-semibold">{quantityNum}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E8D4B8]">
                    <span className="text-[#6B5B47] font-medium">Consumo total</span>
                    <span className="text-[#3D2817] font-semibold">{metersNeeded.toFixed(2)} metros</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-[#6B5B47] font-medium flex items-center gap-2">
                      Stock disponible
                      {hasEnoughStock ? (
                        <CheckCircle className="h-4 w-4 text-green-700" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-700" />
                      )}
                    </span>
                    <span className={hasEnoughStock ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                      {selectedFabric.stock.toLocaleString()}m {hasEnoughStock ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

