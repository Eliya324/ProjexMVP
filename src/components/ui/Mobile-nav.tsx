import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/Sheet"
import { AlignJustify } from "lucide-react"
import Link from 'next/link'
export default function MobileNav() {
    return <div className="md:hidden">
        <Sheet>
            <SheetTrigger>
                <AlignJustify />
            </SheetTrigger>
            <SheetContent side='right'>
                <nav className='flex flex-col items-center gap-3 lg:gap-4 mt-6'>
                    <Link href='About'>About</Link>
                    <Link href='Sign Up'>Sign Up</Link>
                    <Link href='Login'>Login</Link>
                </nav>
            </SheetContent>
        </Sheet>
    </div>
}