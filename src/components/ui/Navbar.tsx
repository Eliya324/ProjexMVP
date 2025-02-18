import Link from 'next/link'
import Logo from "@/components/ui/Logo"
import MainNav from './Main-nav'
import MobileNav from './Mobile-nav'

export default function Navbar() {
    return (
        <header className="sticky top-0 w-full border-b bg-white">
            <div className="h-16 container flex items-center justify-between">

                {/* Logo */}
                <h1 className="flex items-center justify-start flex-1">
                    <Link href='/'> <Logo /></Link>
                </h1>

                {/* Desktop navigation */}
                <MainNav />

                {/* Mobile navigation */}
                <MobileNav />
            </div>
        </header>
    );
}
