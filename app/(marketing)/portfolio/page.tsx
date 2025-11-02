import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Portfolio - Lollyshoppe",
  description: "See our work: MVPs, web apps, and low-code solutions built for startups and entrepreneurs.",
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Real MVPs, real results. Here's a taste of the products we've helped bring to life.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Project 1: SaaS Platform */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">📊</span>
              </div>
              <CardTitle>TaskFlow Pro</CardTitle>
              <CardDescription>
                Project Management SaaS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A collaborative project management tool for remote teams. Features include real-time 
                updates, task tracking, and team analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">PostgreSQL</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Stripe</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 6 weeks</li>
                  <li>• 500+ users in first month</li>
                  <li>• $15k MRR after 3 months</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project 2: Marketplace */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🛍️</span>
              </div>
              <CardTitle>LocalArtisan</CardTitle>
              <CardDescription>
                Handmade Goods Marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A marketplace connecting local artisans with customers. Includes vendor dashboards, 
                payment processing, and order management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">MongoDB</span>
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Stripe Connect</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 8 weeks</li>
                  <li>• 50+ vendors onboarded</li>
                  <li>• $25k GMV in launch month</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project 3: Booking Platform */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">📅</span>
              </div>
              <CardTitle>FitSpace</CardTitle>
              <CardDescription>
                Fitness Class Booking App
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A booking platform for fitness studios and instructors. Features include scheduling, 
                payments, waitlists, and customer profiles.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">PostgreSQL</span>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Stripe</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 7 weeks</li>
                  <li>• 10 studios using platform</li>
                  <li>• 2,000+ bookings/month</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project 4: Social Platform */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">💬</span>
              </div>
              <CardTitle>DevConnect</CardTitle>
              <CardDescription>
                Developer Networking Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A social network for developers to share projects, get feedback, and find collaborators. 
                Features include profiles, posts, comments, and messaging.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">PostgreSQL</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">WebSockets</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 8 weeks</li>
                  <li>• 1,500+ active users</li>
                  <li>• Featured on Product Hunt</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project 5: Analytics Dashboard */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">📈</span>
              </div>
              <CardTitle>MetricsPro</CardTitle>
              <CardDescription>
                Business Analytics Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A real-time analytics dashboard for e-commerce businesses. Tracks sales, inventory, 
                customer behavior, and generates insights.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">TimescaleDB</span>
                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Charts.js</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 5 weeks</li>
                  <li>• 100+ businesses using it</li>
                  <li>• 4.8/5 star reviews</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project 6: Content Platform */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">✍️</span>
              </div>
              <CardTitle>StoryHub</CardTitle>
              <CardDescription>
                Content Creation Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A platform for writers to publish stories, build an audience, and monetize their content. 
                Features include rich text editor, subscriptions, and analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Next.js</span>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">PostgreSQL</span>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Stripe</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Results:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Launched in 7 weeks</li>
                  <li>• 300+ published stories</li>
                  <li>• Growing community of writers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-16 bg-muted/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">
              Don't just take our word for it—hear from founders who've worked with us.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "Lollyshoppe helped us launch our MVP in just 6 weeks. Their expertise in low-code 
                  development saved us months of time and thousands of dollars. Highly recommended!"
                </p>
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Founder, TaskFlow Pro</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "Working with Lollyshoppe was a breeze. They understood our vision immediately and 
                  delivered a beautiful, functional product that our customers love."
                </p>
                <div>
                  <p className="font-semibold">Marcus Johnson</p>
                  <p className="text-sm text-muted-foreground">Co-founder, FitSpace</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "The quality of code and attention to detail exceeded our expectations. Even after 
                  launch, they've been incredibly supportive with ongoing improvements."
                </p>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Founder, LocalArtisan</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "I was impressed by how quickly they grasped our complex requirements and turned them 
                  into a user-friendly interface. True professionals!"
                </p>
                <div>
                  <p className="font-semibold">David Park</p>
                  <p className="text-sm text-muted-foreground">Founder, MetricsPro</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground">
              Numbers that showcase our commitment to helping startups succeed.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  50+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">MVPs Launched</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  6 weeks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Average Time to Launch</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
                  95%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  $2M+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Raised by Our Clients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-2">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl md:text-4xl">
              Ready to Build Your Success Story?
            </CardTitle>
            <CardDescription className="text-lg">
              Let's create an MVP that gets results. Start your project today.
            </CardDescription>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.SIGN_UP}>
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href={ROUTES.SERVICES}>
                <Button size="lg" variant="outline">
                  View Services
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}

