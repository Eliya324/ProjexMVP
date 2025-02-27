import { Card } from "@/components/ui/card";
import { MapPin, Globe, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
const UserCard = () => {
    const profile = {
        name: "Jony Vtrey",
        imageUrl: "https://placehold.co/70x70.png",
        location: "Israel",
        language: "Hebrew",
        jobTitle: "Full Stack Developer",
        description: "I’m seeking a strategic partnership to drive innovation, streamline processes, and scale impactful solutions...",
        skills: ["React", "Node.js", "C#"],
        experience: "5+ Years"
    };
    return (
        <div className="relative max-w-[320px]">
            <Card className="relative w-full h-[255px] bg-white border border-brand-light rounded-2xl shadow-lg flex max-sm:w-[270px]">
                {/* Profile Section */}
                <div className="w-2/5 flex flex-col pt-12 items-center text-center">
                    <Image
                        className="w-16 h-16 rounded-full border-2 border-brand-light shadow-md"
                        src={profile.imageUrl}
                        alt="Profile"
                        width={64}
                        height={64}
                    />
                    <h2 className="text-brand-light font-bold text-base mt-2">{profile.name}</h2>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-brand-light font-bold">
                        <div className="flex items-center gap-1">
                            <MapPin size={16} /> <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe size={16} /> <span>{profile.language}</span>
                        </div>
                    </div>
                </div>
                {/* Details Section */}
                <div className="w-3/5 flex flex-col justify-center p-4 border-l-2 border-brand-light">

                    <p className="text-brand-light font-bold text-sm">{profile.jobTitle}</p>
                    <p className="text-brand-light text-xs mt-2">{profile.description}</p>

                    <div className="flex overflow-x-auto whitespace-nowrap mt-3 gap-2 scrollbar-thin scrollbar-track-gray-200">
                        {profile.skills.map((skill) => (
                            <Badge
                                key={skill}
                                className="bg-brand-light text-white text-xs font-medium border border-brand-light rounded-full">
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-sm text-brand-light font-bold">
                        <Briefcase size={16} /> <span>{profile.experience}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UserCard;
