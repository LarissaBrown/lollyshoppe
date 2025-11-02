import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters"),
  status: z.enum(["PENDING", "IN_PROGRESS", "REVIEW", "COMPLETED", "CANCELLED"], {
    required_error: "Status is required",
  }),
  budget: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  clientId: z.string().min(1, "Client is required"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const milestoneSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  order: z.number().int().min(0),
  projectId: z.string().min(1, "Project is required"),
});

export type MilestoneFormData = z.infer<typeof milestoneSchema>;

export const deliverableSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  fileUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  projectId: z.string().min(1, "Project is required"),
});

export type DeliverableFormData = z.infer<typeof deliverableSchema>;

