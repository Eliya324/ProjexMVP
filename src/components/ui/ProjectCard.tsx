import { Card, CardContent } from "@/components/ui/card";

const ProjectCard = () => {
    const techStack = ["React", "Node.js", "Figma"];
    const profiles = Array(3).fill("https://placehold.co/64x62");
    const rating = 4.8;
    const starCount = 5;
    const projectImage = "https://placehold.co/270x150";
    const projectName = "Contribution with automation";
    const projectDescription = "Automated donation system with 100% transparency, turning your contributions into essential goods purchased directly...";

    return (
        <Card className="w-[280px] flex flex-col overflow-hidden">
            <div className="relative w-full" style={{ height: '150px' }}>
                <img className="w-full h-full object-cover rounded-[20px]" src={projectImage} alt="Project" />
            </div>
            <CardContent className="relative flex flex-col justify-between h-auto overflow-hidden">
                <div className="mt-4 px-2 flex-1">
                    <div className="text-[15px] font-bold text-black leading-tight">
                        {projectName}
                    </div>
                    <div className="text-[13px] text-[#5B5252] mt-2">
                        {projectDescription}
                    </div>
                </div>
                <div className="flex overflow-x-auto whitespace-nowrap mt-4 gap-2 px-2">
                    {techStack.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-800 text-white text-xs font-medium rounded-full border border-blue-800"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-left mt-2 px-2">
                    <div className="text-[13px] text-black font-bold">{rating}</div>
                    <div className="flex gap-1 px-1.5">
                        {[...Array(starCount)].map((_, i) => (
                            <div key={i}>
                                <svg width="12" height="13" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2139 0L16.3657 7.97456L24.4278 9.92771L18.9316 16.8094L19.7625 25.9911L12.2139 22.2697L4.6653 25.9911L5.49627 16.8094L0 9.92771L8.06218 7.97456L12.2139 0Z" fill="#DFB300" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 mt-4 px-2 h-[30px] relative -top-2">
                    {profiles.map((src, i) => (
                        <img
                            key={i}
                            className="w-[38px] h-[40] rounded-full border-[2px] border-blue-800 shadow-md absolute"
                            style={{
                                left: `${i * 20}px`,
                                zIndex: 10 - i,
                            }}
                            src={src}
                            alt={`Profile ${i + 1}`}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
