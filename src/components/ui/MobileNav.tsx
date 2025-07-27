import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import NavigationList from "./NavigationList";

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
            <SignedIn>
              <AuthButtons />

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className="flex items-center gap-2"
                >
                  <span>{link.label}</span>
                </Link>
              ))}

              <NavigationList variant="mobile" onLinkClick={handleClose} />
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-2 w-full">
                <SignUpButton mode="modal">
                  <button className="w-full px-4 py-2 border border-black rounded text-center mt-6">
                    Sign up
                  </button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 hover:bg-gray-100 rounded text-center">
                    Sign in
                  </button>
                </SignInButton>

                <Link
                  href="/about"
                  onClick={handleClose}
                  className="w-full text-center"
                >
                  About
                </Link>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
