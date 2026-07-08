import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const panelVariants = cva("rounded-lg border p-5", {
  variants: {
    variant: {
      elevated: "border-border-subtle bg-bg-elevated",
      secondary: "border-border-subtle bg-bg-secondary",
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});

export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof panelVariants> {}

export function Panel({ className, variant, ...props }: PanelProps) {
  return <div className={cn(panelVariants({ variant }), className)} {...props} />;
}
