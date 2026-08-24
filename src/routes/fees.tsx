import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { feeNotes, feeStructure } from "@/data/school";

export const History = undefined;

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "Fee Structure | Career House Schooling System, Landhi" },
      {
        name: "description",
        content:
          "Level-wise fee structure at CHSS Landhi Karachi: admission fee, monthly tuition and annual charges for pre-school, primary, middle and Matric classes.",
      },
      { property: "og:title", content: "Fee Structure — Career House Schooling System" },
      {
        property: "og:description",
        content:
          "Admission fee, monthly tuition and annual charges by level, plus payment notes and concessions.",
      },
    ],
  }),
  component: Fees,
});

function Fees() {
  return (
    <>
      <PageHeader
        eyebrow="Fees"
        title="Fee structure"
        description="Fees are charged by level. The table below shows the one-time admission fee, monthly tuition and annual charges for each stage of schooling."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex gap-3 rounded-2xl border border-border bg-accent/60 p-5 text-sm text-accent-foreground">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Placeholder figures.</strong> The amounts shown are examples so the page layout
            is complete. Please share the official fee schedule and we will replace them exactly as
            issued by the school.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Admission fee</TableHead>
                <TableHead>Monthly tuition</TableHead>
                <TableHead>Annual charges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((row) => (
                <TableRow key={row.level}>
                  <TableCell className="font-medium">{row.level}</TableCell>
                  <TableCell>{row.admission}</TableCell>
                  <TableCell>{row.monthly}</TableCell>
                  <TableCell>{row.annual}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h2 className="accent-rule mt-14 font-display text-2xl font-bold">Payment notes</h2>
        <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
          {feeNotes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/admissions">Start an admission inquiry</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Ask the office about fees</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
