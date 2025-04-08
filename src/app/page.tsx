import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import NewProject from "@/components/ui/NewProject";
export default function Home() {
  return (
    <div>

      <div className="flex justify-center min-h-screen bg-gray-100">
        <ProjectCard />
        {/* <UserCard /> */}
        {/* <NewProject /> */}
      </div>
    </div>
  );
}
