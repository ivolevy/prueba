export type FabricType = "deportivo" | "soft"

export interface Fabric {
  id: string
  name: string
  type: FabricType
  colors: string[]
  pricePerMeter: number
  stock: number
}

export const INITIAL_FABRICS: Fabric[] = [
  {
    id: "1",
    name: "Tela Deportiva Premium",
    type: "deportivo",
    colors: ["Negro", "Azul Marino", "Rojo", "Gris", "Verde"],
    pricePerMeter: 850,
    stock: 500,
  },
  {
    id: "2",
    name: "Tela Deportiva Clásica",
    type: "deportivo",
    colors: ["Negro", "Blanco", "Azul"],
    pricePerMeter: 650,
    stock: 750,
  },
  {
    id: "3",
    name: "Tela Soft Premium",
    type: "soft",
    colors: ["Beige", "Gris Claro", "Rosa", "Celeste", "Blanco"],
    pricePerMeter: 720,
    stock: 600,
  },
  {
    id: "4",
    name: "Tela Soft Estándar",
    type: "soft",
    colors: ["Negro", "Gris", "Azul"],
    pricePerMeter: 580,
    stock: 800,
  },
]

// Metros de tela necesarios por short (aproximado)
export const METERS_PER_SHORT = 0.75
