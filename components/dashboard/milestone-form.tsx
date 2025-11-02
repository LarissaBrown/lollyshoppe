"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { milestoneSchema, type MilestoneFormData } from "@/lib/validations/project";
import { createMilestone, updateMilestone } from "@/app/actions/milestones";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  order: number;
  projectId: string;
};

interface MilestoneFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  milestone?: Milestone;
  nextOrder: number;
}

export function MilestoneForm({ 
  open, 
  onOpenChange, 
  projectId, 
  milestone,
  nextOrder 
}: MilestoneFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<MilestoneFormData>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      order: nextOrder,
      projectId: projectId,
    },
  });

  // Reset form when milestone changes
  useEffect(() => {
    if (milestone) {
      form.reset({
        title: milestone.title,
        description: milestone.description || "",
        dueDate: milestone.dueDate 
          ? new Date(milestone.dueDate).toISOString().split('T')[0]
          : "",
        order: milestone.order,
        projectId: milestone.projectId,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        dueDate: "",
        order: nextOrder,
        projectId: projectId,
      });
    }
  }, [milestone, nextOrder, projectId, form]);

  async function onSubmit(data: MilestoneFormData) {
    setIsLoading(true);

    try {
      const result = milestone 
        ? await updateMilestone(milestone.id, data)
        : await createMilestone(data);

      if (result.success) {
        toast({
          title: milestone ? "Milestone updated" : "Milestone created",
          description: `Successfully ${milestone ? "updated" : "created"} ${data.title}`,
        });
        form.reset();
        onOpenChange(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Something went wrong",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save milestone",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{milestone ? "Edit Milestone" : "Create New Milestone"}</DialogTitle>
          <DialogDescription>
            {milestone 
              ? "Update milestone details and due date." 
              : "Add a new milestone to track project progress."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestone Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Initial Design Mockups" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of what needs to be completed..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Provide additional context about this milestone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional: Set a target completion date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : milestone ? "Update Milestone" : "Create Milestone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

