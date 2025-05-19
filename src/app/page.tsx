import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import Image from "next/image";
import HomePage from "@/components/ui/HomePage";
// import AllPostsPage from "@/components/ui/All posts";
import AllPosts from "./posts/page";
export default function Home() {
 
  
  return (
    <div>
      <div className=" flex justify-center min-h-screen bg-gray-100">
        {" "}
        {/* <ProjectCard />
        <UserCard /> */}
        {/* <AllPostsPage /> */}
        <HomePage />

      </div>
    </div>
  );
}

