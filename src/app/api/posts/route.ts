import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CommentableType, LikeableType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
 
  const { content, image, projectId } = await req.json();
  const dbUserId = await getNeonIdFromClerkId(userId);
  const newPost = await prisma.post.create({
    data: {
      content,
      image,
      authorId: dbUserId,
      projectId, 
    },
  });
  return NextResponse.json(newPost);
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            fullName: true,
            profilePicture: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
      },      
      orderBy: {
        createdAt: "desc",
      },
    });

    const postIds = posts.map((post) => post.id);

    const comments = await prisma.comment.findMany({
      where: {
        commentableType: CommentableType.POST,
        commentableId: { in: postIds },
      },
    });

    const likes = await prisma.like.findMany({
      where: {
        likeableType: LikeableType.POST,
        likeableId: { in: postIds },
      },
    });

    const commentCountByPostId = Object.fromEntries(
      postIds.map((id) => [id, 0])
    );
    for (const comment of comments) {
      commentCountByPostId[comment.commentableId]++;
    }

    const likeCountByPostId = Object.fromEntries(
      postIds.map((id) => [id, 0])
    );
    for (const like of likes) {
      likeCountByPostId[like.likeableId]++;
    }

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      author: post.author,
      likes: likeCountByPostId[post.id] || 0,
      comments: commentCountByPostId[post.id] || 0,
      projectTitle: post.project?.title || null,

    }));

    return NextResponse.json(formattedPosts);
    
  } catch (error) {
    console.error("❌ Prisma fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
    