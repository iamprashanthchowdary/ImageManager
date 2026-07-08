import type { CropPixelArea } from "@/features/crop/types";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Failed to load image")));
    image.src = src;
  });
}

/**
 * Crops only — produces a canvas at the target crop size. Encoding that
 * canvas to a specific format/quality is the shared service's job (see
 * src/lib/image/), so the same encoder is used by every feature that
 * exports an image, not just crop.
 */
export async function getCroppedCanvas(
  imageSrc: string,
  area: CropPixelArea,
): Promise<HTMLCanvasElement> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(area.width);
  canvas.height = Math.round(area.height);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context is unavailable");
  }

  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);
  return canvas;
}
