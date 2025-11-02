import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <span className="text-2xl">🍭</span>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Lollyshoppe
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10"
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Dashboard Footer */}
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lollyshoppe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

