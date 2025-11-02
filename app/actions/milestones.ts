"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { milestoneSchema, type MilestoneFormData } from "@/lib/validations/project";
import { currentUser } from "@clerk/nextjs/server";

export async function createMilestone(data: MilestoneFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = milestoneSchema.parse(data);

    // Create milestone
    const milestone = await db.milestone.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        order: validatedData.order,
        projectId: validatedData.projectId,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${validatedData.projectId}`);
    revalidatePath("/client");

    return { success: true, data: milestone };
  } catch (error) {
    console.error("Error creating milestone:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create milestone" 
    };
  }
}

export async function updateMilestone(id: string, data: MilestoneFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = milestoneSchema.parse(data);

    // Update milestone
    const milestone = await db.milestone.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        order: validatedData.order,
        projectId: validatedData.projectId,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${validatedData.projectId}`);
    revalidatePath("/client");

    return { success: true, data: milestone };
  } catch (error) {
    console.error("Error updating milestone:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update milestone" 
    };
  }
}

export async function deleteMilestone(id: string, projectId: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete milestone
    await db.milestone.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/client");

    return { success: true };
  } catch (error) {
    console.error("Error deleting milestone:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete milestone" 
    };
  }
}

export async function toggleMilestoneComplete(id: string, projectId: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Get current milestone
    const milestone = await db.milestone.findUnique({
      where: { id },
      select: { completedAt: true },
    });

    if (!milestone) {
      return { success: false, error: "Milestone not found" };
    }

    // Toggle completion
    const updated = await db.milestone.update({
      where: { id },
      data: {
        completedAt: milestone.completedAt ? null : new Date(),
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/client");

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error toggling milestone:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to toggle milestone" 
    };
  }
}

export async function reorderMilestones(projectId: string, milestoneIds: string[]) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Update order for each milestone
    await Promise.all(
      milestoneIds.map((id, index) =>
        db.milestone.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/client");

    return { success: true };
  } catch (error) {
    console.error("Error reordering milestones:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to reorder milestones" 
    };
  }
}

export async function getMilestones(projectId: string) {
  try {
    const milestones = await db.milestone.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });

    return { success: true, data: milestones };
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch milestones" 
    };
  }
}

