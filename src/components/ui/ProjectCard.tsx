import { Card, CardContent } from "./card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const ProjectCard = () => {
  const project = {
    techStack: ["React", "Node.js", "Figma", "Tailwind", "SQL", "C#"],
    profiles: Array(3).fill("https://placehold.co/64x62.png"),
    rating: 4.8,
    starCount: 5,
    image: "https://placehold.co/270x150.png",
    name: "Contribution with automation",
    description:
      "Automated donation system with 100% transparency, turning your contributions into essential goods purchased directly, ensuring every donation reaches those in need efficiently and effectively.",
  };

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-[10px] h-[368px] max-sm:h-[495px]",
        "w-[280px] max-sm:w-[90%]"
      )}
    >
      <Image
        className="w-full h-[150px] max-sm:h-[300px] object-cover rounded-[10px]"
        src={project.image}
        alt="Project"
        width={500}
        height={150}
      />

      <CardContent className="relative flex flex-col justify-between h-auto overflow-hidden">
        <div className="mt-2 px-2 h-[79px] max-sm:h-[85px] flex flex-col">
          <div className="text-[15px] max-sm:text-[18px] font-bold text-black leading-tight">
            {project.name}
          </div>
          <div className="text-[13px] text-[#5B5252] mt-1 line-clamp-3 overflow-hidden">
            {project.description}
          </div>
        </div>

        <div className="w-full px-2 pt-1.5 max-sm:pt-0 overflow-hidden h-[3.5rem] max-sm:h-[1.75rem]">
          <div className="w-full flex flex-wrap gap-1.5 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] max-sm:[-webkit-line-clamp:1] leading-tight">
            {project.techStack.map((skill) => (
              <Badge
                key={skill}
                variant="skills"
                className="mr-1.5 max-sm:pt-0.5 max-sm:mr-1 max-sm:h-4"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-left px-2">
          <div className="text-[13px] text-black font-bold">
            {project.rating}
          </div>
          <div className="flex gap-1 px-1.5">
            {[...Array(project.starCount)].map((_, i) => (
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

        <div className="flex gap-2 mt-4 px-2 h-[30px] relative -top-2">
          {project.profiles.map((src, i) => (
            <Image
              key={i}
              className="rounded-full border-[2px] border-blue-light shadow-md absolute"
              style={{ left: `${i * 20}px` }}
              src={src}
              alt={`Profile ${i + 1}`}
              width={38}
              height={38}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
