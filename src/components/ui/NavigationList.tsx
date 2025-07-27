import Link from "next/link";
import { navItems } from "@/config/navItems";
import IconWithTooltip from "./IconWithTooltip";

type Props = {
  variant: "mobile" | "desktop";
  pathname?: string;
  onLinkClick?: () => void;
};

export default function NavigationList({
  variant,
  pathname,
  onLinkClick,
}: Props) {
  return (
    <>
      {navItems.map((item) =>
        variant === "mobile" ? (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className="flex items-center gap-2"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span>{item.label}</span>
          </Link>
        ) : (
          <Link key={item.href} href={item.href}>
            <IconWithTooltip
              icon={item.icon}
              label={item.label}
              className={`w-5 h-5 transition duration-150 ${
                pathname === item.href
                  ? "text-violet-950 scale-110"
                  : "text-gray-500"
              }`}
            />
          </Link>
        )
      )}
    </>
  );
}
