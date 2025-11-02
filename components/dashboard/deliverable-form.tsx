"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverableSchema, type DeliverableFormData } from "@/lib/validations/project";
import { createDeliverable, updateDeliverable } from "@/app/actions/deliverables";
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

type Deliverable = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string | null;
  projectId: string;
};

interface DeliverableFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  deliverable?: Deliverable;
}

export function DeliverableForm({ 
  open, 
  onOpenChange, 
  projectId, 
  deliverable,
}: DeliverableFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<DeliverableFormData>({
    resolver: zodResolver(deliverableSchema),
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      projectId: projectId,
    },
  });

  // Reset form when deliverable changes
  useEffect(() => {
    if (deliverable) {
      form.reset({
        title: deliverable.title,
        description: deliverable.description || "",
        fileUrl: deliverable.fileUrl || "",
        projectId: deliverable.projectId,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        fileUrl: "",
        projectId: projectId,
      });
    }
  }, [deliverable, projectId, form]);

  async function onSubmit(data: DeliverableFormData) {
    setIsLoading(true);

    try {
      const result = deliverable 
        ? await updateDeliverable(deliverable.id, data)
        : await createDeliverable(data);

      if (result.success) {
        toast({
          title: deliverable ? "Deliverable updated" : "Deliverable created",
          description: `Successfully ${deliverable ? "updated" : "created"} ${data.title}`,
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
        description: "Failed to save deliverable",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{deliverable ? "Edit Deliverable" : "Add New Deliverable"}</DialogTitle>
          <DialogDescription>
            {deliverable 
              ? "Update deliverable details and file link." 
              : "Add a file or asset to the project."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deliverable Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Final Design Files" {...field} />
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
                      placeholder="Describe what's included in this deliverable..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Provide details about the deliverable contents.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File URL</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/file.zip" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Link to the file (Google Drive, Dropbox, etc.)
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
                {isLoading ? "Saving..." : deliverable ? "Update Deliverable" : "Add Deliverable"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

