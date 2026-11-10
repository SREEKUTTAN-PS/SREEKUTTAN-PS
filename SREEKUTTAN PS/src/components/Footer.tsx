import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Logo } from "./Navbar";
import { mailto, navLinks, profile } from "@/data/portfolio";
import { isMac } from "@/utils/dom";
import { container } from "@/utils/styles";

export function Footer({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(isMac()), []);

  const connect = [
    { label: "GitHub", href: profile.github, icon: GithubIcon, external: true },
    { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon, external: true },
    { label: "Email", href: mailto, icon: Mail, external: false },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className={`${container} pt-16`}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500">
              {profile.role} focused on Red Teaming and offensive security. Breaking things responsibly — so they can
              be fixed before anyone else finds them.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">Connect</h3>
            <ul className="mt-4 space-y-2.5">
              {connect.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2.5 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    <c.icon className="size-4" />
                    {c.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/[0.06] py-6 font-mono text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · <span className="text-blood-400/80">Hack ethically.</span>
          </p>
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex cursor-pointer items-center gap-2 self-start transition-colors hover:text-zinc-300 sm:self-auto"
          >
            Press
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-400">
              {mac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-400">K</kbd>
            for quick navigation
          </button>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="text-stroke -mb-[0.2em] text-center font-display text-[14.5vw] font-bold leading-none tracking-tighter">
          SREEKUTTAN
        </div>
      </div>
    </footer>
  );
}
