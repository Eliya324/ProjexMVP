"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  field: string;
  value: any[];
  setValue: (newValue: any[]) => void;
  FormComponent: React.ComponentType<any>;
  formPropKey: string;
};

export default function FormPageWrapper({
  field,
  value,
  setValue,
  FormComponent,
  formPropKey,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    console.log(`${field} data:`, value);
  }, [value]);

  const handleUpdate = async (newValues: any[]) => {
    try {
      console.log("Sending to update:", newValues);
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value: newValues }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setValue(newValues);
      router.back();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const formData = { [formPropKey]: value };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <FormComponent
        formData={formData}
        updateFormData={(updated: any) => setValue(updated[formPropKey])}
        onNext={handleUpdate}
        isRegistration={false}
      />
    </div>
  );
}