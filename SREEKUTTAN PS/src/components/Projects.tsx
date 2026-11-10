import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, CircleCheck } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Reveal } from "./ui/Reveal";
import { GithubIcon } from "./icons";
import { ProjectModal } from "./ProjectModal";
import { profile, projects, type Project, type TermLine } from "@/data/portfolio";
import { container } from "@/utils/styles";
import { cn } from "@/utils/cn";

const lineColor = (t: TermLine["type"]) =>
  t === "cmd" ? "text-zinc-100" : t === "ok" ? "text-term-green" : t === "warn" ? "text-term-amber" : "text-zinc-500";

function TerminalPreview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative overflow-hidden border-b border-white/[0.06] bg-ink-950/70">
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.35]" />
      <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-blood-600/[0.12] blur-3xl" />

      <div className="relative flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/10 transition-colors duration-300 group-hover/spot:bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-white/10 transition-colors delay-75 duration-300 group-hover/spot:bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-white/10 transition-colors delay-150 duration-300 group-hover/spot:bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-zinc-500">{project.path}</span>
        <span className="ml-auto font-mono text-[11px] text-blood-400/90">{project.code}</span>
      </div>

      <div className="relative min-h-[128px] space-y-1.5 px-4 py-4 font-mono text-[12px] sm:text-[12.5px]">
        {project.terminal.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.2 + i * 0.32, duration: 0.3 }}
            className={cn("truncate", lineColor(l.type))}
          >
            {l.type === "cmd" && <span className="text-blood-400">$ </span>}
            {l.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <SpotlightCard className="h-full hover:shadow-[0_30px_80px_-40px_rgba(255,51,85,0.45)]" innerClassName="flex flex-col">
        <article className="flex h-full flex-col" aria-labelledby={`${project.id}-title`}>
          <TerminalPreview project={project} />

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-blood-500/20 bg-blood-500/[0.08] px-2 py-0.5 font-mono text-[11px] text-blood-300"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-term-green">
                <CircleCheck className="size-3.5" /> Completed
              </span>
            </div>

            <h3 id={`${project.id}-title`} className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-white">
              <button type="button" onClick={onOpen} className="cursor-pointer text-left transition-colors hover:text-blood-200">
                {project.title}
              </button>
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{project.subtitle}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{project.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-blood-500" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {project.stack.map((s) => (
                <span key={s} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-zinc-400">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
              <button
                type="button"
                onClick={onOpen}
                className="group/btn inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-white"
              >
                Read case study
                <ArrowRight className="size-4 text-blood-400 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View on GitHub"
                title="GitHub"
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <GithubIcon className="size-5" />
              </a>
            </div>
          </div>
        </article>
      </SpotlightCard>
    </Reveal>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-8%] top-[20%] size-[480px] rounded-full bg-blood-600/[0.07] blur-[130px]" />
      </div>

      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            index="03"
            label="Featured projects"
            title={
              <>
                Field-tested <span className="text-gradient-red">operations.</span>
              </>
            }
            description="Hands-on offensive security work across web, API, cloud, mobile and network attack surfaces — each one documented end-to-end."
          />
          <Reveal delay={0.1} className="shrink-0">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <GithubIcon className="size-4" />
              More on GitHub
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(i)} />
          ))}
        </div>
      </div>

      <ProjectModal index={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />
    </section>
  );
}
