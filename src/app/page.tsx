import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">{siteConfig.description}</p>
      <p className="text-sm text-zinc-500">
        Scaffold ready — see{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">CLAUDE.md</code> and{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">docs/ROADMAP.md</code>{" "}
        for what&apos;s next.
      </p>
    </main>
  );
}
