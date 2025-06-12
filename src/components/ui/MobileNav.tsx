import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import {
  AlignJustify,
  Bell,
  Users,
  FileEdit,
  Briefcase,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col items-start justify-center gap-3 lg:gap-4">
            {/* For logged in users*/}
            <SignedIn>
              <AuthButtons />

              <Link
                href="/projects/new"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <span>Create a Project</span>
              </Link>

              <Link
                href="/profile"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <IdCard className="w-5 h-5 text-gray-600" />
                <span>My Details</span>
              </Link>

              <Link
                href="/notifications"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-gray-600" />
                <span>Notifications</span>
              </Link>

              <Link
                href="/network"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-gray-600" />
                <span>My Network</span>
              </Link>

              <Link
                href="/posts"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <FileEdit className="w-4 h-4 text-gray-600" />
                <span>Posts</span>
              </Link>

              <Link
                href="/myProjects"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span>My Projects</span>
              </Link>
            </SignedIn>

            {/* For users not logged in*/}
            <SignedOut>
              <div className="flex flex-col gap-2 w-full">
                {/* Sign up */}
                <SignUpButton mode="modal">
                  <button className="w-full px-4 py-2 border border-black rounded text-center mt-6">
                    Sign up
                  </button>
                </SignUpButton>
                {/* Sign in */}
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 hover:bg-gray-100 rounded text-center">
                    Sign in
                  </button>
                </SignInButton>
                {/* About */}
                <Link href="/about  onClick={handleClose}">
                  <button className="w-full px-4 py-2 hover:bg-gray-100 rounded text-center">
                    About
                  </button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
