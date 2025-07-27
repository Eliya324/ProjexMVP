"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./Button";

// External function for user registration
async function registerUser(
  user: any,
  router: any,
  setHasRegistered: () => void
) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:
          user.username ||
          (user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.firstName),
        email: user.primaryEmailAddress?.emailAddress,
      }),
    });

    const data = await response.json();
    console.log("Registration response:", data);

    if (data.success) {
      router.push("/register");
    }
  } catch (err) {
    console.error("Failed to register:", err);
  } finally {
    // עדכון הדגל תמיד – גם אם יש שגיאה
    setHasRegistered();
  }
}

export default function AuthButtons() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const hasRegisteredRef = useRef(false); // דגל פנימי שאינו תלוי ברינדור

  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      user?.primaryEmailAddress?.emailAddress &&
      !hasRegisteredRef.current
    ) {
      const userCreationTime = user.createdAt
        ? new Date(Number(user.createdAt))
        : null;

      if (userCreationTime) {
        const now = new Date();
        const timeDiff = (now.getTime() - userCreationTime.getTime()) / 1000;

        if (timeDiff < 60) {
          registerUser(user, router, () => {
            hasRegisteredRef.current = true;
          });
        }
      }
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <Link href="/about">
            <Button className="max-sm:text-xs md:text-sm px-4 py-1 ml-[-10px]">
              {/* <Button className="max-sm:text-xs md:text-sm px-4 py-1 -mr-4"> */}
              About
            </Button>
          </Link>

          <SignInButton mode="modal">
            <Button className="max-sm:text-xs md:text-sm px-4 py-1 -mr-1">
              Sign in
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="font-bold border border-black px-2 py-1 rounded max-sm:text-xs md:text-sm mr-3">
              Sign up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
