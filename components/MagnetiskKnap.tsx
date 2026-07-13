"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "outline";
  className?: string;
};

// CTA-knap med magnetisk hover-effekt (respekterer reduceret bevægelse).
export function MagnetiskKnap({
  href,
  children,
  variant = "accent",
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reducer = useReducedMotion();

  function haandterBevaeg(e: React.MouseEvent) {
    if (reducer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setPos({ x: x * 0.25, y: y * 0.35 });
  }

  const stil =
    variant === "accent"
      ? "bg-accent text-white hover:bg-accent-klar shadow-[0_0_0_1px_rgba(212,34,51,0.4),0_18px_40px_-18px_rgba(212,34,51,0.7)]"
      : "border border-linje bg-ink-2/60 text-krom hover:border-staal-lys";

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={haandterBevaeg}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors",
          stil,
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
