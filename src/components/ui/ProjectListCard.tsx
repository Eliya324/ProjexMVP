import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
interface ProjectListCard {
  title: string;
  image: string;
  rating: number;
  ratingCount: number;
  status: string;
  members: string[];
}

export function ProjectListCard({
  title,
  image,
  rating,
  ratingCount,
  status,
  members,
}: ProjectListCard) {
  //Testing to see what the profiles look like using a fake variable-totalMembers
  const totalMembers = 7;
  return (
    <Card className="w-full max-w-[1016px] max-sm:h-[30vh] sm:h-[32vh] h-[270px] p-6 mb-6  shadow-md mx-auto relative ">
      <div className="flex gap-6">
        {/*Project image*/}
        <img
          src={image}
          alt="Project"
          className="max-sm:w-[250px] sm:w-[300px] max-sm:h-[21vh] sm:h-[24vh] h-[240px] rounded-[40px] object-cover border-[4px] border-[rgba(0,0,128,0.77)] "
        />

        <div className="flex flex-col justify-between w-full">
          {/*Title + Rating*/}
          <div className="flex flex-col max-sm:gap-1 sm:gap-2">
            <h2 className="max-sm:text-[19px] sm:text-[21px] sm:mt-[11px] xl:text-[23px] font-bold font-lato text-black leading-snug line-clamp-2 overflow-hidden text-ellipsis ">
              {title}
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-[21px] font-bold font-poppins">
                {rating}
              </span>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[16px] font-lato">({ratingCount})</span>
            </div>
          </div>

          {/* Team Members - Profiles*/}
          <div className="flex items-center -space-x-3 mt-auto">
            {members.length > 0 ? (
              <>
                {/* MD and above – 4 profiles*/}
                {members.slice(0, 4).map((member, idx) => (
                  <img
                    key={idx}
                    src={member}
                    alt={`Member ${idx + 1}`}
                    className="hidden md:inline-block w-[50px] h-[51px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] shadow-md"
                  />
                ))}
                {members.length > 3 && (
                  <div className="hidden md:flex items-center justify-center w-[50px] h-[51px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[15px] font-semibold shadow-md">
                    +{members.length - 4}
                  </div>
                )}

                {/* SM – 3 profiles */}
                {members.slice(0, 3).map((member, idx) => (
                  <img
                    key={`sm-${idx}`}
                    src={member}
                    alt={`Member ${idx + 1}`}
                    className="hidden sm:inline-block md:hidden w-[40px] h-[41px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] shadow-md"
                  />
                ))}
                {members.length > 3 && (
                  <div className="hidden sm:flex md:hidden items-center justify-center w-[40px] h-[41px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[13px] font-semibold shadow-md">
                    +{members.length - 3}
                  </div>
                )}

                {/* MAX-SM – 2 profiles  */}
                {members.slice(0, 2).map((member, idx) => (
                  <img
                    key={`max-sm-${idx}`}
                    src={member}
                    alt={`Member ${idx + 1}`}
                    className="inline-block sm:hidden w-[30px] h-[31px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] shadow-md"
                  />
                ))}
                {members.length > 2 && (
                  <div className="inline-flex sm:hidden items-center justify-center w-[30px] h-[31px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[11px] font-semibold shadow-md">
                    +{members.length - 2}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Testing to see what the profiles look like using a fake variable-totalMembers*/}
                {/* MD – 4 profiles  */}
                {[0, 1, 2, 3].map((_, idx) => (
                  <div
                    key={`md-${idx}`}
                    className="hidden md:inline-block w-[50px] h-[51px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white shadow-md"
                  />
                ))}
                {totalMembers > 3 && (
                  <div className="hidden md:flex items-center justify-center w-[50px] h-[51px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[15px] font-semibold shadow-md">
                    +{totalMembers - 4}
                  </div>
                )}

                {/* SM – profiles 3 */}
                {[0, 1, 2].map((_, idx) => (
                  <div
                    key={`sm-${idx}`}
                    className="hidden sm:inline-block md:hidden w-[40px] h-[41px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white shadow-md"
                  />
                ))}
                {totalMembers > 3 && (
                  <div className="hidden sm:flex md:hidden items-center justify-center w-[40px] h-[41px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[13px] font-semibold shadow-md">
                    +{totalMembers - 3}
                  </div>
                )}
                {/* MAX-SM – profiles  2 */}
                {[0, 1].map((_, idx) => (
                  <div
                    key={`max-sm-${idx}`}
                    className="inline-block sm:hidden w-[30px] h-[31px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white shadow-md"
                  />
                ))}
                {totalMembers > 2 && (
                  <div className="inline-flex sm:hidden items-center justify-center w-[30px] h-[31px] rounded-full border-[2px] border-[rgba(0,0,128,0.77)] bg-white text-[11px] font-semibold shadow-md">
                    +{totalMembers - 2}
                  </div>
                )}
              </>
            )}
          </div>
          {/* סטטוס */}
          <div className="absolute right-6 bottom-6 max-sm:text-[13px] text-[15px] font-lato tracking-wide">
            {status}
          </div>
        </div>
      </div>
    </Card>
  );
}
