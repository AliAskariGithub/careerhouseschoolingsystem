export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 accent-rule font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base text-navy-foreground/80 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
