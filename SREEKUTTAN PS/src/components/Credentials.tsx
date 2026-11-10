import { Award, BookOpen, Calendar, CircleCheck, GraduationCap, Layers, MapPin } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Reveal } from "./ui/Reveal";
import { certifications, education, type Certification } from "@/data/portfolio";
import { container } from "@/utils/styles";

function StatusBadge({ status, label }: { status: Certification["status"]; label: string }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-term-green/25 bg-term-green/[0.08] px-2.5 py-1 font-mono text-[11px] text-term-green">
        <CircleCheck className="size-3.5" /> {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-term-amber/25 bg-term-amber/[0.08] px-2.5 py-1 font-mono text-[11px] text-term-amber">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-term-amber opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-term-amber" />
      </span>
      {label}
    </span>
  );
}

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[30%] size-[420px] rounded-full bg-blood-600/[0.06] blur-[120px]" />
      </div>

      <div className={container}>
        <SectionHeading
          id="credentials-title"
          index="05"
          label="Credentials"
          title={
            <>
              Training, certifications <span className="text-zinc-500">&amp; education.</span>
            </>
          }
          description="Structured offensive-security training backed by an academic foundation in computer science."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Certifications timeline */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                <Award className="size-4 text-blood-400" /> Certifications &amp; training
              </h3>
            </Reveal>

            <ol className="relative space-y-5">
              <li aria-hidden className="absolute bottom-6 left-[7px] top-6 w-px bg-linear-to-b from-blood-500/60 via-white/10 to-transparent" />
              {certifications.map((c, i) => (
                <li key={c.title} className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-7 grid size-[15px] place-items-center rounded-full border border-blood-500/60 bg-ink-950"
                  >
                    <span className="size-[5px] rounded-full bg-blood-500" />
                  </span>
                  <Reveal delay={i * 0.08}>
                    <SpotlightCard>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
                            <Calendar className="size-3.5" /> {c.period}
                          </span>
                          <StatusBadge status={c.status} label={c.statusLabel} />
                        </div>
                        <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">{c.title}</h4>
                        <p className="mt-1 text-sm text-blood-300">{c.issuer ?? "Professional course"}</p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.description}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {c.tags.map((t) => (
                            <span key={t} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                <GraduationCap className="size-4 text-blood-400" /> Education
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard className="bg-linear-to-b from-ink-800/90 to-ink-850/90">
                <div className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-blood-500/25 bg-blood-500/[0.08] text-blood-400">
                      <GraduationCap className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-term-blue/25 bg-term-blue/[0.08] px-2.5 py-0.5 font-mono text-[10.5px] text-term-blue">
                        <span className="size-1.5 animate-pulse rounded-full bg-term-blue" />
                        {education.status}
                      </span>
                      <h4 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white">
                        {education.degree}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" /> {education.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-3.5" /> {education.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
                    Relevant coursework
                  </div>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {education.coursework.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-zinc-300"
                      >
                        <BookOpen className="size-3.5 shrink-0 text-blood-400/80" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-blood-500/20 bg-blood-500/[0.06] p-4">
                    <Layers className="size-6 shrink-0 text-blood-400" />
                    <p className="text-sm leading-snug text-zinc-400">
                      <span className="font-medium text-white">Theory meets practice</span> — CS fundamentals in
                      networks, operating systems and low-level programming, built alongside hands-on offensive security
                      work.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
