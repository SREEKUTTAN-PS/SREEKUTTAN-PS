import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, Mail, Menu, Search, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { mailto, navLinks, profile } from "@/data/portfolio";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { isMac, scrollToId } from "@/utils/dom";
import { btn } from "@/utils/styles";
import { cn } from "@/utils/cn";

type Props = {
  active: string;
  onOpenPalette: () => void;
  onOpenResume: () => void;
};

/** Sub-sections that should light up their parent nav item */
const ACTIVE_ALIAS: Record<string, string> = { process: "projects", strengths: "credentials" };

export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="Sreekuttan P S — back to top">
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg bg-linear-to-br from-blood-500 to-blood-700 font-mono text-[13px] font-bold text-white shadow-lg shadow-blood-600/30 ring-1 ring-white/10">
        {profile.initials}
        <span className="absolute inset-0 bg-linear-to-t from-transparent to-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="font-mono text-sm text-zinc-300">
        <span className="text-zinc-600">~/</span>sreekuttan
        <span className="animate-blink text-blood-500">_</span>
      </span>
    </a>
  );
}

export function Navbar({ active, onOpenPalette, onOpenResume }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);
  const current = ACTIVE_ALIAS[active] ?? active;

  useLockBodyScroll(open);

  useEffect(() => {
    setMac(isMac());
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goMobile = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled || open
            ? "border-white/[0.06] bg-ink-950/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const isActive = current === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="hidden h-9 cursor-pointer items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-2.5 pr-1.5 text-xs text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-300 lg:inline-flex"
            >
              <Search className="size-3.5" />
              <span>Search</span>
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-400">
                {mac ? "⌘" : "Ctrl"} K
              </kbd>
            </button>
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white sm:inline-flex"
            >
              <FileText className="size-4" />
              Resume
            </button>
            <a
              href="#contact"
              className="hidden h-9 items-center rounded-lg bg-blood-500 px-4 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,51,85,0.7)] transition-all hover:bg-blood-400 md:inline-flex"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 cursor-pointer place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-200 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu (rendered outside header: backdrop-filter would trap fixed children) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/95 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-grid opacity-40 fade-mask-radial" />
            <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.35 }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => goMobile(e, l.id)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-3xl font-semibold transition-colors",
                        current === l.id ? "text-white" : "text-zinc-400"
                      )}
                    >
                      <span>
                        <span className="mr-3 align-middle font-mono text-xs text-blood-400">0{i + 1}</span>
                        {l.label}
                      </span>
                      <ArrowUpRight className="size-5 text-zinc-600" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-auto space-y-3 pt-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenResume();
                  }}
                  className={cn(btn.secondary, "w-full")}
                >
                  <FileText className="size-4" /> View resume
                </button>
                <a href="#contact" onClick={(e) => goMobile(e, "contact")} className={cn(btn.primary, "w-full")}>
                  Hire me
                </a>
                <div className="flex justify-center gap-3 pt-4">
                  <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className={btn.icon}>
                    <GithubIcon className="size-[18px]" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className={btn.icon}>
                    <LinkedinIcon className="size-[18px]" />
                  </a>
                  <a href={mailto} aria-label="Email" className={btn.icon}>
                    <Mail className="size-[18px]" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
