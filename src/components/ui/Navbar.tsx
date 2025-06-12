"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Bell, Users, FileEdit, Briefcase } from "lucide-react";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const links = [
    ...(isSignedIn
      ? [{ href: "/projects/new", label: "Create a Project" }]
      : []),
  ];

  return (
    <header className="fixed top-0 w-full h-20 bg-white border-b shadow-md z-50">
      <nav className="h-full max-w-[1512px] mx-auto px-4 flex items-center justify-between relative">
        {/* Left side - logo + search bar in md  */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-violet-950  md:text-xl lg:text-2xl font-bold font-lato"
          >
            ProjexMVP
          </Link>

          {/* Search bar - only in md  */}
          {pathname !== "/" && (
            <div className="hidden md:flex lg:hidden md:w-[37vw] ">
              <SearchBar />
            </div>
          )}
        </div>

        {pathname !== "/" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden lg:block">
            <div className="w-[50vw] sm:w-[60vw] lg:w-[37vw]">
              <SearchBar />
            </div>
          </div>
        )}
        {/* Right side - links, icons, profile*/}
        <MainNav
          links={links}
          user={user}
          isSignedIn={isSignedIn ?? false}
          pathname={pathname}
        />
        {/* Mobile menu*/}

        <MobileNav links={links} />
      </nav>
    </header>
  );
}
