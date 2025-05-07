import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fromUserId = await getNeonIdFromClerkId(userId);

    const body = await req.json();
    const { toUserId, type } = body;

    if (!toUserId || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const relationship = await prisma.userRelationship.create({
      data: {
        fromUserId,
        toUserId,
        type,
        status: "PENDING", 
      },
    });

    return NextResponse.json(relationship);
  } catch (error) {
    console.error("Error creating relationship:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
