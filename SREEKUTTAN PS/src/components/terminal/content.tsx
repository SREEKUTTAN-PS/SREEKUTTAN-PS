import { Fragment, type ReactNode } from "react";
import { certifications, education, mailto, profile, projects, skills } from "@/data/portfolio";

/* Small colour helpers for terminal output */
const G = ({ children }: { children: ReactNode }) => <span className="text-term-green">{children}</span>;
const B = ({ children }: { children: ReactNode }) => <span className="text-term-blue">{children}</span>;
const A = ({ children }: { children: ReactNode }) => <span className="text-term-amber">{children}</span>;
const W = ({ children }: { children: ReactNode }) => <span className="text-zinc-100">{children}</span>;
const M = ({ children }: { children: ReactNode }) => <span className="text-zinc-500">{children}</span>;

export const COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "certs",
  "education",
  "contact",
  "socials",
  "nmap",
  "goto",
  "resume",
  "ls",
  "cat",
  "clear",
  "history",
  "date",
  "echo",
  "sudo",
  "exit",
];

export const SECTIONS = ["home", "about", "skills", "projects", "process", "credentials", "strengths", "contact"];
export const FILES = ["about.txt", "skills.txt", "focus.txt", "certs.txt", "education.txt", "contact.txt"];

const SECTION_ALIASES: Record<string, string> = {
  home: "home",
  top: "home",
  about: "about",
  skills: "skills",
  arsenal: "skills",
  projects: "projects",
  work: "projects",
  ops: "projects",
  process: "process",
  methodology: "process",
  credentials: "credentials",
  certs: "credentials",
  education: "credentials",
  strengths: "strengths",
  contact: "contact",
  hire: "contact",
};

export const resolveSection = (target: string) => SECTION_ALIASES[target] ?? null;

/* ------------------------------------------------------------------ */

export function WhoamiOutput() {
  return (
    <div>
      <div className="font-semibold text-zinc-100">{profile.name}</div>
      <div>
        {profile.role} <M>·</M> Red Team <M>·</M> Offensive Security
      </div>
      <div>
        <M>loc:</M> {profile.location}, IN <M>|</M> <M>status:</M> <G>open to work</G>
      </div>
    </div>
  );
}

export function FocusOutput() {
  const items = [
    "Red Teaming & adversary simulation",
    "Web / API penetration testing",
    "Cloud & mobile security testing",
    "Offensive automation — Python · Go · PowerShell",
  ];
  return (
    <div>
      {items.map((i) => (
        <div key={i}>
          <G>[+]</G> {i}
        </div>
      ))}
    </div>
  );
}

export function HintOutput() {
  return (
    <div className="text-zinc-500">
      Type <G>help</G> to explore — or pick a command below.
    </div>
  );
}

const helpEntries: [string, string][] = [
  ["whoami", "who am I?"],
  ["about", "professional summary"],
  ["skills", "technical arsenal"],
  ["projects", "featured operations"],
  ["certs", "certifications & training"],
  ["education", "academic background"],
  ["contact", "ways to reach me"],
  ["nmap", "scan this portfolio"],
  ["goto <section>", "jump to a section"],
  ["resume", "open printable resume"],
  ["ls · cat <file>", "browse files"],
  ["clear", "clear the terminal"],
];

export function HelpOutput() {
  return (
    <div>
      <div className="mb-1 text-zinc-300">Available commands:</div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-0.5">
        {helpEntries.map(([c, d]) => (
          <Fragment key={c}>
            <G>{c}</G>
            <M>{d}</M>
          </Fragment>
        ))}
      </div>
      <div className="mt-1.5">
        <M>tip: ↑/↓ history · tab autocomplete · ctrl+l clear</M>
      </div>
    </div>
  );
}

export function AboutOutput() {
  return (
    <div>
      Cybersecurity enthusiast pursuing a BSc in Computer Science, with hands-on experience in <W>Red Teaming</W>,{" "}
      <W>penetration testing</W> and <W>vulnerability research</W>, plus practical exposure to Web, API, Mobile &
      Cloud security testing. Seeking a <span className="text-blood-400">Security Engineer</span> role.
    </div>
  );
}

