import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { classLevels } from "@/data/school";

const schema = z.object({
  studentName: z.string().min(2, "Please enter the student's full name"),
  dateOfBirth: z.string().min(1, "Please enter the date of birth"),
  classApplied: z.string().min(1, "Please choose a class"),
  guardianName: z.string().min(2, "Please enter the parent or guardian name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Digits, spaces, + and - only"),
  email: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
  preferredTime: z.string().min(1, "Please choose a preferred contact time"),
  message: z.string().max(600, "Please keep this under 600 characters").optional(),
});

type InquiryValues = z.infer<typeof schema>;

const contactTimes = ["Morning (8 AM – 11 AM)", "Midday (11 AM – 1 PM)", "Afternoon (1 PM – 3 PM)"];

function toPlainText(values: InquiryValues) {
  return [
    "Admission inquiry — Career House Schooling System",
    `Student name: ${values.studentName}`,
    `Date of birth: ${values.dateOfBirth}`,
    `Class applying for: ${values.classApplied}`,
    `Parent / guardian: ${values.guardianName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email || "not provided"}`,
    `Preferred contact time: ${values.preferredTime}`,
    `Message: ${values.message || "—"}`,
  ].join("\n");
}

export function InquiryForm() {
  const [submitted, setSubmitted] = useState<InquiryValues | null>(null);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentName: "",
      dateOfBirth: "",
      classApplied: "",
      guardianName: "",
      phone: "",
      email: "",
      preferredTime: "",
      message: "",
    },
  });

  if (submitted) {
    const summary = toPlainText(submitted);
    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold">Inquiry ready to send</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Online submissions are not connected to the school office yet. Send the details by email
          or copy them and share on WhatsApp — the administration will respond during office hours.
        </p>
        <pre className="mt-5 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-secondary p-4 text-xs text-secondary-foreground">
          {summary}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                `Admission inquiry — ${submitted.studentName}`,
              )}&body=${encodeURIComponent(summary)}`}
            >
              <Mail className="size-4" /> Send via email
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                toast.success("Inquiry details copied");
              } catch {
                toast.error("Copy failed — please select the text manually");
              }
            }}
          >
            <Copy className="size-4" /> Copy details
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              form.reset();
              setSubmitted(null);
            }}
          >
            Submit another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          setSubmitted(values);
          toast.success("Inquiry recorded on this device");
        })}
        className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
      >
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student name</FormLabel>
              <FormControl>
                <Input placeholder="Full name as per B-Form" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classApplied"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class applying for</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classLevels.map((level) => (
                    <SelectItem key={level.slug} value={level.name}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guardianName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent / guardian name</FormLabel>
              <FormControl>
                <Input placeholder="Father, mother or guardian" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone / WhatsApp</FormLabel>
              <FormControl>
                <Input inputMode="tel" placeholder="03XX XXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred contact time</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Message (optional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Anything the school should know — transfer details, transport needs, questions."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Submissions stay on your device for now; you will be given an email and copy option
                on the next step.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Submit inquiry
          </Button>
        </div>
      </form>
    </Form>
  );
}
