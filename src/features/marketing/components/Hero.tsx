import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-20 pb-28 text-center lg:pt-32 lg:pb-40">
      <h1 className="font-display text-label text-5xl font-bold tracking-tight lg:text-7xl">
        Crop it your way.
      </h1>
      <p className="text-title-3 text-secondary-label max-w-xl font-normal">
        Pick a ratio, drag to frame it, download in the format you need.
      </p>
      <Link href="/crop" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-2")}>
        Crop a photo
      </Link>
    </section>
  );
}
