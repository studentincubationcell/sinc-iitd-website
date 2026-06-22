import type { Metadata } from "next";
import { ResourcesGrid } from "@/components/sections/resources-grid";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Startup resources for IIT Delhi founders — legal basics, incorporation, fundraising, and government schemes.",
};

export default function ResourcesPage() {
  return <ResourcesGrid />;
}
