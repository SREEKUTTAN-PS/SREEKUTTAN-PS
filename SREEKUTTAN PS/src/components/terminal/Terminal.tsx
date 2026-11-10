import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { scrollToId } from "@/utils/dom";
import * as T from "./content";

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

const SUGGESTIONS = ["help", "whoami", "skills", "projects", "nmap", "contact"];

const INTRO: { cmd: string; out: () => ReactNode }[] = [
  { cmd: "whoami", out: () => <T.WhoamiOutput /> },
  { cmd: "cat focus.txt", out: () => <T.FocusOutput /> },
];

function Prompt() {
  return (
    <span className="shrink-0 select-none" aria-hidden="true">
      <span className="text-blood-400">sreekuttan</span>
      <span className="text-zinc-500">@</span>
      <span className="text-zinc-300">kali</span>
      <span className="text-zinc-500">:</span>
      <span className="text-term-blue">~</span>
      <span className="text-zinc-400">$</span>
    </span>
  );
}

function Caret() {
  return <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] animate-blink bg-blood-500" />;
}

export function Terminal({ onOpenResume }: { onOpenResume: () => void }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const [focusTick, setFocusTick] = useState(0);

  const idRef = useRef(0);
  const skipRef = useRef(false);
  const introDoneRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const makeLine = useCallback(
    (kind: Line["kind"], content: ReactNode): Line => ({ id: idRef.current++, kind, content }),
    []
  );

  /** Instantly completes the intro (used when the visitor interacts early). */
  const finishIntro = useCallback(() => {
    if (introDoneRef.current) return;
    introDoneRef.current = true;
    skipRef.current = true;
    setTyping(null);
    const full: Line[] = [];
    INTRO.forEach((s) => {
      full.push(makeLine("input", s.cmd));
      full.push(makeLine("output", s.out()));
    });
    full.push(makeLine("output", <T.HintOutput />));
    setLines(full);
    setIntroDone(true);
  }, [makeLine]);

  /* Auto-typed intro sequence */
  useEffect(() => {
    if (introDoneRef.current) return;
    if (reduce) {
      finishIntro();
      return;
    }
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
    const stopped = () => cancelled || skipRef.current;

    (async () => {
      await sleep(1100);
      for (const step of INTRO) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (stopped()) return;
          setTyping(step.cmd.slice(0, i));
          await sleep(45 + Math.random() * 60);
        }
        await sleep(260);
        if (stopped()) return;
        setTyping(null);
        const a = makeLine("input", step.cmd);
        const b = makeLine("output", step.out());
        setLines((prev) => [...prev, a, b]);
        await sleep(650);
      }
      if (stopped()) return;
      const hint = makeLine("output", <T.HintOutput />);
      setLines((prev) => [...prev, hint]);
      introDoneRef.current = true;
      setIntroDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [reduce, finishIntro, makeLine]);

  /* Keep the newest line visible (scrolls the terminal, never the page) */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing, introDone]);

  /* Focus requests */
  useEffect(() => {
    if (focusTick === 0 || !introDone) return;
    inputRef.current?.focus({ preventScroll: true });
  }, [focusTick, introDone]);

  /* Allow other components (command palette) to focus the terminal */
  useEffect(() => {
    const onRequest = () => {
      finishIntro();
      setFocusTick((t) => t + 1);
    };
    window.addEventListener("focus-terminal", onRequest);
    return () => window.removeEventListener("focus-terminal", onRequest);
  }, [finishIntro]);

  const run = useCallback(
    (raw: string) => {
      const cmdLine = raw.trim();
      const inputLine = makeLine("input", raw);
      if (!cmdLine) {
        setLines((p) => [...p, inputLine]);
        return;
      }
      setHistory((h) => [...h, cmdLine]);
      setHIndex(-1);

      const [nameRaw, ...args] = cmdLine.split(/\s+/);
      const name = nameRaw.toLowerCase();
      let output: ReactNode = null;

      switch (name) {
        case "help":
        case "?":
          output = <T.HelpOutput />;
          break;
        case "whoami":
          output = <T.WhoamiOutput />;
          break;
        case "about":
          output = <T.AboutOutput />;
          break;
        case "skills":
          output = <T.SkillsOutput />;
          break;
        case "projects":
          output = <T.ProjectsOutput />;
          break;
        case "certs":
        case "certifications":
          output = <T.CertsOutput />;
          break;
        case "education":
          output = <T.EducationOutput />;
          break;
        case "contact":
        case "socials":
          output = <T.ContactOutput />;
          break;
        case "nmap":
          output = <T.NmapOutput />;
          break;
        case "ls":
          output = <T.LsOutput all={args.some((a) => a.startsWith("-") && a.includes("a"))} />;
          break;
        case "cat":
          output = T.catFile(args[0]);
          break;
        case "goto":
        case "cd": {
          const target = (args[0] ?? "").replace(/^[#~/.]+/, "").replace(/\/$/, "").toLowerCase();
          const resolved = T.resolveSection(target);
          if (resolved) {
            output = (
              <span>
                → navigating to <span className="text-term-green">#{resolved}</span>
              </span>
            );
            window.setTimeout(() => scrollToId(resolved), 350);
          } else {
            output = <T.GotoUsage />;
          }
          break;
        }
        case "resume":
        case "cv":
          output = <span>→ opening resume…</span>;
          window.setTimeout(onOpenResume, 300);
          break;
        case "clear":
        case "cls":
          setLines([]);
          return;
        case "history":
          output = <T.HistoryOutput items={[...history, cmdLine]} />;
          break;
        case "date":
          output = new Date().toString();
          break;
        case "echo":
          output = args.join(" ");
          break;
        case "sudo":
          output = <T.SudoOutput />;
          break;
        case "rm":
          output = <span className="text-term-amber">rm: permission denied — nice try, red teamer 😉</span>;
          break;
        case "exit":
        case "logout":
          output = (
            <span>
              Not so fast — try <span className="text-term-green">contact</span> instead.
            </span>
          );
          break;
        default:
          output = <T.NotFound name={nameRaw} />;
      }

      const outLine = makeLine("output", output);
      setLines((p) => [...p, inputLine, outLine]);
    },
    [history, makeLine, onOpenResume]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = hIndex === -1 ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(idx);
      setInput(history[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndex === -1) return;
      const idx = hIndex + 1;
      if (idx >= history.length) {
        setHIndex(-1);
        setInput("");
      } else {
        setHIndex(idx);
        setInput(history[idx]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const value = input.trimStart().toLowerCase();
      if (!value) return;
      const parts = value.split(/\s+/);
      if (parts.length === 1) {
        const matches = T.COMMANDS.filter((c) => c.startsWith(parts[0]));
        if (matches.length === 1) setInput(`${matches[0]} `);
        else if (matches.length > 1) {
          const a = makeLine("input", input);
          const b = makeLine("output", <span className="text-zinc-300">{matches.join("   ")}</span>);
          setLines((p) => [...p, a, b]);
        }
      } else {
        const [cmd, arg = ""] = parts;
        const pool = cmd === "cat" ? [...T.FILES, ".flag.txt"] : cmd === "goto" || cmd === "cd" ? T.SECTIONS : [];
        const matches = pool.filter((p) => p.startsWith(arg));
        if (matches.length === 1) setInput(`${cmd} ${matches[0]}`);
      }
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      const a = makeLine("input", `${input}^C`);
      setLines((p) => [...p, a]);
      setInput("");
    }
  };

  const onBodyClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    finishIntro();
    setFocusTick((t) => t + 1);
  };

  const runSuggestion = (cmd: string) => {
    finishIntro();
    run(cmd);
    if (window.matchMedia("(pointer: fine)").matches) setFocusTick((t) => t + 1);
  };

  return (
    <div className="group/term relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/85 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors duration-300 focus-within:border-blood-500/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-500/70 to-transparent"
      />

      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 font-mono text-xs text-zinc-500">
          <TerminalIcon className="size-3.5" />
          sreekuttan@kali: ~
        </div>
        <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">zsh</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        onClick={onBodyClick}
        role="log"
        aria-label="Interactive terminal — type help to see commands"
        className="h-[300px] cursor-text overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed sm:h-[360px] sm:text-[13px]"
      >
        {lines.map((line) =>
          line.kind === "input" ? (
            <div key={line.id} className="flex flex-wrap gap-x-2">
              <Prompt />
              <span className="break-all text-zinc-100">{line.content}</span>
            </div>
          ) : (
            <div key={line.id} className="mb-3 mt-0.5 break-words text-zinc-400">
              {line.content}
            </div>
          )
        )}

        {typing !== null && (
          <div className="flex gap-x-2" aria-hidden="true">
            <Prompt />
            <span className="text-zinc-100">{typing}</span>
            <Caret />
          </div>
        )}

        {!introDone && typing === null && (
          <div className="flex gap-x-2" aria-hidden="true">
            <Prompt />
            <Caret />
          </div>
        )}

        {introDone && (
          <label className="flex items-center gap-x-2">
            <Prompt />
            <span className="sr-only">Terminal command</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-[16px] text-zinc-100 caret-blood-500 outline-none placeholder:text-zinc-700 focus-visible:outline-none sm:text-[13px]"
              placeholder="type a command…"
            />
          </label>
        )}
      </div>

      {/* Suggestions */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-t border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
        <span className="shrink-0 font-mono text-[11px] text-zinc-600">try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => runSuggestion(s)}
            className="shrink-0 cursor-pointer rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-blood-500/40 hover:bg-blood-500/10 hover:text-blood-300"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
