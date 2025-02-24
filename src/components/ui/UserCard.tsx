import { Card } from "@/components/ui/card";
import { MapPin, Globe, Briefcase } from "lucide-react";

const UserCard = () => {
    const profile = {
        name: "Jony Vtrey",
        imageUrl: "https://placehold.co/70x70",
        location: "Israel",
        language: "Hebrew",
        jobTitle: "Full Stack Developer",
        description: "I’m seeking a strategic partnership to drive innovation, streamline processes, and scale impactful solutions...",
        skills: ["React", "Node.js", "C#"],
        experience: "5+ Years"
    };
    return (
        <div className="relative max-w-[320px]">
            <Card className="relative w-full h-[255px] bg-white border border-blue-800 rounded-2xl shadow-lg flex">
                {/* Profile Section */}
                <div className="w-2/5 flex flex-col pt-12 items-center text-center">
                    <img
                        className="w-16 h-16 rounded-full border-2 border-blue-800 shadow-md"
                        src={profile.imageUrl}
                        alt="Profile"
                    />
                    <h2 className="text-blue-800 font-bold text-base mt-2">{profile.name}</h2>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-blue-800 font-bold">
                        <div className="flex items-center gap-1">
                            <MapPin size={16} /> <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe size={16} /> <span>{profile.language}</span>
                        </div>
                    </div>
                </div>
                <div className="w-1 bg-blue-800 h-full shrink-0"></div>
                {/* Details Section */}
                <div className="w-3/5 flex flex-col justify-center p-4">
                    <p className="text-blue-800 font-bold text-sm">{profile.jobTitle}</p>
                    <p className="text-blue-800 text-xs mt-2">{profile.description}</p>

                    <div className="flex overflow-x-auto whitespace-nowrap mt-3 gap-2">
                        {profile.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-800 text-white text-xs font-medium rounded-full border border-blue-800"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-sm text-blue-800 font-bold">
                        <Briefcase size={16} /> <span>{profile.experience}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UserCard;
