import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function MainNav({ links }: { links: { href: string; label: string }[] }) {

    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-8 text-md">
            {links.map((link) => (
                <Link key={link.href} href={link.href}>
                    {link.label}
                </Link>
            ))}
            <AuthButtons />
        </div>

    );
}
