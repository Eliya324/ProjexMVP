"use client";
import { UploadButton, OurFileRouter } from "@/lib/uploadthing";
import { Input } from "./Input";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/Button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Toaster } from 'react-hot-toast';
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from "./form";

export interface FormValues {
  title: string;
  objective: string;
  requiredSkills: string[];
  usedTechnologies: string[];
  shortDescription: string;
  documentPDFs: File[];
}

const skillsList = [
  { value: "problem_solving", label: "Problem Solving" },
  { value: "critical_thinking", label: "Critical Thinking" },
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
  { value: "time_management", label: "Time Management" },
  { value: "adaptability", label: "Adaptability" },
  { value: "creativity", label: "Creativity" },
  { value: "leadership", label: "Leadership" },
  { value: "attention_to_detail", label: "Attention to Detail" },
  { value: "project_management", label: "Project Management" },
];

const technologiesList = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "node.js", label: "Node.js" },
  { value: "express", label: "Express" },
  { value: "mongodb", label: "MongoDB" },
  { value: "sql", label: "SQL" },
  { value: "python", label: "Python" },
  { value: "django", label: "Django" },
  { value: "csharp", label: "C#" },
  { value: "asp.net", label: "ASP.NET" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "git", label: "Git" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "typescript", label: "TypeScript" },
  { value: "graphql", label: "GraphQL" },
  { value: "websockets", label: "WebSockets" }
];

const NewProject = ({ onSubmitForm }: { onSubmitForm: (data: FormValues) => void }) => {
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const methods = useForm<FormValues>()
  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: FormValues) => {
    onSubmitForm(data);
  };

  return (
    <FormProvider {...methods}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto mt-5 flex flex-col items-center space-y-3 p-3 text-black font-['Lato']">
        <h1 className="text-2xl w-3/4 max-sm:text-lg text-center">
          Build your profile to discover opportunities that match your talents
          and unlock your full potential:
        </h1>

        <FormField
          name="title"
          control={methods.control}
          rules={{ required: "Title is required", }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  variant="form"
                />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="objective"
          control={methods.control}
          rules={{ required: "Objective is required", }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>The purpose of the project</FormLabel>
              <FormControl>
                <Input {...field}
                  type="text" variant="form"
                />
              </FormControl>
              <FormMessage>{errors.objective?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="requiredSkills"
          control={methods.control}
          rules={{
            required: "Skills are required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills required</FormLabel>
              <FormControl>
                <MultiSelect className="min-w-[12.5rem] max-w-sm"
                  options={skillsList}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  maxOption={10}
                  maxCount={10}
                />
              </FormControl>
              <FormMessage>{errors.requiredSkills?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="usedTechnologies"
          control={methods.control}
          rules={{
            required: "Technologies are required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Used Technologies</FormLabel>
              <FormControl>
                <MultiSelect className="min-w-[12.5rem] max-w-sm"
                  options={technologiesList}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  maxOption={10}
                  maxCount={10}
                />
              </FormControl>
              <FormMessage>{errors.usedTechnologies?.message}</FormMessage>
            </FormItem>

          )}
        />

        <FormField
          name="shortDescription"
          control={methods.control}
          rules={{
            required: "Description is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>A brief description of the project</FormLabel>
              <FormControl>
                {/* <Input {...field} type="text" variant="form"
                /> */}
                <Textarea {...field} className="form-textarea" />
              </FormControl>
              <FormMessage>{errors.shortDescription?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" >Save</Button>
      </form>
    </FormProvider>
  )
}
export default NewProject;