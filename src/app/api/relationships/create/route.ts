import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("bodt",body);
  
  const { fromUserId, toUserId, type } = body;
   const neonUserId = await getNeonIdFromClerkId(fromUserId);
  if (!fromUserId || !toUserId || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const relationship = await prisma.userRelationship.create({
      data: {
        fromUserId:neonUserId,
        toUserId,
        type,
        status: "PENDING", 
      },
    });

    return NextResponse.json({ success: true, relationship });
  } catch (error) {
    console.error("Failed to create relationship", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
