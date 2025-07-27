import Link from "next/link";
import AuthButtons from "./AuthButtons";
import NavigationList from "./NavigationList";
import { SignedIn } from "@clerk/nextjs";

interface MainNavProps {
  links: { href: string; label: string }[];
  pathname: string;
}

export default function MainNav({ links, pathname }: MainNavProps) {
  return (
    <div className="hidden md:flex items-center gap-4 lg:gap-3 xl:gap-5 text-sm xl:text-md 2xl:text-lg ">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-md font-lato ${
            pathname === link.href
              ? "text-violet-950 font-semibold scale-105"
              : "text-zinc-500"
          }`}
        >
          {link.label}
        </Link>
      ))}

      {/* Show icons only to logged in users*/}
      <SignedIn>
        <NavigationList variant="desktop" pathname={pathname} />
      </SignedIn>

      <AuthButtons />
    </div>
  );
}
