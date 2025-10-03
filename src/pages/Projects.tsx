import { useMemo, useState } from "react";
import useGitHubProjects from "../hooks/useGitHubProjects";
import ProjectCard from "../components/ProjectCard";

/* -------------------- Filters -------------------- */
function Filters({
  allTopics,
  activeTopics,
  setActiveTopics,
  query,
  setQuery,
}: {
  allTopics: string[];
  activeTopics: string[];
  setActiveTopics: (t: string[]) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  function toggle(t: string) {
    setActiveTopics(
      activeTopics.includes(t)
        ? activeTopics.filter((x) => x !== t)
        : [...activeTopics, t]
    );
  }

  return (
    <div className="mb-8">
      {/* Search + Clear */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or description…"
          className="w-full md:w-2/3 px-4 py-2 rounded border border-white/20 bg-brand-black/40 text-brand-text outline-none focus:border-brand-accent"
        />
        <button
          onClick={() => {
            setActiveTopics([]);
            setQuery("");
          }}
          className="px-4 py-2 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
        >
          Clear
        </button>
      </div>

      {/* Topic chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {allTopics.map((t) => {
          const active = activeTopics.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`px-3 py-1 rounded text-xs border transition
                ${
                  active
                    ? "border-brand-accent text-black bg-brand-accent"
                    : "border-white/40 text-brand-accent hover:bg-brand-accent hover:text-black"
                }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Page -------------------- */
export default function ProjectsPage() {
  const { repos, loading } = useGitHubProjects(100);

  const [query, setQuery] = useState("");
  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const allTopics = useMemo(() => {
    const s = new Set<string>();
    repos.forEach((p) => p.topics.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      const matchesTopics =
        activeTopics.length === 0 || activeTopics.every((t) => p.topics.includes(t));
      return matchesQ && matchesTopics;
    });
  }, [repos, query, activeTopics]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center text-brand-text mb-3">Projects</h1>
      <p className="text-center text-brand-subtext mb-10">
        Auto-fetched from GitHub. Filter by topics or search.
      </p>

      <Filters
        allTopics={allTopics}
        activeTopics={activeTopics}
        setActiveTopics={setActiveTopics}
        query={query}
        setQuery={setQuery}
      />

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-brand-gray animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-brand-subtext">No projects match your filters.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
