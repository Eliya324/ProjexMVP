"use client";
import { useTalent } from "@/contexts/TalentContext";
import FormPageWrapper from "@/components/ui/FormPageWrapper";
import Step2Form from "@/components/ui/Step2Form";

export default function ExperiencePage() {
  const { experience, setExperience } = useTalent();

  return (
    <FormPageWrapper
      field="professionalExperiences"
      value={experience}
      setValue={setExperience}
      FormComponent={Step2Form}
      formPropKey="professionalExperiences"
    />
  );
}
