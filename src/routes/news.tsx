import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/data/school";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events | Career House Schooling System, Landhi" },
      {
        name: "description",
        content:
          "Latest news, notices and events from Career House Schooling System in Landhi Town, Karachi — admissions updates, results, sports weeks and parent meetings.",
      },
      { property: "og:title", content: "News & Events at CHSS Landhi" },
      {
        property: "og:description",
        content:
          "Admissions notices, academic updates, sports weeks and parent-teacher meeting schedules.",
      },
    ],
  }),
  component: News,
});

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function News() {
  const featured = newsItems.find((item) => item.featured) ?? newsItems[0];
  const rest = newsItems.filter((item) => item.slug !== featured.slug);

  return (
    <>
      <PageHeader
        eyebrow="News & events"
        title="What's happening at school"
        description="Notices, academic updates and event announcements. Printed circulars are also sent home through student diaries."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <article className="rounded-3xl border border-border bg-surface p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{featured.category}</Badge>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(featured.date)}
            </p>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{featured.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
          <Button asChild className="mt-7">
            <Link to="/admissions">Submit an inquiry</Link>
          </Button>
        </article>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((item) => (
            <article key={item.slug} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{item.category}</Badge>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {formatDate(item.date)}
                </p>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Have an announcement to publish? Share it with the administration and it will appear here.
        </p>
      </section>
    </>
  );
}
