import { cn } from "@/lib/utils";
import type { AspectRatio } from "@/features/crop/types";

interface RatioListItemProps {
  ratio: AspectRatio;
  selected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}

export function RatioListItem({ ratio, selected, onSelect, onDelete }: RatioListItemProps) {
  return (
    <div className="group relative flex items-center">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "text-subhead flex flex-1 items-center gap-2.5 rounded-md py-2 pl-3 text-left transition-colors",
          onDelete ? "pr-9" : "pr-3",
          selected
            ? "bg-accent-subtle text-accent font-medium"
            : "text-secondary-label hover:bg-bg-elevated",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            selected ? "bg-accent" : "bg-tertiary-label",
          )}
        />
        <span className="flex-1 truncate">{ratio.label}</span>
        <span className="text-footnote text-tertiary-label font-mono">{ratio.ratioLabel}</span>
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          aria-label={`Remove ${ratio.label}`}
          className="text-tertiary-label hover:bg-bg-secondary hover:text-label absolute right-1.5 flex size-6 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
