// src/data/projectMeta.ts
export type ProjectMeta = {
  tags?: string[];
  autopsyMd?: string | null;   // e.g. "/autopsies/stock-and-shop.md"
  demoUrl?: string | null;
  videoUrl?: string | null;    // YouTube/Vimeo page URL
};

const projectMeta: Record<string, ProjectMeta> = {
  "stock-and-shop": {
    tags: ["Unity", "C#", "Game Dev"],
    autopsyMd: "/autopsies/stock-and-shop.md",
    videoUrl: "https://www.youtube.com/watch?v=XXXXXXXX",
  },
  "encompass-work-tracker": {
    tags: ["C#", "WPF", "Desktop"],
    autopsyMd: "/autopsies/encompass-work-tracker.md",
  },
  // add per project as you go
};
export default projectMeta;
