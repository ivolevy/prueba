import { FabricCalculator } from "@/components/fabric-calculator"

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2C2416] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-normal mb-4 text-[#2C2416]">
            Calculadora de <span className="text-[#8B4513]">Producción</span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8B4513] to-transparent mx-auto mb-6" />
          <p className="text-xl text-[#6B5B47] font-light max-w-2xl mx-auto">
            Calcula cuántos metros necesitas y el costo total para producir shorts con nuestras telas premium.
          </p>
        </div>
        <FabricCalculator />
      </div>
    </div>
  )
}
