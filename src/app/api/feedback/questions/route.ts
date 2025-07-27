import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/auth";


export async function GET() {
  try {
    const questions = await prisma.feedbackQuestion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }
    if (!isAdminEmail(email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const { question, type } = await req.json();

    if (!question || !["RATING", "BINARY"].includes(type)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }
    const newQuestion = await prisma.feedbackQuestion.create({
      data: { question, type },
    });

    return NextResponse.json(newQuestion, { status: 201 });

  } catch (error) {
    console.error("❌ Error in /api/feedback/questions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}