import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { methodology } from "@/data/portfolio";
import { container } from "@/utils/styles";

export function Methodology() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="fade-mask-y absolute inset-0 bg-grid opacity-50" />
      </div>

      <div className={container}>
        <SectionHeading
          id="process-title"
          index="04"
          label="Methodology"
          align="center"
          title={
            <>
              How I run an <span className="text-gradient-red">engagement.</span>
            </>
          }
          description="A structured, repeatable process — thinking like a real adversary while keeping every step scoped, documented and reportable."
        />

        <ol className="relative mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-5">
          {/* Horizontal connector (desktop) */}
          <li aria-hidden className="pointer-events-none absolute left-[10%] right-[10%] top-9 hidden h-px bg-linear-to-r from-blood-500/0 via-blood-500/40 to-blood-500/0 lg:block">
            <span className="absolute -top-[3px] size-[7px] animate-travel rounded-full bg-blood-500 shadow-[0_0_14px_4px_rgba(255,51,85,0.6)]" />
          </li>
          {/* Vertical connector (mobile) */}
          <li aria-hidden className="pointer-events-none absolute bottom-10 left-9 top-10 w-px bg-linear-to-b from-blood-500/50 via-white/10 to-transparent lg:hidden" />

          {methodology.map((s, i) => (
            <li key={s.step} className="relative">
              <Reveal delay={i * 0.08} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <div className="group relative z-10 grid size-[72px] shrink-0 place-items-center rounded-2xl border border-white/10 bg-ink-850 shadow-lg shadow-black/40 transition-colors duration-300 hover:border-blood-500/40">
                  <s.icon className="size-7 text-blood-400 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -right-2 -top-2 rounded-md border border-blood-500/30 bg-ink-950 px-1.5 py-0.5 font-mono text-[10px] text-blood-300">
                    {s.step}
                  </span>
                </div>
                <div className="pt-1 lg:pt-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.description}</p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5 lg:justify-center">
                    {s.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
