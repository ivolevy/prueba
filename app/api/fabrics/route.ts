import { NextResponse } from "next/server"
import { INITIAL_FABRICS, type Fabric } from "@/lib/fabric-data"

// In-memory storage for demo purposes
let fabrics: Fabric[] = [...INITIAL_FABRICS]

export async function GET() {
  return NextResponse.json(fabrics)
}

export async function PUT(request: Request) {
  try {
    const { id, stock, pricePerMeter } = await request.json()

    fabrics = fabrics.map((fabric) => (fabric.id === id ? { ...fabric, stock, pricePerMeter } : fabric))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update fabric" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { fabrics: importedFabrics } = await request.json()

    if (!Array.isArray(importedFabrics)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Replace fabrics with imported data
    fabrics = importedFabrics

    return NextResponse.json({ success: true, count: fabrics.length })
  } catch (error) {
    console.error("Error importing fabrics:", error)
    return NextResponse.json({ error: "Failed to import fabrics" }, { status: 500 })
  }
}
