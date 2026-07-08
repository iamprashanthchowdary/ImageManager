"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-24 text-center lg:py-32"
    >
      <h2 className="font-display text-title-1 text-label font-bold">Try it now.</h2>
      <p className="text-body text-secondary-label">No sign-up. Nothing to install.</p>
      <Link href="/crop" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-1")}>
        Crop a photo
      </Link>
    </motion.section>
  );
}
