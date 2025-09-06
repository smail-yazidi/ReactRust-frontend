import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const backendUrl = "https://reactrust-backend-production.up.railway.app"
    const response = await fetch(`${backendUrl}/api/cv`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching CV URLs:", error)
    return NextResponse.json({ error: "Failed to fetch CV URLs" }, { status: 500 })
  }
}
