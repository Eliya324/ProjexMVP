import { Card, CardContent } from "./card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { datetimeRegex } from "zod";

const ProjectProfile = () => {
  const project = {
    techStack: ["React", "Node.js", "Figma", "Tailwind", "SQL", "C#"],
    profiles: Array(3).fill("https://placehold.co/64x62.png"),
    rating: 4.8,
    starCount: 5,
    image: "https://placehold.co/270x150.png",
    name: "Contribution with automation",
    description:
      "Automated donation system with 100% transparency, turning your contributions into essential goods purchased directly, ensuring every donation reaches those in need efficiently and effectively.",
    comments: [
      {id:1, text:"wow", pic:"https://placehold.co/64x62.png", userName:"@oritvladi", date:datetimeRegex},
      {id:2, text:"awesome", pic:"https://placehold.co/64x62.png", userName:"@oritvladi", date:datetimeRegex},
      {id:3, text:"nice", pic:"https://placehold.co/64x62.png", userName:"@oritvladi", date:datetimeRegex},
      {id:4, text:"omg", pic:"https://placehold.co/64x62.png", userName:"@oritvladi", date:datetimeRegex},
    ]
  };
  const isOwner = false;

  return (
    <>
      <Card className={cn(
        "w-full pt-20"
      )}>
        <CardContent className="p-8">
          <div className="flex ">
            <Image
              className="w-1/2 object-cover rounded-[10px]"
              src={project.image}
              alt="Project"
              width={500}
              height={150}
            />
            <div className="w-1/2 mt-2 px-2 flex flex-col">
              <div className="text-[15px] max-sm:text-[18px] font-bold text-black leading-tight">
                {project.name}
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
            </div>


          </div>
          <div>
            <h4>About the project</h4>
            <div className="text-[13px] text-[#5B5252] mt-1 line-clamp-3 overflow-hidden">
              {project.description}
            </div>
            <h4>Skills & Technologies</h4>
            <div>
              {project.techStack.map((skill) => (
                <Badge
                  key={skill}
                  className="mr-1.5 max-sm:pt-0.5 max-sm:mr-1 max-sm:h-4"
                >
                  {skill}
                </Badge>
              ))}
            </div>

          </div>
          <div>
            Members participating in the project
            <div>
              {project.techStack.map((skill) => (
                <Badge
                  key={skill}
                  className="mr-1.5 max-sm:pt-0.5 max-sm:mr-1 max-sm:h-4"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
              {project.comments.map((comment, index) => (
                  <div className="mr-1.5 max-sm:pt-0.5 max-sm:mr-1 max-sm:h-4">
                  <p>{comment.userName}</p>
                  <p>{comment.text}</p>
                  

                </div>
              ))}
            </div>
        </CardContent>
      </Card>


    </>)
}

export default ProjectProfile;
