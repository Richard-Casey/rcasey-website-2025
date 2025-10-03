import { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGitHubProjects from "../hooks/useGitHubProjects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import projectMeta from "../data/projectMeta";

/* ---------- helpers ---------- */

const API = "https://api.github.com";
const OWNER = "Richard-Casey"; // your GitHub username

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

// README response has a download_url we can fetch raw markdown from
type ReadmeResp = { download_url: string };

// Support deployment under a sub-path (e.g. GitHub Pages)
function normalizePublicPath(p: string) {
  if (!p) return p;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
}

// If README has relative assets, rewrite them to absolute URLs
function rewriteRelativeUrls(md: string, rawBase: string) {
  return md.replace(
    /(!?\[.*?\]\()(\.\/|\.\.\/|[^/ )][^)]*)(\))/g,
    (_m, p1, p2, p3) => `${p1}${new URL(p2, rawBase).toString()}${p3}`
  );
}

/* ---------- component ---------- */

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const { repos, loading } = useGitHubProjects(100);

  const project = useMemo(
    () => repos.find((p) => p.slug === slug),
    [repos, slug]
  );

  const meta = projectMeta[slug] || {};
  const autopsyPath = meta.autopsyMd || null;

  const [autopsyMd, setAutopsyMd] = useState<string>("");
  const [autopsyLoading, setAutopsyLoading] = useState<boolean>(true);

  useEffect(() => {
    let abort = false;

    async function load() {
      setAutopsyLoading(true);
      setAutopsyMd("");

      // 1) Try local autopsy file if provided
      if (autopsyPath) {
        const url = normalizePublicPath(autopsyPath);
        try {
          const r = await fetch(url);
          const text = r.ok ? await r.text() : "";
          if (!abort && text.trim().length > 0) {
            setAutopsyMd(text);
            setAutopsyLoading(false);
            return; // stop here if local autopsy found
          }
        } catch {
          // fall through to README
        }
      }

      // 2) Fallback to README from GitHub
      try {
        if (!project) throw new Error("No project");
        const readme = await gh<ReadmeResp>(`/repos/${OWNER}/${project.name}/readme`);
        const raw = await fetch(readme.download_url);
        let md = await raw.text();
        const rawBase = readme.download_url.replace(/README\.md$/i, "");
        md = rewriteRelativeUrls(md, rawBase);
        if (!abort) setAutopsyMd(md);
      } catch {
        if (!abort) setAutopsyMd("");
      } finally {
        if (!abort) setAutopsyLoading(false);
      }
    }

    if (project) load();
    return () => {
      abort = true;
    };
  }, [project, autopsyPath]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="h-64 rounded-lg bg-brand-gray animate-pulse" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link
          to="/projects"
          className="px-4 py-2 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link to="/projects" className="text-brand-accent hover:underline">
          ← All Projects
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-brand-subtext mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.topics.map((t) => (
          <span
            key={t}
            className="bg-brand-black/40 text-brand-accent text-xs px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

{/* Media */}
<div className="mb-12">
  {/* Centered, larger image */}
  <div className="mx-auto w-full md:w-4/5 lg:w-3/4 border border-white/40 rounded-md overflow-hidden">
    <img
      src={project.imageUrl}
      alt={`${project.title} preview`}
      className="w-full h-[26rem] md:h-[30rem] object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          `${import.meta.env.BASE_URL}projects/placeholder.png`;
      }}
    />
  </div>

  {/* Centered actions beneath image */}
  <div className="mt-6 flex items-center justify-center gap-3">
    <a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
    >
      View on GitHub
    </a>

    {/* Keep this if you want a Live Site button; otherwise delete this block */}
    {project.homepage ? (
      <a
        href={project.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 border border-white/30 text-brand-text rounded hover:bg-white/10 transition"
      >
        Live Site
      </a>
    ) : null}
  </div>
</div>



      {/* Divider */}
      <hr className="border-brand-gray my-8" />

      {/* Autopsy / deep dive */}
      <div className="max-w-none">
        <h2 className="text-2xl font-bold mb-6">Project Autopsy</h2>

        {autopsyLoading ? (
          <div className="h-32 rounded bg-brand-gray animate-pulse" />
        ) : autopsyMd ? (
          <article
            className="
              prose prose-invert max-w-none
              prose-headings:text-brand-text prose-headings:font-semibold
              prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-brand-subtext prose-p:leading-relaxed prose-p:my-4
              prose-li:my-1 prose-ul:my-4 prose-ol:my-4
              prose-strong:text-brand-text
              prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
              prose-hr:border-brand-gray prose-hr:my-8
              prose-img:rounded-md prose-img:shadow
              prose-code:text-brand-text
              prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-brand-gray prose-pre:rounded-lg
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {autopsyMd}
            </ReactMarkdown>
          </article>
        ) : (
          <p className="text-brand-subtext">
            No autopsy provided yet. Add one in <code>public/autopsies/{slug}.md</code> or a README in the repo.
          </p>
        )}
      </div>
    </section>
  );
}
