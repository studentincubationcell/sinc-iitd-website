import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <p className="text-8xl font-bold text-accent-lime">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="mt-8">
        <Button className="rounded-sm border-0 bg-accent-lime font-bold text-on-accent hover:bg-accent-lime-dark">
          Back to home
        </Button>
      </Link>
    </div>
  );
}
