import { FabricCalculator } from "@/components/fabric-calculator"

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-slate-900">
            Estimar <span className="text-slate-700">Costos</span>
          </h1>
          <div className="w-24 h-1 bg-slate-900 mx-auto mb-6" />
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Calcula cuántos metros necesitas y el costo total para producir shorts con nuestras telas premium.
          </p>
        </div>
        <FabricCalculator />
      </div>
    </div>
  )
}
