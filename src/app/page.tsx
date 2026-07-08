import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <h1 className="font-display text-large-title text-label font-bold">{siteConfig.name}</h1>

      <p className="text-body text-secondary-label max-w-md">{siteConfig.description}</p>

      <Link href="/crop" className={cn(buttonVariants({ variant: "primary" }), "mt-2")}>
        Crop a photo
      </Link>
    </main>
  );
}
