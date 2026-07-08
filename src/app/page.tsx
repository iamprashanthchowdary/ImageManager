import { SiteHeader } from "@/components/layout/site-header";
import { ClosingCta } from "@/features/marketing/components/ClosingCta";
import { CropMockup } from "@/features/marketing/components/CropMockup";
import { FeatureSection } from "@/features/marketing/components/FeatureSection";
import { FormatMockup } from "@/features/marketing/components/FormatMockup";
import { Hero } from "@/features/marketing/components/Hero";
import { RatioMockup } from "@/features/marketing/components/RatioMockup";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <FeatureSection
          title="Frame it like Photos, not Photoshop."
          description="Pick a ratio and the frame stays put — you move the photo, not fight a resize handle."
          visual={<CropMockup />}
        />
        <FeatureSection
          title="Built for where you're posting."
          description="Instagram, YouTube, Pinterest, and more — or save your own ratio. Don't need a preset? Remove it."
          visual={<RatioMockup />}
          reverse
        />
        <FeatureSection
          title="Download it as anything."
          description="PNG, JPG, WebP — even AVIF where your browser supports it. Pick a quality, get a file."
          visual={<FormatMockup />}
        />
        <ClosingCta />
      </main>
    </div>
  );
}
