"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";
import { currentUser } from "@clerk/nextjs/server";

export async function createProject(data: ProjectFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = projectSchema.parse(data);

    // Create project
    const project = await db.project.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
        budget: validatedData.budget && validatedData.budget !== "" ? validatedData.budget : null,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        clientId: validatedData.clientId,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/client");

    return { success: true, data: project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create project" 
    };
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = projectSchema.parse(data);

    // Update project
    const project = await db.project.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
        budget: validatedData.budget && validatedData.budget !== "" ? validatedData.budget : null,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        clientId: validatedData.clientId,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath("/client");

    return { success: true, data: project };
  } catch (error) {
    console.error("Error updating project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update project" 
    };
  }
}

export async function deleteProject(id: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete project (will cascade delete milestones and deliverables)
    await db.project.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/client");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete project" 
    };
  }
}

export async function getProjects() {
  try {
    const projects = await db.project.findMany({
      include: {
        client: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            milestones: true,
            deliverables: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch projects" 
    };
  }
}

export async function getProject(id: string) {
  try {
    const project = await db.project.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        milestones: {
          orderBy: {
            order: "asc",
          },
        },
        deliverables: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch project" 
    };
  }
}

export async function getClientProjects(clientId: string) {
  try {
    const projects = await db.project.findMany({
      where: {
        clientId,
      },
      include: {
        _count: {
          select: {
            milestones: true,
            deliverables: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch projects" 
    };
  }
}

