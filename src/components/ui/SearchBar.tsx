import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div
            className="relative flex items-center w-[50vw] max-sm:w-4/5 max-sm:h-[55%] sm:w-3.5/5 sm:h-[59%] md:w-4/5 md:h-[64%] lg:h-[70%] lg:w-[43vw]  xl:h-[83%] max-w-4/5 min-w-[200px] 
        h-10 md:h-12 rounded-full border-2 px-4 transition-all duration-200 border-gray-400 bg-gray-100
        focus-within:border-4 focus-within:border-gray-600
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >

            <Search size={24}    className="text-gray-500 max-sm:w-4 max-sm:h-4 sm:w-5 sm-h-5"/>
            <Input
                type="text"
                placeholder="Search for anything"
                className="flex-1   h-full text-lg font-light max-sm:text-[13px] sm:text-[15px] md:text-[17px] Xl:text-[20px] text-gray-500 bg-transparent border-none focus:outline-none w-full"
            />
        </div>

    );
}
