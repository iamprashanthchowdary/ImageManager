export function CropMockup() {
  return (
    <div
      aria-hidden
      className="border-border-subtle bg-bg-secondary shadow-e2 relative aspect-4/3 w-full overflow-hidden rounded-xl border"
    >
      <div className="bg-accent absolute top-1/2 left-1/2 h-[85%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-sm" />
      <div className="absolute inset-[14%] grid grid-cols-3 grid-rows-3 overflow-hidden rounded-lg ring-2 ring-white">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="border border-white/40" />
        ))}
      </div>
    </div>
  );
}
