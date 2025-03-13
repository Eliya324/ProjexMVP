import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";

const developers = [
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "Data Scientist",
  "AI Engineer",
  "Game Developer",
  "DevOps Engineer",
  "Cybersecurity Expert",
  "Embedded Systems Engineer",
  "UI/UX Developer ",
  "Cloud Engineer",
  "IoT Developer",
  "Systems Programmer",
  "Test Automation Engineer",
];
const projects = Array.from({ length: 6 }).map((_, index) => ({
  id: index,
  name: `Project ${index + 1}`,
  techStack: ["React", "Node.js", "Figma", "Tailwind", "SQL", "C#"].slice(
    0,
    Math.floor(Math.random() * 4) + 3
  ),
  profiles: Array(3).fill("https://placehold.co/64x62.png"),
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  starCount: 5,
  image: `https://placehold.co/270x150?text=Project+${index + 1}`,
  description: `This is a description for Project ${
    index + 1
  }. A cutting-edge solution for modern needs.`,
}));

const users = Array.from({ length: 6 }).map((_, index) => ({
  id: index,
  name: `User ${index + 1}`,
  imageUrl: "https://placehold.co/70x70.png",
  location: "Israel",
  language: "Hebrew",
  jobTitle: "Full Stack Developer",
  description: "Looking for strategic partnerships and innovative projects.",
  skills: ["React", "Node.js", "C#", "Python"],
  experience: "5+ Years",
}));

export default function HomePage() {
  return (
    <div className="mt-[700px] flex flex-col items-center w-full relative px-4 sm:px-0">
      {/* Banner */}
      <div className="relative w-full max-w-[1300px] h-[200px] sm:h-[200px] md:h-[350px] rounded-[20px]  overflow-hidden bg-gray-300 flex items-center justify-center">
        <Image
          src="https://placehold.co/1300x350"
          alt="Homepage Banner"
          width={1300}
          height={350}
          className="rounded-[20px] object-cover w-full h-full overflow-hidden"
        />
        <div className="absolute top-[10%] left-[5%] w-[90%] sm:w-[10%] md:w-[1150px] text-white text-left">
          <h1 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold leading-tight">
            Connecting <span className="text-[#0ccb40]">Talent</span> to
            <span className="text-[#e77509]"> opportunity</span>
          </h1>
          <h2 className="text-[18px] sm:text-[24px] md:text-[32px] font-bold leading-tight">
            Connect, <span className="text-[#2ea3f2]">create</span>, and
            <span className="text-[#0ccb40]"> collaborate</span>
          </h2>
          <p className="text-[14px] sm:text-[18px] md:text-[20px] font-light mt-2">
            Find the missing piece—whether it's the talent you need or the
            project that needs you.
          </p>
        </div>
        {/* Search Field */}
        <div className="absolute bottom-[5%] sm:bottom-[10%] left-1/2 transform -translate-x-1/2 w-[70%] sm:w-[500px] h-[50px]">
          <SearchBar />
        </div>
      </div>
      {/* Developer Types Row */}
      <div className="w-full max-w-[1300px] mx-auto mt-4 relative">
        <Carousel className="w-full">
          <CarouselContent className="flex overflow-x-auto md:overflow-visible scrollbar-hide md:scrollbar-default">
            {developers.map((role, index) => (
              <CarouselItem
                key={index}
                className="basis-1/8 sm:basis-1/8 xs:basis-1/7 "
              >
                <div className="p-1 flex justify-center">
                  <div
                    className="shadow-md rounded-lg bg-white flex items-center justify-center 
              w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] text-center"
                  >
                    <span className="text-[10px] sm:text-xs font-semibold px-1">
                      {role}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      {/* All Projects */}
      <div className="w-full md:w-[1300px] mt-4 text-left">
        <h2 className="text-[28px] md:text-[35px] font-bold text-[#000080] font-lato">
          All Projects
        </h2>
      </div>
      {/* Projects Carousel */}
      <div className="w-full max-w-[1300px] mx-auto mt-4 relative">
        <Carousel className="w-full">
          <CarouselContent className="flex overflow-x-auto md:overflow-visible scrollbar-hide md:scrollbar-default">
            {projects.map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <div className="p-1">
                  <ProjectCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      {/* All Talents */}
      <div className="w-full md:w-[1300px] mt-8 text-left">
        <h2 className="text-[28px] md:text-[35px] font-bold text-[#000080] font-lato">
          All Talents
        </h2>
      </div>
      {/* Talents Carousel */}
      <div className="w-full max-w-[1300px] mx-auto mt-4 relative">
        <Carousel className="w-full">
          <CarouselContent className="flex overflow-x-auto md:overflow-visible scrollbar-hide md:scrollbar-default gap-4">
            {users.map((user) => (
              <CarouselItem
                key={user.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <div className="p-1">
                  <UserCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
