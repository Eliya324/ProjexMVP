import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import TalentProfile from "@/components/ui/TalentProfile";import Image from "next/image";
import HomePage from "@/components/ui/HomePage";
import PostCard from "@/components/ui/PostCard";
export default function Home() {
  return (
    <div>
      <div className=" flex justify-center items-start min-h-screen bg-gray-100">
        {/* <PostCard post={examplePost}  /> */}

        <HomePage />
        
      </div>
    </div>
  );
}
