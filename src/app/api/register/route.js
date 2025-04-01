import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuth, clerkClient } from '@clerk/nextjs/server'

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email } = body

        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            })
        }

        // create user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                fullName: username
            }
        })

        return new Response(JSON.stringify({ success: true, user: newUser }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        })
    } catch (error) {
        console.error("Error registering user:", error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}

export async function PUT(req) {
    try {
        //get the userId from clerck
        const { userId } = getAuth(req)

        // Protect the route by checking if the user is signed in
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        // Initialize the Backend SDK
        const client = await clerkClient()

        // Get the user's full `Backend User` object
        const user = await client.users.getUser(userId)
        const email = user.primaryEmailAddress ? user.primaryEmailAddress.emailAddress : null;
        console.log("email", email);

        if (!email) {
            return NextResponse.json({ error: "Email not found" }, { status: 400 });
        }

        // חיפוש המשתמש ב-Neon לפי אימייל
        const neonUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!neonUser) {
            return NextResponse.json({ error: "User not found in Neon DB" }, { status: 404 });
        }

        const neonUserId = neonUser.id; // get the real id from db

        const data = await req.json();

        const formatDate = (dateString) => dateString ? new Date(dateString) : null;

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
        //update  and create the professionalExperiences
        for (const exp of data.professionalExperiences) {
            if (exp.id) {
                // check if it exist
                const existingExp = await prisma.professionalExperience.findUnique({
                    where: { id: exp.id },
                });

                if (existingExp) {
                    //update
                    await prisma.professionalExperience.update({
                        where: { id: exp.id },
                        data: {
                            jobTitle: exp.jobTitle,
                            company: exp.company,
                            startDate: formatDate(exp.startDate),
                            endDate: formatDate(exp.endDate),
                            description: exp.description,
                        },
                    });
                } else {
                    // create
                    await prisma.professionalExperience.create({
                        data: {
                            userId: neonUserId,
                            jobTitle: exp.jobTitle,
                            company: exp.company,
                            startDate: formatDate(exp.startDate),
                            endDate: formatDate(exp.endDate),
                            description: exp.description,
                        },
                    });
                }
            } else {
                // create new one
                await prisma.professionalExperience.create({
                    data: {
                        userId: neonUserId,
                        jobTitle: exp.jobTitle,
                        company: exp.company,
                        startDate: formatDate(exp.startDate),
                        endDate: formatDate(exp.endDate),
                        description: exp.description,
                    },
                });
            }
        }
        //Ctreate and update educations
        for (const edu of data.educations) {
            if (edu.id) {
                 // check if it exist
                const existingEdu = await prisma.education.findUnique({
                    where: { id: edu.id },
                });

                if (existingEdu) {
                    // update
                    await prisma.education.update({
                        where: { id: edu.id },
                        data: {
                            institution: edu.institution,
                            degree: edu.degree,
                            startDate: formatDate(edu.startDate),
                            endDate: formatDate(edu.endDate),
                            description: edu.description,
                        },
                    });
                } else {
                    // create
                    await prisma.education.create({
                        data: {
                            userId: neonUserId,
                            institution: edu.institution,
                            degree: edu.degree,
                            startDate: formatDate(edu.startDate),
                            endDate: formatDate(edu.endDate),
                            description: edu.description,
                        },
                    });
                }
            } else {
                await prisma.education.create({
                    data: {
                        userId: neonUserId,
                        institution: edu.institution,
                        degree: edu.degree,
                        startDate: formatDate(edu.startDate),
                        endDate: formatDate(edu.endDate),
                        description: edu.description,
                    },
                });
            }
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);

        if (error instanceof prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}