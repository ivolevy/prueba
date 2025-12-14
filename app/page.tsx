import { FabricCatalog } from "@/components/fabric-catalog"

export default function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Catálogo de Telas</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Encuentra telas deportivas y soft de la más alta calidad. Revisa nuestro stock disponible.
          </p>
        </div>
        <FabricCatalog />
      </div>
    </div>
  )
}
