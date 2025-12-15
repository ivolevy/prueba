import { FabricCatalog } from "@/components/fabric-catalog"
import Link from "next/link"
import { ArrowRight, Award, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-b from-slate-50 to-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-10">
              <div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                  <span className="block text-slate-900">TextilPro</span>
                  <span className="block text-slate-600 mt-2 text-5xl sm:text-6xl lg:text-7xl font-normal">
                    Mayorista de Telas
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Telas deportivas y soft de la más alta calidad para producción de indumentaria.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#catalogo"
                  className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Explorar Colección
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/calculadora"
                  className="px-8 py-4 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Estimar Costos
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-4xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Productos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Disponible</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Calidad</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features Cards */}
            <div className="space-y-5">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">Calidad Premium</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Selección exclusiva de telas de la más alta calidad para producción profesional.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">Stock Garantizado</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Disponibilidad inmediata con stock actualizado en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">Variedad Excepcional</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Amplia gama de colores y texturas para cada necesidad de diseño.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-slate-900">
              Nuestra Colección
            </h2>
            <div className="w-24 h-1 bg-slate-900 mx-auto mb-6" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre nuestra selección exclusiva de telas deportivas y soft para producción de indumentaria de alta calidad.
            </p>
          </div>
          <FabricCatalog />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Contacta con nuestro equipo para consultas personalizadas y cotizaciones.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Contactar Ahora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
