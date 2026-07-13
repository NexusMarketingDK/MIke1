"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

// Reveal-on-scroll: staggered fade + 16px translate, kun én gang.
export function Afsloer({ children, className, delay = 0, as = "div" }: Props) {
  const reducer = useReducedMotion();
  const Komp = motion[as];

  if (reducer) {
    const Statisk = as;
    return <Statisk className={className}>{children}</Statisk>;
  }

  return (
    <Komp
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </Komp>
  );
}
