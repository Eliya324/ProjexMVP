"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEdit } from "react-icons/fa";
import { useTalent } from "../../contexts/TalentContext";
import { Button } from "./button";

const educationSchema = z.object({
    educations: z.array(
        z.object({
            institution: z.string().optional(),
            degree: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })
    ),
});

type EducationFormValues = z.infer<typeof educationSchema>;
type Education = EducationFormValues["educations"][number];

export default function Step3Form({
    formData,
    updateFormData,
    onNext,
    onPrev,
    isRegistration,
}: {
    formData: any;
    updateFormData: any;
    onNext: (updatedEducations?: EducationFormValues["educations"]) => void;
    onPrev: () => void;
    isRegistration: boolean;
}) {
    const { education, setEducation } = useTalent();
    console.log("isRegistration", isRegistration)
    const sourceData = isRegistration
        ? formData.educations
        : education;

    const defaultData = sourceData && sourceData.length
        ? sourceData.map((edu: Education) => ({
            ...edu,
            startDate: edu.startDate?.split("T")[0] || "",
            endDate: edu.endDate?.split("T")[0] || "",
        }))
        :[{ institution: "", degree: "", startDate: "", endDate: "", description: "" }]

        const { register, control, handleSubmit, watch, reset,getValues } = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: defaultData,
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "educations" });
    const [expandedIndex, setExpandedIndex] = useState(-1);

    // Get today's date for validation
    const today = new Date().toISOString().split("T")[0];
    useEffect(() => {
        if (fields.length > 0 && expandedIndex === -1) {
            setExpandedIndex(0);
        }
    }, [fields]);

    useEffect(() => {
        console.log("formData", formData);
        let source = isRegistration ? formData.educations : education;
        const formattedEducation = source && source.length > 0
            ? source.map((edu: Education) => ({
                ...edu,
                startDate: edu.startDate?.split("T")[0] || "",
                endDate: edu.endDate?.split("T")[0] || "",
            }))
            : [{
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
            }];
        reset({
            educations: formattedEducation,
        });


        setExpandedIndex(formattedEducation.length > 0 ? formattedEducation.length - 1 : 0);
    }, [formData, education, isRegistration, reset]);


    const onSubmit = (data: EducationFormValues) => {
        if (!isRegistration) {
            setEducation(data.educations);
            onNext(data.educations);
        } else {
            updateFormData({
                educations: data.educations,
            });
            onNext();
        }
    };

     const handlePrev = () => {
        const currentData = getValues(); 
        updateFormData({ educations: currentData.educations });
        onPrev();
    }; 



    return (

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mt-6 space-y-6">

            <h2 className="text-3xl font-semibold">Education</h2>
            {!isRegistration && (
                <p className="text-center text-gray-600 mt-2">
                    Build your profile to discover opportunities that match your talents.
                </p>
            )}

            {fields.map((field, index) => {
                // Watch for real-time updates on start and end dates
                const startDate = watch(`educations.${index}.startDate`);
                const endDate = watch(`educations.${index}.endDate`);
                const showError = startDate && endDate && startDate > endDate;

                return (
                    <div key={field.id} className="border rounded-lg p-4 shadow-sm">
                        {/* Header with institution name and edit button */}
                        <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
                            <h3 className="text-lg font-medium text-gray-700">
                                {watch(`educations.${index}.institution`) || "Institution"}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaEdit size={20} />
                            </button>
                        </div>
                        {/* Show form fields only if this section is expanded */}
                        {expandedIndex === index && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-gray-700">Institution</label>
                                        <input {...register(`educations.${index}.institution`)} className="mt-1 w-full p-2 border rounded-md" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700">Degree</label>
                                        <input {...register(`educations.${index}.degree`)} className="mt-1 w-full p-2 border rounded-md" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-gray-700">Start Date</label>
                                        <input type="date" {...register(`educations.${index}.startDate`)} className="mt-1 w-full p-2 border rounded-md" max={today} />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700">End Date</label>
                                        <input type="date" {...register(`educations.${index}.endDate`)} className={`mt-1 w-full p-2 border rounded-md ${showError ? "border-red-500" : ""}`} max={today} />
                                        {showError && <p className="text-red-500 text-sm">End date must be after start date</p>}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea {...register(`educations.${index}.description`)} className="mt-1 w-full p-2 border rounded-md" />
                                </div>
                                {/* Show remove button only if there is more than one education entry */}
                                {fields.length > 1 && (
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        className="mt-4 hover:text-red-800 text-sm"
                                        onClick={() => {
                                            remove(index);
                                            if (expandedIndex === index) {
                                                setExpandedIndex(-1);
                                            } else if (expandedIndex > index) {
                                                setExpandedIndex(expandedIndex - 1);
                                            }
                                        }}
                                    >
                                        Remove Education
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
            {/* Add new education entry */}
            <Button 
                variant="secondary"
                className="w-full"
                onClick={() => {
                    const newIndex = fields.length; // לשמור את האינדקס החדש לפני ההוספה
                    append({ institution: "", degree: "", startDate: "", endDate: "", description: "" });
                    setTimeout(() => setExpandedIndex(newIndex), 0); // להמתין רגע כדי שהסטייט יתעדכן
                }}

            >
                + Add Another Education
            </Button>
            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
                {isRegistration && <Button type="button" variant="secondary" onClick={handlePrev}>
                    Prev
                </Button>
                }
                <Button variant="primary" type="submit">
                    {isRegistration ? 'Next' : 'Update'}
                </Button>
            </div>
        </form>
    );
}
