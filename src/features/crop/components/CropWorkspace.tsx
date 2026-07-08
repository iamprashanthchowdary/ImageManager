"use client";

import { useCallback, useMemo, useState } from "react";
import Cropper, { type MediaSize } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/features/crop/components/ImageDropzone";
import { RatioPicker } from "@/features/crop/components/RatioPicker";
import { useAspectRatios } from "@/features/crop/hooks/use-aspect-ratios";
import { useCropImage } from "@/features/crop/hooks/use-crop-image";

export function CropWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [naturalRatio, setNaturalRatio] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState("original");
  const [isExporting, setIsExporting] = useState(false);

  const ratios = useAspectRatios();
  const crop = useCropImage();

  const allRatios = useMemo(
    () => [...ratios.presets, ...ratios.customRatios],
    [ratios.presets, ratios.customRatios],
  );

  const activeRatio = useMemo(() => {
    if (selectedId === "original") {
      return naturalRatio ?? 1;
    }
    return allRatios.find((r) => r.id === selectedId)?.ratio ?? naturalRatio ?? 1;
  }, [selectedId, naturalRatio, allRatios]);

  const handleSelectFile = useCallback(
    (selected: File) => {
      setFile(selected);
      setImageSrc((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return URL.createObjectURL(selected);
      });
      setNaturalRatio(null);
      setSelectedId("original");
      crop.reset();
    },
    [crop],
  );

  const handleChooseDifferent = useCallback(() => {
    setFile(null);
    setImageSrc((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
    setNaturalRatio(null);
    crop.reset();
  }, [crop]);

  const handleMediaLoaded = useCallback((mediaSize: MediaSize) => {
    setNaturalRatio(mediaSize.naturalWidth / mediaSize.naturalHeight);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!imageSrc || !file) {
      return;
    }
    setIsExporting(true);
    try {
      const blob = await crop.exportCrop(imageSrc);
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const baseName = file.name.replace(/\.[^./]+$/, "");
      link.href = url;
      link.download = `${baseName}-cropped.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }, [crop, imageSrc, file]);

  if (!imageSrc) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <ImageDropzone onSelect={handleSelectFile} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div className="bg-bg-secondary relative h-[60vh] min-h-[360px] w-full overflow-hidden rounded-xl">
          <Cropper
            image={imageSrc}
            crop={crop.crop}
            zoom={crop.zoom}
            aspect={activeRatio}
            onCropChange={crop.setCrop}
            onZoomChange={crop.setZoom}
            onCropComplete={crop.onCropComplete}
            onMediaLoaded={handleMediaLoaded}
          />
        </div>

        <div className="flex items-center gap-4 px-1">
          <span className="text-footnote text-tertiary-label">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={crop.zoom}
            onChange={(event) => crop.setZoom(Number(event.target.value))}
            aria-label="Zoom"
            className="accent-accent flex-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={handleChooseDifferent}>
            Choose a different photo
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleDownload}
            disabled={isExporting || !crop.croppedAreaPixels}
          >
            {isExporting ? "Preparing…" : "Download"}
          </Button>
        </div>
      </div>

      <RatioPicker ratios={ratios} selectedId={selectedId} onSelectId={setSelectedId} />
    </div>
  );
}
