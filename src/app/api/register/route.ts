import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAuth, clerkClient, auth } from '@clerk/nextjs/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email } = body

        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // create user
        const newUser = await prisma.user.create({
            data: {
                username: username ?? email.split('@')[0],
                email,
                fullName: username ?? email.split('@')[0]
            }
        })

        return NextResponse.json(
            { success: true, user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const neonUserId = await getNeonIdFromClerkId(userId);

        if (!neonUserId) {
            return NextResponse.json({ error: "User not found in Neon DB" }, { status: 404 });
        }


        const data = await req.json();

        const formatDate = (dateString: any) => dateString ? new Date(dateString) : null;

        //update the user
        const updatedUser = await prisma.user.update({
            where: { id: neonUserId },
            data: {
                contactPhone: data.contactPhone,
                location: data.location,
                languagesSpoken: data.languagesSpoken,
                skills: data.skills,
                personalSummary: data.personalSummary,
            },
            include: {
                professionalExperiences: true,
                educations: true,
            }
        });
        //Update/create professional experiences
        await Promise.all(
            data.professionalExperiences.map(async (exp: any) => {
                const commonData: any = {
                    jobTitle: exp.jobTitle,
                    company: exp.company,
                    startDate: formatDate(exp.startDate),
                    endDate: formatDate(exp.endDate),
                    description: exp.description,
                };

                if (exp.id) {
                    const existingExp = await prisma.professionalExperience.findUnique({
                        where: { id: exp.id },
                    });

                    if (existingExp) {
                        return prisma.professionalExperience.update({
                            where: { id: exp.id },
                            data: commonData,
                        });
                    }
                }

                return prisma.professionalExperience.create({
                    data: {
                        userId: neonUserId,
                        ...commonData,
                    },
                });
            })
        );

        // Update/create educations
        await Promise.all(
            data.educations.map(async (edu: any) => {
                const commonData: any = {
                    institution: edu.institution,
                    degree: edu.degree,
                    startDate: formatDate(edu.startDate),
                    endDate: formatDate(edu.endDate),
                    description: edu.description,
                };

                if (edu.id) {
                    const existingEdu = await prisma.education.findUnique({
                        where: { id: edu.id },
                    });

                    if (existingEdu) {
                        return prisma.education.update({
                            where: { id: edu.id },
                            data: commonData,
                        });
                    }
                }

                return prisma.education.create({
                    data: {
                        userId: neonUserId,
                        ...commonData,
                    },
                });
            })
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);

        if (error instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}