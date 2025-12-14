import { NextResponse } from "next/server"
import { INITIAL_CALCULATOR_SETTINGS, type CalculatorSettings } from "@/lib/settings-data"

// In-memory storage for demo purposes
let calculatorSettings: CalculatorSettings = { ...INITIAL_CALCULATOR_SETTINGS }

export async function GET() {
  return NextResponse.json(calculatorSettings)
}

export async function PUT(request: Request) {
  try {
    const { metersPerShort } = await request.json()

    calculatorSettings = { metersPerShort: Number(metersPerShort) }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update calculator settings" }, { status: 500 })
  }
}
