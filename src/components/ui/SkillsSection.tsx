import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";

type SkillsSectionProps = {
    skills: string[] | null;
    isEditing: boolean;
    onAddSkill: (newSkill: string) => void;
    onRemoveSkill: (skillToRemove: string) => void;
    onSaveChange: () => void;
};

const SkillsSection = ({ skills, isEditing, onAddSkill, onRemoveSkill, onSaveChange }: SkillsSectionProps) => {
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        if (newSkill) {
            onAddSkill(newSkill);
            setNewSkill("");
        }
    };

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <Card>
                <CardContent className="p-4 flex flex-wrap gap-2">
                    {isEditing ? (
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddSkill();
                                }
                            }}
                            placeholder="Add new skill"
                            className="border p-2 rounded"
                        />
                    ) : null}
                    {skills && skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <div key={index}
                                className="flex items-center gap-2 border border-gray-300 bg-gray-100 text-gray-800 px-3 py-1 rounded-full shadow-sm">

                                <span className="text-sm">{skill}</span>
                                {isEditing && (
                                    <Button onClick={() => onRemoveSkill(skill)}
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-800 font-bold text-base">
                                        ✕
                                    </Button>
                                )}
                            </div>
                        ))

                    ) : (
                        <div>No skills available</div>
                    )}
                    {isEditing && <Button onClick={onSaveChange} variant="primary">Save Changes</Button>}
                </CardContent>
            </Card>
        </section>
    );
};

export default SkillsSection;
