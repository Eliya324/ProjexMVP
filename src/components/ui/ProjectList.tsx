"use client"

import { Card, CardContent } from "@/components/ui/card"

type Project = {
  id: string
  title: string
  description?: string
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-2">
      {projects.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-4">No followed projects</p>
      ) : (
        projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <p className="font-semibold">{project.title}</p>
              <p className="text-sm text-gray-600">
                {project.description || "No description provided."}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
