import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { InvoicesClient } from "./invoices-client";
import { getInvoices } from "@/app/actions/invoices";
import { getClients } from "@/app/actions/users";
import { getProjects } from "@/app/actions/projects";

export const metadata = {
  title: "Invoices - Admin Dashboard",
  description: "Manage client invoices and payments",
};

export default async function AdminInvoicesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch invoices, clients, and projects
  const [invoicesResult, clientsResult, projectsResult] = await Promise.all([
    getInvoices(),
    getClients(),
    getProjects(),
  ]);

  const invoices = invoicesResult.success && invoicesResult.data ? invoicesResult.data : [];
  const clients = clientsResult.success && clientsResult.data ? clientsResult.data : [];
  const projects = projectsResult.success && projectsResult.data ? projectsResult.data : [];

  return (
    <div className="container py-8">
      <InvoicesClient invoices={invoices} clients={clients} projects={projects} />
    </div>
  );
}

