import { cn } from "@/lib/utils";

// Horisontal logo-lockup (SVG-gengivelse i brandets stål/rød).
// NB: erstattes af den officielle MTVagt-logo2.png når filen lægges i /public.
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 48"
        className="h-full w-auto"
        role="img"
        aria-label="MT Vagt logo"
      >
        <defs>
          <linearGradient id="staalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EEF1F4" />
            <stop offset="0.5" stopColor="#9AA2AB" />
            <stop offset="1" stopColor="#333A42" />
          </linearGradient>
        </defs>
        {/* Skjold */}
        <path
          d="M20 1 L38 7 V24 C38 36 30 43 20 47 C10 43 2 36 2 24 V7 Z"
          fill="none"
          stroke="url(#staalGrad)"
          strokeWidth="2"
        />
        {/* MTV lodret i rødt */}
        <text
          x="14"
          y="20"
          fontFamily="var(--font-archivo)"
          fontSize="11"
          fontWeight="800"
          fill="#D42233"
          textAnchor="middle"
        >
          M
        </text>
        <text
          x="14"
          y="30"
          fontFamily="var(--font-archivo)"
          fontSize="11"
          fontWeight="800"
          fill="#D42233"
          textAnchor="middle"
        >
          T
        </text>
        <text
          x="14"
          y="40"
          fontFamily="var(--font-archivo)"
          fontSize="11"
          fontWeight="800"
          fill="#D42233"
          textAnchor="middle"
        >
          V
        </text>
        {/* Løve-antydning i sølv */}
        <path
          d="M24 14 C31 15 33 21 30 27 C28 31 24 33 22 38 C25 30 22 24 24 14 Z"
          fill="url(#staalGrad)"
          opacity="0.9"
        />
      </svg>
      <span className="leading-none">
        <span className="block font-[family-name:var(--font-archivo)] text-lg font-extrabold tracking-tight text-krom">
          MT<span className="text-accent">vagt</span>
        </span>
        <span className="block text-[0.55rem] font-semibold tracking-[0.35em] text-staal-lys">
          SECURITY
        </span>
      </span>
    </div>
  );
}
