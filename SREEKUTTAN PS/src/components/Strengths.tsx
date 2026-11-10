import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Reveal } from "./ui/Reveal";
import { strengths } from "@/data/portfolio";
import { container } from "@/utils/styles";

export function Strengths() {
  return (
    <section id="strengths" aria-labelledby="strengths-title" className="relative py-24 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="strengths-title"
          index="06"
          label="Key strengths"
          title={
            <>
              What I bring to <span className="text-gradient-red">your team.</span>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-blood-400 transition-all duration-300 group-hover/spot:border-blood-500/40 group-hover/spot:bg-blood-500/10">
                      <s.icon className="size-[22px]" />
                    </span>
                    <span className="font-mono text-xs text-zinc-600">0x{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">{s.description}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}

          {/* CTA tile */}
          <Reveal delay={0.14} className="h-full">
            <a
              href="#contact"
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-blood-500/30 bg-linear-to-br from-blood-600/25 via-blood-700/10 to-transparent p-7 transition-all duration-300 hover:border-blood-500/60 hover:shadow-[0_30px_80px_-30px_rgba(255,51,85,0.6)]"
            >
              <div aria-hidden className="absolute -bottom-20 -right-20 size-56 rounded-full bg-blood-500/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <span className="relative font-mono text-xs uppercase tracking-[0.2em] text-blood-300">Hiring a security engineer?</span>
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white">
                  Let&apos;s add an offensive mindset to your security team.
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Start a conversation
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
