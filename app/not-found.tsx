import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🍭</div>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription className="text-lg">
            Oops! This page doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            The page you're looking for might have been removed or doesn't exist.
          </p>
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

