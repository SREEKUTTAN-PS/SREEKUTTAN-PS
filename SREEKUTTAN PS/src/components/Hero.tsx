import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Bug, FileText, Mail, MapPin, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { NetworkCanvas } from "./NetworkCanvas";
import { Terminal } from "./terminal/Terminal";
import { mailto, profile } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/useTypewriter";
import { btn, container } from "@/utils/styles";
import { cn } from "@/utils/cn";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const socials = [
  { href: profile.github, label: "GitHub", icon: GithubIcon, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
  { href: mailto, label: "Email", icon: Mail, external: false },
];

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const reduce = useReducedMotion();
  const typed = useTypewriter(profile.focus, { enabled: !reduce });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center pb-24 pt-28 lg:pt-32"
    >
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid fade-mask-radial" />
        <NetworkCanvas className="absolute inset-0 h-full w-full opacity-80" />
        <div className="absolute -top-56 left-1/2 h-[560px] w-[min(1100px,140vw)] -translate-x-1/2 rounded-full bg-blood-600/[0.16] blur-[130px]" />
        <div className="absolute -right-40 bottom-10 h-[380px] w-[480px] rounded-full bg-ember-500/[0.07] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-ink-950" />
      </div>

      <div className={cn(container, "grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14")}>
        {/* Copy */}
        <motion.div variants={list} initial="hidden" animate="show" className="min-w-0 max-w-2xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-term-green/25 bg-term-green/[0.07] px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-wide text-term-green sm:text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-term-green opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-term-green" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-8 font-mono text-sm text-zinc-500">
            <span className="text-blood-500">$</span> whoami
          </motion.p>

          <motion.h1
            variants={item}
            className="glitch mt-3 font-display text-[2.85rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            {profile.name}
            <span aria-hidden="true" className="glitch-layer glitch-layer-a">
              {profile.name}
            </span>
            <span aria-hidden="true" className="glitch-layer glitch-layer-b">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-display text-xl font-medium tracking-tight text-zinc-400 sm:text-2xl lg:text-[1.7rem]"
          >
            Aspiring <span className="text-gradient-red font-semibold">Security Engineer</span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex h-7 items-center font-mono text-[15px] text-zinc-300 sm:text-base"
          >
            <span className="sr-only">Focus areas: {profile.focus.join(", ")}</span>
            <span aria-hidden className="mr-2 text-blood-500">
              &gt;
            </span>
            <span aria-hidden>{typed}</span>
            <span aria-hidden className="ml-1 inline-block h-[1.15em] w-[0.6em] animate-blink bg-blood-500/90" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Cybersecurity enthusiast with hands-on experience in <span className="text-zinc-200">Red Teaming</span>,{" "}
            <span className="text-zinc-200">penetration testing</span> and{" "}
            <span className="text-zinc-200">vulnerability research</span> — exploiting weaknesses across Web, API,
            Mobile &amp; Cloud, and building the tools to automate the hunt.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={btn.primary}>
              View my work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <button type="button" onClick={onOpenResume} className={btn.secondary}>
              <FileText className="size-4" />
              Resume
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer noopener" : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className={btn.icon}
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>
            <span aria-hidden className="hidden h-6 w-px bg-white/10 sm:block" />
            <span className="inline-flex items-center gap-2 text-sm text-zinc-400">
              <MapPin className="size-4 text-blood-400" />
              {profile.location}, {profile.country}
            </span>
          </motion.div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none"
        >
          <div aria-hidden className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-blood-600/[0.08] blur-3xl" />
          <Terminal onOpenResume={onOpenResume} />

          {/* Floating credential badges */}
          <div
            aria-hidden
            className="absolute -right-4 -top-10 hidden animate-float items-center gap-2.5 rounded-xl border border-white/10 bg-ink-850/90 py-2 pl-2 pr-3.5 shadow-2xl shadow-black/50 backdrop-blur-xl lg:flex"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-term-amber/10 text-term-amber ring-1 ring-term-amber/20">
              <Bug className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-white">OWASP Top 10</span>
              <span className="block font-mono text-[10px] text-zinc-500">findings validated</span>
            </span>
          </div>
          <div
            aria-hidden
            className="absolute -left-10 top-[46%] hidden size-12 animate-float-delayed place-items-center rounded-xl border border-white/10 bg-ink-850/90 text-blood-400 shadow-2xl shadow-black/50 backdrop-blur-xl lg:grid"
          >
            <ShieldCheck className="size-5" />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-300 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-blood-500" />
        </span>
      </a>
    </section>
  );
}
