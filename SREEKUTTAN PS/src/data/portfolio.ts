import type { ComponentType } from "react";
import {
  Braces,
  Bug,
  Cloud,
  Code2,
  Crosshair,
  FileText,
  Globe,
  KeyRound,
  MessageSquare,
  Network,
  Radar,
  Rocket,
  ScanSearch,
  Smartphone,
} from "lucide-react";

export type IconType = ComponentType<{ className?: string }>;

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */
export const profile = {
  name: "Sreekuttan P S",
  firstName: "Sreekuttan",
  initials: "SP",
  role: "Aspiring Security Engineer",
  headline: "Red Team · Offensive Security",
  location: "Kochi, Kerala",
  country: "India",
  email: "pssreekuttan292@gmail.com",
  linkedin: "https://in.linkedin.com/in/sreekuttan-ps-",
  linkedinLabel: "in/sreekuttan-ps-",
  github: "https://github.com/SREEKUTTAN-SVG",
  githubLabel: "SREEKUTTAN-SVG",
  availability: "Open to Security Engineer Roles",
  training: "RedTeam Institute",
  /** Rotating focus areas shown by the hero typewriter */
  focus: [
    "Red Teaming",
    "Web & API Pentesting",
    "Vulnerability Research",
    "Cloud & Mobile Security",
    "Offensive Automation",
  ] as string[],
};

