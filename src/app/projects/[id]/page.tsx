"use client";
import { useEffect, useState } from "react";
import ProjectProfile from "@/components/ui/ProjectProfile";

export default function ProjectProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const [project, setProject] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await params;
                setId(resolvedParams.id);
                
                if (resolvedParams.id) {
                    const res = await fetch(`/api/projects/${resolvedParams.id}`);
                    const data = await res.json();
                    setProject(data);
                }
            } catch (err) {
                setError("Error fetching project data");
            }
        };

        fetchData();
    }, [params]); // טריגר על params

    if (error) return <div>{error}</div>;
    if (!project) return <div>Loading...</div>;

    return <ProjectProfile projectd={project} />;
}
