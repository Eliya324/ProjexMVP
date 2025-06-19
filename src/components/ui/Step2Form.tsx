
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEdit } from "react-icons/fa";
import { useTalent } from "@/contexts/TalentContext";
import { Button } from "./button";

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
type ProfessionalExperience = ExperienceFormValues["professionalExperiences"][number];

export default function Step2Form({
    formData,
    updateFormData,
    onNext,
    onPrev,
    isRegistration,
}: {
    formData: any;
    updateFormData: any;
    onNext: (updatedExperiences?: ExperienceFormValues["professionalExperiences"]) => void;
    onPrev: () => void;
    isRegistration: boolean;
}) {
    const { experience, setExperience } = useTalent();
    const sourceData = isRegistration
        ? formData.professionalExperiences
        : experience;

    const defaultData = sourceData && sourceData.length
        ? sourceData.map((exp: ProfessionalExperience) => ({
            ...exp,
            startDate: exp.startDate?.split("T")[0] || "",
            endDate: exp.endDate?.split("T")[0] || "",
        }))
        : [
            {
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ];


    const { register, control, handleSubmit, watch, setValue, reset,getValues } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            professionalExperiences: defaultData,
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



    useEffect(() => {
        console.log("formData", formData);
        let source = isRegistration ? formData.professionalExperiences : experience;
        const formatted = source && source.length > 0
            ? source.map((exp: ProfessionalExperience) => ({
                ...exp,
                startDate: exp.startDate?.split("T")[0] || "",
                endDate: exp.endDate?.split("T")[0] || "",
            }))
            : [{
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
            }];

        reset({
            professionalExperiences: formatted,
        });

        setExpandedIndex(formatted.length > 0 ? formatted.length - 1 : 0);
    }, [formData, experience, isRegistration, reset]);



    const onSubmit = (data: ExperienceFormValues) => {
        console.log("professionalExperiences before update:", formData.professionalExperiences);
        if (!isRegistration) {
            setExperience(data.professionalExperiences);
            onNext(data.professionalExperiences);
        } else {
            updateFormData({ professionalExperiences: data.professionalExperiences });
            onNext();
        }
    };
    const handlePrev = () => {
        const currentData = getValues(); 
        updateFormData({ professionalExperiences: currentData.professionalExperiences });
        onPrev();
    }; 

    const handleCurrentlyWorking = (index: number) => {
        setValue(`professionalExperiences.${index}.endDate`, ""); // Ensure the max date is always today
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mt-6 space-y-6">
            <h2 className="text-3xl font-semibold">Professional Experience</h2>
            {!isRegistration && < p className="text-center text-gray-600 mt-2">
                You can add your work experience or skip this step.
            </p>}

            {
                fields.map((field, index) => {
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
                                        <Button
                                            type="button"
                                            variant="destructive"
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
                                            Remove Experience
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })
            }

            <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() => {
                    append({ jobTitle: "", company: "", startDate: "", endDate: "", description: "" });
                    setExpandedIndex(fields.length);
                }}
            >
                + Add Another Experience
            </Button>

            <div className="flex justify-between mt-6">
                {isRegistration && <Button variant={isRegistration ? "secondary" : "primary"} type="button"  onClick={handlePrev}>
                    Prev
                </Button>
                }
                <Button variant="primary" type="submit">
                    {isRegistration ? 'Next' : 'Update'}
                </Button>
            </div>
        </form >
    );
}
