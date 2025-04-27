import { Card } from "@/components/ui/card";
import { MapPin, Globe, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
const UserCard = () => {
  const user = {
    name: "Jony Vladi",
    imageUrl: "https://placehold.co/70x70.png",
    location: "Israel",
    language: "Hebrew",
    jobTitle: "Full Stack Developer",
    description:
      "I am looking for a strategic partnership to drive innovation, streamline impactful processes partnership to drive innovation, streamline impactful processes  streamline impactful processes",
    skills: [
      "React",
      "Node.js",
      "c#",
      "python",
    ],
    experience: "5+ Years",
  };
  return (
    <Card className="w-[300px] h-[230px] sm:h-[200px] bg-white border border-blue-light rounded-[35px] shadow-lg flex flex-row justify-between max-sm:w-[90%] max-sm:flex-grow">
      {/* Profile Section */}
      <div className="w-1/3 flex flex-col pt-3 items-center text-center">
        <Image
          className="rounded-full border-4 border-blue-light shadow-md max-sm:w-[100px]"
          src={user.imageUrl}
          alt="Profile"
          width={80}
          height={80}
        />
        <h2 className="text-blue-light font-bold text-base mt-2 max-sm:text-base">
          {user.name}
        </h2>
        <div className="flex flex-col gap-1 max-sm:gap-2 mt-1 max-sm:mt-2  text-xs text-blue-light font-bold max-sm:text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={16} /> <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={16} /> <span>{user.language}</span>
          </div>
        </div>
      </div>
      {/* Details Section */}
      <div className="w-2/3 flex flex-col p-3 border-l-2 border-blue-light h-full">
        <p className="text-black font-bold text-sm max-sm:text-[18px]">
          {user.jobTitle}
        </p>
        <div className="text-[#5B5252] text-xs mt-2 max-sm:text-[13px] max-sm:mt-2 line-clamp-4 overflow-hidden ">
          {user.description}
        </div>
        <div className="w-full flex flex-wrap gap-y-1  mt-auto  overflow-hidden sm:overflow-hidden    max-h-[5rem]  leading-tight">
          <div className="line-clamp-2 w-full space-y-1 ">
            {user.skills.map((skill) => (
              <Badge
                key={skill}
                variant="skills"
                className="mr-1.5 max-sm:pt-0.5  max-sm:w-[21%] max-sm:h-[39%] "
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 max-sm:mt-3 text-xs text-blue-light font-bold max-sm:text-xs">
          <Briefcase size={16} /> <span>{user.experience}</span>
        </div>
      </div>
    </Card>
  );
};
export default UserCard;