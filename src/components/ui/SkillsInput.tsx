import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./button";

interface SkillsInputProps {
  onChange: (skills: string[]) => void;
  defaultSkills?: string[];
}

export default function SkillsInput({ onChange, defaultSkills = [] }: SkillsInputProps) {
  const [skills, setSkills] = useState<string[]>(defaultSkills);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    setSkills(defaultSkills);
  }, [defaultSkills]);

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skill.trim()) {
      e.preventDefault();
      if (!skills.includes(skill.trim())) {
        const updatedSkills = [...skills, skill.trim()];
        setSkills(updatedSkills);
        onChange(updatedSkills);
      }
      setSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  return (
    <div>
      <label className="block text-lg font-medium">Skills *</label>
      <Input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={addSkill}
        placeholder="Type a skill and press Enter"
        className="mt-2"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2">
            {s}
            <Button
              type="button"
              onClick={() => removeSkill(s)}
              variant="ghost"
              className="text-red-600 hover:text-red-800 font-bold text-base"
            >
              ✕
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
}
