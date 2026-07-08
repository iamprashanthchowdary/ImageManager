"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { CustomRatioForm } from "@/features/crop/components/CustomRatioForm";
import { RatioListItem } from "@/features/crop/components/RatioListItem";
import type { useAspectRatios } from "@/features/crop/hooks/use-aspect-ratios";

interface RatioPickerProps {
  ratios: ReturnType<typeof useAspectRatios>;
  selectedId: string;
  onSelectId: (id: string) => void;
}

export function RatioPicker({ ratios, selectedId, onSelectId }: RatioPickerProps) {
  const { show } = useToast();
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 lg:w-72">
      <button
        type="button"
        onClick={() => onSelectId("original")}
        aria-pressed={selectedId === "original"}
        className={cn(
          "text-subhead flex items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors",
          selectedId === "original"
            ? "bg-accent-subtle text-accent font-medium"
            : "text-secondary-label hover:bg-bg-elevated",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            selectedId === "original" ? "bg-accent" : "bg-tertiary-label",
          )}
        />
        Original
      </button>

      <div>
        <div className="mb-1.5 flex items-center justify-between px-3">
          <span className="text-footnote text-tertiary-label font-semibold">Presets</span>
          {ratios.hasHiddenBuiltIns && (
            <button
              type="button"
              onClick={ratios.restoreAllBuiltIns}
              className="text-footnote text-accent hover:opacity-80"
            >
              Restore defaults
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {ratios.presets.map((preset) => (
            <RatioListItem
              key={preset.id}
              ratio={preset}
              selected={selectedId === preset.id}
              onSelect={() => onSelectId(preset.id)}
              onDelete={() => {
                ratios.deleteBuiltIn(preset.id);
                if (selectedId === preset.id) {
                  onSelectId("original");
                }
                show(`"${preset.label}" removed`, {
                  action: { label: "Undo", onClick: () => ratios.restoreBuiltIn(preset.id) },
                });
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-footnote text-tertiary-label mb-1.5 px-3 font-semibold">Custom</div>
        <div className="flex flex-col gap-1">
          {ratios.customRatios.map((custom) => (
            <RatioListItem
              key={custom.id}
              ratio={custom}
              selected={selectedId === custom.id}
              onSelect={() => onSelectId(custom.id)}
              onDelete={() => {
                ratios.deleteCustom(custom.id);
                if (selectedId === custom.id) {
                  onSelectId("original");
                }
                show(`"${custom.label}" removed`, {
                  action: { label: "Undo", onClick: () => ratios.restoreCustom(custom) },
                });
              }}
            />
          ))}
        </div>

        {isAddingCustom ? (
          <div className="mt-1">
            <CustomRatioForm
              onCancel={() => setIsAddingCustom(false)}
              onSave={(input) => {
                const ratio = ratios.addCustom(input);
                onSelectId(ratio.id);
                setIsAddingCustom(false);
              }}
            />
          </div>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-1 w-full justify-start"
            onClick={() => setIsAddingCustom(true)}
          >
            Add ratio
          </Button>
        )}
      </div>
    </div>
  );
}
