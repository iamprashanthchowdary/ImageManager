"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  onSelect: (file: File) => void;
}

export function ImageDropzone({ onSelect }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file && file.type.startsWith("image/")) {
        onSelect(file);
      }
    },
    [onSelect],
  );

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Add a photo to crop"
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragActive(true);
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragActive(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "flex min-h-[420px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed transition-colors",
        isDragActive
          ? "border-accent bg-accent-subtle shadow-[0_0_0_4px_var(--color-accent-subtle)]"
          : "border-border bg-bg-secondary",
      )}
    >
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-xl border transition-colors",
          isDragActive ? "bg-accent border-transparent" : "border-border bg-bg-elevated",
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={isDragActive ? "stroke-white" : "stroke-secondary-label"}
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </div>

      <p
        className={cn(
          "text-headline mt-5 font-semibold",
          isDragActive ? "text-accent" : "text-label",
        )}
      >
        {isDragActive ? "Release to add" : "Drag a photo here"}
      </p>

      {!isDragActive && (
        <>
          <p className="text-subhead text-tertiary-label mt-1.5">or</p>
          <Button
            type="button"
            variant="primary"
            className="mt-3.5"
            onClick={(event) => {
              event.stopPropagation();
              openPicker();
            }}
          >
            Choose a photo
          </Button>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
}
