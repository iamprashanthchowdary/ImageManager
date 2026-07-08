import type { AspectRatio } from "@/features/crop/types";

/**
 * Curated, not exhaustive — restraint over completeness. Ratios that are
 * numerically identical (e.g. YouTube thumbnail and Twitter/X post are both
 * 16:9) share one entry with a combined subtitle rather than listing every
 * platform separately.
 */
export const BUILT_IN_ASPECT_RATIOS: AspectRatio[] = [
  { id: "square", label: "Square", subtitle: "Instagram, Facebook", ratioLabel: "1:1", ratio: 1 },
  {
    id: "portrait",
    label: "Portrait",
    subtitle: "Instagram post",
    ratioLabel: "4:5",
    ratio: 4 / 5,
  },
  {
    id: "story",
    label: "Story",
    subtitle: "Instagram, TikTok, Reels, Shorts",
    ratioLabel: "9:16",
    ratio: 9 / 16,
  },
  {
    id: "landscape",
    label: "Landscape",
    subtitle: "YouTube, Twitter/X",
    ratioLabel: "16:9",
    ratio: 16 / 9,
  },
  {
    id: "facebook-post",
    label: "Facebook post",
    subtitle: "Link preview image",
    ratioLabel: "1.91:1",
    ratio: 1.91,
  },
  {
    id: "pinterest-pin",
    label: "Pinterest pin",
    subtitle: "Standard pin",
    ratioLabel: "2:3",
    ratio: 2 / 3,
  },
  {
    id: "classic-photo",
    label: "Classic photo",
    subtitle: "Prints, frames",
    ratioLabel: "4:3",
    ratio: 4 / 3,
  },
  {
    id: "widescreen-photo",
    label: "Widescreen photo",
    subtitle: "Desktop wallpaper",
    ratioLabel: "3:2",
    ratio: 3 / 2,
  },
];
