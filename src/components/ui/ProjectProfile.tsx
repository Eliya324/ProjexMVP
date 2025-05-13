import { Card, CardContent } from "./card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { datetimeRegex } from "zod";
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';
import { Button } from "./button";

// const ProjectProfile = ({ projectd }: { projectd: any }) => {
//   console.log(projectd);

//   const project = {
//     techStack: ["React", "Node.js", "Figma", "Tailwind", "SQL", "C#"],
//     members:
//       [
//         { id: 1, name: "jon vtery", role: "Frontend Developer", image: "https://placehold.co/64x62.png" },
//         { id: 2, name: "orit vladi", role: "fullstack Developer", image: "https://placehold.co/64x62.png" },
//         { id: 31, name: "Racheli", role: "UI/UX Developer", image: "https://placehold.co/64x62.png" },
//         { id: 51, name: "Chaya gut", role: "Backend Developer", image: "https://placehold.co/64x62.png" },
//         { id: 52, name: "Chaim yosef", role: "SQL Developer", image: "https://placehold.co/64x62.png" },
//         { id: 531, name: "Addele api", role: "Project manager", image: "https://placehold.co/64x62.png" },
//       ],
//     rating: 4.8,
//     starCount: 5,
//     number: 1048,
//     status: "progress",
//     image: "https://placehold.co/270x150.png",
//     name: "Contribution with automation & 100% transparency in retail networks",
//     description:
//       "An innovative automated donation system designed to provide complete transparency, ensuring that every contribution is used directly to purchase essential goods for those in need. Our platform offers real-time tracking of every donation, allowing donors to see exactly how their money is being spent. Through streamlined processes and direct purchasing, we eliminate unnecessary overhead costs, guaranteeing that 100% of the donations are effectively and efficiently allocated to those who need it most. This system not only maximizes the impact of every contribution but also builds trust and accountability by providing clear.",
//     comments: [
//       { id: 1, text: "wow", image: "https://placehold.co/64x62.png", userName: "@oritvladi", date: datetimeRegex, like: 54, disLike: 2 },
//       { id: 2, text: "awesome", image: "https://placehold.co/64x62.png", userName: "@oritvladi", date: datetimeRegex, like: 54, disLike: 2 },
//       { id: 3, text: "nice", image: "https://placehold.co/64x62.png", userName: "@oritvladi", date: datetimeRegex, like: 54, disLike: 2 },
//       { id: 4, text: "omg", image: "https://placehold.co/64x62.png", userName: "@oritvladi", date: datetimeRegex, like: 54, disLike: 2 },
//     ]
//   };
//   const isOwner = false;

//   return (
//     <>
//       <Card className={cn(
//         "w-full pt-20 px-2 md:px-5 lg:px-10 xl:px-20"
//       )}>
//         <CardContent className="p-10">

//           <div className="flex max-sm:flex-col">
//             <Image
//               className="w-1/2 max-sm:w-full object-cover rounded-[30px]"
//               src={project.image}
//               alt="Project"
//               width={500}
//               height={150}
//             />

//             <div className="w-[550px] max-sm:w-full mt-2 px-8 flex flex-col">
//               <div className="text-[25px] max-sm:text-[18px] font-bold text-black leading-tight">
//                 {project.name}
//               </div>

//               <div className="flex flex-col h-full">
//                 <div className="mt-auto max-sm:mt-10">
//                   <div className="flex items-center justify-left px-2">
//                     <div className="text-[13px] text-black font-bold">
//                       {project.rating}
//                     </div>
//                     <div className="flex gap-1 px-1.5">
//                       {[...Array(project.starCount)].map((_, i) => (
//                         <div key={i}>
//                           <svg
//                             width="12"
//                             height="13"
//                             viewBox="0 0 25 26"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M12.2139 0L16.3657 7.97456L24.4278 9.92771L18.9316 16.8094L19.7625 25.9911L12.2139 22.2697L4.6653 25.9911L5.49627 16.8094L0 9.92771L8.06218 7.97456L12.2139 0Z"
//                               fill="#DFB300"
//                             />
//                           </svg>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="px-2">
//                     <h6>Status: In {project.status}</h6>
//                     <h6>Follow the project: {project.number}</h6>
//                   </div>
//                 </div>
//               </div>



