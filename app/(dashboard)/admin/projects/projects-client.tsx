"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectForm } from "@/components/dashboard/project-form";
import { deleteProject } from "@/app/actions/projects";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: Prisma.Decimal | null;
  startDate: Date | null;
  endDate: Date | null;
  clientId: string;
  client: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  _count: {
    milestones: number;
    deliverables: number;
  };
  createdAt: Date;
};

type Client = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

interface ProjectsClientProps {
  projects: Project[];
  clients: Client[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  REVIEW: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function ProjectsClient({ projects: initialProjects, clients }: ProjectsClientProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also delete all associated milestones and deliverables.`)) {
      return;
    }

    const result = await deleteProject(id);

    if (result.success) {
      toast({
        title: "Project deleted",
        description: `Successfully deleted ${title}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete project",
      });
    }
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage all client projects and track their progress.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          + New Project
        </Button>
      </div>

      {initialProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-6xl mb-4">📊</span>
            <p className="text-muted-foreground mb-4">
              No projects yet. Create your first project to get started.
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              Create First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {initialProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="flex items-center gap-3">
                      {project.title}
                      <Badge 
                        variant="outline" 
                        className={STATUS_COLORS[project.status] || ""}
                      >
                        {STATUS_LABELS[project.status] || project.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Client: {project.client.firstName && project.client.lastName
                        ? `${project.client.firstName} ${project.client.lastName}`
                        : project.client.email}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button
                        variant="default"
                        size="sm"
                      >
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProject(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Budget</p>
                    <p className="font-semibold">
                      {project.budget ? formatCurrency(parseFloat(project.budget.toString())) : "Not set"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Timeline</p>
                    <p className="font-semibold">
                      {project.startDate && project.endDate
                        ? `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`
                        : "Not set"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Milestones</p>
                    <p className="font-semibold">{project._count.milestones}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Deliverables</p>
                    <p className="font-semibold">{project._count.deliverables}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProjectForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        clients={clients}
      />

      {editingProject && (
        <ProjectForm
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          project={editingProject}
          clients={clients}
        />
      )}
    </>
  );
}

