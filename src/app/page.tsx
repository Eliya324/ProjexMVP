import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import Image from "next/image";
//import { Button } from "@/components/ui/Button";
import HomePage from "@/components/ui/HomePage";
export default function Home() {
  return (
    <div>
      <div className=" flex justify-center min-h-screen bg-gray-100">
        {" "}
        {/* <ProjectCard />
        <UserCard /> */}
        <HomePage />
      </div>
    </div>
  );
}



