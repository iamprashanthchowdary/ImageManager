"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // resolvedTheme is genuinely unknown during SSR (it depends on localStorage/matchMedia,
  // neither available on the server) — next-themes only resolves it after mount. Gating on
  // `mounted` avoids the button's label flashing the wrong theme for one frame before that
  // resolves. This is the pattern next-themes' own docs recommend for exactly this case.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle color theme"}
      className={cn(
        "border-border flex shrink-0 items-center gap-2.5 rounded-full border",
        "bg-bg-elevated text-footnote text-label px-4 py-2.5 font-sans font-medium",
        "shadow-e1 hover:bg-bg-secondary transition-colors",
      )}
    >
      <span className="bg-accent size-2 rounded-full" aria-hidden />
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </button>
  );
}
