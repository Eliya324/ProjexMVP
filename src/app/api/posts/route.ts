import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       include: {
//         author: {
//           select: {
//             fullName: true,
//             profilePicture: true,
//           },
//         },
//         likes: true,
//         comments: true,
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(posts);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
//   }
// }

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
          likes: true,
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      });
  
      return NextResponse.json(posts);
    } catch (error) {
      console.error("❌ Prisma fetch error:", error); // הוספת לוג מדויק
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
  }
  