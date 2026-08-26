import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { school } from "@/data/school";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | Career House Schooling System, Landhi" },
      {
        name: "description",
        content:
          "Visit Career House Schooling System at Zamanabad Housing Society, Sector 36-B, Landhi Town, Karachi. School timings, office hours, directions and inquiry options.",
      },
      { property: "og:title", content: "Contact Career House Schooling System" },
      {
        property: "og:description",
        content: "Address, map, school timings and office hours for CHSS in Landhi Town, Karachi.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Visit or write to us"
        description="The school office is the fastest way to confirm seat availability, fees and transport. Walk in during office hours or send an admission inquiry online."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="group hover-lift rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <MapPin className="size-5 text-brand" aria-hidden="true" /> Address
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{school.address}</p>
              <p className="mt-2 text-sm text-muted-foreground">{school.landmark}</p>
            </div>

            <div className="group hover-lift rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Clock className="size-5 text-brand" aria-hidden="true" /> Timings
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                {school.timings.map((timing) => (
                  <div key={timing.label} className="flex flex-wrap justify-between gap-2">
                    <dt className="text-muted-foreground">{timing.label}</dt>
                    <dd className="font-medium">{timing.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="group hover-lift rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-bold">Phone & email</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-ocean" aria-hidden="true" />
                  {school.phonePlaceholder}
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-ocean" aria-hidden="true" />
                  {school.emailPlaceholder}
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                These are placeholders — the school's published phone number and email will replace
                them once confirmed.
              </p>
              <Button asChild className="mt-6">
                <Link to="/admissions">Send an admission inquiry</Link>
              </Button>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map showing Career House Schooling System in Landhi Town, Karachi"
                src={`https://www.google.com/maps?q=${encodeURIComponent(school.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 sm:h-[26rem]"
              />
            </div>
            <h2 className="accent-rule mt-10 font-display text-xl font-bold">Directions</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                From Landhi No. 6, head towards Zamanabad Housing Society and turn into Sector 36-B.
              </li>
              <li>Street No. 3 is a short walk from the sector's main access road.</li>
              <li>Buses and rickshaws from Korangi and Landhi Town stop nearby.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
