import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Check out our value list or trade calculator instead.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/calculator">Trade Calculator</Link>
        </Button>
      </div>
    </div>
  );
}
