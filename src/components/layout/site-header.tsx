import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-5 lg:px-10">
      <Link href="/" className="text-headline text-label font-semibold">
        {siteConfig.name}
      </Link>
      <ThemeToggle />
    </header>
  );
}
