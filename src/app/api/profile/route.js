import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        console.log("User ID:", userId);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Initialize the Backend SDK
        const client = await clerkClient()

        // Get the user's full `Backend User` object
        const userClerck = await client.users.getUser(userId)

        const email = userClerck.primaryEmailAddress ? userClerck.primaryEmailAddress.emailAddress : null;

        if (!email) {
            return NextResponse.json({ error: "Email not found" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                professionalExperiences: true,
                educations: true,
                certifications: true,
                recommendationsReceived: true,
            },
        });
            console.log("User:", user);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
