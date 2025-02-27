import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
export default function Home() {
  return (
    <div>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ProjectCard />
        <UserCard />
      </div>
    </div>
  );
}
