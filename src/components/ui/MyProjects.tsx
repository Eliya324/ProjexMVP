"use client";
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  status: "In Planning" | "ACTIVE" | "In progress" | "Pending" | "COMPLETED";
  documentPDFs: string[];
  ratings: { rating: number }[];
  relationships: {
    user: {
      profilePicture: string | null;
    };
  }[];
}

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectListCard } from "./ProjectListCard";

export default function MyProjects() {
  const [activeTab, setActiveTab] = useState<"owned" | "member">("owned");
  const [projects, setProjects] = useState<Project[]>([]);
  const [cache, setCache] = useState<{ [key: string]: Project[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache[activeTab]) {
      setProjects(cache[activeTab]);
    } else {
      fetchProjects(activeTab);
    }
  }, [activeTab]);

  async function fetchProjects(type: "owned" | "member") {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects?type=${type}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Project[] = await res.json();
      setProjects(data);
      setCache((prev) => ({ ...prev, [type]: data }));
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const renderProjects = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (projects.length === 0)
      return (
        <p className="text-gray-500 text-lg">
          {activeTab === "owned"
            ? "You have no projects yet."
            : "You are not a member of any projects."}
        </p>
      );
    return projects.map((p) => (
      <ProjectListCard
        key={p.id}
        title={p.title}
        image={p.documentPDFs[0] || "/placeholder.png"}
        rating={
          p.ratings.reduce((sum, r) => sum + r.rating, 0) /
          Math.max(p.ratings.length, 1)
        }
        ratingCount={p.ratings.length}
        status={p.status}
        members={p.relationships.map(
          (r) => r.user.profilePicture || "/avatar.png"
        )}
      />
    ));
  };

  return (
    <div className="mt-[120px] max-sm:w-[62vh] sm:w-[85vh] md:w-[100vh] lg:w-[140vh] xl:w-[170vh] w-[1016px] sm:w-1/2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[40px] p-6 mx-auto overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="w-full"
      >
        <TabsList className="w-full flex justify-start items-center gap-10 px-2 bg-transparent border-b-0">
          <TabsTrigger
            value="owned"
            className="relative max-sm:text-[18px] sm:text-[22px] md:text-[23px] font-lato text-black bg-transparent hover:bg-transparent data-[state=active]:font-bold outline-none data-[state=active]:border-b-4 data-[state=active]:border-[#000080] pb-1"
          >
            My Projects
          </TabsTrigger>
          <TabsTrigger
            value="member"
            className="relative max-sm:text-[18px] sm:text-[22px] md:text-[23px] font-lato text-black bg-transparent hover:bg-transparent data-[state=active]:font-bold outline-none data-[state=active]:border-b-4 data-[state=active]:border-[#000080] pb-1"
          >
            My Membership Projects
          </TabsTrigger>
        </TabsList>

        <div className="w-full h-0 outline outline-[3px] outline-[#D9D9D9] outline-offset-[-1.5px] mt-6" />

        <TabsContent value="owned" className="pt-6 space-y-6">
          {activeTab === "owned" && renderProjects()}
        </TabsContent>

        <TabsContent value="member" className="pt-6 space-y-6">
          {activeTab === "member" && renderProjects()}
        </TabsContent>
      </Tabs>
    </div>
  );
}