import { FabricCalculator } from "@/components/fabric-calculator"

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-light mb-4 text-white">
            Calculadora de <span className="text-amber-400">Producción</span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Calcula cuántos metros necesitas y el costo total para producir shorts con nuestras telas premium.
          </p>
        </div>
        <FabricCalculator />
      </div>
    </div>
  )
}
