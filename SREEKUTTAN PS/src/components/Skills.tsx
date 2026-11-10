import type { ReactNode } from "react";
import { CircleCheck, Cloud, Code2, FileText, Smartphone, Swords, Target, Wrench } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Reveal } from "./ui/Reveal";
import { attackSurfaces, marquee, skills, type IconType } from "@/data/portfolio";
import { container } from "@/utils/styles";
import { cn } from "@/utils/cn";

function CardHeader({ icon: Icon, title, badge }: { icon: IconType; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-blood-500/20 bg-blood-500/[0.08] text-blood-400 transition-colors group-hover/spot:border-blood-500/40 group-hover/spot:text-blood-300">
        <Icon className="size-5" />
      </span>
      <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
      {badge && (
        <span className="ml-auto shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
          {badge}
        </span>
      )}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">{children}</div>;
}

function RadarVisual() {
  const blips = [
    { top: "26%", left: "62%", delay: "0s" },
    { top: "64%", left: "30%", delay: "1.2s" },
    { top: "70%", left: "68%", delay: "2.1s" },
    { top: "38%", left: "24%", delay: "3s" },
  ];
  return (
    <div className="relative aspect-square w-full" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-blood-500/25" />
      <div className="absolute inset-[16%] rounded-full border border-blood-500/15" />
      <div className="absolute inset-[33%] rounded-full border border-blood-500/10" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-blood-500/10" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-blood-500/10" />
      <div
        className="absolute inset-0 animate-radar rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(255,51,85,0.05) 300deg, rgba(255,51,85,0.38) 360deg)",
        }}
      />
      {blips.map((b) => (
        <span key={b.top + b.left} className="absolute flex size-2.5" style={{ top: b.top, left: b.left }}>
          <span
            className="absolute inline-flex size-full animate-ping rounded-full bg-blood-500 opacity-70"
            style={{ animationDelay: b.delay, animationDuration: "2.8s" }}
          />
          <span className="relative inline-flex size-2.5 rounded-full bg-blood-500 shadow-[0_0_10px_2px_rgba(255,51,85,0.6)]" />
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
    </div>
  );
}

function Marquee() {
  return (
    <div className="fade-mask-x relative mt-14 overflow-hidden py-2" aria-label="Tools and technologies">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...marquee, ...marquee].map((t, i) => (
          <span
            key={`${t}-${i}`}
            aria-hidden={i >= marquee.length}
            className="mr-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 font-mono text-[13px] text-zinc-400"
          >
            <span className="size-1.5 rounded-full bg-blood-500/80" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="fade-mask-y absolute inset-0 bg-dots opacity-60" />
        <div className="absolute left-[-10%] top-1/3 size-[420px] rounded-full bg-blood-600/[0.06] blur-[120px]" />
      </div>

      <div className={container}>
        <SectionHeading
          id="skills-title"
          index="02"
          label="Technical arsenal"
          title={
            <>
              The toolkit behind <span className="text-gradient-red">every engagement.</span>
            </>
          }
          description="From reconnaissance to the final report — the disciplines, languages, platforms and tools I use to find, exploit and document security weaknesses."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Offensive security */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-8 p-7 sm:flex-row sm:items-center sm:p-8">
                <div className="flex-1">
                  <CardHeader icon={Swords} title="Offensive Security" badge="Core focus" />
                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
                    End-to-end adversary simulation — mapping attack surfaces, exploiting weaknesses and proving
                    real-world impact.
                  </p>
                  <div className="mt-6">
                    <Label>Disciplines</Label>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {skills.offensive.disciplines.map((d) => (
                        <span
                          key={d}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-zinc-100"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5">
                    <Label>Weapons of choice</Label>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {skills.offensive.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-blood-500/25 bg-blood-500/[0.08] px-3 py-1.5 font-mono text-[13px] text-blood-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mx-auto hidden w-[190px] shrink-0 sm:block lg:w-[210px]">
                  <RadarVisual />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Programming */}
          <Reveal delay={0.06}>
            <SpotlightCard className="h-full">
              <div className="p-7">
                <CardHeader icon={Code2} title="Programming" badge="5 langs" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Scripting custom tooling to automate offensive workflows.
                </p>
                <ul className="mt-5 space-y-2">
                  {skills.programming.map((l) => (
                    <li
                      key={l.name}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5"
                    >
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: l.color, boxShadow: `0 0 10px ${l.color}90` }}
                      />
                      <span className="font-mono text-sm text-zinc-100">{l.name}</span>
                      <span className="ml-auto truncate text-right text-xs text-zinc-500">{l.use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Cloud */}
          <Reveal>
            <SpotlightCard className="h-full">
              <div className="p-7">
                <CardHeader icon={Cloud} title="Cloud Security" badge="Foundational" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Hunting misconfigurations and simulating privilege escalation in cloud test environments.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {skills.cloud.platforms.map((c) => (
                    <div
                      key={c}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] py-3 text-center font-mono text-sm font-medium text-zinc-100"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className="size-1.5 rounded-full bg-term-amber" />
                  {skills.cloud.focus}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Mobile */}
          <Reveal delay={0.06}>
            <SpotlightCard className="h-full">
              <div className="p-7">
                <CardHeader icon={Smartphone} title="Mobile Security" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Static &amp; dynamic analysis of mobile apps to expose insecure storage and hardcoded secrets.
                </p>
                <ul className="mt-5 space-y-2">
                  {skills.mobile.map((m) => (
                    <li key={m.name} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-zinc-200">{m.name}</span>
                      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-zinc-500">
                        {m.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Tools */}
          <Reveal delay={0.12}>
            <SpotlightCard className="h-full">
              <div className="p-7">
                <CardHeader icon={Wrench} title="Tooling" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Daily drivers for traffic analysis, injection testing and API exploration.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Attack surface */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="h-full">
              <div className="p-7 sm:p-8">
                <CardHeader icon={Target} title="Attack Surface Coverage" badge="5 vectors" />
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {attackSurfaces.map((s, i) => (
                    <div
                      key={s.label}
                      className={cn(
                        "group/tile rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-blood-500/30 hover:bg-blood-500/[0.05]",
                        i === attackSurfaces.length - 1 && "col-span-2 sm:col-span-1"
                      )}
                    >
                      <s.icon className="size-5 text-zinc-400 transition-colors group-hover/tile:text-blood-400" />
                      <div className="mt-3 text-sm font-semibold text-white">{s.label}</div>
                      <div className="mt-0.5 font-mono text-[10.5px] text-zinc-500">{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Reporting */}
          <Reveal delay={0.06} className="md:col-span-2 lg:col-span-1">
            <SpotlightCard className="h-full">
              <div className="p-7">
                <CardHeader icon={FileText} title="Reporting" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Turning findings into clear, risk-rated, actionable reports.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {skills.reporting.map((r) => (
                    <li key={r} className="flex items-center gap-2.5 text-sm text-zinc-200">
                      <CircleCheck className="size-4 shrink-0 text-term-green" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <Marquee />
      </div>
    </section>
  );
}
