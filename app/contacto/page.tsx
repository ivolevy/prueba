"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react"
import type { ContactInfo } from "@/lib/settings-data"

export default function ContactoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    fetch("/api/settings/contact")
      .then((res) => res.json())
      .then((data) => setContactInfo(data))
      .catch((err) => console.error("Error loading contact info:", err))
  }, [])

  if (!contactInfo) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-muted-foreground">Cargando información de contacto...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Contacto</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Dirección</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {contactInfo.address}
                <br />
                {contactInfo.city}
                <br />
                {contactInfo.postalCode}, {contactInfo.country}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-primary" />
                <CardTitle>Teléfono</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {contactInfo.phone}
                <br />
                Lun - Vie: {contactInfo.weekdayHours}
                <br />
                Sáb: {contactInfo.saturdayHours}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                {contactInfo.email}
              </a>
              <p className="text-muted-foreground mt-2 text-sm">Respuesta en 24-48 horas</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-5 w-5" />
                <CardTitle>WhatsApp</CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80">Contacto directo e inmediato</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" size="lg" className="w-full">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hola,%20me%20interesa%20consultar%20sobre%20sus%20telas`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chatear por WhatsApp
                </a>
              </Button>
              <p className="text-primary-foreground/80 mt-4 text-sm text-center">+{contactInfo.whatsapp}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-accent">
          <CardHeader>
            <CardTitle>Horarios de Atención</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Lunes a Viernes</p>
              <p className="text-muted-foreground">{contactInfo.weekdayHours}</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Sábados</p>
              <p className="text-muted-foreground">{contactInfo.saturdayHours}</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Domingos y Feriados</p>
              <p className="text-muted-foreground">{contactInfo.sundayHours}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
