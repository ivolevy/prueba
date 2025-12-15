import { FabricCalculator } from "@/components/fabric-calculator"

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-[#FEFCF8] text-[#2D1B0E] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-[#2D1B0E]">
            Estimar <span className="text-[#8B5A3C]">Costos</span>
          </h1>
          <div className="w-20 h-1 bg-[#8B5A3C] mx-auto mb-4" />
          <p className="text-base text-[#6B4E3D] font-medium max-w-xl mx-auto">
            Calcula cuántos metros necesitas y el costo total para producir shorts con nuestras telas premium.
          </p>
        </div>
        <FabricCalculator />
      </div>
    </div>
  )
}
