import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function AuthButtons() {
    return (
        <>
            {/* Login and registration buttons for those who are not logged in*/}
            <SignedOut>
                <SignUpButton />
                <SignInButton />
            </SignedOut>

            {/* Profile button for those who are logged in */}
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
}
