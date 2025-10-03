export type TimelineEntry = {
  id: string;         // kebab-case anchor for the section
  date: string;       // "2025", "Aug 2024", etc.
  title: string;      // short label
  summary: string;    // one–two sentence blurb
  bullets?: string[]; // optional bullet points
  link?: { href: string; label: string };
};

export const timeline: TimelineEntry[] = [
  // ——— Present ———
  {
    id: "parent-1st",
    date: "2025",
    title: "Parent 1st — Father & Wellbeing Coordinator",
    summary:
      "Supporting dads and families while easing back into full-time development. Using the role to ship lightweight internal tools and keep my dev muscles warm.",
    bullets: [
      "Driving small automations & process improvements",
      "Planning new portfolio projects in C# / React",
    ],
  },

  // ——— Recent projects / graduation ———
  {
    id: "encompass",
    date: "2024",
    title: "Encompass Work Tracker (C# / WPF)",
    summary:
      "Desktop app to streamline task tracking and reporting. Pragmatic UX, MVVM-ish structure, and testable core services.",
    bullets: ["MVVM-ish structure", "Export/report pipeline", "Testable core services"],
    link: {
      href: "https://github.com/Richard-Casey/Encompass-Work-Tracker",
      label: "GitHub",
    },
  },
  {
    id: "grad-2024",
    date: "Oct 2024",
    title: "Graduated — BSc (Hons) Games Development (First Class)",
    summary:
      "University of Suffolk. Focused on C#, Unity, and tooling. Mature-student route, balanced study with family life and shipped consistently.",
  },

  {
    id: "stock-and-shop",
    date: "2023",
    title: "Stock & Shop (Unity / C#)",
    summary:
      "Gameplay prototype exploring shop loops, inventories, and economy tuning.",
    bullets: ["ScriptableObjects for data", "Editor tooling", "Balance iteration"],
  },

  // ——— University journey ———
  {
    id: "uni-start-2021",
    date: "Sep 2021",
    title: "Started BSc Games Development — University of Suffolk",
    summary:
      "Accepted straight into the degree as a mature student after an encouraging open-day conversation. Clear goal: turn a lifelong passion into a career.",
  },

  // ——— Decision to switch paths ———
  {
    id: "dad-and-pandemic",
    date: "Mar 2020",
    title: "Became a Dad — then Lockdown",
    summary:
      "Three weeks after my son was born, the world shut down. Reassessed priorities and committed to university the next intake.",
  },
  {
    id: "open-day-2019",
    date: "2019",
    title: "Open Day — University of Suffolk",
    summary:
      "Spoke with the course team as a mature applicant. Encouraged to apply directly to the degree without a foundation year.",
  },

  // ——— Work & gaming era ———
  {
    id: "xbox360-2005",
    date: "2005",
    title: "Xbox 360 Launch — Weekly New Games",
    summary:
      "Worked retail and poured free time into trying everything I could get my hands on—stayed ahead of the curve to talk games with friends and the community.",
  },
  {
    id: "supermarket-2003",
    date: "2003",
    title: "Started Working — Caring for Mum",
    summary:
      "Took a supermarket job at 16 and became a carer for my mum (MS). Learned responsibility early and kept the love of games alive.",
  },
  {
    id: "xbox-live-2002",
    date: "2002–2003",
    title: "Xbox Live — First Taste of Online Gaming",
    summary:
      "Console online play flipped a switch. Social gaming, clans, and late nights—massively expanded what games meant for me.",
  },

  // ——— Early web tinkering ———
  {
    id: "geocities-2000",
    date: "2000–2001",
    title: "Geocities & View-Source — First Web Dev Experiments",
    summary:
      "Broke and fixed HTML on purpose. Figured out paths, hotlinking pitfalls, and basic hosting—first real ‘I can build this’ moment.",
    bullets: [
      "Right-click → View Source apprenticeship",
      "Local vs hosted images, relative vs absolute URLs",
    ],
  },

  // ——— Early consoles ———
  {
    id: "playstation-1996",
    date: "1996",
    title: "PlayStation for Christmas",
    summary:
      "Graduated from Mega Drive to PS1. Kept up the Blockbuster ritual—choosing games purely by box art and curiosity.",
  },
  {
    id: "megadrive-1993",
    date: "Dec 1993",
    title: "Sega Mega Drive — The Spark",
    summary:
      "Saw Castle of Illusion in a shop display, pressed a button, and Mickey moved. That Christmas we got a Mega Drive with Castle of Illusion and Sonic 2. Hooked for life.",
  },

  // ——— Origin ———
  {
    id: "born-1987",
    date: "11 Jul 1987",
    title: "Born",
    summary:
      "A while before Git, but just in time to grow up with the web, consoles, and the golden age of ‘figure it out’.",
  },
];
