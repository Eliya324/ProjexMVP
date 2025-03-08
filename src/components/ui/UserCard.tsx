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
        description: "I am looking for a strategic partnership to drive innovation, streamline impactful processes partnership to drive innovation, streamline impactful processes",
        skills: ["React", "Node.js", "c#", "python"],
        experience: "5+ Years"
    };
    return (
        <Card className="w-[300px] h-[200px] bg-white border border-brand-light rounded-[35px] shadow-lg flex flex-row justify-between max-sm:w-[250px] max-sm:h-[180px]">

            {/* Profile Section */}
            <div className="w-1/3 flex flex-col pt-3 items-center text-center">
                <Image
                    className="rounded-full border-4 border-brand-light shadow-md max-sm:w-[65px]"
                    src={user.imageUrl}
                    alt="Profile"
                    width={80}
                    height={80}
                />
                <h2 className="text-brand-light font-bold text-base mt-2 max-sm:text-sm">{user.name}</h2>
                <div className="flex flex-col gap-1 mt-1 text-xs text-brand-light font-bold max-sm:text-xxs">
                    <div className="flex items-center gap-1">
                        <MapPin size={16} /> <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Globe size={16} /> <span>{user.language}</span>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="w-2/3 flex flex-col p-3 border-l-2 border-brand-light h-full">
                <p className="text-black font-bold text-sm max-sm:text-xs">{user.jobTitle}</p>
                <div className="text-[#5B5252] text-xs mt-2 max-sm:text-xxs max-sm:mt-1 line-clamp-4 overflow-hidden h-[4rem]">
                    {user.description}
                </div>
                <div className="w-full flex flex-wrap gap-y-0 pt-3.5 max-sm:pt-2 overflow-hidden max-sm:overflow-hidden max-h-[5rem] leading-tight">
                    <div className="line-clamp-2 w-full">
                        {user.skills.map((skill) => (
                            <Badge key={skill} variant="skills" className="mr-1.5 max-sm:pt-0.5 max-sm:mr-1">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-1 mt-4 max-sm:mt-2 text-xs text-brand-light font-bold max-sm:text-xxs">
                    <Briefcase size={16} /> <span>{user.experience}</span>
                </div>
            </div>
        </Card>
    );
}
export default UserCard;
