// import { useState } from "react";
// import { Input } from "@/components/ui/Input";

// const languages = ["English", "Spanish", "Hebrew", "French", "German"];

// interface LanguageSelectorProps {
//   onSelect: (language: string) => void;
// }

// export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
//   const [query, setQuery] = useState("");
//   const [filteredLanguages, setFilteredLanguages] = useState(languages);
//   const [isOpen, setIsOpen] = useState(false); // ✅ מצב חדש לקביעת האם התפריט פתוח

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);
//     setIsOpen(true); // ✅ פותח את הרשימה בכל שינוי של הטקסט

//     const filtered = languages.filter((lang) =>
//       lang.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredLanguages(filtered);
//   };

//   const handleSelect = (language: string) => {
//     setQuery(language);
//     onSelect(language);
//     setIsOpen(false); // ✅ סוגר את התפריט אחרי בחירה
//   };

//   return (
//     <div className="relative">
//       <Input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Start typing a language..."
//         className="border rounded-lg p-2 w-full"
//         onFocus={() => setIsOpen(true)} // ✅ פותח את הרשימה כשמקליקים על השדה
//       />
//       {isOpen && query && (
//         <div className="absolute bg-white border rounded-md shadow-md w-full mt-1 max-h-40 overflow-y-auto">
//           {filteredLanguages.length > 0 ? (
//             filteredLanguages.map((lang) => (
//               <div
//                 key={lang}
//                 className="p-2 cursor-pointer hover:bg-gray-200"
//                 onClick={() => handleSelect(lang)}
//               >
//                 {lang}
//               </div>
//             ))
//           ) : (
//             <div className="p-2 text-gray-500">No results found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";

const languages = ["English", "Spanish", "Hebrew", "French", "German"];

interface LanguageSelectorProps {
  onSelect: (languages: string[]) => void;
  defaultLanguages?: string[]; // הוספת ברירת מחדל
}

export default function LanguageSelector({ onSelect, defaultLanguages = [] }: LanguageSelectorProps) {
  const [query, setQuery] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(defaultLanguages);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedLanguages(defaultLanguages);
  }, [defaultLanguages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setIsOpen(true);

    const filtered = languages.filter(
      (lang) =>
        lang.toLowerCase().includes(value.toLowerCase()) &&
        !selectedLanguages.includes(lang)
    );
    setFilteredLanguages(filtered);
  };

  const handleSelect = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      const updatedLanguages = [...selectedLanguages, language];
      setSelectedLanguages(updatedLanguages);
      onSelect(updatedLanguages);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleRemove = (language: string) => {
    const updatedLanguages = selectedLanguages.filter((lang) => lang !== language);
    setSelectedLanguages(updatedLanguages);
    onSelect(updatedLanguages);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Start typing a language..."
        className="border rounded-lg p-2 w-full"
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && query && (
        <div className="absolute bg-white border rounded-md shadow-md w-full mt-1 max-h-40 overflow-y-auto">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <div
                key={lang}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(lang)}
              >
                {lang}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {/* הצגת השפות שנבחרו */}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedLanguages.map((lang) => (
          <span
            key={lang}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center"
          >
            {lang}
            <button
              type="button"
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemove(lang)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
