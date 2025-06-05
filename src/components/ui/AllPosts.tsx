"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, CirclePlay } from "lucide-react";
import PostCard from "./PostCard";
import AddPosts from "./addPosts";
import { useUser } from "@clerk/nextjs";

export type Post = {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  projectTitle: string;
  author: {
    fullName: string;
    profilePicture: string;
  };
};

export default function AllPostsPage({ projectId }: { projectId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { user } = useUser();

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format");

      setPosts(reorderPosts(data));
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPosts();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const reorderPosts = (originalPosts: Post[]) => {
    const selectedId = localStorage.getItem("selectedPostId");
    if (!selectedId) return originalPosts;

    const selectedIndex = originalPosts.findIndex((p) => p.id === selectedId);
    if (selectedIndex === -1) return originalPosts;

    const selectedPost = originalPosts[selectedIndex];
    const otherPosts = [...originalPosts];
    otherPosts.splice(selectedIndex, 1);
    localStorage.removeItem("selectedPostId");

    return [selectedPost, ...otherPosts];
  };

  useEffect(() => {
    document.body.style.overflow = isPostModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPostModalOpen]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24">
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-all duration-300" />
      )}

      <div
        className={`max-w-4xl w-full mx-auto space-y-4 z-30 transition-all duration-300 ${
          isPostModalOpen ? "pointer-events-none blur-sm brightness-75" : ""
        }`}
      >
        {/* עטיפה כוללת לתמונה+כפתור ולאייקונים */}
        <div className="max-sm:pl-16 sm:pl-2 sm:w-[550px] md:w-[650px] xl:w-[750px] mx-auto space-y-2">
          {/* שורה עם תמונת פרופיל וכפתור */}
          <div className="flex items-center space-x-4">
            <Image
              src={user?.imageUrl || "/default-user.png"}
              alt={user?.fullName || "User"}
              width={48}
              height={48}
              className="rounded-full border-4 border-violet-950/75 shadow"
              loading="lazy"
              sizes="48px"
            />

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="w-[350px] sm:w-[400px] md:w-[450px] lg:w-[550px] h-10 px-9 bg-white rounded-full outline outline-[3px] outline-offset-[-3px] outline-zinc-500 flex items-center cursor-pointer"
            >
              <span className="text-black text-xl font-normal font-['Lato']">
                Start a post
              </span>
            </button>
          </div>

          {/* שורה עם כפתורי אייקון */}
          <div className="flex items-center space-x-10">
            <button className="flex items-center space-x-2">
              <CirclePlay className="w-4 h-4" />
              <span className="text-sm font-bold">Video</span>
            </button>
            <button className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span className="text-sm font-bold">Photo</span>
            </button>
          </div>
        </div>

        <div className="w-full h-[3px] bg-black/30 my-6" />

        {/* תוכן הפוסטים */}
        {loading ? (
          <p className="text-center text-xl text-gray-500 mt-10">
            Loading posts...
          </p>
        ) : error ? (
          <p className="text-center text-xl text-red-500 mt-10">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-xl text-gray-500 mt-10">
            No posts yet
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="max-sm:w-[500px] sm:w-[550px] md:w-[650px] xl:w-[750px] mx-auto"
            >
              <PostCard post={post} isCompact={false} />
            </div>
          ))
        )}
      </div>

      {/* מודל פתיחת פוסט */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-32">
          <AddPosts
            onClose={() => {
              fetchPosts();
              setIsPostModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
