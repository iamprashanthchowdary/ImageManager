import { cn } from "@/lib/utils";

const SAMPLE_RATIOS = [
  { label: "Square", ratio: "1:1", selected: false },
  { label: "Story", ratio: "9:16", selected: true },
  { label: "Landscape", ratio: "16:9", selected: false },
  { label: "Pinterest pin", ratio: "2:3", selected: false },
];

export function RatioMockup() {
  return (
    <div
      aria-hidden
      className="border-border-subtle bg-bg-elevated shadow-e2 w-full max-w-xs rounded-xl border p-2"
    >
      {SAMPLE_RATIOS.map((item) => (
        <div
          key={item.label}
          className={cn(
            "text-subhead flex items-center gap-2.5 rounded-md px-3 py-2.5",
            item.selected ? "bg-accent-subtle text-accent font-medium" : "text-secondary-label",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              item.selected ? "bg-accent" : "bg-tertiary-label",
            )}
          />
          <span className="flex-1">{item.label}</span>
          <span className="text-footnote text-tertiary-label font-mono">{item.ratio}</span>
        </div>
      ))}
    </div>
  );
}
