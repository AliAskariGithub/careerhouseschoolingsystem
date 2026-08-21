import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqs, school } from "@/data/school";

type Message = { id: number; from: "bot" | "user"; text: string };

const suggestions = [
  "What are the fees?",
  "How do I apply for admission?",
  "What are the school timings?",
  "Which classes do you offer?",
  "Where is the school located?",
  "Is transport available?",
];

const greeting = `Assalam-o-Alaikum! I'm the ${school.shortName} assistant. Ask me about fees, admissions, timings, classes or location — I answer instantly, any time of day.`;

function answerFor(input: string): string {
  const text = input.toLowerCase();
  let best: { score: number; answer: string } | null = null;

  for (const faq of faqs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (text.includes(keyword)) score += keyword.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: faq.answer };
    }
  }

  if (best) return best.answer;

  return "I don't have that detail yet. Please submit the admission inquiry form on the Admissions page, or visit the school office in Zamanabad, Landhi Town (Mon–Sat, 8:00 AM – 3:00 PM) and the administration will help you right away.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "user", text: trimmed },
      { id: prev.length + 1, from: "bot", text: answerFor(trimmed) },
    ]);
    setValue("");
  };

  return (
    <>
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close school assistant" : "Open school assistant"}
        className="fixed bottom-5 right-5 z-50 size-14 rounded-full shadow-lg"
        size="icon"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {open ? (
        <div
          role="dialog"
          aria-label="School assistant"
          className="reveal fixed bottom-24 right-4 z-50 flex h-[30rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <div className="bg-navy px-4 py-3 text-navy-foreground">
            <p className="font-display text-sm font-bold">School Assistant</p>
            <p className="text-xs text-navy-foreground/70">
              Instant answers on fees, admissions & timings
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "bot"
                    ? "max-w-[90%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                    : "ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-sm text-brand-foreground"
                }
              >
                {message.text}
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(value);
            }}
          >
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
            />
            <Button type="submit" size="icon" aria-label="Send question">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}
