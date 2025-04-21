import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server'
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";
export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        const { title, shortDescription, objective, requiredSkills, usedTechnologies, missingTalents, status, documentPDFs, relationships, posts, ratings } = body;

        const requiredFields = [
            { value: userId, name: "User" },
            { value: title, name: "Title" },
            { value: shortDescription, name: "Short description" },
            { value: status, name: "Status" },
        ];

        for (const { value, name } of requiredFields) {
            if (!value) return NextResponse.json({ message: `${name} is required` }, { status: 400 });
        }

        let neonUserId;

        try {
            neonUserId = await getNeonIdFromClerkId(userId);
        } catch (error) {
            return NextResponse.json({ error: error?.message || String(error) }, { status: 400 });
        }

        const newProject = await prisma.project.create({
            data: {
                owner: {
                    connect: {
                        id: neonUserId
                    }
                },
                title,
                shortDescription,
                objective,
                requiredSkills,
                usedTechnologies,
                missingTalents,
                status,
                documentPDFs,
                relationships,
                posts,
                ratings,
            }
        });

        return NextResponse.json({ message: "New project added successfully", project: newProject }, { status: 201 });
    } catch (error) {
        console.error("Error adding new project:", error);
        return NextResponse.json({ message: error.message || "Error adding new project" }, { status: 500 });
    }
}