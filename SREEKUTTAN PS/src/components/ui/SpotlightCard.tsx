import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: string;
};

/** Card with a soft radial spotlight that follows the cursor. */
export function SpotlightCard({ children, className, innerClassName, glow = "rgba(255, 51, 85, 0.10)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850/80 transition-[border-color,transform,box-shadow] duration-300 hover:border-white/[0.14]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 45%)`,
        }}
      />
      <div className={cn("relative h-full", innerClassName)}>{children}</div>
    </div>
  );
}
