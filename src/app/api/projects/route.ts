import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";
import { z } from "zod";

const projectInclude = {
  ratings: true,
  relationships: { include: { user: true } },
};

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  objective: z.string().optional(),
  requiredSkills: z.array(z.string()),
  usedTechnologies: z.array(z.string()),
  missingTalents: z.array(z.string()),
  status: z.enum(["ACTIVE", "COMPLETED"]).default("ACTIVE"),
  documentPDFs: z.array(z.string()),
  relationships: z.object({
    create: z.array(z.any()),
  }),
  posts: z.object({
    create: z.array(z.any()),
  }),
  ratings: z.object({
    create: z.array(z.any()),
  }),
});

function getUserIdOrThrow(req: NextRequest): string {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

async function getNeonUserIdOrResponse(req: NextRequest): Promise<string | NextResponse> {
  try {
    const userId = getUserIdOrThrow(req);
    return await getNeonIdFromClerkId(userId);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdOrThrow(req);
    const body = await req.json();

    const parsedData = projectSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ message: parsedData.error.errors }, { status: 400 });
    }

    const {
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
      ratings
    } = parsedData.data;

    const requiredFields = [
      { value: title, name: "Title" },
      { value: shortDescription, name: "Short description" },
      { value: status, name: "Status" },
    ];

    for (const { value, name } of requiredFields) {
      if (!value) {
        return NextResponse.json({ message: `${name} is required` }, { status: 400 });
      }
    }

    let neonUserId;
    try {
      neonUserId = await getNeonIdFromClerkId(userId);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
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
  } catch (error: unknown) {
    console.error("Error adding new project:", error);
    const errorMessage = error instanceof Error ? error.message : "Error adding new project";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // Check if type is invalid
    if (type && !["owned", "member"].includes(type)) {
      return NextResponse.json({ message: "Invalid type parameter" }, { status: 400 });
    }

  if (type === "owned" || type === "member") {
    const neonUserIdOrResponse = await getNeonUserIdOrResponse(req);  
    if (neonUserIdOrResponse instanceof NextResponse) return neonUserIdOrResponse;  
    const neonUserId = neonUserIdOrResponse;  

    if (type === "owned") {
      const ownedProjects = await prisma.project.findMany({
        where: { ownerId: neonUserId },
        include: projectInclude
      });

      return NextResponse.json(ownedProjects);
    }

    if (type === "member") {
      const membershipProjects = await prisma.project.findMany({
        where: {
          relationships: {
            some: {
              userId: neonUserId,
            },
          },
        },
        include: projectInclude
      });

      return NextResponse.json(membershipProjects);
    }
  }

  // fallback - get all projects
  const projects = await prisma.project.findMany({
    include: projectInclude
  });

  return NextResponse.json(projects);
}