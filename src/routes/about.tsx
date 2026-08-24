import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";

import libraryImage from "@/assets/library.jpg";
import scienceLabImage from "@/assets/science-lab.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { facilities, school } from "@/data/school";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Career House Schooling System, Landhi Karachi" },
      {
        name: "description",
        content:
          "Learn about Career House Schooling System: mission and vision, history in Landhi Town, BSEK affiliation, facilities and community role.",
      },
      { property: "og:title", content: "About Career House Schooling System" },
      {
        property: "og:description",
        content:
          "Mission, vision, history, accreditation and campus facilities of CHSS in Landhi Town, Karachi.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A community school built around student success"
        description="Career House Schooling System is a private, co-educational school in Landhi Town, Karachi, serving families from Landhi, Korangi and nearby neighbourhoods from pre-school through Matriculation."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="accent-rule font-display text-xl font-bold">Our mission</h2>
            <p className="mt-5 text-muted-foreground">
              To provide a supportive, student-centred educational environment that empowers
              learners to achieve academic success and build strong career foundations, through a
              balanced curriculum that fosters critical thinking, practical skills and personal
              growth.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="accent-rule font-display text-xl font-bold">Our vision</h2>
            <p className="mt-5 text-muted-foreground">
              To nurture responsible, motivated and capable individuals ready to excel in higher
              education and the professional world — developing global citizens through quality
              education, character building and broad extracurricular engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="accent-rule font-display text-2xl font-bold">History & background</h2>
              <p className="mt-6 text-muted-foreground">
                Founded by local educators, Career House Schooling System has steadily grown as a
                community school in Landhi Town. The school was established to serve families in
                Karachi's Landhi Town, part of Korangi District, and today combines classrooms,
                extracurricular programmes and regular parent engagement.
              </p>
              <p className="mt-4 flex gap-3 rounded-xl bg-accent/60 p-4 text-sm text-accent-foreground">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  The exact founding year and founder biography are not publicly documented. Share
                  these details with us and we will publish them here.
                </span>
              </p>
            </div>
            <div>
              <h2 className="accent-rule font-display text-2xl font-bold">
                Accreditation & affiliations
              </h2>
              <p className="mt-6 text-muted-foreground">
                The school is recognised by the Sindh education authorities and appears on the
                official {school.board} school directory, confirming eligibility to prepare students
                for the SSC (Matriculation) examinations. CHSS follows the Sindh Board academic
                calendar and examination system. Cambridge and A-Level programmes are not offered.
              </p>
              <h2 className="accent-rule mt-10 font-display text-2xl font-bold">
                Leadership & faculty
              </h2>
              <p className="mt-6 text-muted-foreground">
                The school is led by a Principal supported by a private management committee.
                Teaching staff are qualified for primary and secondary levels. Individual leadership
                and faculty profiles are not published yet and appear as placeholders across the
                site until the school confirms them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="accent-rule font-display text-2xl font-bold">Facilities & infrastructure</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-base font-semibold">{facility.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{facility.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <figure>
            <img
              src={scienceLabImage}
              alt="Secondary students carrying out a chemistry practical in the school laboratory"
              width={1200}
              height={800}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Laboratory practicals support the Matric science syllabus (illustrative).
            </figcaption>
          </figure>
          <figure>
            <img
              src={libraryImage}
              alt="Students reading storybooks in the school library"
              width={1200}
              height={800}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Reading and self-study are encouraged from the primary years (illustrative).
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="accent-rule font-display text-2xl font-bold">
              Community & extracurriculars
            </h2>
            <p className="mt-6 text-muted-foreground">
              As a neighbourhood school, CHSS participates in community events and encourages social
              responsibility, with parent–teacher engagement at the centre of school life. Students
              take part in sports such as cricket, football and volleyball, arts including drawing
              and drama, and clubs for science and debate.
            </p>
          </div>
          <div>
            <h2 className="accent-rule font-display text-2xl font-bold">Achievements & alumni</h2>
            <p className="mt-6 text-muted-foreground">
              No public information on awards or alumni is available at this time. As results and
              competition achievements are shared by the administration, they will be published on
              the news and events page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
