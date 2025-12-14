import { FabricCalculator } from "@/components/fabric-calculator"

export default function CalculadoraPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Calculadora de Producción</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Calcula cuántos metros necesitas y el costo total para producir shorts con nuestras telas.
          </p>
        </div>
        <FabricCalculator />
      </div>
    </div>
  )
}
