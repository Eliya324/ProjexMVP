import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div
      className="
        flex items-center
        w-full max-w-[600px]
        h-8 lg:h-8 
        rounded-full border-2 px-4
        transition-all duration-200 border-gray-400 bg-gray-100
        focus-within:border-4 focus-within:border-gray-600
      "
    >
      <Search
        size={24}
        className="text-gray-500 max-sm:w-4 max-sm:h-4 sm:w-5 sm:h-5"
      />
      <Input
        type="text"
        placeholder="Search for anything"
        className="
          flex-1 h-full text-lg font-light
          max-sm:text-[13px] sm:text-[15px]  
          text-gray-500 bg-transparent border-none focus:outline-none w-full
        "
      />
    </div>
  );
}
