import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { CropWorkspace } from "@/features/crop/components/CropWorkspace";

export const metadata: Metadata = {
  title: "Crop images",
  description:
    "Crop your photos to Instagram, YouTube, and other standard social sizes, or save your own ratio.",
};

export default function CropPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-6 pb-10 lg:px-10">
        <CropWorkspace />
      </main>
    </div>
  );
}
