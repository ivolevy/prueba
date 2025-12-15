"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, MessageCircle, Clock } from "lucide-react"
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
      <div className="min-h-screen bg-black text-white pt-32 flex items-center justify-center">
        <p className="text-gray-400">Cargando información de contacto...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-light mb-4 text-white">
            Contacto
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 hover:border-amber-600/50 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-800/50 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif font-light text-white">Dirección</h3>
            </div>
            <p className="text-gray-300 font-light leading-relaxed text-lg">
              {contactInfo.address}
              <br />
              {contactInfo.city}
              <br />
              {contactInfo.postalCode}, {contactInfo.country}
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 hover:border-amber-600/50 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-800/50 flex items-center justify-center">
                <Phone className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif font-light text-white">Teléfono</h3>
            </div>
            <p className="text-gray-300 font-light leading-relaxed text-lg">
              {contactInfo.phone}
              <br />
              <span className="text-gray-500">Lun - Vie: {contactInfo.weekdayHours}</span>
              <br />
              <span className="text-gray-500">Sáb: {contactInfo.saturdayHours}</span>
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 hover:border-amber-600/50 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-800/50 flex items-center justify-center">
                <Mail className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif font-light text-white">Email</h3>
            </div>
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="text-amber-400 hover:text-amber-300 transition-colors text-lg font-light block mb-2"
            >
              {contactInfo.email}
            </a>
            <p className="text-gray-500 text-sm font-light">Respuesta en 24-48 horas</p>
          </div>

          <div className="bg-gradient-to-b from-amber-900/20 to-black border border-amber-600/50 p-8 hover:border-amber-500 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-600/20 border border-amber-500/50 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif font-light text-white">WhatsApp</h3>
            </div>
            <p className="text-gray-300 font-light mb-6 text-sm">Contacto directo e inmediato</p>
            <Button 
              asChild 
              className="w-full bg-amber-600 hover:bg-amber-500 text-black font-medium tracking-wide uppercase text-sm h-12"
            >
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hola,%20me%20interesa%20consultar%20sobre%20sus%20telas`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chatear por WhatsApp
              </a>
            </Button>
            <p className="text-amber-400/70 mt-4 text-sm text-center font-light">+{contactInfo.whatsapp}</p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-800/50 flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-serif font-light text-white">Horarios de Atención</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-light text-gray-400 mb-2 text-sm uppercase tracking-wider">Lunes a Viernes</p>
              <p className="text-white text-lg font-light">{contactInfo.weekdayHours}</p>
            </div>
            <div>
              <p className="font-light text-gray-400 mb-2 text-sm uppercase tracking-wider">Sábados</p>
              <p className="text-white text-lg font-light">{contactInfo.saturdayHours}</p>
            </div>
            <div>
              <p className="font-light text-gray-400 mb-2 text-sm uppercase tracking-wider">Domingos y Feriados</p>
              <p className="text-white text-lg font-light">{contactInfo.sundayHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
