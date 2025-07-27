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

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  // Choose the correct environment variable based on the execution context
  // Use server-side variable if running on the server, otherwise use the public one for the client
  const envVar =
    typeof window === "undefined"
      ? process.env.ADMIN_EMAILS 
      : process.env.NEXT_PUBLIC_ADMIN_EMAILS; 
  const adminEmails = envVar?.split(",").map((e) => e.trim()) ?? [];
  return adminEmails.includes(email);
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
