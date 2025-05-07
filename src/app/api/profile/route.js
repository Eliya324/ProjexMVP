import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                professionalExperiences: true,
                educations: true,
                certifications: true,
                recommendationsReceived: true,
                projectRelationships: {
                    include: { project: true },
                },
                relationshipsSent: true,
                relationshipsReceived: true,
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

export async function PUT(req) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const neonUserId = await getNeonIdFromClerkId(userId);
        const body = await req.json();
        const { field, value } = body;
        console.log("body", body);

        if (!field || !value) {
            return NextResponse.json({ error: "Field and value are required" }, { status: 400 });
        }

        const fieldMappings = {
            'fullName': 'user',
            'professionalTitle': 'user',
            'location': 'user',
            'personalSummary': 'user',
            'contactPhone': 'user',
            'skills': 'user',
            'interests': 'user',
            'languagesSpoken': 'user',
            'professionalExperiences': 'professionalExperience',
            'educations': 'education',
        };

        const model = fieldMappings[field];
        if (!model) {
            return NextResponse.json({ error: "Invalid field" }, { status: 400 });
        }

        if (field === "educations" || field === "professionalExperiences") {
            const modelName = field === "educations" ? "education" : "professionalExperience";

            await prisma[modelName].deleteMany({
                where: { userId: neonUserId },
            });

            for (const item of value) {
                await prisma[modelName].create({
                    data: {
                        ...item,
                        startDate: item.startDate ? new Date(item.startDate) : null,
                        endDate: item.endDate ? new Date(item.endDate) : null,
                        userId: neonUserId,
                    },
                });
            }
        }
        else if (Array.isArray(value)) {
            await prisma.user.update({
                where: { id: neonUserId },
                data: { [field]: { set: value } },
            });
        }
        else {
            await prisma.user.update({
                where: { id: neonUserId },
                data: { [field]: value },
            });
        }

        const updatedUser = await prisma.user.findUnique({
            where: { id: neonUserId },
            include: {
                professionalExperiences: true,
                educations: true,
                certifications: true,
                recommendationsReceived: true,
                projectRelationships: {
                    include: { project: true },
                },
            },
        });

        return NextResponse.json({ success: true, updatedUser });

    } catch (error) {
        console.error("Error updating user field:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
