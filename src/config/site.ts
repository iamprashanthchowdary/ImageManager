import { env } from "@/lib/env";

export const siteConfig = {
  name: "Image Manager",
  description:
    "Organize, optimize, and share your images — fast, accessible, and built for search.",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: "/opengraph-image",
  links: {
    // Fill in once the org/repo's public-facing profiles exist.
    twitter: "",
    github: "",
  },
} as const;
