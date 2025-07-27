
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uniqueById } from "@/lib/utils";
export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = params;

  try {
    const [contributors, followers, pendingRequests] = await Promise.all([
      prisma.projectRelationship.findMany({
        where: {
          projectId,
          type: "MEMBER",
          status: "ACCEPTED",
        },
        include: { user: true },
      }),
      prisma.projectRelationship.findMany({
        where: {
          projectId,
          type: "FOLLOWER",
          status: "ACCEPTED",
        },
        include: { user: true },
      }),
      prisma.projectRelationship.findMany({
        where: {
          projectId,
          status: "PENDING",
        },
        include: { user: true },
      }),
    ]);

    return NextResponse.json(
      {
        contributors: uniqueById(contributors.map((r) => r.user)),
        followers: uniqueById(followers.map((r) => r.user)),
        pendingRequests: uniqueById(pendingRequests.map((r) => r.user)),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching connections for project", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
