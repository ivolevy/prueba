import { FabricCatalog } from "@/components/fabric-catalog"
import Link from "next/link"
import { ArrowRight, Sparkles, Award, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.1),transparent_70%)]" />
        </div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(184,134,11,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(184,134,11,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-900/30 to-amber-800/30 border border-amber-800/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-light tracking-wider text-amber-200 uppercase">Calidad Excepcional</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white">TextilPro</span>
            <span className="block text-amber-400 font-extralight mt-2">Mayorista de Telas</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Telas deportivas y soft de la más alta calidad. 
            <span className="block mt-2 text-gray-400">Craftsmanship que define la excelencia.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#catalogo"
              className="group px-8 py-4 bg-amber-600 hover:bg-amber-500 text-black font-medium tracking-wide transition-all duration-300 flex items-center gap-2 uppercase text-sm"
            >
              Explorar Colección
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/calculadora"
              className="px-8 py-4 border border-amber-600/50 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 font-medium tracking-wide transition-all duration-300 uppercase text-sm"
            >
              Calculadora
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-600/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-900/30 border border-amber-800/50 mb-6">
                <Award className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif font-light mb-3 text-amber-400">Calidad Premium</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Selección exclusiva de telas de la más alta calidad para producción de indumentaria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-900/30 border border-amber-800/50 mb-6">
                <Shield className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif font-light mb-3 text-amber-400">Stock Garantizado</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Disponibilidad inmediata con stock actualizado en tiempo real.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-900/30 border border-amber-800/50 mb-6">
                <Sparkles className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif font-light mb-3 text-amber-400">Variedad Excepcional</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Amplia gama de colores y texturas para cada necesidad de diseño.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-serif font-light mb-4 text-white">
              Nuestra <span className="text-amber-400">Colección</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
              Descubre nuestra selección exclusiva de telas deportivas y soft, 
              cuidadosamente seleccionadas para la producción de indumentaria de alta calidad.
          </p>
        </div>
        <FabricCatalog />
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-light mb-6 text-white">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-400 font-light mb-10">
            Contacta con nuestro equipo para consultas personalizadas y cotizaciones.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center gap-2 px-10 py-5 bg-amber-600 hover:bg-amber-500 text-black font-medium tracking-wide transition-all duration-300 uppercase text-sm"
          >
            Contactar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
