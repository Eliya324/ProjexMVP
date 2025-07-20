import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latest = await prisma.feedbackQuestion.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      return NextResponse.json({ error: "No questions found" }, { status: 404 });
    }

    return NextResponse.json(latest);
  } catch (error) {
    console.error("Failed to fetch latest question:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
