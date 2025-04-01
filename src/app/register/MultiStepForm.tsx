"use client";
import { useState,useEffect } from "react";
import Step1Form from "@/components/ui/Step1Form";
import Step2Form from "@/components/ui/Step2Form";
import Step3Form from "@/components/ui/Step3Form";
import RegistrationHeader from "@/components/ui/RegistrationHeader";
import { useRouter } from "next/navigation";

type FormData = {
  contactPhone: string;
  location: string;
  languagesSpoken: string[];
  skills: string[];
  personalSummary: string;
  professionalExperiences: {
    company?: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  educations: {
    institution?: string;
    degree?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  additionalInfo: string;
  resumeFile: File | null;
};


export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    contactPhone: "",
    location: "",
    languagesSpoken: [],
    skills: [],
    personalSummary: "",
    professionalExperiences: [],
    educations: [],
    additionalInfo: "",
    resumeFile: null
  });

const updateFormData = (newData: Partial<FormData>) => {
  setFormData((prev) => {
      console.log("🔄 Merging formData:", { ...prev, ...newData }); // בדיקת נתונים
      
      return {
          ...prev,
          ...newData,
      };
  });
};

// Submit form automatically when step 3 is reached and education data is available
useEffect(() => {
  if (step === 3 && formData.educations.length > 0) {
    submitForm();
  }
}, [formData]); 


  // Go to the next step
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } 
  };

  // Back to the previous step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };


  const submitForm = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile");
    }
  };



  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <RegistrationHeader step={step} totalSteps={3} />

      <div className="mt-10 w-full max-w-2xl">
        {step === 1 && <Step1Form formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
        {step === 2 && <Step2Form formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <Step3Form formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />}

      </div>
    </div>
  );
}
