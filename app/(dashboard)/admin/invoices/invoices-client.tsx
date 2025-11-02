"use client";

import { useState } from "react";
import Link from "next/link";
import { InvoiceForm } from "@/components/dashboard/invoice-form";
import { deleteInvoice, markInvoiceAsPaid } from "@/app/actions/invoices";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: Prisma.Decimal;
  status: string;
  dueDate: Date | null;
  paidAt: Date | null;
  clientId: string;
  projectId: string | null;
  client: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  project: {
    id: string;
    title: string;
  } | null;
  createdAt: Date;
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

interface InvoicesClientProps {
  invoices: Invoice[];
  clients: Client[];
  projects: Project[];
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  SENT: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  PAID: "bg-green-500/10 text-green-500 border-green-500/20",
  OVERDUE: "bg-red-500/10 text-red-500 border-red-500/20",
  CANCELLED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  PAID: "Paid",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
};

export function InvoicesClient({ invoices: initialInvoices, clients, projects }: InvoicesClientProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const totalAmount = initialInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);
  const paidAmount = initialInvoices
    .filter(inv => inv.status === "PAID")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);
  const pendingAmount = initialInvoices
    .filter(inv => inv.status !== "PAID" && inv.status !== "CANCELLED")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);

  async function handleDelete(id: string, invoiceNumber: string) {
    if (!confirm(`Are you sure you want to delete invoice "${invoiceNumber}"?`)) {
      return;
    }

    const result = await deleteInvoice(id);

    if (result.success) {
      toast({
        title: "Invoice deleted",
        description: `Successfully deleted ${invoiceNumber}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete invoice",
      });
    }
  }

  async function handleMarkAsPaid(id: string, invoiceNumber: string) {
    const result = await markInvoiceAsPaid(id);

    if (result.success) {
      toast({
        title: "Invoice marked as paid",
        description: `${invoiceNumber} has been marked as paid`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to update invoice",
      });
    }
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">
            Manage client invoices and track payments.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          + New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <span className="text-2xl">✓</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      {initialInvoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-6xl mb-4">🧾</span>
            <p className="text-muted-foreground mb-4">
              No invoices yet. Create your first invoice to get started.
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              Create First Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {initialInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="flex items-center gap-3">
                      {invoice.invoiceNumber}
                      <Badge 
                        variant="outline" 
                        className={STATUS_COLORS[invoice.status] || ""}
                      >
                        {STATUS_LABELS[invoice.status] || invoice.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Client: {invoice.client.firstName && invoice.client.lastName
                        ? `${invoice.client.firstName} ${invoice.client.lastName}`
                        : invoice.client.email}
                      {invoice.project && (
                        <>
                          {" • "}
                          <Link 
                            href={`/admin/projects/${invoice.project.id}`}
                            className="hover:underline"
                          >
                            {invoice.project.title}
                          </Link>
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleMarkAsPaid(invoice.id, invoice.invoiceNumber)}
                      >
                        Mark Paid
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingInvoice(invoice)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Amount</p>
                    <p className="font-semibold text-lg">
                      ${parseFloat(invoice.amount.toString()).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Due Date</p>
                    <p className="font-semibold">
                      {invoice.dueDate ? formatDate(invoice.dueDate) : "Not set"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Created</p>
                    <p className="font-semibold">{formatDate(invoice.createdAt)}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Paid Date</p>
                    <p className="font-semibold">
                      {invoice.paidAt ? formatDate(invoice.paidAt) : "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <InvoiceForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        clients={clients}
        projects={projects}
      />

      {editingInvoice && (
        <InvoiceForm
          open={!!editingInvoice}
          onOpenChange={(open) => !open && setEditingInvoice(null)}
          invoice={editingInvoice}
          clients={clients}
          projects={projects}
        />
      )}
    </>
  );
}

