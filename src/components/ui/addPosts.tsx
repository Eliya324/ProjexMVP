"use client";

import React, { useState, useRef, useEffect } from "react";
import { Image, CirclePlay, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";

type AddPostsProps = {
  onClose: () => void;
};

type Project = {
  id: string;
  title: string;
};

export default function AddPost({ onClose }: AddPostsProps) {
  const [postContent, setPostContent] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchOwnedProjects() {
      try {
        const res = await fetch("/api/projects?type=owned");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching owned projects", err);
      }
    }

    fetchOwnedProjects();
  }, []);

  const handlePostSubmit = async () => {
    if (!postContent.trim() || !selectedProjectId) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postContent,
          image: null,
          projectId: selectedProjectId,
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setPostContent("");
      onClose();
    } catch (err) {
      console.error("❌ Error posting:", err);
    }
  };

  useEffect(() => {
    if (isInputActive && textareaRef.current && selectedProjectId) {
      textareaRef.current.focus();
    }
  }, [isInputActive, selectedProjectId]);

  const handleEmojiClick = (emojiData: any) => {
    if (!selectedProjectId) return;

    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText =
      postContent.substring(0, start) + emoji + postContent.substring(end);

    setPostContent(newText);
    setShowEmojiPicker(false);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      textarea.focus();
    }, 0);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected image:", file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="max-sm:w-[480px] sm:w-[600px] md:w-[700px]  lg:w-[750px] h-[520px] bg-white rounded-[40px] p-10 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl font-bold text-gray-500 hover:text-black z-20"
        >
          ✕
        </button>

        {/*User details + project selection*/}
        <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            <img
              className="w-14 h-14 rounded-full shadow border-4 border-violet-950/75"
              src={user?.imageUrl || "https://placehold.co/85x81"}
              alt="User avatar"
            />
            <div className="text-violet-950 max-sm:text-xl sm:text-2xl font-bold font-['Lato'] tracking-wide">
              {user?.fullName || "User"}
            </div>
          </div>

          {/* Project selection*/}
          <div className="relative max-w-[200px] ">
            <select
              className="appearance-none text-violet-800 bg-transparent outline-none pr-10 pl-2 text-lg font-semibold font-['Lato'] cursor-pointer truncate w-full"
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              <option value="" disabled hidden>
                post as project
              </option>
              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                  title={project.title}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                className="w-4 h-4 text-violet-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="h-24" />

        {/* Text area with tooltip when no project is selected*/}
        <div
          className={`w-full h-[360px] overflow-y-auto overflow-x-hidden mb-6 border-b-2 ${
            selectedProjectId
              ? "border-gray-300 focus-within:border-violet-700 text-black/80 cursor-text"
              : "border-gray-200 text-gray-400 cursor-not-allowed group relative"
          } text-xl font-normal font-['Lato'] tracking-wide px-1 py-2`}
          onClick={() => selectedProjectId && setIsInputActive(true)}
        >
          {isInputActive && selectedProjectId ? (
            <textarea
              ref={textareaRef}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full h-full bg-transparent focus:outline-none resize-none caret-black"
            />
          ) : (
            <div className="cursor-not-allowed">
              what do you want to talk about?
            </div>
          )}

          {/* Custom tooltip when no project is selected*/}
          {!selectedProjectId && (
            <div className="absolute top-2 left-2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              Choose a project before writing a post.{" "}
            </div>
          )}

          {showEmojiPicker && selectedProjectId && (
            <div className="absolute bottom-2 left-2 z-20">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/*Icons + button*/}
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <div
              onClick={() => selectedProjectId && fileInputRef.current?.click()}
              className={`cursor-pointer ${
                !selectedProjectId ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <Image className="w-8 h-8" />
            </div>

            <CirclePlay
              className={`w-8 h-8 ${
                !selectedProjectId ? "opacity-30 cursor-not-allowed" : ""
              }`}
            />

            <Smile
              className={`w-8 h-8 ${
                !selectedProjectId
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() =>
                selectedProjectId && setShowEmojiPicker((prev) => !prev)
              }
            />
          </div>

          <button
            disabled={!selectedProjectId || !postContent.trim()}
            className={`flex items-center justify-center w-32 h-9 rounded-[40px] border border-black ${
              !selectedProjectId || !postContent.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-violet-950"
            }`}
            onClick={handlePostSubmit}
          >
            <span className="text-white text-2xl font-normal font-['Inter']">
              Post
            </span>
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
