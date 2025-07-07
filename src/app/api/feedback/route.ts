import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

//Saving a feedback response
export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const neonUserId = await getNeonIdFromClerkId(userId);
        const body = await req.json();
        const { questionId, rating, isHelpful, comment } = body;

        if (!questionId || (rating == null && isHelpful == null)) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newFeedback = await prisma.feedback.create({
            data: {
                userId:neonUserId,
                questionId,
                rating,
                isHelpful,
                comment,
            },
        });
        return NextResponse.json(newFeedback);
    } catch (error) {
        console.error("Feedback creation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
