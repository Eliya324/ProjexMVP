import React from "react";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";

interface Post {
  avatarUrl: string;
  title: string;
  followers: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div
      className="w-[772px] bg-white rounded-[40px] border border-black p-6 shadow-md mt-24 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-4">
          <img
            src={post.avatarUrl || "https://placehold.co/85x81"}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-black font-['Lato'] leading-tight">
              {post.title}
            </h2>
            <p className="text-lg text-black font-['Lato']">
              {post.followers} followers · {post.time}
            </p>
          </div>
        </div>

        <button className="h-8 px-6 bg-white border border-black rounded-full text-black text-2xl font-normal font-['Lato']">
          Follow
        </button>
      </div>

      {/* Content */}
      <div className="text-black text-2xl font-normal font-['Lato'] whitespace-pre-line flex-grow">
        {post.content}
      </div>

      {/* Likes & Comments Count */}
      <div className="flex justify-between items-center text-black text-lg font-normal font-['Lato'] pt-4 mt-4">
        <div className="flex items-center space-x-2">
          <ThumbsUp className="w-5 h-5" />
          <span>{post.likes}</span>
        </div>
        <span>{post.comments} comments</span>
      </div>

      {/* Action Buttons */}
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
    </div>
  );
}


// components/PostCard.tsx
// import React from "react";
// import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";

// interface Post {
//   avatarUrl: string;
//   title: string;
//   followers: string;
//   time: string;
//   content: string;
//   likes: number;
//   comments: number;
// }

// export default function PostCard({ post }: { post: Post }) {
//   return (
//     <div
//       className="w-[772px] bg-white rounded-[40px] border border-black p-6 shadow-md mt-24
//                    flex flex-col justify-between"
//       style={{ minHeight: "auto" }} // optional
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-start space-x-4">
//           <img
//             src={post.avatarUrl || "https://placehold.co/85x81"}
//             alt="Avatar"
//             className="w-20 h-20 rounded-full"
//           />
//           <div className="flex flex-col justify-center">
//             <h2 className="text-2xl font-bold text-black font-['Lato'] leading-tight">
//               {post.title}
//             </h2>
//             <p className="text-lg text-black font-['Lato']">
//               {post.followers} followers · {post.time}
//             </p>
//             {/* <div className="flex flex-col font-['Lato'] text-black">
//               <p className="text-lg">{post.followers} followers</p>
//               <p className="text-lg">{post.time}</p>
//             </div> */}
//           </div>
//         </div>

//         <button className="h-8 px-6 bg-white border border-black rounded-full text-black text-2xl font-normal font-['Lato']">
//           Follow
//         </button>
//       </div>

//       {/* Content - יקבל flex-grow כך שידחוס את השטח */}
//       <div className="text-black text-2xl font-normal font-['Lato'] whitespace-pre-line flex-grow">
//         {post.content}
//       </div>

//       {/* Likes & Comments Count */}
//       <div className="flex justify-between items-center text-black text-lg font-normal font-['Lato'] border-t-transparent pt-4 mt-4">
//         <div className="flex items-center space-x-2">
//           <ThumbsUp className="w-5 h-5" />
//           <span>{post.likes}</span>
//         </div>
//         <span>{post.comments} comments</span>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-around pt-4 border-t border-gray-300 text-black text-base font-['Lato'] mt-4">
//         <button className="flex items-center space-x-2 hover:text-blue-700">
//           <ThumbsUp className="w-5 h-5" />
//           <span>Like</span>
//         </button>
//         <button className="flex items-center space-x-2 hover:text-blue-700">
//           <MessageCircle className="w-5 h-5" />
//           <span>Comment</span>
//         </button>
//         <button className="flex items-center space-x-2 hover:text-blue-700">
//           <Share2 className="w-5 h-5" />
//           <span>Repost</span>
//         </button>
//         <button className="flex items-center space-x-2 hover:text-blue-700">
//           <Send className="w-5 h-5" />
//           <span>Send</span>
//         </button>
//       </div>
//     </div>
//   );
// }
