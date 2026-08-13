import type { Metadata } from "next";
import { RegistryManage } from "@/components/forms/registry-manage";

export const metadata: Metadata = {
  title: "Manage listing",
  robots: { index: false, follow: false },
};

export default async function RegistryManagePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <main className="border-b border-border bg-background">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <RegistryManage token={token} />
      </div>
    </main>
  );
}
