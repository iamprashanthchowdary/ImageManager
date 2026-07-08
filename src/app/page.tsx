import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Badge variant="accent">Design system online</Badge>

      <h1 className="font-display text-large-title text-label font-bold">{siteConfig.name}</h1>

      <p className="text-body text-secondary-label max-w-md">{siteConfig.description}</p>

      <div className="flex items-center gap-3 pt-2">
        <Button variant="primary">Get started</Button>
        <Button variant="secondary">Learn more</Button>
      </div>

      <Panel variant="secondary" className="mt-8 max-w-md text-left">
        <p className="text-subhead text-secondary-label">
          {"Scaffold ready — see "}
          <code className="text-footnote text-label">CLAUDE.md</code>
          {" and "}
          <code className="text-footnote text-label">docs/ROADMAP.md</code>
          {" for what's next."}
        </p>
      </Panel>
    </main>
  );
}
