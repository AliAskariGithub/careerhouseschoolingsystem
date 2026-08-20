export const school = {
  name: "Career House Schooling System",
  shortName: "CHSS",
  tagline: "A co-educational community school in Landhi Town, Karachi",
  address:
    "Plot A1-66, Street No. 3, Zamanabad Housing Society, Sector 36-B, Landhi Town, Karachi, Sindh",
  landmark: "Near Zamanabad, adjacent to main Landhi roads (Korangi District)",
  phonePlaceholder: "+92 3XX XXX XXXX (to be confirmed)",
  emailPlaceholder: "info@example.com (to be confirmed)",
  timings: [
    { label: "Pre-school (Montessori & KG)", value: "8:00 AM - 12:00 PM" },
    { label: "Primary (Classes 1-5)", value: "8:00 AM - 1:30 PM" },
    { label: "Middle (Classes 6-8)", value: "8:00 AM - 2:00 PM" },
    { label: "Secondary (Classes 9-10)", value: "8:00 AM - 2:30 PM" },
    { label: "Office hours", value: "Mon - Sat, 8:00 AM - 3:00 PM" },
  ],
  board: "Board of Secondary Education Karachi (BSEK)",
  mapQuery: "Zamanabad Housing Society Sector 36-B Landhi Town Karachi",
} as const;

export const placeholderNote =
  "Placeholder - please share the confirmed details so we can publish them.";

export type ClassLevel = {
  slug: string;
  name: string;
  stage: "Pre-School" | "Primary" | "Middle" | "Secondary";
  ageRange: string;
  timing: string;
  summary: string;
  subjects: string[];
  outcomes: string[];
  faculty: { role: string; subject: string; qualification: string }[];
};

const QUAL = "Qualification on file - profile to be confirmed by the school";

const stageFor = (n: number): ClassLevel["stage"] =>
  n <= 5 ? "Primary" : n <= 8 ? "Middle" : "Secondary";

const timingFor = (stage: ClassLevel["stage"]) =>
  stage === "Primary"
    ? "8:00 AM - 1:30 PM"
    : stage === "Middle"
      ? "8:00 AM - 2:00 PM"
      : "8:00 AM - 2:30 PM";

const subjectsFor = (n: number): string[] => {
  if (n <= 2)
    return ["English", "Urdu", "Mathematics", "General Knowledge", "Islamiat", "Handwriting", "Drawing & Craft"];
  if (n <= 5)
    return ["English", "Urdu", "Mathematics", "General Science", "Social Studies", "Islamiat", "Computer Basics"];
  if (n <= 8)
    return ["English", "Urdu", "Mathematics", "General Science", "Pakistan Studies", "Islamiat", "Computer Studies"];
  return [
    "English",
    "Urdu",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology / Computer Science",
    "Pakistan Studies",
    "Islamiat",
  ];
};

const outcomesFor = (n: number): string[] => {
  if (n <= 2)
    return [
      "Confident reading, writing and speaking in English and Urdu",
      "Number sense, basic operations and shape recognition",
      "Classroom routines, sharing and self-care habits",
    ];
  if (n <= 5)
    return [
      "Comprehension and paragraph writing across both languages",
      "Problem solving with fractions, measurement and data",
      "Curiosity about science through simple experiments and projects",
    ];
  if (n <= 8)
    return [
      "Structured note-taking, revision and exam technique",
      "Algebra, geometry and applied mathematics fluency",
      "Lab-based science practice and solid computer literacy",
    ];
  return [
    "Full preparation for the BSEK Matriculation (SSC) examinations",
    "Practical work in physics, chemistry and biology laboratories",
    "Study skills and career guidance for college admissions",
  ];
};

const facultyFor = (n: number) => {
  if (n <= 5)
    return [
      { role: "Class Teacher", subject: "English & General Knowledge", qualification: QUAL },
      { role: "Subject Teacher", subject: "Mathematics & Science", qualification: QUAL },
      { role: "Subject Teacher", subject: "Urdu & Islamiat", qualification: QUAL },
    ];
  if (n <= 8)
    return [
      { role: "Class Teacher", subject: "English", qualification: QUAL },
      { role: "Subject Teacher", subject: "Mathematics", qualification: QUAL },
      { role: "Subject Teacher", subject: "General Science", qualification: QUAL },
      { role: "Subject Teacher", subject: "Computer Studies", qualification: QUAL },
    ];
  return [
    { role: "Class Teacher", subject: "Mathematics", qualification: QUAL },
    { role: "Subject Teacher", subject: "Physics", qualification: QUAL },
    { role: "Subject Teacher", subject: "Chemistry", qualification: QUAL },
    { role: "Subject Teacher", subject: "Biology / Computer Science", qualification: QUAL },
  ];
};

