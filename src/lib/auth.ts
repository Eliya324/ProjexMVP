// src/lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export function getUserIdOrThrow(req: NextRequest): string {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function getNeonUserIdOrResponse(req: NextRequest): Promise<string | NextResponse> {
  try {
    const userId = getUserIdOrThrow(req);
    return await getNeonIdFromClerkId(userId);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// // app/(some-page)/page.tsx
// import AddPosts from "@/components/AddPosts";
// import { prisma } from "@/lib/prisma";
// import { getNeonUserIdOrResponse } from "@/lib/auth";
// import { cookies } from "next/headers";

// export default async function Page() {
//   const req = {
//     headers: { cookie: cookies().toString() },
//   } as any;

//   const neonUserId = await getNeonUserIdOrResponse(req);

//   if (typeof neonUserId !== "string") {
//     return <div>לא מחובר / אין הרשאה</div>;
//   }

//   const project = await prisma.project.findFirst({
//     where: { ownerId: neonUserId },
//   });

//   if (!project) {
//     return <div>לא נמצא פרויקט עבור המשתמש</div>;
//   }

//   return (
//     <AddPosts
//       projectId={project.id}
//       onClose={() => {
//         // כאן תחליטי מה לעשות עם סגירה, למשל ניווט חזרה
//       }}
//     />
//   );
// }
