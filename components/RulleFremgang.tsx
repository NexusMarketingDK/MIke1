"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Tynd hairline-fremgangslinje i accentfarven øverst på siden.
export function RulleFremgang() {
  const { scrollYProgress } = useScroll();
  const bredde = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: bredde }}
      className="respekter-reduceret fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-accent"
    />
  );
}
