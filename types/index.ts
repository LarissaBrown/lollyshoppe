// Core types for the application

export type UserRole = "ADMIN" | "CLIENT";

export type ProjectStatus = "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "CANCELLED";

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  order: number;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: InvoiceStatus;
  dueDate?: Date;
  paidAt?: Date;
  stripeInvoiceId?: string;
  clientId: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deliverable {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

