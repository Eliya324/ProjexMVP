// // AllPostsPage.jsx
// import React from "react";
// import { Video, Image, CirclePlay } from "lucide-react";

// export default function AllPostsPage() {
//   return (
//     <div className="min-h-screen bg-gray-100  mt-16">
//       {/* All‑Posts Container */}
//       <div className="max-w-4xl mx-auto space-y-4">
//         {/* Row 1: Avatar + input – מיושר למרכז */}
//         <div className="flex justify-center items-center space-x-4">
//           <img
//             className="w-12 h-12 rounded-full border-4 border-violet-950/75 shadow"
//             src="https://placehold.co/85x81"
//             alt="User"
//           />

//           <div className="w-[500px] h-10 px-9 bg-white rounded-full outline outline-[3px] outline-offset-[-3px] outline-zinc-500 flex items-center">
//             <span className="text-black text-xl font-normal font-['Lato']">
//               Start a post
//             </span>
//           </div>
//         </div>

//         {/* Row 2: Video / Photo – מתחיל בקו של האווטר */}
//         <div className="flex justify-start items-center space-x-10 pl-36">
//           {/* 48px (w-12) + 16px (space-x-4) = 64px = pl-16 */}
//           <button className="flex items-center space-x-2">
//             <CirclePlay className="w-4 h-4" />
//             <span className="text-sm font-bold">Video</span>
//           </button>

//           <button className="flex items-center space-x-2">
//             <Image className="w-4 h-4" />
//             <span className="text-sm font-bold">Photo</span>
//           </button>
//         </div>
//       </div>

//       {/* Divider ברוחב‑מלא */}
//       <div className="-mx-6 w-screen h-[3px] bg-black/30 my-6" />
//     </div>
//   );
// }
// AllPostsPage.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import PostCard from "../PostCard";

// type PostFromServer = {
//   id: string;
//   content: string;
//   createdAt: string;
//   author?: {
//     fullName?: string;
//     profilePicture?: string;
//   };
//   likes?: unknown[];
//   comments?: unknown[];
// };

// export default function AllPostsPage() {
//   const [posts, setPosts] = useState<PostFromServer[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 mt-16">
//       <div className="max-w-4xl mx-auto space-y-4">
//         <div className="-mx-6 w-screen h-[3px] bg-black/30 my-6" />

//         {posts.map((post) => (
//           <PostCard
//             key={post.id}
//             post={{
//               avatarUrl: post.author?.profilePicture ?? "https://placehold.co/85x81",
//               title: post.author?.fullName ?? "Unknown",
//               followers: "0", // אם אין נתון – ברירת מחדל
//               time: new Date(post.createdAt).toLocaleDateString(),
//               content: post.content,
//               likes: Array.isArray(post.likes) ? post.likes.length : 0,
//               comments: Array.isArray(post.comments) ? post.comments.length : 0,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { Video, Image, CirclePlay } from "lucide-react";
import PostCard from "./PostCard";
type PostFromServer = {
  id: string;
  content: string;
  createdAt: string;
  author?: {
    fullName?: string;
    profilePicture?: string;
  };
  likes?: unknown[];
  comments?: unknown[];
};

export default function AllPostsPage() {
  const [posts, setPosts] = useState<PostFromServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format. Expected an array.");
        }

        setPosts(data);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Start a Post UI */}
        <div className="flex justify-center items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full border-4 border-violet-950/75 shadow"
            src="https://placehold.co/85x81"
            alt="User"
          />
          <div className="w-[500px] h-10 px-9 bg-white rounded-full outline outline-[3px] outline-offset-[-3px] outline-zinc-500 flex items-center">
            <span className="text-black text-xl font-normal font-['Lato']">
              Start a post
            </span>
          </div>
        </div>

        {/* Video / Photo buttons */}
        <div className="flex justify-start items-center space-x-10 pl-36">
          <button className="flex items-center space-x-2">
            <CirclePlay className="w-4 h-4" />
            <span className="text-sm font-bold">Video</span>
          </button>
          <button className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span className="text-sm font-bold">Photo</span>
          </button>
        </div>

        {/* Divider */}
        <div className="-mx-6 w-screen h-[3px] bg-black/30 my-6" />

        {/* Loading/Error/Posts */}
        {loading ? (
          <p className="text-center text-xl text-gray-500 mt-10">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500 mt-10">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-xl text-gray-500 mt-10">No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                avatarUrl: post.author?.profilePicture ?? "https://placehold.co/85x81",
                title: post.author?.fullName ?? "Unknown",
                followers: "0",
                time: new Date(post.createdAt).toLocaleDateString(),
                content: post.content,
                likes: Array.isArray(post.likes) ? post.likes.length : 0,
                comments: Array.isArray(post.comments) ? post.comments.length : 0,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}



// "use client";

// import React, { useEffect, useState } from "react";
// import { Video, Image, CirclePlay } from "lucide-react";
// import PostCard from "./PostCard";

// type PostFromServer = {
//   id: string;
//   content: string;
//   createdAt: string;
//   author?: {
//     fullName?: string;
//     profilePicture?: string;
//   };
//   likes?: unknown[];
//   comments?: unknown[];
// };

// export default function AllPostsPage() {
//   const [posts, setPosts] = useState<PostFromServer[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 mt-16">
//       <div className="max-w-4xl mx-auto space-y-4">
//         {/* Start a Post UI */}
//         <div className="flex justify-center items-center space-x-4">
//           <img
//             className="w-12 h-12 rounded-full border-4 border-violet-950/75 shadow"
//             src="https://placehold.co/85x81"
//             alt="User"
//           />
//           <div className="w-[500px] h-10 px-9 bg-white rounded-full outline outline-[3px] outline-offset-[-3px] outline-zinc-500 flex items-center">
//             <span className="text-black text-xl font-normal font-['Lato']">
//               Start a post
//             </span>
//           </div>
//         </div>

//         {/* Video / Photo buttons */}
//         <div className="flex justify-start items-center space-x-10 pl-36">
//           <button className="flex items-center space-x-2">
//             <CirclePlay className="w-4 h-4" />
//             <span className="text-sm font-bold">Video</span>
//           </button>
//           <button className="flex items-center space-x-2">
//             <Image className="w-4 h-4" />
//             <span className="text-sm font-bold">Photo</span>
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="-mx-6 w-screen h-[3px] bg-black/30 my-6" />

//         {/* Posts from API */}
//         {posts.length === 0 ? (
//           <p className="text-center text-xl text-gray-500 mt-10">No posts yet</p>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={{
//                 avatarUrl: post.author?.profilePicture ?? "https://placehold.co/85x81",
//                 title: post.author?.fullName ?? "Unknown",
//                 followers: "0",
//                 time: new Date(post.createdAt).toLocaleDateString(),
//                 content: post.content,
//                 likes: Array.isArray(post.likes) ? post.likes.length : 0,
//                 comments: Array.isArray(post.comments) ? post.comments.length : 0,
//               }}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
