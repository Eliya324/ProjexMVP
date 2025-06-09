"use client";
import { useTalent } from "@/contexts/TalentContext";
import FormPageWrapper from "@/components/ui/FormPageWrapper";
import Step3Form from "@/components/ui/Step3Form";

export default function EducationPage() {
  const { education, setEducation } = useTalent();

  return (
    <FormPageWrapper
      field="educations"
      value={education}
      setValue={setEducation}
      FormComponent={Step3Form}
      formPropKey="educations"
    />
  );
}
