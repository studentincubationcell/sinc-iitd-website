import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#1a1033]">
      <p className="text-8xl font-bold text-[#f5a623]">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-white/60 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="mt-8">
        <Button className="rounded-sm bg-[#f5a623] text-[#1a1033] hover:bg-[#f5a623]/90 font-bold border-0">
          Back to home
        </Button>
      </Link>
    </div>
  );
}
