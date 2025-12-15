import { FabricCatalog } from "@/components/fabric-catalog"
import Link from "next/link"
import { ArrowRight, Sparkles, Award, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2C2416]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-[#FAF8F3] via-[#F5F1E8] to-[#FAF8F3]">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139,69,19,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139,69,19,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DCC4] border border-[#D4C4A8]">
            <Sparkles className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-light tracking-wider text-[#6B4423] uppercase">Calidad Excepcional</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-tight mb-6 leading-[1.1]">
            <span className="block text-[#2C2416]">TextilPro</span>
            <span className="block text-[#8B4513] font-normal mt-2">Mayorista de Telas</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#5C4A37] font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Telas deportivas y soft de la más alta calidad. 
            <span className="block mt-2 text-[#6B5B47]">Craftsmanship que define la excelencia.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#catalogo"
              className="group px-8 py-4 bg-[#8B4513] hover:bg-[#7A3D12] text-white font-medium tracking-wide transition-all duration-300 flex items-center gap-2 uppercase text-sm shadow-md"
            >
              Explorar Colección
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/calculadora"
              className="px-8 py-4 border-2 border-[#8B4513] hover:bg-[#8B4513]/10 text-[#8B4513] font-medium tracking-wide transition-all duration-300 uppercase text-sm"
            >
              Calculadora
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8B4513]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#8B4513] rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y border-[#E8DCC4] bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] mb-6">
                <Award className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-3 text-[#8B4513]">Calidad Premium</h3>
              <p className="text-[#6B5B47] font-light leading-relaxed">
                Selección exclusiva de telas de la más alta calidad para producción de indumentaria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] mb-6">
                <Shield className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-3 text-[#8B4513]">Stock Garantizado</h3>
              <p className="text-[#6B5B47] font-light leading-relaxed">
                Disponibilidad inmediata con stock actualizado en tiempo real.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DCC4] border border-[#D4C4A8] mb-6">
                <Sparkles className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-3 text-[#8B4513]">Variedad Excepcional</h3>
              <p className="text-[#6B5B47] font-light leading-relaxed">
                Amplia gama de colores y texturas para cada necesidad de diseño.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-serif font-normal mb-4 text-[#2C2416]">
              Nuestra <span className="text-[#8B4513]">Colección</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8B4513] to-transparent mx-auto mb-6" />
            <p className="text-[#6B5B47] font-light text-lg max-w-2xl mx-auto">
              Descubre nuestra selección exclusiva de telas deportivas y soft, 
              cuidadosamente seleccionadas para la producción de indumentaria de alta calidad.
          </p>
        </div>
        <FabricCatalog />
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#E8DCC4] bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-normal mb-6 text-[#2C2416]">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-[#6B5B47] font-light mb-10">
            Contacta con nuestro equipo para consultas personalizadas y cotizaciones.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#8B4513] hover:bg-[#7A3D12] text-white font-medium tracking-wide transition-all duration-300 uppercase text-sm shadow-md"
          >
            Contactar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