export function SkillsOutput() {
  const rows: [string, string][] = [
    ["offensive", [...skills.offensive.disciplines, ...skills.offensive.tools].join(", ")],
    ["languages", skills.programming.map((p) => p.name).join(", ")],
    ["cloud", `${skills.cloud.platforms.join(", ")} — basic exploitation`],
    ["mobile", "Android pentesting, iOS security testing (basic), MobSF"],
    ["tools", skills.tools.join(", ")],
    ["reporting", skills.reporting.join(", ")],
  ];
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5">
      {rows.map(([k, v]) => (
        <Fragment key={k}>
          <B>{k}</B>
          <span>{v}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function ProjectsOutput() {
  return (
    <div>
      {projects.map((p, i) => (
        <div key={p.id}>
          <span className="text-blood-400">[{String(i + 1).padStart(2, "0")}]</span> <W>{p.title}</W>{" "}
          <M>— {p.tags.join(" · ").toLowerCase()}</M>
        </div>
      ))}
      <div className="mt-1">
        <M>→ run</M> <G>goto projects</G> <M>for full case studies</M>
      </div>
    </div>
  );
}

export function CertsOutput() {
  return (
    <div>
      {certifications.map((c) => (
        <div key={c.title}>
          {c.status === "completed" ? <G>[✓]</G> : <A>[~]</A>} <W>{c.title}</W>
          {c.issuer && <span> — {c.issuer}</span>}{" "}
          <M>
            ({c.period}
            {c.status === "in-progress" ? ", in progress" : ""})
          </M>
        </div>
      ))}
    </div>
  );
}

export function EducationOutput() {
  return (
    <div>
      <div>
        <W>{education.degree}</W> — {education.location}
      </div>
      <div>
        <M>{education.period.replace(" — ", "–")} · </M>
        <A>{education.status.toLowerCase()}</A>
      </div>
      <div>
        <M>coursework:</M> {education.coursework.join(", ")}
      </div>
    </div>
  );
}

export function ContactOutput() {
  const rows: [string, string, string][] = [
    ["email", profile.email, mailto],
    ["linkedin", profile.linkedinLabel, profile.linkedin],
    ["github", profile.githubLabel, profile.github],
  ];
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5">
      {rows.map(([k, label, href]) => (
        <Fragment key={k}>
          <B>{k}</B>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="break-all text-zinc-100 underline decoration-blood-500/50 underline-offset-4 transition-colors hover:text-blood-300"
            onClick={(e) => e.stopPropagation()}
          >
            {label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}

export function NmapOutput() {
  const rows: [string, string, string, string][] = [
    ["22/tcp", "open", "ssh", "curiosity 24/7"],
    ["80/tcp", "open", "http", "portfolio (react + tailwind)"],
    ["443/tcp", "open", "https", "hire-me — open to roles"],
    ["1337/tcp", "open", "redteam", "offensive-security"],
  ];
  return (
    <div>
      <M>Starting Nmap 7.94 ( https://nmap.org )</M>
      <div>
        Nmap scan report for <W>sreekuttan.portfolio</W> (127.0.0.1)
      </div>
      <M>Host is up (0.0013s latency).</M>
      <div className="mt-1 grid grid-cols-[auto_auto_auto_1fr] gap-x-3 sm:gap-x-4">
        <W>PORT</W>
        <W>STATE</W>
        <W>SERVICE</W>
        <W>VERSION</W>
        {rows.map((r) => (
          <Fragment key={r[0]}>
            <B>{r[0]}</B>
            <G>{r[1]}</G>
            <span>{r[2]}</span>
            <A>{r[3]}</A>
          </Fragment>
        ))}
      </div>
      <div className="mt-1">
        <M>Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds</M>
      </div>
    </div>
  );
}

export function LsOutput({ all }: { all: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-4">
      {all && (
        <>
          <B>.</B>
          <B>..</B>
          <A>.flag.txt</A>
        </>
      )}
      {FILES.map((f) => (
        <span key={f}>{f}</span>
      ))}
      <B>projects/</B>
    </div>
  );
}

export function HistoryOutput({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((h, i) => (
        <div key={`${h}-${i}`}>
          <M>{String(i + 1).padStart(4, " ")}</M> {h}
        </div>
      ))}
    </div>
  );
}

export function NotFound({ name }: { name: string }) {
  return (
    <div>
      <span className="text-blood-400">zsh: command not found:</span> {name}
      <div>
        <M>Type</M> <G>help</G> <M>to see available commands.</M>
      </div>
    </div>
  );
}

export function SudoOutput() {
  return (
    <div>
      <A>[sudo] password for visitor: ********</A>
      <div>
        visitor is not in the sudoers file. <M>This incident will be reported.</M> 😉
      </div>
      <div>
        <M>Want real access? Run</M> <G>contact</G>
      </div>
    </div>
  );
}

export function GotoUsage() {
  return (
    <div>
      <M>usage:</M> goto &lt;{SECTIONS.join(" | ")}&gt;
    </div>
  );
}

export function catFile(file?: string): ReactNode {
  if (!file) return <M>usage: cat &lt;file&gt; — try `ls`</M>;
  switch (file.replace(/^\.\//, "")) {
    case "about.txt":
      return <AboutOutput />;
    case "skills.txt":
      return <SkillsOutput />;
    case "focus.txt":
      return <FocusOutput />;
    case "certs.txt":
      return <CertsOutput />;
    case "education.txt":
      return <EducationOutput />;
    case "contact.txt":
      return <ContactOutput />;
    case ".flag.txt":
    case "flag.txt":
      return (
        <div>
          <G>flag{"{"}r3c0n_1s_3v3ryth1ng{"}"}</G>
          <div>
            <M>Nice enumeration. You clearly think like a red teamer — let's talk:</M> <G>contact</G>
          </div>
        </div>
      );
    case "projects":
    case "projects/":
      return <span>cat: {file}: Is a directory</span>;
    default:
      return <span>cat: {file}: No such file or directory</span>;
  }
}
