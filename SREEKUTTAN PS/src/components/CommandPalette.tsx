import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  House,
  Mail,
  Search,
  Sparkles,
  SquareTerminal,
  User,
  Workflow,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useToast } from "./ui/Toast";
import { mailto, profile, type IconType } from "@/data/portfolio";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { copyText, scrollToId } from "@/utils/dom";
import { cn } from "@/utils/cn";

type Group = "Navigate" | "Actions" | "Links";
type Action = {
  id: string;
  label: string;
  hint?: string;
  group: Group;
  icon: IconType;
  keywords?: string;
  external?: boolean;
  perform: () => void;
};

const GROUPS: Group[] = ["Navigate", "Actions", "Links"];

type Props = { open: boolean; onClose: () => void; onOpenResume: () => void };

export function CommandPalette({ open, onClose, onOpenResume }: Props) {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(open);

  const actions = useMemo<Action[]>(
    () => [
      { id: "home", label: "Home", group: "Navigate", icon: House, keywords: "top hero", perform: () => scrollToId("home") },
      { id: "about", label: "About", group: "Navigate", icon: User, keywords: "summary bio", perform: () => scrollToId("about") },
      { id: "skills", label: "Skills & arsenal", group: "Navigate", icon: Wrench, keywords: "tools languages", perform: () => scrollToId("skills") },
      { id: "projects", label: "Projects", group: "Navigate", icon: FolderGit2, keywords: "work operations case study", perform: () => scrollToId("projects") },
      { id: "process", label: "Methodology", group: "Navigate", icon: Workflow, keywords: "process kill chain", perform: () => scrollToId("process") },
      { id: "credentials", label: "Certifications & education", group: "Navigate", icon: Award, keywords: "training courses degree education", perform: () => scrollToId("credentials") },
      { id: "strengths", label: "Key strengths", group: "Navigate", icon: Sparkles, perform: () => scrollToId("strengths") },
      { id: "contact", label: "Contact", group: "Navigate", icon: Mail, keywords: "hire email message", perform: () => scrollToId("contact") },
      { id: "resume", label: "View / download resume", group: "Actions", icon: FileText, keywords: "cv pdf print", perform: onOpenResume },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: Copy,
        perform: async () => {
          if (await copyText(profile.email)) toast("Email copied to clipboard");
        },
      },
      { id: "send-email", label: "Send an email", group: "Actions", icon: Mail, external: true, perform: () => (window.location.href = mailto) },
      {
        id: "terminal",
        label: "Open interactive terminal",
        group: "Actions",
        icon: SquareTerminal,
        keywords: "shell cli hack",
        perform: () => {
          scrollToId("home");
          window.setTimeout(() => window.dispatchEvent(new Event("focus-terminal")), 550);
        },
      },
      { id: "github", label: "GitHub", hint: profile.githubLabel, group: "Links", icon: GithubIcon, external: true, perform: () => window.open(profile.github, "_blank", "noopener") },
      { id: "linkedin", label: "LinkedIn", hint: profile.linkedinLabel, group: "Links", icon: LinkedinIcon, external: true, perform: () => window.open(profile.linkedin, "_blank", "noopener") },
    ],
    [onOpenResume, toast]
  );

  const ordered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? actions.filter((a) => `${a.label} ${a.keywords ?? ""} ${a.hint ?? ""} ${a.group}`.toLowerCase().includes(q))
      : actions;
    return GROUPS.flatMap((g) => filtered.filter((a) => a.group === g));
  }, [actions, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const exec = (a: Action) => {
    if (a.external) {
      a.perform();
      onClose();
    } else {
      onClose();
      window.requestAnimationFrame(() => a.perform());
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (ordered.length ? (i + 1) % ordered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (ordered.length ? (i - 1 + ordered.length) % ordered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = ordered[active];
      if (a) exec(a);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let running = -1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[96] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-500/60 to-transparent" />
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
              <Search className="size-4 shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-zinc-100 outline-none placeholder:text-zinc-600 focus-visible:outline-none"
              />
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
              {ordered.length === 0 && (
                <div className="px-3 py-12 text-center text-sm text-zinc-500">
                  No results for <span className="text-zinc-300">“{query}”</span>
                </div>
              )}
              {GROUPS.map((g) => {
                const items = ordered.filter((a) => a.group === g);
                if (!items.length) return null;
                return (
                  <div key={g} className="pb-1">
                    <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">{g}</div>
                    {items.map((a) => {
                      running += 1;
                      const idx = running;
                      const isActive = idx === active;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          data-idx={idx}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => exec(a)}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            isActive ? "bg-white/[0.06] text-white" : "text-zinc-400"
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-lg border transition-colors",
                              isActive
                                ? "border-blood-500/40 bg-blood-500/10 text-blood-300"
                                : "border-white/[0.06] bg-white/[0.02] text-zinc-500"
                            )}
                          >
                            <a.icon className="size-4" />
                          </span>
                          <span className="flex-1 truncate">{a.label}</span>
                          {a.hint && <span className="hidden truncate font-mono text-[11px] text-zinc-600 sm:inline">{a.hint}</span>}
                          {isActive && <CornerDownLeft className="size-3.5 shrink-0 text-zinc-500" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5 font-mono text-[11px] text-zinc-600">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span className="hidden sm:inline">sreekuttan.sh</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
