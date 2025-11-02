"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getUsers() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch users" 
    };
  }
}

export async function getClients() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const clients = await db.user.findMany({
      where: {
        role: "CLIENT",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: clients };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch clients" 
    };
  }
}

export async function syncUserFromClerk() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return { success: false, error: "Not authenticated" };
    }

    // Check if user exists in database
    const existingUser = await db.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (existingUser) {
      return { success: true, data: existingUser };
    }

    // Create user in database
    const newUser = await db.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: "CLIENT", // Default role
      },
    });

    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error syncing user:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to sync user" 
    };
  }
}

