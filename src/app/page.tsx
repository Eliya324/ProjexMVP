import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import TalentProfile from "@/components/ui/TalentProfile";import Image from "next/image";
import HomePage from "@/components/ui/HomePage";
export default function Home() {
  return (
    <div>
      <TalentProfile/>
      <div className=" flex justify-center min-h-screen bg-gray-100">

        {" "}
        {/* <ProjectCard />
        <UserCard /> */}
        <HomePage />
      </div>
    </div>
  );
}

