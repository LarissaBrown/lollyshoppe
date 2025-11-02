import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About - Lollyshoppe",
  description: "Learn about Lollyshoppe and how we help startups build low-code MVPs quickly and efficiently.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-6xl mb-6 block">🍭</span>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            About Lollyshoppe
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We believe every startup deserves a sweet chance at success. That's why we create 
            delightful, low-code MVPs that help you validate your ideas quickly and affordably.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-16 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
            <p>
              Lollyshoppe was born from a simple observation: too many great startup ideas never 
              see the light of day because building an MVP feels overwhelming and expensive.
            </p>
            <p>
              We created Lollyshoppe to change that. By leveraging modern low-code tools and 
              battle-tested frameworks, we help founders get their products in front of users 
              faster—without sacrificing quality or burning through their budget.
            </p>
            <p>
              Think of us as your technical co-pilot during the crucial early stages. We build, 
              you validate, and together we iterate toward product-market fit.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These principles guide every project we take on and every line of code we write.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">⚡</div>
              <CardTitle>Speed to Market</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Time is your most valuable asset. We prioritize rapid development so you can 
                start learning from real users as soon as possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🎯</div>
              <CardTitle>Focus on Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We build what matters. No unnecessary features, no over-engineering—just the 
                core functionality needed to test your hypothesis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🤝</div>
              <CardTitle>Partnership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your success is our success. We're not just building software; we're building 
                a relationship and supporting your journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">💎</div>
              <CardTitle>Quality Craft</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fast doesn't mean sloppy. We write clean, maintainable code that you can 
                build upon as your product grows.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">📈</div>
              <CardTitle>Data-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every decision should be informed by data. We build in analytics from day one 
                so you can make smart, evidence-based decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🔒</div>
              <CardTitle>Security First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your users' trust is paramount. We follow security best practices and never 
                compromise on protecting user data.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="container py-16 bg-muted/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground">
              A simple, transparent process designed to get you results fast.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Discovery Call</h3>
                <p className="text-muted-foreground">
                  We start with a conversation to understand your vision, goals, and target users. 
                  What problem are you solving? Who's your ideal customer?
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Scope & Timeline</h3>
                <p className="text-muted-foreground">
                  Together, we define the core features for your MVP. We break the project into 
                  milestones with clear deliverables and deadlines.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Rapid Development</h3>
                <p className="text-muted-foreground">
                  We build in focused sprints, delivering working features regularly. You can 
                  see progress in real-time and provide feedback along the way.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Launch & Iterate</h3>
                <p className="text-muted-foreground">
                  Once your MVP is ready, we help you launch and monitor performance. Based on 
                  user feedback, we quickly iterate and improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-2">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl md:text-4xl">
              Ready to Build Your MVP?
            </CardTitle>
            <CardDescription className="text-lg">
              Let's turn your idea into reality. Schedule a free consultation to discuss your project.
            </CardDescription>
            <div className="pt-4">
              <a
                href="/services"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                View Our Services
              </a>
            </div>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}

