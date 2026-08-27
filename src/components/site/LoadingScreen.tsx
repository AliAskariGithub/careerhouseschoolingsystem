import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const STRIPS = 6;
const HOLD_MS = 1500;
const WIPE_MS = 900;

/**
 * First-visit loading screen. Shows a branded splash, then wipes away with the
 * same maroon / charcoal strip animation used for page transitions before
 * revealing the page underneath. Only plays once per browser session.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"hidden" | "loading" | "wipe">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("chss-loaded") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("chss-loaded", "1");
      return;
    }

    sessionStorage.setItem("chss-loaded", "1");
    setPhase("loading");
    document.body.style.overflow = "hidden";

    const toWipe = window.setTimeout(() => setPhase("wipe"), HOLD_MS);
    const toDone = window.setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
    }, HOLD_MS + WIPE_MS);

    return () => {
      window.clearTimeout(toWipe);
      window.clearTimeout(toDone);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className="loading-screen" role="status" aria-label="Loading">
      <div className="loading-screen-strips" aria-hidden="true">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <div key={i} className="page-transition-strip">
            <span
              className={`page-transition-half page-transition-half--top${
                phase === "wipe" ? " is-leaving" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            />
            <span
              className={`page-transition-half page-transition-half--bottom${
                phase === "wipe" ? " is-leaving" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            />
          </div>
        ))}
      </div>

      {phase === "loading" ? (
        <div className="loading-screen-content">
          <span className="loading-screen-mark">
            <GraduationCap className="size-8" aria-hidden="true" />
          </span>
          <p className="loading-screen-title">Career House</p>
          <p className="loading-screen-sub">Schooling System</p>
          <span className="loading-screen-bar" aria-hidden="true">
            <span />
          </span>
        </div>
      ) : null}
    </div>
  );
}
