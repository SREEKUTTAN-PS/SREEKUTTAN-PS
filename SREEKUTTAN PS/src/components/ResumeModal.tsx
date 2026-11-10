import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import { certifications, education, mailto, profile, projects, skills } from "@/data/portfolio";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-zinc-950">
        <span className="text-blood-600">▍</span>
        {title}
        <span className="h-px flex-1 bg-zinc-200" />
      </h2>
      {children}
    </section>
  );
}

const keyStrengths = [
  "Hands-on experience in offensive security tools and techniques",
  "Strong scripting skills in Python, Go, PowerShell for automation",
  "Ability to research 0-days and emerging attacker TTPs",
  "Strong communication skills for technical reporting and client calls",
  "Self-motivated learner with passion for cybersecurity",
];

function ResumeDocument() {
  const skillRows: [string, string][] = [
    ["Offensive Security", [...skills.offensive.disciplines, ...skills.offensive.tools].join(", ")],
    ["Programming", skills.programming.map((p) => p.name).join(", ")],
    ["Cloud Security", `${skills.cloud.platforms.join(", ")} — Basic Cloud Exploitation`],
    ["Mobile Security", "Android Pentesting, iOS Security Testing — Basic"],
    ["Tools", skills.tools.join(", ")],
    ["Reporting", skills.reporting.join(", ")],
  ];

  return (
    <div className="text-[13px] leading-relaxed text-zinc-700">
      <header className="border-b-2 border-zinc-900 pb-4">
        <h1 className="font-display text-[30px] font-bold leading-none tracking-tight text-zinc-950">
          {profile.name.toUpperCase()}
        </h1>
        <p className="mt-2 text-[14px] font-semibold text-blood-600">
          Aspiring Security Engineer | Red Team | Offensive Security
        </p>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-zinc-600">
          <span>{profile.location}</span>
          <a href={mailto} className="hover:text-blood-600">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-blood-600">
            linkedin.com/in/sreekuttan-ps-
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer noopener" className="hover:text-blood-600">
            github.com/{profile.githubLabel}
          </a>
        </div>
      </header>

      <Section title="Professional Summary">
        <p>
          Cybersecurity enthusiast and BSc Computer Science student with hands-on experience in Red Teaming, penetration
          testing, and vulnerability research, with practical exposure to Web, API, Mobile and Cloud security testing.
          Proficient in Python, Go and PowerShell scripting for offensive automation. Passionate about exploiting
          vulnerabilities, building tools, and delivering actionable technical reports. Seeking a Security Engineer
          role to contribute to offensive security operations.
        </p>
      </Section>

      <Section title="Education">
        <div className="avoid-break">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span className="font-semibold text-zinc-950">{education.degree}</span>
            <span className="text-[12px] text-zinc-500">
              {education.period.replace(" — ", " – ")} | {education.status}
            </span>
          </div>
          <div>{education.location}</div>
          <div className="mt-1">
            <span className="font-medium text-zinc-900">Relevant Coursework:</span> {education.coursework.join(", ")}
          </div>
        </div>
      </Section>

      <Section title="Technical Skills">
        <dl className="grid grid-cols-1 gap-y-1 sm:grid-cols-[150px_1fr]">
          {skillRows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-semibold text-zinc-900">{k}:</dt>
              <dd className="mb-1 sm:mb-0">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Projects">
        <div className="space-y-3.5">
          {projects.map((p, i) => (
            <div key={p.id} className="avoid-break">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="font-semibold text-zinc-950">
                  {i + 1}. {p.title}
                </span>
                <span className="text-[12px] italic text-zinc-500">{p.subtitle}</span>
              </div>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-blood-600">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certifications & Training">
        <ul className="avoid-break list-disc space-y-1 pl-5 marker:text-blood-600">
          {certifications.map((c) => (
            <li key={c.title}>
              <span className="font-medium text-zinc-900">{c.title}</span>
              {c.issuer ? ` — ${c.issuer}` : ""}
              {c.status === "in-progress" ? " — Preparing for Exam" : ""}
              <span className="text-zinc-500"> | {c.period.replace(" — ", " – ")}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Key Strengths">
        <ul className="avoid-break list-disc space-y-0.5 pl-5 marker:text-blood-600">
          {keyStrengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="resume-overlay fixed inset-0 z-[95] overflow-y-auto bg-black/80 backdrop-blur-sm"
        >
          {/* Toolbar */}
          <div className="no-print sticky top-0 z-10 border-b border-white/10 bg-ink-950/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[860px] items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs text-zinc-400 sm:text-sm">
                <FileText className="size-4 shrink-0 text-blood-400" />
                <span className="truncate">resume — sreekuttan_ps.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden font-mono text-[11px] text-zinc-600 md:inline">tip: choose “Save as PDF”</span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blood-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blood-400"
                >
                  <Download className="size-4" />
                  <span>
                    <span className="hidden sm:inline">Download </span>PDF
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="grid size-9 cursor-pointer place-items-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Paper */}
          <div
            className="resume-stage px-3 py-6 sm:px-6 sm:py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="resume-paper mx-auto w-full max-w-[820px] rounded-xl bg-white p-6 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] sm:p-12"
            >
              <ResumeDocument />
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
