import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Client Dashboard - Lollyshoppe",
  description: "View your projects, invoices, and deliverables.",
};

export default async function ClientDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user.firstName || "there"}! 🍭
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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No active projects yet</p>
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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No deliverables yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">No upcoming milestones</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your active and completed projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-6xl mb-4">🚀</span>
              <p className="text-muted-foreground mb-4">
                No projects yet. Your projects will appear here once created.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
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

      {/* Getting Started Section */}
      <Card className="mt-8 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Getting Started</CardTitle>
          <CardDescription>
            New to Lollyshoppe? Here's what you can do next.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4">
            <span className="text-4xl mb-2 block">📞</span>
            <h3 className="font-semibold mb-2">Schedule a Call</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Book a consultation to discuss your project ideas.
            </p>
            <Button size="sm" variant="outline">
              Book Now
            </Button>
          </div>

          <div className="text-center p-4">
            <span className="text-4xl mb-2 block">📄</span>
            <h3 className="font-semibold mb-2">View Services</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Explore what we can build for you.
            </p>
            <Button size="sm" variant="outline">
              See Services
            </Button>
          </div>

          <div className="text-center p-4">
            <span className="text-4xl mb-2 block">💬</span>
            <h3 className="font-semibold mb-2">Get Support</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Have questions? We're here to help!
            </p>
            <Button size="sm" variant="outline">
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

