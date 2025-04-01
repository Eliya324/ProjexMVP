"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full h-16 border-b bg-white z-[100] shadow-md">
      <nav className="h-full container flex items-center justify-between mx-0 px-4">
        {/* Logo*/}
        <div className="flex-shrink-0">
          <Link href="/">
            {" "}
            <Logo />
          </Link>
        </div>

        {/* Search - will be displayed only if it's not the home page */}
        {pathname !== "/" && <SearchBar />}

        {/* Desktop menu */}
        <MainNav />

        {/* Mobile menu */}
        <MobileNav />
      </nav>
    </header>
  );
}
