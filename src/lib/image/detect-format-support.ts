import type { ImageFormatOption } from "@/lib/image/formats";

let cachedResult: Promise<ImageFormatOption[]> | null = null;

function canEncode(format: ImageFormatOption): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    // Requesting an unsupported mime type silently falls back to image/png —
    // comparing the returned blob's type against what we asked for is the
    // only reliable way to detect real encoder support.
    canvas.toBlob((blob) => resolve(blob?.type === format.mimeType), format.mimeType);
  });
}

/**
 * Runs once per session (memoized) — encoder support doesn't change at runtime.
 */
export function detectSupportedFormats(
  candidates: ImageFormatOption[],
): Promise<ImageFormatOption[]> {
  if (!cachedResult) {
    cachedResult = Promise.all(candidates.map((format) => canEncode(format))).then((results) =>
      candidates.filter((_, index) => results[index]),
    );
  }
  return cachedResult;
}
