"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { customAspectRatioSchema, type CustomAspectRatioInput } from "@/features/crop/schema";

interface CustomRatioFormProps {
  onSave: (input: CustomAspectRatioInput) => void;
  onCancel: () => void;
}

const inputClassName =
  "h-9 rounded-md border border-border bg-bg px-3 text-subhead text-label placeholder:text-tertiary-label focus:border-accent focus:outline-none";

export function CustomRatioForm({ onSave, onCancel }: CustomRatioFormProps) {
  const [label, setLabel] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = customAspectRatioSchema.safeParse({ label, width, height });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the values and try again");
      return;
    }
    onSave(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border-subtle bg-bg-elevated flex flex-col gap-2 rounded-lg border p-3"
    >
      <input
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        placeholder="Name"
        aria-label="Ratio name"
        className={inputClassName}
      />
      <div className="flex items-center gap-2">
        <input
          value={width}
          onChange={(event) => setWidth(event.target.value)}
          placeholder="Width"
          inputMode="numeric"
          aria-label="Width"
          className={cn(inputClassName, "w-full")}
        />
        <span aria-hidden className="text-tertiary-label">
          :
        </span>
        <input
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          placeholder="Height"
          inputMode="numeric"
          aria-label="Height"
          className={cn(inputClassName, "w-full")}
        />
      </div>
      {error && <p className="text-footnote text-danger">{error}</p>}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
}
