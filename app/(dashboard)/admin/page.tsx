import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/app/actions/projects";
import { getUsers } from "@/app/actions/users";

export const metadata = {
  title: "Admin Dashboard - Lollyshoppe",
  description: "Manage clients, projects, invoices, and more.",
};

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch dashboard data
  const [projectsResult, usersResult] = await Promise.all([
    getProjects(),
    getUsers(),
  ]);

  const projects = projectsResult.success && projectsResult.data ? projectsResult.data : [];
  const users = usersResult.success && usersResult.data ? usersResult.data : [];
  
  const activeProjects = projects.filter(p => p.status === "IN_PROGRESS").length;
  const clients = users.filter(u => u.role === "CLIENT").length;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🍭</h1>
          <p className="text-muted-foreground">
            Manage your business, clients, and projects from one place.
          </p>
        </div>
        <Link href="/admin/projects">
          <Button>
            + New Project
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients}</div>
            <p className="text-xs text-muted-foreground">
              {clients === 0 ? "No clients yet" : `${clients} total client${clients === 1 ? "" : "s"}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <span className="text-2xl">🚀</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjects === 0 ? "No active projects" : `${activeProjects} in progress`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (MTD)</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <span className="text-2xl">📄</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">All up to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto py-6 flex-col gap-2" disabled>
            <span className="text-3xl">➕</span>
            <span className="font-semibold">New Client</span>
          </Button>

          <Link href="/admin/projects" className="w-full">
            <Button variant="outline" className="h-auto py-6 flex-col gap-2 w-full">
              <span className="text-3xl">📊</span>
              <span className="font-semibold">New Project</span>
            </Button>
          </Link>

          <Button variant="outline" className="h-auto py-6 flex-col gap-2">
            <span className="text-3xl">🧾</span>
            <span className="font-semibold">Create Invoice</span>
          </Button>

          <Button variant="outline" className="h-auto py-6 flex-col gap-2">
            <span className="text-3xl">📤</span>
            <span className="font-semibold">Upload Deliverable</span>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Latest project activity</CardDescription>
            </div>
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-5xl mb-3">📂</span>
              <p className="text-sm text-muted-foreground">
                No projects yet. Create your first project to get started.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Awaiting payment</CardDescription>
            </div>
            <Link href="/admin/invoices">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-5xl mb-3">💳</span>
              <p className="text-sm text-muted-foreground">
                No pending invoices. All payments are up to date!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Milestones</CardTitle>
              <CardDescription>Due in the next 7 days</CardDescription>
            </div>
            <Link href="/admin/milestones">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-5xl mb-3">🎯</span>
              <p className="text-sm text-muted-foreground">
                No upcoming milestones. You're all caught up!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-16 text-center">
            <div>
              <span className="text-6xl mb-4 block">📈</span>
              <p className="text-muted-foreground mb-2">
                Revenue chart coming soon
              </p>
              <p className="text-sm text-muted-foreground">
                Complete your first project to see analytics here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="mt-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium mb-1">Database</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Operational
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Authentication</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Operational
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Payments</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Not Configured
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

