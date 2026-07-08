import type { ImageFormatOption } from "@/lib/image/formats";

function flattenOnWhite(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const flattened = document.createElement("canvas");
  flattened.width = canvas.width;
  flattened.height = canvas.height;
  const ctx = flattened.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context is unavailable");
  }
  // Formats without an alpha channel (JPEG) render transparent pixels as
  // black if you don't do this — silently wrong output otherwise.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, flattened.width, flattened.height);
  ctx.drawImage(canvas, 0, 0);
  return flattened;
}

export function encodeCanvasToBlob(
  canvas: HTMLCanvasElement,
  format: ImageFormatOption,
  quality?: number,
): Promise<Blob> {
  const source = format.supportsTransparency ? canvas : flattenOnWhite(canvas);
  return new Promise((resolve, reject) => {
    source.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to encode image"));
        }
      },
      format.mimeType,
      format.supportsQuality ? quality : undefined,
    );
  });
}
