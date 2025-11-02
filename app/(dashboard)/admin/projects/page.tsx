import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProjectsClient } from "./projects-client";
import { getProjects } from "@/app/actions/projects";
import { getClients } from "@/app/actions/users";

export const metadata = {
  title: "Projects - Admin Dashboard",
  description: "Manage all client projects",
};

export default async function AdminProjectsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch projects and clients
  const [projectsResult, clientsResult] = await Promise.all([
    getProjects(),
    getClients(),
  ]);

  const projects = projectsResult.success && projectsResult.data ? projectsResult.data : [];
  const clients = clientsResult.success && clientsResult.data ? clientsResult.data : [];

  return (
    <div className="container py-8">
      <ProjectsClient projects={projects} clients={clients} />
    </div>
  );
}

