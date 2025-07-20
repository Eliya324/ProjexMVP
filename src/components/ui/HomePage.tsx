"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
import PostCard from "./PostCard";
import FeedbackPopup from "@/components/ui/FeedbackPopup";
import { useUser } from "@clerk/nextjs";
import { date } from "zod";

type Post = {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  comments: number;
  projectTitle: string;
  author: {
    fullName: string;
    profilePicture: string;
  };
};

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
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "Data Scientist",
];
const projects = Array.from({ length: 6 }).map((_, index) => ({
  id: index,
  name: `Project ${index + 1}`,
  techStack: ["React", "Node.js", "Figma", "Tailwind", "SQL", "C#"].slice(
    0,
    Math.floor(Math.random() * 4) + 3
  ),
  profiles: Array.from(
    { length: 3 },
    (_, i) => `https://placehold.co/64x62.png?${i}`
  ),
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser()
  const [showPopup, setShowPopup] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState<string>("");
  const [questionType, setQuestionType] = useState<"rating" | "binary">("rating");
  useEffect(() => {
    const checkIfAnswered = async () => {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").map(e => e.trim()) ?? [];
      const isAdmin = !!userEmail && adminEmails.includes(userEmail);
      if (isLoaded && user && questionId && !isAdmin) {
        const res = await fetch(`/api/feedback/answered?questionId=${questionId}`);
        const data = await res.json();
        if (!data.answered) {
          setShowPopup(true);
        }
      }
    };
    checkIfAnswered();
  }, [isLoaded, user, questionId]);

  useEffect(() => {
    const fetchLatestQuestion = async () => {
      try {
        const res = await fetch("/api/feedback/latestQuestion");
        if (!res.ok) return;
        const data = await res.json();
        setQuestionId(data.id);
        setQuestionText(data.question);
        setQuestionType(data.type.toLowerCase() as "rating" | "binary");
      } catch (err) {
        console.error("❌ Failed to fetch latest question:", err);
      }
    };
    fetchLatestQuestion();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("❌ Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div
      className={cn(
        "h-full pt-24 flex flex-col overflow-y-auto border border-red items-center w-full relative px-4 sm:px-0"
      )}
    >
      <>
        {showPopup && questionId && (
          <FeedbackPopup
            type={questionType}
            question={questionText}
            questionId={questionId}
            onClose={() => setShowPopup(false)}
          />
        )}
      </>
      {/* Banner */}
      <div
        className={cn(
          "relative w-[95%] max-sm:h-[180px] sm:h-[200px] md:h-[250px] lg:h-[280px] xl:h-[300px] 2xl:h-[320px] rounded-[20px] overflow-hidden border border-red-300 flex items-center justify-center"
        )}
      >
        <Image
          src="https://placehold.co/1300x350"
          alt="Homepage Banner"
          width={1300}
          height={350}
          className={cn("rounded-[20px] object-cover w-full h-full")}
        />
        <div
          className={cn(
            "absolute top-[15%] sm:top-[5%] left-[5%] w-[90%] sm:w-[80%] text-white text-left"
          )}
        >
          <h1
            className={cn(
              "text-[20px] sm:text-[24px] md:text-[28px] 2xl:text-[32px] font-bold leading-tight"
            )}
          >
            Connecting <span className={cn("text-[#0ccb40]")}>Talent</span> to
            <span className={cn("text-[#e77509]")}> opportunity</span>
          </h1>
          <h2
            className={cn(
              "text-[16px] sm:text-[20px] md:text-[24px] 2xl:text-[28px] font-bold leading-tight"
            )}
          >
            Connect, <span className={cn("text-[#2ea3f2]")}>create</span>, and
            <span className={cn("text-[#0ccb40]")}> collaborate</span>
          </h2>
          <p
            className={cn(
              "text-[12px] sm:text-[18px] md:text-[18px] xl:text-[25px] font-light mt-2 break-words whitespace-normal"
            )}
          >
            Find the missing piece—whether it's the talent you need or the
            project that needs you.
          </p>
        </div>
        {/* Search Field */}
        <div
          className={cn(
            "absolute bottom-[5%] sm:bottom-[10%] md:bottom-[3%] left-1/2 transform -translate-x-1/2 w-[70%] sm:w-[500px] h-[50px]"
          )}
        >
          <SearchBar />
        </div>
      </div>
      {/* {/* Developer Types Row */}
      <div className=" max-sm:w-[95%] sm:w-[90%] sm:w-[90%] mx-auto mt-3 relative">
        <Carousel className="w-full">
          <CarouselContent className="flex overflow-x-auto sm:overflow-visible scrollbar-hide sm:scrollbar-default">
            {developers.map((role, index) => (
              <CarouselItem
                key={index}
                className="basis-1/8 sm:basis-1/8 xs:basis-1/7 "
              >
                <div className="p-1 flex justify-center">
                  <div
                    className={cn(
                      "shadow-md rounded-lg border border-white flex items-center justify-center w-[65px] h-[65px] sm:w-[72px] sm:h-[72px] xl:w-[85px] xl:h-[85px] text-center"
                    )}
                  >
                    <span className="text-[10px] sm:text-xs font-semibold px-1">
                      {role}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className={cn(
              "hidden sm:flex justify-between absolute top-1/2 left-0 right-0 mx-auto sm:w-[95%] max-w-[90%] -translate-y-1/2"
            )}
          >
            <CarouselPrevious className="absolute left-0  sm:-left-12 md:-left-14 lg:-left-20 xl:-left-20 2xl:-left-24" />
            <CarouselNext className="absolute right-0 sm:-right-12 md:-right-19 lg:-right-20 xl:-right-20 2xl:-right-24" />
          </div>
        </Carousel>
      </div>
      {/* {/* All Projects */}
      <div className="relative w-[95%] max-w-[1300px] mt-2 text-left">
        <h2 className="text-[24px] md:text-[35px] font-bold text-[#000080] font-lato">
          All Projects
        </h2>
      </div>
      {/* Projects Carousel */}
      <div className="relative w-[95%] sm:w-[95%]  max-w-[1300px]  mx-auto mt-2">
        <Carousel className="relative w-full">
          <CarouselContent
            className={cn(
              "flex max-sm:flex-col max-sm:items-center max-sm:h-full max-sm:overflow-y-auto max-sm:items-center max-sm:h-full sm:h-[400px] max-sm:h-[1400px] sm:flex-row sm:overflow-visible scrollbar-hide sm:scrollbar-default"
            )}
          >
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-[90%] max-sm:basis-1/5 sm:basis-[50%] md:basis-[39%] 
                  lg:basis-[30%] xl:basis-1/4 flex justify-center items-center"
              >
                <div className="p-1 w-full flex justify-center">
                  <ProjectCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-between absolute top-1/2 w-full -translate-y-1/2">
            <div className="hidden sm:flex justify-between absolute top-1/2 left-0 right-0 mx-auto md:w-[90%] max-w-[95%] -translate-y-1/2">
              <CarouselPrevious className="absolute left-0 sm:-left-6 md:-left-14 lg:-left-16 xl:-left-20 2xl:-left-24" />
              <CarouselNext className="absolute right-0 sm:-right-6 md:-right-14 lg:-right-16 xl:-right-20 2xl:-right-24" />
            </div>
          </div>
          {/* Bottom arrow (only for small screens) */}
          <div className="absolute bottom-[-15px] max-sm:left-[41%]  -translate-x-1/2 sm:hidden">
            <CarouselNext className="rotate-90 w-10 h-10" />
          </div>
        </Carousel>
      </div>
      {/* All Talents */}
      <div className="relative w-[95%] max-w-[1300px] mt-6 text-left">
        <h2 className="text-[24px] md:text-[35px] font-bold text-[#000080] font-lato">
          All Talents
        </h2>
      </div>
      {/* Talents Carousel */}
      <div className="relative w-[95%]  max-w-[1300px] mx-auto mt-2">
        <Carousel className="relative w-full">
          <CarouselContent className="flex  max-sm:flex-col  max-sm:overflow-y-auto  sm:h-[230px] max-sm:h-[500px]  sm:flex-row sm:overflow-visible scrollbar-hide sm:scrollbar-default">
            {users.map((user, index) => (
              <CarouselItem
                key={user.id}
                className="basis-[90%]  max-sm:basis-1/3 sm:basis-[50%] md:basis-[41%] lg:basis-[31.5%] xl:basis-1/4 flex justify-center items-center"
              >
                <div className="p-1">
                  <UserCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className={cn(
              "hidden sm:flex justify-between absolute top-1/2 left-0 right-0 mx-auto md:w-[90%] max-w-[95%] -translate-y-1/2"
            )}
          >
            <CarouselPrevious className="absolute left-0 sm:-left-7 md:-left-14 lg:-left-16 xl:-left-20 2xl:-left-24" />
            <CarouselNext className="absolute right-0 sm:-right-7 md:-right-14 lg:-right-16 xl:-right-20 2xl:-right-24" />
          </div>
          {/* Bottom arrow (only for small screens) */}
          <div className="absolute bottom-[-15px] max-sm:left-[41%]  -translate-x-1/2 sm:hidden">
            <CarouselNext className="rotate-90 w-10 h-10" />
          </div>
        </Carousel>
      </div>
      {/* All Posts */}
      <div className="relative w-[95%] max-w-[1300px] mt-6 text-left">
        <h2 className="text-[24px] md:text-[35px] font-bold text-[#000080] font-lato">
          All Posts
        </h2>
      </div>

      <div className="relative w-[95%] max-w-[1300px] mx-auto mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Carousel className="relative w-full">
            <CarouselContent className=" flex max-sm:flex-col max-sm:items-center max-sm:h-full sm:flex-row sm:overflow-visible scrollbar-hide sm:scrollbar-default">
              {posts.length > 0 && posts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="basis-[100%] max-sm:w-[100%] sm:basis-[50%] md:basis-[39%] lg:basis-[30%] xl:basis-1/4 flex justify-center items-center"
                >
                  <div className="max-sm:w-[100%] p-1 w-full flex justify-center ">
                    <PostCard post={post} isCompact={true} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Bottom arrow (only for small screens) */}
            {posts.length >= 3 && (
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 max-sm:block hidden">
                <CarouselNext className="rotate-90 w-10 h-10" />
              </div>
            )}

            <div className="hidden sm:flex justify-between absolute top-1/2 left-0 right-0 mx-auto md:w-[90%] max-w-[95%] -translate-y-1/2">
              <CarouselPrevious className="absolute left-0 sm:-left-7 md:-left-14 lg:-left-16 xl:-left-20 2xl:-left-24" />
              <CarouselNext className="absolute right-0 sm:-right-7 md:-right-14 lg:-right-16 xl:-right-20 2xl:-right-24" />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
}
