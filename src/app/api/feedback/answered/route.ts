import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

//Check whether the logged in user has already submitted feedback on a specific question.
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const neonUserId = await getNeonIdFromClerkId(userId);
    const questionId = req.nextUrl.searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
    }

    const existing = await prisma.feedback.findFirst({
      where: {
        userId: neonUserId,
        questionId,
      },
    });

    return NextResponse.json({ answered: !!existing });
  } catch (error) {
    console.error("Check answered error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
