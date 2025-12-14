"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Fabric } from "@/lib/fabric-data"

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
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Calcular Costo de Producción</CardTitle>
        <CardDescription>Cada short requiere aproximadamente {metersPerShort} metros de tela</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fabric">Seleccionar Tela</Label>
          <Select value={selectedFabricId} onValueChange={setSelectedFabricId}>
            <SelectTrigger id="fabric">
              <SelectValue placeholder="Elige una tela" />
            </SelectTrigger>
            <SelectContent>
              {fabrics.map((fabric) => (
                <SelectItem key={fabric.id} value={fabric.id}>
                  {fabric.name} - ${fabric.pricePerMeter}/m
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad de Shorts</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ej: 100"
          />
        </div>

        {selectedFabric && (
          <div className="border-t border-border pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Metros necesarios</p>
                <p className="text-2xl font-bold text-foreground">{metersNeeded.toFixed(2)}m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Costo total</p>
                <p className="text-2xl font-bold text-foreground">${totalCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2 text-foreground">Desglose:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Tela: {selectedFabric.name}</li>
                <li>• Precio: ${selectedFabric.pricePerMeter} por metro</li>
                <li>• Cantidad: {quantityNum} shorts</li>
                <li>• Consumo: {metersNeeded.toFixed(2)} metros</li>
                <li className={hasEnoughStock ? "text-secondary font-medium" : "text-destructive font-medium"}>
                  • Stock: {selectedFabric.stock}m {hasEnoughStock ? "(Disponible)" : "(Insuficiente)"}
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
