"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { invoiceSchema, type InvoiceFormData } from "@/lib/validations/project";
import { currentUser } from "@clerk/nextjs/server";

export async function createInvoice(data: InvoiceFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = invoiceSchema.parse(data);

    // Create invoice
    const invoice = await db.invoice.create({
      data: {
        invoiceNumber: validatedData.invoiceNumber,
        amount: validatedData.amount,
        status: validatedData.status,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        clientId: validatedData.clientId,
        projectId: validatedData.projectId && validatedData.projectId !== "" ? validatedData.projectId : null,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/invoices");
    revalidatePath("/client");

    return { success: true, data: invoice };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create invoice" 
    };
  }
}

export async function updateInvoice(id: string, data: InvoiceFormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const validatedData = invoiceSchema.parse(data);

    // Update invoice
    const invoice = await db.invoice.update({
      where: { id },
      data: {
        invoiceNumber: validatedData.invoiceNumber,
        amount: validatedData.amount,
        status: validatedData.status,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        clientId: validatedData.clientId,
        projectId: validatedData.projectId && validatedData.projectId !== "" ? validatedData.projectId : null,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/invoices");
    revalidatePath("/client");

    return { success: true, data: invoice };
  } catch (error) {
    console.error("Error updating invoice:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update invoice" 
    };
  }
}

export async function deleteInvoice(id: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete invoice
    await db.invoice.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/invoices");
    revalidatePath("/client");

    return { success: true };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete invoice" 
    };
  }
}

export async function markInvoiceAsPaid(id: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Update invoice status to PAID and set paidAt
    const invoice = await db.invoice.update({
      where: { id },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/invoices");
    revalidatePath("/client");

    return { success: true, data: invoice };
  } catch (error) {
    console.error("Error marking invoice as paid:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to mark invoice as paid" 
    };
  }
}

export async function getInvoices() {
  try {
    const invoices = await db.invoice.findMany({
      include: {
        client: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: invoices };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch invoices" 
    };
  }
}

export async function getInvoice(id: string) {
  try {
    const invoice = await db.invoice.findUnique({
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
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    return { success: true, data: invoice };
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch invoice" 
    };
  }
}

export async function getClientInvoices(clientId: string) {
  try {
    const invoices = await db.invoice.findMany({
      where: {
        clientId,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: invoices };
  } catch (error) {
    console.error("Error fetching client invoices:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch invoices" 
    };
  }
}