//             </div>
//           </div>

//           <div className="flex max-md:flex-col w-full pt-[110px]">
//             <div className="w-[60%] max-lg:w-[55%] max-md:w-full">
//               <h4 className="font-bold">About the project</h4>
//               <p className="text-[14px] leading-[1.75rem] mt-3 mx-auto">
//                 {project.description}
//               </p>


//               <h4 className="font-bold mt-10">Skills & Technologies</h4>
//               <div className="mt-3">
//                 {project.techStack.map((skill) => (
//                   <Badge
//                     key={skill}
//                     className="mr-1.5 bg-[#7A7A7A] "
//                   >
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center items-start w-[40%] max-lg:ml-auto max-md:w-full mt-10">
//               <Card className="border border-black p-4 w-[280px]">
//                 <CardContent className="flex flex-col items-center space-y-4">
//                   <span className="text-sm font-medium">Connect to the project</span>
//                   <div className="flex items-center space-x-2">
//                     <Button className="rounded-xl h-[30px] w-[100px]">join</Button>
//                     <Button className="rounded-xl h-[30px]" variant="outline">Follow the project</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           <div className="mt-20 font-bold w-[90%] max-sm:w-full">
//             Members participating in the project
//             <div className="flex flex-wrap gap-x-20 gap-y-8 pt-4 max-sm:gap-x-10">
//               {project.members.map((member, index) => (
//                 <div key={index} className="flex items-center space-x-3 mb-2">
//                   <Image
//                     className="rounded-full border-[3px] border-blue-light shadow-md"
//                     src={member.image}
//                     alt="Member"
//                     width={40}
//                     height={40}
//                   />
//                   <div>
//                     <h4 className="text-sm font-medium">{member.name}</h4>
//                     <h6 className="text-xs text-gray-500">{member.role}</h6>
//                   </div>
//                 </div>
//               ))}

//             </div>
//           </div>

//           <div className="mt-20">
//             <h3 className="font-bold">Add a comment</h3>

//             {project.comments.map((comment) => (
//               <div key={comment.id} className="flex flex-wrap space-x-1.5 mt-4">

//                 <Image
//                   className="rounded-full border-[3px] w-[30px] h-[30px] border-blue-light shadow-md"
//                   src={comment.image}
//                   alt="Comment"
//                   width={30}
//                   height={30}
//                 />
//                 <div className=" text-xs">
//                   <div className="flex flex text-gray-500 text:xxs">
//                     <h6>{comment.userName}</h6>
//                     <h6>8 months ago</h6>
//                   </div>
//                   <p>{comment.text}</p>
//                   <div className="flex gap-4 mt-1">
//                     <button className="flex items-center gap-1">
//                       <HandThumbUpIcon className="w-3 h-3 text-black" /> {comment.like}
//                     </button>
//                     <button className="flex items-center gap-1">
//                       <HandThumbDownIcon className="w-3 h-3 text-black" /> {comment.disLike}
//                     </button>
//                   </div>


//                 </div>
//               </div>
//             ))}

//           </div>

//         </CardContent>
//       </Card >


//     </>)
// }

// export default ProjectProfile;

