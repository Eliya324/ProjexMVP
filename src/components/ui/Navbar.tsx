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
        {/* לוגו */}
        <div className="flex-shrink-0">
          <Link href="/">
            {" "}
            <Logo />
          </Link>
        </div>

        {/* חיפוש - יוצג רק אם זה לא דף הבית */}
        {pathname !== "/" && <SearchBar />}

        {/* תפריט שולחני */}
        <MainNav />

        {/* תפריט מובייל */}
        <MobileNav />
      </nav>
    </header>
  );
}
