import { useEffect, useState } from "react";

import campusHero from "@/assets/campus-hero.jpg";
import classroom from "@/assets/classroom.jpg";
import computerLab from "@/assets/computer-lab.jpg";
import library from "@/assets/library.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import sports from "@/assets/sports.jpg";

const slides = [
  {
    src: campusHero,
    alt: "Students in uniform walking into the Career House Schooling System campus in Landhi, Karachi",
  },
  {
    src: classroom,
    alt: "Primary students raising hands during a lesson at CHSS",
  },
  {
    src: scienceLab,
    alt: "Senior students performing an experiment in the CHSS science laboratory",
  },
  {
    src: computerLab,
    alt: "Students working at computers in the CHSS computer lab",
  },
  {
    src: sports,
    alt: "Students playing cricket and football on the CHSS ground",
  },
  {
    src: library,
    alt: "Students reading in the CHSS library",
  },
];

const INTERVAL_MS = 3000;

/**
 * Auto-advancing hero background carousel: crossfades to a new image
 * every 3s with a subtle Ken Burns zoom, dot indicators and a gentle
 * parallax shift while scrolling. Pauses on hover.
 */
export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setOffset(Math.min(window.scrollY * 0.15, 120)),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="School photo highlights"
    >
      <div
        className="absolute -inset-y-8 inset-x-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-slide absolute inset-0${i === active ? " is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <img
              src={slide.src}
              alt={i === active ? slide.alt : ""}
              width={1600}
              height={912}
              loading={i === 0 ? "eager" : "lazy"}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`hero-dot h-1.5 rounded-full ${
              i === active
                ? "w-6 bg-brand"
                : "w-1.5 bg-navy-foreground/50 hover:bg-navy-foreground/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
