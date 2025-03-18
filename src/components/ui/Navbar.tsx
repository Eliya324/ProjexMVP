import Link from 'next/link'
import Logo from "@/components/ui/Logo"
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <header className="sticky top-1 w-full border-b bg-white">
            <nav className="h-20 container flex items-center justify-between mx-0 px-4">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href='/'> <Logo /></Link>
                </div>

                {/* Search bar */}
                <SearchBar />

                {/* Desktop navigation */}
                <MainNav />

                {/* Mobile navigation */}
                <MobileNav />
            </nav>
        </header>
    );
}
