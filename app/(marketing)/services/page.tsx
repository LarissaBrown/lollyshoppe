import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Services - Lollyshoppe",
  description: "Professional low-code MVP development services for startups. Fast, affordable, and high-quality.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            From idea to launch, we provide everything you need to build and ship your MVP. 
            Choose the package that fits your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* MVP Development */}
          <Card className="border-2">
            <CardHeader>
              <div className="text-4xl mb-4">🚀</div>
              <CardTitle className="text-2xl">MVP Development</CardTitle>
              <CardDescription>
                Your core product, built fast and built right
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">What's Included:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Custom web application development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Modern, responsive UI/UX design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>User authentication & authorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Database design & implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>API development & integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Cloud deployment & hosting setup</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Timeline:</p>
                <p className="font-semibold">4-8 weeks</p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Add-ons */}
          <Card className="border-2">
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle className="text-2xl">Feature Add-ons</CardTitle>
              <CardDescription>
                Enhance your MVP with powerful features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Available Features:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>Payment processing (Stripe integration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>Email notifications & marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>File uploads & storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>Admin dashboard & analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>Real-time features (chat, notifications)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">+</span>
                    <span>Third-party API integrations</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Timeline:</p>
                <p className="font-semibold">1-2 weeks per feature</p>
              </div>
            </CardContent>
          </Card>

          {/* Support & Iteration */}
          <Card className="border-2">
            <CardHeader>
              <div className="text-4xl mb-4">🛠️</div>
              <CardTitle className="text-2xl">Support & Iteration</CardTitle>
              <CardDescription>
                Ongoing maintenance and improvements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">What's Included:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Bug fixes & technical support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Feature enhancements based on feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Security updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Monthly progress reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>
                    <span>Priority support via email/Slack</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Commitment:</p>
                <p className="font-semibold">Monthly retainer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container py-16 bg-muted/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-muted-foreground">
              We use modern, battle-tested technologies to build fast, reliable applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js & React for modern web apps</li>
                  <li>• Tailwind CSS for beautiful, responsive design</li>
                  <li>• TypeScript for type-safe code</li>
                  <li>• Framer Motion for smooth animations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Node.js & serverless functions</li>
                  <li>• PostgreSQL or MongoDB databases</li>
                  <li>• Prisma ORM for database management</li>
                  <li>• RESTful & GraphQL APIs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Clerk or NextAuth for authentication</li>
                  <li>• Industry-standard encryption</li>
                  <li>• GDPR & security best practices</li>
                  <li>• Regular security audits</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment & Hosting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vercel for optimal Next.js performance</li>
                  <li>• Automatic CI/CD pipelines</li>
                  <li>• CDN for global fast loading</li>
                  <li>• 99.9% uptime guarantee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Typical Project Timeline</h2>
            <p className="text-muted-foreground">
              From kickoff to launch, here's what you can expect.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Week 1: Discovery & Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Requirements gathering, user stories, wireframes, and technical architecture design.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weeks 2-4: Core Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building the main features, database setup, authentication, and primary user flows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weeks 5-6: Features & Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adding secondary features, third-party integrations, and refining the user experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weeks 7-8: Testing & Launch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quality assurance, bug fixes, performance optimization, and deployment to production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much does an MVP cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Project costs vary based on complexity and features. Most MVPs range from $10,000-$30,000. 
                  We'll provide a detailed quote after our discovery call based on your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I need changes during development?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We expect requirements to evolve! Minor adjustments are included. For major scope changes, 
                  we'll discuss timeline and cost implications transparently before proceeding.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I own the code?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. Upon final payment, you receive full ownership of all code, designs, and assets. 
                  You're free to modify, extend, or hand off to another developer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens after launch?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer ongoing support packages for maintenance, updates, and new features. Many clients 
                  start with our monthly retainer to iterate based on user feedback.
                </p>
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
              Ready to Get Started?
            </CardTitle>
            <CardDescription className="text-lg">
              Schedule a free 30-minute consultation to discuss your project.
            </CardDescription>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.SIGN_UP}>
                <Button size="lg">
                  Start Your Project
                </Button>
              </Link>
              <Link href={ROUTES.PORTFOLIO}>
                <Button size="lg" variant="outline">
                  View Our Work
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}

