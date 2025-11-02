import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { ProjectDetailClient } from "./project-detail-client";
import { getProject } from "@/app/actions/projects";

export const metadata = {
  title: "Project Details - Admin Dashboard",
  description: "View and manage project details, milestones, and deliverables",
};

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { id } = await params;

  // Fetch project with all relations
  const projectResult = await getProject(id);

  if (!projectResult.success || !projectResult.data) {
    notFound();
  }

  return (
    <div className="container py-8">
      <ProjectDetailClient project={projectResult.data} />
    </div>
  );
}

