import type { ReactNode } from "react";

export function AppShell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-bg flex min-h-dvh">
      {sidebar}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