export const classLevels: ClassLevel[] = [
  {
    slug: "montessori",
    name: "Montessori",
    stage: "Pre-School",
    ageRange: "Ages 3-4",
    timing: "8:00 AM - 12:00 PM",
    summary:
      "A gentle first step into school life, built around play, phonics and hands-on activity in a calm classroom.",
    subjects: ["Phonics & Rhymes", "Urdu Sounds", "Numbers 1-50", "Colours & Shapes", "Art & Craft", "Story Time"],
    outcomes: [
      "Comfortable separation from parents and a settled classroom routine",
      "Letter and number recognition through play",
      "Fine motor skills, sharing and following simple instructions",
    ],
    faculty: [
      { role: "Montessori Directress", subject: "Early Years", qualification: QUAL },
      { role: "Assistant Teacher", subject: "Activity & Care", qualification: QUAL },
    ],
  },
  {
    slug: "kindergarten",
    name: "Kindergarten",
    stage: "Pre-School",
    ageRange: "Ages 4-5",
    timing: "8:00 AM - 12:00 PM",
    summary:
      "Reading, writing and early numeracy come together so children step into Class 1 ready and confident.",
    subjects: ["English Reading & Writing", "Urdu Reading", "Mathematics", "General Knowledge", "Islamiat", "Drawing"],
    outcomes: [
      "Blending sounds into words and writing simple sentences",
      "Counting, addition and subtraction within 100",
      "Listening, speaking and classroom confidence",
    ],
    faculty: [
      { role: "Class Teacher", subject: "English & Mathematics", qualification: QUAL },
      { role: "Assistant Teacher", subject: "Urdu & Activity", qualification: QUAL },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    const stage = stageFor(n);
    return {
      slug: `class-${n}`,
      name: `Class ${n}`,
      stage,
      ageRange: `Ages ${n + 4}-${n + 5}`,
      timing: timingFor(stage),
      summary:
        stage === "Primary"
          ? `Class ${n} builds strong literacy, numeracy and study habits with regular class tests and parent feedback.`
          : stage === "Middle"
            ? `Class ${n} moves into subject-specialist teaching, laboratory work and structured exam preparation.`
            : `Class ${n} is a Matriculation year: focused BSEK syllabus coverage, past papers and practical examinations.`,
      subjects: subjectsFor(n),
      outcomes: outcomesFor(n),
      faculty: facultyFor(n),
    } satisfies ClassLevel;
  }),
];

export const getClassLevel = (slug: string) => classLevels.find((c) => c.slug === slug);

export const feeStructure = [
  { level: "Montessori & Kindergarten", admission: "Rs. 4,000", monthly: "Rs. 2,000", annual: "Rs. 3,000" },
  { level: "Classes 1 - 5", admission: "Rs. 5,000", monthly: "Rs. 2,500", annual: "Rs. 3,500" },
  { level: "Classes 6 - 8", admission: "Rs. 6,000", monthly: "Rs. 3,000", annual: "Rs. 4,000" },
  { level: "Classes 9 - 10 (Matric)", admission: "Rs. 7,500", monthly: "Rs. 3,500", annual: "Rs. 5,000" },
];

export const feeNotes = [
  "All amounts above are placeholders for layout purposes and must be replaced with the school's official fee schedule.",
  "Admission fee is one-time and charged at enrolment; annual charges cover examinations, stationery and activities.",
  "Monthly tuition is payable by the 10th of each month at the school office.",
  "Board registration and examination fees for Classes 9-10 are charged separately as notified by BSEK.",
  "Sibling and hardship concessions may be available - please discuss with the administration.",
];

export const facilities = [
  { title: "Classrooms", detail: "Grade-wise classrooms with whiteboards and multimedia support." },
  { title: "Science Laboratories", detail: "Physics, chemistry and biology practicals for secondary students." },
  { title: "Computer Lab", detail: "Desktop workstations for ICT and computer studies periods." },
  { title: "Library", detail: "Textbooks, reference material and a growing storybook collection." },
  { title: "Sports Ground", detail: "Open play area for cricket, football and morning assembly." },
  { title: "Transport", detail: "School van service for nearby Landhi and Korangi sectors (subject to routes)." },
  { title: "Safety", detail: "Boundary wall, gate security and monitored entry and dispersal." },
];

export const newsItems = [
  {
    slug: "admissions-open",
    title: "Admissions open for the new academic session",
    date: "2026-08-10",
    category: "Admissions",
    excerpt:
      "Limited seats are available from Montessori to Class 9. Families can submit an online inquiry and book a campus visit with the administration.",
    featured: true,
  },
  {
    slug: "matric-result-day",
    title: "Matriculation result celebration for Class 10",
    date: "2026-07-28",
    category: "Academics",
    excerpt:
      "Students and parents gathered for a short assembly recognising effort and improvement across the BSEK examination group.",
    featured: false,
  },
  {
    slug: "inter-house-sports",
    title: "Inter-house sports week announced",
    date: "2026-07-15",
    category: "Sports",
    excerpt:
      "Cricket, football and relay races will run through the last week of the month, with prizes at the closing assembly.",
    featured: false,
  },
  {
    slug: "parent-teacher-meeting",
    title: "Parent-teacher meeting schedule",
    date: "2026-07-05",
    category: "Notice",
    excerpt:
      "Class-wise meeting slots are shared through student diaries. Parents are requested to collect progress reports in person.",
    featured: false,
  },
  {
    slug: "science-exhibition",
    title: "Science exhibition by the middle section",
    date: "2026-06-20",
    category: "Events",
    excerpt:
      "Classes 6-8 presented working models on energy, water and simple machines in the school hall.",
    featured: false,
  },
];

