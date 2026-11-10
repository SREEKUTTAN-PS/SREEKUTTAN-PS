import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CircleCheck, Target, Wrench, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { allPhases, profile, projects, type TermLine } from "@/data/portfolio";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";

type Props = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const lineColor = (t: TermLine["type"]) =>
  t === "cmd" ? "text-zinc-100" : t === "ok" ? "text-term-green" : t === "warn" ? "text-term-amber" : "text-zinc-500";

export function ProjectModal({ index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const project = open ? projects[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = projects.length;

  useLockBodyScroll(open);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate, total]);

  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  const prev = index !== null ? projects[(index - 1 + total) % total] : null;
  const next = index !== null ? projects[(index + 1) % total] : null;

  return createPortal(
    <AnimatePresence>
      {project && index !== null && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:rounded-3xl"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-500/70 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs">
                <span className="text-blood-400">{project.code}</span>
                <span className="text-zinc-700">/</span>
                <span className="truncate text-zinc-500">{project.path}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-[11px] text-zinc-600 sm:inline">
                  {index + 1} / {total}
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="grid size-9 cursor-pointer place-items-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="overflow-y-auto px-5 py-7 sm:px-8"
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-blood-500/20 bg-blood-500/[0.08] px-2 py-0.5 font-mono text-[11px] text-blood-300"
                  >
                    {t}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-md border border-term-green/20 bg-term-green/[0.06] px-2 py-0.5 font-mono text-[11px] text-term-green">
                  <CircleCheck className="size-3" /> Completed
                </span>
              </div>

              <h2
                id="project-modal-title"
                className="mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl"
              >
                {project.title}
              </h2>
              <p className="mt-1.5 text-zinc-500">{project.subtitle}</p>
              <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-[17px]">{project.summary}</p>

              {/* Terminal */}
              <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-ink-950">
                <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">{project.path}</span>
                </div>
                <div className="space-y-1.5 overflow-x-auto px-4 py-4 font-mono text-[12.5px]">
                  {project.terminal.map((l, i) => (
                    <div key={i} className={cn("whitespace-nowrap", lineColor(l.type))}>
                      {l.type === "cmd" && <span className="text-blood-400">$ </span>}
                      {l.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phases */}
              <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Kill-chain coverage</h3>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {allPhases.map((ph, i) => {
                  const covered = project.phases.includes(ph);
                  return (
                    <div key={ph} className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-lg border px-2.5 py-1 text-xs font-medium",
                          covered
                            ? "border-blood-500/40 bg-blood-500/10 text-blood-200"
                            : "border-white/[0.06] bg-transparent text-zinc-600"
                        )}
                      >
                        {ph}
                      </span>
                      {i < allPhases.length - 1 && <span className="h-px w-3 bg-white/10" aria-hidden />}
                    </div>
                  );
                })}
              </div>

              {/* Activities */}
              <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Key activities</h3>
              <ul className="mt-3 space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={h} className="flex gap-3.5 text-[15px] leading-relaxed text-zinc-300">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] text-blood-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    <Wrench className="size-3.5 text-blood-400" /> Tools &amp; tech
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-blood-500/15 bg-blood-500/[0.04] p-5">
                  <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    <Target className="size-3.5 text-blood-400" /> Outcome
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.outcome}</p>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-3.5 sm:px-7">
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + total) % total)}
                className="group inline-flex min-w-0 cursor-pointer items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                aria-label={`Previous project: ${prev?.title}`}
              >
                <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden truncate sm:inline">{prev?.title}</span>
                <span className="sm:hidden">Prev</span>
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <GithubIcon className="size-3.5" /> GitHub
              </a>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % total)}
                className="group inline-flex min-w-0 cursor-pointer items-center justify-end gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                aria-label={`Next project: ${next?.title}`}
              >
                <span className="hidden truncate sm:inline">{next?.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
