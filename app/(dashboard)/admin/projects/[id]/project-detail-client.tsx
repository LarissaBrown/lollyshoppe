"use client";

import { useState } from "react";
import Link from "next/link";
import { MilestoneForm } from "@/components/dashboard/milestone-form";
import { deleteMilestone, toggleMilestoneComplete } from "@/app/actions/milestones";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, Circle, Edit, Trash2 } from "lucide-react";
import type { Prisma } from "@prisma/client";

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  completedAt: Date | null;
  order: number;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Deliverable = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string | null;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: Prisma.Decimal | null;
  startDate: Date | null;
  endDate: Date | null;
  client: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  milestones: Milestone[];
  deliverables: Deliverable[];
  createdAt: Date;
};

interface ProjectDetailClientProps {
  project: Project;
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

export function ProjectDetailClient({ project: initialProject }: ProjectDetailClientProps) {
  const [isMilestoneFormOpen, setIsMilestoneFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const { toast } = useToast();

  const completedMilestones = initialProject.milestones.filter(m => m.completedAt).length;
  const totalMilestones = initialProject.milestones.length;
  const progressPercentage = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) 
    : 0;

  async function handleDeleteMilestone(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const result = await deleteMilestone(id, initialProject.id);

    if (result.success) {
      toast({
        title: "Milestone deleted",
        description: `Successfully deleted ${title}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete milestone",
      });
    }
  }

  async function handleToggleComplete(id: string) {
    const result = await toggleMilestoneComplete(id, initialProject.id);

    if (result.success) {
      toast({
        title: "Milestone updated",
        description: result.data?.completedAt ? "Marked as complete" : "Marked as incomplete",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to update milestone",
      });
    }
  }

  function handleEditMilestone(milestone: Milestone) {
    setEditingMilestone(milestone);
    setIsMilestoneFormOpen(true);
  }

  function handleCloseMilestoneForm() {
    setIsMilestoneFormOpen(false);
    setEditingMilestone(null);
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{initialProject.title}</h1>
              <Badge 
                variant="outline" 
                className={STATUS_COLORS[initialProject.status] || ""}
              >
                {STATUS_LABELS[initialProject.status] || initialProject.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Client: {initialProject.client.firstName && initialProject.client.lastName
                ? `${initialProject.client.firstName} ${initialProject.client.lastName}`
                : initialProject.client.email}
            </p>
          </div>
          <Link href={`/admin/projects/${initialProject.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            {initialProject.description}
          </p>
          
          <div className="grid gap-4 md:grid-cols-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Budget</p>
              <p className="font-semibold">
                {initialProject.budget ? `$${parseFloat(initialProject.budget.toString()).toLocaleString()}` : "Not set"}
              </p>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-1">Timeline</p>
              <p className="font-semibold">
                {initialProject.startDate && initialProject.endDate
                  ? `${formatDate(initialProject.startDate)} - ${formatDate(initialProject.endDate)}`
                  : "Not set"}
              </p>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-1">Progress</p>
              <p className="font-semibold">
                {completedMilestones} / {totalMilestones} milestones ({progressPercentage}%)
              </p>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-1">Deliverables</p>
              <p className="font-semibold">{initialProject.deliverables.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Track project progress with milestones</CardDescription>
            </div>
            <Button onClick={() => setIsMilestoneFormOpen(true)}>
              + Add Milestone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {initialProject.milestones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-6xl mb-4">🎯</span>
              <p className="text-muted-foreground mb-4">
                No milestones yet. Add your first milestone to track progress.
              </p>
              <Button onClick={() => setIsMilestoneFormOpen(true)}>
                Add First Milestone
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {initialProject.milestones.map((milestone, index) => (
                <div key={milestone.id}>
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <button
                      onClick={() => handleToggleComplete(milestone.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {milestone.completedAt ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className={`font-semibold ${milestone.completedAt ? 'line-through text-muted-foreground' : ''}`}>
                            {milestone.title}
                          </h4>
                          {milestone.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {milestone.description}
                            </p>
                          )}
                          {milestone.dueDate && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Due: {formatDate(milestone.dueDate)}
                              {milestone.completedAt && ` • Completed: ${formatDate(milestone.completedAt)}`}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMilestone(milestone)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMilestone(milestone.id, milestone.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < initialProject.milestones.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Deliverables</CardTitle>
              <CardDescription>Files and assets delivered to the client</CardDescription>
            </div>
            <Button variant="outline">
              + Add Deliverable
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {initialProject.deliverables.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-6xl mb-4">📦</span>
              <p className="text-muted-foreground mb-4">
                No deliverables yet. Add files and assets as you complete work.
              </p>
              <Button variant="outline">
                Add First Deliverable
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {initialProject.deliverables.map((deliverable) => (
                <div key={deliverable.id} className="flex items-start gap-3 p-4 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-semibold">{deliverable.title}</h4>
                    {deliverable.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {deliverable.description}
                      </p>
                    )}
                    {deliverable.fileUrl && (
                      <a 
                        href={deliverable.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View File →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestone Form Dialog */}
      <MilestoneForm
        open={isMilestoneFormOpen}
        onOpenChange={handleCloseMilestoneForm}
        projectId={initialProject.id}
        milestone={editingMilestone || undefined}
        nextOrder={initialProject.milestones.length}
      />
    </>
  );
}

