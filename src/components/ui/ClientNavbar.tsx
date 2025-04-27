"use client"; 

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
 //Not show the navbar in register pages
  if (pathname === "/register") {
    return null; 
  }

  return <Navbar />;
}
