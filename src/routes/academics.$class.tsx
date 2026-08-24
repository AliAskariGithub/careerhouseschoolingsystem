import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, UserRound } from "lucide-react";

import classroomImage from "@/assets/classroom.jpg";
import computerLabImage from "@/assets/computer-lab.jpg";
import libraryImage from "@/assets/library.jpg";
import scienceLabImage from "@/assets/science-lab.jpg";
import sportsImage from "@/assets/sports.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { classLevels, getClassLevel } from "@/data/school";

export const Route = createFileRoute("/academics/$class")({
  loader: ({ params }) => {
    const level = getClassLevel(params.class);
    if (!level) throw notFound();
    return { level };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Class not found | Career House Schooling System" }, { name: "robots", content: "noindex" }],
      };
    }
    const { level } = loaderData;
    const title = `${level.name} — Courses, Faculty & Gallery | CHSS Landhi`;
    const description = `${level.name} at Career House Schooling System, Landhi Karachi: ${level.subjects
      .slice(0, 5)
      .join(", ")} and more, with class timings ${level.timing}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: ClassNotFound,
  component: ClassPage,
});

const gallery = [
  { src: classroomImage, alt: "Classroom lesson in progress at CHSS" },
  { src: libraryImage, alt: "Students reading in the school library" },
  { src: sportsImage, alt: "Students playing sports on the school ground" },
  { src: computerLabImage, alt: "Students working in the school computer lab" },
  { src: scienceLabImage, alt: "Students performing a science practical" },
];

function ClassNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Class not found</h1>
      <p className="mt-4 text-muted-foreground">
        We offer Montessori, Kindergarten and Classes 1 to 10. Please choose a class from the
        academics page.
      </p>
      <Button asChild className="mt-8">
        <Link to="/academics">Back to academics</Link>
      </Button>
    </div>
  );
}

function ClassPage() {
  const { level } = Route.useLoaderData();
  const index = classLevels.findIndex((item) => item.slug === level.slug);
  const previous = classLevels[index - 1];
  const next = classLevels[index + 1];

  return (
    <>
      <PageHeader
        eyebrow={`${level.stage} · ${level.ageRange}`}
        title={level.name}
        description={level.summary}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="accent-rule font-display text-2xl font-bold">Courses & subjects</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {level.subjects.map((subject) => (
                <li
                  key={subject}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {subject}
                </li>
              ))}
            </ul>

            <h2 className="accent-rule mt-12 font-display text-2xl font-bold">Learning outcomes</h2>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {level.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-bold">Class details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-ocean" aria-hidden="true" />
                  <dt className="sr-only">Timing</dt>
                  <dd>{level.timing}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Stage</dt>
                  <dd className="font-medium">{level.stage}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Typical age</dt>
                  <dd className="font-medium">{level.ageRange}</dd>
                </div>
              </dl>
              <Button asChild className="mt-6 w-full">
                <Link to="/admissions">Inquire about {level.name}</Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">Faculty</h2>
              <ul className="mt-4 space-y-4">
                {level.faculty.map((member) => (
                  <li key={member.role + member.subject} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <UserRound className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.subject}</p>
                      <p className="text-xs text-muted-foreground/80">{member.qualification}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="accent-rule font-display text-2xl font-bold">Gallery</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="h-48 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Gallery images are illustrative until the school shares photographs of this class.
          </p>
        </div>
      </section>

      <nav
        aria-label="Class navigation"
        className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 py-12 sm:px-6"
      >
        {previous ? (
          <Button asChild variant="outline">
            <Link to="/academics/$class" params={{ class: previous.slug }}>
              ← {previous.name}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="outline">
            <Link to="/academics/$class" params={{ class: next.slug }}>
              {next.name} →
            </Link>
          </Button>
        ) : null}
      </nav>
    </>
  );
}
