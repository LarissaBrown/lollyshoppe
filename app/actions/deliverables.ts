"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { deliverableSchema, type DeliverableFormData } from "@/lib/validations/project";
import { currentUser } from "@clerk/nextjs/server";

export async function createDeliverable(data: DeliverableFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = deliverableSchema.parse(data);

    // Create deliverable
    const deliverable = await db.deliverable.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        fileUrl: validatedData.fileUrl && validatedData.fileUrl !== "" ? validatedData.fileUrl : null,
        projectId: validatedData.projectId,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${validatedData.projectId}`);
    revalidatePath("/client");

    return { success: true, data: deliverable };
  } catch (error) {
    console.error("Error creating deliverable:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create deliverable" 
    };
  }
}

export async function updateDeliverable(id: string, data: DeliverableFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = deliverableSchema.parse(data);

    // Update deliverable
    const deliverable = await db.deliverable.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        fileUrl: validatedData.fileUrl && validatedData.fileUrl !== "" ? validatedData.fileUrl : null,
        projectId: validatedData.projectId,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${validatedData.projectId}`);
    revalidatePath("/client");

    return { success: true, data: deliverable };
  } catch (error) {
    console.error("Error updating deliverable:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update deliverable" 
    };
  }
}

export async function deleteDeliverable(id: string, projectId: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete deliverable
    await db.deliverable.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/client");

    return { success: true };
  } catch (error) {
    console.error("Error deleting deliverable:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete deliverable" 
    };
  }
}

export async function getDeliverables(projectId: string) {
  try {
    const deliverables = await db.deliverable.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: deliverables };
  } catch (error) {
    console.error("Error fetching deliverables:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch deliverables" 
    };
  }
}

