"use client";

import { useCallback, useMemo, useState } from "react";
import Cropper, { type MediaSize } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ImageDropzone } from "@/features/crop/components/ImageDropzone";
import { RatioPicker } from "@/features/crop/components/RatioPicker";
import { useAspectRatios } from "@/features/crop/hooks/use-aspect-ratios";
import { useCropImage } from "@/features/crop/hooks/use-crop-image";
import { useImageFormatOptions } from "@/hooks/use-image-format-options";
import { downloadBlob } from "@/lib/image/download-blob";
import type { ImageFormatId } from "@/lib/image/formats";

export function CropWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [naturalRatio, setNaturalRatio] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState("original");
  const [formatId, setFormatId] = useState<ImageFormatId>("png");
  const [quality, setQuality] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);

  const ratios = useAspectRatios();
  const crop = useCropImage();
  const { formats } = useImageFormatOptions();

  const selectedFormat = useMemo(
    () => formats.find((f) => f.id === formatId) ?? formats[0],
    [formats, formatId],
  );

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
    if (!imageSrc || !file || !selectedFormat) {
      return;
    }
    setIsExporting(true);
    try {
      const blob = await crop.exportCrop(imageSrc, selectedFormat, quality);
      if (!blob) {
        return;
      }
      const baseName = file.name.replace(/\.[^./]+$/, "");
      downloadBlob(blob, `${baseName}-cropped.${selectedFormat.extension}`);
    } finally {
      setIsExporting(false);
    }
  }, [crop, imageSrc, file, selectedFormat, quality]);

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

        <div className="flex flex-wrap items-center gap-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-footnote text-tertiary-label">Format</span>
            <Select
              value={selectedFormat?.id}
              onChange={(event) => setFormatId(event.target.value as ImageFormatId)}
              aria-label="Download format"
            >
              {formats.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.label}
                </option>
              ))}
            </Select>
          </div>

          {selectedFormat?.supportsQuality && (
            <div className="flex flex-1 items-center gap-3">
              <span className="text-footnote text-tertiary-label">Quality</span>
              <input
                type="range"
                min={0.4}
                max={1}
                step={0.05}
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
                aria-label="Quality"
                className="accent-accent flex-1"
              />
            </div>
          )}
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
