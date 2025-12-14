"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { ContactInfo } from "@/lib/settings-data"

export function ContactInfoEditor() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    whatsapp: "",
    weekdayHours: "",
    saturdayHours: "",
    sundayHours: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState<ContactInfo>(contactInfo)

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = () => {
    fetch("/api/settings/contact")
      .then((res) => res.json())
      .then((data) => {
        setContactInfo(data)
        setEditValues(data)
      })
      .catch((err) => console.error("Error loading contact info:", err))
  }

  const startEdit = () => {
    setEditValues(contactInfo)
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setEditValues(contactInfo)
    setIsEditing(false)
  }

  const saveEdit = async () => {
    try {
      const response = await fetch("/api/settings/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      })

      if (response.ok) {
        loadContactInfo()
        setIsEditing(false)
      }
    } catch (err) {
      console.error("Error updating contact info:", err)
    }
  }

  const updateField = (field: keyof ContactInfo, value: string) => {
    setEditValues({ ...editValues, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Contacto</CardTitle>
        <CardDescription>Edita los datos de contacto que se muestran en la página pública</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editValues.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              ) : (
                <p className="text-foreground">{contactInfo.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              {isEditing ? (
                <Input id="city" value={editValues.city} onChange={(e) => updateField("city", e.target.value)} />
              ) : (
                <p className="text-foreground">{contactInfo.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Código Postal</Label>
              {isEditing ? (
                <Input
                  id="postalCode"
                  value={editValues.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                />
              ) : (
                <p className="text-foreground">{contactInfo.postalCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              {isEditing ? (
                <Input
                  id="country"
                  value={editValues.country}
                  onChange={(e) => updateField("country", e.target.value)}
                />
              ) : (
                <p className="text-foreground">{contactInfo.country}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              {isEditing ? (
                <Input id="phone" value={editValues.phone} onChange={(e) => updateField("phone", e.target.value)} />
              ) : (
                <p className="text-foreground">{contactInfo.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editValues.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              ) : (
                <p className="text-foreground">{contactInfo.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (solo números)</Label>
              {isEditing ? (
                <Input
                  id="whatsapp"
                  value={editValues.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                />
              ) : (
                <p className="text-foreground">{contactInfo.whatsapp}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-4">Horarios de Atención</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekdayHours">Lunes a Viernes</Label>
                {isEditing ? (
                  <Input
                    id="weekdayHours"
                    value={editValues.weekdayHours}
                    onChange={(e) => updateField("weekdayHours", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{contactInfo.weekdayHours}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="saturdayHours">Sábados</Label>
                {isEditing ? (
                  <Input
                    id="saturdayHours"
                    value={editValues.saturdayHours}
                    onChange={(e) => updateField("saturdayHours", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{contactInfo.saturdayHours}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sundayHours">Domingos y Feriados</Label>
                {isEditing ? (
                  <Input
                    id="sundayHours"
                    value={editValues.sundayHours}
                    onChange={(e) => updateField("sundayHours", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{contactInfo.sundayHours}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {isEditing ? (
              <>
                <Button onClick={saveEdit}>Guardar Cambios</Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={startEdit}>
                Editar Información
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
