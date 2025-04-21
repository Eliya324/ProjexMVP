import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function getNeonIdFromClerkId(clerkId: string): Promise<string> {
    const client = await clerkClient();
    const user = await client.users.getUser(clerkId);

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
        throw new Error("Email not found");
    }

    const neonUser = await prisma.user.findUnique({ where: { email } });
    if (!neonUser) {
        throw new Error("User not found in Neon DB");
    }

    return neonUser.id;
}

