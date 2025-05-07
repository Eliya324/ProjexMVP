"use client";
import { useEffect } from "react";
import Step2Form from "@/components/ui/Step2Form";
import { useRouter } from "next/navigation";
import { useTalent } from "@/contexts/TalentContext";

export default function Education() {
  const router = useRouter();
  const { experience, setExperience } = useTalent();

  useEffect(() => {
    console.log("experience1 ", experience);
  }, [experience]);

  const handleUpdate = async (experiencesToSend) => {
    try {
      console.log("Sending experiences to update:", experiencesToSend);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field: "professionalExperiences", value: experiencesToSend }),
      });

      if (!response.ok) {
        throw new Error("Failed to update experience");
      }

      // עדכן את הקונטקסט אחרי שהעדכון הצליח
      setExperience(experiencesToSend);

      router.back();
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Step2Form
        formData={{ professionalExperiences: experience }}
        updateFormData={({professionalExperiences }) => setExperience(professionalExperiences)} 
        onNext={(experiencesArray) => handleUpdate(experiencesArray)} // שליחה ישירה מהטופס
        isRegistration={false}
      />
    </div>
  );
}
