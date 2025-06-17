import { prisma } from "@/lib/prisma";
import { CommentableType, LikeableType } from "@prisma/client";

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { fullName: true, profilePicture: true } },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const postIds = posts.map(post => post.id);

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

  const commentCountByPostId = Object.fromEntries(postIds.map(id => [id, 0]));
  for (const comment of comments) {
    commentCountByPostId[comment.commentableId]++;
  }

  const likeCountByPostId = Object.fromEntries(postIds.map(id => [id, 0]));
  for (const like of likes) {
    likeCountByPostId[like.likeableId]++;
  }

  return posts.map(post => ({
    id: post.id,
    content: post.content,
    image: post.image,
    createdAt: post.createdAt,
    author: post.author,
    likes: likeCountByPostId[post.id] || 0,
    comments: commentCountByPostId[post.id] || 0,
    projectTitle: post.project?.title || "",
  }));
}
