// "use client";
// import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Link from "next/link";

// interface Post {
//   id: string;
//   content: string;
//   image?: string;
//   createdAt: string;
//   likes: number;
//   comments: number;
//   projectTitle: string;
//   author: {
//     fullName: string;
//     profilePicture: string;
//     followers?: number;
//   };
// }

// function formatTimeAgo(dateString: string): string {
//   const now = new Date();
//   const past = new Date(dateString);
//   const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

//   if (diffInSeconds < 60) return "now";

//   const minutes = Math.floor(diffInSeconds / 60);
//   if (minutes < 60) return `${minutes}m`;

//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours}h`;

//   const days = Math.floor(hours / 24);
//   if (days < 7) return `${days}d`;

//   const weeks = Math.floor(days / 7);
//   if (weeks < 4) return `${weeks}w`;

//   const months = Math.floor(days / 30);
//   if (months < 12) return `${months}m`;

//   const years = Math.floor(days / 365);
//   return `${years}y`;
// }
// export default function PostCard({
//   post,
//   isCompact,
// }: {
//   post: Post;
//   isCompact?: boolean;
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (isCompact) {
//     const MAX_PREVIEW_LENGTH = post.image ? 200 : 350;

//     const isTruncated = post.content.length > MAX_PREVIEW_LENGTH;
//     const displayedContent = isExpanded
//       ? post.content
//       : post.content.slice(0, MAX_PREVIEW_LENGTH);

//     return (
//       <Card
//         className={`sm:w-[290px] max-sm:w-[100%]  max-sm:h-auto sm:h-[368px]  flex flex-col rounded-2xl shadow-md border border-gray-200 transition-all duration-300 border-blue-light
//     ${isExpanded ? "h-auto" : "min-h-[368px] max-sm:min-h-0 "}`}
//       >
//         {/* Header */}
//         <div className="flex items-start gap-2 px-4 pt-4 ">
//           <div className="relative w-[50px] h-[50px] max-sm:w-[80px] max-sm:h-[80px]">
//             <Image
//               src={post.author.profilePicture || "https://placehold.co/40x40"}
//               alt="Author"
//               fill
//               className="rounded-full object-cover"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <Link
//               href="/posts"
//               onClick={() => {
//                 localStorage.setItem("selectedPostId", post.id);
//               }}
//             >
//               <h2 className="text-md sm:text-sm font-semibold text-black leading-snug line-clamp-2 max-h-[2.8em] cursor-pointer">
//                 Project: {post.projectTitle}
//               </h2>
//             </Link>
//             <p className=" max-sm:text-sm sm:text-xs text-muted-foreground">
//               {post.author.followers?.toLocaleString() || 0} followers •{" "}
//               {formatTimeAgo(post.createdAt)}
//             </p>
//           </div>
//         </div>

//         {/* Content */}
//         <CardContent className="flex flex-col px-4 pt-2 pb-2 flex-grow">
//           <div className="flex-grow space-y-2">
//             <p className="max-sm:text-md sm:text-sm text-muted-foreground whitespace-pre-line">
//               {displayedContent}
//               {isTruncated && !isExpanded && (
//                 <>
//                   {" "}
//                   <Link
//                     href="/posts"
//                     onClick={() =>
//                       localStorage.setItem("selectedPostId", post.id)
//                     }
//                     className="text-black hover:text-blue-600 transition-colors duration-200"
//                   >
//                     More...
//                   </Link>
//                 </>
//               )}
//             </p>

//             {post.image && (
//               <Image
//                 src={post.image}
//                 alt="Post Image"
//                 width={280}
//                 height={150}
//                 className="w-full h-[150px] object-cover rounded-md"
//               />
//             )}
//           </div>

//           {/* לייקים ותגובות */}

//           <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
//             <div className="flex items-center gap-1">
//               <ThumbsUp className="w-4 h-4 text-black" />
//               <span>{post.likes}</span>
//             </div>
//             <span>{post.comments} comments</span>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   // full version
//   return (
//     <Card className="w-full max-w-3xl bg-white rounded-[20px] border border-black p-6 shadow-md mt-6 flex flex-col justify-between">
//       {/* Header */}
//       <CardHeader className="flex flex-row justify-between items-start mb-4 p-0">
//         <div className="flex items-start gap-4">
//           <Image
//             src={post.author.profilePicture || "https://placehold.co/85x81"}
//             alt="Author"
//             width={80}
//             height={80}
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div className="flex flex-col justify-center">
//             <h2 className="text-xl sm:text-[22px] xl:text-2xl font-bold text-black font-['Lato'] leading-tight">
//               {post.projectTitle}
//             </h2>
//             <p className="text-lg text-black font-['Lato']">
//               {formatTimeAgo(post.createdAt)}
//             </p>
//           </div>
//         </div>

//         <button className="h-10 px-6 bg-white border border-black rounded-full text-black text-lg font-['Lato'] whitespace-nowrap">
//           Follow
//         </button>
//       </CardHeader>

//       {/* תוכן הפוסט */}
//       <CardContent className="text-black max-sm:text-xl sm:text-[22px] font-normal font-['Lato'] whitespace-pre-line p-0">
//         {post.content}

//         {/* תמונה אם קיימת */}
//         {post.image && (
//           <Image
//             src={post.image}
//             alt="Post"
//             width={800}
//             height={400}
//             className="mt-4 rounded-2xl max-h-[400px] object-cover w-full"
//           />
//         )}

//         {/* לייקים ותגובות */}

//         <div className="flex justify-between items-center text-black text-lg font-normal font-['Lato'] pt-4 mt-4">
//           <div className="flex items-center space-x-2">
//             <ThumbsUp className="w-5 h-5" />
//             <span>{post.likes}</span>
//           </div>
//           <span>{post.comments} comments</span>
//         </div>

//         {/* כפתורי פעולה */}

//         <div className="flex justify-around pt-4 border-t border-gray-300 text-black text-base font-['Lato'] mt-4">
//           <button className="flex items-center space-x-2 hover:text-blue-700">
//             <ThumbsUp className="w-5 h-5" />
//             <span>Like</span>
//           </button>
//           <button className="flex items-center space-x-2 hover:text-blue-700">
//             <MessageCircle className="w-5 h-5" />
//             <span>Comment</span>
//           </button>
//           <button className="flex items-center space-x-2 hover:text-blue-700">
//             <Share2 className="w-5 h-5" />
//             <span>Repost</span>
//           </button>
//           <button className="flex items-center space-x-2 hover:text-blue-700">
//             <Send className="w-5 h-5" />
//             <span>Send</span>
//           </button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Post {
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
    followers?: number;
  };
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m`;

  const years = Math.floor(days / 365);
  return `${years}y`;
}

function PostHeader({ post, isCompact }: { post: Post; isCompact?: boolean }) {
  return isCompact ? (
    <div className="flex items-start gap-2 px-4 pt-4">
      <div className="relative w-[50px] h-[50px] max-sm:w-[80px] max-sm:h-[80px]">
        <Image
          src={post.author.profilePicture || "https://placehold.co/40x40"}
          alt="Author"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Link
          href="/posts"
          onClick={() => localStorage.setItem("selectedPostId", post.id)}
        >
          <h2 className="text-md sm:text-sm font-semibold text-black leading-snug line-clamp-2 max-h-[2.8em] cursor-pointer">
            Project: {post.projectTitle}
          </h2>
        </Link>
        <p className="max-sm:text-sm sm:text-xs text-muted-foreground">
          {post.author.followers?.toLocaleString() || 0} followers •{" "}
          {formatTimeAgo(post.createdAt)}
        </p>
      </div>
    </div>
  ) : (
    <CardHeader className="flex flex-row justify-between items-start mb-4 p-0">
      <div className="flex items-start gap-4">
        <Image
          src={post.author.profilePicture || "https://placehold.co/85x81"}
          alt="Author"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl sm:text-[22px] xl:text-2xl font-bold text-black font-['Lato'] leading-tight">
            {post.projectTitle}
          </h2>
          <p className="text-lg text-black font-['Lato']">
            {formatTimeAgo(post.createdAt)}
          </p>
        </div>
      </div>
      <button className="h-10 px-6 bg-white border border-black rounded-full text-black text-lg font-['Lato'] whitespace-nowrap">
        Follow
      </button>
    </CardHeader>
  );
}

function PostContent({
  post,
  isCompact,
  isExpanded,
  setIsExpanded,
}: {
  post: Post;
  isCompact?: boolean;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) {
  if (isCompact) {
    const MAX_PREVIEW_LENGTH = post.image ? 200 : 350;
    const isTruncated = post.content.length > MAX_PREVIEW_LENGTH;
    const displayedContent = isExpanded
      ? post.content
      : post.content.slice(0, MAX_PREVIEW_LENGTH);

    return (
      <CardContent className="flex flex-col px-4 pt-2 pb-2 flex-grow">
        <div className="flex-grow space-y-2">
          <p className="max-sm:text-md sm:text-sm text-muted-foreground whitespace-pre-line">
            {displayedContent}
            {isTruncated && !isExpanded && (
              <>
                {" "}
                <Link
                  href="/posts"
                  onClick={() => {
                    localStorage.setItem("selectedPostId", post.id);
                    // setIsExpanded(true);
                  }}
                  className="text-black hover:text-blue-600 transition-colors duration-200"
                >
                  More...
                </Link>
              </>
            )}
          </p>

          {post.image && (
            <Image
              src={post.image}
              alt="Post Image"
              width={280}
              height={150}
              className="w-full h-[150px] object-cover rounded-md"
            />
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-black" />
            <span>{post.likes}</span>
          </div>
          <span>{post.comments} comments</span>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="text-black max-sm:text-xl sm:text-[22px] font-normal font-['Lato'] whitespace-pre-line p-0">
      {post.content}
      {post.image && (
        <Image
          src={post.image}
          alt="Post"
          width={800}
          height={400}
          className="mt-4 rounded-2xl max-h-[400px] object-cover w-full"
        />
      )}

      <div className="flex justify-between items-center text-black text-lg font-normal font-['Lato'] pt-4 mt-4">
        <div className="flex items-center space-x-2">
          <ThumbsUp className="w-5 h-5" />
          <span>{post.likes}</span>
        </div>
        <span>{post.comments} comments</span>
      </div>
    </CardContent>
  );
}

function PostActions() {
  return (
    <div className="flex justify-around pt-4 border-t border-gray-300 text-black text-base font-['Lato'] mt-4">
      <button className="flex items-center space-x-2 hover:text-blue-700">
        <ThumbsUp className="w-5 h-5" />
        <span>Like</span>
      </button>
      <button className="flex items-center space-x-2 hover:text-blue-700">
        <MessageCircle className="w-5 h-5" />
        <span>Comment</span>
      </button>
      <button className="flex items-center space-x-2 hover:text-blue-700">
        <Share2 className="w-5 h-5" />
        <span>Repost</span>
      </button>
      <button className="flex items-center space-x-2 hover:text-blue-700">
        <Send className="w-5 h-5" />
        <span>Send</span>
      </button>
    </div>
  );
}

export default function PostCard({
  post,
  isCompact,
}: {
  post: Post;
  isCompact?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isCompact) {
    return (
      <Card
        className={`sm:w-[290px] max-sm:w-[100%]  max-sm:h-auto sm:h-[368px]  flex flex-col rounded-2xl shadow-md border border-gray-200 transition-all duration-300 border-blue-light
      ${isExpanded ? "h-auto" : "min-h-[368px] max-sm:min-h-0 "}`}
      >
        <PostHeader post={post} isCompact />
        <PostContent
          post={post}
          isCompact
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl bg-white rounded-[20px] border border-black p-6 shadow-md mt-6 flex flex-col justify-between">
      <PostHeader post={post} />
      <PostContent
        post={post}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <PostActions />
    </Card>
  );
}
