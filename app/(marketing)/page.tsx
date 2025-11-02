import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-8 py-24 md:py-32">
        <div className="flex flex-col items-center space-y-4 text-center">
          <span className="text-8xl">🍭</span>
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Lollyshoppe
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
            Get a sweet fix for your product
          </p>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
            Professional low-code MVP development for startups. Transform your ideas into reality with custom solutions tailored to your needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={ROUTES.SIGN_UP}>
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Project
              </Button>
            </Link>
            <Link href={ROUTES.PORTFOLIO}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose Lollyshoppe?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Everything you need to bring your MVP to life, managed in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">⚡</div>
              <CardTitle>Rapid Development</CardTitle>
              <CardDescription>
                Low-code solutions that get your MVP to market faster without compromising quality.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">💎</div>
              <CardTitle>Custom Solutions</CardTitle>
              <CardDescription>
                Tailored development that fits your unique business needs and vision.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">📊</div>
              <CardTitle>Project Tracking</CardTitle>
              <CardDescription>
                Real-time updates on milestones, deliverables, and project progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">💳</div>
              <CardTitle>Transparent Pricing</CardTitle>
              <CardDescription>
                Clear invoicing and payment tracking with secure payment processing.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🎨</div>
              <CardTitle>Modern Design</CardTitle>
              <CardDescription>
                Beautiful, responsive interfaces that your users will love.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🚀</div>
              <CardTitle>Launch Ready</CardTitle>
              <CardDescription>
                Fully deployed and production-ready solutions from day one.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-2">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl md:text-4xl">
              Ready to build your MVP?
            </CardTitle>
            <CardDescription className="text-lg">
              Join startups who trust Lollyshoppe to bring their ideas to life.
            </CardDescription>
            <div className="pt-4">
              <Link href={ROUTES.SIGN_UP}>
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}