export const mailto = `mailto:${profile.email}`;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export const sectionIds = [
  "home",
  "about",
  "skills",
  "projects",
  "process",
  "credentials",
  "strengths",
  "contact",
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
export const stats = [
  { value: 4, label: "Security projects", sub: "documented end-to-end" },
  { value: 5, label: "Attack surfaces", sub: "web · api · mobile · cloud · network" },
  { value: 5, label: "Languages", sub: "python · go · pwsh · bash · c" },
  { value: 9, label: "Security tools", sub: "burp · msf · nmap · zap & more" },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */
export const skills = {
  offensive: {
    disciplines: ["Red Teaming", "Penetration Testing", "Vulnerability Assessment", "Exploitation"],
    tools: ["Burp Suite Pro", "Metasploit", "Nmap"],
  },
  programming: [
    { name: "Python", color: "#4B8BBE", use: "Recon & scan automation" },
    { name: "Go", color: "#00ADD8", use: "Fast network tooling" },
    { name: "PowerShell", color: "#5391FE", use: "Offensive scripting" },
    { name: "Bash", color: "#89E051", use: "Linux automation" },
    { name: "C", color: "#A8B9CC", use: "Systems fundamentals" },
  ],
  cloud: {
    platforms: ["AWS", "Azure", "GCP"],
    focus: "Basic cloud exploitation",
  },
  mobile: [
    { name: "Android Pentesting", note: "APK analysis" },
    { name: "iOS Security Testing", note: "Basic" },
    { name: "MobSF", note: "Static + dynamic" },
  ],
  tools: ["Kali Linux", "Wireshark", "SQLmap", "OWASP ZAP", "Postman"],
  reporting: ["Technical Report Writing", "Vulnerability Documentation", "Client Communication"],
};

export const attackSurfaces: { icon: IconType; label: string; detail: string }[] = [
  { icon: Globe, label: "Web Apps", detail: "OWASP Top 10" },
  { icon: Braces, label: "APIs", detail: "Endpoint misconfigs" },
  { icon: Smartphone, label: "Mobile", detail: "Android · iOS" },
  { icon: Cloud, label: "Cloud", detail: "AWS · Azure · GCP" },
  { icon: Network, label: "Network", detail: "Internal assessments" },
];

export const marquee = [
  "Burp Suite Pro",
  "Metasploit",
  "Nmap",
  "Kali Linux",
  "Wireshark",
  "SQLmap",
  "OWASP ZAP",
  "Postman",
  "MobSF",
  "Python",
  "Go",
  "PowerShell",
  "Bash",
  "AWS",
  "Azure",
  "GCP",
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
export type Phase = "Recon" | "Scanning" | "Exploitation" | "Post-Exploitation" | "Reporting";
export const allPhases: Phase[] = ["Recon", "Scanning", "Exploitation", "Post-Exploitation", "Reporting"];

export type TermLine = { type: "cmd" | "info" | "ok" | "warn"; text: string };

export type Project = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  highlights: string[];
  stack: string[];
  phases: Phase[];
  outcome: string;
  path: string;
  terminal: TermLine[];
};

export const projects: Project[] = [
  {
    id: "redteam-lab",
    code: "OP-01",
    title: "Red Team Simulation Lab",
    subtitle: "Home Lab Project",
    tags: ["Red Team", "Web", "API"],
    summary:
      "A self-built lab of intentionally vulnerable VMs used to run complete, end-to-end Red Team operations — from reconnaissance to validated exploitation.",
    highlights: [
      "Set up vulnerable VMs and conducted end-to-end Red Team operations",
      "Performed web app pentesting with Burp Suite Pro and identified OWASP Top 10 vulnerabilities",
      "Exploited misconfigurations in API endpoints and validated critical bugs",
      "Automated recon and vulnerability scanning using Python scripts",
    ],
    stack: ["Burp Suite Pro", "Python", "Kali Linux", "OWASP Top 10", "API Testing"],
    phases: ["Recon", "Scanning", "Exploitation", "Reporting"],
    outcome:
      "A repeatable environment for practising real adversary tradecraft, plus reusable Python automation that speeds up recon and vulnerability scanning.",
    path: "~/ops/redteam-lab",
    terminal: [
      { type: "cmd", text: "python3 recon.py --scope lab.local" },
      { type: "info", text: "[*] enumerating hosts, services & endpoints..." },
      { type: "ok", text: "[+] web app + API attack surface mapped" },
      { type: "warn", text: "[!] OWASP Top 10 findings validated" },
    ],
  },
  {
    id: "cloud-automation",
    code: "OP-02",
    title: "Cloud Exploitation & Security Automation Tool",
    subtitle: "Offensive Tooling · AWS",
    tags: ["Cloud", "AWS", "Automation"],
    summary:
      "Custom offensive tooling that automates cloud misconfiguration discovery and accelerates network enumeration during assessments.",
    highlights: [
      "Built Python scripts to automate AWS S3 bucket misconfiguration detection",
      "Simulated privilege escalation attacks in a test AWS environment",
      "Created a Go-based port scanner for faster network enumeration",
    ],
    stack: ["Python", "Go", "AWS", "S3", "Privilege Escalation"],
    phases: ["Recon", "Scanning", "Post-Exploitation"],
    outcome:
      "Faster, repeatable detection of risky S3 configurations and a lightweight Go scanner for quick network enumeration.",
    path: "~/tools/cloud-automation",
    terminal: [
      { type: "cmd", text: "python3 s3_audit.py --profile test-env" },
      { type: "info", text: "[*] auditing bucket ACLs & policies..." },
      { type: "warn", text: "[!] misconfigured bucket detected" },
      { type: "cmd", text: "./goscan -t 10.0.0.0/24 --fast" },
    ],
  },
  {
    id: "mobile-pentest",
    code: "OP-03",
    title: "Mobile Application Penetration Testing",
    subtitle: "Android Security Assessment",
    tags: ["Mobile", "Android", "MobSF"],
    summary:
      "Security assessment of Android applications, combining static and dynamic analysis to uncover data-exposure risks.",
    highlights: [
      "Performed static and dynamic analysis on Android APKs using MobSF",
      "Identified insecure data storage and hardcoded secrets",
      "Documented findings with PoC and mitigation steps",
    ],
    stack: ["MobSF", "Android", "Static Analysis", "Dynamic Analysis"],
    phases: ["Recon", "Exploitation", "Reporting"],
    outcome:
      "Clear, reproducible findings — each backed by a proof-of-concept and practical mitigation guidance.",
    path: "~/ops/mobile-apk",
    terminal: [
      { type: "cmd", text: "./mobsf_scan.sh target-app.apk" },
      { type: "info", text: "[*] running static + dynamic analysis..." },
      { type: "warn", text: "[!] insecure data storage" },
      { type: "warn", text: "[!] hardcoded secret discovered" },
    ],
  },
  {
    id: "network-pentest",
    code: "OP-04",
    title: "Network Penetration Testing",
    subtitle: "Internal Network Assessment",
    tags: ["Network", "Internal", "PrivEsc"],
    summary:
      "Internal network assessment — discovering and exploiting vulnerable services, escalating privileges and reporting business risk.",
    highlights: [
      "Used Nmap and Metasploit for internal network assessment",
      "Exploited vulnerable services and performed privilege escalation",
      "Delivered a detailed report with risk rating and remediation",
    ],
    stack: ["Nmap", "Metasploit", "Privilege Escalation", "Risk Rating"],
    phases: ["Scanning", "Exploitation", "Post-Exploitation", "Reporting"],
    outcome:
      "A prioritised, risk-rated report giving clear remediation steps for every exploited weakness.",
    path: "~/ops/internal-net",
    terminal: [
      { type: "cmd", text: "nmap -sC -sV -oA internal 10.10.10.0/24" },
      { type: "info", text: "[*] vulnerable service fingerprinted" },
      { type: "cmd", text: "msfconsole -q -r exploit.rc" },
      { type: "ok", text: "[+] privilege escalation successful" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Methodology                                                        */
/* ------------------------------------------------------------------ */
export const methodology: {
  step: string;
  phase: Phase;
  title: string;
  icon: IconType;
  description: string;
  tools: string[];
}[] = [
  {
    step: "01",
    phase: "Recon",
    title: "Reconnaissance",
    icon: Radar,
    description: "Mapping the attack surface and automating discovery with custom Python recon scripts.",
    tools: ["Python", "Nmap"],
  },
  {
    step: "02",
    phase: "Scanning",
    title: "Scanning & Enumeration",
    icon: ScanSearch,
    description: "Fingerprinting hosts, services and endpoints to pinpoint exploitable weaknesses.",
    tools: ["Nmap", "OWASP ZAP", "Go"],
  },
  {
    step: "03",
    phase: "Exploitation",
    title: "Exploitation",
    icon: Crosshair,
    description: "Validating OWASP Top 10, API flaws and vulnerable services with proven, real impact.",
    tools: ["Burp Suite Pro", "Metasploit", "SQLmap"],
  },
  {
    step: "04",
    phase: "Post-Exploitation",
    title: "Post-Exploitation",
    icon: KeyRound,
    description: "Escalating privileges to demonstrate business risk inside controlled environments.",
    tools: ["PrivEsc", "PowerShell"],
  },
  {
    step: "05",
    phase: "Reporting",
    title: "Reporting",
    icon: FileText,
    description: "Risk-rated findings with PoCs, clear remediation and client-ready communication.",
    tools: ["PoC", "Risk Rating", "Remediation"],
  },
];

/* ------------------------------------------------------------------ */
/*  Credentials                                                        */
/* ------------------------------------------------------------------ */
export type Certification = {
  title: string;
  issuer?: string;
  period: string;
  status: "completed" | "in-progress";
  statusLabel: string;
  description: string;
  tags: string[];
};

export const certifications: Certification[] = [
  {
    title: "Advanced Red Teaming & Pentesting Training",
    issuer: "RedTeam Institute",
    period: "2023 — 2024",
    status: "completed",
    statusLabel: "Completed",
    description:
      "Advanced, hands-on training in Red Teaming and penetration testing — building the offensive foundation behind every lab, assessment and report.",
    tags: ["Red Teaming", "Penetration Testing", "Offensive Security"],
  },
  {
    title: "Agentic AI for Intelligent Digital Design",
    period: "2026",
    status: "completed",
    statusLabel: "Completed",
    description:
      "Course on agentic AI — how autonomous, goal-driven AI agents can power intelligent digital design and automation workflows.",
    tags: ["Agentic AI", "Automation"],
  },
];

export const education = {
  degree: "BSc Computer Science",
  location: "Kochi, Kerala",
  period: "2026 — 2029",
  status: "Pursuing",
  coursework: [
    "Computer Networks",
    "Operating Systems",
    "C Programming",
    "Python",
    "Microprocessors",
    "Digital Electronics",
  ],
};

/* ------------------------------------------------------------------ */
/*  Strengths                                                          */
/* ------------------------------------------------------------------ */
export const strengths: { icon: IconType; title: string; description: string }[] = [
  {
    icon: Crosshair,
    title: "Hands-on Offensive Experience",
    description:
      "Practical, hands-on experience with offensive security tools and techniques across realistic lab environments.",
  },
  {
    icon: Code2,
    title: "Automation-First Scripting",
    description:
      "Strong scripting skills in Python, Go and PowerShell to automate recon, scanning and exploitation workflows.",
  },
  {
    icon: Bug,
    title: "0-Day & TTP Research",
    description:
      "Ability to research 0-days and emerging attacker TTPs to stay ahead of how real adversaries operate.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Strong communication skills for technical reporting and client calls — translating risk into clear action.",
  },
  {
    icon: Rocket,
    title: "Self-Motivated Learner",
    description:
      "A self-driven learner with a genuine passion for cybersecurity and continuously sharpening my craft.",
  },
];
