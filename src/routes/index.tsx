import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FlaskConical,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";

import classroomImage from "@/assets/classroom.jpg";
import sportsImage from "@/assets/sports.jpg";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { classLevels, faqs, newsItems, school } from "@/data/school";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Career House Schooling System – School in Landhi, Karachi" },
      {
        name: "description",
        content:
          "Co-educational private school in Landhi Town, Karachi. Montessori to Matric (BSEK), balanced curriculum, admissions open. See classes, fees and admission process.",
      },
      { property: "og:title", content: "Career House Schooling System – Landhi, Karachi" },
      {
        property: "og:description",
        content:
          "Montessori to Matriculation in Landhi Town, Karachi. Balanced curriculum, caring teachers, BSEK affiliation.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: school.name,
          description:
            "Co-educational private school in Landhi Town, Karachi offering pre-school through Matriculation under the Board of Secondary Education Karachi.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot A1-66, Street No. 3, Zamanabad Housing Society, Sector 36-B",
            addressLocality: "Landhi Town, Karachi",
            addressRegion: "Sindh",
            addressCountry: "PK",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const highlights = [
  {
    icon: BookOpen,
    title: "Balanced curriculum",
    detail:
      "Core sciences, mathematics and languages taught with practical work and regular assessment.",
  },
  {
    icon: Users,
    title: "Co-educational",
    detail: "Boys and girls learn together from Montessori through Matriculation Class 10.",
  },
  {
    icon: FlaskConical,
    title: "Labs & computers",
    detail: "Science practicals and a computer lab support hands-on learning in senior classes.",
  },
  {
    icon: HeartHandshake,
    title: "Community school",
    detail: "Rooted in Landhi and Korangi, with close contact between teachers and parents.",
  },
];

const stages = [
  {
    name: "Pre-School",
    detail: "Montessori & Kindergarten",
    slug: "montessori",
    note: "Play-based phonics, numeracy and routine building for ages 3–5.",
  },
  {
    name: "Primary",
    detail: "Classes 1 – 5",
    slug: "class-1",
    note: "Strong literacy and numeracy foundations with regular class tests.",
  },
  {
    name: "Middle",
    detail: "Classes 6 – 8",
    slug: "class-6",
    note: "Subject-specialist teaching, lab work and structured study skills.",
  },
  {
    name: "Secondary",
    detail: "Classes 9 – 10 (Matric)",
    slug: "class-9",
    note: "Focused BSEK syllabus coverage, past papers and practicals.",
  },
];

function Home() {
  const featured = newsItems[0]!;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <HeroCarousel />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="reveal inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-foreground">
            Admissions open
          </p>
          <h1
            className="reveal mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.12s" }}
          >
            {school.name}
          </h1>
          <p
            className="reveal mt-5 max-w-2xl text-lg text-navy-foreground/85"
            style={{ animationDelay: "0.24s" }}
          >
            {school.tagline} — offering Montessori through Matriculation with a balanced curriculum,
            caring teachers and a focus on character as much as marks.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.36s" }}>
            <Button asChild size="lg">
              <Link to="/admissions">Start an admission inquiry</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <Link to="/academics">Explore classes</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: "Levels", value: "Montessori–10" },
              { label: "Board", value: "BSEK Matric" },
              { label: "Type", value: "Co-education" },
              { label: "Area", value: "Landhi Town" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-navy-foreground/60">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal as="h2" className="accent-rule font-display text-2xl font-bold sm:text-3xl">
          Why families choose CHSS
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group hover-lift h-full rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal as="h2" className="accent-rule font-display text-2xl font-bold sm:text-3xl">
              Programmes by level
            </Reveal>
            <Link
              to="/academics"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              All {classLevels.length} classes <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, i) => (
              <Reveal key={stage.name} delay={i * 90}>
                <Link
                  to="/academics/$class"
                  params={{ class: stage.slug }}
                  className="group hover-lift block h-full rounded-2xl border border-border bg-card p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
                    {stage.name}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold group-hover:text-brand">
                    {stage.detail}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{stage.note}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={classroomImage}
              alt="Primary students raising hands in a CHSS classroom"
              width={1200}
              height={800}
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover sm:h-72"
            />
            <img
              src={sportsImage}
              alt="Students playing cricket and football on the school ground"
              width={1200}
              height={800}
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover sm:mt-8 sm:h-72"
            />
          </div>
          <div>
            <Reveal as="h2" className="accent-rule font-display text-2xl font-bold sm:text-3xl">
              Learning inside and outside the classroom
            </Reveal>
            <p className="mt-6 text-muted-foreground">
              Our teaching emphasises critical thinking, practical learning and personal
              development, so students leave prepared for higher education and competitive careers.
              Beyond lessons, students take part in cricket, football and volleyball, art and drama,
              science and debate clubs, and inter-house events.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Regular assessment with parent feedback",
                "Science and computer laboratories for senior classes",
                "Library and reading habit encouraged from Class 1",
              ].map((point) => (
                <li key={point} className="flex gap-3">
                  <ClipboardCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">About the school</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <Reveal as="h2" className="accent-rule font-display text-2xl font-bold sm:text-3xl">
              Latest news & events
            </Reveal>
            <div className="mt-8 space-y-5">
              {newsItems.slice(0, 3).map((item) => (
                <article key={item.slug} className="group hover-lift rounded-2xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ocean">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <span className="text-muted-foreground">· {item.category}</span>
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
                </article>
              ))}
            </div>
            <Link
              to="/news"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              All news & events <ArrowRight className="size-4" />
            </Link>
          </div>

          <div>
            <Reveal as="h2" className="accent-rule font-display text-2xl font-bold sm:text-3xl">
              Common questions
            </Reveal>
            <div className="mt-8 space-y-4">
              {faqs.slice(0, 4).map((faq) => (
                <div key={faq.question} className="group hover-lift rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-display text-base font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Need a quick answer? Open the chat assistant in the corner — it replies instantly, 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-3xl bg-navy px-6 py-12 text-navy-foreground sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Ready to enrol your child?
          </h2>
          <p className="mt-4 max-w-2xl text-navy-foreground/80">
            Send an admission inquiry and the administration will guide you through the assessment,
            documents and fee schedule. Featured update: {featured.title.toLowerCase()}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/admissions">Admission inquiry form</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <Link to="/fees">View fee structure</Link>
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-navy-foreground/70">
            <MapPin className="size-4" aria-hidden="true" /> {school.address}
          </p>
        </div>
      </section>
    </>
  );
}
