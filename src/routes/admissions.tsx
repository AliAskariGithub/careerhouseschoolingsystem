import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { InquiryForm } from "@/components/site/InquiryForm";
import { PageHeader } from "@/components/site/PageHeader";
import { admissionSteps, requiredDocuments } from "@/data/school";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions Process & Inquiry Form | CHSS Landhi Karachi" },
      {
        name: "description",
        content:
          "Step-by-step admission process at Career House Schooling System Landhi: inquiry, campus visit, application, assessment, interview, enrolment. Submit an online inquiry.",
      },
      { property: "og:title", content: "Admissions at Career House Schooling System" },
      {
        property: "og:description",
        content:
          "How to apply from Montessori to Class 10, required documents and an online admission inquiry form.",
      },
    ],
  }),
  component: Admissions,
});

function Admissions() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="How to join Career House Schooling System"
        description="Admissions run through the year subject to seat availability, from Montessori up to Class 9. Follow the steps below or send an inquiry and the office will guide you."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="accent-rule font-display text-2xl font-bold">The admission process</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-brand-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="accent-rule font-display text-2xl font-bold">Required documents</h2>
            <ul className="mt-8 space-y-3 text-sm">
              {requiredDocuments.map((document) => (
                <li
                  key={document}
                  className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-ocean" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="accent-rule font-display text-2xl font-bold">Eligibility & notes</h2>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>Montessori admissions are open to children aged about 3 years and above.</li>
              <li>
                Transfer students are assessed for the class matching their previous school record.
              </li>
              <li>Class 10 admissions are generally not accepted mid-session due to board rules.</li>
              <li>
                Assessment covers English, Urdu and Mathematics at the level of the previous class.
              </li>
              <li>
                Fee details are listed on the{" "}
                <Link to="/fees" className="font-semibold text-brand hover:underline">
                  fee structure page
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="accent-rule font-display text-2xl font-bold">Online admission inquiry</h2>
        <p className="mt-6 text-sm text-muted-foreground">
          Fill in the details below and you will get an email and copy option to send the inquiry to
          the school office. All fields marked optional can be left blank.
        </p>
        <div className="mt-8">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
