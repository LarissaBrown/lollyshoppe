import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <span className="text-2xl">🍭</span>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Lollyshoppe
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href={ROUTES.ABOUT}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link 
              href={ROUTES.SERVICES}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link 
              href={ROUTES.PORTFOLIO}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Portfolio
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href={ROUTES.SIGN_IN}>
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Lollyshoppe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

