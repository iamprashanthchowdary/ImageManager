"use client";

import { useCallback, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import { getCroppedCanvas } from "@/features/crop/lib/canvas-crop";
import type { CropPixelArea } from "@/features/crop/types";
import { encodeCanvasToBlob } from "@/lib/image/encode-canvas";
import type { ImageFormatOption } from "@/lib/image/formats";

export function useCropImage() {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropPixelArea | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const reset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, []);

  const exportCrop = useCallback(
    async (imageSrc: string, format: ImageFormatOption, quality?: number): Promise<Blob | null> => {
      if (!croppedAreaPixels) {
        return null;
      }
      const canvas = await getCroppedCanvas(imageSrc, croppedAreaPixels);
      return encodeCanvasToBlob(canvas, format, quality);
    },
    [croppedAreaPixels],
  );

  return { crop, setCrop, zoom, setZoom, onCropComplete, croppedAreaPixels, reset, exportCrop };
}
