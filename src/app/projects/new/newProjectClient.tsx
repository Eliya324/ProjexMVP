"use client";
import NewProject from "@/components/ui/NewProject";
import { useState } from "react";
import { FormValues } from "@/components/ui/NewProject";

export default function NewProjectClient() {
    const [formData, setFormData] = useState<FormValues>({
        title: "",
        shortDescription: "",
        objective: "",
        requiredSkills: [],
        usedTechnologies: [],
        documentPDFs: []
    });

    const handleSubmit = async (formData: FormValues) => {
        try {
            const projectData = {
                title: formData.title,
                shortDescription: formData.shortDescription,
                objective: formData.objective || null,
                requiredSkills: formData.requiredSkills || [],
                usedTechnologies: formData.usedTechnologies || [],
                missingTalents: [],
                status: "ACTIVE",
                documentPDFs: formData.documentPDFs || [],
                relationships: {
                    create: []
                },
                posts: {
                    create: []
                },
                ratings: {
                    create: []
                }
            };

            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit the project");
            }

            const result = await response.json();
            alert("Success!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit the project");
        }
    };

    return <NewProject onSubmitForm={handleSubmit} />
}