const ProjectProfile = ({ projectd }: { projectd: any }) => {
  console.log(projectd);

  // אובייקט projectd שנשלח כפרופס
  const project = projectd; // מחליפים את project ב-projectd

  const isOwner = project.owner.id === projectd.ownerId;

  return (
    <>
      <Card className={cn("w-full pt-20 px-2 md:px-5 lg:px-10 xl:px-20")}>
        <CardContent className="p-10">
          <div className="flex max-sm:flex-col">
            <Image
              className="w-1/2 max-sm:w-full object-cover rounded-[30px]"
              src={project.image || "https://placehold.co/270x150.png"} // אם אין תמונה
              alt="Project"
              width={500}
              height={150}
            />
            <div className="w-[550px] max-sm:w-full mt-2 px-8 flex flex-col">
              <div className="text-[25px] max-sm:text-[18px] font-bold text-black leading-tight">
                {project.title}
              </div>

              <div className="flex flex-col h-full">
                <div className="mt-auto max-sm:mt-10">
                  <div className="flex items-center justify-left px-2">
                    <div className="text-[13px] text-black font-bold">
                      {project.rating || 'No Rating'}
                    </div>
                    <div className="flex gap-1 px-1.5">
                      {[...Array(project.starCount || 0)].map((_, i) => (
                        <div key={i}>
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 25 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.2139 0L16.3657 7.97456L24.4278 9.92771L18.9316 16.8094L19.7625 25.9911L12.2139 22.2697L4.6653 25.9911L5.49627 16.8094L0 9.92771L8.06218 7.97456L12.2139 0Z"
                              fill="#DFB300"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-2">
                    <h6>Status: {project.status}</h6>
                    <h6>Follow the project: {project.number}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-col w-full pt-[110px]">
            <div className="w-[60%] max-lg:w-[55%] max-md:w-full">
              <h4 className="font-bold">About the project</h4>
              <p className="text-[14px] leading-[1.75rem] mt-3 mx-auto">
                {project.shortDescription}
              </p>

              <h4 className="font-bold mt-10">Skills & Technologies</h4>
              <div className="mt-3">
                {[...(project.usedTechnologies || []), ...(project.requiredSkills || [])].map((skill: string) => (
                  <Badge key={skill} className="mr-1.5 bg-[#7A7A7A]">
                    {skill}
                  </Badge>
                ))}

              </div>
            </div>

            <div className="flex justify-center items-start w-[40%] max-lg:ml-auto max-md:w-full mt-10">
              <Card className="border border-black p-4 w-[280px]">
                <CardContent className="flex flex-col items-center space-y-4">
                  <span className="text-sm font-medium">Connect to the project</span>
                  <div className="flex items-center space-x-2">
                    <Button className="rounded-xl h-[30px] w-[100px]">join</Button>
                    <Button className="rounded-xl h-[30px]" variant="outline">Follow the project</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-20 font-bold w-[90%] max-sm:w-full">
            Members participating in the project
            <div className="flex flex-wrap gap-x-20 gap-y-8 pt-4 max-sm:gap-x-10">
              {project.members && project.members.length > 0 ? (
                project.members.map((member: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 mb-2">
                    <Image
                      className="rounded-full border-[3px] border-blue-light shadow-md"
                      src={member.image}
                      alt="Member"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h4 className="text-sm font-medium">{member.name}</h4>
                      <h6 className="text-xs text-gray-500">{member.role}</h6>
                    </div>
                  </div>
                ))
              ) : (
                <div>No members available</div>
              )}
            </div>
          </div>

          <div className="mt-20">
            <h3 className="font-bold">Add a comment</h3>

            {project.comments && project.comments.length > 0 ? (
              project.comments.map((comment: any) => (
                <div key={comment.id} className="flex flex-wrap space-x-1.5 mt-4">
                  <Image
                    className="rounded-full border-[3px] w-[30px] h-[30px] border-blue-light shadow-md"
                    src={comment.userImage}
                    alt="User"
                    width={30}
                    height={30}
                  />
                  <div>
                    <p className="text-sm font-medium">{comment.userName}</p>
                    <p className="text-xs text-gray-600">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mt-2">No comments yet.</p>
            )}

          </div>

        </CardContent>
      </Card>
    </>
  );
};

export default ProjectProfile;
