import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const neonUserId = await getNeonIdFromClerkId(userId);
    try {
        const [
            followers,
            following,
            projectFollowing,
            pendingRequests,
            friends
        ] = await Promise.all([
            prisma.userRelationship.findMany({
                where: {
                    toUserId: neonUserId,
                    type: 'FOLLOWER',
                    status: 'ACCEPTED',
                },
                include: { fromUser: true },
            }),
            prisma.userRelationship.findMany({
                where: {
                    fromUserId: neonUserId,
                    type: 'FOLLOWER',
                    status: 'ACCEPTED',
                },
                include: { toUser: true },
            }),
            prisma.projectRelationship.findMany({
                where: {
                    userId: neonUserId,
                    type: 'FOLLOWER',
                    status: 'ACCEPTED',
                },
                include: { project: true },
            }),
            prisma.userRelationship.findMany({
                where: {
                    toUserId: neonUserId,
                    status: 'PENDING',
                },
                include: {
                    fromUser: true,
                },
            }),
            prisma.userRelationship.findMany({
                where: {
                    type: 'FRIEND',
                    status: 'ACCEPTED',
                    OR: [
                        { fromUserId: neonUserId },
                        { toUserId: neonUserId },
                    ],
                },
                include: {
                    fromUser: true,
                    toUser: true,
                },
            }),
        ]);
        const friendUsers = friends.map(rel =>
            rel.fromUserId === neonUserId ? rel.toUser : rel.fromUser
        );

        const allFollowers = [...followers.map(f => f.fromUser), ...friendUsers];
        const allFollowing = [...following.map(f => f.toUser), ...friendUsers];

        // הסרת כפילויות לפי id (אופציונלי אך מומלץ)
        const uniqueById = (arr:any[]) =>
            Object.values(
                arr.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {})
            );
        console.log("followers:", followers);
        console.log("following", following);
        console.log("pending", pendingRequests);



        if (!followers) {
            return NextResponse.json({ error: "followers not found" }, { status: 404 });
        }

        return NextResponse.json({
            followers: uniqueById([...followers.map(f => f.fromUser), ...friendUsers]),
            following: uniqueById([...following.map(f => f.toUser), ...friendUsers]),
            projectFollowing: projectFollowing.map(f => f.project),
            ConnectionRequests: pendingRequests.map(f => ({
                relationshipId: f.id,
                fullName: f.fromUser.fullName,
                title: f.fromUser.professionalTitle,
                profilePicture: f.fromUser.profilePicture,
            }))
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}