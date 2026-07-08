import { cn } from "@/lib/utils";

const FORMATS = ["PNG", "JPG", "WebP", "AVIF"];

export function FormatMockup() {
  return (
    <div
      aria-hidden
      className="border-border-subtle bg-bg-elevated shadow-e2 w-full max-w-xs rounded-xl border p-5"
    >
      <div className="flex flex-wrap gap-2">
        {FORMATS.map((format, index) => (
          <span
            key={format}
            className={cn(
              "text-footnote rounded-full px-3 py-1.5 font-medium",
              index === 1 ? "bg-accent text-white" : "bg-bg-secondary text-secondary-label",
            )}
          >
            {format}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="text-footnote text-tertiary-label">Quality</span>
        <div className="bg-border relative h-1 flex-1 rounded-full">
          <div className="bg-accent absolute inset-y-0 left-0 w-4/5 rounded-full" />
          <div className="bg-accent shadow-e1 absolute top-1/2 left-4/5 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
      </div>
    </div>
  );
}
