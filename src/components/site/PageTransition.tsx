import { useRouter, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

const STRIPS = 6;
/** Time for strips to fully cover the screen before navigation. */
const COVER_MS = 550;
/** Full lifecycle of the reveal (open) phase. */
const REVEAL_MS = 1000;

type Phase = "idle" | "covering" | "revealing";

/**
 * Strip-style page transition. Internal link clicks are intercepted: the
 * strips first sweep in and fully cover the screen, THEN the route changes,
 * then each strip splits — top half sweeps up, bottom half sweeps down —
 * revealing the new page. Alternating maroon and charcoal-black strips.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState(0);
  const pendingHref = useRef<string | null>(null);
  const busy = useRef(false);

  const reducedMotion = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Intercept clicks on internal links so the cover phase plays first.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || anchor.target === "_blank") return;
      if (href === window.location.pathname) return;
      if (busy.current || reducedMotion()) return;

      e.preventDefault();
      busy.current = true;
      pendingHref.current = href;
      setRunId((n) => n + 1);
      setPhase("covering");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reducedMotion]);

  // After the screen is covered, navigate to the pending route.
  useEffect(() => {
    if (phase !== "covering") return;
    const timer = window.setTimeout(() => {
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) {
        router.navigate({ to: href });
      }
      setRunId((n) => n + 1);
      setPhase("revealing");
    }, COVER_MS);
    return () => window.clearTimeout(timer);
  }, [phase, router]);

  // End the reveal phase.
  useEffect(() => {
    if (phase !== "revealing") return;
    const timer = window.setTimeout(() => {
      setPhase("idle");
      busy.current = false;
    }, REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Safety: if pathname changes without our interception (back button,
  // programmatic nav), just play the reveal without a cover phase.
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (busy.current || reducedMotion()) return;
    busy.current = true;
    setRunId((n) => n + 1);
    setPhase("revealing");
  }, [pathname, reducedMotion]);

  if (phase === "idle") return null;

  return (
    <div
      key={runId}
      className={`page-transition page-transition--${phase}`}
      aria-hidden="true"
    >
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
