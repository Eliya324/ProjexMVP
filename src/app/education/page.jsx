"use client";
import { useEffect } from "react";
import Step3Form from "@/components/ui/Step3Form";
import { useRouter } from "next/navigation";
import { useTalent } from "@/contexts/TalentContext";

export default function Education() {
  const router = useRouter();
  const { education, setEducation } = useTalent();

  useEffect(() => {
    console.log("education1 ", education);
  }, [education]);

  const handleUpdate = async (educationsToSend) => {
    try {
      console.log("Sending educations to update:", educationsToSend);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: "educations",
          value: educationsToSend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update education");
      }

      // עדכן את הקונטקסט אחרי שהעדכון הצליח
      setEducation(educationsToSend);

      router.back();
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
        <Step3Form
          formData={{ educations: education }}
          updateFormData={({ educations }) => setEducation(educations)} // נשמר, ליתר ביטחון
          onNext={(educationsArray) => handleUpdate(educationsArray)} // שליחה ישירה מהטופס
          isRegistration={false}
        />
    </div>
  );
}
