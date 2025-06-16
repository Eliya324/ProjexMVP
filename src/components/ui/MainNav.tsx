import Link from 'next/link';
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import AuthButtons from './AuthButtons';

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type NavLink = {
    href: string;
    label: string;
    variant?: ButtonVariant;
};

export default function MainNav({ links }: { links: NavLink[] }) {
    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-8 text-md">
            {links.map((link) => (
                <Button key={link.href} variant={link.variant ?? "link"} asChild>
                    <Link href={link.href}>
                        {link.label}
                    </Link>
                </Button>
            ))}
            <AuthButtons />
        </div>
    );
}
