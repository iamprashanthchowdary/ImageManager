"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  title: string;
  description: string;
  visual: ReactNode;
  reverse?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeatureSection({ title, description, visual, reverse }: FeatureSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn("flex flex-col gap-3", reverse && "lg:order-2")}
      >
        <h2 className="font-display text-title-1 text-label font-bold">{title}</h2>
        <p className="text-body text-secondary-label">{description}</p>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={reverse ? "lg:order-1" : undefined}
      >
        {visual}
      </motion.div>
    </section>
  );
}
