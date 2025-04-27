
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState,useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEdit } from "react-icons/fa";

// Schema Validation
const experienceSchema = z.object({
    professionalExperiences: z.array(
        z.object({
            jobTitle: z.string().optional(),
            company: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })
    ),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function Step2Form({
    formData,
    updateFormData,
    onNext,
    onPrev,
}: {
    formData: any;
    updateFormData: any;
    onNext: () => void;
    onPrev: () => void;
}) {
    const { register, control, handleSubmit, watch, setValue } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            professionalExperiences: formData.professionalExperiences.length
            ? formData.professionalExperiences
            : [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }],
        },
        
    });
 
    const { fields, append, remove } = useFieldArray({ control, name: "professionalExperiences" });
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const jobTitles = [
        "Software Engineer",
        "Product Manager",
        "Data Analyst",
        "UX Designer",
        "Marketing Specialist",
        "Sales Manager",
        "Other",
    ];

    const today = new Date().toISOString().split("T")[0]; // Ensure the max date is always today
    useEffect(() => {
        if (fields.length > 0 && expandedIndex === -1) {
            setExpandedIndex(0);
        }
    }, [fields]);
    
    /////-------------
    useEffect(() => {
        console.log("🔥 Updated formData:", formData);
    }, [formData]); // ירוץ כל פעם שהסטייט משתנה
    

        const onSubmit = (data: ExperienceFormValues) => {
            console.log("Full form data:", data);
            console.log("professionalExperiences before update:", formData.professionalExperiences);
            updateFormData({ professionalExperiences: data.professionalExperiences });
            console.log("professionalExperiences after update:", formData.professionalExperiences);
            onNext();
        };

    const handleCurrentlyWorking = (index: number) => {
        setValue(`professionalExperiences.${index}.endDate`, ""); // Ensure the max date is always today
    };

    return (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mt-6 space-y-6">
            <h2 className="text-3xl font-semibold text-violet-900">Professional Experience</h2>
            <p className="text-center text-gray-600 mt-2">
                You can add your work experience or skip this step.
            </p>

                {fields.map((field, index) => {
                    const startDate = watch(`professionalExperiences.${index}.startDate`);
                    const endDate = watch(`professionalExperiences.${index}.endDate`);
                    const showError = startDate && endDate && startDate > endDate;

                    return (
                        <div key={field.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
                                <h3 className="text-lg font-medium text-gray-700">
                                    {watch(`professionalExperiences.${index}.jobTitle`) || "Job Title"}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaEdit size={20} />
                                </button>
                            </div>

                            {expandedIndex === index && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label className="block text-gray-700">Job Title</label>
                                            <select
                                                {...register(`professionalExperiences.${index}.jobTitle`)}
                                                className="mt-1 w-full p-2 border rounded-md"
                                            >
                                                <option value="">Select a job title</option>
                                                {jobTitles.map((title) => (
                                                    <option key={title} value={title}>
                                                        {title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Company*/}
                                        <div>
                                            <label className="block text-gray-700">Company</label>
                                            <input {...register(`professionalExperiences.${index}.company`)} className="mt-1 w-full p-2 border rounded-md" />
                                        </div>
                                    </div>
                                    {/* Dates*/}
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label className="block text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                {...register(`professionalExperiences.${index}.startDate`)}
                                                max={today}
                                                className={`mt-1 w-full p-2 border rounded-md ${showError ? "border-red-500" : ""}`}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">End Date</label>
                                            <input
                                                type="date"
                                                {...register(`professionalExperiences.${index}.endDate`)}
                                                max={today}
                                                className={`mt-1 w-full p-2 border rounded-md ${showError ? "border-red-500" : ""}`}
                                            />
                                            {showError && <p className="text-red-500 text-sm">End date must be after start date</p>}
                                        </div>
                                    </div>
                                    {/* Description*/}
                                    <div className="mt-4">
                                        <label className="block text-gray-700">Description</label>
                                        <textarea {...register(`professionalExperiences.${index}.description`)} className="mt-1 w-full p-2 border rounded-md" />
                                    </div>

                                    <div className="flex items-center mt-4">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCurrentlyWorking(index)}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-600">Currently working here</label>
                                    </div>

                                    {fields.length > 1 && (
                                        <button type="button" className="mt-4 text-black-600 hover:text-red-800 text-sm" onClick={() => remove(index)}>
                                            Remove Experience
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="flex items-center justify-center w-full border rounded-md p-2 bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                        append({ jobTitle: "", company: "", startDate: "", endDate: "", description: "" });
                        setExpandedIndex(fields.length);
                    }}
                >
                    + Add Another Experience
                </button>

                <div className="flex justify-between mt-6">
                    <button type="button" className="px-4 py-2 border border-gray-400 text-gray-600 rounded-md" onClick={onPrev}>
                        Prev
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Next
                    </button>
                </div>
            </form>
    );
}
