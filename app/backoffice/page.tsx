import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackofficeTable } from "@/components/backoffice-table"
import { CalculatorSettingsEditor } from "@/components/calculator-settings-editor"
import { ContactInfoEditor } from "@/components/contact-info-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BackofficePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Backoffice</h1>
            <p className="text-sm text-muted-foreground">Panel de Administración</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Volver al Catálogo</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="stock" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stock">Stock de Productos</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="stock">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Administrar Stock de Productos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Actualiza el stock y precios de las telas disponibles. Importa y exporta datos mediante CSV.
                </p>
              </div>
              <BackofficeTable />
            </TabsContent>

            <TabsContent value="calculator">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Configurar Calculadora</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ajusta los parámetros de la calculadora de producción de shorts.
                </p>
              </div>
              <CalculatorSettingsEditor />
            </TabsContent>

            <TabsContent value="contact">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Editar Información de Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Modifica los datos de contacto que se muestran en la página pública.
                </p>
              </div>
              <ContactInfoEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
