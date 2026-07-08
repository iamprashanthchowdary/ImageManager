import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <nav
      aria-label="Primary"
      className="border-border-subtle bg-bg-secondary flex w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r p-3"
    >
      {children}
    </nav>
  );
}

export function SidebarSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-1">
      <div className="text-footnote text-tertiary-label px-3 pb-1.5 font-sans font-semibold">
        {label}
      </div>
      {children}
    </div>
  );
}

export function SidebarItem({
  href,
  active = false,
  trailing,
  children,
}: {
  href: string;
  active?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-subhead flex items-center gap-2.5 rounded-md px-3 py-2 font-sans transition-colors",
        active
          ? "bg-accent-subtle text-accent font-medium"
          : "text-secondary-label hover:bg-bg-elevated",
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 shrink-0 rounded-full", active ? "bg-accent" : "bg-tertiary-label")}
      />
      <span className="flex-1 truncate">{children}</span>
      {trailing !== undefined && (
        <span className="text-footnote text-tertiary-label font-mono">{trailing}</span>
      )}
    </Link>
  );
}
