import { NextResponse } from "next/server"
import { INITIAL_CONTACT_INFO, type ContactInfo } from "@/lib/settings-data"

// In-memory storage for demo purposes
let contactInfo: ContactInfo = { ...INITIAL_CONTACT_INFO }

export async function GET() {
  return NextResponse.json(contactInfo)
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    contactInfo = { ...data }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
  }
}
