import { useEffect, useState } from "react";

type Options = {
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  enabled?: boolean;
};

/** Cycles through words with a type / delete animation. */
export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 75, deleteSpeed = 38, pause = 1800, enabled = true }: Options = {}
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || words.length === 0) return;
    const current = words[wordIndex % words.length];

    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === current) delay = pause;
    if (deleting && text === "") delay = 320;

    const t = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause, enabled]);

  return enabled ? text : (words[0] ?? "");
}
