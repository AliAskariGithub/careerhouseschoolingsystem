import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const STRIPS = 6;
const DURATION_MS = 1000;

/**
 * Strip-style page transition. On every route change a set of vertical
 * strips closes over the screen, then each strip splits: the top half
 * sweeps up and the bottom half sweeps down, revealing the new page.
 * Alternating maroon and charcoal-black strips.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [playing, setPlaying] = useState(false);
  const [runId, setRunId] = useState(0);
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setRunId((n) => n + 1);
    setPlaying(true);
    const timer = window.setTimeout(() => setPlaying(false), DURATION_MS + 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!playing) return null;

  return (
    <div key={runId} className="page-transition" aria-hidden="true">
      {Array.from({ length: STRIPS }).map((_, i) => (
        <div key={i} className="page-transition-strip">
          <span
            className="page-transition-half page-transition-half--top"
            style={{ animationDelay: `${i * 60}ms` }}
          />
          <span
            className="page-transition-half page-transition-half--bottom"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        </div>
      ))}
    </div>
  );
}
