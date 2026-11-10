import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { attackSurfaces, profile, stats } from "@/data/portfolio";
import { container } from "@/utils/styles";
import { cn } from "@/utils/cn";

const Hl = ({ children }: { children: ReactNode }) => <span className="font-medium text-zinc-100">{children}</span>;

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

const BARCODE = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 1, 2, 2, 1, 3, 1, 2];

function DossierCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const rows: [string, ReactNode][] = [
    ["Specialization", "Red Team · Offensive Security"],
    ["Base", `${profile.location}, IN`],
    ["Attack surface", "Web · API · Mobile · Cloud"],
    ["Training", profile.training],
    ["Toolkit", "Burp Suite Pro · Metasploit · Nmap"],
    ["Languages", "Python · Go · PowerShell"],
  ];

  return (
    <Reveal delay={0.1} className="[perspective:1400px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-ink-800 to-ink-900 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
      >
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-blood-600/20 blur-[80px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-500/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-white/10 px-6 py-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-500 sm:px-7">
          <span className="flex items-center gap-2">
            <Fingerprint className="size-4 text-blood-400" />
            Operator file
          </span>
          <span>ID · SPS-0292</span>
        </div>

        <div className="p-6 sm:p-7">
          {/* Identity */}
          <div className="flex items-center gap-5">
            <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-ink-950">
              <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-60" />
              <span className="text-gradient-red relative font-display text-3xl font-bold tracking-tight">SPS</span>
              <span aria-hidden className="absolute inset-x-2 h-px animate-scan bg-blood-500 shadow-[0_0_12px_2px_rgba(255,51,85,0.7)]" />
              {/* corner brackets */}
              <span aria-hidden className="absolute left-1.5 top-1.5 size-3 border-l border-t border-blood-500/70" />
              <span aria-hidden className="absolute right-1.5 top-1.5 size-3 border-r border-t border-blood-500/70" />
              <span aria-hidden className="absolute bottom-1.5 left-1.5 size-3 border-b border-l border-blood-500/70" />
              <span aria-hidden className="absolute bottom-1.5 right-1.5 size-3 border-b border-r border-blood-500/70" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{profile.name}</h3>
              <p className="mt-0.5 text-sm text-zinc-400">{profile.role}</p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-term-green/25 bg-term-green/[0.07] px-2.5 py-1 font-mono text-[10.5px] text-term-green">
                <span className="size-1.5 animate-pulse rounded-full bg-term-green" />
                Open to work
              </span>
            </div>
          </div>

          {/* Details */}
          <dl className="mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">{k}</dt>
                <dd className="text-right text-sm text-zinc-200">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Footer */}
          <div className="mt-6 flex items-end justify-between gap-4">
            <div aria-hidden className="flex h-10 items-stretch gap-[2px] opacity-70">
              {BARCODE.map((w, i) => (
                <span key={i} className={cn("bg-zinc-300", i % 7 === 0 && "bg-blood-500")} style={{ width: w }} />
              ))}
            </div>
            <div className="text-right font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.2em] text-zinc-500">
              Authorized testing
              <br />
              <span className="text-blood-400">ethical use only</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10%] top-1/4 size-[460px] rounded-full bg-blood-600/[0.07] blur-[120px]" />
      </div>

      <div className={container}>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="about-title"
              index="01"
              label="About me"
              title={
                <>
                  Breaking systems to <span className="text-zinc-500">make them stronger.</span>
                </>
              }
            />

            <Reveal delay={0.05} className="mt-8 space-y-5 text-base leading-[1.8] text-zinc-400 sm:text-[17px]">
              <p>
                I&apos;m a cybersecurity enthusiast pursuing a <Hl>BSc in Computer Science</Hl>, with hands-on
                experience in <Hl>Red Teaming</Hl>, <Hl>penetration testing</Hl> and <Hl>vulnerability research</Hl>.
              </p>
              <p>
                Alongside that, I&apos;ve gained practical exposure to <Hl>Web, API, Mobile and Cloud</Hl> security
                testing — and I&apos;m proficient in <Hl>Python, Go and PowerShell</Hl> scripting for offensive
                automation.
              </p>
              <p>
                I&apos;m passionate about exploiting vulnerabilities, building tools and delivering{" "}
                <Hl>actionable technical reports</Hl>. Right now I&apos;m looking for a{" "}
                <span className="font-medium text-blood-400">Security Engineer</span> role where I can contribute to
                real offensive security operations.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
              {attackSurfaces.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-sm text-zinc-300"
                >
                  <s.icon className="size-3.5 text-blood-400" />
                  {s.label}
                </span>
              ))}
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.08 + i * 0.06} className="h-full">
                  <div className="group h-full rounded-2xl border border-white/[0.07] bg-ink-850/70 p-5 transition-colors hover:border-blood-500/30">
                    <div className="font-display text-4xl font-semibold tracking-tight text-white">
                      <Counter to={s.value} />
                      <span className="text-blood-500">.</span>
                    </div>
                    <div className="mt-2 text-sm font-medium text-zinc-200">{s.label}</div>
                    <div className="mt-1 font-mono text-[10.5px] leading-snug text-zinc-500">{s.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <DossierCard />
          </div>
        </div>
      </div>
    </section>
  );
}
