"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./Button";

export default function AuthButtons() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      user?.primaryEmailAddress?.emailAddress &&
      !hasRegistered
    ) {
      //Check if the user Register After Clerck-Create in DB
      const userCreationTime = user.createdAt
        ? new Date(Number(user.createdAt))
        : null;
      if (userCreationTime) {
        const now = new Date();
        const timeDiff = (now.getTime() - userCreationTime.getTime()) / 1000;
        if (timeDiff < 30) {
          fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username:
                user.username ||
                (user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.firstName),
              email: user.primaryEmailAddress.emailAddress,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Registration response:", data);
              if (data.success) {
                router.push("/register");
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
      {/* <SignedOut>
                <SignUpButton />
                <SignInButton />
            </SignedOut> */}
      <SignedOut>
        <div className="flex items-center gap-2">
          <Link href="/about">
            <button className="max-sm:text-xs md:text-sm px-4 py-1 -mr-6">
              About
            </button>
          </Link>

          {/* Sign in ראשון */}
          <SignInButton mode="modal">
            <button className="max-sm:text-xs md:text-sm px-4 py-1 -mr-1">
              Sign in
            </button>
          </SignInButton>

          {/* Sign up בסוף, הכי שמאלי */}
          <SignUpButton mode="modal">
            <button className=" font-bold border border-black px-2 py-1 rounded max-sm:text-xs md:text-sm mr-3">
              Sign up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      {/* Profile button for those who are logged in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
