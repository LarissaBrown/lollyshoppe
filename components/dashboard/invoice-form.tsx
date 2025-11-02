"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema, type InvoiceFormData } from "@/lib/validations/project";
import { createInvoice, updateInvoice } from "@/app/actions/invoices";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Prisma } from "@prisma/client";

type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: Prisma.Decimal;
  status: string;
  dueDate: Date | null;
  clientId: string;
  projectId: string | null;
};

type Client = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

type Project = {
  id: string;
  title: string;
  clientId: string;
};

interface InvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: Invoice;
  clients: Client[];
  projects: Project[];
}

export function InvoiceForm({ 
  open, 
  onOpenChange, 
  invoice,
  clients,
  projects
}: InvoiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: "",
      amount: "",
      status: "DRAFT",
      dueDate: "",
      clientId: "",
      projectId: "",
    },
  });

  const selectedClientId = form.watch("clientId");
  const clientProjects = projects.filter(p => p.clientId === selectedClientId);

  // Reset form when invoice changes
  useEffect(() => {
    if (invoice) {
      form.reset({
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount.toString(),
        status: invoice.status as InvoiceFormData["status"],
        dueDate: invoice.dueDate 
          ? new Date(invoice.dueDate).toISOString().split('T')[0]
          : "",
        clientId: invoice.clientId,
        projectId: invoice.projectId || "",
      });
    } else {
      // Generate invoice number
      const invoiceNum = `INV-${Date.now()}`;
      form.reset({
        invoiceNumber: invoiceNum,
        amount: "",
        status: "DRAFT",
        dueDate: "",
        clientId: "",
        projectId: "",
      });
    }
  }, [invoice, form]);

  async function onSubmit(data: InvoiceFormData) {
    setIsLoading(true);

    try {
      const result = invoice 
        ? await updateInvoice(invoice.id, data)
        : await createInvoice(data);

      if (result.success) {
        toast({
          title: invoice ? "Invoice updated" : "Invoice created",
          description: `Successfully ${invoice ? "updated" : "created"} ${data.invoiceNumber}`,
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
        description: "Failed to save invoice",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{invoice ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
          <DialogDescription>
            {invoice 
              ? "Update invoice details and status." 
              : "Create a new invoice for a client."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USD) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000.00" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.firstName && client.lastName
                              ? `${client.firstName} ${client.lastName}`
                              : client.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {clientProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Optional: Link to a specific project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="SENT">Sent</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="OVERDUE">Overdue</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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
                      Optional: Payment due date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                {isLoading ? "Saving..." : invoice ? "Update Invoice" : "Create Invoice"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

