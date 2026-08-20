# Career House Schooling System — School Website

A fast, mobile-responsive website for CHSS (Landhi Town, Karachi), built from the ABOUT.md content. No backend for now: the inquiry form is client-side with a mailto/copy fallback, and the chatbot answers from a scripted FAQ knowledge base.

## Brand direction

- Palette: crimson `#BF092F` (primary/accent), deep navy `#132440` (text/dark bands), ocean blue `#16476A` (secondary), teal `#3B9797` (highlights), off-white surface.
- Typography: Urbanist headings + Epilogue body, loaded via `<link>` in the root head.
- Look: crest-inspired academic identity, navy hero band with crimson accent rules, rounded cards, generous whitespace, subtle fade/lift on scroll. No stock-purple gradients.

## Pages

| Route | Content |
|---|---|
| `/` | Hero (school name, Landhi Karachi, co-ed, BSEK), quick stats, programs preview, why-CHSS features, latest news teaser, admissions CTA, FAQ teaser |
| `/about` | Executive summary, mission & vision, history (neutral phrasing), accreditation & affiliations (BSEK), facilities list, community engagement, leadership placeholders |
| `/admissions` | Step-by-step admissions process (Inquiry → Visit → Application → Assessment → Interview → Decision → Fee & Enrollment) as a visual flow, required documents, eligibility, inquiry form |
| `/fees` | Fee structure table per level (admission fee, monthly tuition, annual charges), payment notes, clearly labelled placeholder figures |
| `/academics` | Overview of levels + grid linking to each class |
| `/academics/$class` | Per-class page for Montessori/KG and Classes 1–10: subjects/courses, learning outcomes, faculty cards, timings, class gallery |
| `/news` | News & events list with dates, categories, and a featured item |
| `/contact` | Address, timings, phone/email placeholders, embedded map of Zamanabad Landhi, short contact form, directions |

Shared header with nav + "Apply Now" button, and a footer with address, quick links, and hours.

## Chatbot

Floating chat button on every page opening a panel with:
- Suggested question chips (fees, admission steps, timings, classes offered, location, uniform, transport).
- Keyword-matched answers from a local FAQ dataset derived from ABOUT.md and the fee/contact placeholders.
- Fallback reply pointing to the inquiry form and contact page when no match is found.

## Admission inquiry form

Fields: student name, date of birth, class applying for, parent/guardian name, phone, email, preferred contact time, message. Validated with zod + react-hook-form; on submit it shows a success state and offers "Send via email" (prefilled mailto) plus copy-to-clipboard of the details, since nothing is stored yet.

## Content honesty

Unknown details (founding year, principal name, phone, email, exact fees, faculty names) render as clearly marked placeholders so they can be replaced, never invented as fact.

## Technical notes

- TanStack Start file routes under `src/routes/`; class pages use a dynamic `$class` segment backed by a typed data module in `src/data/` (classes, faculty, fees, news, FAQ).
- Design tokens added to `src/styles.css` `@theme inline` / `:root` in oklch; no hardcoded color utilities in components.
- Per-route `head()` with unique title, description, og:title, og:description; JSON-LD `EducationalOrganization` on the home route; single H1 per page; alt text on all images; lazy-loaded imagery.
- Generated hero/gallery/facility images kept few and compressed for fast loading.
- `src/routes/index.tsx` placeholder is replaced by the homepage.
