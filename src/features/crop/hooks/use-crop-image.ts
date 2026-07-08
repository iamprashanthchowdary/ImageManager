"use client";

import { useCallback, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import { cropImageToBlob } from "@/features/crop/lib/canvas-crop";
import type { CropPixelArea } from "@/features/crop/types";

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
    async (imageSrc: string): Promise<Blob | null> => {
      if (!croppedAreaPixels) {
        return null;
      }
      return cropImageToBlob(imageSrc, croppedAreaPixels);
    },
    [croppedAreaPixels],
  );

  return { crop, setCrop, zoom, setZoom, onCropComplete, croppedAreaPixels, reset, exportCrop };
}
