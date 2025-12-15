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
      <div className="min-h-screen bg-[#FAF8F3] text-[#2C2416] pt-32 flex items-center justify-center">
        <p className="text-[#6B5B47]">Cargando información de contacto...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2C2416] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-normal mb-4 text-[#2C2416]">
            Contacto
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8B4513] to-transparent mx-auto mb-6" />
          <p className="text-xl text-[#6B5B47] font-light max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border-2 border-[#E8DCC4] p-8 hover:border-[#8B4513] transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#8B4513]" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#2C2416]">Dirección</h3>
            </div>
            <p className="text-[#5C4A37] font-light leading-relaxed text-lg">
              {contactInfo.address}
              <br />
              {contactInfo.city}
              <br />
              {contactInfo.postalCode}, {contactInfo.country}
            </p>
          </div>

          <div className="bg-white border-2 border-[#E8DCC4] p-8 hover:border-[#8B4513] transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] flex items-center justify-center">
                <Phone className="h-6 w-6 text-[#8B4513]" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#2C2416]">Teléfono</h3>
            </div>
            <p className="text-[#5C4A37] font-light leading-relaxed text-lg">
              {contactInfo.phone}
              <br />
              <span className="text-[#6B5B47]">Lun - Vie: {contactInfo.weekdayHours}</span>
              <br />
              <span className="text-[#6B5B47]">Sáb: {contactInfo.saturdayHours}</span>
            </p>
          </div>

          <div className="bg-white border-2 border-[#E8DCC4] p-8 hover:border-[#8B4513] transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] flex items-center justify-center">
                <Mail className="h-6 w-6 text-[#8B4513]" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#2C2416]">Email</h3>
            </div>
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="text-[#8B4513] hover:text-[#7A3D12] transition-colors text-lg font-light block mb-2"
            >
              {contactInfo.email}
            </a>
            <p className="text-[#6B5B47] text-sm font-light">Respuesta en 24-48 horas</p>
          </div>

          <div className="bg-white border-2 border-[#8B4513] p-8 hover:border-[#7A3D12] transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8DCC4] border border-[#8B4513] flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-[#8B4513]" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#2C2416]">WhatsApp</h3>
            </div>
            <p className="text-[#6B5B47] font-light mb-6 text-sm">Contacto directo e inmediato</p>
            <Button 
              asChild 
              className="w-full bg-[#8B4513] hover:bg-[#7A3D12] text-white font-medium tracking-wide uppercase text-sm h-12"
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
            <p className="text-[#8B4513]/70 mt-4 text-sm text-center font-light">+{contactInfo.whatsapp}</p>
          </div>
        </div>

        <div className="bg-white border-2 border-[#E8DCC4] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#8B4513]" />
            </div>
            <h3 className="text-2xl font-serif font-normal text-[#2C2416]">Horarios de Atención</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-light text-[#6B5B47] mb-2 text-sm uppercase tracking-wider">Lunes a Viernes</p>
              <p className="text-[#2C2416] text-lg font-light">{contactInfo.weekdayHours}</p>
            </div>
            <div>
              <p className="font-light text-[#6B5B47] mb-2 text-sm uppercase tracking-wider">Sábados</p>
              <p className="text-[#2C2416] text-lg font-light">{contactInfo.saturdayHours}</p>
            </div>
            <div>
              <p className="font-light text-[#6B5B47] mb-2 text-sm uppercase tracking-wider">Domingos y Feriados</p>
              <p className="text-[#2C2416] text-lg font-light">{contactInfo.sundayHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
