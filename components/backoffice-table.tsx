"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Download } from "lucide-react"
import type { Fabric } from "@/lib/fabric-data"

export function BackofficeTable() {
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ stock: string; price: string }>({
    stock: "",
    price: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadFabrics()
  }, [])

  const loadFabrics = () => {
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => setFabrics(data))
      .catch((err) => console.error("Error loading fabrics:", err))
  }

  const startEdit = (fabric: Fabric) => {
    setEditingId(fabric.id)
    setEditValues({
      stock: fabric.stock.toString(),
      price: fabric.pricePerMeter.toString(),
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValues({ stock: "", price: "" })
  }

  const saveEdit = async (fabricId: string) => {
    try {
      const response = await fetch("/api/fabrics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: fabricId,
          stock: Number.parseInt(editValues.stock),
          pricePerMeter: Number.parseFloat(editValues.price),
        }),
      })

      if (response.ok) {
        loadFabrics()
        cancelEdit()
      }
    } catch (err) {
      console.error("Error updating fabric:", err)
    }
  }

  const exportToCSV = () => {
    const headers = ["id", "name", "type", "colors", "pricePerMeter", "stock"]
    const csvContent = [
      headers.join(","),
      ...fabrics.map((fabric) =>
        [
          fabric.id,
          `"${fabric.name}"`,
          fabric.type,
          `"${fabric.colors.join("; ")}"`,
          fabric.pricePerMeter,
          fabric.stock,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `stock_telas_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n")
        const headers = lines[0].split(",")

        const importedFabrics: Fabric[] = []

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue

          const values = lines[i].match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
          const cleanValues = values.map((v) => v.replace(/^"|"$/g, "").trim())

          if (cleanValues.length >= 6) {
            importedFabrics.push({
              id: cleanValues[0],
              name: cleanValues[1],
              type: cleanValues[2] as "deportivo" | "soft",
              colors: cleanValues[3].split(";").map((c) => c.trim()),
              pricePerMeter: Number.parseFloat(cleanValues[4]),
              stock: Number.parseInt(cleanValues[5]),
            })
          }
        }

        const response = await fetch("/api/fabrics/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fabrics: importedFabrics }),
        })

        if (response.ok) {
          loadFabrics()
          alert(`Se importaron ${importedFabrics.length} productos correctamente`)
        }
      } catch (err) {
        console.error("Error importing CSV:", err)
        alert("Error al importar el archivo CSV. Verifica el formato.")
      }
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Inventario de Telas</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Importar CSV
            </Button>
            <input ref={fileInputRef} type="file" accept=".csv" onChange={importFromCSV} className="hidden" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Producto</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Tipo</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Stock (m)</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Precio/m</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fabrics.map((fabric) => (
                <tr key={fabric.id} className="border-b border-border">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">{fabric.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{fabric.colors.join(", ")}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={fabric.type === "deportivo" ? "default" : "secondary"}>{fabric.type}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    {editingId === fabric.id ? (
                      <Input
                        type="number"
                        value={editValues.stock}
                        onChange={(e) => setEditValues({ ...editValues, stock: e.target.value })}
                        className="w-24"
                      />
                    ) : (
                      <span className="text-foreground">{fabric.stock}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {editingId === fabric.id ? (
                      <Input
                        type="number"
                        value={editValues.price}
                        onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                        className="w-24"
                      />
                    ) : (
                      <span className="text-foreground">${fabric.pricePerMeter}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {editingId === fabric.id ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveEdit(fabric.id)}>
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => startEdit(fabric)}>
                        Editar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
