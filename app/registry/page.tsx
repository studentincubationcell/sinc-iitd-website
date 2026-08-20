import type { Metadata } from "next";
import { RegistryExperience } from "@/components/forms/registry-form";

export const metadata: Metadata = {
  title: "Startup Registry",
  description:
    "List your IIT Delhi venture on the SInC Startup Registry for mentors and coordinators.",
};

export default function RegistryPage() {
  return (
    <main className="border-b border-border bg-background">
      <div className="mx-auto max-w-2xl px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:pb-16">
        <RegistryExperience />
      </div>
    </main>
  );
}
