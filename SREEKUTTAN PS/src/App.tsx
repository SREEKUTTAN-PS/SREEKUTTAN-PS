import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Methodology } from "@/components/Methodology";
import { Credentials } from "@/components/Credentials";
import { Strengths } from "@/components/Strengths";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ResumeModal } from "@/components/ResumeModal";
import { BackToTop, ScrollProgress } from "@/components/ScrollExtras";
import { ToastProvider } from "@/components/ui/Toast";
import { sectionIds } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openResume = useCallback(() => {
    setPaletteOpen(false);
    setResumeOpen(true);
  }, []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <div className="relative min-h-screen overflow-x-clip">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-blood-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>

          <ScrollProgress />
          <Navbar active={active} onOpenPalette={openPalette} onOpenResume={openResume} />

          <main id="main">
            <Hero onOpenResume={openResume} />
            <About />
            <Skills />
            <Projects />
            <Methodology />
            <Credentials />
            <Strengths />
            <Contact />
          </main>

          <Footer onOpenPalette={openPalette} />
          <BackToTop />
          <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[70]" />
        </div>

        <CommandPalette open={paletteOpen} onClose={closePalette} onOpenResume={openResume} />
        <ResumeModal open={resumeOpen} onClose={closeResume} />
      </ToastProvider>
    </MotionConfig>
  );
}
