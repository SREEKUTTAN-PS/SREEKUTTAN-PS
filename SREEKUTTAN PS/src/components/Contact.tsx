import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, CircleCheck, Copy, Mail, MapPin, Send } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { useToast } from "./ui/Toast";
import { GithubIcon, LinkedinIcon } from "./icons";
import { mailto, profile, type IconType } from "@/data/portfolio";
import { copyText } from "@/utils/dom";
import { btn, container } from "@/utils/styles";
import { cn } from "@/utils/cn";

const TOPICS = ["Job opportunity", "Collaboration", "Just saying hi"];

type Form = { name: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

const inputCls =
  "w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600 transition focus:bg-ink-950 focus:outline-none focus-visible:outline-none focus:ring-4";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  onCopy,
  copied,
}: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors group-hover:border-blood-500/40 group-hover:text-blood-300">
        <Icon className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
        <span className="mt-0.5 block truncate text-[15px] text-zinc-100">{value}</span>
      </span>
    </>
  );

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-ink-850/70 p-3 pr-3.5 transition-colors hover:border-white/[0.14]">
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className="flex min-w-0 flex-1 items-center gap-4"
        >
          {content}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-4">{content}</div>
      )}
      {onCopy ? (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          title="Copy"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
        >
          {copied ? <Check className="size-4 text-term-green" /> : <Copy className="size-4" />}
        </button>
      ) : href ? (
        <ArrowUpRight className="size-4 shrink-0 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300" />
      ) : null}
    </div>
  );
}

function ContactForm() {
  const toast = useToast();
  const [form, setForm] = useState<Form>({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const subject = `[Portfolio] ${form.topic} — ${form.name.trim()}`;
    const body = `Hi Sreekuttan,\n\n${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    toast("Opening your email client…");
  };

  const field = (k: keyof Form) =>
    cn(
      inputCls,
      errors[k]
        ? "border-blood-500/60 focus:border-blood-500/70 focus:ring-blood-500/15"
        : "border-white/[0.08] focus:border-blood-500/50 focus:ring-blood-500/10"
    );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-500/60 to-transparent" />
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">compose — new_message.txt</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex min-h-[460px] flex-col items-center justify-center px-8 py-14 text-center"
          >
            <span className="grid size-16 place-items-center rounded-2xl border border-term-green/30 bg-term-green/10 text-term-green">
              <CircleCheck className="size-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-white">Message ready to send</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              Your email client should have opened with everything pre-filled. If it didn&apos;t, reach me directly at{" "}
              <a href={mailto} className="text-blood-300 underline underline-offset-4">
                {profile.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
              }}
              className={cn(btn.secondary, "mt-8")}
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 p-5 sm:p-7"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  id="cf-name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "cf-name-err" : undefined}
                  className={field("name")}
                />
                {errors.name && (
                  <p id="cf-name-err" className="mt-1.5 text-xs text-blood-400">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cf-email-err" : undefined}
                  className={field("email")}
                />
                {errors.email && (
                  <p id="cf-email-err" className="mt-1.5 text-xs text-blood-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-zinc-300">What&apos;s this about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const activeTopic = form.topic === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("topic", t)}
                      aria-pressed={activeTopic}
                      className={cn(
                        "cursor-pointer rounded-lg border px-3.5 py-2 text-sm transition-colors",
                        activeTopic
                          ? "border-blood-500/50 bg-blood-500/10 text-blood-200"
                          : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="cf-message"
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell me about the role, team or idea…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-err" : undefined}
                className={cn(field("message"), "resize-none")}
              />
              {errors.message && (
                <p id="cf-message-err" className="mt-1.5 text-xs text-blood-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className={cn(btn.primary, "w-full")}>
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <p className="text-center font-mono text-[11px] text-zinc-600">
              Opens your default email app — no data is stored on this site.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const ok = await copyText(profile.email);
    if (ok) {
      setCopied(true);
      toast("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 fade-mask-radial" />
        <div className="absolute bottom-[-20%] left-1/2 h-[520px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-blood-600/[0.12] blur-[140px]" />
      </div>

      <div className={container}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              index="07"
              label="Contact"
              title={
                <>
                  Let&apos;s secure <span className="text-gradient-red">something together.</span>
                </>
              }
              description="I'm actively looking for a Security Engineer role where I can contribute to offensive security operations. Have an opportunity, a question, or just want to talk security? My inbox is always open."
            />

            <Reveal delay={0.1} className="mt-10 space-y-3">
              <ContactRow
                icon={Mail}
                label="Email"
                value={profile.email}
                href={mailto}
                onCopy={copyEmail}
                copied={copied}
              />
              <ContactRow icon={LinkedinIcon} label="LinkedIn" value={profile.linkedinLabel} href={profile.linkedin} external />
              <ContactRow icon={GithubIcon} label="GitHub" value={profile.githubLabel} href={profile.github} external />
              <ContactRow icon={MapPin} label="Location" value={`${profile.location}, ${profile.country}`} />
            </Reveal>

            <Reveal delay={0.15} className="mt-6">
              <div className="flex items-center gap-3 rounded-2xl border border-term-green/20 bg-term-green/[0.05] px-4 py-3.5">
                <span className="relative flex size-2.5 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-term-green opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-term-green" />
                </span>
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-term-green">Available now</span> — open to Security Engineer
                  roles.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
