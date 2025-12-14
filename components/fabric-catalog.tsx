"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Fabric } from "@/lib/fabric-data"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fabrics.map((fabric) => (
        <Card key={fabric.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-xl">{fabric.name}</CardTitle>
              <Badge variant={fabric.type === "deportivo" ? "default" : "secondary"}>{fabric.type}</Badge>
            </div>
            <CardDescription>${fabric.pricePerMeter} / metro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Colores disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {fabric.colors.map((color) => (
                  <Badge key={color} variant="outline" className="text-xs">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground">
                Stock:{" "}
                <span className={fabric.stock < 200 ? "text-destructive" : "text-secondary"}>
                  {fabric.stock} metros
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
