import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { syncUserFromClerk } from "@/app/actions/users";
import { getClientProjects } from "@/app/actions/projects";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Client Dashboard - Lollyshoppe",
  description: "View your projects, invoices, and deliverables.",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  REVIEW: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default async function ClientDashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // Sync user with database
  const userResult = await syncUserFromClerk();
  
  if (!userResult.success || !userResult.data) {
    return <div>Error loading dashboard</div>;
  }

  const dbUser = userResult.data;

  // Fetch user's projects
  const projectsResult = await getClientProjects(dbUser.id);
  const projects = projectsResult.success && projectsResult.data ? projectsResult.data : [];
  
  const activeProjects = projects.filter(p => p.status === "IN_PROGRESS").length;
  const totalDeliverables = projects.reduce((sum, p) => sum + p._count.deliverables, 0);
  const completedMilestones = projects.reduce((sum, p) => {
    // Note: We'd need to add completedAt checking in the query for accurate count
    return sum + p._count.milestones;
  }, 0);

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {clerkUser.firstName || "there"}! 🍭
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your projects and recent activity.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjects === 0 ? "No active projects yet" : `${activeProjects} in progress`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <span className="text-2xl">💳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground">All paid up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliverables</CardTitle>
            <span className="text-2xl">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliverables}</div>
            <p className="text-xs text-muted-foreground">
              {totalDeliverables === 0 ? "No deliverables yet" : "Total received"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMilestones || "--"}</div>
            <p className="text-xs text-muted-foreground">
              {completedMilestones === 0 ? "No milestones yet" : "Across projects"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* All Projects */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>All your active and completed projects</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-6xl mb-4">🚀</span>
              <p className="text-muted-foreground mb-4">
                No projects yet. Your projects will appear here once created.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-3">
                          {project.title}
                          <Badge 
                            variant="outline" 
                            className={STATUS_COLORS[project.status] || ""}
                          >
                            {STATUS_LABELS[project.status] || project.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {project.startDate && project.endDate ? (
                            <>Started {formatDate(project.startDate)} • Due {formatDate(project.endDate)}</>
                          ) : (
                            "Timeline not set"
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="grid gap-4 md:grid-cols-3 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Budget</p>
                        <p className="font-semibold">
                          {project.budget ? `$${parseFloat(project.budget.toString()).toLocaleString()}` : "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Milestones</p>
                        <p className="font-semibold">{project._count.milestones}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Deliverables</p>
                        <p className="font-semibold">{project._count.deliverables}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-6xl mb-4">📬</span>
            <p className="text-muted-foreground mb-4">
              No activity yet. Check back soon for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

