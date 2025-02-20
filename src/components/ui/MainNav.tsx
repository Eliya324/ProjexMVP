import Link from 'next/link';

export default function MainNav() {
    const links = [
        { href: "/about", label: "About" },
        { href: "/signup", label: "Sign Up" },
        { href: "/login", label: "Login" }
    ];

    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-8">
            {links.map((link) => (
                <Link key={link.href} href={link.href}>
                    {link.label}
                </Link>
            ))}
        </div>

    );
}
