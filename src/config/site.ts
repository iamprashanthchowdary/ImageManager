import { env } from "@/lib/env";

export const siteConfig = {
  name: "Image Manager",
  description: "Upload your photos, sort them into folders, and share what you want with a link.",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: "/opengraph-image",
  links: {
    // Fill in once the org/repo's public-facing profiles exist.
    twitter: "",
    github: "",
  },
} as const;
