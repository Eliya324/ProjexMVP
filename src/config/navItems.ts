import { Bell, Users, FileEdit, Briefcase, IdCard } from "lucide-react";

export const navItems = [
  { href: "/myProjects", label: "My Projects", icon: Briefcase },
  { href: "/profile", label: "My Details", icon: IdCard },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/network", label: "My Network", icon: Users },
  { href: "/posts", label: "Posts", icon: FileEdit },
];
