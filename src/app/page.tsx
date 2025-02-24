import ProjectCard from "@/components/ui/ProjectCard";
import UserCard from "@/components/ui/UserCard";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
export default function Home() {
  return (
    <div>

      <UserCard></UserCard>
      <ProjectCard></ProjectCard>
      <h1>Projex MVP</h1>
    </div>
  );
}
