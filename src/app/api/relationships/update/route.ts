import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { relationshipId, action } = body

  console.log("relationshipId", relationshipId)
  console.log("action", action);
  

  if (!relationshipId || !["ACCEPTED", "REJECTED"].includes(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    const updated = await prisma.userRelationship.update({
      where: { id: relationshipId },
      data: { status: action },
    })

    return NextResponse.json({ success: true, updated })
  } catch (error) {
    console.error("Failed to update relationship", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
