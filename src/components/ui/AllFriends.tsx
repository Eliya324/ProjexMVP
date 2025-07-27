"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import UserList from "@/components/ui/UserList"
import ConnectionRequestsList from "@/components/ui/ConnectionRequestsList"
import ProjectList from "@/components/ui/ProjectList"


export default function FollowersPage() {
    const [view, setView] = useState<"Connections" | "Projects">("Connections")
    const [tabs, setTabs] = useState<string[]>([])
    const [projectList, setProjectList] = useState<any[]>([])
    const [selectedProject, setSelectedProject] = useState<string>("")
    const [selectedTab, setSelectedTab] = useState<string>("")
    const [projectConnections, setProjectConnections] = useState<{
        [projectId: string]: {
            contributors: any[];
            followers: any[];
            pendingRequests: any[];
        };
    }>({});

    const [connectionsData, setConnectionsData] = useState<Record<string, any[]>>({})


    const tabsByView = {
        Connections: ["followers", "following", "projectFollowing", "ConnectionRequests"],
        Projects: ["contributes", "Followers of my project", "requests"],
    }

    const refreshProjectConnections = async (projectId: string) => {
        try {
            const res = await fetch(`/api/projects/${projectId}/connections`);
            const data = await res.json();
            setProjectConnections(prev => ({
                ...prev,
                [projectId]: {
                    contributors: data.contributors || [],
                    followers: data.followers || [],
                    pendingRequests: data.pendingRequests || [],
                }
            }));
        } catch (err) {
            console.error("Error refreshing project connections:", err);
        }
    };
    const refreshConnections = async () => {
        if (view === "Connections") {
            try {
                const res = await fetch(`/api/connections`);
                const data = await res.json();
                setConnectionsData(data);
            } catch (err) {
                console.error("Error refreshing connections:", err);
            }
        } else if (view === "Projects") {
            await refreshProjectConnections(selectedProject);
        }
    };


    useEffect(() => {
        setTabs(tabsByView[view])
        setSelectedTab(tabsByView[view][0])
    }, [view])

    useEffect(() => {
        getUsersForSelectedTab();
    }, [selectedProject, selectedTab]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                if (view == "Connections") {
                    const res = await fetch(`/api/connections`)
                    const data = await res.json()
                    console.log("data", data);

                    setConnectionsData(data)

                } else if (view == "Projects") {
                    const res = await fetch(`/api/projects?type=owned`)
                    const projects = await res.json()
                    setProjectList(projects)
                    if (projects.length > 0) {
                        setSelectedProject(projects[0]._id || projects[0].id)

                        const allConnections: {
                            [projectId: string]: {
                                contributors: any[];
                                followers: any[];
                                pendingRequests: any[];
                            };
                        } = {};

                        for (const project of projects) {
                            const prjId = project._id || project.id;
                            const res = await fetch(`/api/projects/${prjId}/connections`);
                            const conns = await res.json();
                            allConnections[prjId] = {
                                contributors: conns.contributors || [],
                                followers: conns.followers || [],
                                pendingRequests: conns.pendingRequests || [],
                            };
                        }
                        setProjectConnections(allConnections);

                    }
                }
            } catch (err) {
                console.error("Error loading data:", err)
            }
        }

        fetchAllData()
    }, [view])



    const getUsersForSelectedTab = () => {
        if (view === "Connections") {
            return connectionsData[selectedTab] || [];
        }

        if (view === "Projects" && selectedProject && projectConnections[selectedProject]) {
            const data = projectConnections[selectedProject];

            switch (selectedTab) {
                case "contributes":
                    return data.contributors;
                case "Followers of my project":
                    return data.followers;
                case "requests":
                    return data.pendingRequests;
                default:
                    return [];
            }
        }

        return [];
    };


    return (
        <div className="flex pt-20">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-4 rounded-xl shadow-md mr-4">
                <div className="font-semibold text-lg mb-2">Manage my network</div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setView("Connections")}
                        className={`text-left px-3 py-2 rounded-md ${view === "Connections" ? "bg-blue-100 font-bold" : ""
                            }`}
                    >
                        Connections
                    </button>
                    <button
                        onClick={() => setView("Projects")}
                        className={`text-left px-3 py-2 rounded-md ${view === "Projects" ? "bg-blue-100 font-bold" : ""
                            }`}
                    >
                        Projects
                    </button>
                </div>

                {/* Project List (only if Projects view) */}
                {view === "Projects" && (
                    <div className="mt-4">
                        <div className="text-sm font-semibold mb-1">Select a project:</div>
                        <ul className="text-sm">
                            {projectList.length > 0 && projectList.map((project) => (
                                <li
                                    key={project._id || project.id}
                                    className={`cursor-pointer px-2 py-1 rounded ${selectedProject === (project._id || project.id) ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                                    onClick={() => setSelectedProject(project._id || project.id)}
                                >
                                    {project.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Show selected project name if in Projects view */}
                {view === "Projects" && (
                    <div className="text-xl font-bold mb-4 text-center">
                        Project: {projectList.find(p => (p._id || p.id) === selectedProject)?.title || ""}
                    </div>
                )}

                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] w-full">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab.replace("_", " ")}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            {view === "Connections" ? (
                                tab === "ConnectionRequests" ? (
                                    <ConnectionRequestsList
                                        requests={getUsersForSelectedTab()}
                                        onChange={refreshConnections}
                                    />
                                ) : tab === "projectFollowing" ? (
                                    <ProjectList projects={connectionsData["projectFollowing"] || []} />
                                ) : (
                                    <UserList users={connectionsData[tab] || []} />
                                )
                            ) : view === "Projects" ? (
                                tab === "requests" ? (
                                    <ConnectionRequestsList
                                        requests={getUsersForSelectedTab()}
                                        onChange={() => refreshProjectConnections(selectedProject)}
                                    />
                                ) : (
                                    <UserList users={getUsersForSelectedTab()} />
                                )
                            ) : null}
                        </TabsContent>
                    ))}
                </Tabs>

            </main>
        </div>
    )
}


