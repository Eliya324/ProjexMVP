import Link from 'next/link'

export default function MainNav() {
    return <div className="hidden md:flex items-center">
        <nav className='flex items-center gap-3 lg:gap-4 ml-8'>
            <Link href='About'>About</Link>
            <Link href='Sign Up'>Sign Up</Link>
            <Link href='Login'>Login</Link>
        </nav>
    </div>
}