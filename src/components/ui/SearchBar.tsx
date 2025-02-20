import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div
            className="relative flex items-center w-[50vw] xs:w-[60vw] sm:w-[50vw] md:w-[40vw] max-w-4/5 min-w-[200px] 
        h-10 md:h-12 rounded-full border-2 px-4 transition-all duration-200 border-gray-400 bg-gray-100
        focus-within:border-4 focus-within:border-gray-600"
        >

            <Search size={24} className="text-gray-500" />
            <Input
                type="text"
                placeholder="Search for anything"
                className="flex-1 ml-4 h-full text-lg font-light text-gray-500 bg-transparent border-none focus:outline-none w-full"
            />
        </div>

    );
}
