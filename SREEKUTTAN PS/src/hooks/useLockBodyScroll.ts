import { useEffect } from "react";

let locks = 0;

/** Ref-counted scroll lock so stacked overlays don't fight each other. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    locks += 1;
    document.documentElement.style.overflow = "hidden";
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) document.documentElement.style.overflow = "";
    };
  }, [locked]);
}
