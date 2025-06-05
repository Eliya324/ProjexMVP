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

  const body = await req.json(); // ← זה חייב לבוא לפני השורה הבאה

  // const { content, image, projectId } = body;
  const content = body.content;
const image = body.image;
const projectId = body.projectId;


  const dbUserId = await getNeonIdFromClerkId(userId);


  const newPost = await prisma.post.create({
    data: {
      content,
      image,
      authorId: dbUserId,
      projectId, // ← כאן זה עובד רק אם למעלה יש את destructuring
    },
  });

  return NextResponse.json(newPost);
}



export async function GET() {
  try {
    // שלב 1: מביאים את כל הפוסטים כולל מחבר
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
            title: true, // ⬅️ זה מה שצריך
          },
        },
      },      
      orderBy: {
        createdAt: "desc",
      },
    });

    const postIds = posts.map((post) => post.id);

    // שלב 2: מביאים את כל התגובות לפוסטים
    const comments = await prisma.comment.findMany({
      where: {
        commentableType: CommentableType.POST,
        commentableId: { in: postIds },
      },
    });

    // שלב 3: מביאים את כל הלייקים לפוסטים
    const likes = await prisma.like.findMany({
      where: {
        likeableType: LikeableType.POST,
        likeableId: { in: postIds },
      },
    });

    // שלב 4: קיבוץ לפי postId
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

    // שלב 5: עיבוד לפורמט שמצופה ב-Client
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      author: post.author,
      likes: likeCountByPostId[post.id] || 0,
      comments: commentCountByPostId[post.id] || 0,
      projectTitle: post.project?.title || "",
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
    // const formattedPosts = posts.map((post) => ({
    //   id: post.id,
    //   content: post.content,
    //   image: post.image,
    //   createdAt: post.createdAt,
    //   likes: likes.filter((l) => l.likeableId === post.id).length,
    //   comments: comments.filter((c) => c.commentableId === post.id).length,
    //   projectTitle: post.project.title,
    //   author: {
    //     fullName: post.author.fullName,
    //     profilePicture: post.author.profilePicture,
    //   },
    // }));
    


    // שלב 5: עיבוד לפורמט שמצופה ב-Client
  // const formattedPosts = posts.map((post) => ({
    //   id: post.id,
    //   content: post.content,
    //   image: post.image,
    //   createdAt: post.createdAt,
    //   author: post.author,
    //   likes: likeCountByPostId[post.id] || 0,
    //   comments: commentCountByPostId[post.id] || 0,
    //   projectTitle: post.project?.title || "",
    // }));




// // POST /api/posts/route.ts
// export async function POST(req: NextRequest) {
//   const neonId = await getNeonUserIdOrResponse(req);
//   if (typeof neonId !== "string") return neonId; // מחזיר 401

//   const body = await req.json();
//   const { content, image, projectId } = body;

//   if (!content || !projectId) {
//     return NextResponse.json({ error: "Missing content or projectId" }, { status: 400 });
//   }

//   try {
//     const post = await prisma.post.create({
//       data: {
//         content,
//         image,
//         authorId: neonId,
//         projectId,
//       },
//     });

//     return NextResponse.json(post);
//   } catch (error) {
//     console.error("❌ Error creating post:", error);
//     return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
//   }
// }

