import Link from "next/link";
import { Bell, Users, FileEdit, Briefcase, IdCard } from "lucide-react";
import AuthButtons from "./AuthButtons";
import IconWithTooltip from "./IconWithTooltip";

type LinkItem = {
  href: string;
  label: string;
};

interface MainNavProps {
  links: LinkItem[];
  user: any;
  isSignedIn: boolean;
  pathname: string;
}
export default function MainNav({
  links,
  user,
  isSignedIn,
  pathname,
}: MainNavProps) {
  return (
    <div className="hidden md:flex items-center gap-4 lg:gap-3 xl:gap-5 text-sm xl:text-md 2xl:text-lg ">
      {/* Create a Project (אם מחובר) */}
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-md font-lato    ${
            pathname === link.href
              ? "text-violet-950 font-semibold scale-105"
              : "text-zinc-500"
          }`}
        >
          {link.label}
        </Link>
      ))}

      {/* Icons + Profile*/}
      {isSignedIn ? (
        <>
          <IconWithTooltip
            icon={Bell}
            label="Notifications"
            className="w-5 h-5 text-gray-500"
          />
          <IconWithTooltip
            icon={Users}
            label="My Network"
            className="w-5 h-5 text-gray-500"
          />
          <IconWithTooltip
            icon={FileEdit}
            label="Posts"
            className="w-5 h-5 text-gray-500"
          />

          <Link href="/myProjects">
            <IconWithTooltip
              icon={Briefcase}
              label="My Projects"
              className={`w-5 h-5 transition duration-150 ${
                pathname === "/myProjects"
                  ? "text-violet-950 scale-110"
                  : "text-gray-500"
              }`}
            />
          </Link>

          <Link href="/profile">
            <IconWithTooltip
              icon={IdCard}
              label="My Details"
              className={`w-6 h-6 transition duration-150 ${
                pathname === "/profile"
                  ? "text-violet-950 scale-110"
                  : "text-gray-500"
              }`}
            />
          </Link>
          <AuthButtons />
        </>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
