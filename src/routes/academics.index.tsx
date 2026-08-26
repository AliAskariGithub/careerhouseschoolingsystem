import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { classLevels, school } from "@/data/school";

export const Route = createFileRoute("/academics/")({
  head: () => ({
    meta: [
      { title: "Academics & Classes | Career House Schooling System" },
      {
        name: "description",
        content:
          "Courses, faculty and galleries for every class at CHSS Landhi Karachi — Montessori, Kindergarten, Classes 1 to 8 and Matric Classes 9–10 under BSEK.",
      },
      { property: "og:title", content: "Academics at Career House Schooling System" },
      {
        property: "og:description",
        content:
          "Class-wise subjects, teaching team and timings from Montessori to Matriculation in Landhi, Karachi.",
      },
    ],
  }),
  component: AcademicsIndex,
});

const stageOrder = ["Pre-School", "Primary", "Middle", "Secondary"] as const;

function AcademicsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Classes, courses and teaching team"
        description={`Every class has its own subjects, learning outcomes, faculty and gallery. Secondary students are prepared for the SSC examinations of the ${school.board}.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {stageOrder.map((stage) => {
          const levels = classLevels.filter((level) => level.stage === stage);
          return (
            <div key={stage} className="mb-14 last:mb-0">
              <h2 className="accent-rule font-display text-2xl font-bold">{stage}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {levels.map((level) => (
                  <Link
                    key={level.slug}
                    to="/academics/$class"
                    params={{ class: level.slug }}
                    className="group hover-lift rounded-2xl border border-border bg-card p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
                      {level.ageRange}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold group-hover:text-brand">
                      {level.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{level.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      View class <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
