"use client";

import { useEffect, useState } from "react";
import { detectSupportedFormats } from "@/lib/image/detect-format-support";
import { IMAGE_FORMAT_CANDIDATES, type ImageFormatOption } from "@/lib/image/formats";

const SAFE_DEFAULT = IMAGE_FORMAT_CANDIDATES.filter((format) => format.id === "png");

/**
 * Which formats a canvas can actually encode to is only knowable in the
 * browser (and even then, only after probing) — genuinely unavailable
 * during SSR. Starts with PNG only (universally supported) and upgrades
 * once real detection resolves.
 */
export function useImageFormatOptions() {
  const [formats, setFormats] = useState<ImageFormatOption[]>(SAFE_DEFAULT);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    let cancelled = false;
    detectSupportedFormats(IMAGE_FORMAT_CANDIDATES).then((supported) => {
      if (cancelled) {
        return;
      }
      setFormats(supported.length > 0 ? supported : SAFE_DEFAULT);
      setIsDetecting(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { formats, isDetecting };
}
