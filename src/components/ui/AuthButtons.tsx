
"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerkAppearance";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function AuthButtons() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();
    const [hasRegistered, setHasRegistered] = useState(false);


    useEffect(() => {
        if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress && !hasRegistered) {
            //Check if the user Register After Clerck-Create in DB
            const userCreationTime = user.createdAt ? new Date(Number(user.createdAt)) : null;
            if (userCreationTime) {
                const now = new Date();
                const timeDiff = (now.getTime() - userCreationTime.getTime()) / 1000;
                if (timeDiff < 30) {

                    fetch("/api/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: user.username || (user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName),
                            email: user.primaryEmailAddress.emailAddress,
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Registration response:", data);
                            if (data.success) {
                                router.push("/register")
                                setHasRegistered(true);
                            }
                        })
                        .catch((err) => console.error("Failed to register:", err));
                }
            }

        }

    }, [isSignedIn, user, isLoaded, hasRegistered]);



    return (
        <>
            {/* Login and registration buttons for those who are not logged in*/}
            <SignedOut>
                <SignUpButton mode="modal" appearance={clerkAppearance}>
                    <Button variant="callToAction">Sign up</Button>
                </SignUpButton>
                <SignInButton  mode="modal" appearance={clerkAppearance}>
                    <Button variant="secondary">Sign in</Button>
                </SignInButton>
            </SignedOut>

            {/* Profile button for those who are logged in */}
            <SignedIn>
                <UserButton />
                {/* To edit and see personal details*/}
                <Button variant="secondary"
                    onClick={() => router.push("/profile")}>
                    My Details
                </Button>
            </SignedIn>
        </>
    );
}
