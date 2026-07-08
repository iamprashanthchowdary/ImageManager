export type ImageFormatId = "png" | "jpeg" | "webp" | "avif";

export interface ImageFormatOption {
  id: ImageFormatId;
  label: string;
  mimeType: string;
  extension: string;
  supportsQuality: boolean;
  supportsTransparency: boolean;
}

/**
 * Candidates only — not every browser can actually encode every one of these
 * via canvas.toBlob (AVIF encoding support in particular is inconsistent).
 * Use `detectSupportedFormats` to get the subset a given browser can produce.
 */
export const IMAGE_FORMAT_CANDIDATES: ImageFormatOption[] = [
  {
    id: "png",
    label: "PNG",
    mimeType: "image/png",
    extension: "png",
    supportsQuality: false,
    supportsTransparency: true,
  },
  {
    id: "jpeg",
    label: "JPG",
    mimeType: "image/jpeg",
    extension: "jpg",
    supportsQuality: true,
    supportsTransparency: false,
  },
  {
    id: "webp",
    label: "WebP",
    mimeType: "image/webp",
    extension: "webp",
    supportsQuality: true,
    supportsTransparency: true,
  },
  {
    id: "avif",
    label: "AVIF",
    mimeType: "image/avif",
    extension: "avif",
    supportsQuality: true,
    supportsTransparency: true,
  },
];
