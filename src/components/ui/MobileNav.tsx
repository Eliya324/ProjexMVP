import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/Sheet"
import { AlignJustify } from "lucide-react"
import Link from 'next/link'
export default function MobileNav() {
    const links = [
        { href: "/about", label: "About" },
        { href: "/signup", label: "Sign Up" },
        { href: "/login", label: "Login" }
    ];
    return <div className="md:hidden">
        <Sheet>
            <SheetTrigger>
                <AlignJustify />
            </SheetTrigger>
            <SheetContent side='right'>
            <div className='flex flex-col items-center justify-center gap-3 lg:gap-4'>
            {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    </div>
}