export const admissionSteps = [
  { title: "Inquiry", detail: "Submit the online inquiry form or call the school office to check seat availability." },
  { title: "Campus Visit", detail: "Meet the administration, tour the classrooms and discuss your child's needs." },
  { title: "Application", detail: "Complete the admission form and attach the required documents." },
  { title: "Assessment", detail: "A short written assessment appropriate to the class applied for." },
  { title: "Interview", detail: "A brief parent and student meeting, where required for the class." },
  { title: "Decision", detail: "The school confirms the admission offer and allotted section." },
  { title: "Fee & Enrolment", detail: "Pay admission dues, collect the diary and the uniform list." },
  { title: "Start Classes", detail: "Your child joins their class from the agreed start date." },
];

export const requiredDocuments = [
  "Copy of the student's birth certificate or B-Form",
  "Two recent passport-size photographs of the student",
  "Copy of both parents' / guardian's CNIC",
  "School leaving certificate and last result card (for transfer cases)",
  "Vaccination record (for pre-school admissions)",
];

export const faqs = [
  {
    keywords: ["fee", "fees", "tuition", "monthly", "cost", "charges", "price"],
    question: "What is the fee structure?",
    answer:
      "Fees depend on the level: pre-school, Classes 1-5, 6-8 and Matric each have their own admission fee, monthly tuition and annual charges. The figures on our Fee Structure page are placeholders pending confirmation - please contact the office for the official schedule.",
  },
  {
    keywords: ["admission", "apply", "enrol", "enroll", "process", "form", "seat", "test"],
    question: "How do I apply for admission?",
    answer:
      "The process is: inquiry, campus visit, application form, a short assessment, an interview where required, admission decision, then fee payment and enrolment. Start by submitting the online admission inquiry form on the Admissions page.",
  },
  {
    keywords: ["timing", "timings", "time", "hours", "open", "close", "shift", "schedule"],
    question: "What are the school timings?",
    answer:
      "Pre-school runs 8:00 AM-12:00 PM, Classes 1-5 until 1:30 PM, Classes 6-8 until 2:00 PM and Classes 9-10 until 2:30 PM. The office is open Monday to Saturday, 8:00 AM-3:00 PM.",
  },
  {
    keywords: ["class", "classes", "grade", "level", "montessori", "kg", "matric", "secondary", "offer"],
    question: "Which classes does the school offer?",
    answer:
      "We offer Montessori and Kindergarten, Classes 1 to 8, and Matriculation Classes 9 and 10 under the Board of Secondary Education Karachi (BSEK).",
  },
  {
    keywords: ["where", "location", "address", "landhi", "map", "reach", "direction"],
    question: "Where is the school located?",
    answer:
      "Plot A1-66, Street No. 3, Zamanabad Housing Society, Sector 36-B, Landhi Town, Karachi - close to main Landhi roads and easily reached from Korangi.",
  },
  {
    keywords: ["board", "bsek", "sindh", "exam", "curriculum", "syllabus", "cambridge"],
    question: "Which board and curriculum do you follow?",
    answer:
      "We follow the Sindh Board curriculum and prepare students for the SSC (Matriculation) examinations of the Board of Secondary Education Karachi. Cambridge and A-Level programmes are not offered.",
  },
  {
    keywords: ["transport", "van", "bus", "pick", "drop"],
    question: "Is transport available?",
    answer:
      "A school van service is generally available for nearby Landhi and Korangi sectors, subject to route availability. Please confirm your area with the office before enrolment.",
  },
  {
    keywords: ["uniform", "dress", "shoes", "book", "books", "stationery"],
    question: "What about uniform and books?",
    answer:
      "A uniform and booklist is handed over at enrolment. Books follow the Sindh Textbook Board along with supporting workbooks selected by the school.",
  },
  {
    keywords: ["coed", "co-ed", "boys", "girls", "coeducation"],
    question: "Is the school co-educational?",
    answer:
      "Yes, Career House Schooling System is a co-educational school serving both boys and girls from pre-school to Matriculation.",
  },
  {
    keywords: ["contact", "phone", "call", "email", "number", "whatsapp"],
    question: "How can I contact the school?",
    answer:
      "Our phone number and email are not published yet - the fastest route today is the online admission inquiry form, or visiting the campus in Zamanabad, Landhi Town during office hours.",
  },
  {
    keywords: ["activity", "activities", "sports", "extracurricular", "club", "event"],
    question: "What activities are offered?",
    answer:
      "Students take part in cricket, football and volleyball, art and drama, science and debate clubs, plus inter-house sports weeks and cultural events through the year.",
  },
];
