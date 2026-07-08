import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import { CropWorkspace } from "@/features/crop/components/CropWorkspace";

export const metadata: Metadata = {
  title: "Crop images",
  description:
    "Crop your photos to Instagram, YouTube, and other standard social sizes, or save your own ratio.",
};

export default function CropPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="text-headline text-label font-semibold">
          {siteConfig.name}
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col px-6 pb-10 lg:px-10">
        <CropWorkspace />
      </main>
    </div>
  );
}
