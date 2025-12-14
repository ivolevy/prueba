"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { CalculatorSettings } from "@/lib/settings-data"

export function CalculatorSettingsEditor() {
  const [settings, setSettings] = useState<CalculatorSettings>({ metersPerShort: 0.75 })
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    fetch("/api/settings/calculator")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
        setEditValue(data.metersPerShort.toString())
      })
      .catch((err) => console.error("Error loading calculator settings:", err))
  }

  const startEdit = () => {
    setEditValue(settings.metersPerShort.toString())
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setEditValue(settings.metersPerShort.toString())
    setIsEditing(false)
  }

  const saveEdit = async () => {
    try {
      const response = await fetch("/api/settings/calculator", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metersPerShort: Number.parseFloat(editValue) }),
      })

      if (response.ok) {
        loadSettings()
        setIsEditing(false)
      }
    } catch (err) {
      console.error("Error updating calculator settings:", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Calculadora</CardTitle>
        <CardDescription>Ajusta los parámetros de cálculo para la producción de shorts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meters">Metros de tela por short</Label>
            {isEditing ? (
              <Input
                id="meters"
                type="number"
                step="0.01"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="max-w-xs"
              />
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-foreground">{settings.metersPerShort} metros</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={saveEdit}>Guardar</Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={startEdit}>
                Editar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
