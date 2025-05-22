
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import LanguageSelector from "./LanguageSelector";
import SkillsInput from "./SkillsInput";



const formSchema = z.object({
  phone: z.string().regex(/^\d+$/, "Phone number must contain only numbers").optional().or(z.literal("")),
  location: z.string().min(2, "Location must be at least 2 characters").optional().or(z.literal("")),
  languagesSpoken: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional(),
  summary: z.string().optional(),
});

export default function Step1Form({
  formData,
  updateFormData,
  onNext,
}: {
  formData: any;
  updateFormData: any;
  onNext: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",  // Validation runs when the user leaves a field
    defaultValues: formData,  // Validation runs when the user leaves a field
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    onNext();
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-semibold text-violet-900">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {/* Phone Number Input */}
            <div>
              <label className="block text-lg font-medium">Phone Number</label>
              <Input
                type="text"
                {...register("phone")}
                className="mt-2"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-lg font-medium">Location</label>
              <Input
                type="text"
                {...register("location")}
                className="mt-2"
                placeholder="Enter your location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message as string}</p>}
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-lg font-medium">Languages *</label>
              <LanguageSelector
                defaultLanguages={formData.languagesSpoken || []} //]
                onSelect={(values: string[]) => {
                  setValue("languagesSpoken", values);
                  updateFormData({ languagesSpoken: values });
                  trigger("languagesSpoken");
                }}
              />
              {errors.languagesSpoken?.message && (
                <p className="text-red-500 text-sm">{String(errors.languagesSpoken.message)}</p>
              )}
            </div>

            {/* Skills Input*/}
            <div>
              <SkillsInput
                defaultSkills={formData.skills || []}
                onChange={(skills) => {
                  setValue("skills", skills);
                  updateFormData({ skills });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">

            {/* Personal Summary Textarea*/}
            <div>
              <label className="block text-lg font-medium">Personal Summary</label>
              <Textarea
                {...register("summary")}
                className="mt-2 min-h-[150px]"
                placeholder="Write about yourself..."
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mt-6">

          <Button type="submit"
            className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg" onClick={() => console.log("Button clicked")}>
            Continue
          </Button>

        </div>
      </form>
  );
}
