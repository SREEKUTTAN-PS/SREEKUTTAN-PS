import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, description, align = "left", id, className }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <div
        className={cn(
          "mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-blood-400 sm:text-xs",
          centered && "justify-center"
        )}
      >
        <span className="text-zinc-600">{index}</span>
        <span className="h-px w-8 bg-linear-to-r from-blood-500 to-blood-500/0" />
        <span>{label}</span>
      </div>
      <h2
        id={id}
        className="font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-zinc-400 text-pretty sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
