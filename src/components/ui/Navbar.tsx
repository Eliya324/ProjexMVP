"use client"
import Link from 'next/link'
import Logo from "@/components/ui/Logo"
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar';
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
    const { isSignedIn } = useUser();
    const links = [
        { href: "/about", label: "About" },
        ...(isSignedIn ? [
            { href: "/projects/new", label: "Create a Project" }
        ] : [])
    ];

    return (
        <header className="sticky top-0 w-full border-b bg-white">
            <nav className="h-20 container flex items-center justify-between mx-0 px-4">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href='/'> <Logo /></Link>
                </div>

                {/* Search bar */}
                <SearchBar />

                {/* Desktop navigation */}
                <MainNav links={links} />

                {/* Mobile navigation */}
                <MobileNav links={links} />

            </nav>
        </header>
    );
}
